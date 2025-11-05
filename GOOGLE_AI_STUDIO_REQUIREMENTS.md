# 🤖 GOOGLE AI STUDIO BACKEND REQUIREMENTS

**For:** Iraqi Election Platform Backend Development  
**Frontend Status:** ✅ 95% Complete, Production-Ready  
**Backend Status:** ❌ 0% (Railway is down)

---

## 🎯 WHAT TO ASK GOOGLE AI STUDIO

Copy these 5 requests to Google AI Studio to build your complete backend:

---

## 📋 REQUEST #1: CORE BACKEND API

### **COPY THIS TO GOOGLE AI STUDIO:**

```
I have a Next.js Iraqi Election Platform with 139 components built and ready. 
I need you to build the complete Node.js/Express backend API.

REQUIREMENTS:

1. EXPRESS BACKEND with TypeScript
   - CORS enabled for Next.js frontend
   - Error handling middleware
   - Request logging
   - Rate limiting

2. POSTGRESQL DATABASE with these tables:

   users (
     id UUID PRIMARY KEY,
     email VARCHAR UNIQUE,
     password_hash VARCHAR,
     name VARCHAR,
     role VARCHAR, -- 'voter' or 'candidate'
     governorate VARCHAR,
     party VARCHAR,
     bio TEXT,
     avatar_url VARCHAR,
     verified BOOLEAN,
     email_verified BOOLEAN,
     created_at TIMESTAMP
   )

   candidates (
     id UUID PRIMARY KEY,
     name VARCHAR,
     party VARCHAR,
     governorate VARCHAR,
     ballot_number INTEGER,
     gender VARCHAR,
     image_url VARCHAR,
     verified BOOLEAN
   )

   posts (
     id UUID PRIMARY KEY,
     author_id UUID REFERENCES users(id),
     content TEXT,
     type VARCHAR, -- 'Post' or 'Reel'
     media_url VARCHAR,
     likes_count INTEGER DEFAULT 0,
     comments_count INTEGER DEFAULT 0,
     shares_count INTEGER DEFAULT 0,
     created_at TIMESTAMP
   )

   governorates (
     id UUID PRIMARY KEY,
     name_en VARCHAR,
     name_ar VARCHAR,
     name_ku VARCHAR,
     code VARCHAR
   )

3. API ENDPOINTS:

   GET  /api/health
   GET  /api/users?role=&governorate=&party=&gender=&page=&limit=&query=
   GET  /api/users/:id
   POST /api/users
   PATCH /api/users/:id

   GET  /api/candidates?page=&limit=&query=&governorate=&gender=
   GET  /api/candidates/:id

   GET  /api/posts?type=&governorate=&party=&authorId=&page=&limit=
   POST /api/posts
   
   GET  /api/governorates
   GET  /api/stats

4. SEED DATA:
   - Import 18 Iraqi governorates (Baghdad, Basra, Mosul, Erbil, etc.)
   - Create sample users (10 candidates, 5 voters)

5. PROVIDE:
   - server.ts (main Express app)
   - database.ts (PostgreSQL connection)
   - schema.sql (database schema)
   - seed.sql (initial data)
   - .env.example (environment variables)
   - README.md (setup instructions)
   - package.json (with all dependencies)

6. DEPLOYMENT:
   - Railway-ready configuration
   - Environment variables documented
   - Health check endpoint for monitoring
```

---

## 📋 REQUEST #2: GEMINI AI PROXY

### **COPY THIS TO GOOGLE AI STUDIO:**

```
I need a secure backend proxy for Google Gemini API calls.

MY FRONTEND CODE (currently insecure):
// services/geminiService.ts tries to call Gemini directly from browser
// This exposes API key! Need server-side proxy.

REQUIREMENTS:

1. CREATE BACKEND ENDPOINT:

   POST /api/gemini
   Request Body: { "prompt": "user's question" }
   Response: { "text": "AI generated answer" }

2. BACKEND ROUTE (in Express):

   import { GoogleGenerativeAI } from "@google/generative-ai";

   app.post('/api/gemini', async (req, res) => {
     try {
       const { prompt } = req.body;
       
       // Validate input
       if (!prompt || typeof prompt !== 'string') {
         return res.status(400).json({ error: 'Invalid prompt' });
       }

       // Rate limiting - max 10 requests per minute per IP
       // ... implement rate limiting ...

       // Call Gemini API server-side
       const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
       
       const result = await model.generateContent(prompt);
       const response = await result.response;
       const text = response.text();

       res.json({ text });
     } catch (error) {
       console.error('Gemini API error:', error);
       res.status(500).json({ 
         error: 'Failed to generate response',
         fallback: 'I apologize, but I cannot answer that right now.'
       });
     }
   });

3. UPDATE FRONTEND SERVICE:

   // services/geminiService.ts - NEW VERSION
   export const generateAnswerForNeighbor = async (
     question: string
   ): Promise<string> => {
     try {
       const response = await fetch('/api/gemini', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ prompt: question })
       });

       if (!response.ok) {
         throw new Error('API call failed');
       }

       const data = await response.json();
       return data.text;
     } catch (error) {
       return 'I apologize, but I cannot answer that right now.';
     }
   };

4. ENVIRONMENT VARIABLES:
   - GEMINI_API_KEY=your_key_here
   - RATE_LIMIT_WINDOW=60000
   - RATE_LIMIT_MAX=10

5. SECURITY:
   - Rate limiting per IP
   - Input validation and sanitization
   - API key NEVER exposed to client
   - Error messages don't leak sensitive info
```

