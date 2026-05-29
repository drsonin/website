'use strict';

/**
 * Catalyst Basic IO Function — Contact Form → Zoho Bigin
 *
 * Env vars (set in Catalyst Console → Functions → Environment Variables):
 *   ZOHO_CLIENT_ID       — из Self Client приложения
 *   ZOHO_CLIENT_SECRET   — из Self Client приложения
 *   ZOHO_REFRESH_TOKEN   — получен один раз при выдаче токена
 *   ZOHO_ACCOUNTS_URL    — https://accounts.zoho.eu  (EU) или https://accounts.zoho.com
 *   ZOHO_API_BASE        — https://www.zohoapis.eu/bigin/v2  (EU) или .com
 *   CORS_ORIGIN          — https://drsonin.com (или * для dev)
 */

const ZOHO_ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.eu';
const ZOHO_API_BASE     = process.env.ZOHO_API_BASE     || 'https://www.zohoapis.eu/bigin/v2';
const CORS_ORIGIN       = process.env.CORS_ORIGIN       || '*';

// В памяти кешируем access token (живёт 1 час)
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
  if (!data.access_token) {
    throw new Error('OAuth refresh failed: ' + JSON.stringify(data));
  }

  _token       = data.access_token;
  _tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000;
  return _token;
}

/**
 * utm_source → Lead_Source picklist value
 * Значения должны точно совпадать с пикслистом в Bigin
 */
function mapLeadSource(utmSource) {
  const map = {
    facebook:  'Facebook',
    instagram: 'Meta Ads',
    fb:        'Facebook',
    google:    'Advertisement',
    bing:      'Advertisement',
    organic:   'Web Research',
    direct:    'Web Research',
    email:     'Web Mail',
    whatsapp:  'WHATSAPP - Sonin Hambaravi',
    referral:  'External Referral',
  };
  return map[(utmSource || '').toLowerCase()] || 'Web Research';
}

/**
 * Язык страницы (ru/et/fi) → Language picklist
 */
function mapLanguage(pageLang) {
  const map = { ru: 'Russian', et: 'Estonian', fi: 'Other' };
  return map[pageLang] || 'Other';
}

async function createContact(body) {
  const token = await getAccessToken();

  // Разбиваем имя на First + Last
  const nameParts = (body.name || '').trim().split(/\s+/);
  const lastName  = nameParts.length > 1 ? nameParts.slice(1).join(' ') : (nameParts[0] || 'Website Lead');
  const firstName = nameParts.length > 1 ? nameParts[0] : '';

  // Собираем Description из сообщения, услуги и utm_term
  const descParts = [
    body.service && `Услуга: ${body.service}`,
    body.message && `Сообщение: ${body.message}`,
    body.utm_term && `utm_term: ${body.utm_term}`,
    body.page_url && `Страница: ${body.page_url}`,
  ].filter(Boolean);

  const contact = {
    Last_Name:     lastName,
    First_Name:    firstName,
    Phone:         body.phone   || undefined,
    Lead_Source:   mapLeadSource(body.utm_source),
    Language:      mapLanguage(body.page_lang),
    Campaign_Name: body.utm_campaign || undefined,
    Adset_Name:    body.utm_medium   || undefined,
    Advert_Name:   body.utm_content  || undefined,
    Form_Name:     body.form_name    || 'Website Contact Form',
    Description:   descParts.length ? descParts.join('\n') : undefined,
  };

  // Убираем undefined
  Object.keys(contact).forEach(k => {
    if (contact[k] === undefined || contact[k] === '') delete contact[k];
  });

  const resp = await fetch(`${ZOHO_API_BASE}/Contacts`, {
    method: 'POST',
    headers: {
      Authorization:  `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [contact] }),
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw new Error(`Bigin HTTP ${resp.status}: ${JSON.stringify(result)}`);
  }
  if (result.data?.[0]?.status === 'error') {
    throw new Error(`Bigin record error: ${JSON.stringify(result.data[0])}`);
  }

  return result;
}

// ─── Catalyst Basic IO handler ──────────────────────────────────────────────
module.exports = async (context, basicIO) => {
  const req = basicIO.getRequest();
  const res = basicIO.getResponse();

  // CORS
  res.set('Access-Control-Allow-Origin',  CORS_ORIGIN);
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};

  // Валидация
  if (!body.name && !body.phone) {
    res.status(400).json({ error: 'Укажите имя или телефон' });
    return;
  }

  try {
    await createContact(body);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact-fn] Error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позвонить напрямую.' });
  }
};
