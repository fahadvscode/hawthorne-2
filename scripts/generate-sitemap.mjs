import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const SITE = 'https://www.hawthorneeast-village.com';
const PAGES_DIR = 'src/pages';
const OUTPUT = 'public/sitemap.xml';
const EXCLUDED = new Set(['thank-you']);

async function findRoutes(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED.has(entry.name)) continue;
      routes.push(...(await findRoutes(path, `${base}/${entry.name}`)));
      continue;
    }

    if (entry.name === 'index.astro') {
      routes.push({
        loc: base === '' ? `${SITE}/` : `${SITE}${base}/`,
        file: path,
      });
    }
  }

  return routes;
}

function toIsoDate(mtime) {
  return new Date(mtime).toISOString().slice(0, 10);
}

function buildXml(routes) {
  const urls = routes
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map(
      ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const routes = await findRoutes(PAGES_DIR);

for (const route of routes) {
  const { mtime } = await stat(route.file);
  route.lastmod = toIsoDate(mtime);
}

await writeFile(OUTPUT, buildXml(routes), 'utf8');
console.log(`Sitemap written to ${OUTPUT} (${routes.length} URLs)`);
