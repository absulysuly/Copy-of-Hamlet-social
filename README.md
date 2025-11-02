# Digital Diwan - Iraqi Social Election Platform (Next.js 14)

This is a modern, multilingual (English, Arabic, Kurdish), and responsive web application for fostering civic engagement around the Iraqi elections, built with Next.js 14 and the App Router. It's designed to feel like a social media platform, making democracy feel accessible and engaging for a new generation.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
- **Internationalization (i18n)**: Next.js Middleware with JSON dictionaries
- **Theme**: Dark/Light mode + special Ramadan mode with `next-themes`
- **Date Formatting**: `date-fns`

## Project Structure

- **`app/[lang]`**: Dynamic routes for i18n. All pages are nested here.
  - **`layout.tsx`**: The root layout, including Navbar, Footer, and providers.
  - **`page.tsx`**: The Home Page (Social Feed).
  - **`candidates/page.tsx`**: The main candidate browsing page with filtering.
  - **`candidates/[id]/page.tsx`**: The dynamic page for a single candidate's profile.
- **`components`**: Reusable React components, organized by feature (layout, social, election, ui).
- **`lib`**: Core logic, utilities, and API communication.
  - **`api.ts`**: Functions for fetching data from the backend.
  - **`types.ts`**: TypeScript interfaces for all data models.
  - **`i18n-config.ts`**: Configuration for supported locales.
  - **`dictionaries.ts`**: Server-side function to load translation files.
- **`dictionaries`**: JSON files for English (`en.json`), Arabic (`ar.json`), and Kurdish (`ku.json`) translations.
- **`middleware.ts`**: Handles automatic locale detection and URL rewriting for i18n.
- **`public`**: Static assets like images.

## Getting Started

### Prerequisites

- Node.js (v18.17 or later)
- npm, yarn, or pnpm

### 1. Setup Environment Variables

Create a file named `.env.local` in the root of the project and add the following variables:

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://hamlet-unified-complete-2027-production.up.railway.app
NEXT_PUBLIC_BACKUP_API=https://winter-leaf-f532.safaribosafar.workers.dev
API_KEY="YOUR_GEMINI_API_KEY"
```

- `NEXT_PUBLIC_API_BASE_URL`: The URL for the backend data API.
- `NEXT_PUBLIC_BACKUP_API`: The fallback API URL (e.g., from Cloudflare Workers) to use if the primary API fails.
- `API_KEY`: **Required for AI features.** Your API key for the Google Gemini API. This is necessary for features like AI-powered post generation and the interactive Tea House. You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).


### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The middleware will automatically redirect you to the default locale (e.g., `/ar`).

---

## Deployment

This application is built with Next.js and is ready for production deployment. The recommended platform for deploying Next.js applications is **Vercel**, the creators of Next.js.

### Deploying with Vercel (Recommended)

1.  **Push to Git**: Make sure your project code is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  **Import Project**: Sign up for a free Vercel account and import your Git repository. Vercel will automatically detect that it is a Next.js project.
3.  **Configure Environment Variables**: In the Vercel project settings, navigate to "Environment Variables" and add the following:
    -   **Key**: `NEXT_PUBLIC_API_BASE_URL`
    -   **Value**: `https://hamlet-unified-complete-2027-production.up.railway.app`
    -   **Key**: `NEXT_PUBLIC_BACKUP_API`
    -   **Value**: `https://winter-leaf-f532.safaribosafar.workers.dev`
    -   **Key**: `API_KEY`
    -   **Value**: Add your Google Gemini API key here.
4.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your application, providing you with a live URL.

The application is now live! Vercel will automatically redeploy the application every time you push new changes to your connected Git branch.