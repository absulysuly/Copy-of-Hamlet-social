# ?? DEPLOYMENT GUIDE - Iraq Election Platform

## ?? Summary

You have **3 deployments** but none are fully functional. This guide will help you create a **working unified platform**.

### Current Status

| Deployment | Type | Status | Action |
|-----------|------|--------|--------|
| deadlinesco-img-election-iraq | Backend | ?? Database errors | **FIX THIS** |
| hamlet-unified-complete-2027 | Frontend | ? Broken (0 bytes) | **REDEPLOY** |
| iraq-election-backend | Backend | ?? Incomplete | Ignore (use deadlinesco instead) |

---

## ?? RECOMMENDED SOLUTION

### Use This Architecture:

```
Frontend (New Deploy)  ?  DEADLINESCO Backend (Fixed)
    ?                            ?
Next.js 14              PostgreSQL Database
```

---

## ?? STEP 1: Fix DEADLINESCO Backend

This backend is already deployed and has ALL endpoints. We just need to fix the database.

### A. Check Railway Dashboard

1. Go to: https://railway.app/dashboard
2. Find project: `deadlinesco-img-election-iraq-production`
3. Click on it

### B. Verify Database Connection

1. Click **Variables** tab
2. Look for `DATABASE_URL`
3. It should look like:
   ```
   postgresql://postgres:PASSWORD@HOST:5432/railway
   ```

### C. If DATABASE_URL is Missing or Wrong

1. Click **+ New Variable**
2. Add:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```
3. Click **Deploy** to restart

### D. Run Database Migration

In Railway terminal or locally:

```bash
# If you have the code locally
cd /path/to/DEADLINESCO-IMG-ELECTION-IRAQ/backend
npm install
npx prisma migrate deploy
npx prisma generate
```

### E. Seed Database (Optional but Recommended)

Check if you have candidate data:

```bash
# If you have candidates.json file
node scripts/seed-candidates.js
```

Or manually import via Railway database tab.

### F. Test the API

```bash
# Should return candidate data now
curl https://deadlinesco-img-election-iraq-production.up.railway.app/api/candidates

# Should return stats
curl https://deadlinesco-img-election-iraq-production.up.railway.app/api/stats
```

---

## ?? STEP 2: Redeploy Frontend

The frontend deployment is completely broken (0 bytes). We need to redeploy.

### A. Use GitHub Repository

Repository: `https://github.com/absulysuly/DigitalDemocracy.Iraq`

### B. Deploy to Railway

#### Option 1: Through Railway Dashboard

1. Go to Railway dashboard
2. **New Project** ? **Deploy from GitHub repo**
3. Select: `absulysuly/DigitalDemocracy.Iraq`
4. Railway will auto-detect Next.js

#### Option 2: Delete and Recreate

1. Delete current broken deployment: `hamlet-unified-complete-2027`
2. Create new project from GitHub
3. Connect `DigitalDemocracy.Iraq` repo

### C. Set Environment Variables

In Railway Variables tab:

```bash
NEXT_PUBLIC_API_BASE_URL=https://deadlinesco-img-election-iraq-production.up.railway.app
```

### D. Verify Build Settings

Railway should auto-detect:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Install Command**: `npm install`

If not, set them manually.

### E. Deploy

Click **Deploy** button. Wait 2-3 minutes for build.

### F. Test Frontend

Once deployed, visit your frontend URL:
```
https://your-new-frontend.up.railway.app
```

Should see the election platform homepage!

---

## ?? ALTERNATIVE: Deploy New Unified Backend

If fixing DEADLINESCO is too difficult, deploy the new unified backend I created.

### Deploy from `/workspace/unified-backend/`

#### On Railway:

1. Create new project
2. Add PostgreSQL database (Railway will auto-create `DATABASE_URL`)
3. Deploy from local folder or push to GitHub first
4. Set variables:
   ```bash
   NODE_ENV=production
   ALLOWED_ORIGINS=*
   ```
5. Deploy!

#### File Structure to Deploy:

```
unified-backend/
??? server.js          # Main server (already created)
??? package.json       # Dependencies (already created)
??? prisma/
?   ??? schema.prisma  # Database schema (already created)
??? .env.example       # Environment template (already created)
??? README.md          # Documentation (already created)
```

---

## ?? STEP 3: Connect Frontend to Backend

### Update Frontend API Configuration

In your frontend repository (`DigitalDemocracy.Iraq`):

**File**: `lib/api.ts`

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCandidates = async (params) => {
  const { data } = await api.get('/api/candidates', { params });
  
  // Backend returns: { data: [...], total, page, limit }
  // Frontend expects: { data: [...], total, page, limit }
  // Already compatible! ?
  return data;
};

export const fetchCandidateById = async (id) => {
  const { data } = await api.get(`/api/candidates/${id}`);
  return data.success ? data.data : data;
};

