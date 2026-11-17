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
- All 12 original tool implementations preserved.
- Responsive redesigned dashboard, category/search discovery, descriptive task suggestions, favorites, and saved light/dark mode.
- Full requested catalog is discoverable; unfinished tools are labeled In development and are not launchable.
- Offline Voice Artist/Text to Speech route with locally synthesized speech, self-hosted English engine data, and downloadable WAV output.
- Local Image to PDF tool for multiple PNG/JPEG images, with size/count validation and a real downloadable PDF.
- Local JSON Formatter (pretty-print/minify/copy/download) and JSON Validator with clear syntax errors.
- Original Snake game with keyboard/touch controls, difficulty, pause/restart, scoring, collision handling, and local high score.
- Vite workflow, README, `.env.example`, and tool checklist.

## Pending work
- Actual implementations for the remaining catalog tools, added category by category.
- Automated tests for every released tool; complete browser/device/accessibility regression testing.
- Additional language packs for offline voice synthesis.
- Configure a real AdSense ad-slot ID before displaying ads; the inherited slot value is a publisher ID, not an ad slot.

## Known constraints
- Offline speech currently includes English voice variants only. The engine and English voice data are served by the app and run in the browser; synthesis itself does not call a remote speech service.
- Local Vite preview serves the UI; use the Vercel development runtime only for features that require Vercel Functions.
- Tailwind is still loaded from its CDN as in the original static project; the Vite production build reports its upstream recommendation to bundle Tailwind for production.

## Next priorities
1. Complete browser verification of the offline speech workflow and supported voice options.
2. Expand the PDF and developer tool families, and add more image catalog utilities.
3. Add automated regression checks for each released tool and representative responsive/accessibility tests.
4. Continue category-by-category expansion and internationalization.
