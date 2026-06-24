#!/usr/bin/env node
/**
 * One-time script: fix tags in all existing blog posts.
 * Finds posts with bad tag pattern (full keyword / hambaravi / Sonin Hambaravi)
 * and regenerates proper short language-specific tags via Claude.
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const client = new Anthropic();

const TAGS_PROMPTS = {
  ru: (keyword) => `Придумай 4–5 коротких SEO-тегов для статьи о "${keyword}". Правила: короткие (1–3 слова), на русском языке, без имён врачей и названий клиник, без дублей. Верни только теги через запятую, без кавычек.`,
  et: (keyword) => `Loo 4–5 lühikest SEO-silti artikli jaoks teemal "${keyword}". Reeglid: lühikesed (1–3 sõna), eesti keeles, ilma arsti nimedeta, ilma korduste ja kliinikute nimedeta. Tagasta ainult sildid komadega eraldatult.`,
  fi: (keyword) => `Luo 4–5 lyhyttä SEO-tagia artikkelille aiheesta "${keyword}". Säännöt: lyhyitä (1–3 sanaa), suomeksi, ei lääkärien nimiä eikä klinikoiden nimiä, ei toistoja. Palauta vain tagit pilkuilla eroteltuna.`,
  en: (keyword) => `Generate 4–5 short SEO tags for an article about "${keyword}". Rules: short (1–3 words), in English, no doctor or clinic names, no duplicates. Return only the tags separated by commas, no quotes.`,
};

function isBadTags(tagsLine) {
  return tagsLine.includes('hambaravi') || tagsLine.includes('Sonin Hambaravi') ||
    // detect full keyword as first tag (very long first tag)
    /'\s*[^']{41,}\s*'/.test(tagsLine);
}

function extractKeyword(content) {
  // Try to extract from tags first tag or title
  const tagsMatch = content.match(/^tags:\s*\[['"](.+?)['"]/m);
  if (tagsMatch) return tagsMatch[1];
  const titleMatch = content.match(/^title:\s*['"](.+?)['"]/m);
  return titleMatch ? titleMatch[1] : '';
}

function extractLang(content) {
  const m = content.match(/^lang:\s*['"](.+?)['"]/m);
  return m ? m[1] : 'ru';
}

async function generateTags(keyword, lang) {
  const prompt = TAGS_PROMPTS[lang]?.(keyword) ?? TAGS_PROMPTS.en(keyword);
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 100,
    messages: [{ role: 'user', content: prompt }],
  });
  const raw = msg.content[0].text.trim();
  return raw.split(',').map(t => t.trim()).filter(Boolean).slice(0, 5);
}

function updateTags(content, tags) {
  const tagsYaml = tags.map(t => `'${t.replace(/'/g, "''")}'`).join(', ');
  return content.replace(/^tags:\s*\[.*?\]/m, `tags: [${tagsYaml}]`);
}

async function main() {
  const langs = ['ru', 'et', 'fi', 'en'];
  let fixed = 0;
  let skipped = 0;

  for (const lang of langs) {
    const dir = join(BLOG_DIR, lang);
    let files;
    try { files = readdirSync(dir).filter(f => f.endsWith('.md')); }
    catch { continue; }

    for (const file of files) {
      const filePath = join(dir, file);
      const content = readFileSync(filePath, 'utf8');
      const tagsLine = content.match(/^tags:\s*\[.*?\]/m)?.[0] ?? '';

      if (!isBadTags(tagsLine)) { skipped++; continue; }

      const keyword = extractKeyword(content);
      const fileLang = extractLang(content);

      try {
        const tags = await generateTags(keyword, fileLang);
        const updated = updateTags(content, tags);
        writeFileSync(filePath, updated, 'utf8');
        console.log(`✓ [${fileLang}] ${file} → ${tags.join(', ')}`);
        fixed++;
      } catch (err) {
        console.error(`✗ [${fileLang}] ${file}: ${err.message}`);
      }

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`\nDone: ${fixed} fixed, ${skipped} already OK`);
}

main().catch(err => { console.error(err); process.exit(1); });
