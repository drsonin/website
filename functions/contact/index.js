'use strict';

/**
 * Catalyst Basic IO Function — Contact Form → Zoho Bigin
 *
 * Env vars (Catalyst Console → Functions → contact → Environment Variables):
 *   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
 *   ZOHO_ACCOUNTS_URL = https://accounts.zoho.eu
 *   ZOHO_API_BASE     = https://www.zohoapis.eu/bigin/v2
 */

const ZOHO_ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.eu';
const ZOHO_API_BASE     = process.env.ZOHO_API_BASE     || 'https://www.zohoapis.eu/bigin/v2';

let _token = null;
let _tokenExpiry = 0;

async function getAccessToken() {
  if (_token && Date.now() < _tokenExpiry - 60_000) return _token;

  const params = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
  });

  const resp = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await resp.json();
  if (!data.access_token) throw new Error('OAuth failed: ' + JSON.stringify(data));

  _token       = data.access_token;
  _tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000;
  return _token;
}

function mapLanguage(pageLang) {
  // Значения точно как в Bigin picklist (fi → 'Finish' — опечатка в Bigin, так и нужно)
  const map = { ru: 'Russian', et: 'Estonian', fi: 'Finish', en: 'English' };
  return map[pageLang] || 'Other';
}

async function createContact(body) {
  const token = await getAccessToken();

  const nameParts = (body.name || '').trim().split(/\s+/);
  const lastName  = nameParts.length > 1 ? nameParts.slice(1).join(' ') : (nameParts[0] || 'Website Lead');
  const firstName = nameParts.length > 1 ? nameParts[0] : undefined;

  const descParts = [
    body.service  && `Услуга: ${body.service}`,
    body.message  && `Сообщение: ${body.message}`,
    body.page_url && `Страница: ${body.page_url}`,
  ].filter(Boolean);

  const contact = {
    Last_Name:     lastName,
    First_Name:    firstName,
    Mobile:        body.phone        || undefined,
    Lead_Source:   'drsonin.com',
    Language:      mapLanguage(body.page_lang),
    Source_Name_utm_source: body.utm_source || undefined,
    Campaign_Name: body.utm_campaign || undefined,
    Adset_Name:    body.utm_medium   || undefined,
    Advert_Name:   body.utm_content  || undefined,
    Form_Name:     body.form_name    || 'Website Contact Form',
    Description:   descParts.length ? descParts.join('\n') : undefined,
  };

  Object.keys(contact).forEach(k => {
    if (contact[k] === undefined || contact[k] === '') delete contact[k];
  });

  const resp = await fetch(`${ZOHO_API_BASE}/Contacts`, {
    method: 'POST',
    headers: {
      Authorization:  `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ data: [contact] }),
  });

  const result = await resp.json();
  if (!resp.ok || result.data?.[0]?.status === 'error') {
    throw new Error('Bigin error: ' + JSON.stringify(result));
  }
  return result;
}

// ─── Handler ────────────────────────────────────────────────────────────────
module.exports = async (context, io) => {
  const body = io.getAllArguments() || {};
  context.log('[contact-fn] keys:', JSON.stringify(Object.keys(body)));

  if (!body.name && !body.phone) {
    io.setStatus(400);
    io.write(JSON.stringify({ error: 'Укажите имя или телефон' }));
    return;
  }

  try {
    await createContact(body);
    io.write(JSON.stringify({ success: true }));
  } catch (err) {
    context.log('[contact-fn] error:', err.message);
    io.setStatus(500);
    io.write(JSON.stringify({ error: 'Ошибка сервера. Позвоните напрямую.' }));
  }
};
