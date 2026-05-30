/**
 * Test: InstantID — generate blog image with Dmitri's face
 * Usage: REPLICATE_API_TOKEN=r8_... node scripts/test-instant-id.mjs
 */
import Replicate from 'replicate';
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const replicate = new Replicate();

// 1. Download doctor photo
console.log('📥 Downloading doctor photo...');
const photoUrl = 'https://website-jyzoitgt.onslate.eu/_astro/doctor-sonin.CDJ3TcKD_Z1b6PyA.webp';
const photoRes = await fetch(photoUrl);
const photoBuffer = Buffer.from(await photoRes.arrayBuffer());

// Convert to base64 data URI (InstantID accepts this)
const base64 = photoBuffer.toString('base64');
const dataUri = `data:image/webp;base64,${base64}`;

console.log('🎨 Generating with InstantID...');

const output = await replicate.run('zsxkib/instant-id:491ddf5be6b827f8931f088ef10c6d015f6d99685e6454e6f04c8ac298979686', {
  input: {
    image: dataUri,
    prompt: 'Professional portrait of a dentist in a modern dental clinic in Tallinn, Estonia. White medical coat, warm confident smile, clean bright dental office background with equipment. Photorealistic, high quality, natural lighting.',
    negative_prompt: 'cartoon, anime, unrealistic, blurry, low quality, deformed',
    width: 1200,
    height: 630,
    num_inference_steps: 30,
    guidance_scale: 5,
    ip_adapter_scale: 0.8,
    controlnet_conditioning_scale: 0.8,
  },
});

// Save result
let buffer;
if (typeof output === 'string') {
  const res = await fetch(output);
  buffer = Buffer.from(await res.arrayBuffer());
} else if (Array.isArray(output)) {
  const res = await fetch(output[0]);
  buffer = Buffer.from(await res.arrayBuffer());
} else {
  const chunks = [];
  for await (const chunk of output) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  buffer = Buffer.concat(chunks);
}

const outPath = join(ROOT, 'public', 'blog-images', 'test-instant-id.webp');
await sharp(buffer).resize(1200, 630, { fit: 'cover' }).webp({ quality: 85 }).toFile(outPath);

console.log('✅ Saved: public/blog-images/test-instant-id.webp');
console.log('   View at: http://localhost:4321/blog-images/test-instant-id.webp');
