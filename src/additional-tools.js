import { createTextDiff, decodeJwtToken } from './additional-tool-utils.js';

const React = window.React;
const h = React.createElement;
const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200';
const buttonClass = 'rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50';

function Intro({ title, children }) {
  return h('div', { className: 'mb-6' }, h('h1', { className: 'mb-2 text-2xl font-bold tracking-tight text-gray-900' }, title), h('p', { className: 'max-w-2xl text-sm leading-6 text-gray-500' }, children));
}

function Field({ label, value, onChange, type = 'text', ...props }) {
  return h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, label), h('input', { type, value, onChange: (event) => onChange(event.target.value), className: inputClass, ...props }));
}

function Area({ label, value, onChange, ...props }) {
  return h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, label), h('textarea', { value, onChange: (event) => onChange(event.target.value), className: `${inputClass} resize-y font-mono leading-6`, rows: 7, ...props }));
}

function CopyOutput({ value, label = 'Output' }) {
  const [copied, setCopied] = React.useState(false);
  return h('div', { className: 'mt-5' }, h(Area, { label, value, onChange: () => {}, readOnly: true, rows: 8 }), h('button', { type: 'button', className: 'mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700', onClick: async () => { try { await navigator.clipboard.writeText(value); setCopied(true); } catch { setCopied(false); } } }, copied ? 'Copied' : 'Copy'));
}

function JwtDecoder() {
  const [token, setToken] = React.useState('');
  const [decoded, setDecoded] = React.useState('');
  const [error, setError] = React.useState('');
  const run = () => {
    try {
      const { header, payload, signature } = decodeJwtToken(token);
      setDecoded(`Header\n${JSON.stringify(header, null, 2)}\n\nPayload\n${JSON.stringify(payload, null, 2)}\n\nSignature\n${signature}`);
      setError('');
    } catch (caught) { setDecoded(''); setError(caught.message || 'Could not decode this JWT.'); }
  };
  return h('section', { className: 'max-w-3xl' }, h(Intro, { title: 'JWT Decoder' }, 'Decode a JSON Web Token locally to inspect its header and claims. Decoding does not verify the signature, issuer, or expiration.'), h(Area, { label: 'JWT', value: token, onChange: setToken, placeholder: 'Paste a three-part JWT here', rows: 5 }), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: run, disabled: !token.trim() }, 'Decode locally'), error && h('p', { className: 'mt-3 text-sm text-red-700', role: 'alert' }, error), decoded && h(CopyOutput, { value: decoded, label: 'Decoded token (not verified)' }));
}

function DifferenceChecker({ toolName }) {
  const [left, setLeft] = React.useState('');
  const [right, setRight] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');
  const compare = () => { try { setResult(createTextDiff(left, right)); setError(''); } catch (caught) { setResult(''); setError(caught.message); } };
  return h('section', { className: 'max-w-5xl' }, h(Intro, { title: toolName }, 'Compare two texts with a line-based longest-common-subsequence diff. Processing stays in your browser.'), h('div', { className: 'grid gap-4 md:grid-cols-2' }, h(Area, { label: 'Original text', value: left, onChange: setLeft, rows: 9 }), h(Area, { label: 'Changed text', value: right, onChange: setRight, rows: 9 })), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: compare }, 'Compare text'), error && h('p', { className: 'mt-3 text-sm text-red-700', role: 'alert' }, error), result && h(CopyOutput, { value: result, label: 'Line diff (− removed, + added)' }));
}