export const fetchGovernorates = async () => {
  const { data } = await api.get('/api/governorates');
  return data;
};

export const fetchStats = async () => {
  const { data } = await api.get('/api/stats');
  return data;
};
```

No changes needed if using unified backend! Already compatible.

---

## ? VERIFICATION CHECKLIST

### Backend Verification

Visit: `https://deadlinesco-img-election-iraq-production.up.railway.app`

- [ ] Root endpoint returns JSON with status "online"
- [ ] `/health` returns `{"status": "ok"}`
- [ ] `/api/candidates` returns array of candidates
- [ ] `/api/stats` returns statistics object
- [ ] `/api/governorates` returns array of governorates

### Frontend Verification

Visit your frontend URL:

- [ ] Homepage loads correctly
- [ ] Can navigate to `/en/candidates`
- [ ] Candidates list displays
- [ ] Filtering works (by governorate, gender)
- [ ] Pagination works
- [ ] Can click on candidate to see profile
- [ ] Statistics page shows data
- [ ] Language switcher works (EN/AR/KU)

---

## ?? TROUBLESHOOTING

### Backend: "Server error" on all endpoints

**Problem**: Database is empty or connection failed

**Solution**:
```bash
# Check DATABASE_URL format
postgresql://user:password@host:5432/database

# Run migrations
npx prisma migrate deploy

# Seed data
node scripts/seed-candidates.js
```

### Frontend: Build fails

**Problem**: Dependencies or configuration issue

**Solution**:
```bash
# Locally test build
cd DigitalDemocracy.Iraq
npm install
npm run build

# If it works locally, deploy again
```

### Frontend: API calls fail (CORS error)

**Problem**: Backend CORS not allowing frontend origin

**Solution**:
Add to backend environment variables:
```bash
ALLOWED_ORIGINS=https://your-frontend.up.railway.app,*
```

### Frontend: Empty page (0 bytes)

**Problem**: Build failed or wrong start command

**Solution**:
- Check Railway build logs
- Verify start command is `npm start` (not `npm run dev`)
- Ensure `npm run build` completes successfully

---

## ?? EXPECTED RESULTS

### After Successful Deployment:

#### Backend Response Example:

```bash
$ curl https://deadlinesco-img-election-iraq-production.up.railway.app/api/candidates?limit=2

{
  "data": [
    {
      "id": "clx123abc",
      "name": "Ahmed Al-Maliki",
      "gender": "Male",
      "governorate": "Baghdad",
      "party": "Future Alliance",
      "ballot_number": 1234,
      "photo": "https://...",
      "views": 150,
      "supporters": 45
    },
    {
      "id": "clx456def",
      "name": "Fatima Hassan",
      "gender": "Female",
      "governorate": "Basra",
      "party": "Democratic Coalition",
      "ballot_number": 5678,
      "photo": "https://...",
      "views": 230,
      "supporters": 89
    }
  ],
  "total": 7769,
  "page": 1,
  "limit": 2,
  "pages": 3885
}
```

#### Frontend Should Display:

- ?? Homepage with featured candidates
- ?? Candidates page with filters
- ?? Search functionality
- ?? Statistics dashboard
- ?? Individual candidate profiles
- ?? Language selection (EN/AR/KU)

---

## ?? QUICK WIN PATH (Fastest Solution)

If you want the fastest path to working platform:

### 1. Fix DEADLINESCO Backend (5 minutes)
   - Check DATABASE_URL in Railway
   - Run `npx prisma migrate deploy`
   - Test `/api/candidates` endpoint

### 2. Redeploy Frontend (10 minutes)
   - Delete broken deployment
   - Create new Railway project
   - Connect GitHub repo: `DigitalDemocracy.Iraq`
   - Set `NEXT_PUBLIC_API_BASE_URL` variable
   - Deploy!

### 3. Test (2 minutes)
   - Visit frontend URL
   - Browse candidates
   - Verify data loads

**Total Time: ~20 minutes to working platform! ??**

---

## ?? NEED HELP?

### Check Logs

**Backend logs** (Railway):
```
Project ? Deployments ? View Logs
```

**Frontend build logs**:
```
Project ? Deployments ? Build Logs
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot connect to database" | Check DATABASE_URL format and credentials |
| "CORS error" | Add frontend URL to ALLOWED_ORIGINS |
| "404 Not Found" | Verify API endpoint paths match frontend calls |
| "Build failed" | Check package.json scripts and dependencies |

---

## ?? SUCCESS METRICS

Platform is working when:

? Backend returns candidate data  
? Frontend loads and displays UI  
? Filters and search work  
? Individual candidate pages load  
? Statistics display correctly  
? All 3 languages work (EN/AR/KU)  

---

**You're almost there! The backend code is complete, database schema is ready, frontend is built. Just need to connect the pieces! ??**
