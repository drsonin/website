#!/usr/bin/env node
/**
 * Daily blog post generator for drsonin.com
 * Usage: node scripts/generate-post.js [--topic N] [--date YYYY-MM-DD]
 *
 * Requires: ANTHROPIC_API_KEY, OPENAI_API_KEY env vars
 * Generates 4 posts (ru/et/fi/en) + 1 hero image and writes them to src/content/blog/
 */

import Anthropic from '@anthropic-ai/sdk';
import Replicate from 'replicate';
import sharp from 'sharp';
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TOPICS } from './topics.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const client = new Anthropic();
const replicate = new Replicate();

// Pick topic index: CLI arg, or today's day-of-year mod topics length
function getTopicIndex() {
  const arg = process.argv.find((a) => a.startsWith('--topic='));
  if (arg) return parseInt(arg.split('=')[1], 10) % TOPICS.length;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  return dayOfYear % TOPICS.length;
}

function getDateStr() {
  const arg = process.argv.find((a) => a.startsWith('--date='));
  if (arg) return arg.split('=')[1];
  return new Date().toISOString().slice(0, 10);
}

// Medical tourism context for cost comparison articles
const MEDICAL_TOURISM_CONTEXT = {
  ru: `
Контекст для расчётов:
- Имплант + коронка в Таллине (Sonin Hambaravi): ~1200–1800 € за зуб
- Имплант + коронка в Турции (Анталия/Стамбул): ~500–800 € за зуб
- Авиабилет Таллин–Анталия туда-обратно: ~200–400 €
- Отель 5–7 дней: ~300–600 €
- Питание, трансфер: ~150–200 €
- Повторный визит при осложнениях (авиа + отель): +500–800 €
- Гарантия в Таллине: 5 лет, осмотр за 30 мин без доп. расходов
- Гарантийный случай за рубежом: новая поездка + расходы за свой счёт

ВАЖНО: статья должна быть нейтральной и объективной. Только факты и цифры.
НЕ призывай ехать в Турцию и НЕ рекламируй зарубежное лечение.
Просто честно посчитай полную стоимость с учётом всех расходов — читатель сделает вывод сам.
Тон: аналитический, как у финансового консультанта, без эмоций.`.trim(),
  et: `
Arvutuste kontekst:
- Implantaat + kroon Tallinnas (Sonin Hambaravi): ~1200–1800 € hamba kohta
- Implantaat + kroon Türgis (Antalya/Istanbul): ~500–800 € hamba kohta
- Lennud Tallinn–Antalya edasi-tagasi: ~200–400 €
- Hotell 5–7 päeva: ~300–600 €
- Toit, transport: ~150–200 €
- Kordusvisiit tüsistuste korral: +500–800 €
OLULINE: artikkel peab olema neutraalne ja faktipõhine. Ainult arvud ja faktid.
Ära soovita reisida Türki. Lase lugejal ise järeldused teha.`.trim(),
  fi: `
Laskelmien konteksti:
- Implantti + kruunu Tallinnassa (Sonin Hambaravi): ~1200–1800 € hammas
- Implantti + kruunu Turkissa (Antalya/Istanbul): ~500–800 € hammas
- Lennot Tallinna–Antalya edestakaisin: ~200–400 €
- Hotelli 5–7 päivää: ~300–600 €
- Ruoka, siirrot: ~150–200 €
- Uusintakäynti komplikaatioiden vuoksi: +500–800 €
TÄRKEÄÄ: artikkelin tulee olla neutraali ja faktipohjainen. Vain numerot ja tosiasiat.
Älä suosittele matkustamista Turkkiin. Anna lukijan tehdä omat johtopäätöksensä.`.trim(),
  en: `
Cost calculation context:
- Implant + crown in Tallinn (Sonin Hambaravi): ~1200–1800 € per tooth
- Implant + crown in Turkey (Antalya/Istanbul): ~500–800 € per tooth
- Flights Tallinn–Antalya return: ~200–400 €
- Hotel 5–7 nights: ~300–600 €
- Food, transfers: ~150–200 €
- Return visit for complications: +500–800 €
- Tallinn guarantee: 5 years, 30-min check with no extra travel cost
IMPORTANT: the article must be neutral and factual — numbers and facts only.
Do NOT recommend travelling to Turkey or promote dental tourism abroad.
Present the full cost breakdown objectively and let the reader draw their own conclusions.
Tone: analytical, like a financial advisor, no emotional bias.`.trim(),
};

