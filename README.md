# DevTools Hub

A responsive collection of browser-based utilities, plus a free offline voice generator and Snake game.

## Local development

1. Install Node.js 24 or newer.
2. Install dependencies with `npm install`.
3. Copy `.env.example` values into a local `.env` file only if another feature needs them.
4. Start the UI with `npm run dev`. Create a production build with `npm run build`.

The original utilities, Image to PDF, JSON Formatter/Validator, and Offline Voice Artist process data in the browser. Image to PDF exports a real PDF. Voice synthesis runs locally with the open-source eSpeak NG engine and self-hosted English voice data, and produces a free WAV download; script text is not sent to any speech service. The bundled engine is GPL-3.0-or-later; its license is included with the voice assets.

## Deployment

Deploy the repository to Vercel. Vite builds the static page and Vercel serves the self-hosted speech-engine assets. The offline voice generator requires no serverless speech endpoint, provider credentials, or Redis integration.

See [PROJECT_REQUIREMENTS.md](PROJECT_REQUIREMENTS.md) and [TOOL_CHECKLIST.md](TOOL_CHECKLIST.md) for scope and implementation status.
