# Tool implementation checklist

`[x]` means implemented and verified in this phase. `[ ]` means planned/in development, not usable yet.

## Existing tools
- [x] QR Code Generator
- [x] Case Converter
- [x] Word & Character Counter
- [x] Dummy Text Generator
- [x] Password Generator
- [x] URL Encoder/Decoder
- [x] Temperature Converter
- [x] Image Converter
- [x] Image Resizer
- [x] Image Compressor
- [x] Simple Image Cropper
- [x] Text to Speech (offline WAV playback and download)

## AI writing & language
- [x] AI Rephrasing Tool (server-side AI Gateway; explicit user action, rate-limited)
- [ ] Grammar Checker
- [ ] Spell Checker
- [ ] Sentence Rewriter
- [x] Text Summarizer (server-side AI Gateway; explicit user action, rate-limited)
- [ ] AI Content Improver
- [ ] Tone Changer
- [ ] AI Email Writer
- [ ] Professional Message Generator
- [ ] Paragraph Generator
- [ ] Blog Outline Generator
- [ ] Article Outline Generator
- [ ] Text Simplifier
- [ ] Translation Tool
- [ ] Readability Checker
- [ ] AI Title Generator
- [ ] Social Media Caption Generator
- [ ] AI Study Notes Generator

## PDF & documents
- [x] PDF Merger (local processing; per-file and combined-size limits)
- [x] PDF Splitter (exports selected pages as separate PDFs)
- [ ] PDF Compressor
- [ ] PDF to Word
- [ ] Word to PDF
- [ ] PDF to Image
- [x] Image to PDF (local PNG/JPEG processing; up to 20 images; real PDF output)
- [ ] PDF to Excel
- [ ] Excel to PDF
- [x] PDF Page Rotator
- [x] PDF Page Reorder
- [x] PDF Watermark
- [ ] PDF Password Protection
- [ ] PDF Unlocker for authorized files
- [ ] PDF Signature Tool
- [ ] PDF Text Extractor
- [ ] PDF OCR
- [x] PDF Page Remover
- [x] PDF Page Extractor
- [ ] PDF Redaction Tool
- [x] PDF Metadata Viewer (reads embedded metadata locally)

## Image & design
- [x] Image Converter
- [x] Image Resizer
- [x] Image Compressor
- [x] Simple Image Cropper
- [ ] Image Background Remover
- [ ] Image Upscaler
- [ ] JPG to PNG
- [ ] PNG to JPG
- [ ] WebP Converter
- [ ] AVIF Converter
- [ ] HEIC Converter
- [ ] SVG Converter
- [ ] Image Watermark Tool
- [ ] Image Metadata Remover
- [ ] Image to Text
- [ ] Image Color Picker
- [ ] Color Palette Generator
- [ ] Favicon Generator
- [ ] Image Collage Maker
- [ ] Meme Generator
- [ ] Social Media Image Resizer

## Audio & voice
- [x] AI Voice Artist / Downloadable Text to Speech (real MP3 via server-side provider, same-model short voice previews; live generation requires Gateway authentication)
- [ ] Speech to Text
- [ ] Voice Recorder
- [ ] Audio Converter
- [ ] Audio Compressor
- [ ] Audio Trimmer
- [ ] Audio Joiner
- [ ] Audio Speed Changer
- [ ] Audio Volume Controller
- [ ] Audio Noise Reduction
- [ ] Audio Silence Remover
- [ ] Voiceover Generator (separate workflow)
- [ ] Audio Transcription Tool

## Video
- [ ] Video Compressor
- [ ] Video Converter
- [ ] Video Trimmer
- [ ] Video Merger
- [ ] Video Cropper
- [ ] Video Resizer
- [ ] Video Speed Controller
- [ ] Video to GIF
- [ ] GIF to Video
- [ ] Video to Audio
- [ ] Video Mute Tool
- [ ] Video Subtitle Generator
- [ ] Subtitle Format Converter
- [ ] Screen Recorder

## QR codes & links
- [x] QR Code Generator
- [ ] QR Code Scanner
- [ ] QR with Logo
- [ ] Wi-Fi QR Generator
- [ ] Contact QR Generator
- [ ] Email QR Generator
- [ ] WhatsApp QR Generator
- [ ] Bulk QR Generator
- [ ] Dynamic QR Generator (requires persistent redirects)
- [ ] Link Shortener (requires persistent storage and abuse safeguards)
- [ ] Custom Short Link Generator
- [ ] URL Expander
- [ ] Redirect Checker
- [ ] UTM Link Builder
- [ ] QR Download as PNG or SVG

