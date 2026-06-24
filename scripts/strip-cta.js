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
const CTA_RE = /запис|консульт|broneeri|varaa |book.*consult|book.*appoint|ota yhteyttä|registreeri|свяжитесь|позвоните|call us|contact us|ajanvaraus|yhteystiedot/i;

// Also strip lines that are just contact links we added earlier
const CONTACT_LINK_RE = /^\[(?:Записаться|Broneeri|Varaa|Book)[^\]]*\]\(\/[a-z]{0,2}\/?contact\/?\)$/;

// Strip trailing CTA blocks from body text
function stripCta(body) {
  const blocks = body.split(/\n\n+/);
  const before = blocks.length;

  while (blocks.length > 0) {
    const last = blocks[blocks.length - 1].trim();

    // Empty or lone separator
    if (!last || last === '---') { blocks.pop(); continue; }

    // H2/H3 heading that is a CTA
    if (/^#{2,3}\s+.*(varaa|broneeri|запис|book|registr|консульт)/i.test(last.split('\n')[0])) { blocks.pop(); continue; }

    // Pure contact link line
    if (CONTACT_LINK_RE.test(last)) { blocks.pop(); continue; }

    // drsonin.com / emoji reference lines
    if (/📍|🌐|drsonin\.com/.test(last) && last.length < 200) { blocks.pop(); continue; }

    // CTA paragraph: booking keyword + short enough to be a CTA
    if (CTA_RE.test(last) && last.length < 500) { blocks.pop(); continue; }

    // Paragraph that follows a CTA heading (penultimate block is a CTA heading)
    if (blocks.length >= 2) {
      const prev = blocks[blocks.length - 2].trim();
      if (/^#{2,3}\s+.*(varaa|broneeri|запис|book|registr|консульт)/i.test(prev.split('\n')[0])) {
        blocks.pop(); continue;
      }
    }

    // Contact link embedded inside paragraph — remove just that line
    const withoutLink = last.replace(/\n?\[(?:Записаться|Broneeri|Varaa|Book)[^\]]*\]\(\/[a-z]{0,2}\/?contact\/?\)\n?/g, '').trim();
    if (withoutLink !== last) {
      if (!withoutLink) blocks.pop();
      else blocks[blocks.length - 1] = withoutLink;
      continue;
    }

    break;
  }

  const changed = blocks.length !== before;
  return { result: blocks.join('\n\n').trimEnd() + '\n', changed };
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

      const { result: stripped, changed } = stripCta(body);

      if (!changed) { skipped++; continue; }

      writeFileSync(filePath, fm + '\n' + stripped, 'utf8');
      console.log(`✓ [${lang}] ${file}`);
      fixed++;
    }
  }

  console.log(`\nDone: ${fixed} stripped, ${skipped} already clean`);
}

main().catch(err => { console.error(err); process.exit(1); });
