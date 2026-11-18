export const SITE_ORIGIN = 'https://devtools-hub-ab.vercel.app';

export const toolRoutes = [
  { id: 'qr-code-generator', name: 'QR Code Generator', category: 'QR Codes & Links', description: 'Create a scannable QR code from a link or text, right in your browser.' },
  { id: 'case-converter', name: 'Case Converter', category: 'Productivity & Text', description: 'Convert text between uppercase, lowercase, title case, and other common styles.' },
  { id: 'word-character-counter', name: 'Word & Character Counter', category: 'Productivity & Text', description: 'Count words, characters, and lines in text as you type.' },
  { id: 'dummy-text-generator', name: 'Dummy Text Generator', category: 'Productivity & Text', description: 'Generate placeholder text for layouts, prototypes, and design drafts.' },
  { id: 'password-generator', name: 'Password Generator', category: 'Security & Privacy', description: 'Create a random password locally in your browser.' },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', category: 'Developer Tools', description: 'Encode or decode URL components locally without sending text to a server.' },
  { id: 'temperature-converter', name: 'Temperature Converter', category: 'Calculators & Converters', description: 'Convert values between Celsius, Fahrenheit, and Kelvin.' },
  { id: 'image-converter', name: 'Image Converter', category: 'Images & Design', description: 'Convert images to supported formats using your browser.' },
  { id: 'image-resizer', name: 'Image Resizer', category: 'Images & Design', description: 'Resize an image to custom dimensions without uploading it.' },
  { id: 'image-compressor', name: 'Image Compressor', category: 'Images & Design', description: 'Reduce image file size in your browser with adjustable output quality.' },
  { id: 'image-cropper', name: 'Simple Image Cropper', category: 'Images & Design', description: 'Crop an image with a touch-friendly selection and download the result.' },
  { id: 'text-to-speech', name: 'Text to Speech', category: 'Audio & Voice', description: 'Listen to text with browser speech synthesis.' },
  { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', category: 'Developer Tools', description: 'Encode or decode UTF-8 text as Base64 locally.' },
  { id: 'html-encoder-decoder', name: 'HTML Encoder/Decoder', category: 'Developer Tools', description: 'Encode or decode common HTML entities in your browser.' },
  { id: 'uuid-generator', name: 'UUID Generator', category: 'Developer Tools', description: 'Generate cryptographically secure version 4 UUIDs locally.' },
  { id: 'sha-256-hash-generator', name: 'SHA-256 Hash Generator', category: 'Developer Tools', description: 'Create a SHA-256 digest from text using Web Crypto.' },
  { id: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', category: 'Developer Tools', description: 'Convert Unix timestamps and dates in either direction.' },
  { id: 'grammar-checker', name: 'Grammar Checker', category: 'Text & Writing', description: 'Check common spelling and punctuation issues locally. This lightweight checker is not a full grammar editor.' },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', category: 'Productivity & Text', description: 'Remove repeated lines from text without uploading your content.' },
  { id: 'text-cleaner', name: 'Text Cleaner', category: 'Productivity & Text', description: 'Normalize whitespace and remove excess blank lines locally.' },
  { id: 'reading-time-calculator', name: 'Reading Time Calculator', category: 'Productivity & Text', description: 'Count words and estimate reading time at a selected pace.' },
  { id: 'url-slug-generator', name: 'URL Slug Generator', category: 'SEO & Marketing', description: 'Create a clean URL slug from a page title in your browser.' },
  { id: 'regex-tester', name: 'Regex Tester', category: 'Developer Tools', description: 'Test JavaScript regular expressions against sample text on this device.' },
  { id: 'csv-to-json', name: 'CSV to JSON', category: 'Developer Tools', description: 'Convert CSV rows into JSON objects locally.' },
  { id: 'json-to-csv', name: 'JSON to CSV', category: 'Developer Tools', description: 'Convert arrays of JSON objects to CSV in your browser.' },
  { id: 'markdown-preview', name: 'Markdown Preview', category: 'Developer Tools', description: 'Preview a safe subset of Markdown without uploading text.' },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', category: 'Developer Tools', description: 'Build and preview a two-color CSS gradient.' },
  { id: 'ai-voice-artist', name: 'Offline Voice Artist', category: 'Audio & Voice', description: 'Create and download WAV speech locally in your browser with self-hosted voice data.' },
  { id: 'snake-game', name: 'Classic Snake Game', category: 'Games & Entertainment', description: 'Play a responsive grid-based Snake game with touch and keyboard controls.' },
  { id: 'image-to-pdf', name: 'Image to PDF', category: 'PDF & Documents', description: 'Combine PNG and JPEG images into a PDF locally on your device.' },
  { id: 'json-formatter', name: 'JSON Formatter', category: 'Developer Tools', description: 'Format, minify, copy, and download JSON in your browser.' },
  { id: 'json-validator', name: 'JSON Validator', category: 'Developer Tools', description: 'Validate JSON syntax locally and see clear error feedback.' },
  { id: 'basic-calculator', name: 'Basic Calculator', category: 'Calculators & Converters', description: 'Evaluate arithmetic expressions locally with a safe expression parser.' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', category: 'Calculators & Converters', description: 'Calculate percentages of a number in your browser.' },
  { id: 'text-sorter', name: 'Text Sorter', category: 'Productivity & Text', description: 'Sort lines alphabetically while keeping text on your device.' },
  { id: 'whitespace-remover', name: 'Whitespace Remover', category: 'Productivity & Text', description: 'Normalize spaces and remove excess blank lines locally.' },
  { id: 'find-and-replace', name: 'Find and Replace', category: 'Productivity & Text', description: 'Find and replace text locally without uploading your content.' },
  { id: 'random-number-generator', name: 'Random Number Generator', category: 'Productivity & Text', description: 'Generate a random integer within a range you choose.' },
  { id: 'password-strength-checker', name: 'Password Strength Checker', category: 'Security & Privacy', description: 'Check password length and character variety locally; the password is not sent.' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', category: 'SEO & Marketing', description: 'Create an escaped title and description meta tag snippet.' },
  { id: 'discount-calculator', name: 'Discount Calculator', category: 'Calculators & Converters', description: 'Calculate savings and final price from a percentage discount.' },
  { id: 'age-calculator', name: 'Age Calculator', category: 'Calculators & Converters', description: 'Calculate age from a birth date without sharing it.' },
  { id: 'utm-campaign-builder', name: 'UTM Campaign Builder', category: 'SEO & Marketing', description: 'Add source, medium, and campaign parameters to a valid URL.' },
  { id: 'pdf-merger', name: 'PDF Merger', category: 'PDF & Documents', description: 'Combine multiple PDFs into one file locally.' },
  { id: 'pdf-splitter', name: 'PDF Splitter', category: 'PDF & Documents', description: 'Export selected PDF pages as separate files locally.' },
  { id: 'pdf-page-rotator', name: 'PDF Page Rotator', category: 'PDF & Documents', description: 'Rotate PDF pages and download the result.' },
  { id: 'pdf-page-reorder', name: 'PDF Page Reorder', category: 'PDF & Documents', description: 'Arrange PDF pages in a new order on your device.' },
  { id: 'pdf-watermark', name: 'PDF Watermark', category: 'PDF & Documents', description: 'Add a text watermark to every page of a PDF locally.' },
  { id: 'pdf-page-remover', name: 'PDF Page Remover', category: 'PDF & Documents', description: 'Remove selected pages from a PDF locally.' },
  { id: 'pdf-page-extractor', name: 'PDF Page Extractor', category: 'PDF & Documents', description: 'Create a new PDF from selected pages locally.' },
  { id: 'pdf-metadata-viewer', name: 'PDF Metadata Viewer', category: 'PDF & Documents', description: 'Inspect embedded title, author, and date metadata locally.' },
  { id: 'jwt-decoder', name: 'JWT Decoder', category: 'Developer Tools', description: 'Inspect a token header and payload. This tool does not verify signatures.' },
  { id: 'code-difference-checker', name: 'Code Difference Checker', category: 'Developer Tools', description: 'Compare line changes locally with a bounded line-based diff.' },
  { id: 'http-status-code-reference', name: 'HTTP Status Code Reference', category: 'Developer Tools', description: 'Search common HTTP response codes and their explanations.' },
  { id: 'css-shadow-generator', name: 'CSS Shadow Generator', category: 'Developer Tools', description: 'Tune and preview a CSS box-shadow declaration.' },
  { id: 'sample-data-generator', name: 'Sample Data Generator', category: 'Developer Tools', description: 'Create fictional JSON records with reserved example.test email addresses.' },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', category: 'Productivity & Text', description: 'Generate standard placeholder paragraphs.' },
  { id: 'date-difference-calculator', name: 'Date Difference Calculator', category: 'Calculators & Converters', description: 'Calculate elapsed days and weeks between two dates.' },
  { id: 'stopwatch', name: 'Stopwatch', category: 'Productivity & Text', description: 'Time an activity and record laps in your browser.' },
  { id: 'countdown-timer', name: 'Countdown Timer', category: 'Productivity & Text', description: 'Run a browser-based countdown for up to three hours.' },
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', category: 'Productivity & Text', description: 'Start a focused work interval with a local countdown.' },
  { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', category: 'Games & Entertainment', description: 'Play a two-player game on this device.' },
  { id: 'text-summarizer', name: 'Text Summarizer', category: 'AI Tools', description: 'Summarize submitted text with an explicitly disclosed AI model request.' },
  { id: 'ai-rephrasing-tool', name: 'AI Rephrasing Tool', category: 'AI Tools', description: 'Rewrite submitted text for clarity with an explicitly disclosed AI model request.' }
];

export const toolRouteById = new Map(toolRoutes.map((tool) => [tool.id, tool]));

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function replaceMetaTag(html, attributeName, attributeValue, content) {
  const escapedContent = escapeHtml(content);
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attributeName}=["']${attributeValue}["'])[^>]*>`, 'i');
  return html.replace(pattern, `<meta ${attributeName}="${attributeValue}" content="${escapedContent}">`);
}

export function renderToolRoutePage(template, tool) {
  const canonicalUrl = `${SITE_ORIGIN}/tools/${tool.id}/`;
  const title = `${tool.name} — DevTools Hub`;
  let html = template
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i, `<meta name="description" content="${escapeHtml(tool.description)}">`);

  html = replaceMetaTag(html, 'property', 'og:title', title);
  html = replaceMetaTag(html, 'property', 'og:description', tool.description);
  html = replaceMetaTag(html, 'property', 'og:url', canonicalUrl);

  const canonicalPattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i;
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  html = canonicalPattern.test(html)
    ? html.replace(canonicalPattern, canonicalTag)
    : html.replace('</head>', `  ${canonicalTag}\n</head>`);

  const fallback = `<main id="route-fallback" class="route-fallback" aria-labelledby="seo-tool-title"><p class="route-fallback__eyebrow">${escapeHtml(tool.category)} · Browser-first utility</p><h1 id="seo-tool-title">${escapeHtml(tool.name)}</h1><p>${escapeHtml(tool.description)}</p><a href="/#${encodeURIComponent(tool.id)}">Open ${escapeHtml(tool.name)} in the workspace</a></main>`;
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Unable to find the application root in the built HTML template.');
  }
  return html.replace('<div id="root"></div>', `<div id="root"></div>\n${fallback}`);
}

export function renderSitemap(tools = toolRoutes) {
  const urls = [
    `${SITE_ORIGIN}/`,
    ...tools.map((tool) => `${SITE_ORIGIN}/tools/${encodeURIComponent(tool.id)}/`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
}
