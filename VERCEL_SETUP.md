# ?? Vercel Deployment Setup

## ? READY TO DEPLOY!

Your Iraqi Election Platform is connected to Railway backend with **7,769 candidates**!

---

## ?? DEPLOYMENT STEPS:

### 1. **Go to Vercel:**
- https://vercel.com/new

### 2. **Import Repository:**
- Repository: `absulysuly/DigitalDemocracy.Iraq`
- Branch: `main`
- Framework: `Next.js`

### 3. **Add Environment Variable:**

Click **"Add Environment Variable"**:

```
Key:   NEXT_PUBLIC_API_BASE_URL
Value: https://iraq-election-masterpiece-production.up.railway.app
```

### 4. **Deploy Settings:**
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 5. **Click "Deploy"!**

---

## ?? WHAT YOU'LL GET:

? **7,769 Iraqi Candidates** - Live data from Railway
? **18 Governorates** - Complete Iraqi provinces
? **Beautiful Glassmorphism UI** - Purple/pink/teal gradients
? **Search & Filters** - Find candidates by name, party, governorate
? **Statistics Dashboard** - Real-time election stats
? **Bilingual** - Arabic/English/Kurdish with RTL
? **Dark/Light Theme** - User preference
? **Mobile Responsive** - Works perfectly on all devices

---

## ???? RAILWAY BACKEND:

**URL:** `https://iraq-election-masterpiece-production.up.railway.app`

**API Endpoints:**
- `GET /api/candidates` - List all candidates (with pagination)
- `GET /api/candidates/:id` - Get single candidate
- `GET /api/governorates` - List governorates
- `GET /api/stats` - Election statistics
- `GET /api/health` - Backend health check

---

## ? QUICK DEPLOY (Copy-Paste to Vercel):

```
Repository: absulysuly/DigitalDemocracy.Iraq
Branch: main
Framework: Next.js
Environment Variable: NEXT_PUBLIC_API_BASE_URL=https://iraq-election-masterpiece-production.up.railway.app
```

---

## ?? AFTER DEPLOYMENT:

Your site will be live at: `https://your-project.vercel.app`

Test the backend connection by visiting:
- Homepage (should show featured candidates)
- `/en/candidates` - Full candidate list
- `/en/stats` - Statistics dashboard
- `/en/governorates` - Browse by province

---

**Ready to launch the Iraqi Election Platform!** ???????
