#!/usr/bin/env node
/**
 * Refreshes topics.js using Claude — analyzes current topics for relevance,
 * adds trending dental SEO topics, removes outdated ones.
 * Runs automatically before daily blog generation.
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOPICS_PATH = join(ROOT, 'scripts', 'topics.js');
const client = new Anthropic();

const today = new Date().toISOString().slice(0, 10);

const REFRESH_PROMPT = `You are an SEO and dental content strategist. Today is ${today}.

Your task: review and improve the dental clinic blog topics list for drsonin.com (Sonin Hambaravi, Tallinn, Estonia).

The clinic specializes in: implantology, prosthetics, crowns, veneers, bone grafting, All-on-4.
Target audiences: Russian-speaking patients in Estonia, Estonian locals, Finnish dental tourists, English-speaking expats.
NO pediatric dentistry (no license).

Current topics file content:
\`\`\`js
${readFileSync(TOPICS_PATH, 'utf8')}
\`\`\`

Instructions:
1. Keep all existing topics that are still SEO-relevant and evergreen.
2. Identify up to 5 topics that are outdated, too generic, or poorly targeted — mark them for removal.
3. Add up to 8 NEW high-value topics based on:
   - Current dental SEO trends (${today.slice(0, 7)})
   - Patient questions that get high search volume in Estonia/Finland
   - Seasonal relevance (summer travel = dental tourism; winter = tooth sensitivity from cold)
   - Competitor gap analysis (topics competitors rank for but we don't cover)
4. For each new topic, add entries for all relevant languages (ru/et/fi/en or subset).
   Use type: 'faq' for patient question articles, type: 'medical-tourism' for comparison articles, omit type for informational.
5. Keep slugs lowercase, hyphenated, no special chars, no diacritics.

Return ONLY valid JavaScript — the complete updated TOPICS array content, ready to replace the existing file.
The output must start with:
// Rotating topic seeds for daily blog generation
// Each entry has keywords in all four languages + stable slug per language
// Focus: implantology + prosthetics (no pediatric dentistry — no license)
// Last refreshed: ${today}

export const TOPICS = [
  ... all topics ...
];

Do NOT include any explanation, markdown fences, or commentary outside the JS code.`;

async function main() {
  console.log(`\n🔄 Refreshing topics — ${today}`);

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: REFRESH_PROMPT }],
  });

  const result = msg.content[0].text.trim();

  // Sanity check: must contain TOPICS array
  if (!result.includes('export const TOPICS') || !result.includes('slug:')) {
    console.error('❌ Refresh returned invalid content — keeping existing topics.js');
    process.exit(0);
  }

  writeFileSync(TOPICS_PATH, result, 'utf8');
  console.log('✅ topics.js updated successfully');
}

main().catch(err => {
  console.error('❌ refresh-topics failed:', err.message);
  process.exit(0); // Don't block blog generation if refresh fails
});
