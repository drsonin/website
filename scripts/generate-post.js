#!/usr/bin/env node
/**
 * Daily blog post generator for drsonin.com
 * Usage: node scripts/generate-post.js [--topic N] [--date YYYY-MM-DD]
 *
 * Requires: ANTHROPIC_API_KEY, OPENAI_API_KEY env vars
 * Generates 4 posts (ru/et/fi/en) + 1 hero image and writes them to src/content/blog/
 */

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import sharp from 'sharp';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TOPICS } from './topics.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const client = new Anthropic();
const openai = new OpenAI();

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

const PROMPTS = {
  ru: (keyword) => `
Ты — медицинский копирайтер для стоматологической клиники Sonin Hambaravi в Таллине.
Напиши SEO-статью на тему: "${keyword}".

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

  et: (keyword) => `
Sa oled meditsiiniline sisulooja Tallinnas asuva Sonin Hambaravi hambaravikliiniku jaoks.
Kirjuta SEO-artikkel teemal: "${keyword}".

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

  fi: (keyword) => `
Olet lääketieteellinen sisällöntuottaja Tallinnassa sijaitsevalle Sonin Hambaravi -hammaslääkäriklinikalle.
Kirjoita SEO-artikkeli aiheesta: "${keyword}".

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

  en: (keyword) => `
You are a medical copywriter for Sonin Hambaravi dental clinic in Tallinn, Estonia.
Write an SEO article about: "${keyword}".

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

const TITLE_PROMPTS = {
  ru: (keyword) => `Придумай SEO-заголовок (50–70 символов) для статьи о "${keyword}" в стоматологической клинике. Обязательно включи имя "Дмитрий Сонин". Верни только заголовок, без кавычек.`,
  et: (keyword) => `Loo SEO-pealkiri (50–70 tähemärki) hambaartiklist teemal "${keyword}". Pea kindlasti sisaldama nime "Dmitri Sonin". Tagasta ainult pealkiri, ilma jutumärkideta.`,
  fi: (keyword) => `Luo SEO-otsikko (50–70 merkkiä) hammashoitoartikkelille aiheesta "${keyword}". Sen on sisällettävä nimi "Dmitri Sonin". Palauta vain otsikko, ilman lainausmerkkejä.`,
  en: (keyword) => `Write an SEO title (50–70 characters) for a dental article about "${keyword}". Must include "Dr Dmitri Sonin". Return only the title, no quotes.`,
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

  const imagePrompt = `
Professional dental clinic photography for the topic "${keyword}".
Clean, modern dental office setting. Bright, soft lighting.
No text, no logos, no watermarks. Photorealistic style.
The image should feel warm, trustworthy and medical — suitable for a dental clinic blog.
Horizontal composition, 16:9 ratio.
`.trim();

  const response = await openai.images.generate({
    model: 'gpt-image-1',
    prompt: imagePrompt,
    n: 1,
    size: '1536x1024',
    quality: 'medium',
  });

  // gpt-image-1 returns base64, dall-e-3 returns url — handle both
  let buffer;
  if (response.data[0].b64_json) {
    buffer = Buffer.from(response.data[0].b64_json, 'base64');
  } else {
    const res = await fetch(response.data[0].url);
    const arrayBuffer = await res.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
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

async function generatePost(lang, topic, dateStr, heroImage) {
  const { keyword, slug } = topic[lang];
  console.log(`  Generating [${lang}] — ${keyword}...`);

  const [body, title, description] = await Promise.all([
    generateText(PROMPTS[lang](keyword)),
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
  const topicIndex = getTopicIndex();
  const dateStr = getDateStr();
  const topic = TOPICS[topicIndex];

  console.log(`\n📝 Daily blog generator — ${dateStr}`);
  console.log(`📌 Topic #${topicIndex}: ${topic.ru.keyword} / ${topic.et.keyword} / ${topic.fi.keyword} / ${topic.en.keyword}\n`);

  // Generate hero image first (shared across all language versions)
  const heroImage = await generateHeroImage(topic, dateStr);

  // Generate all 4 language posts in parallel
  await Promise.all(
    ['ru', 'et', 'fi', 'en'].map((lang) => generatePost(lang, topic, dateStr, heroImage))
  );

  console.log('\n✅ Done! 4 posts + 1 hero image generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
