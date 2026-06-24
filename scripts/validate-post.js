#!/usr/bin/env node
/**
 * SEO validator for generated blog posts.
 * Checks: frontmatter completeness, title/description length,
 * content structure (word count, H2/H3, CTA), image file + Claude Vision.
 *
 * Returns: { pass: boolean, issues: string[] }
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const client = new Anthropic();

// ── Frontmatter parser ────────────────────────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const raw = match[1];
  const result = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^(\w+):\s*'?(.*?)'?$/);
    if (m) result[m[1]] = m[2].replace(/''/g, "'");
  }
  return result;
}

// ── Technical checks ─────────────────────────────────────────────────────────
function validateTechnical(content, imagePath) {
  const issues = [];
  const fm = parseFrontmatter(content);
  const body = content.replace(/^---[\s\S]*?---\n/, '');

  // Frontmatter fields
  for (const field of ['title', 'description', 'pubDate', 'lang', 'author', 'heroImage']) {
    if (!fm[field]) issues.push(`Missing frontmatter field: ${field}`);
  }

  // Title length 40–80 chars
  if (fm.title) {
    const len = fm.title.length;
    if (len < 40) issues.push(`Title too short (${len} chars, min 40)`);
    if (len > 80) issues.push(`Title too long (${len} chars, max 80)`);
  }

  // Description length 100–165 chars
  if (fm.description) {
    const len = fm.description.length;
    if (len < 100) issues.push(`Description too short (${len} chars, min 100)`);
    if (len > 165) issues.push(`Description too long (${len} chars, max 165)`);
  }

  // Content structure
  if (!body.includes('## ')) issues.push('Missing H2 heading (##)');
  if (!body.includes('### ')) issues.push('Missing H3 subheadings (###)');

  // Word count 500–1000
  const words = body.trim().split(/\s+/).length;
  if (words < 500) issues.push(`Content too short (${words} words, min 500)`);
  if (words > 1100) issues.push(`Content too long (${words} words, max 1100)`);

  // CTA at end (last 200 chars should have booking signal)
  const tail = body.slice(-300).toLowerCase();
  const hasCTA = /запис|консульт|звоните|book|appoint|registr|contact|varaa|bron|konsultat/.test(tail);
  if (!hasCTA) issues.push('Missing CTA at end of article');

  // Tags checks
  const tagsMatch = content.match(/^tags:\s*\[(.*?)\]/m);
  if (!tagsMatch) {
    issues.push('Missing tags field');
  } else {
    const tagsStr = tagsMatch[1];
    const tagList = tagsStr.split(',').map(t => t.trim().replace(/^['"]|['"]$/g, ''));

    // Count and length
    if (tagList.length < 3) issues.push(`Too few tags (${tagList.length}, min 3)`);
    if (tagList.length > 6) issues.push(`Too many tags (${tagList.length}, max 6)`);
    if (tagList.some(t => t.length > 40)) issues.push('Tag too long (max 40 chars) — likely full keyword used as tag');
    if (tagList.some(t => t.split(' ').length > 4)) issues.push('Tag has more than 4 words — keep tags short');

    // No doctor name in tags
    if (tagList.some(t => /сонин|sonin|dmitri|дмитрий/i.test(t))) issues.push('Doctor name should not appear in tags');

    // No clinic name in tags
    if (tagList.some(t => /sonin hambaravi/i.test(t))) issues.push('Clinic name "Sonin Hambaravi" should not appear in tags');

    // Language consistency — Estonian-only words in non-ET posts
    const ET_ONLY = ['hambaravi', 'hambaarst', 'proteesimine', 'implantatsioon'];
    if (fm.lang !== 'et' && tagList.some(t => ET_ONLY.some(w => t.toLowerCase().includes(w)))) {
      issues.push(`Estonian dental term used as tag in ${fm.lang} post`);
    }

    // Tags must be in the correct language
    const LANG_CHECKS = {
      ru: { pattern: /[а-яё]/i, hint: 'Russian tags must contain Cyrillic characters' },
      fi: { pattern: /\b(hammas|proteesi|implantti|hoito|tallinna)\b/i, hint: 'Finnish tags should contain Finnish dental terms' },
      en: { pattern: /\b(dental|tooth|teeth|denture|implant|crown|clinic|tallinn)\b/i, hint: 'English tags should contain English dental or location terms' },
    };
    const check = LANG_CHECKS[fm.lang];
    if (check && !tagList.some(t => check.pattern.test(t))) {
      issues.push(`Tags may be in wrong language for ${fm.lang} post — ${check.hint}`);
    }

    // No tag should be a duplicate of another
    const unique = new Set(tagList.map(t => t.toLowerCase()));
    if (unique.size < tagList.length) issues.push('Duplicate tags detected');
  }

  // Image file checks
  if (imagePath) {
    if (!existsSync(imagePath)) {
      issues.push(`Image file not found: ${imagePath}`);
    } else {
      const size = statSync(imagePath).size;
      if (size > 300 * 1024) issues.push(`Image too large (${Math.round(size / 1024)}KB, max 300KB)`);
      if (size < 10 * 1024) issues.push(`Image suspiciously small (${Math.round(size / 1024)}KB)`);
    }
  }

  return issues;
}

// ── Claude Vision check ───────────────────────────────────────────────────────
async function validateImageWithVision(imagePath, keyword, lang) {
  if (!existsSync(imagePath)) return ['Image not found, skipping vision check'];

  const imageBuffer = readFileSync(imagePath);
  const base64 = imageBuffer.toString('base64');

  const prompt = `You are a quality checker for a dental clinic blog. Evaluate this hero image for a blog post about "${keyword}" (language: ${lang}).

Check ALL of the following:
1. Is it a professional, realistic-looking dental/medical photo? (not cartoonish, not abstract)
2. Are there any visible text, logos, or watermarks? (must have NONE)
3. If people are visible: do they look Northern European/Scandinavian (fair skin, short hair)? Are they aged 45–70? Do they look trustworthy, not like fashion models?
4. Is the image horizontally oriented (wider than tall)?
5. Is the image relevant to dental care / the topic?

Respond in JSON only:
{
  "pass": true/false,
  "issues": ["issue 1", "issue 2"]
}

If all checks pass, return { "pass": true, "issues": [] }.`;

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: 'image/webp', data: base64 } },
        { type: 'text', text: prompt },
      ],
    }],
  });

  try {
    const text = msg.content[0].text.trim();
    const json = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
    return json.issues ?? [];
  } catch {
    return ['Vision check returned unparseable response'];
  }
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function validatePost({ filePath, imagePath, keyword, lang }) {
  const content = readFileSync(filePath, 'utf8');
  const techIssues = validateTechnical(content, imagePath);
  const visionIssues = await validateImageWithVision(imagePath, keyword, lang);

  const issues = [...techIssues, ...visionIssues];
  const pass = issues.length === 0;

  return { pass, issues };
}
