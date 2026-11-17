# DevTools Hub

A responsive collection of browser-based utilities, plus a downloadable AI voice feature and Snake game.

## Local development

1. Install Node.js 22 or newer.
2. Install dependencies with `npm install`.
3. Copy `.env.example` values into a local `.env` file if needed.
4. For local downloadable speech, provide `AI_GATEWAY_API_KEY`; the API key stays server-side. Vercel deployments authenticate to AI Gateway automatically.
5. Start the UI with `npm run dev`; for local serverless API testing, use `npm run dev:vercel` with the Vercel CLI and project linked. Create a production build with `npm run build`.

The original utilities, Image to PDF, and JSON Formatter/Validator process data in the browser. Image to PDF keeps image bytes on the device and exports a real PDF. AI Voice Artist sends text to the server-side Vercel Function and an AI Gateway speech model. The downloadable output is MP3; WAV is not advertised by this configured model.

## Deployment

Deploy the repository to Vercel. Vite builds the static page and Vercel serves the `api/voice.js` serverless function. Add `AI_GATEWAY_API_KEY` to the Vercel project only if local/non-Vercel Gateway authentication is required; do not expose secrets in frontend code.

The speech endpoint currently uses a short-window per-process rate limiter plus a 4,000-character request cap. For a high-traffic public deployment, replace the process-local limiter with a shared rate-limit/usage-control service before promoting the endpoint widely.

See [PROJECT_REQUIREMENTS.md](PROJECT_REQUIREMENTS.md) and [TOOL_CHECKLIST.md](TOOL_CHECKLIST.md) for scope and implementation status.
