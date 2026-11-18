import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderSitemap, renderToolRoutePage, toolRoutes } from '../src/tool-route-data.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = resolve(projectRoot, 'dist');
const template = await readFile(resolve(distRoot, 'index.html'), 'utf8');

for (const tool of toolRoutes) {
  const outputPath = resolve(distRoot, 'tools', tool.id, 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderToolRoutePage(template, tool));
}

await writeFile(resolve(distRoot, 'sitemap.xml'), renderSitemap());
