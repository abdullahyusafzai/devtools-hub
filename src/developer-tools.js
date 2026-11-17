import {
  cleanText,
  correctCommonGrammar,
  countWords,
  createSha256,
  createUrlSlug,
  dateToTimestamps,
  decodeBase64Utf8,
  decodeHtmlEntities,
  encodeBase64Utf8,
  encodeHtml,
  generateUuids,
  removeDuplicateLines,
  timestampToIso
} from './developer-tool-utils.js';

const React = window.React;
const h = React.createElement;
const fieldClass = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-violet-400 focus:outline-none';
const buttonClass = 'rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60';

function ToolIntro({ title, children }) {
  return h('div', { className: 'mb-6' },
    h('h1', { className: 'mb-2 text-2xl font-bold tracking-tight text-gray-900' }, title),
    h('p', { className: 'max-w-2xl text-sm leading-6 text-gray-500' }, children)
  );
}

function TextArea({ id, label, value, onChange, placeholder, readOnly = false, rows = 6, spellCheck = false }) {
  return h('label', { className: 'block space-y-2' },
    h('span', { className: 'text-sm font-semibold text-gray-800' }, label),
    h('textarea', {
      id,
      value,
      onChange,
      placeholder,
      readOnly,
      rows,
      spellCheck,
      className: `${fieldClass} resize-y font-mono leading-6`
    })
  );
}

function ToolError({ message }) {
  return message ? h('p', { className: 'mt-3 text-sm text-red-700', role: 'alert' }, message) : null;
}

function CopyButton({ value, label }) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => setCopied(false), [value]);

  const copy = async () => {
    let field;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        if (!document.execCommand('copy')) throw new Error('Copy failed');
      }
      setCopied(true);
    } catch {
      setCopied(false);
    } finally {
      field?.remove();
    }
  };

  return h('button', {
    type: 'button',
    onClick: copy,
    disabled: !value,
    'aria-label': `Copy ${label.toLowerCase()}`,
    className: 'rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:border-violet-300 disabled:opacity-50'
  }, copied ? 'Copied' : 'Copy');
}

