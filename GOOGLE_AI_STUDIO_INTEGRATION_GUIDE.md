# 🤖 GOOGLE AI STUDIO INTEGRATION GUIDE

**Your AI Studio Link:** https://aistudio.google.com/apps/drive/13VWxOWc2ZY9TP0XfkNcLJbZsnZys0na_

**Current Status:** Ready to integrate with your Iraqi Election Platform

---

## 🎯 WHAT TO DO NOW

### **STEP 1: Prepare Your Requirements for AI Studio**

Open your Google AI Studio project and provide these documents:

1. **Upload These Files to AI Studio:**
   ```
   ✅ DEPLOYMENT_READINESS_ANALYSIS.md (code assessment)
   ✅ GOOGLE_AI_STUDIO_REQUIREMENTS.md (backend specs)
   ✅ DATABASE_API_STATUS.md (current status)
   ✅ services/apiService.ts (API contract examples)
   ✅ lib/types.ts (TypeScript types)
   ```

2. **Or Copy-Paste This Summary:**

---

## 📋 SUMMARY FOR AI STUDIO (COPY THIS)

```
PROJECT: Iraqi Election Platform Backend Development

FRONTEND STATUS: 
✅ 139 TypeScript React components (complete)
✅ Next.js 14 with App Router
✅ Beautiful glassmorphism UI
✅ Multi-language support (AR, EN, KU)
✅ 95% production-ready

BACKEND STATUS:
❌ 0% - Need complete backend

I NEED YOU TO BUILD:

===========================================
PRIORITY 1: EXPRESS.JS BACKEND
===========================================

Technology Stack:
- Node.js + Express.js + TypeScript
- PostgreSQL database
- JWT authentication
- Cloudinary file storage
- Google Gemini API integration

Critical Endpoints (15 total):

1. AUTH (5 endpoints):
   POST /api/auth/register
   POST /api/auth/login
   POST /api/auth/social/google
   GET  /api/auth/verify-email/:token
   POST /api/auth/refresh-token

2. USERS (3 endpoints):
   GET  /api/users (with filters)
   GET  /api/users/:id
   PATCH /api/users/:id

3. POSTS (3 endpoints):
   GET  /api/posts (with filters)
   POST /api/posts
   POST /api/posts/:id/like

4. CANDIDATES (2 endpoints):
   GET  /api/candidates (paginated)
   GET  /api/candidates/:id

5. AI & UTILITIES (2 endpoints):
   POST /api/gemini (AI proxy - CRITICAL)
   POST /api/upload (file uploads)

===========================================
DATABASE SCHEMA
===========================================

PostgreSQL tables needed:

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'voter' or 'candidate'
  governorate VARCHAR(100),
  party VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255),
  governorate VARCHAR(100),
  ballot_number INTEGER,
  gender VARCHAR(20),
  image_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'Post', -- 'Post' or 'Reel'
  media_url VARCHAR(500),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governorates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  name_ku VARCHAR(100) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, post_id)
);

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, following_id)
);

CREATE TABLE tea_house_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  language VARCHAR(10) NOT NULL,
  category VARCHAR(100),
  participants_count INTEGER DEFAULT 0,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_candidates_governorate ON candidates(governorate);
CREATE INDEX idx_likes_user_post ON likes(user_id, post_id);

===========================================
SEED DATA
===========================================

INSERT 18 Iraqi governorates:
Baghdad, Basra, Mosul, Erbil, Sulaymaniyah, Kirkuk, Dohuk, 
Anbar, Saladin, Diyala, Wasit, Maysan, Dhi Qar, Najaf, 
Karbala, Babil, Muthanna, Qadisiyyah

===========================================
ENVIRONMENT VARIABLES
===========================================

DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your_random_secret_here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=another_random_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=4001
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app

===========================================
DEPLOYMENT TARGET
===========================================

Deploy to Railway:
- Auto-deploy from GitHub
- PostgreSQL addon
- Environment variables configured
- Health check: GET /api/health
- Expected URL: https://iraq-election-backend-production.up.railway.app

===========================================
DELIVERABLES NEEDED
===========================================

1. Complete Express.js server code
2. Database migration files
3. Seed data scripts
4. .env.example file
5. package.json with all dependencies
6. README.md with setup instructions
7. Dockerfile for deployment
8. API documentation (Swagger/OpenAPI)

===========================================
CRITICAL: GEMINI API PROXY
===========================================

The frontend CANNOT call Gemini API directly (security risk).
Need server-side proxy:

POST /api/gemini
Request: { "prompt": "user question" }
Response: { "text": "AI answer" }

Implementation:
- Rate limit: 10 requests/minute per IP
- Input validation
- Error handling with fallback responses
- Secure API key storage (server-side only)

===========================================
AUTHENTICATION REQUIREMENTS
===========================================

- JWT-based auth
- bcrypt password hashing (10 rounds)
- Email verification flow
- Social login (Google, Facebook OAuth)
- Protected routes with middleware
- Refresh token mechanism

===========================================
FILE UPLOAD REQUIREMENTS
===========================================

Support:
- Images: JPG, PNG, GIF (max 10MB)
- Videos: MP4, MOV (max 50MB)
- Audio: MP3, WAV (max 5MB)
- Documents: PDF (max 10MB)

Use Cloudinary for storage with:
- Image optimization
- Automatic format conversion
- CDN delivery
- Thumbnail generation

===========================================
SECURITY REQUIREMENTS
===========================================

- Helmet.js for HTTP headers
- CORS configured for frontend domain
- SQL injection prevention
- XSS protection
- Rate limiting on all endpoints
- Input validation and sanitization
- Error messages don't leak sensitive info

===========================================
TESTING REQUIREMENTS
===========================================

- Jest for unit tests
- Supertest for API tests
- Test database setup
- Minimum 70% code coverage
- CI/CD pipeline

===========================================
WHAT I ALREADY HAVE (FRONTEND)
===========================================

✅ Complete Next.js frontend
✅ All UI components built
✅ TypeScript types defined
✅ API service layer ready
✅ Beautiful glassmorphism design
✅ Multi-language support
✅ Error handling
✅ Loading states
✅ Responsive design

Frontend is waiting for backend to be ready!

PLEASE GENERATE:
- Complete backend codebase
- Database schema and migrations
- Deployment configuration
- Setup documentation

Target completion: Within 2 weeks
Budget: Free tier services preferred (Railway, PostgreSQL free tier)
```

