const React = window.React;
const h = React.createElement;
const fieldClass = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-violet-400 focus:outline-none';

export function AiWritingTool({ toolName }) {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const action = toolName === 'Text Summarizer' ? 'summarize' : 'rewrite';
  const submit = async (event) => {
    event.preventDefault();
    if (!input.trim() || input.length > 10000 || busy) return;
    setBusy(true);
    setError('');
    setOutput('');
    try {
      const response = await fetch('/api/ai-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, text: input })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'AI writing could not be completed.');
      setOutput(result.text);
    } catch (requestError) {
      setError(requestError.message || 'Could not reach the AI writing service. On local development, use the Vercel dev runtime.');
    } finally {
      setBusy(false);
    }
  };
  return h('section', { className: 'max-w-3xl' },
    h('div', { className: 'mb-6' }, h('h1', { className: 'mb-2 text-2xl font-bold tracking-tight text-gray-900' }, toolName), h('p', { className: 'max-w-2xl text-sm leading-6 text-gray-500' }, action === 'summarize' ? 'Create a faithful concise summary of text you provide.' : 'Rewrite text for clearer flow while preserving its original meaning.')),
    h('div', { className: 'mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800' }, 'AI processing: when you select Generate, your text is sent to the hosted Vercel AI Gateway model over HTTPS. This can incur model usage charges. Requests are rate-limited; your text is not saved by this application.'),
    h('form', { onSubmit: submit },
      h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Text to process'), h('textarea', { value: input, onChange: (event) => setInput(event.target.value), maxLength: 10000, rows: 9, className: `${fieldClass} resize-y font-mono leading-6`, placeholder: 'Paste or write up to 10,000 characters…', 'aria-describedby': 'ai-text-limit' })),
      h('div', { className: 'mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500' }, h('span', { id: 'ai-text-limit' }, 'Maximum 10,000 characters'), h('span', { 'aria-live': 'polite' }, `${input.length.toLocaleString()} / 10,000`)),
      h('button', { type: 'submit', className: 'mt-4 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50', disabled: busy || !input.trim() || input.length > 10000 }, busy ? 'Generating…' : toolName),
      error && h('p', { className: 'mt-3 text-sm text-red-700', role: 'alert' }, error)),
    output && h('div', { className: 'mt-6' }, h('label', { className: 'block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Generated result'), h('textarea', { value: output, readOnly: true, rows: 8, className: `${fieldClass} resize-y leading-6` })), h('button', { type: 'button', className: 'mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:border-violet-300', onClick: async () => { try { await navigator.clipboard.writeText(output); } catch {} } }, 'Copy result'))
  );
}