---

## 📋 REQUEST #3: AUTHENTICATION SYSTEM

### **COPY THIS TO GOOGLE AI STUDIO:**

```
I need JWT-based authentication for my platform.

REQUIREMENTS:

1. AUTH ENDPOINTS:

   POST /api/auth/register
   Body: { name, email, password, role }
   Response: { user, token }

   POST /api/auth/login
   Body: { email, password }
   Response: { user, token }

   POST /api/auth/social/google
   Body: { idToken }
   Response: { user, token }

   POST /api/auth/social/facebook
   Body: { accessToken }
   Response: { user, token }

   GET /api/auth/verify-email/:token
   Response: { success: true }

   POST /api/auth/refresh-token
   Body: { refreshToken }
   Response: { token, refreshToken }

2. PASSWORD SECURITY:
   - Use bcrypt for hashing (10 rounds)
   - Minimum 8 characters
   - Must include: uppercase, lowercase, number

3. JWT TOKENS:
   - Access token: expires in 15 minutes
   - Refresh token: expires in 7 days
   - Sign with HS256 algorithm
   - Include: userId, role, email

4. AUTH MIDDLEWARE:

   export const requireAuth = (req, res, next) => {
     const token = req.headers.authorization?.split(' ')[1];
     
     if (!token) {
       return res.status(401).json({ error: 'No token provided' });
     }

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
     } catch (error) {
       res.status(401).json({ error: 'Invalid token' });
     }
   };

5. PROTECTED ROUTES:
   - POST /api/posts (requires auth)
   - PATCH /api/users/:id (requires auth + ownership)
   - POST /api/posts/:id/like (requires auth)
   - GET /api/users/me (requires auth)

6. SOCIAL LOGIN:
   - Google OAuth2 integration
   - Facebook OAuth integration
   - Create user if doesn't exist
   - Link social accounts to existing users

7. EMAIL VERIFICATION:
   - Send verification email on registration
   - JWT token in verification link
   - Mark user as verified in database

8. ENVIRONMENT VARIABLES:
   - JWT_SECRET=random_secret_here
   - JWT_EXPIRES_IN=15m
   - REFRESH_TOKEN_SECRET=another_secret
   - GOOGLE_CLIENT_ID=...
   - FACEBOOK_APP_ID=...
```

---

## 📋 REQUEST #4: FILE UPLOAD SYSTEM

### **COPY THIS TO GOOGLE AI STUDIO:**

```
I need file upload functionality for my platform.

USERS NEED TO UPLOAD:
- Profile pictures (JPG, PNG - max 5MB)
- Post images (JPG, PNG, GIF - max 10MB)
- Post videos (MP4, MOV - max 50MB)
- Voice notes (MP3, WAV - max 5MB)
- Documents (PDF - max 10MB)

REQUIREMENTS:

1. UPLOAD ENDPOINT:

   POST /api/upload
   Content-Type: multipart/form-data
   Body: file (binary), type (string)
   Response: { 
     url: string,
     fileId: string,
     filename: string,
     size: number,
     mimeType: string
   }

2. USE CLOUDINARY for storage:

   import { v2 as cloudinary } from 'cloudinary';

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });

   app.post('/api/upload', upload.single('file'), async (req, res) => {
     try {
       const result = await cloudinary.uploader.upload(req.file.path, {
         folder: 'iraq-election',
         resource_type: 'auto',
         transformation: [
           { width: 1200, height: 1200, crop: 'limit' },
           { quality: 'auto:good' }
         ]
       });

       res.json({
         url: result.secure_url,
         fileId: result.public_id,
         filename: result.original_filename,
         size: result.bytes,
         mimeType: result.format
       });
     } catch (error) {
       res.status(500).json({ error: 'Upload failed' });
     }
   });

3. FILE VALIDATION:
   - Check file type (whitelist)
   - Check file size
   - Sanitize filename
   - Scan for viruses (optional)

4. IMPLEMENT MULTER for file handling:
   - Memory storage for temp files
   - File filter for allowed types
   - Size limits per file type

5. PROVIDE:
   - Upload route with validation
   - Cloudinary configuration
   - Frontend upload utility
   - Error handling for failed uploads

6. ENVIRONMENT VARIABLES:
   - CLOUDINARY_CLOUD_NAME=...
   - CLOUDINARY_API_KEY=...
   - CLOUDINARY_API_SECRET=...
   - MAX_FILE_SIZE=52428800
```