---

## 🎯 STEP 2: What to Ask AI Studio

### **PROMPT 1: Generate Complete Backend**

In your AI Studio chat, type:

```
Based on the requirements above, please generate a complete Express.js backend 
for my Iraqi Election Platform. I need:

1. Full Express.js server with TypeScript
2. PostgreSQL database schema
3. All 15 API endpoints implemented
4. JWT authentication system
5. Gemini API proxy endpoint
6. File upload with Cloudinary
7. Complete project structure
8. Deployment configuration for Railway
9. README with setup instructions
10. package.json with all dependencies

Please generate the code files one by one, starting with:
- server.ts (main Express app)
- database.ts (PostgreSQL connection)
- schema.sql (database tables)

Then continue with routes, middleware, and services.
```

---

### **PROMPT 2: Fix Frontend Integration**

After getting the backend code:

```
I have a Next.js frontend with these services:
- services/apiService.ts (currently using mock data)
- services/geminiService.ts (currently calls API directly - insecure)

Please update my frontend code to:
1. Replace mock API calls with real fetch calls to the backend
2. Update geminiService.ts to use the /api/gemini proxy endpoint
3. Add JWT token storage and management
4. Handle authentication in API calls
5. Add error handling for network failures

Show me the updated code for:
- services/apiService.ts
- services/geminiService.ts
- lib/auth.ts (new file for auth utilities)
```

---

### **PROMPT 3: Deploy to Railway**

```
I need to deploy the backend to Railway. Please provide:

1. Step-by-step deployment instructions
2. Railway.json configuration file
3. Environment variables setup guide
4. Database migration commands
5. How to connect frontend to deployed backend
6. Troubleshooting common issues
```

---

## 📁 STEP 3: Organize AI Studio Outputs

As AI Studio generates code, organize it like this:

```
/workspace-backend/          ← Create new folder
  /src/
    /routes/
      auth.ts
      users.ts
      posts.ts
      candidates.ts
      gemini.ts
      upload.ts
    /middleware/
      auth.ts
      errorHandler.ts
      validation.ts
    /models/
      User.ts
      Post.ts
    /services/
      geminiService.ts
      emailService.ts
    /config/
      database.ts
    server.ts
    app.ts
  /prisma/
    schema.prisma
    seed.ts
  .env.example
  package.json
  tsconfig.json
  README.md
  Dockerfile
  railway.json
```

---

## 🔗 STEP 4: Connect Frontend to Backend

### **Update Your Frontend:**

1. **Set Environment Variable:**
```bash
# In your Next.js project
# Create .env.local file

NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app
```

2. **Update API Calls:**

Your current `lib/api.ts` already has this:
```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || RAILWAY_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
```

Just update `NEXT_PUBLIC_API_BASE_URL` to point to your new Railway backend!

3. **Test Connection:**
```bash
# In your frontend
npm run dev

# Should now connect to real backend
# Check browser console for API calls
```

