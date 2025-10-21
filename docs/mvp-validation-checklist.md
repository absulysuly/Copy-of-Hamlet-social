# Iraqi Election Platform - MVP Fix & Validation Checklist

## 🔧 Immediate Fixes Completed

### ✅ TopNavBar.tsx
- Consolidated duplicate React imports into single `import { useState } from 'react'`
- Added proper TypeScript interfaces (`TopNavBarProps`)
- Implemented mobile-responsive navigation
- Added language switcher (EN/AR/KU)
- Removed utility re-exports (moved to dedicated files if needed)

### ✅ Project-Wide Scan
PowerShell script created to:

- Find all files with duplicate React imports
- Automatically consolidate imports
- Create safety backups (Git + filesystem)
- Remove Tailwind CDN references
- Validate PostCSS configuration

## 🧪 Testing Protocol

### Pre-Deployment Checks
```bash
# 1. Install dependencies
npm install

# 2. Run linter with auto-fix
npm run lint -- --fix

# 3. Development server test
npm run dev
# ✓ No duplicate identifier errors
# ✓ Tailwind styles load correctly
# ✓ Navigation works in EN/AR/KU

# 4. Production build
npm run build
# ✓ Build completes without errors
# ✓ TypeScript compilation succeeds
# ✓ Next.js optimization runs

# 5. Production server test
npm run start
# ✓ Server starts on expected port
# ✓ All routes accessible
```

### Manual Testing
- Desktop navigation (Chrome, Firefox, Safari)
- Mobile responsive design (iOS Safari, Android Chrome)
- Language switching (EN ↔ AR ↔ KU)
- RTL layout for Arabic
- Mobile menu toggle
- All navigation links functional

## 📋 Remaining MVP Tasks (Priority Order)

### P0 - Critical for Launch
- Merge PR #11
  - Resolve ElectionHubPage.tsx props
  - Fix FeaturedCandidates.tsx types
  - Merge ballot_number conflicts in types.ts
  - Remove vite.config.ts
- Gemini Service Integration
  - Verify API key in env vars
  - Test offline fallbacks
  - Validate response types
- Governorate Display Bug
  ```typescript
  const governorateName = 
    typeof candidate.governorate === 'string' 
      ? candidate.governorate 
      : candidate.governorate?.name ?? 
        candidate.governorate?.slug ?? 
        'Unknown';
  ```

### P1 - Launch Week Features
- PWA Implementation (6 hours)
  - Create /public/manifest.json
  - Add service worker
  - Test install flow on mobile
  - Add to homescreen prompts
- QR Code Integration (4 hours)
  ```bash
  npm install qrcode.react
  ```
  - Homepage QR generator
  - Candidate profile QR codes
  - Deep linking to /app/download
- Women's Empowerment Section (8 hours)
  - Create /pages/[lang]/women/index.tsx
  - Implement IHEC content scraper
  - Featured women candidates component
  - Registration guide content

### P2 - Post-Launch
- Party Outreach System (4 hours)
  - Build services/outreach.ts
  - Email template with QR codes
  - Party-level activation workflow

## 🚀 Deployment Steps

### Vercel Configuration
```bash
# Environment variables required:
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
NEXT_PUBLIC_USE_MOCKS=false
DATABASE_URL=postgresql://...
CORS_ORIGIN=*
GEMINI_API_KEY=your_key_here

# Deploy command:
vercel --prod
```

### Build Settings
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 18.x

### DNS Configuration
- A Record: @ → Vercel IP
- CNAME: www → cname.vercel-dns.com

## 📊 Success Metrics
Track after launch:

- `candidates_onboarded`: 0
- `parties_partnered`: 0
- `qr_scans`: 0
- `pwa_installs`: 0
- `women_section_views`: 0
- `avg_session_duration`: 0

## 🛡️ Safety Notes
- Git Branches Created:
  - `backup_<timestamp>` - Full state before changes
  - `codex/fix-mvp-<timestamp>` - Working branch
- Local Backup:
  - `E:\HamletUnified\_backups\MVP_<timestamp>`
- Rollback Command:
  ```bash
  git checkout backup_<timestamp>
  ```

## ⏱️ Timeline Estimate

| Task | Time | Status |
| --- | --- | --- |
| Fix React imports | 1h | ✅ Complete |
| Merge PR #11 | 2h | 🔄 In Progress |
| PWA + QR | 6h | ⏳ Pending |
| Women's Section | 8h | ⏳ Pending |
| Party Outreach | 4h | ⏳ Pending |
| Testing | 4h | ⏳ Pending |
| Deployment | 1h | ⏳ Pending |
| **Total** | **~26 hours remaining** | |

## 🎯 Next Immediate Action
Run the PowerShell script to:

1. Create all safety backups
2. Scan entire codebase for duplicate imports
3. Auto-fix TopNavBar.tsx and similar files
4. Validate Tailwind configuration
5. Test production build

```powershell
.\fix-mvp-build.ps1
```
