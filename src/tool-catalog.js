const groups = {
    'AI Tools': [
      'AI Rephrasing Tool', 'Grammar Checker', 'Spell Checker', 'Sentence Rewriter', 'Text Summarizer', 'AI Content Improver', 'Tone Changer', 'AI Email Writer', 'Professional Message Generator', 'Paragraph Generator', 'Blog Outline Generator', 'Article Outline Generator', 'Text Simplifier', 'Translation Tool', 'Readability Checker', 'AI Title Generator', 'Social Media Caption Generator', 'AI Study Notes Generator'
    ],
    'PDF & Documents': [
      'PDF Merger', 'PDF Splitter', 'PDF Compressor', 'PDF to Word', 'Word to PDF', 'PDF to Image', 'Image to PDF', 'PDF to Excel', 'Excel to PDF', 'PDF Page Rotator', 'PDF Page Reorder', 'PDF Watermark', 'PDF Password Protection', 'PDF Unlocker for Authorized Files', 'PDF Signature Tool', 'PDF Text Extractor', 'PDF OCR', 'PDF Page Remover', 'PDF Page Extractor', 'PDF Redaction Tool'
    ],
    'Images & Design': [
      'Image Background Remover', 'Image Upscaler', 'JPG to PNG', 'PNG to JPG', 'WebP Converter', 'AVIF Converter', 'HEIC Converter', 'SVG Converter', 'Image Watermark Tool', 'Image Metadata Remover', 'Image to Text', 'Image Color Picker', 'Color Palette Generator', 'Favicon Generator', 'Image Collage Maker', 'Meme Generator', 'Social Media Image Resizer'
    ],
    'Audio & Voice': [
      'Speech to Text', 'Voice Recorder', 'Audio Converter', 'Audio Compressor', 'Audio Trimmer', 'Audio Joiner', 'Audio Speed Changer', 'Audio Volume Controller', 'Audio Noise Reduction', 'Audio Silence Remover', 'Voiceover Generator', 'Audio Transcription Tool'
    ],
    Video: [
      'Video Compressor', 'Video Converter', 'Video Trimmer', 'Video Merger', 'Video Cropper', 'Video Resizer', 'Video Speed Controller', 'Video to GIF', 'GIF to Video', 'Video to Audio', 'Video Mute Tool', 'Video Subtitle Generator', 'Subtitle Format Converter', 'Screen Recorder'
    ],
    'QR Codes & Links': [
      'QR Code Scanner', 'QR with Logo', 'Wi-Fi QR Generator', 'Contact QR Generator', 'Email QR Generator', 'WhatsApp QR Generator', 'Bulk QR Generator', 'Dynamic QR Generator', 'Link Shortener', 'Custom Short Link Generator', 'URL Expander', 'Redirect Checker', 'UTM Link Builder', 'QR Download as PNG or SVG'
    ],
    'Developer Tools': [
      'JSON Formatter', 'JSON Validator', 'XML Formatter', 'YAML Formatter', 'HTML Formatter', 'CSS Formatter', 'JavaScript Formatter', 'SQL Formatter', 'Base64 Encoder/Decoder', 'HTML Encoder/Decoder', 'JWT Decoder', 'UUID Generator', 'SHA-256 Hash Generator', 'Regex Tester', 'Code Difference Checker', 'Markdown Preview', 'HTML Preview', 'CSV to JSON', 'JSON to CSV', 'Unix Timestamp Converter', 'CSS Gradient Generator', 'CSS Shadow Generator', 'Sample Data Generator'
    ],
    'Calculators & Converters': [
      'Basic Calculator', 'Scientific Calculator', 'Percentage Calculator', 'Age Calculator', 'Date Difference Calculator', 'Time Zone Converter', 'Currency Converter', 'Length Converter', 'Weight Converter', 'Area Converter', 'Speed Converter', 'Discount Calculator', 'Loan Calculator', 'EMI Calculator', 'Compound Interest Calculator', 'Profit Margin Calculator', 'GPA Calculator', 'Grade Calculator', 'VAT Calculator'
    ],
    'Productivity & Text': [
      'Remove Duplicate Lines', 'Text Sorter', 'Text Cleaner', 'Whitespace Remover', 'Find and Replace', 'Reading Time Calculator', 'Random Number Generator', 'Random Name Picker', 'Stopwatch', 'Countdown Timer', 'Pomodoro Timer', 'Notes Tool', 'Checklist Maker'
    ],
    'SEO & Marketing': [
      'Meta Tag Generator', 'SEO Title Generator', 'Meta Description Generator', 'Keyword Density Checker', 'Open Graph Preview', 'Search Result Preview', 'Sitemap Generator', 'Robots.txt Generator', 'URL Slug Generator', 'Canonical Tag Generator', 'Schema Markup Generator', 'UTM Campaign Builder', 'Social Media Post Formatter', 'Website Redirect Analyzer'
    ],
    'Business & Careers': [
      'Invoice Generator', 'Quotation Generator', 'Receipt Generator', 'Resume/CV Builder', 'Cover Letter Builder', 'Email Signature Generator', 'Business Card Generator', 'Meeting Agenda Generator', 'Business Name Generator', 'Expense Tracker'
    ],
    Education: [
      'Quiz Generator', 'MCQ Generator', 'Flashcard Maker', 'Worksheet Generator', 'Study Planner', 'Lesson Planner', 'Timetable Maker', 'Math Formula Editor', 'Vocabulary Practice Tool', 'Random Student Picker'
    ],
    'Security & Privacy': [
      'Password Strength Checker', 'File Hash Calculator', 'Checksum Verifier', 'Text Redaction Tool', 'File Metadata Viewer', 'URL Preview Tool', 'QR Link Preview Tool', 'Random Security Token Generator'
    ],
    'Games & Entertainment': [
      'Tic-Tac-Toe', 'Memory Matching Game', 'Number Guessing Game', 'Typing Speed Test', 'Reaction Time Test', 'Word Guessing Game', 'Rock Paper Scissors', '2048 Puzzle', 'Simple Sudoku'
    ]
  };

  const searchAliases = {
    'PDF Compressor': 'compress reduce shrink pdf file size',
    'Grammar Checker': 'fix grammar mistakes correct writing',
    'Spell Checker': 'fix spelling typos',
    'Image Resizer': 'resize my image dimensions',
    'Text Summarizer': 'summarize shorten notes',
    'Tic-Tac-Toe': 'play game',
    'Memory Matching Game': 'play game',
    'Number Guessing Game': 'play game',
    'Typing Speed Test': 'play game',
    'Reaction Time Test': 'play game',
    'Word Guessing Game': 'play game',
    'Rock Paper Scissors': 'play game',
    '2048 Puzzle': 'play game',
    'Simple Sudoku': 'play game'
  };

export const plannedToolCatalog = Object.entries(groups).flatMap(([category, names]) => names.map((name) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    name,
    category,
    description: `${name} is planned for this category and is not released yet.`,
    keywords: `${name} ${category} ${searchAliases[name] || ''}`,
    available: false
  })));
