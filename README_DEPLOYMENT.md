# 🚀 Hamlet Platform - Deployment Guide

This guide will help you deploy your Hamlet Election Platform to the internet for free.

---

## Prerequisites

Before deploying, make sure:
- [x] `npm run build` succeeds locally
- [x] Candidate data is in `public/candidates.csv`
- [x] All 7,769 candidates load correctly
- [x] Search and filters work

---

## Option 1: Deploy to Vercel (Recommended - 5 minutes)

### Why Vercel?
- ✅ Free for personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments from GitHub
- ✅ Preview URLs for testing

### Step-by-Step Instructions

#### Part 1: Prepare Your Code

1. **Commit your changes to Git:**
   ```powershell
   cd E:\HamletUnified\Copy-of-Hamlet-social
   git add .
   git commit -m "Add candidate browser and deployment config"
   git push origin main
   ```

2. **Verify the push succeeded:**
   Go to https://github.com/absulysuly/Copy-of-Hamlet-social and check your latest commit is there.

#### Part 2: Deploy to Vercel

1. **Go to Vercel:**
   Open https://vercel.com in your browser

2. **Sign Up/Login:**
   - Click "Sign Up" (if new) or "Login"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

3. **Create New Project:**
   - Click "Add New..." → "Project"
   - Find `Copy-of-Hamlet-social` in the repository list
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   
   Leave everything else as default.

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a URL like: `https://copy-of-hamlet-social-xxx.vercel.app`

6. **Test Your Deployment:**
   - Click the URL
   - Verify candidates load
   - Test search and filters
   - Check on mobile device

### Part 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., `hamletelection.com`)

2. **Update DNS:**
   - Follow Vercel's instructions to update your domain's DNS
   - Wait for DNS propagation (can take up to 48 hours)

---

## Option 2: Deploy to Netlify (Alternative - 5 minutes)

### Why Netlify?
- ✅ Free for personal projects
- ✅ Drag-and-drop deployment
- ✅ Form handling built-in
- ✅ Automatic HTTPS

### Step-by-Step Instructions

#### Method A: Drag-and-Drop (Fastest)

1. **Build locally:**
   ```powershell
   cd E:\HamletUnified\Copy-of-Hamlet-social
   npm run build
   ```

2. **Go to Netlify:**
   Open https://www.netlify.com

3. **Sign Up/Login:**
   Continue with GitHub

4. **Deploy:**
   - Drag the `dist` folder to the drop zone
   - Wait for upload to complete
   - You get a URL like: `https://random-name-123.netlify.app`

5. **Rename Site (Optional):**
   - Click "Site settings"
   - Click "Change site name"
   - Enter: `hamlet-election` (or your preferred name)
   - New URL: `https://hamlet-election.netlify.app`

#### Method B: Connect to GitHub (Automatic Updates)

1. **In Netlify Dashboard:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select `Copy-of-Hamlet-social`

2. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

3. **Automatic Deployments:**
   - Every time you push to GitHub, Netlify rebuilds automatically
   - Get preview URLs for pull requests

---

## Option 3: GitHub Pages (Free - Static Only)

### Why GitHub Pages?
- ✅ Completely free
- ✅ Simple setup
- ✅ GitHub integration
- ❌ Limited to static sites only

### Instructions

1. **Add deployment script to package.json:**
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

2. **Install gh-pages:**
   ```powershell
   npm install --save-dev gh-pages
   ```

3. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/Copy-of-Hamlet-social/',
     plugins: [react()]
   })
   ```

4. **Deploy:**
   ```powershell
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Your site: `https://absulysuly.github.io/Copy-of-Hamlet-social/`

---

## Post-Deployment Checklist

After deploying to any platform:

### Immediate Checks
- [ ] Site loads without errors
- [ ] All 7,769 candidates display
- [ ] Search functionality works
- [ ] District filter works
- [ ] Mobile view is responsive
- [ ] Arabic text displays correctly (RTL)

### Performance Checks
- [ ] Page loads in < 3 seconds
- [ ] No console errors in browser
- [ ] Images load correctly
- [ ] No broken links

### SEO & Sharing
- [ ] Add meta tags for social sharing
- [ ] Add favicon
- [ ] Add robots.txt
- [ ] Add sitemap.xml (for search engines)

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. **Get tracking ID:**
   - Go to https://analytics.google.com
   - Create a property
   - Get your tracking ID (e.g., `G-XXXXXXXXXX`)

2. **Add to index.html:**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Add Vercel Analytics (Easiest)

If using Vercel:
- Go to your project dashboard
- Click "Analytics" tab
- Click "Enable"
- Free tier includes basic analytics

---

## Updating Your Deployed Site