function HttpStatusReference() {
  const [query, setQuery] = React.useState('');
  const statuses = [
    [200, 'OK', 'The request succeeded.'], [201, 'Created', 'The request succeeded and created a resource.'], [202, 'Accepted', 'The request was accepted for processing.'], [204, 'No Content', 'The request succeeded with no response body.'],
    [301, 'Moved Permanently', 'The resource has a permanent new URL.'], [302, 'Found', 'The resource is temporarily at another URL.'], [304, 'Not Modified', 'A cached representation can be reused.'],
    [400, 'Bad Request', 'The server cannot process the request syntax.'], [401, 'Unauthorized', 'Authentication is required or was not accepted.'], [403, 'Forbidden', 'The server understood the request but refuses it.'], [404, 'Not Found', 'The requested resource was not found.'], [405, 'Method Not Allowed', 'The method is not supported for this resource.'], [408, 'Request Timeout', 'The server timed out waiting for the request.'], [409, 'Conflict', 'The request conflicts with current resource state.'], [410, 'Gone', 'The resource is no longer available.'], [418, "I'm a teapot", 'An April Fools status defined in RFC 2324.'], [422, 'Unprocessable Content', 'The content is syntactically valid but cannot be processed.'], [429, 'Too Many Requests', 'The client sent too many requests in a given time.'],
    [500, 'Internal Server Error', 'The server encountered an unexpected condition.'], [501, 'Not Implemented', 'The server does not support the requested functionality.'], [502, 'Bad Gateway', 'A gateway received an invalid upstream response.'], [503, 'Service Unavailable', 'The server is temporarily unable to handle the request.'], [504, 'Gateway Timeout', 'A gateway did not receive a timely upstream response.']
  ];
  const shown = statuses.filter(([code, name, description]) => `${code} ${name} ${description}`.toLowerCase().includes(query.toLowerCase()));
  return h('section', { className: 'max-w-4xl' }, h(Intro, { title: 'HTTP Status Code Reference' }, 'Search common HTTP response codes and their standard meanings.'), h(Field, { label: 'Search status codes', value: query, onChange: setQuery, placeholder: 'Try 404, server error, or redirect' }), h('div', { className: 'mt-4 grid gap-3 sm:grid-cols-2' }, shown.map(([code, name, description]) => h('article', { key: code, className: 'rounded-xl border border-gray-200 bg-white p-4' }, h('h2', { className: 'font-semibold text-gray-900' }, `${code} · ${name}`), h('p', { className: 'mt-1 text-sm leading-5 text-gray-600' }, description))), shown.length === 0 && h('p', { className: 'text-sm text-gray-500', role: 'status' }, 'No matching status codes.')));
}

function ShadowGenerator() {
  const [x, setX] = React.useState('0');
  const [y, setY] = React.useState('12');
  const [blur, setBlur] = React.useState('32');
  const [spread, setSpread] = React.useState('0');
  const [color, setColor] = React.useState('#171a2b');
  const [opacity, setOpacity] = React.useState('18');
  const hex = color.slice(1);
  const rgba = `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${(Number(opacity) / 100).toFixed(2)})`;
  const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${rgba};`;
  const numeric = [x, y, blur, spread, opacity].map(Number);
  const valid = numeric.every(Number.isFinite) && numeric[2] >= 0 && numeric[4] >= 0 && numeric[4] <= 100 && numeric.slice(0, 4).every((value) => Math.abs(value) <= 300);
  return h('section', { className: 'max-w-4xl' }, h(Intro, { title: 'CSS Shadow Generator' }, 'Adjust the values to preview a CSS box shadow. Numeric values are limited to keep the preview safe and usable.'), h('div', { className: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' }, [[x, setX, 'Horizontal offset'], [y, setY, 'Vertical offset'], [blur, setBlur, 'Blur radius'], [spread, setSpread, 'Spread radius'], [opacity, setOpacity, 'Opacity (%)']].map(([value, setter, label]) => h(Field, { key: label, label, value, onChange: setter, type: 'number', min: label.includes('Opacity') ? 0 : -300, max: label.includes('Opacity') ? 100 : 300 })), h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Shadow color'), h('input', { type: 'color', value: color, onChange: (event) => setColor(event.target.value), className: 'h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-white p-1' }))), valid ? h('div', { className: 'mt-6 flex min-h-48 items-center justify-center rounded-2xl border border-gray-200 bg-slate-100 p-8' }, h('div', { className: 'flex h-28 w-full max-w-sm items-center justify-center rounded-2xl bg-white font-medium text-gray-700', style: { boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${rgba}` } }, 'Shadow preview')) : h('p', { className: 'mt-4 text-sm text-red-700', role: 'alert' }, 'Enter valid offsets and a blur radius from 0 to 300px; opacity must be between 0 and 100%.'), valid && h(CopyOutput, { value: css, label: 'CSS declaration' }));
}

