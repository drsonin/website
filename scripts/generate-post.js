#!/usr/bin/env node
/**
 * Daily blog post generator for drsonin.com
 * Usage: node scripts/generate-post.js [--topic N] [--date YYYY-MM-DD]
 *
 * Requires: ANTHROPIC_API_KEY env var
 * Generates 3 posts (ru/et/fi) and writes them to src/content/blog/
 */

import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TOPICS } from './topics.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const client = new Anthropic();

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
};

const TITLE_PROMPTS = {
  ru: (keyword) => `Придумай SEO-заголовок (50–70 символов) для статьи о "${keyword}" в стоматологической клинике. Обязательно включи имя "Дмитрий Сонин". Верни только заголовок, без кавычек.`,
  et: (keyword) => `Loo SEO-pealkiri (50–70 tähemärki) hambaartiklist teemal "${keyword}". Pea kindlasti sisaldama nime "Dmitri Sonin". Tagasta ainult pealkiri, ilma jutumärkideta.`,
  fi: (keyword) => `Luo SEO-otsikko (50–70 merkkiä) hammashoitoartikkelille aiheesta "${keyword}". Sen on sisällettävä nimi "Dmitri Sonin". Palauta vain otsikko, ilman lainausmerkkejä.`,
};

const DESC_PROMPTS = {
  ru: (keyword) => `Напиши мета-описание (120–155 символов) для статьи о "${keyword}". Включи имя "Дмитрий Сонин" и "Таллин". Верни только текст описания.`,
  et: (keyword) => `Kirjuta metakirjeldus (120–155 tähemärki) artikli jaoks teemal "${keyword}". Lisa nimi "Dmitri Sonin" ja "Tallinn". Tagasta ainult kirjelduse tekst.`,
  fi: (keyword) => `Kirjoita metakuvaus (120–155 merkkiä) artikkelia varten aiheesta "${keyword}". Lisää nimi "Dmitri Sonin" ja "Tallinna". Palauta vain kuvauksen teksti.`,
};

const AUTHOR_BY_LANG = { ru: 'Дмитрий Сонин', et: 'Dmitri Sonin', fi: 'Dmitri Sonin' };

async function generateText(prompt) {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });
  return msg.content[0].text.trim();
}

async function generatePost(lang, topic, dateStr) {
  const { keyword, slug } = topic[lang];
  console.log(`  Generating [${lang}] — ${keyword}...`);

  const [body, title, description] = await Promise.all([
    generateText(PROMPTS[lang](keyword)),
    generateText(TITLE_PROMPTS[lang](keyword)),
    generateText(DESC_PROMPTS[lang](keyword)),
  ]);

  const frontmatter = [
    '---',
    `title: '${title.replace(/'/g, "\\'")}'`,
    `description: '${description.replace(/'/g, "\\'")}'`,
    `pubDate: '${dateStr}'`,
    `lang: '${lang}'`,
    `author: '${AUTHOR_BY_LANG[lang]}'`,
    `tags: ['${keyword}', 'hambaravi', 'Sonin Hambaravi']`,
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
  console.log(`📌 Topic #${topicIndex}: ${topic.ru.keyword} / ${topic.et.keyword} / ${topic.fi.keyword}\n`);

  for (const lang of ['ru', 'et', 'fi']) {
    await generatePost(lang, topic, dateStr);
  }

  console.log('\n✅ Done! 3 posts generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
