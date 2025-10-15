# Hamlet Election Platform - Setup Instructions

## 🚨 CRITICAL: You Must Run Commands in the Correct Directory!

**ALWAYS navigate to the project directory first:**

```powershell
# Windows PowerShell
cd E:\HamletUnified\Copy-of-Hamlet-social
```

## Step 1: Install Dependencies

```powershell
# Make sure you're in E:\HamletUnified\Copy-of-Hamlet-social
npm install
```

If you see errors, do a clean install:

```powershell
# Remove old installations
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue

# Fresh install
npm install
```

## Step 2: Add Candidate Data

Copy your cleaned candidate data to the public folder:

```powershell
# Copy the cleaned candidate file
Copy-Item -Path "E:\HamletUnified\full_consolidation\candidates\master\CLEANED_CANDIDATES_20251015_120734.csv" -Destination "E:\HamletUnified\Copy-of-Hamlet-social\public\candidates.csv" -Force

# Verify the file was copied
Test-Path "E:\HamletUnified\Copy-of-Hamlet-social\public\candidates.csv"
```

You should see `True` if the file was copied successfully.

## Step 3: Start Development Server

```powershell
npm run dev
```

You should see:

```
VITE v6.3.6  ready in XXX ms

➜  Local:   http://localhost:3000/
```

## Step 4: View in Browser

Open your web browser and go to:
- http://localhost:3000/

You should see the Hamlet Social platform.

## Step 5: Access Candidate Browser

The candidate browser component is now available. To integrate it into your app:

### Option A: Direct Component Usage

Import and use anywhere in your app:

```typescript
import HamletCandidateBrowser from './components/HamletCandidateBrowser';

// In your component:
<HamletCandidateBrowser />
```

### Option B: Add to Election Routes

Update `components/views/ElectionManagementView.tsx` to include a candidates route.

## Troubleshooting

### Error: "vite not recognized"

**Cause:** You're in the wrong directory!

**Solution:**
```powershell
cd E:\HamletUnified\Copy-of-Hamlet-social
npm run dev
```

### Error: "Cannot find module"

**Solution:**
```powershell
npm install
```

### Error: "Failed to load candidates data"

**Cause:** The candidates.csv file is not in the public folder.

**Solution:**
```powershell
Copy-Item -Path "E:\HamletUnified\full_consolidation\candidates\master\CLEANED_CANDIDATES_20251015_120734.csv" -Destination "E:\HamletUnified\Copy-of-Hamlet-social\public\candidates.csv" -Force
```

### Port 3000 Already in Use

**Solution:**
```powershell
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

## Building for Production

### Step 1: Install Terser (Required for Minification)

```powershell
npm install terser --save-dev
```

### Step 2: Build

```powershell
npm run build
```

This creates optimized files in the `dist/` folder.

### Step 3: Preview Production Build

```powershell
npm run preview
```

## Deploying to Vercel (Free)

### Option 1: Using Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Using Vercel Website

1. Go to https://vercel.com
2. Click "New Project"
3. Connect your GitHub repository: `absulysuly/Copy-of-Hamlet-social`
4. Configure:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click "Deploy"

## Environment Variables

If you need API keys or configuration:

1. Create `.env` file in project root:

```
VITE_API_URL=your_api_url
VITE_GOOGLE_API_KEY=your_google_api_key
```

2. Access in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Next Steps

### Phase 1: Verify Platform Works ✅
- [x] Install dependencies
- [x] Add candidate data
- [x] Start dev server
- [ ] Verify UI loads correctly
- [ ] Test candidate browser

### Phase 2: Data Quality
- [ ] Review the 17 candidates marked "NEEDS_REVIEW"
- [ ] Fix translation issues
- [ ] Validate electoral districts

### Phase 3: Features
- [ ] Add candidate photos
- [ ] Implement social media links
- [ ] Add contact information
- [ ] Build search analytics

### Phase 4: Deployment
- [ ] Test production build
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Set up monitoring

## Quick Reference Commands

```powershell
# Navigate to project
cd E:\HamletUnified\Copy-of-Hamlet-social

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Copy latest data
Copy-Item -Path "E:\HamletUnified\full_consolidation\candidates\master\CLEANED_CANDIDATES_20251015_120734.csv" -Destination "public\candidates.csv" -Force
```

## Support

If you encounter issues:

1. **Check you're in the right directory:**
   ```powershell
   pwd  # Should show: E:\HamletUnified\Copy-of-Hamlet-social
   ```

2. **Check Node.js version:**
   ```powershell
   node --version  # Should be v18 or higher
   npm --version   # Should be v9 or higher
   ```

3. **Clean install:**
   ```powershell
   Remove-Item node_modules -Recurse -Force
   Remove-Item package-lock.json -Force
   npm install
   ```

## Success Checklist

- [ ] Can run `npm run dev` without errors
- [ ] Can see http://localhost:3000/ in browser
- [ ] Candidate data loads (7,769 candidates)
- [ ] Search functionality works
- [ ] District filter works
- [ ] Production build succeeds
- [ ] Deployed to Vercel

Once all items are checked, your platform is ready! 🎉
