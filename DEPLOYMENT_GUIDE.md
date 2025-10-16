# 🚀 Smart Campaign - Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. **Environment Setup** (CRITICAL!)
- [ ] `.env` file exists in root directory
- [ ] `VITE_API_KEY` is set with your Google Gemini API key
- [ ] All other environment variables are configured

### 2. **Run Verification Script**
```bash
npm run deploy:check
```
This will automatically verify:
- ✓ Configuration files
- ✓ Dependencies
- ✓ Build process
- ✓ No critical errors

### 3. **Test Locally First**
```bash
# Build the production version
npm run build

# Preview the production build locally
npm run preview
```
Then test on: http://localhost:4173

---

## 🌐 Deployment Platforms

### **Option A: Vercel (Recommended)**

1. **Install Vercel CLI** (if not already):
```bash
npm i -g vercel
```

2. **Set Environment Variables**:
```bash
vercel env add VITE_API_KEY
# Paste your API key when prompted
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Configure**:
   - `vercel.json` is already configured ✓
   - Ensure build command: `npm run build`
   - Ensure output directory: `dist`

### **Option B: Netlify**

1. **Install Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Deploy**:
```bash
netlify deploy --prod
```

3. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - `_redirects` file is already in `public/` folder ✓

4. **Add Environment Variables** (in Netlify Dashboard):
   - Go to Site settings → Environment variables
   - Add: `VITE_API_KEY` = [your key]

### **Option C: GitHub Pages**

1. **Update workflow** (`.github/workflows/deploy.yml`):
   - Already configured ✓
   
2. **Add Secrets**:
   - Go to GitHub repo → Settings → Secrets
   - Add: `VITE_API_KEY` = [your key]

3. **Push to main branch** - auto deploys

---

## 📱 Mobile Device Testing

### Test on MULTIPLE devices:
- ✓ iPhone (iOS 12+)
- ✓ Android phones (Android 8+)
- ✓ Tablets
- ✓ Different browsers: Chrome, Safari, Firefox

### Quick Mobile Test URLs:
1. **BrowserStack** - https://www.browserstack.com/live
2. **LambdaTest** - https://www.lambdatest.com/

---

## 🔧 Common Issues & Solutions

### Issue 1: "Site loads but shows blank page"
**Solution:**
- Check browser console for errors
- Verify environment variables are set on hosting platform
- Ensure `vercel.json` or `_redirects` is deployed

### Issue 2: "Site works on desktop but not mobile"
**Solution:**
- Already fixed with:
  - ✓ Mobile-optimized meta tags
  - ✓ Responsive design
  - ✓ Touch-friendly UI

### Issue 3: "Build succeeds but site doesn't work"
**Solution:**
- Run `npm run deploy:check` first
- Test with `npm run preview` locally
- Check hosting platform logs

### Issue 4: "API calls fail"
**Solution:**
- Verify `VITE_API_KEY` is set on hosting platform
- Check API key is valid in Google AI Studio
- Ensure CORS is properly configured

---

## 🎯 Post-Deployment Verification

After deploying, check:

1. **Load Test**:
   - [ ] Site loads in < 3 seconds
   - [ ] No console errors
   - [ ] Loading spinner appears then disappears

2. **Functionality Test**:
   - [ ] Can navigate between pages
   - [ ] Images load properly
   - [ ] Forms work
   - [ ] API calls succeed

3. **Mobile Test**:
   - [ ] Site is responsive
   - [ ] Touch interactions work
   - [ ] Text is readable (not too small)

4. **RTL/Arabic Test**:
   - [ ] Arabic text displays correctly
   - [ ] Layout is right-to-left
   - [ ] Fonts load properly

---

## 🆘 Emergency Recovery

If site fails after deployment:

### Quick Rollback:
**Vercel:**
```bash
vercel rollback
```

**Netlify:**
- Dashboard → Deploys → Click previous deploy → Publish

### Re-deploy from scratch:
```bash
# 1. Clean everything
rm -rf node_modules dist

# 2. Fresh install
npm ci

# 3. Verify
npm run deploy:check

# 4. Build
npm run build

# 5. Deploy
vercel --prod  # or netlify deploy --prod
```

---

## 📞 Support Checklist

Before asking for help, have ready:
1. [ ] Deployment URL
2. [ ] Browser console errors (screenshot)
3. [ ] Device/browser being used
4. [ ] Result of `npm run deploy:check`
5. [ ] Hosting platform logs

---

## ✨ Final Pre-Launch Checklist

- [ ] Run `npm run deploy:check` ✓
- [ ] Test locally with `npm run preview` ✓
- [ ] Environment variables set on hosting ✓
- [ ] Test on 3+ different mobile devices ✓
- [ ] Site loads in < 3 seconds ✓
- [ ] All features work (posts, candidates, etc) ✓
- [ ] Arabic/RTL displays correctly ✓
- [ ] Error handling works (try breaking it!) ✓

**If all ✓ then you're READY TO LAUNCH! 🎉**