---

## 🚀 STEP 5: Deployment Checklist

### **Backend (Railway):**
- [ ] Backend code generated by AI Studio
- [ ] PostgreSQL database created
- [ ] Environment variables set
- [ ] Database migrated
- [ ] Seed data loaded
- [ ] Health check working
- [ ] API endpoints responding

### **Frontend (Vercel):**
- [ ] Environment variable added: `NEXT_PUBLIC_API_BASE_URL`
- [ ] Build successful
- [ ] Deployed to Vercel
- [ ] API calls connecting to backend

### **Testing:**
- [ ] User registration works
- [ ] Login works
- [ ] Post creation works
- [ ] Gemini AI proxy works
- [ ] File uploads work
- [ ] All features functional

---

## 💡 TIPS FOR WORKING WITH AI STUDIO

### **1. Break Down Requests**

Instead of asking for everything at once:

```
❌ "Build me the entire backend"

✅ "First, generate the Express.js server setup with CORS and error handling"
✅ "Next, generate the PostgreSQL database schema"
✅ "Now, create the authentication routes"
✅ "Finally, create the Gemini API proxy endpoint"
```

### **2. Iterate and Refine**

If AI Studio's code doesn't work:

```
"The authentication middleware is throwing errors. Here's the error message: 
[paste error]. Please fix it."
```

### **3. Ask for Explanations**

```
"Explain how the JWT authentication flow works in this code"
"Why did you structure the routes this way?"
"What are the security implications of this approach?"
```

### **4. Request Documentation**

```
"Generate API documentation in Swagger/OpenAPI format"
"Create a comprehensive README with setup instructions"
"Add code comments explaining complex logic"
```

---

## 🔧 TROUBLESHOOTING

### **Problem: AI Studio Code Doesn't Run**

**Solution:**
1. Copy error message
2. Ask AI Studio: "This code gives error: [paste error]. Please fix."
3. Share the full error stack trace

### **Problem: Database Connection Fails**

**Solution:**
1. Check `DATABASE_URL` format
2. Verify PostgreSQL is running on Railway
3. Check firewall/network settings
4. Test connection with: `psql $DATABASE_URL`

### **Problem: Frontend Can't Connect to Backend**

**Solution:**
1. Check CORS settings in backend
2. Verify `NEXT_PUBLIC_API_BASE_URL` is correct
3. Check Railway backend logs
4. Test API with: `curl https://your-backend.railway.app/api/health`

### **Problem: Gemini API Not Working**

**Solution:**
1. Verify `GEMINI_API_KEY` is set in Railway
2. Check API quota in Google Cloud Console
3. Test endpoint with: `curl -X POST backend.com/api/gemini -d '{"prompt":"test"}'`

---

## 📊 PROGRESS TRACKING

Use this checklist as you work with AI Studio:

### **Week 1: Backend Foundation**
- [ ] Day 1: Express server setup
- [ ] Day 2: Database schema and migrations
- [ ] Day 3: User and auth routes
- [ ] Day 4: Posts and candidates routes
- [ ] Day 5: Gemini proxy and upload routes
- [ ] Day 6-7: Testing and fixes

### **Week 2: Integration & Deploy**
- [ ] Day 1: Frontend updates
- [ ] Day 2: Deploy backend to Railway
- [ ] Day 3: Deploy frontend to Vercel
- [ ] Day 4: End-to-end testing
- [ ] Day 5: Bug fixes
- [ ] Day 6-7: Performance optimization

---

## 🎯 SUCCESS METRICS

You'll know it's working when:

✅ **Backend Health Check:** `curl https://your-backend.railway.app/api/health` returns 200
✅ **User Registration:** Can create account via frontend
✅ **Login:** Can login and receive JWT token
✅ **Posts:** Can create and view posts
✅ **AI Feature:** "Ask a Neighbor" returns AI-generated answers
✅ **Candidates:** Can browse 7,769 candidates
✅ **Uploads:** Can upload profile pictures

---

## 📞 NEXT STEPS

1. **Open your AI Studio link** ↗️
2. **Copy the requirements** (from above)
3. **Start with PROMPT 1** (Generate Complete Backend)
4. **Follow prompts 2-3** as code is generated
5. **Test each component** as it's built
6. **Deploy when ready**

---

## 💬 NEED HELP?

If you get stuck:

1. **Share AI Studio's code** - I can review it
2. **Share error messages** - I can debug
3. **Ask specific questions** - I can guide you
4. **Test incrementally** - Don't build everything at once

---

**Your frontend is ready and waiting! 🎨**  
**Now let AI Studio build the backend! 🚀**

---

*Guide prepared for Google AI Studio integration with Iraqi Election Platform*