function LoremGenerator() {
  const [paragraphCount, setParagraphCount] = React.useState('3');
  const [output, setOutput] = React.useState('');
  const source = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at erat consequat tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Curabitur blandit tempus porttitor, donec ullamcorper nulla non metus auctor fringilla.';
  const generate = () => { const count = Number(paragraphCount); if (!Number.isInteger(count) || count < 1 || count > 20) return; setOutput(Array.from({ length: count }, (_, index) => index === 0 ? `Lorem ipsum dolor sit amet, ${source.slice(28)}` : source).join('\n\n')); };
  return h('section', { className: 'max-w-3xl' }, h(Intro, { title: 'Lorem Ipsum Generator' }, 'Generate one to twenty paragraphs of standard placeholder copy locally.'), h(Field, { label: 'Paragraphs (1–20)', value: paragraphCount, onChange: setParagraphCount, type: 'number', min: 1, max: 20 }), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: generate }, 'Generate paragraphs'), output && h(CopyOutput, { value: output, label: 'Generated text' }));
}

function SampleDataGenerator() {
  const [count, setCount] = React.useState('10');
  const [output, setOutput] = React.useState('');
  const generate = () => {
    const amount = Number(count);
    if (!Number.isInteger(amount) || amount < 1 || amount > 100) return;
    const firstNames = ['Alex', 'Avery', 'Casey', 'Jordan', 'Morgan', 'Riley', 'Sam', 'Taylor', 'Jamie', 'Quinn'];
    const lastNames = ['Morgan', 'Rivera', 'Kim', 'Patel', 'Chen', 'Reed', 'Brooks', 'Diaz', 'Singh', 'Parker'];
    const rows = Array.from({ length: amount }, (_, index) => {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      return { id: index + 1, name: `${first} ${last}`, email: `${first.toLowerCase()}.${last.toLowerCase()}${index + 1}@example.test`, status: Math.random() > 0.5 ? 'active' : 'pending', createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 86400000)).toISOString() };
    });
    setOutput(JSON.stringify(rows, null, 2));
  };
  return h('section', { className: 'max-w-3xl' }, h(Intro, { title: 'Sample Data Generator' }, 'Create fictional JSON records for prototypes and tests. Names and addresses use reserved example.test domains; do not treat this as real user data.'), h(Field, { label: 'Records (1–100)', value: count, onChange: setCount, type: 'number', min: 1, max: 100 }), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: generate }, 'Generate JSON'), output && h(CopyOutput, { value: output, label: 'Sample records' }));
}

function DateDifference() {
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');
  const calculate = () => {
    const startDate = new Date(`${start}T00:00:00Z`);
    const endDate = new Date(`${end}T00:00:00Z`);
    if (!start || !end || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) { setError('Choose two valid dates.'); setResult(''); return; }
    const days = Math.abs(Math.round((endDate - startDate) / 86400000));
    setResult(`${days.toLocaleString()} days\n${Math.floor(days / 7)} full weeks and ${days % 7} days\n${(days / 365.2425).toFixed(2)} years (approximate)`);
    setError('');
  };
  return h('section', { className: 'max-w-3xl' }, h(Intro, { title: 'Date Difference Calculator' }, 'Calculate elapsed calendar days between two dates. The year conversion is an average and is labeled approximate.'), h('div', { className: 'grid gap-4 sm:grid-cols-2' }, h(Field, { label: 'Start date', type: 'date', value: start, onChange: setStart }), h(Field, { label: 'End date', type: 'date', value: end, onChange: setEnd })), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: calculate }, 'Calculate difference'), error && h('p', { className: 'mt-3 text-sm text-red-700', role: 'alert' }, error), result && h(CopyOutput, { value: result, label: 'Date difference' }));
}

