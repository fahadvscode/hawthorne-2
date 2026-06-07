import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/images');

const forest = { r: 26, g: 46, b: 31 };
const gold = { r: 201, g: 168, b: 76 };

async function createGradient(width, height, filename) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${forest.r},${forest.g},${forest.b})"/>
          <stop offset="50%" style="stop-color:rgb(45,74,52)"/>
          <stop offset="100%" style="stop-color:rgb(${forest.r},${forest.g},${forest.b})"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <rect x="0" y="${height * 0.7}" width="100%" height="${height * 0.3}" fill="rgb(${gold.r},${gold.g},${gold.b})" opacity="0.15"/>
      <text x="50%" y="50%" font-family="Georgia, serif" font-size="${width * 0.04}" fill="rgb(${gold.r},${gold.g},${gold.b})" text-anchor="middle" opacity="0.4">Hawthorne East Village</text>
    </svg>`;

  const base = join(outDir, filename);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(`${base}.webp`);
  await sharp(Buffer.from(svg)).avif({ quality: 65 }).toFile(`${base}.avif`);
}

await mkdir(outDir, { recursive: true });

const sizes = [
  { w: 640, h: 360, name: 'hero-640' },
  { w: 1280, h: 720, name: 'hero-1280' },
  { w: 1920, h: 1080, name: 'hero-1920' },
];

for (const { w, h, name } of sizes) {
  await createGradient(w, h, name);
}

const cards = ['village-townhome', 'rear-lane-townhome', 'detached-home'];
for (const card of cards) {
  await createGradient(400, 260, card);
}

await createGradient(1200, 630, 'og-default');
for (const page of ['home', 'floor-plans', 'prices', 'townhomes', 'detached', 'location', 'faq', 'register']) {
  await sharp(join(outDir, 'og-default.webp'))
    .toFile(join(outDir, `og-${page}.jpg`));
}

console.log('Images generated in public/images/');
