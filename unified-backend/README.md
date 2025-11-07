# ???? Iraq Election Backend - Unified API

Complete backend API for the Iraqi Election Platform, combining the best features from all previous deployments.

## ?? Features

- ? Complete REST API with 7 endpoints
- ? PostgreSQL database with Prisma ORM
- ? Pagination, filtering, and search
- ? Rate limiting and security (Helmet)
- ? Request logging (Winston + Morgan)
- ? CORS configured
- ? Production-ready

## ?? API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and status |
| GET | `/health` | Health check |
| GET | `/api/candidates` | List all candidates (paginated) |
| GET | `/api/candidates/:id` | Get single candidate |
| GET | `/api/candidates/search` | Search candidates |
| POST | `/api/candidates` | Create new candidate |
| GET | `/api/governorates` | List all governorates |
| GET | `/api/parties` | List all political parties |
| GET | `/api/stats` | Election statistics |
| GET | `/api/trending` | Trending candidates |

## ?? Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update:

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=4001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.com
```

### 3. Setup Database

```bash
npm run db:generate   # Generate Prisma client
npm run db:migrate    # Run migrations
npm run db:seed       # Seed with candidate data (optional)
```

### 4. Start Server

```bash
npm start            # Production
npm run dev          # Development with auto-reload
```

Server will start on `http://localhost:4001`

## ?? API Examples

### Get Candidates (with filters)

```bash
GET /api/candidates?page=1&limit=50&governorate=Baghdad&gender=Female
```

Response:
```json
{
  "data": [
    {
      "id": "clx123...",
      "name": "Ahmed Al-Maliki",
      "gender": "Male",
      "governorate": "Baghdad",
      "party": "Future Alliance",
      "ballot_number": 1234,
      "photo": "https://...",
      "views": 150,
      "supporters": 45
    }
  ],
  "total": 1250,
  "page": 1,
  "limit": 50,
  "pages": 25
}
```

### Get Statistics

```bash
GET /api/stats
```

Response:
```json
{
  "total_candidates": 7769,
  "gender_distribution": {
    "Male": 5234,
    "Female": 2535
  },
  "candidates_per_governorate": [
    {
      "governorate_name": "Baghdad",
      "candidate_count": 1250
    }
  ]
}
```

### Search Candidates

```bash
GET /api/candidates/search?q=ahmed&governorate=Baghdad&limit=20
```

### Get Governorates

```bash
GET /api/governorates
```

Response:
```json
[
  {
    "id": 1,
    "name_en": "Baghdad",
    "name_ar": "?????",
    "candidate_count": 1250
  },
  {
    "id": 2,
    "name_en": "Basra",
    "name_ar": "??????",
    "candidate_count": 856
  }
]
```

## ?? Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `PORT` | No | 4001 | Server port |
| `NODE_ENV` | No | development | Environment (production/development) |
| `ALLOWED_ORIGINS` | No | * | CORS allowed origins (comma-separated) |
| `LOG_LEVEL` | No | info | Winston log level |

### CORS Configuration

For production, set specific origins:

```bash
ALLOWED_ORIGINS=https://your-frontend.com,https://your-app.vercel.app
```

For development, use wildcard:

```bash
ALLOWED_ORIGINS=*
```

## ?? Database Schema

```prisma
model Candidate {
  id                  String   @id
  uniqueCandidateId   String   @unique
  ballotNumber        String
  fullNameArabic      String
  fullNameEnglish     String?
  partyNameArabic     String
  partyNameEnglish    String?
  governorate         String
  sex                 String
  email               String?
  phone               String?
  photoUrl            String?
  viewsCount          Int      @default(0)
  supportersCount     Int      @default(0)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

## ?? Deployment

### Railway

1. Create new project on Railway
2. Add PostgreSQL database
3. Set environment variables:
   ```
   DATABASE_URL=(automatically set by Railway)
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend.com
   ```
4. Connect GitHub repo
5. Deploy!

### Heroku

```bash
heroku create iraq-election-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://your-frontend.com
git push heroku main
```

### Vercel (Serverless)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add PostgreSQL database URL in Vercel dashboard
4. Deploy!

## ?? Testing

Test API locally:

```bash
# Health check
curl http://localhost:4001/health

# Get candidates
curl http://localhost:4001/api/candidates?limit=5

# Get stats
curl http://localhost:4001/api/stats

# Search
curl http://localhost:4001/api/candidates/search?q=ahmed
```

## ?? Integration with Frontend

### Next.js Example

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
});

export const fetchCandidates = async (params) => {
  const { data } = await api.get('/api/candidates', { params });
  return data;
};

export const fetchStats = async () => {
  const { data } = await api.get('/api/stats');
  return data;
};
```

### React Example

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getCandidates() {
  const response = await axios.get(`${API_URL}/api/candidates`);
  return response.data;
}
```

## ?? Security Features

- ? Helmet.js for HTTP headers security
- ? Rate limiting (200 requests per 15 minutes)
- ? CORS protection
- ? Input validation
- ? SQL injection protection (Prisma)
- ? Request logging

## ?? Performance

- ? Response compression (gzip)
- ? Database query optimization
- ? Pagination for large datasets
- ? Caching-friendly headers
- ? Async operations

## ?? Troubleshooting

### Database Connection Error

Check your `DATABASE_URL` format:
```
postgresql://user:password@host:5432/database?schema=public
```

### CORS Error

Add your frontend URL to `ALLOWED_ORIGINS`:
```bash
ALLOWED_ORIGINS=https://your-frontend.com,http://localhost:3000
```

### Port Already in Use

Change the port in `.env`:
```bash
PORT=4002
```

## ?? API Documentation

Full API documentation available at:
- Swagger: `/api-docs` (coming soon)
- Postman Collection: [Download](docs/postman-collection.json)

## ?? Contributing

This backend is designed to be the single source of truth for the Iraqi Election Platform. 

## ?? License

MIT License - See LICENSE file for details

## ????? Author

absulysuly - [GitHub](https://github.com/absulysuly)

---

**Status**: ? Production Ready | **Version**: 2.0.0 | **Last Updated**: 2025-11-03