function OutputPanel({ label = 'Output', value, rows = 6 }) {
  return h('div', { className: 'mt-5' },
    h(TextArea, { id: `output-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, label, value, readOnly: true, rows }),
    h('div', { className: 'mt-2 flex justify-end' }, h(CopyButton, { value, label }))
  );
}

export function Base64Tool() {
  const [mode, setMode] = React.useState('encode');
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');

  const convert = (event) => {
    event.preventDefault();
    if (!input) {
      setOutput('');
      setError('Enter text to convert.');
      return;
    }
    try {
      setOutput(mode === 'encode' ? encodeBase64Utf8(input) : decodeBase64Utf8(input));
      setError('');
    } catch (conversionError) {
      setOutput('');
      setError(conversionError.message);
    }
  };

  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title: 'Base64 Encoder/Decoder' }, 'Encode or decode UTF-8 text as Base64. Processing stays in your browser.'),
    h('form', { onSubmit: convert },
      h('label', { className: 'mb-4 block space-y-2' },
        h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Operation'),
        h('select', { value: mode, onChange: (event) => { setMode(event.target.value); setOutput(''); setError(''); }, className: fieldClass },
          h('option', { value: 'encode' }, 'Encode text'),
          h('option', { value: 'decode' }, 'Decode Base64'))),
      h(TextArea, { id: 'base64-input', label: mode === 'encode' ? 'Text to encode' : 'Base64 to decode', value: input, onChange: (event) => setInput(event.target.value), placeholder: mode === 'encode' ? 'Type or paste text…' : 'Paste Base64 text…' }),
      h('div', { className: 'mt-4' }, h('button', { type: 'submit', className: buttonClass }, mode === 'encode' ? 'Encode' : 'Decode')),
      h(ToolError, { message: error }),
      output && h(OutputPanel, { value: output })
    )
  );
}

export function HtmlEntitiesTool() {
  const [mode, setMode] = React.useState('encode');
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');

  const convert = (event) => {
    event.preventDefault();
    if (!input) {
      setError('Enter text to convert.');
      setOutput('');
      return;
    }
    setOutput(mode === 'encode' ? encodeHtml(input) : decodeHtmlEntities(input));
    setError('');
  };

  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title: 'HTML Encoder/Decoder' }, 'Convert common HTML characters and entities locally. Decoding supports named basics and decimal or hexadecimal numeric entities.'),
    h('form', { onSubmit: convert },
      h('label', { className: 'mb-4 block space-y-2' },
        h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Operation'),
        h('select', { value: mode, onChange: (event) => { setMode(event.target.value); setOutput(''); setError(''); }, className: fieldClass },
          h('option', { value: 'encode' }, 'Encode special characters'),
          h('option', { value: 'decode' }, 'Decode HTML entities'))),
      h(TextArea, { id: 'html-entities-input', label: 'Input text', value: input, onChange: (event) => setInput(event.target.value), placeholder: 'Type or paste text…' }),
      h('div', { className: 'mt-4' }, h('button', { type: 'submit', className: buttonClass }, mode === 'encode' ? 'Encode' : 'Decode')),
      h(ToolError, { message: error }),
      output && h(OutputPanel, { value: output })
    )
  );
}

export function UuidTool() {
  const [count, setCount] = React.useState('5');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');

  const generate = (event) => {
    event.preventDefault();
    try {
      setOutput(generateUuids(count).join('\n'));
      setError('');
    } catch (generationError) {
      setOutput('');
      setError(generationError.message);
    }
  };

  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title: 'UUID Generator' }, 'Generate cryptographically secure version 4 UUIDs on this device. No data is sent anywhere.'),
    h('form', { onSubmit: generate },
      h('label', { className: 'block max-w-xs space-y-2' },
        h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Number to generate (1–100)'),
        h('input', { type: 'number', min: 1, max: 100, step: 1, value: count, onChange: (event) => setCount(event.target.value), className: fieldClass, inputMode: 'numeric' })),
      h('div', { className: 'mt-4' }, h('button', { type: 'submit', className: buttonClass }, 'Generate UUIDs')),
      h(ToolError, { message: error }),
      output && h(OutputPanel, { value: output, rows: 8 })
    )
  );
}

export function Sha256Tool() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');
  const [working, setWorking] = React.useState(false);

  const hash = async (event) => {
    event.preventDefault();
    setWorking(true);
    try {
      setOutput(await createSha256(input));
      setError('');
    } catch (hashError) {
      setOutput('');
      setError(hashError.message);
    } finally {
      setWorking(false);
    }
  };

  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title: 'SHA-256 Hash Generator' }, 'Create a SHA-256 digest for text using the browser Web Crypto API. The input is processed locally.'),
    h('form', { onSubmit: hash },
      h(TextArea, { id: 'sha256-input', label: 'Text to hash', value: input, onChange: (event) => setInput(event.target.value), placeholder: 'Enter any text…' }),
      h('div', { className: 'mt-4' }, h('button', { type: 'submit', className: buttonClass, disabled: working }, working ? 'Hashing…' : 'Generate SHA-256')),
      h(ToolError, { message: error }),
      output && h(OutputPanel, { label: 'SHA-256 digest', value: output, rows: 2 })
    )
  );
}

export function UnixTimestampTool() {
  const [timestamp, setTimestamp] = React.useState('');
  const [unit, setUnit] = React.useState('seconds');
  const [dateOutput, setDateOutput] = React.useState('');
  const [dateError, setDateError] = React.useState('');
  const [dateTime, setDateTime] = React.useState('');
  const [timestampOutput, setTimestampOutput] = React.useState('');
  const [timestampError, setTimestampError] = React.useState('');

  const convertTimestamp = (event) => {
    event.preventDefault();
    try {
      const iso = timestampToIso(timestamp, unit);
      setDateOutput(`${iso}\nLocal time: ${new Date(iso).toLocaleString()}`);
      setDateError('');
    } catch (conversionError) {
      setDateOutput('');
      setDateError(conversionError.message);
    }
  };

  const convertDate = (event) => {
    event.preventDefault();
    try {
      const result = dateToTimestamps(dateTime);
      setTimestampOutput(`Seconds: ${result.seconds}\nMilliseconds: ${result.milliseconds}`);
      setTimestampError('');
    } catch (conversionError) {
      setTimestampOutput('');
      setTimestampError(conversionError.message);
    }
  };

  return h('section', { className: 'max-w-4xl space-y-8' },
    h(ToolIntro, { title: 'Unix Timestamp Converter' }, 'Convert between Unix timestamps and calendar dates. Timestamps can be interpreted as seconds or milliseconds; date input uses your local time zone.'),
    h('form', { onSubmit: convertTimestamp, className: 'rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5' },
      h('h2', { className: 'mb-4 text-base font-semibold text-gray-900' }, 'Timestamp to date'),
      h('div', { className: 'grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]' },
        h('label', { className: 'block space-y-2' },
          h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Unix timestamp'),
          h('input', { type: 'text', inputMode: 'decimal', value: timestamp, onChange: (event) => setTimestamp(event.target.value), placeholder: 'e.g. 1700000000', className: fieldClass })),
        h('label', { className: 'block space-y-2' },
          h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Unit'),
          h('select', { value: unit, onChange: (event) => setUnit(event.target.value), className: fieldClass },
            h('option', { value: 'seconds' }, 'Seconds'),
            h('option', { value: 'milliseconds' }, 'Milliseconds')))),
      h('button', { type: 'submit', className: `${buttonClass} mt-4` }, 'Convert to date'),
      h(ToolError, { message: dateError }),
      dateOutput && h(OutputPanel, { label: 'Date result', value: dateOutput, rows: 2 })
    ),
    h('form', { onSubmit: convertDate, className: 'rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5' },
      h('h2', { className: 'mb-4 text-base font-semibold text-gray-900' }, 'Date to timestamp'),
      h('label', { className: 'block max-w-md space-y-2' },
        h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Local date and time'),
        h('input', { type: 'datetime-local', value: dateTime, onChange: (event) => setDateTime(event.target.value), className: fieldClass })),
      h('button', { type: 'submit', className: `${buttonClass} mt-4` }, 'Convert to timestamp'),
      h(ToolError, { message: timestampError }),
      timestampOutput && h(OutputPanel, { label: 'Timestamp result', value: timestampOutput, rows: 2 })
    )
  );
}

function TextToolLayout({ title, description, input, setInput, children }) {
  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title }, description),
    h(TextArea, { id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-input`, label: 'Your text', value: input, onChange: (event) => setInput(event.target.value), placeholder: 'Type or paste text here…', spellCheck: true }),
    children
  );
}

