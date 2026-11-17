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
- [x] Text to Speech (browser preview)

## AI writing & language
- [ ] AI Rephrasing Tool
- [ ] Grammar Checker
- [ ] Spell Checker
- [ ] Sentence Rewriter
- [ ] Text Summarizer
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
- [ ] PDF Merger
- [ ] PDF Splitter
- [ ] PDF Compressor
- [ ] PDF to Word
- [ ] Word to PDF
- [ ] PDF to Image
- [ ] Image to PDF
- [ ] PDF to Excel
- [ ] Excel to PDF
- [ ] PDF Page Rotator
- [ ] PDF Page Reorder
- [ ] PDF Watermark
- [ ] PDF Password Protection
- [ ] PDF Unlocker for authorized files
- [ ] PDF Signature Tool
- [ ] PDF Text Extractor
- [ ] PDF OCR
- [ ] PDF Page Remover
- [ ] PDF Page Extractor
- [ ] PDF Redaction Tool

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
- [x] AI Voice Artist / Downloadable Text to Speech (real MP3 via server-side provider; live model call requires Gateway authentication)
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
- [ ] JSON Formatter
- [ ] JSON Validator
- [ ] XML Formatter
- [ ] YAML Formatter
- [ ] HTML Formatter
- [ ] CSS Formatter
- [ ] JavaScript Formatter
- [ ] SQL Formatter
- [ ] Base64 Encoder/Decoder
- [x] URL Encoder/Decoder
- [ ] HTML Encoder/Decoder
- [ ] JWT Decoder
- [ ] UUID Generator
- [ ] SHA-256 Hash Generator
- [ ] Regex Tester
- [ ] Code Difference Checker
- [ ] Markdown Preview
- [ ] HTML Preview
- [ ] CSV to JSON
- [ ] JSON to CSV
- [ ] Unix Timestamp Converter
- [ ] CSS Gradient Generator
- [ ] CSS Shadow Generator
- [ ] Sample Data Generator

## Calculators & converters
- [ ] Basic Calculator
- [ ] Scientific Calculator
- [ ] Percentage Calculator
- [ ] Age Calculator
- [ ] Date Difference Calculator
- [ ] Time Zone Converter
- [ ] Currency Converter
- [ ] Length Converter
- [ ] Weight Converter
- [x] Temperature Converter
- [ ] Area Converter
- [ ] Speed Converter
- [ ] Discount Calculator
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
- [ ] Remove Duplicate Lines
- [ ] Text Sorter
- [ ] Text Cleaner
- [ ] Whitespace Remover
- [ ] Find and Replace
- [ ] Reading Time Calculator
- [ ] Random Number Generator
- [ ] Random Name Picker
- [ ] Stopwatch
- [ ] Countdown Timer
- [ ] Pomodoro Timer
- [ ] Notes Tool
- [ ] Checklist Maker

## SEO & marketing
- [ ] Meta Tag Generator
- [ ] SEO Title Generator
- [ ] Meta Description Generator
- [ ] Keyword Density Checker
- [ ] Open Graph Preview
- [ ] Search Result Preview
- [ ] Sitemap Generator
- [ ] Robots.txt Generator
- [ ] URL Slug Generator
- [ ] Canonical Tag Generator
- [ ] Schema Markup Generator
- [ ] UTM Campaign Builder
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
- [ ] Password Strength Checker
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
- [ ] Tic-Tac-Toe
- [ ] Memory Matching Game
- [ ] Number Guessing Game
- [ ] Typing Speed Test
- [ ] Reaction Time Test
- [ ] Word Guessing Game
- [ ] Rock Paper Scissors
- [ ] 2048 Puzzle
- [ ] Simple Sudoku

## Operational follow-up
- [ ] Replace per-process speech throttling with shared rate limiting and usage accounting.
- [ ] Configure a valid AdSense ad-slot ID before showing ads.
- [ ] Verify the live Gateway model call in a Vercel deployment with configured authentication.
- [ ] Add automated regression, accessibility, and broader device tests.