### Automatic Updates (Vercel/Netlify with GitHub)

1. Make changes locally
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Update candidate data"
   git push origin main
   ```
3. Deployment happens automatically!

### Manual Updates (Netlify Drag-and-Drop)

1. Build locally:
   ```powershell
   npm run build
   ```
2. Go to Netlify dashboard
3. Drag new `dist` folder to the deploy zone

---

## Custom Domain Setup

### Buy a Domain (Optional)

Recommended registrars:
- **Namecheap:** $8-15/year for `.com`
- **Google Domains:** $12/year
- **GoDaddy:** $10-20/year

### Configure Domain

#### For Vercel:
1. Add domain in Vercel dashboard
2. Update DNS with these records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### For Netlify:
1. Add domain in Netlify dashboard
2. Netlify provides custom DNS servers
3. Update nameservers at your registrar

---

## Troubleshooting Deployment Issues

### Build Fails: "terser not found"

**Solution:**
```powershell
npm install terser --save-dev
git add package.json package-lock.json
git commit -m "Add terser dependency"
git push
```

### Build Fails: "Module not found"

**Solution:**
```powershell
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Site Loads But No Candidates

**Cause:** `public/candidates.csv` not included in deployment

**Solution:**
```powershell
# Verify file exists locally
ls public/candidates.csv

# If missing, copy it
Copy-Item -Path "E:\HamletUnified\full_consolidation\candidates\master\CLEANED_CANDIDATES_20251015_120734.csv" -Destination "public\candidates.csv" -Force

# Commit and push
git add public/candidates.csv
git commit -m "Add candidate data"
git push
```

### "413 Request Entity Too Large"

**Cause:** CSV file too large (> 10MB)

**Solution:**
1. Compress the CSV
2. OR split into multiple files
3. OR use a database instead of CSV

### Arabic Text Displays as ????

**Cause:** Missing UTF-8 encoding

**Solution:** Add to `index.html`:
```html
<meta charset="UTF-8">
```

---

## Performance Optimization

### Before Deploying

1. **Optimize Images:**
   ```powershell
   # If you have candidate photos
   npm install --save-dev vite-imagetools
   ```

2. **Enable Code Splitting:**
   Already done by Vite - nothing to do!

3. **Compress Assets:**
   Automatic with Vercel/Netlify

### After Deploying

1. **Check Lighthouse Score:**
   - Open site in Chrome
   - Press F12 → Lighthouse tab
   - Run audit
   - Target: > 90 score

2. **Monitor Load Time:**
   - Use https://pagespeed.web.dev
   - Enter your URL
   - Fix any issues flagged

---

## Security Best Practices

### Before Going Live

- [x] Use HTTPS (automatic with Vercel/Netlify)
- [ ] Add Content Security Policy
- [ ] Add privacy policy page
- [ ] Add terms of service
- [ ] Review data permissions
- [ ] Set up security headers

### Ongoing

- [ ] Update dependencies monthly
- [ ] Monitor for vulnerabilities
- [ ] Back up data regularly
- [ ] Review access logs

---

## Cost Estimates

### Completely Free Option
- **Hosting:** Vercel/Netlify (free tier)
- **Domain:** Use provided subdomain
- **SSL:** Included free
- **Total:** $0/month

### Professional Option
- **Hosting:** Vercel Pro ($20/month)
- **Domain:** $10-15/year
- **Email:** Google Workspace ($6/user/month)
- **Total:** ~$25/month

---

## Next Steps After Deployment

1. **Share with Candidates:**
   - Create outreach email campaign
   - Include your live URL
   - Explain the platform benefits

2. **Collect Feedback:**
   - Ask 10 candidates to test
   - Note pain points
   - Iterate on design

3. **Add Features:**
   - Candidate photos
   - Social media links
   - Contact forms
   - Email verification

4. **Scale:**
   - Increase outreach
   - Add more candidates
   - Expand to other districts

---

## Support

### Deployment Help
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages:** https://pages.github.com

### Community
- **Stack Overflow:** Tag `vite`, `react`, `deployment`
- **GitHub Issues:** For code-specific problems
- **Vercel Discord:** Real-time help

---

## Success Criteria

Your deployment is successful when:
- ✅ Live URL accessible from anywhere
- ✅ All 7,769 candidates load
- ✅ Page loads in < 3 seconds
- ✅ Mobile responsive
- ✅ No console errors
- ✅ HTTPS enabled
- ✅ Custom domain configured (optional)
- ✅ Analytics tracking (optional)

**You're ready to launch! 🚀**

Once deployed, share your URL:
```
🗳️ Hamlet Iraqi Election Platform
Live at: https://your-site.vercel.app
7,769 candidates | Free & Open Platform
```
