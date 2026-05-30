/**
 * Test: generate blog hero image with doctor's face as reference
 * Usage: node scripts/test-image-with-face.mjs
 */
import OpenAI from 'openai';
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const openai = new OpenAI();

// 1. Download doctor photo
console.log('📥 Downloading doctor photo...');
const photoUrl = 'https://website-jyzoitgt.onslate.eu/_astro/doctor-sonin.CDJ3TcKD_Z1b6PyA.webp';
const photoRes = await fetch(photoUrl);
const photoBuffer = Buffer.from(await photoRes.arrayBuffer());

// Convert WebP → PNG (OpenAI requires PNG)
const photoPng = await sharp(photoBuffer).png().toBuffer();
console.log(`   Photo size: ${Math.round(photoPng.length / 1024)}KB`);

// 2. Generate image with face reference using gpt-image-1
console.log('🎨 Generating hero image with doctor reference...');

const prompt = `
Professional dental clinic blog hero image featuring a confident male dentist
(use the provided reference photo of the doctor).
The doctor is in a modern dental office, wearing a white medical coat,
smiling warmly at the camera or with a patient.
Clean, bright, trustworthy atmosphere. Tallinn dental clinic.
No text, no logos. Photorealistic, 16:9 horizontal composition.
`.trim();

// Use the edit endpoint which accepts a reference image
const { toFile } = await import('openai');
const imageFile = await toFile(photoPng, 'doctor.png', { type: 'image/png' });

const response = await openai.images.edit({
  model: 'gpt-image-1',
  image: imageFile,
  prompt,
  size: '1536x1024',
  quality: 'medium',
});

// 3. Save result
let buffer;
if (response.data[0].b64_json) {
  buffer = Buffer.from(response.data[0].b64_json, 'base64');
} else {
  const res = await fetch(response.data[0].url);
  buffer = Buffer.from(await res.arrayBuffer());
}

const outPath = join(ROOT, 'public', 'blog-images', 'test-doctor-face.webp');
await sharp(buffer).resize(1200, 630, { fit: 'cover' }).webp({ quality: 82 }).toFile(outPath);

console.log(`✅ Saved: public/blog-images/test-doctor-face.webp`);
console.log(`   View at: http://localhost:4322/blog-images/test-doctor-face.webp`);
