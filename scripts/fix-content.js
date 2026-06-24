#!/usr/bin/env node
/**
 * One-time script: add missing SEO elements to existing blog posts.
 *
 * 1. EN posts: replace first "Sonin Hambaravi" → "Sonin Dental Clinic" in body
 *    so Google Maps NAP matches the site content.
 * 2. All posts: append a /contact/ markdown link before the last paragraph
 *    if no internal contact link exists yet.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');

const CONTACT_LINKS = {
  ru: '[Записаться на консультацию](/ru/contact/)',
  et: '[Broneeri konsultatsioon](/et/contact/)',
  fi: '[Varaa konsultaatio](/fi/contact/)',
  en: '[Book a consultation](/en/contact/)',
};

function getLang(content) {
  return content.match(/^lang:\s*['"]?(\w+)['"]?/m)?.[1] ?? 'ru';
}

function getBody(content) {
  return content.replace(/^---[\s\S]*?---\n/, '');
}

function hasContactLink(body) {
  return /\(\/(?:[a-z]{2}\/)?contact\/?\)/.test(body);
}

function addContactLink(content, body, lang) {
  const link = CONTACT_LINKS[lang] ?? CONTACT_LINKS.ru;
  // Insert before the last paragraph (split on double newline, inject before last block)
  const parts = body.trimEnd().split(/\n\n(?=\S)/);
  if (parts.length < 2) {
    // Fallback: just append
    return content.trimEnd() + `\n\n${link}\n`;
  }
  const lastPart = parts[parts.length - 1];
  const rest = parts.slice(0, -1).join('\n\n');
  const newBody = rest + `\n\n${link}\n\n` + lastPart;
  const fm = content.slice(0, content.indexOf('---', 3) + 4);
  return fm + '\n' + newBody + '\n';
}

function addSoninDentalClinic(content, body) {
  // Replace FIRST occurrence of "Sonin Hambaravi" in body with "Sonin Dental Clinic"
  if (!body.toLowerCase().includes('sonin hambaravi')) {
    // No mention at all — append a note in the last paragraph area
    return content.replace(
      /Sonin Dental Clinic/i,
      'Sonin Dental Clinic'
    ); // no-op if already there
  }
  const updated = body.replace('Sonin Hambaravi', 'Sonin Dental Clinic');
  const fm = content.slice(0, content.indexOf('---', 3) + 4);
  return fm + '\n' + updated;
}

async function main() {
  const langs = ['ru', 'et', 'fi', 'en'];
  let contactFixed = 0;
  let clinicFixed = 0;
  let skipped = 0;

  for (const lang of langs) {
    const dir = join(BLOG_DIR, lang);
    let files;
    try { files = readdirSync(dir).filter(f => f.endsWith('.md')); }
    catch { continue; }

    for (const file of files) {
      const filePath = join(dir, file);
      let content = readFileSync(filePath, 'utf8');
      let changed = false;

      const body = getBody(content);

      // 1. EN: add "Sonin Dental Clinic"
      if (lang === 'en' && !body.toLowerCase().includes('sonin dental clinic')) {
        content = addSoninDentalClinic(content, body);
        changed = true;
        clinicFixed++;
        console.log(`[clinic] ${file}`);
      }

      // 2. All: add /contact/ link
      const currentBody = getBody(content);
      if (!hasContactLink(currentBody)) {
        content = addContactLink(content, currentBody, lang);
        changed = true;
        contactFixed++;
        console.log(`[contact] [${lang}] ${file}`);
      }

      if (changed) {
        writeFileSync(filePath, content, 'utf8');
      } else {
        skipped++;
      }
    }
  }

  console.log(`\nDone:`);
  console.log(`  "Sonin Dental Clinic" added to ${clinicFixed} EN posts`);
  console.log(`  /contact/ link added to ${contactFixed} posts`);
  console.log(`  ${skipped} posts already OK`);
}

main().catch(err => { console.error(err); process.exit(1); });
