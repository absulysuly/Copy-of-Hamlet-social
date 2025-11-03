# ?? IRAQI ELECTION PLATFORM - FILES FOR CLAUDE

## ?? WHAT'S INCLUDED

1. **frontend-api.ts** - Frontend API service (connect to Railway backend)
2. **Backend code** - Located in `/workspace/iraq-election-masterpiece/`

---

## ?? FILE 1: Frontend API Service

**File**: `frontend-api.ts`

**What to do with it**:
1. Copy to your frontend project as `lib/api.ts`
2. Use in React components:
   ```typescript
   import { fetchCandidates, fetchStats } from '@/lib/api';
   
   const candidates = await fetchCandidates({ page: 1, limit: 50 });
   const stats = await fetchStats();
   ```

**Environment Variable Needed**:
```bash
# In Vercel dashboard, add this:
NEXT_PUBLIC_API_BASE_URL=https://your-railway-api-url.up.railway.app
```

---

## ??? FILE 2: Backend for Railway

**Location**: `/workspace/iraq-election-masterpiece/`

**Contains**:
- `src/server.js` - Main API (700+ lines)
- `prisma/schema.prisma` - Database schema
- `prisma/seed.js` - Data seeding (7,769 candidates)
- `package.json` - Dependencies
- `railway.json` - Deployment config

**How to Deploy**:

### Option A: Via GitHub
```bash
cd /workspace/iraq-election-masterpiece
git init
git add .
git commit -m "Iraqi Election Backend"
git remote add origin https://github.com/YOUR-USERNAME/iraq-election-backend.git
git push -u origin main
```

Then in Railway:
1. New Project ? Deploy from GitHub
2. Select repo
3. Link Postgres database
4. Deploy!

### Option B: Via Railway CLI
```bash
cd /workspace/iraq-election-masterpiece
railway login
railway up
railway run npm run db:seed:full
```

---

## ?? BACKEND API ENDPOINTS

Once deployed, your API will have:

```
GET  /                          - API info
GET  /health                    - Health check
GET  /api/candidates            - List candidates (paginated)
GET  /api/candidates/:id        - Single candidate
GET  /api/candidates/search     - Search
GET  /api/governorates          - All 18 Iraqi governorates
GET  /api/parties               - Political parties
GET  /api/stats                 - Statistics
GET  /api/trending              - Trending candidates
POST /api/candidates            - Create candidate
```

---

## ?? DATABASE

Your PostgreSQL database on Railway:
```
postgresql://postgres:ULbaXjTrdDBavxJnNScVSQkLmhqOonMc@crossover.proxy.rlwy.net:42786/railway
```

After seeding, it will contain:
- ? 7,769 Iraqi candidates
- ? 18 governorates
- ? 16 political parties
- ? Real names (Arabic + English)
- ? Realistic distribution

---

## ?? DEPLOYMENT FLOW

```
1. Deploy Backend to Railway
   ?
2. Get Railway URL (e.g., https://xyz.up.railway.app)
   ?
3. Set NEXT_PUBLIC_API_BASE_URL in Vercel
   ?
4. Redeploy Frontend
   ?
5. DONE! Frontend connects to Backend
```

---

## ? WHAT CLAUDE NEEDS TO KNOW

**Tell Claude**:
> "I have an Iraqi election platform. The frontend is on Vercel, I have a Postgres database on Railway. I need to deploy the backend API and connect everything. Here are the files."

**Then share**:
1. This INSTRUCTIONS.md file
2. The frontend-api.ts file
3. The backend is in `/workspace/iraq-election-masterpiece/`

**Backend database connection**:
```
postgresql://postgres:ULbaXjTrdDBavxJnNScVSQkLmhqOonMc@crossover.proxy.rlwy.net:42786/railway
```

**Frontend URL**:
```
https://test-new-frontend.vercel.app
```

---

## ?? QUICK START

**For Claude to deploy backend**:
```bash
cd /workspace/iraq-election-masterpiece
railway login
railway link  # Select project with Postgres
railway up
railway run npm run db:seed:full
```

**Get Railway URL**:
```bash
railway status
```

**Update Vercel**:
Go to Vercel ? Settings ? Environment Variables ? Add:
```
NEXT_PUBLIC_API_BASE_URL=<railway-url>
```

**That's it!** ??

---

## ?? BACKEND FILES STRUCTURE

```
iraq-election-masterpiece/
??? src/
?   ??? server.js           # Main API (700+ lines)
??? prisma/
?   ??? schema.prisma       # Database schema
?   ??? seed.js             # Seeding script
??? package.json            # Dependencies
??? railway.json            # Railway config
??? Dockerfile              # Docker support
??? README.md               # Full documentation
```

---

## ?? ENVIRONMENT VARIABLES

**Backend needs**:
```
DATABASE_URL=postgresql://...  (Auto from Railway)
NODE_ENV=production
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

**Frontend needs**:
```
NEXT_PUBLIC_API_BASE_URL=https://your-railway-url.up.railway.app
```

---

## ? SUCCESS CHECKLIST

- [ ] Backend deployed to Railway
- [ ] Database seeded with 7,769 candidates
- [ ] Railway URL obtained
- [ ] Vercel env variable set
- [ ] Frontend redeployed
- [ ] Test: `curl <railway-url>/health`
- [ ] Test: Open frontend and see candidates

---

**STATUS**: ? All code ready, just needs deployment!

**NEXT STEP**: Deploy backend to Railway! ??
