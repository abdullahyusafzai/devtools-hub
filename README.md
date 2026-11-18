# DevTools Hub

A responsive collection of browser-based utilities, with a free offline WAV voice generator, PDF workflows, developer utilities, and games.

## Local development

1. Install Node.js 24 or newer.
2. Install dependencies with `npm install`.
3. Copy `.env.example` values into a local `.env` file only if another feature needs them.
4. Start the UI with `npm run dev`. Create a production build with `npm run build`.

Most utilities process data locally. The PDF suite can merge, split, rotate, reorder, watermark, extract, remove pages, and inspect PDF metadata; Image to PDF creates a real PDF. Image to PDF exports a real PDF. Voice synthesis runs locally with the open-source eSpeak NG engine and self-hosted English voice data, and produces a free WAV download; script text is not sent to any speech service. The bundled engine is GPL-3.0-or-later; its license is included with the voice assets.

Text Summarizer and AI Rephrasing are opt-in server-side features using Vercel AI Gateway and Gemini 2.5 Flash. Submitted text is sent to the model and can incur usage charges; the endpoint enforces an Upstash-backed limit of eight requests per IP per minute and does not store prompts. `KV_REST_API_URL` and `KV_REST_API_TOKEN` are required for rate limiting. For local function testing, use `npm run dev:vercel`; `npm run dev` starts only the Vite UI.

## Deployment

Deploy the repository to Vercel. Vite builds the static UI, and Vercel Functions serve the opt-in AI writing endpoint. Offline voice generation does not require a speech provider or serverless endpoint.

See [PROJECT_REQUIREMENTS.md](PROJECT_REQUIREMENTS.md) and [TOOL_CHECKLIST.md](TOOL_CHECKLIST.md) for scope and implementation status.
