# Iraq Election Platform (Next.js 14)

This is a modern, multilingual (English, Arabic, Kurdish), and responsive web application for browsing candidates in the Iraqi parliamentary elections, built with Next.js 14 and the App Router.

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

- **`app/[lang]`**: Dynamic routes for i18n. All pages are nested here.
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
- **`dictionaries`**: JSON files for English (`en.json`), Arabic (`ar.json`), and Kurdish (`ku.json`) translations.
- **`middleware.ts`**: Handles automatic locale detection and URL rewriting for i18n.
- **`public`**: Static assets like images.

## Getting Started

### Prerequisites

- Node.js (v18.17 or later)
- npm, yarn, or pnpm

### 1. Setup Environment Variables

Create a file named `.env.local` in the root of the project and add the URL for your backend API:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
```

### 2. Install Dependencies

Open your terminal and run:

```bash
npm install
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will automatically detect your browser's language and redirect you to the appropriate path (e.g., `/en`, `/ar`, or `/ku`).

## Build for Production

To create a production-ready build, run:

```bash
npm run build
```

This will generate an optimized version of your application in the `.next` directory, ready for deployment.