---

## 📋 REQUEST #5: COMPLETE BACKEND PACKAGE

### **COPY THIS TO GOOGLE AI STUDIO:**

```
Combine all previous requirements into ONE complete backend package.

DELIVERABLES:

1. PROJECT STRUCTURE:

   /backend
     /src
       /routes
         auth.ts
         users.ts
         posts.ts
         candidates.ts
         gemini.ts
         upload.ts
       /middleware
         auth.ts
         errorHandler.ts
         validation.ts
       /models
         User.ts
         Post.ts
         Candidate.ts
       /services
         geminiService.ts
         emailService.ts
       /config
         database.ts
         cloudinary.ts
       server.ts
       app.ts
     /prisma (or /migrations)
       schema.prisma (or SQL files)
       seed.ts
     .env.example
     package.json
     tsconfig.json
     README.md

2. DEPLOYMENT READY FOR:
   - Railway
   - Heroku
   - Render
   - AWS EC2

3. INCLUDE:
   - Docker configuration (Dockerfile, docker-compose.yml)
   - CI/CD setup (GitHub Actions)
   - Health check endpoint
   - Logging with Winston
   - Error tracking setup (Sentry)
   - API documentation (Swagger/OpenAPI)

4. TESTING:
   - Jest configuration
   - Sample unit tests
   - Sample integration tests
   - Test database setup

5. DOCUMENTATION:
   - Setup instructions
   - Environment variables explanation
   - API endpoint documentation
   - Database schema diagram
   - Deployment guide
   - Troubleshooting section

6. PERFORMANCE:
   - Database indexes
   - Query optimization
   - Caching strategy (Redis)
   - Rate limiting
   - Connection pooling

7. SECURITY:
   - Helmet.js for headers
   - CORS configuration
   - Input sanitization
   - SQL injection prevention
   - XSS protection
   - CSRF protection

8. PROVIDE AS:
   - Complete ZIP file
   - GitHub repository structure
   - Step-by-step setup guide
   - Video walkthrough (optional)
```

---

## 🎯 SUMMARY: WHAT YOU'RE MISSING

### **BACKEND APIS (15 endpoints):**

```
Authentication (5):
✅ POST   /api/auth/register
✅ POST   /api/auth/login
✅ POST   /api/auth/social/google
✅ GET    /api/auth/verify-email/:token
✅ POST   /api/auth/refresh-token

Users (3):
✅ GET    /api/users
✅ GET    /api/users/:id
✅ PATCH  /api/users/:id

Posts (3):
✅ GET    /api/posts
✅ POST   /api/posts
✅ POST   /api/posts/:id/like

Candidates (2):
✅ GET    /api/candidates
✅ GET    /api/candidates/:id

AI & Utilities (2):
✅ POST   /api/gemini
✅ POST   /api/upload
```

### **DATABASE TABLES (8 tables):**

```
✅ users
✅ candidates
✅ posts
✅ comments
✅ likes
✅ follows
✅ governorates
✅ tea_house_topics
```

### **INFRASTRUCTURE:**

```
✅ PostgreSQL database
✅ Cloudinary file storage
✅ JWT authentication
✅ Gemini API integration
✅ Railway deployment
✅ Docker setup
```

---

## 💰 ESTIMATED COSTS

### **Development Time:**
- Backend API: 1 week
- Database: 2 days
- Auth: 3 days
- Testing: 2 days
- **TOTAL: 2 weeks**

### **Monthly Running Costs:**
- Railway: $5-20/month
- PostgreSQL: $0-10/month
- Cloudinary: $0-25/month (free tier available)
- Gemini API: Pay per use
- **TOTAL: $5-60/month**

---

## ✅ CHECKLIST: Send to Google AI Studio

- [ ] Request #1: Core Backend API
- [ ] Request #2: Gemini AI Proxy
- [ ] Request #3: Authentication System
- [ ] Request #4: File Upload System
- [ ] Request #5: Complete Package

**Once you get all 5, your platform will be 100% production-ready!**

---

*Ready to send to Google AI Studio for backend development*
