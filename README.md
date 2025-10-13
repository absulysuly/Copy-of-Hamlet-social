<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1hAlPiZu4YY0tJl0KEL15i1Jjd1NlAjE3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Environment Variables

- **`.env.example`** now documents `VITE_API_BASE_URL` (Windsurf or local backend endpoint) and `VITE_USE_MOCKS` (set to `false` when live data is available).
- Copy `.env.example` to `.env` (or `.env.local` for AI Studio) and adjust values as needed.

## API Client

- All data fetching is handled through `services/apiClient.ts` and `services/api.ts`.
- The client attempts real HTTP requests first and falls back to mock generators when `VITE_USE_MOCKS` is `true` or a request fails.
- Keep UI components importing from hooks/services rather than mock constants so backend integration remains seamless.
