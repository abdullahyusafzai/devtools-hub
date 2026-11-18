# DevTools Hub — Project Requirements

## Vision
A fast, responsive, accessible all-in-one utility workspace for common online tasks. Upgrade the existing project in place; preserve its working tools, routes, integrations, and data. Do not advertise an unfinished catalog item as functional.

## Existing tools to preserve
- QR Code Generator
- Case Converter
- Word & Character Counter
- Dummy Text Generator
- Password Generator
- URL Encoder/Decoder
- Temperature Converter
- Image Converter
- Image Resizer
- Image Compressor
- Simple Image Cropper
- Text to Speech (browser speech synthesis)

## Requested tool catalog

### AI writing & language
AI Rephrasing Tool; Grammar Checker; Spell Checker; Sentence Rewriter; Text Summarizer; AI Content Improver; Tone Changer; AI Email Writer; Professional Message Generator; Paragraph Generator; Blog Outline Generator; Article Outline Generator; Text Simplifier; Translation Tool; Readability Checker; AI Title Generator; Social Media Caption Generator; AI Study Notes Generator.

### PDF & documents
PDF Merger; PDF Splitter; PDF Compressor; PDF to Word; Word to PDF; PDF to Image; Image to PDF; PDF to Excel; Excel to PDF; PDF Page Rotator; PDF Page Reorder; PDF Watermark; PDF Password Protection; PDF Unlocker for authorized files; PDF Signature Tool; PDF Text Extractor; PDF OCR; PDF Page Remover; PDF Page Extractor; PDF Redaction Tool.

### Image & design
Image Converter; Image Resizer; Image Compressor; Image Cropper; Image Background Remover; Image Upscaler; JPG to PNG; PNG to JPG; WebP Converter; AVIF Converter; HEIC Converter; SVG Converter; Image Watermark Tool; Image Metadata Remover; Image to Text; Image Color Picker; Color Palette Generator; Favicon Generator; Image Collage Maker; Meme Generator; Social Media Image Resizer.

### Audio & voice
AI Voice Artist; Downloadable Text to Speech; Speech to Text; Voice Recorder; Audio Converter; Audio Compressor; Audio Trimmer; Audio Joiner; Audio Speed Changer; Audio Volume Controller; Audio Noise Reduction; Audio Silence Remover; Voiceover Generator; Audio Transcription Tool.

### Video
Video Compressor; Video Converter; Video Trimmer; Video Merger; Video Cropper; Video Resizer; Video Speed Controller; Video to GIF; GIF to Video; Video to Audio; Video Mute Tool; Video Subtitle Generator; Subtitle Format Converter; Screen Recorder.

### QR codes & links
QR Code Generator; QR Code Scanner; QR with Logo; Wi-Fi QR Generator; Contact QR Generator; Email QR Generator; WhatsApp QR Generator; Bulk QR Generator; Dynamic QR Generator; Link Shortener; Custom Short Link Generator; URL Expander; Redirect Checker; UTM Link Builder; QR Download as PNG or SVG.

### Developer tools
JSON Formatter; JSON Validator; XML Formatter; YAML Formatter; HTML Formatter; CSS Formatter; JavaScript Formatter; SQL Formatter; Base64 Encoder/Decoder; URL Encoder/Decoder; HTML Encoder/Decoder; JWT Decoder; UUID Generator; SHA-256 Hash Generator; Regex Tester; Code Difference Checker; Markdown Preview; HTML Preview; CSV to JSON; JSON to CSV; Unix Timestamp Converter; CSS Gradient Generator; CSS Shadow Generator; Sample Data Generator.

### Calculators & converters
Basic Calculator; Scientific Calculator; Percentage Calculator; Age Calculator; Date Difference Calculator; Time Zone Converter; Currency Converter; Length Converter; Weight Converter; Temperature Converter; Area Converter; Speed Converter; Discount Calculator; Loan Calculator; EMI Calculator; Compound Interest Calculator; Profit Margin Calculator; GPA Calculator; Grade Calculator; VAT Calculator.

### Productivity & text
Word Counter; Character Counter; Case Converter; Dummy Text Generator; Remove Duplicate Lines; Text Sorter; Text Cleaner; Whitespace Remover; Find and Replace; Reading Time Calculator; Random Number Generator; Random Name Picker; Stopwatch; Countdown Timer; Pomodoro Timer; Notes Tool; Checklist Maker.

### SEO & marketing
Meta Tag Generator; SEO Title Generator; Meta Description Generator; Keyword Density Checker; Open Graph Preview; Search Result Preview; Sitemap Generator; Robots.txt Generator; URL Slug Generator; Canonical Tag Generator; Schema Markup Generator; UTM Campaign Builder; Social Media Post Formatter; Website Redirect Analyzer.

### Business & careers
Invoice Generator; Quotation Generator; Receipt Generator; Resume/CV Builder; Cover Letter Builder; Email Signature Generator; Business Card Generator; Meeting Agenda Generator; Business Name Generator; Expense Tracker.

### Education
Quiz Generator; MCQ Generator; Flashcard Maker; Worksheet Generator; Study Planner; Lesson Planner; Timetable Maker; GPA Calculator; Math Formula Editor; Vocabulary Practice Tool; Random Student Picker.