// FAQ format instructions — answer real patient questions with expert authority
const FAQ_CONTEXT = {
  ru: `
ФОРМАТ: Статья в формате "Вопрос пациента → экспертный ответ".
Структура:
1. Начни с описания типичной ситуации пациента (2–3 предложения, без "если вы...")
2. Объясни причины/механизм проблемы (H3)
3. Что делать: конкретные шаги (H3)
4. Когда обращаться к врачу немедленно (H3)
5. Профилактика / что важно знать (H3)
Тон: как опытный врач объясняет пациенту на приёме — честно, без лишних слов, с конкретикой.
Используй реальные цифры и сроки где уместно.`.trim(),
  et: `
FORMAAT: Artikkel "Patsiendi küsimus → ekspertide vastus".
Struktuur:
1. Alusta tüüpilise patsiendi olukorra kirjeldusega (2–3 lauset)
2. Selgita põhjuseid/mehhanismi (H3)
3. Mida teha: konkreetsed sammud (H3)
4. Millal pöörduda arsti poole kohe (H3)
5. Ennetamine / oluline teada (H3)
Toon: nagu kogenud arst selgitab patsiendile — ausalt, konkreetselt, reaalse infoga.`.trim(),
  fi: `
MUOTO: Artikkeli "Potilaan kysymys → asiantuntijan vastaus".
Rakenne:
1. Aloita tyypillisen potilastilanteen kuvauksella (2–3 lausetta)
2. Selitä syyt/mekanismi (H3)
3. Mitä tehdä: konkreettiset vaiheet (H3)
4. Milloin hakeutua lääkäriin välittömästi (H3)
5. Ennaltaehkäisy / tärkeää tietää (H3)
Sävy: kuten kokenut lääkäri selittää potilaalle — rehellisesti, konkreettisesti.`.trim(),
  en: `
FORMAT: Article in "Patient question → expert answer" style.
Structure:
1. Open with a relatable patient scenario (2–3 sentences)
2. Explain causes/mechanism (H3)
3. What to do: concrete steps (H3)
4. When to see a dentist immediately (H3)
5. Prevention / key takeaways (H3)
Tone: like an experienced dentist explaining to a patient — honest, specific, with real numbers and timelines.`.trim(),
};