function TicTacToe() {
  const [board, setBoard] = React.useState(Array(9).fill(''));
  const [turn, setTurn] = React.useState('X');
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const winner = lines.map(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c] ? board[a] : '').find(Boolean);
  const status = winner ? `${winner} wins` : board.every(Boolean) ? 'It is a draw' : `${turn} to move`;
  const play = (index) => { if (board[index] || winner || board.every(Boolean)) return; const next = [...board]; next[index] = turn; setBoard(next); setTurn(turn === 'X' ? 'O' : 'X'); };
  const reset = () => { setBoard(Array(9).fill('')); setTurn('X'); };
  return h('section', { className: 'max-w-xl' }, h(Intro, { title: 'Tic-Tac-Toe' }, 'A two-player local game. Use the keyboard or tap an empty square to play.'), h('p', { className: 'mb-4 text-sm font-semibold text-violet-700', role: 'status', 'aria-live': 'polite' }, status), h('div', { className: 'grid w-full max-w-sm grid-cols-3 gap-2', role: 'group', 'aria-label': 'Tic-Tac-Toe board' }, board.map((cell, index) => h('button', { type: 'button', key: index, onClick: () => play(index), disabled: Boolean(cell) || Boolean(winner) || board.every(Boolean), 'aria-label': `Square ${index + 1}${cell ? `, ${cell}` : ', empty'}`, className: 'aspect-square rounded-xl border border-gray-200 bg-white text-4xl font-bold text-violet-700 shadow-sm hover:border-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 disabled:cursor-default' }, cell))), h('button', { type: 'button', className: `${buttonClass} mt-4`, onClick: reset }, 'Restart game'));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function FocusTimer({ toolName }) {
  const isStopwatch = toolName === 'Stopwatch';
  const isPomodoro = toolName === 'Pomodoro Timer';
  const [duration, setDuration] = React.useState(isPomodoro ? '25' : '5');
  const [seconds, setSeconds] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [laps, setLaps] = React.useState([]);
  const validDuration = Number.isInteger(Number(duration)) && Number(duration) >= 1 && Number(duration) <= 180;
  React.useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => setSeconds((current) => {
      if (isStopwatch) return current + 1;
      if (current <= 1) { setRunning(false); return 0; }
      return current - 1;
    }), 1000);
    return () => window.clearInterval(interval);
  }, [running, isStopwatch]);
  const reset = () => { setRunning(false); setSeconds(isStopwatch ? 0 : (validDuration ? Number(duration) : 1) * 60); setLaps([]); };
  const start = () => {
    if (!isStopwatch && !validDuration) return;
    if (!running && !isStopwatch && seconds === 0) setSeconds(Number(duration) * 60);
    setRunning(true);
  };
  return h('section', { className: 'max-w-xl' }, h(Intro, { title: toolName }, isStopwatch ? 'Use the local stopwatch to time an activity and record lap marks.' : isPomodoro ? 'A focused work timer. Set a session length, start, pause, and reset as needed.' : 'Set a countdown duration and run a local timer.'), !isStopwatch && h(Field, { label: 'Duration in minutes (1–180)', type: 'number', min: 1, max: 180, value: duration, onChange: (value) => { setDuration(value); const amount = Number(value); if (!running && Number.isInteger(amount) && amount >= 1 && amount <= 180) setSeconds(amount * 60); } }), !isStopwatch && !validDuration && h('p', { className: 'mt-2 text-sm text-red-700', role: 'alert' }, 'Choose a whole number from 1 to 180.'), h('div', { className: 'my-6 rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center' }, h('p', { className: 'font-mono text-6xl font-semibold tracking-tight text-gray-900', role: 'timer', 'aria-live': 'off' }, formatTime(seconds)), !isStopwatch && seconds === 0 && !running && h('p', { className: 'mt-2 text-sm text-emerald-700', role: 'status' }, 'Timer complete')), h('div', { className: 'flex flex-wrap gap-2' }, h('button', { type: 'button', className: buttonClass, onClick: running ? () => setRunning(false) : start, disabled: running === false && !isStopwatch && !validDuration }, running ? 'Pause' : 'Start'), h('button', { type: 'button', className: 'rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700', onClick: reset }, 'Reset'), isStopwatch && h('button', { type: 'button', className: 'rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700', onClick: () => setLaps((current) => [`Lap ${current.length + 1}: ${formatTime(seconds)}`, ...current]) }, 'Record lap')), laps.length > 0 && h('ol', { className: 'mt-4 space-y-2' }, laps.map((lap) => h('li', { key: lap, className: 'rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700' }, lap))));
}

export function AdditionalUtilityTool({ toolName }) {
  if (toolName === 'JWT Decoder') return h(JwtDecoder);
  if (toolName === 'Code Difference Checker') return h(DifferenceChecker, { toolName });
  if (toolName === 'HTTP Status Code Reference') return h(HttpStatusReference);
  if (toolName === 'CSS Shadow Generator') return h(ShadowGenerator);
  if (toolName === 'Lorem Ipsum Generator') return h(LoremGenerator);
  if (toolName === 'Sample Data Generator') return h(SampleDataGenerator);
  if (toolName === 'Date Difference Calculator') return h(DateDifference);
  if (toolName === 'Tic-Tac-Toe') return h(TicTacToe);
  if (['Stopwatch', 'Countdown Timer', 'Pomodoro Timer'].includes(toolName)) return h(FocusTimer, { toolName });
  return h('p', { role: 'alert' }, `${toolName} is not available.`);
}
