import {
  createSha256,
  dateToTimestamps,
  decodeBase64Utf8,
  decodeHtmlEntities,
  encodeBase64Utf8,
  encodeHtml,
  generateUuids,
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

function TextArea({ id, label, value, onChange, placeholder, readOnly = false, rows = 6 }) {
  return h('label', { className: 'block space-y-2' },
    h('span', { className: 'text-sm font-semibold text-gray-800' }, label),
    h('textarea', {
      id,
      value,
      onChange,
      placeholder,
      readOnly,
      rows,
      spellCheck: false,
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