const PROMPTS = {
  ru: (keyword, isMedicalTourism = false, isFaq = false) => `
Ты — медицинский копирайтер для стоматологической клиники Sonin Hambaravi в Таллине.
Напиши SEO-статью на тему: "${keyword}".
${isMedicalTourism ? '\n' + MEDICAL_TOURISM_CONTEXT.ru + '\n' : ''}
${isFaq ? '\n' + FAQ_CONTEXT.ru + '\n' : ''}

Требования:
- Язык: русский
- Автор упомянут в тексте как "доктор Дмитрий Сонин" или "Дмитрий Сонин" (2–3 раза, естественно)
- Заголовок: H2, содержит и ключевое слово, и имя доктора
- Структура: несколько разделов с H3 заголовками
- Длина: 600–800 слов
- Тон: профессиональный, но доступный пациентам
- В конце: призыв записаться на консультацию в клинику Sonin Hambaravi в Таллине
- НЕ включай YAML frontmatter
- Начинай сразу с "## "

Верни ТОЛЬКО markdown текст статьи.
`.trim(),

  et: (keyword, isMedicalTourism = false, isFaq = false) => `
Sa oled meditsiiniline sisulooja Tallinnas asuva Sonin Hambaravi hambaravikliiniku jaoks.
Kirjuta SEO-artikkel teemal: "${keyword}".
${isMedicalTourism ? '\n' + MEDICAL_TOURISM_CONTEXT.et + '\n' : ''}
${isFaq ? '\n' + FAQ_CONTEXT.et + '\n' : ''}
Nõuded:
- Keel: eesti
- Autorit mainitakse tekstis kui "dr Dmitri Sonin" või "Dmitri Sonin" (2–3 korda, loomulikus kontekstis)
- Pealkiri: H2, sisaldab nii märksõna kui arsti nime
- Struktuur: mitu jaotist H3 pealkirjadega
- Pikkus: 600–800 sõna
- Toon: professionaalne, kuid patsientidele arusaadav
- Lõpus: üleskutse broneerida konsultatsioon Sonin Hambaravi kliinikus Tallinnas
- ÄRA lisa YAML frontmatterit
- Alusta kohe "## "-ga

Tagasta AINULT artikli markdown tekst.
`.trim(),

  fi: (keyword, isMedicalTourism = false, isFaq = false) => `
Olet lääketieteellinen sisällöntuottaja Tallinnassa sijaitsevalle Sonin Hambaravi -hammaslääkäriklinikalle.
Kirjoita SEO-artikkeli aiheesta: "${keyword}".
${isMedicalTourism ? '\n' + MEDICAL_TOURISM_CONTEXT.fi + '\n' : ''}
${isFaq ? '\n' + FAQ_CONTEXT.fi + '\n' : ''}
Vaatimukset:
- Kieli: suomi
- Lääkäriä mainitaan tekstissä nimellä "tri Dmitri Sonin" tai "Dmitri Sonin" (2–3 kertaa, luontevassa kontekstissa)
- Otsikko: H2, sisältää sekä avainsanan että lääkärin nimen
- Rakenne: useita osioita H3-otsikoilla
- Pituus: 600–800 sanaa
- Sävy: ammattimainen mutta potilaalle ymmärrettävä
- Lopussa: kehotus varata konsultaatio Sonin Hambaravi -klinikalle Tallinnassa
- ÄLÄ sisällytä YAML frontmatteria
- Aloita suoraan "## "-merkillä

Palauta VAIN artikkelin markdown-teksti.
`.trim(),

  en: (keyword, isMedicalTourism = false, isFaq = false) => `
You are a medical copywriter for Sonin Hambaravi dental clinic in Tallinn, Estonia.
Write an SEO article about: "${keyword}".
${isMedicalTourism ? '\n' + MEDICAL_TOURISM_CONTEXT.en + '\n' : ''}
${isFaq ? '\n' + FAQ_CONTEXT.en + '\n' : ''}
Requirements:
- Language: English
- Mention the author naturally as "Dr Dmitri Sonin" or "Dmitri Sonin" (2–3 times)
- Title: H2, contains both the keyword and the doctor's name
- Structure: several sections with H3 headings
- Length: 600–800 words
- Tone: professional yet accessible to patients
- End with a call to book a consultation at Sonin Hambaravi clinic in Tallinn
- Do NOT include YAML frontmatter
- Start directly with "## "

Return ONLY the article markdown text.
`.trim(),
};

// Include doctor's name in ~35% of titles for natural variation
function withName() { return Math.random() < 0.35; }

const TITLE_PROMPTS = {
  ru: (keyword) => withName()
    ? `Придумай SEO-заголовок (50–70 символов) для статьи о "${keyword}" в стоматологической клинике в Таллине. Включи имя "Дмитрий Сонин". Верни только заголовок, без кавычек.`
    : `Придумай SEO-заголовок (50–70 символов) для статьи о "${keyword}" в стоматологической клинике в Таллине. Без имени врача — фокус на ключевом слове и городе. Верни только заголовок, без кавычек.`,
  et: (keyword) => withName()
    ? `Loo SEO-pealkiri (50–70 tähemärki) hambaartiklist teemal "${keyword}" Tallinnas. Lisa nimi "Dmitri Sonin". Tagasta ainult pealkiri, ilma jutumärkideta.`
    : `Loo SEO-pealkiri (50–70 tähemärki) hambaartiklist teemal "${keyword}" Tallinnas. Fookus märksõnal ja asukohal, ilma arsti nimeta. Tagasta ainult pealkiri, ilma jutumärkideta.`,
  fi: (keyword) => withName()
    ? `Luo SEO-otsikko (50–70 merkkiä) hammashoitoartikkelille aiheesta "${keyword}" Tallinnassa. Lisää nimi "Dmitri Sonin". Palauta vain otsikko, ilman lainausmerkkejä.`
    : `Luo SEO-otsikko (50–70 merkkiä) hammashoitoartikkelille aiheesta "${keyword}" Tallinnassa. Keskity avainsanaan ja sijaintiin ilman lääkärin nimeä. Palauta vain otsikko, ilman lainausmerkkejä.`,
  en: (keyword) => withName()
    ? `Write an SEO title (50–70 characters) for a dental article about "${keyword}" in Tallinn. Include "Dr Dmitri Sonin". Return only the title, no quotes.`
    : `Write an SEO title (50–70 characters) for a dental article about "${keyword}" in Tallinn, Estonia. Focus on the keyword and location, no doctor name. Return only the title, no quotes.`,
};