export function GrammarCorrectionTool() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [corrections, setCorrections] = React.useState(0);
  const applyCorrections = () => {
    const result = correctCommonGrammar(input);
    setOutput(result.text);
    setCorrections(result.corrections);
  };

  return h(TextToolLayout, { title: 'Grammar Correction', description: 'Fix a handful of common typos and punctuation issues locally. This lightweight rule-based checker is not a full grammar editor; your text stays in this browser.', input, setInput },
    h('div', { className: 'mt-4 flex flex-wrap gap-2' },
      h('button', { type: 'button', className: buttonClass, onClick: applyCorrections, disabled: !input.trim() }, 'Correct common issues'),
      h('button', { type: 'button', className: 'rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700', onClick: () => { setInput(''); setOutput(''); setCorrections(0); } }, 'Clear')),
    output && h('div', null,
      h('p', { className: 'mt-4 text-sm text-gray-600', role: 'status', 'aria-live': 'polite' }, `${corrections} common ${corrections === 1 ? 'issue' : 'issues'} corrected. Please review the result; automatic rules can miss context.`),
      h(OutputPanel, { label: 'Corrected text', value: output, rows: 8 }))
  );
}

export function DuplicateLinesTool() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  return h(TextToolLayout, { title: 'Remove Duplicate Lines', description: 'Remove repeated non-empty lines while preserving the first occurrence. Matching ignores case and repeated spaces; everything runs locally.', input, setInput },
    h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: () => setOutput(removeDuplicateLines(input)), disabled: !input.trim() }, 'Remove duplicates'),
    output && h(OutputPanel, { label: 'Unique lines', value: output, rows: 8 })
  );
}

export function TextCleanerTool() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  return h(TextToolLayout, { title: 'Text Cleaner', description: 'Normalize tabs and extra spaces, trim line edges, and reduce excessive blank lines without sending text anywhere.', input, setInput },
    h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: () => setOutput(cleanText(input)), disabled: !input.trim() }, 'Clean text'),
    output && h(OutputPanel, { label: 'Cleaned text', value: output, rows: 8 })
  );
}

export function ReadingTimeTool() {
  const [input, setInput] = React.useState('');
  const words = countWords(input);
  const minutes = words ? Math.max(1, Math.ceil(words / 225)) : 0;
  return h(TextToolLayout, { title: 'Reading Time Calculator', description: 'Estimate reading time at an adjustable words-per-minute pace. Your text is counted locally and never uploaded.', input, setInput },
    h('div', { className: 'mt-5 grid gap-3 sm:grid-cols-2', 'aria-live': 'polite' },
      h('div', { className: 'rounded-2xl border border-gray-200 bg-gray-50 p-5' }, h('p', { className: 'text-sm text-gray-500' }, 'Word count'), h('p', { className: 'mt-1 text-3xl font-bold text-gray-900' }, words.toLocaleString())),
      h('div', { className: 'rounded-2xl border border-gray-200 bg-gray-50 p-5' }, h('p', { className: 'text-sm text-gray-500' }, 'Estimated reading time · 225 wpm'), h('p', { className: 'mt-1 text-3xl font-bold text-gray-900' }, minutes ? `${minutes} min` : '—')))
  );
}

