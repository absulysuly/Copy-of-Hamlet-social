# ? Deployment Checklist - Digital Democracy Iraq

## ?? CRITICAL FINDINGS

### ? **Do NOT Deploy to Railway**
This repository contains **ONLY FRONTEND CODE**. There is no backend to deploy.
- The backend is already deployed at: `https://hamlet-unified-complete-2027-production.up.railway.app`
- Your deployment plan document is **incorrect** for this repository

### ? **Deploy to Vercel or Cloudflare Pages**
This is a Next.js static export ready for frontend hosting platforms.

---

## ?? PRE-DEPLOYMENT ACTIONS (Required)

### 1. Install Dependencies
```bash
npm install
```
**Status:** ? Currently MISSING all dependencies  
**Priority:** ?? CRITICAL

### 2. Delete Obsolete Files
```bash
rm index.html index.tsx App.tsx vite.config.ts
git add -A
git commit -m "chore: Remove obsolete files"
```
**Reason:** These files are from old project structure and will cause confusion

### 3. Test Build Locally
```bash
npm run build
```
**Expected output:** Static files in `out/` directory

### 4. Fix API Key Security Issue
**Current Problem:** `API_KEY` environment variable is not prefixed with `NEXT_PUBLIC_`

**Option A - Quick Fix (Exposes key in client):**
```typescript
// services/geminiService.ts
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
```

**Option B - Secure Fix (Recommended):**
Create a serverless proxy function to keep key server-side

---

## ?? DEPLOYMENT STEPS

### Option 1: Vercel (RECOMMENDED)

#### Via Dashboard
1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub: `absulysuly/DigitalDemocracy.Iraq`
4. Vercel auto-detects Next.js ?
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://hamlet-unified-complete-2027-production.up.railway.app
   NEXT_PUBLIC_BACKUP_API=https://winter-leaf-f532.safaribosafar.workers.dev
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
6. Click "Deploy"

#### Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

### Option 2: Cloudflare Pages

1. Go to https://pages.cloudflare.com
2. Connect GitHub repository
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `out`
4. Add environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://hamlet-unified-complete-2027-production.up.railway.app
   NEXT_PUBLIC_BACKUP_API=https://winter-leaf-f532.safaribosafar.workers.dev
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Click "Save and Deploy"

---

## ?? POST-DEPLOYMENT TESTING

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] Language switching (EN, AR, KU)
- [ ] RTL layout for Arabic/Kurdish
- [ ] Candidate search and filtering
- [ ] API connectivity (check browser console)
- [ ] Theme switching (Light/Dark/Ramadan)
- [ ] Ramadan detection (recent fix)
- [ ] AI features (Tea House)
- [ ] Mobile responsive design
- [ ] All pages accessible

---

## ?? ENVIRONMENT VARIABLES NEEDED

```env
# Backend API URLs
NEXT_PUBLIC_API_BASE_URL=https://hamlet-unified-complete-2027-production.up.railway.app
NEXT_PUBLIC_BACKUP_API=https://winter-leaf-f532.safaribosafar.workers.dev

# Gemini AI API Key (will be exposed in client code)
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here

# OR keep it server-side only (if using serverless functions)
GEMINI_API_KEY=your_actual_api_key_here
```

---

## ?? KNOWN ISSUES

### 1. API Key Exposure
- **Issue:** Gemini API key will be visible in client-side JavaScript
- **Risk:** Can be extracted and abused
- **Mitigation:** Use Google Cloud Console to restrict key to your domain

### 2. Version Mismatches
- Some dependencies in `index.html` don't match `package.json`
- **Solution:** Delete `index.html` (it's not used by Next.js)

### 3. Incomplete Testing
- The `hijri-date-converter` library (from recent commit) has not been tested
- **Action:** Test Ramadan detection after deployment

---

## ?? PLATFORM COMPATIBILITY

| Platform | Status | Notes |
|----------|--------|-------|
| **Vercel** | ? Perfect | Best choice for Next.js |
| **Cloudflare Pages** | ? Excellent | Fast global CDN |
| **Netlify** | ? Good | Easy setup |
| **Railway** | ? Not Applicable | No backend here |
| **GitHub Pages** | ?? Possible | Requires custom workflow |

---

## ?? QUICK START (TL;DR)

```bash
# 1. Install dependencies
npm install

# 2. Clean up
rm index.html index.tsx App.tsx vite.config.ts

# 3. Test build
npm run build

# 4. Deploy to Vercel
npx vercel --prod
```

**Then configure environment variables in Vercel dashboard.**

---

## ?? SUPPORT

For detailed analysis, see: `DEPLOYMENT_ANALYSIS_REPORT.md`

**Key Points:**
- ? Frontend code is excellent quality
- ? Ready for static hosting
- ? Do NOT use Railway (no backend)
- ?? Fix API key security before production
- ?? Must install dependencies first

---

**Last Updated:** 2025-11-03  
**Status:** Ready for deployment after addressing critical issues