const DESC_PROMPTS = {
  ru: (keyword) => `Напиши мета-описание (120–155 символов) для статьи о "${keyword}". Включи имя "Дмитрий Сонин" и "Таллин". Верни только текст описания.`,
  et: (keyword) => `Kirjuta metakirjeldus (120–155 tähemärki) artikli jaoks teemal "${keyword}". Lisa nimi "Dmitri Sonin" ja "Tallinn". Tagasta ainult kirjelduse tekst.`,
  fi: (keyword) => `Kirjoita metakuvaus (120–155 merkkiä) artikkelia varten aiheesta "${keyword}". Lisää nimi "Dmitri Sonin" ja "Tallinna". Palauta vain kuvauksen teksti.`,
  en: (keyword) => `Write a meta description (120–155 characters) for an article about "${keyword}". Include "Dr Dmitri Sonin" and "Tallinn". Return only the description text.`,
};

const AUTHOR_BY_LANG = { ru: 'Дмитрий Сонин', et: 'Dmitri Sonin', fi: 'Dmitri Sonin', en: 'Dr Dmitri Sonin' };

async function generateText(prompt) {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });
  return msg.content[0].text.trim();
}

/**
 * Generate a hero image via DALL-E 3 and save to public/blog-images/
 * Returns the public path string (e.g. /blog-images/2026-05-30-implantaciya-zubov.jpg)
 */
async function generateHeroImage(topic, dateStr) {
  const keyword = topic.en.keyword; // use English keyword for prompt
  const slug = topic.en.slug;
  const filename = `${dateStr}-${slug}.webp`;
  const outputPath = join(ROOT, 'public', 'blog-images', filename);
  const publicPath = `/blog-images/${filename}`;

  // Skip if already generated (idempotent)
  if (existsSync(outputPath)) {
    console.log(`  ✓ Image already exists: ${publicPath}`);
    return publicPath;
  }

  console.log(`  🎨 Generating hero image for "${keyword}"...`);

  // Rotate scene types for visual variety
  // Rules for all scenes: Nordic/Northern European appearance, short hair on men (never long),
  // patients aged 45–70, trustworthy and calm expressions, no fashion-model look
  const scenes = [
    `A male dentist in his late 40s, short dark hair, slight stubble, no glasses, wearing a white medical coat, calm confident expression, looking at the camera. Modern dental office background with equipment. Professional warm lighting. Northern European appearance.`,
    `A happy male patient aged 55–65, short grey hair, Nordic appearance, sitting in a dental chair with a natural relaxed smile after successful treatment. A dentist in a white coat visible in the background. Modern bright dental clinic.`,
    `A happy female patient aged 50–65, short blonde or grey hair, Scandinavian appearance, sitting in a dental chair smiling warmly. Professional clinic setting, soft natural light.`,
    `A male dentist in his 40s, short brown hair, clean-shaven, and a female patient aged 50–60 seated across from him, both looking at dental X-rays on a screen. Trustworthy, professional atmosphere. Modern dental office, natural light.`,
    `Interior of a premium modern dental clinic — clean white and light blue design, state-of-the-art dental chair and equipment, bright natural lighting through large windows. No people, architectural photography style.`,
    `A female dental hygienist aged 35–45, short blonde hair, Northern European appearance, wearing scrubs, performing professional teeth cleaning on a patient. Close-up, clinical and precise, modern equipment.`,
    `A couple aged 55–65, Nordic appearance, sitting in a bright dental waiting room, looking relaxed and confident. Clean Scandinavian interior design, welcoming atmosphere.`,
  ];
  const scene = scenes[Math.floor(Math.random() * scenes.length)];

  const imagePrompt = `
Photorealistic dental clinic photography for the topic "${keyword}" in Tallinn, Estonia.
${scene}
Shot on Sony A7R IV, 85mm lens, shallow depth of field.
People must have short hair, natural trustworthy expressions, aged 45–70, Northern European or Scandinavian appearance.
No long hair on men. No fashion-model look. No text, no logos, no watermarks.
Ultra-realistic, cinematic quality. Horizontal composition 16:9.
`.trim();

  const output = await replicate.run('black-forest-labs/flux-1.1-pro', {
    input: {
      prompt: imagePrompt,
      aspect_ratio: '16:9',
      output_format: 'jpg',
      output_quality: 90,
      safety_tolerance: 2,
    },
  });

  // Replicate returns a URL or ReadableStream
  let buffer;
  if (output && typeof output === 'object' && typeof output.url === 'function') {
    const res = await fetch(output.url());
    buffer = Buffer.from(await res.arrayBuffer());
  } else if (typeof output === 'string') {
    const res = await fetch(output);
    buffer = Buffer.from(await res.arrayBuffer());
  } else {
    // ReadableStream
    const chunks = [];
    for await (const chunk of output) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    buffer = Buffer.concat(chunks);
  }

  const dir = join(ROOT, 'public', 'blog-images');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // Compress to max 1200x630 WebP ~200KB
  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(outputPath);

  console.log(`  ✓ Image saved: public/blog-images/${filename}`);
  return publicPath;
}