export function RegexTesterTool() {
  const [pattern, setPattern] = React.useState('\\b\\w+\\b');
  const [flags, setFlags] = React.useState('g');
  const [input, setInput] = React.useState('Try matching words in this sample text.');
  let regexError = '';
  let matches = [];
  try {
    const expression = new RegExp(pattern, [...new Set(flags.replace(/[^dgimsuvy]/g, '').split(''))].join(''));
    matches = Array.from(input.matchAll(expression), (match) => ({ value: match[0], index: match.index }));
  } catch (matchError) {
    regexError = matchError.message;
  }
  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title: 'Regex Tester' }, 'Test a JavaScript regular expression against text locally. Matches and character positions update as you type.'),
    h('div', { className: 'grid gap-3 sm:grid-cols-[minmax(0,1fr)_8rem]' },
      h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Pattern'), h('input', { value: pattern, onChange: (event) => setPattern(event.target.value), className: fieldClass, placeholder: 'Enter a regular expression' })),
      h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Flags'), h('input', { value: flags, onChange: (event) => setFlags(event.target.value), className: fieldClass, maxLength: 7, placeholder: 'gim' }))),
    h('div', { className: 'mt-4' }, h(TextArea, { id: 'regex-test-input', label: 'Test text', value: input, onChange: (event) => setInput(event.target.value), rows: 7 })),
    regexError ? h(ToolError, { message: `Invalid regular expression: ${regexError}` }) : h('div', { className: 'mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4', role: 'status', 'aria-live': 'polite' }, h('p', { className: 'text-sm font-semibold text-gray-800' }, `${matches.length} ${matches.length === 1 ? 'match' : 'matches'}`), matches.length ? h('ul', { className: 'mt-2 space-y-1 font-mono text-sm text-gray-700' }, matches.slice(0, 100).map((match, index) => h('li', { key: `${match.index}-${index}`, className: 'safe-wrap' }, `${index + 1}. “${match.value}” at ${match.index}`))) : h('p', { className: 'mt-2 text-sm text-gray-500' }, 'No matches.'))
  );
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { cell += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"' && cell === '') quoted = true;
    else if (character === ',') { row.push(cell); cell = ''; }
    else if (character === '\n' || character === '\r') {
      if (character === '\r' && text[index + 1] === '\n') index += 1;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += character;
  }
  if (quoted) throw new Error('Close the quoted field before converting.');
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

export function CsvToJsonTool() {
  const [input, setInput] = React.useState('name,role\nAda,Engineer\nLinus,Developer');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');
  const convert = () => {
    try {
      const rows = parseCsv(input);
      if (!rows.length) throw new Error('Enter CSV data with a header row.');
      const [headers, ...records] = rows;
      if (headers.some((header) => !header.trim()) || new Set(headers).size !== headers.length) throw new Error('Headers must be non-empty and unique.');
      if (records.some((record) => record.length !== headers.length)) throw new Error('Every row must have the same number of columns as the header.');
      setOutput(JSON.stringify(records.map((record) => Object.fromEntries(headers.map((header, index) => [header, record[index]]))), null, 2));
      setError('');
    } catch (conversionError) { setOutput(''); setError(conversionError.message); }
  };
  return h('section', { className: 'max-w-3xl' }, h(ToolIntro, { title: 'CSV to JSON' }, 'Convert comma-separated values into an array of objects. Quoted commas and escaped quotes are supported; data stays in your browser.'), h(TextArea, { id: 'csv-to-json-input', label: 'CSV input (first row is headers)', value: input, onChange: (event) => setInput(event.target.value), rows: 8 }), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: convert, disabled: !input.trim() }, 'Convert to JSON'), h(ToolError, { message: error }), output && h(OutputPanel, { label: 'JSON output', value: output, rows: 10 }));
}