## Developer tools
- [x] JSON Formatter (pretty-print/minify, copy, and download; local processing)
- [x] JSON Validator (local syntax validation with clear parse errors)
- [ ] XML Formatter
- [ ] YAML Formatter
- [ ] HTML Formatter
- [ ] CSS Formatter
- [ ] JavaScript Formatter
- [ ] SQL Formatter
- [x] Base64 Encoder/Decoder
- [x] URL Encoder/Decoder
- [x] HTML Encoder/Decoder
- [x] JWT Decoder (decoding only; does not verify signatures)
- [x] UUID Generator
- [x] SHA-256 Hash Generator
- [x] Regex Tester (local JavaScript pattern matching)
- [x] Code Difference Checker (line-based diff, capped at 250 lines per side)
- [x] Markdown Preview (safe subset; raw HTML escaped)
- [ ] HTML Preview
- [x] CSV to JSON
- [x] JSON to CSV
- [x] Unix Timestamp Converter
- [x] CSS Gradient Generator
- [x] CSS Shadow Generator
- [x] Sample Data Generator

## Calculators & converters
- [x] Basic Calculator (safe arithmetic parser; no eval)
- [ ] Scientific Calculator
- [x] Percentage Calculator
- [x] Age Calculator
- [x] Date Difference Calculator
- [ ] Time Zone Converter
- [ ] Currency Converter
- [ ] Length Converter
- [ ] Weight Converter
- [x] Temperature Converter
- [ ] Area Converter
- [ ] Speed Converter
- [x] Discount Calculator
- [ ] Loan Calculator
- [ ] EMI Calculator
- [ ] Compound Interest Calculator
- [ ] Profit Margin Calculator
- [ ] GPA Calculator
- [ ] Grade Calculator
- [ ] VAT Calculator

## Productivity & text
- [x] Word Counter
- [x] Character Counter
- [x] Case Converter
- [x] Dummy Text Generator
- [x] Remove Duplicate Lines
- [x] Text Sorter
- [x] Text Cleaner
- [x] Whitespace Remover
- [x] Find and Replace
- [x] Reading Time Calculator
- [x] Random Number Generator
- [ ] Random Name Picker
- [x] Stopwatch
- [x] Countdown Timer
- [x] Pomodoro Timer
- [ ] Notes Tool
- [ ] Checklist Maker

## SEO & marketing
- [x] Meta Tag Generator
- [ ] SEO Title Generator
- [ ] Meta Description Generator
- [ ] Keyword Density Checker
- [ ] Open Graph Preview
- [ ] Search Result Preview
- [ ] Sitemap Generator
- [ ] Robots.txt Generator
- [x] URL Slug Generator
- [ ] Canonical Tag Generator
- [ ] Schema Markup Generator
- [x] UTM Campaign Builder (validated URLs and query parameters)
- [ ] Social Media Post Formatter
- [ ] Website Redirect Analyzer

## Business & careers
- [ ] Invoice Generator
- [ ] Quotation Generator
- [ ] Receipt Generator
- [ ] Resume/CV Builder
- [ ] Cover Letter Builder
- [ ] Email Signature Generator
- [ ] Business Card Generator
- [ ] Meeting Agenda Generator
- [ ] Business Name Generator
- [ ] Expense Tracker

## Education
- [ ] Quiz Generator
- [ ] MCQ Generator
- [ ] Flashcard Maker
- [ ] Worksheet Generator
- [ ] Study Planner
- [ ] Lesson Planner
- [ ] Timetable Maker
- [ ] GPA Calculator
- [ ] Math Formula Editor
- [ ] Vocabulary Practice Tool
- [ ] Random Student Picker

## Security & privacy
- [x] Secure Password Generator
- [x] Password Strength Checker
- [ ] File Hash Calculator
- [ ] Checksum Verifier
- [ ] Text Redaction Tool
- [ ] File Metadata Viewer
- [ ] Image Metadata Remover
- [ ] URL Preview Tool
- [ ] QR Link Preview Tool
- [ ] Random Security Token Generator

## Games & entertainment
- [x] Classic Snake Game
- [x] Tic-Tac-Toe
- [ ] Memory Matching Game
- [ ] Number Guessing Game
- [ ] Typing Speed Test
- [ ] Reaction Time Test
- [ ] Word Guessing Game
- [ ] Rock Paper Scissors
- [ ] 2048 Puzzle
- [ ] Simple Sudoku

## Operational follow-up
- [ ] Verify offline voice synthesis and downloadable WAV output in supported browsers.
- [ ] Configure a valid AdSense ad-slot ID before showing ads.
- [ ] Add broader device/accessibility tests and UI-level PDF/AI function tests (11 unit tests currently pass).
