# 🚀 Hamlet Platform - Quick Start Guide

## For Non-Technical Users

### Step 1: Open PowerShell in the Right Place

1. Open File Explorer
2. Navigate to: `E:\HamletUnified\Copy-of-Hamlet-social`
3. In the address bar, type `powershell` and press Enter
4. A blue PowerShell window will open

### Step 2: Run the Automatic Fix Script

Copy and paste this command:

```powershell
.\FIX_EVERYTHING.ps1
```

Press Enter.

### Step 3: Wait for Setup to Complete

The script will:
- ✅ Install all required software packages
- ✅ Copy your candidate data
- ✅ Fix any errors
- ✅ Test that everything works

This takes about 2-5 minutes.

### Step 4: Start the Platform

When prompted "Would you like to start the dev server now? (Y/N)", type `Y` and press Enter.

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

You should see your Hamlet Election Platform! 🎉

## If Something Goes Wrong

### Error: "Cannot be loaded because running scripts is disabled"

Run this command first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then try `.\FIX_EVERYTHING.ps1` again.

### Error: "vite is not recognized"

You're in the wrong folder! Make sure you're in:
```
E:\HamletUnified\Copy-of-Hamlet-social
```

### Can't See Candidates

Make sure this file exists:
```
E:\HamletUnified\Copy-of-Hamlet-social\public\candidates.csv
```

If not, copy it manually:
```powershell
Copy-Item -Path "E:\HamletUnified\full_consolidation\candidates\master\CLEANED_CANDIDATES_20251015_120734.csv" -Destination "public\candidates.csv" -Force
```

### Port 3000 Already in Use

Kill the process and try again:
```powershell
npx kill-port 3000
npm run dev
```

## What You Have Now

- ✅ Working development environment
- ✅ 7,769 Iraqi election candidates loaded
- ✅ Search and filter functionality
- ✅ Ready to deploy to the internet

## Next: Deploy to the Internet (Free)

### Using Vercel (Easiest)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your repository: `Copy-of-Hamlet-social`
5. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

In 2 minutes, you'll have a live URL like:
```
https://hamlet-platform.vercel.app
```

Share this URL with candidates to show them the platform!

## Getting Help

If you're stuck:

1. **Check the directory:**
   ```powershell
   pwd
   ```
   Should show: `E:\HamletUnified\Copy-of-Hamlet-social`

2. **Check Node.js is installed:**
   ```powershell
   node --version
   ```
   Should show: `v22.19.0` or similar

3. **Clean restart:**
   ```powershell
   .\FIX_EVERYTHING.ps1
   ```

## Success Indicators

You know it's working when:
- ✅ Browser shows "Hamlet Election Platform"
- ✅ You see "7,769 candidates" or similar
- ✅ Search box works
- ✅ Candidate cards display

## Daily Workflow

To work on the platform each day:

1. Open PowerShell in project folder
2. Run: `npm run dev`
3. Open: http://localhost:3000
4. Make changes
5. Press Ctrl+C when done

That's it! 🎯