### Security & privacy
Secure Password Generator; Password Strength Checker; File Hash Calculator; Checksum Verifier; Text Redaction Tool; File Metadata Viewer; Image Metadata Remover; URL Preview Tool; QR Link Preview Tool; Random Security Token Generator.

### Games & entertainment
Classic Snake Game; Tic-Tac-Toe; Memory Matching Game; Number Guessing Game; Typing Speed Test; Reaction Time Test; Word Guessing Game; Rock Paper Scissors; 2048 Puzzle; Simple Sudoku.

## Priority feature requirements

### Offline Voice Artist
- Synthesize speech locally in the browser with an offline speech engine; do not send script text to a provider or speech API.
- Offer English voice variants, speed, pitch, and volume controls, audio preview, a custom filename, and a genuine WAV download.
- Limit scripts to 4,000 characters and show clear validation, initialization progress, and errors.
- Keep the engine data self-hosted with the app; no account, API key, paid service, or per-download fee.

### Snake
- Original grid-based game, not an image or commercial asset copy.
- Four-way controls; keyboard arrows/WASD and mobile direction buttons/swipes; prevent touch scrolling over the board.
- Food placement, growth, score, collisions, game-over, start/pause/restart, Easy/Medium/Hard speeds, and local high score.
- Responsive, accessible board; no network required after app resources load.

## Design, accessibility, and SEO
- Premium restrained navy/violet/blue/cyan visual system, polished surfaces, responsive cards, and reduced-motion support.
- Persistent light/dark preference, search, category navigation, favorites, and direct shareable tool hash routes.
- Mobile-first layout at widths 320, 375, 430, 768, 1024, 1440, and 1920px; no horizontal overflow or clipped controls.
- Semantic labels, keyboard operation, visible focus, meaningful status messages, and accessible file workflows.
- Maintain meaningful metadata, English-first content, and an architecture that can later support translations.

## Architecture and safety
- Preserve the original React-on-CDN app; use Vite for build/development and Vercel Functions only for features that need server-side work.
- Keep the tool catalog centralized and label every entry Ready or In development.
- Use local browser processing for suitable text and image utilities. Do not upload local files unless a feature explicitly needs a server.
- Validate and cap inputs at each tool boundary.
- Do not expose credentials, misrepresent model options, or imply that pending tools work.
- URL shortening/dynamic QR require persistent storage, redirect safeguards, and abuse controls before release.

## Implemented in this phase
- Preserved existing tools and hash routes while extending the current React-on-CDN/Vite app.
- Responsive dashboard improvements: shared search, category navigation, favorites, saved theme, About/Privacy/Terms pages, dynamic document titles/descriptions, and mobile tool layout.
- The complete requested catalog remains discoverable; tools without real implementations stay labeled In development and cannot be launched.
- Offline Voice Artist synthesizes in-browser with self-hosted English eSpeak NG data and exports real WAV audio.
- Local PDF suite: merge, split selected pages into separate files, extract, remove, reorder, rotate, watermark, and inspect metadata, with per-file and aggregate size limits.
- Local JSON Formatter/Validator, Regex Tester, CSV/JSON converters, safe Markdown Preview, CSS Gradient/Shadow generators, Base64 and HTML encoders, UUID, SHA-256, timestamp, and URL tools.
- Added JWT decoding (explicitly not verification), line-based code diff, HTTP status reference, sample-data and Lorem Ipsum generators, date difference, stopwatch, countdown/Pomodoro timers, Tic-Tac-Toe, and fixed text/calculator utilities.
- Added server-side AI Text Summarizer and AI Rephrasing through Vercel AI Gateway. The endpoint validates inputs, limits to eight requests per IP per minute using the existing Upstash KV credentials, and does not store request text.
- Added `robots.txt`, a generated tool-specific sitemap, crawlable static tool routes with canonical metadata and no-JavaScript content fallbacks, security headers, and disabled AdSense until a valid ad-slot ID is supplied.
- Added unit coverage for safe arithmetic, JWT decoding, line diff, and PDF page selection.

## Pending work
- The remaining catalog entries are intentionally still in development; implement them category by category rather than showing generic or misleading outputs.
- Complete browser/device/accessibility tests, exercise PDF file outputs, and verify offline speech WAV generation in supported browsers.
- Additional offline speech languages, a social sharing image, and a valid AdSense ad-slot ID are not configured.

## Known constraints
- AI writing sends submitted text to the hosted Gemini model through Vercel AI Gateway and may incur model charges. It is explicitly opt-in and rate-limited; review AI Gateway budgets/usage controls before public release. The Vercel deployment supplies Gateway authentication; local API testing needs `npm run dev:vercel` and configured runtime credentials.
- Upstash KV REST environment variables are required for the AI endpoint's fail-closed rate limit. They are already configured for this project.
- Hash-based SPA routes remain supported for existing links. Each ready tool also has a generated `/tools/<id>/` route with static title, description, canonical URL, and readable no-JavaScript content; the build generates a tool-specific sitemap.
- PDF operations use `pdf-lib`, run locally, and do not support encrypted PDFs. Image-to-PDF remains a separate local tool.
- Offline speech currently has English voices only. Tailwind and React are still served from CDNs as in the inherited project.

## Next priorities
1. Continue implementing the remaining tools category by category and expand automated regression/accessibility coverage.
2. Add additional offline voice languages.
3. Configure production advertising only after a valid AdSense ad-slot ID is supplied.