export function JsonToCsvTool() {
  const [input, setInput] = React.useState('[{"name":"Ada","role":"Engineer"},{"name":"Linus","role":"Developer"}]');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');
  const convert = () => {
    try {
      const records = JSON.parse(input);
      if (!Array.isArray(records) || records.some((record) => !record || typeof record !== 'object' || Array.isArray(record))) throw new Error('Provide a JSON array of objects.');
      const headers = [...new Set(records.flatMap((record) => Object.keys(record)))];
      if (!headers.length) throw new Error('Add at least one object with a property.');
      const quote = (value) => { const text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value); return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; };
      setOutput([headers.map(quote).join(','), ...records.map((record) => headers.map((key) => quote(record[key])).join(','))].join('\n'));
      setError('');
    } catch (conversionError) { setOutput(''); setError(conversionError instanceof SyntaxError ? 'Enter valid JSON.' : conversionError.message); }
  };
  return h('section', { className: 'max-w-3xl' }, h(ToolIntro, { title: 'JSON to CSV' }, 'Convert a JSON array of objects into CSV. Fields are quoted and escaped as needed; conversion is local.'), h(TextArea, { id: 'json-to-csv-input', label: 'JSON input', value: input, onChange: (event) => setInput(event.target.value), rows: 8 }), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: convert, disabled: !input.trim() }, 'Convert to CSV'), h(ToolError, { message: error }), output && h(OutputPanel, { label: 'CSV output', value: output, rows: 8 }));
}

export function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = React.useState('# Hello\n\nWrite **Markdown** here.\n\n- Local preview\n- No upload');
  const html = markdown.split(/\n{2,}/).map((block) => {
    const escaped = block.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (escaped.startsWith('### ')) return `<h3>${escaped.slice(4)}</h3>`;
    if (escaped.startsWith('## ')) return `<h2>${escaped.slice(3)}</h2>`;
    if (escaped.startsWith('# ')) return `<h1>${escaped.slice(2)}</h1>`;
    if (/^(?:- |\\* )/m.test(escaped)) return `<ul>${escaped.split('\\n').map((line) => `<li>${line.replace(/^(?:- |\\* )/, '')}</li>`).join('')}</ul>`;
    return `<p>${escaped.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>').replace(/\\*(.+?)\\*/g, '<em>$1</em>')}</p>`;
  }).join('');
  return h('section', { className: 'max-w-4xl' }, h(ToolIntro, { title: 'Markdown Preview' }, 'Write a small subset of Markdown and preview its headings, paragraphs, emphasis, and lists. Raw HTML is escaped for safety.'), h('div', { className: 'grid gap-4 md:grid-cols-2' }, h(TextArea, { id: 'markdown-input', label: 'Markdown', value: markdown, onChange: (event) => setMarkdown(event.target.value), rows: 12 }), h('div', { className: 'space-y-2' }, h('h2', { className: 'text-sm font-semibold text-gray-800' }, 'Preview'), h('div', { className: 'min-h-64 space-y-3 rounded-xl border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-800', dangerouslySetInnerHTML: { __html: html } }))));
}

export function CssGradientTool() {
  const [start, setStart] = React.useState('#6558f5');
  const [end, setEnd] = React.useState('#22d3ee');
  const [angle, setAngle] = React.useState('135');
  const value = `linear-gradient(${angle}deg, ${start}, ${end})`;
  return h('section', { className: 'max-w-3xl' }, h(ToolIntro, { title: 'CSS Gradient Generator' }, 'Create a two-color linear CSS gradient and copy the generated declaration. No external service is used.'), h('div', { className: 'grid gap-4 sm:grid-cols-3' }, [[start, setStart, 'Start color'], [end, setEnd, 'End color']].map(([color, setter, label]) => h('label', { className: 'block space-y-2', key: label }, h('span', { className: 'block text-sm font-semibold text-gray-800' }, label), h('input', { type: 'color', value: color, onChange: (event) => setter(event.target.value), className: 'h-12 w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-1' }))), h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, `Angle · ${angle}°`), h('input', { type: 'range', min: 0, max: 360, value: angle, onChange: (event) => setAngle(event.target.value), className: 'mt-3 w-full accent-violet-600' }))), h('div', { className: 'mt-5 h-40 rounded-2xl border border-gray-200 shadow-inner', style: { background: value }, role: 'img', 'aria-label': `Gradient preview from ${start} to ${end} at ${angle} degrees` }), h(OutputPanel, { label: 'CSS gradient', value, rows: 2 }));
}

export function UrlSlugTool() {
  const [input, setInput] = React.useState('');
  const output = createUrlSlug(input);
  return h('section', { className: 'max-w-3xl' },
    h(ToolIntro, { title: 'URL Slug Generator' }, 'Turn a page title into a clean, lowercase, hyphen-separated URL slug. Conversion happens in your browser.'),
    h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Page title'), h('input', { value: input, onChange: (event) => setInput(event.target.value), className: fieldClass, placeholder: 'e.g. A Guide to Better Writing' })),
    output && h(OutputPanel, { label: 'URL slug', value: output, rows: 2 })
  );
}