function slugAlreadyExists(lang, slug) {
  const dir = join(ROOT, 'src', 'content', 'blog', lang);
  if (!existsSync(dir)) return false;
  return readdirSync(dir).some(f => f.endsWith(`-${slug}.md`) || f === `${slug}.md`);
}

function topicLangs(topic) {
  return topic.langs ?? ['ru', 'et', 'fi', 'en'];
}

function topicAlreadyExists(topic) {
  return topicLangs(topic).every(lang => slugAlreadyExists(lang, topic[lang].slug));
}

async function generatePost(lang, topic, dateStr, heroImage) {
  const { keyword, slug } = topic[lang];
  const isMedicalTourism = topic.type === 'medical-tourism';
  const isFaq = topic.type === 'faq';
  const typeLabel = isMedicalTourism ? ' [medical-tourism]' : isFaq ? ' [faq]' : '';
  console.log(`  Generating [${lang}] — ${keyword}${typeLabel}...`);

  const [body, title, description] = await Promise.all([
    generateText(PROMPTS[lang](keyword, isMedicalTourism, isFaq)),
    generateText(TITLE_PROMPTS[lang](keyword)),
    generateText(DESC_PROMPTS[lang](keyword)),
  ]);

  const frontmatter = [
    '---',
    `title: '${title.replace(/'/g, "''")}'`,
    `description: '${description.replace(/'/g, "''")}'`,
    `pubDate: '${dateStr}'`,
    `lang: '${lang}'`,
    `author: '${AUTHOR_BY_LANG[lang]}'`,
    `tags: ['${keyword}', 'hambaravi', 'Sonin Hambaravi']`,
    `heroImage: '${heroImage}'`,
    '---',
    '',
  ].join('\n');

  const content = frontmatter + body;
  const filename = `${dateStr}-${slug}.md`;
  const dir = join(ROOT, 'src', 'content', 'blog', lang);

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), content, 'utf8');
  console.log(`  ✓ Written: src/content/blog/${lang}/${filename}`);
}

async function main() {
  const startIndex = getTopicIndex();
  const dateStr = getDateStr();

  console.log(`\n📝 Daily blog generator — ${dateStr}`);

  // Collect up to 2 topics that haven't been published yet
  const toGenerate = [];
  for (let i = 0; i < TOPICS.length && toGenerate.length < 2; i++) {
    const idx = (startIndex + i) % TOPICS.length;
    const topic = TOPICS[idx];
    if (topicAlreadyExists(topic)) {
      console.log(`  ⏭  Topic #${idx} already published, skipping: ${topic.en.slug}`);
    } else {
      toGenerate.push([idx, topic]);
    }
  }

  if (toGenerate.length === 0) {
    console.log('\n✅ All topics already published — nothing to generate.');
    return;
  }

  for (const [idx, topic] of toGenerate) {
    const langs = topicLangs(topic);
    console.log(`\n--- Generating topic #${idx}: ${(topic.en ?? topic[langs[0]]).keyword} [${langs.join(',')}] ---`);
    const heroImage = await generateHeroImage(topic, dateStr);
    await Promise.all(langs.map((lang) => generatePost(lang, topic, dateStr, heroImage)));
  }

  const totalPosts = toGenerate.reduce((sum, [, t]) => sum + topicLangs(t).length, 0);
  console.log(`\n✅ Done! ${totalPosts} posts + ${toGenerate.length} hero images generated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
