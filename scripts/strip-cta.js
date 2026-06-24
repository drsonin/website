#!/usr/bin/env node
/**
 * One-time: strip CTA paragraphs and /contact/ links from existing blog posts.
 * CTA is now handled by BlogPost layout — content should end with real content.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(dirname(__dirname), 'src', 'content', 'blog');

// Keywords that signal a CTA paragraph
const CTA_RE = /запис|консульт|broneeri|varaa aika|book.*consult|book.*appoint|ota yhteyttä|registreeri|свяжитесь|позвоните|call us|contact us/i;

// Also strip lines that are just contact links we added earlier
const CONTACT_LINK_RE = /^\[(?:Записаться|Broneeri|Varaa|Book)[^\]]*\]\(\/[a-z]{0,2}\/?contact\/?\)$/;

// Strip trailing CTA blocks from body text
function stripCta(body) {
  // Split into blocks (double newline separated)
  const blocks = body.split(/\n\n+/);

  // Work from the end, remove blocks that are CTA
  while (blocks.length > 0) {
    const last = blocks[blocks.length - 1].trim();

    // Remove if: empty, just a contact link, or CTA keyword + short (<120 chars)
    if (!last) { blocks.pop(); continue; }

    // Pure contact link line
    if (CONTACT_LINK_RE.test(last)) { blocks.pop(); continue; }

    // drsonin.com reference lines (📍 / 🌐 lines)
    if (/📍|🌐|drsonin\.com/.test(last) && last.length < 200) { blocks.pop(); continue; }

    // CTA paragraph: contains booking keyword and is relatively short
    if (CTA_RE.test(last) && last.length < 500) { blocks.pop(); continue; }

    // Inline contact link inside a paragraph — strip just the link line
    const withoutLink = last.replace(/\n?\[(?:Записаться|Broneeri|Varaa|Book)[^\]]*\]\(\/[a-z]{0,2}\/?contact\/?\)\n?/g, '').trim();
    if (withoutLink !== last) {
      if (!withoutLink) { blocks.pop(); }
      else { blocks[blocks.length - 1] = withoutLink; }
      continue;
    }

    break;
  }

  return blocks.join('\n\n').trimEnd() + '\n';
}

async function main() {
  const langs = ['ru', 'et', 'fi', 'en'];
  let fixed = 0, skipped = 0;

  for (const lang of langs) {
    const dir = join(BLOG_DIR, lang);
    let files;
    try { files = readdirSync(dir).filter(f => f.endsWith('.md')); }
    catch { continue; }

    for (const file of files) {
      const filePath = join(dir, file);
      const content = readFileSync(filePath, 'utf8');

      const fmEnd = content.indexOf('---', 3) + 3;
      const fm = content.slice(0, fmEnd);
      const body = content.slice(fmEnd).replace(/^\n/, '');

      const stripped = stripCta(body);

      if (stripped === body) { skipped++; continue; }

      writeFileSync(filePath, fm + '\n' + stripped, 'utf8');
      console.log(`✓ [${lang}] ${file}`);
      fixed++;
    }
  }

  console.log(`\nDone: ${fixed} stripped, ${skipped} already clean`);
}

main().catch(err => { console.error(err); process.exit(1); });
