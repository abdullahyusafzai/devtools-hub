import test from 'node:test';
import assert from 'node:assert/strict';
import { renderSitemap, renderToolRoutePage, toolRouteById, toolRoutes } from './tool-route-data.js';

test('crawlable tool routes have unique, URL-safe IDs and descriptions', () => {
  const ids = toolRoutes.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  for (const tool of toolRoutes) {
    assert.match(tool.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(tool.name.trim());
    assert.ok(tool.category.trim());
    assert.ok(tool.description.trim());
  }
  assert.equal(toolRouteById.get('pdf-merger')?.name, 'PDF Merger');
});

test('tool pages include crawlable copy, canonical metadata, and the working app shell', () => {
  const template = '<html><head><title>Home</title><meta name="description" content="Home"><meta property="og:title" content="Home"><meta property="og:description" content="Home"><meta property="og:url" content="https://example.test/"></head><body><div id="root"></div></body></html>';
  const page = renderToolRoutePage(template, toolRouteById.get('pdf-merger'));
  assert.ok(page.includes('<title>PDF Merger — DevTools Hub</title>'));
  assert.ok(page.includes('<h1 id="seo-tool-title">PDF Merger</h1>'));
  assert.ok(page.includes('Combine multiple PDFs into one file locally.'));
  assert.ok(page.includes('<meta name="description" content="Combine multiple PDFs into one file locally.">'));
  assert.ok(page.includes('<meta property="og:title" content="PDF Merger — DevTools Hub">'));
  assert.ok(page.includes('href="https://devtools-hub-ab.vercel.app/tools/pdf-merger/"'));
  assert.ok(page.includes('href="/#pdf-merger"'));
  assert.ok(page.indexOf('id="root"') < page.indexOf('id="route-fallback"'));
});

test('tool sitemap contains the homepage and only clean tool URLs', () => {
  const sitemap = renderSitemap(toolRoutes.slice(0, 2));
  assert.ok(sitemap.includes('https://devtools-hub-ab.vercel.app/'));
  assert.ok(sitemap.includes('https://devtools-hub-ab.vercel.app/tools/qr-code-generator/'));
  assert.doesNotMatch(sitemap, /#/);
  assert.equal((sitemap.match(/<loc>/g) || []).length, 3);
});
