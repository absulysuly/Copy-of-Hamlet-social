# Hamlet - Iraqi Election Platform (Next.js 14)

This is a modern, bilingual, and responsive web application for browsing candidates in the Iraqi parliamentary elections, built with Next.js 14 and the App Router.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Charts**: Recharts
- **UI Icons**: React Icons
- **Internationalization (i18n)**: Next.js Middleware with `server-only` dictionaries
- **Theme**: Dark/Light mode with `next-themes`

## Project Structure

- **`app/[lang]`**: Dynamic routes for i18n (internationalization). All pages are nested here.
  - **`layout.tsx`**: The root layout, including Navbar, Footer, and providers.
  - **`page.tsx`**: The Home Page.
  - **`candidates/page.tsx`**: The main candidate browsing page with filtering.
  - **`candidates/[id]/page.tsx`**: The dynamic page for a single candidate's profile.
  - **`loading.tsx` & `error.tsx`**: Next.js conventions for handling loading states and errors.
- **`components`**: Reusable React components, organized by feature (layout, home, candidates, stats, ui).
- **`lib`**: Core logic, utilities, and API communication.
  - **`api.ts`**: Axios instance and functions for fetching data from the backend.
  - **`types.ts`**: TypeScript interfaces for all data models.
  - **`i18n-config.ts`**: Configuration for supported locales.
  - **`dictionaries.ts`**: Server-side function to load translation files.
- **`dictionaries`**: JSON files for English (`en.json`) and Arabic (`ar.json`) translations.
- **`middleware.ts`**: Handles automatic locale detection and URL rewriting for i18n.
- **`public`**: Static assets like images and fonts.

## Getting Started

### Prerequisites

- Node.js (v18.17 or later)
- npm, yarn, or pnpm
- A running instance of the backend API.

### 1. Setup Environment Variables

Create a file named `.env.local` in the root of the project and add the URL for your backend API:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
```

### 2. Install Dependencies

Open your terminal and run:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will automatically detect your browser's language and redirect you to either `/en` or `/ar`.

## Key Features Implemented

- **Full Internationalization**: Complete support for English and Arabic, including RTL layout for Arabic.
- **Server Components**: Pages are rendered on the server for optimal performance and SEO.
- **Client Components**: Interactive elements like filtering, theme switching, and charts are handled on the client.
- **Loading & Error States**: Uses Next.js's file-based conventions for loading skeletons and error boundaries.
- **Responsive Design**: The UI adapts seamlessly from mobile to desktop screens.
- **Dark/Light Mode**: User-configurable theme that persists across sessions.
- **Dynamic SEO**: Metadata for pages (like candidate profiles) is generated dynamically based on fetched data.

## Environment Variables

### Required for Development

Create `.env.local` and set the following values:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4001
GEMINI_MODE=stub
```

### Environment Variable Reference

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL used by the frontend API client.
- `GEMINI_MODE`: Controls Gemini AI integration behaviour.
  - `stub` (default): Deterministic mock responses for local development.
  - `remote`: Calls the real Gemini API (requires `GEMINI_API_KEY` or `NEXT_PUBLIC_GEMINI_API_KEY`).
- `GEMINI_API_KEY` / `NEXT_PUBLIC_GEMINI_API_KEY`: Optional keys for enabling remote Gemini access.

## Development

### Initial Setup

```bash
npm install
cp .env.example .env.local # If the template exists, otherwise create manually
# Edit .env.local with your environment values
```

### Running Locally

1. Start the backend API (adjust commands to your backend project):

   ```bash
   cd backend
   npm start
   # Should log: Server: http://localhost:4001
   ```

2. Start the frontend in a new terminal window:

   ```bash
   npm run dev
   ```

3. Verify the setup by running smoke tests and unit tests:

   ```bash
   npm run smoke
   npm test
   ```

### Verification Steps

After starting both servers, verify the following:

- [ ] No hydration warnings appear in the browser console.
- [ ] Featured candidates render correctly on `/en` and `/ar` routes.
- [ ] Stats panels display data (or safe fallbacks if the backend is unavailable).
- [ ] `npm run smoke` passes all API endpoint checks.
- [ ] `npm test` completes without failures.

### Production Build

```bash
npm run build
npm start
```

## Testing

### Unit Tests

```bash
npm test          # Run the full test suite once
npm run test:watch # Watch mode during development
```

### Smoke Tests

```bash
npm run smoke
```

### CI Checks

- Build verification: `npm run build`
- Unit tests: `npm test`
- Smoke tests: `npm run smoke`
- Type checking: `npm run type-check` (if configured)

## Troubleshooting

### API Validation Errors

If you encounter `[API Validation]` console output:

1. Confirm the backend response structure matches the schemas in `lib/api.ts`.
2. Review the logged payload sample (development mode only) for discrepancies.
3. Update the Zod schemas if the API contract changed intentionally.

### Hydration Warnings

1. Ensure the `<html>` `dir` attribute is set server-side in `app/[lang]/layout.tsx`.
2. Disable browser extensions that might inject client-side scripts.
3. View the page source to confirm the server-rendered HTML matches expectations.

### Gemini Service Issues

1. Check the `GEMINI_MODE` environment variable.
2. Use `stub` for predictable local development responses.
3. Set `GEMINI_MODE=remote` and provide an API key only when real AI responses are required.
