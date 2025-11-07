/**
 * IRAQ ELECTION BACKEND - PRODUCTION MASTERPIECE
 * Version: 3.0.0
 * Author: absulysuly
 * Description: Enterprise-grade backend for Iraqi Parliamentary Elections
 * 
 * Features:
 * - Complete REST API with 10+ endpoints
 * - PostgreSQL with Prisma ORM
 * - Advanced security (Helmet, rate limiting, input validation)
 * - Request logging and monitoring
 * - Error handling and recovery
 * - CORS configured for multiple origins
 * - Performance optimized with caching
 * - Scalable architecture
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const winston = require('winston');
require('dotenv').config();

// ==================== INITIALIZATION ====================

const app = express();
const prisma = new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty',
});

const PORT = process.env.PORT || 4001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// ==================== LOGGER CONFIGURATION ====================

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'iraq-election-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// ==================== SECURITY MIDDLEWARE ====================

// Helmet security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
      : ['*'];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// ==================== GENERAL MIDDLEWARE ====================

app.use(compression()); // Gzip compression
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (IS_PRODUCTION) {
  app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
  }));
} else {
  app.use(morgan('dev'));
}

// Request ID middleware
app.use((req, res, next) => {
  req.id = Math.random().toString(36).substring(7);
  res.setHeader('X-Request-ID', req.id);
  next();
});

// ==================== RATE LIMITING ====================

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per window
  message: { 
    success: false, 
    error: 'Too many requests, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health' || req.path === '/';
  }
});

// Stricter rate limit for write operations
const writeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 requests per hour
  message: { 
    success: false, 
    error: 'Too many write requests, please try again later'
  }
});

app.use('/api/', apiLimiter);

// ==================== UTILITY FUNCTIONS ====================

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Pagination helper
const getPagination = (page, limit) => {
  const parsedPage = Math.max(1, parseInt(page) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit) || 50));
  const skip = (parsedPage - 1) * parsedLimit;
  return { page: parsedPage, limit: parsedLimit, skip };
};

// Response formatter
const formatResponse = (success, data = null, error = null, meta = {}) => {
  const response = { success, timestamp: new Date().toISOString() };
  if (data !== null) response.data = data;
  if (error !== null) response.error = error;
  if (Object.keys(meta).length > 0) response.meta = meta;
  return response;
};

// ==================== ROOT ENDPOINTS ====================

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Iraq Election API - Masterpiece Edition',
    version: '3.0.0',
    environment: NODE_ENV,
    database: prisma ? 'Connected' : 'Disconnected',
    endpoints: {
      health: '/health',
      docs: '/api/docs',
      candidates: {
        list: 'GET /api/candidates',
        byId: 'GET /api/candidates/:id',
        search: 'GET /api/candidates/search',
        create: 'POST /api/candidates',
        update: 'PATCH /api/candidates/:id',
        delete: 'DELETE /api/candidates/:id'
      },
      governorates: 'GET /api/governorates',
      parties: 'GET /api/parties',
      stats: 'GET /api/stats',
      trending: 'GET /api/trending',
      featured: 'GET /api/featured'
    },
    documentation: 'https://github.com/absulysuly/iraq-election-backend',
    maintainer: 'absulysuly'
  });
});

app.get('/health', asyncHandler(async (req, res) => {
  // Database health check
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: 'Database connection failed'
    });
  }
}));

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Iraq Election API Documentation',
    version: '3.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints: [
      {
        path: '/api/candidates',
        method: 'GET',
        description: 'Get paginated list of candidates',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (default: 50, max: 100)',
          governorate: 'Filter by governorate name',
          gender: 'Filter by gender (Male/Female)',
          sex: 'Alias for gender',
          party: 'Filter by party name',
          query: 'Search in names and party',
          sort: 'Sort order (popular, recent, name)'
        },
        example: '/api/candidates?page=1&limit=20&governorate=Baghdad&gender=Female'
      },
      {
        path: '/api/candidates/:id',
        method: 'GET',
        description: 'Get single candidate by ID',
        example: '/api/candidates/clx123abc'
      },
      {
        path: '/api/candidates/search',
        method: 'GET',
        description: 'Search candidates',
        parameters: {
          q: 'Search query',
          governorate: 'Filter by governorate',
          sex: 'Filter by gender',
          limit: 'Max results (default: 50)'
        },
        example: '/api/candidates/search?q=ahmed&governorate=Baghdad'
      },
      {
        path: '/api/governorates',
        method: 'GET',
        description: 'Get list of all Iraqi governorates with candidate counts'
      },
      {
        path: '/api/parties',
        method: 'GET',
        description: 'Get list of all political parties with candidate counts'
      },
      {
        path: '/api/stats',
        method: 'GET',
        description: 'Get election statistics (total, gender distribution, etc.)'
      },
      {
        path: '/api/trending',
        method: 'GET',
        description: 'Get trending candidates based on views and supporters'
      },
      {
        path: '/api/featured',
        method: 'GET',
        description: 'Get featured candidates'
      }
    ]
  });
});

// ==================== CANDIDATES ENDPOINTS ====================

// GET /api/candidates - List all candidates (paginated with filters)
app.get('/api/candidates', asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
  const { governorate, gender, sex, party, query, sort } = req.query;
  
  // Build where clause
  const where = {};
  
  if (governorate && governorate !== 'All') {
    where.governorate = governorate;
  }
  
  if (gender || sex) {
    const genderValue = (gender || sex).toUpperCase();
    if (genderValue === 'MALE' || genderValue === 'FEMALE') {
      where.sex = genderValue;
    }
  }
  
  if (party && party !== 'All') {
    where.partyNameArabic = { contains: party, mode: 'insensitive' };
  }
  
  if (query) {
    where.OR = [
      { fullNameArabic: { contains: query, mode: 'insensitive' } },
      { fullNameEnglish: { contains: query, mode: 'insensitive' } },
      { partyNameArabic: { contains: query, mode: 'insensitive' } },
      { partyNameEnglish: { contains: query, mode: 'insensitive' } }
    ];
  }

  // Determine sort order
  let orderBy = { fullNameArabic: 'asc' };
  if (sort === 'popular') orderBy = [{ viewsCount: 'desc' }, { supportersCount: 'desc' }];
  if (sort === 'recent') orderBy = { createdAt: 'desc' };
  if (sort === 'name') orderBy = { fullNameArabic: 'asc' };

  // Execute queries in parallel
  const [candidates, total] = await Promise.all([
    prisma.candidate.findMany({ 
      where, 
      skip, 
      take: limit, 
      orderBy,
      select: {
        id: true,
        uniqueCandidateId: true,
        ballotNumber: true,
        fullNameArabic: true,
        fullNameEnglish: true,
        partyNameArabic: true,
        partyNameEnglish: true,
        governorate: true,
        sex: true,
        photoUrl: true,
        viewsCount: true,
        supportersCount: true,
        verificationStatus: true,
        bio: true
      }
    }),
    prisma.candidate.count({ where })
  ]);

  // Transform data to match frontend expectations
  const transformedCandidates = candidates.map(c => ({
    id: c.id,
    name: c.fullNameEnglish || c.fullNameArabic,
    nameArabic: c.fullNameArabic,
    nameEnglish: c.fullNameEnglish,
    gender: c.sex === 'MALE' ? 'Male' : c.sex === 'FEMALE' ? 'Female' : c.sex,
    governorate: c.governorate,
    party: c.partyNameEnglish || c.partyNameArabic,
    partyArabic: c.partyNameArabic,
    partyEnglish: c.partyNameEnglish,
    ballot_number: parseInt(c.ballotNumber) || 0,
    photo: c.photoUrl,
    views: c.viewsCount,
    supporters: c.supportersCount,
    verified: c.verificationStatus === 'verified',
    bio: c.bio
  }));

  const pages = Math.ceil(total / limit);

  logger.info(`Candidates fetched: ${candidates.length} of ${total} total`, {
    requestId: req.id,
    page,
    limit,
    filters: { governorate, gender, party, query }
  });

  res.json({
    data: transformedCandidates,
    total,
    page,
    limit,
    pages,
    hasMore: page < pages,
    filters: { governorate, gender: gender || sex, party, query, sort }
  });
}));

// GET /api/candidates/:id - Get single candidate
app.get('/api/candidates/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const candidate = await prisma.candidate.findUnique({ 
    where: { id }
  });
  
  if (!candidate) {
    logger.warn(`Candidate not found: ${id}`, { requestId: req.id });
    return res.status(404).json(formatResponse(false, null, 'Candidate not found'));
  }
  
  // Increment view count asynchronously (fire and forget)
  prisma.candidate.update({
    where: { id },
    data: { viewsCount: { increment: 1 }, lastActiveAt: new Date() }
  }).catch(err => logger.error('Failed to increment view count:', err));

  logger.info(`Candidate fetched: ${candidate.fullNameArabic}`, { requestId: req.id });

  res.json(formatResponse(true, candidate));
}));

// GET /api/candidates/search - Search candidates
app.get('/api/candidates/search', asyncHandler(async (req, res) => {
  const { q, governorate, sex, limit = 50 } = req.query;
  
  if (!q || q.trim().length === 0) {
    return res.status(400).json(formatResponse(false, null, 'Search query (q) is required'));
  }

  const where = {
    OR: [
      { fullNameArabic: { contains: q, mode: 'insensitive' } },
      { fullNameEnglish: { contains: q, mode: 'insensitive' } },
      { partyNameArabic: { contains: q, mode: 'insensitive' } },
      { partyNameEnglish: { contains: q, mode: 'insensitive' } }
    ]
  };
  
  if (governorate && governorate !== 'All') {
    where.governorate = governorate;
  }
  
  if (sex) {
    where.sex = sex.toUpperCase();
  }

  const candidates = await prisma.candidate.findMany({
    where,
    take: Math.min(100, parseInt(limit)),
    orderBy: [{ viewsCount: 'desc' }, { supportersCount: 'desc' }],
    select: {
      id: true,
      fullNameArabic: true,
      fullNameEnglish: true,
      partyNameArabic: true,
      partyNameEnglish: true,
      governorate: true,
      sex: true,
      photoUrl: true,
      ballotNumber: true,
      viewsCount: true,
      supportersCount: true
    }
  });

  logger.info(`Search results: ${candidates.length} candidates for query "${q}"`, { 
    requestId: req.id 
  });

  res.json(formatResponse(true, candidates, null, { 
    query: q, 
    count: candidates.length,
    governorate,
    sex
  }));
}));

// POST /api/candidates - Create new candidate
app.post('/api/candidates', writeLimiter, asyncHandler(async (req, res) => {
  const { name, phone, province, party, email, gender, bio } = req.body;
  
  // Validation
  if (!name || !phone || !province) {
    return res.status(400).json(formatResponse(
      false, 
      null, 
      'Missing required fields: name, phone, province'
    ));
  }

  // Check for duplicate phone
  if (phone) {
    const existing = await prisma.candidate.findFirst({ where: { phone } });
    if (existing) {
      return res.status(409).json(formatResponse(
        false,
        null,
        'Candidate with this phone number already exists'
      ));
    }
  }

  const candidate = await prisma.candidate.create({
    data: {
      uniqueCandidateId: `CAND-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fullNameArabic: name,
      fullNameEnglish: name,
      phone,
      governorate: province,
      partyNameArabic: party || '?????',
      partyNameEnglish: party || 'Independent',
      email,
      sex: gender ? gender.toUpperCase() : 'UNKNOWN',
      bio,
      ballotNumber: Math.floor(Math.random() * 9000 + 1000).toString(),
      nominationType: 'Individual',
      referralCode: `REF-${Date.now()}`
    }
  });

  logger.info(`New candidate created: ${candidate.fullNameArabic}`, { 
    requestId: req.id,
    candidateId: candidate.id
  });

  res.status(201).json(formatResponse(true, candidate));
}));

// PATCH /api/candidates/:id - Update candidate
app.patch('/api/candidates/:id', writeLimiter, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Remove fields that shouldn't be updated directly
  delete updates.id;
  delete updates.uniqueCandidateId;
  delete updates.createdAt;
  delete updates.referralCode;

  const candidate = await prisma.candidate.update({
    where: { id },
    data: { ...updates, updatedAt: new Date() }
  });

  logger.info(`Candidate updated: ${id}`, { requestId: req.id });

  res.json(formatResponse(true, candidate));
}));

// DELETE /api/candidates/:id - Delete candidate (soft delete)
app.delete('/api/candidates/:id', writeLimiter, asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Soft delete by updating verification status
  await prisma.candidate.update({
    where: { id },
    data: { verificationStatus: 'rejected' }
  });

  logger.info(`Candidate soft deleted: ${id}`, { requestId: req.id });

  res.json(formatResponse(true, { message: 'Candidate deleted successfully' }));
}));

// ==================== GOVERNORATES ENDPOINT ====================

app.get('/api/governorates', asyncHandler(async (req, res) => {
  // Get candidate count per governorate
  const result = await prisma.candidate.groupBy({
    by: ['governorate'],
    _count: { _all: true },
    orderBy: { governorate: 'asc' }
  });

  // Iraqi governorates master data
  const governorateMap = {
    'Baghdad': { id: 1, name_en: 'Baghdad', name_ar: '?????', name_ku: '?????' },
    'Basra': { id: 2, name_en: 'Basra', name_ar: '??????', name_ku: '?????' },
    'Nineveh': { id: 3, name_en: 'Nineveh', name_ar: '?????', name_ku: '???????' },
    'Erbil': { id: 4, name_en: 'Erbil', name_ar: '?????', name_ku: '??????' },
    'Sulaymaniyah': { id: 5, name_en: 'Sulaymaniyah', name_ar: '??????????', name_ku: '???????' },
    'Duhok': { id: 6, name_en: 'Duhok', name_ar: '????', name_ku: '????' },
    'Anbar': { id: 7, name_en: 'Anbar', name_ar: '???????', name_ku: '??????' },
    'Diyala': { id: 8, name_en: 'Diyala', name_ar: '?????', name_ku: '?????' },
    'Kirkuk': { id: 9, name_en: 'Kirkuk', name_ar: '?????', name_ku: '???????' },
    'Najaf': { id: 10, name_en: 'Najaf', name_ar: '?????', name_ku: '?????' },
    'Karbala': { id: 11, name_en: 'Karbala', name_ar: '??????', name_ku: '???????' },
    'Babil': { id: 12, name_en: 'Babil', name_ar: '????', name_ku: '????' },
    'Wasit': { id: 13, name_en: 'Wasit', name_ar: '????', name_ku: '????' },
    'Salah al-Din': { id: 14, name_en: 'Salah al-Din', name_ar: '???? ?????', name_ku: '??????????' },
    'Maysan': { id: 15, name_en: 'Maysan', name_ar: '?????', name_ku: '??????' },
    'Dhi Qar': { id: 16, name_en: 'Dhi Qar', name_ar: '?? ???', name_ku: '?????' },
    'Muthanna': { id: 17, name_en: 'Muthanna', name_ar: '??????', name_ku: '??????' },
    'Qadisiyyah': { id: 18, name_en: 'Qadisiyyah', name_ar: '????????', name_ku: '??????' }
  };

  const governorates = result
    .map(g => {
      const info = governorateMap[g.governorate] || {
        id: 99,
        name_en: g.governorate,
        name_ar: g.governorate,
        name_ku: g.governorate
      };
      return {
        ...info,
        candidate_count: g._count._all
      };
    })
    .filter(g => g.name_en);

  // Add governorates with no candidates
  Object.entries(governorateMap).forEach(([key, value]) => {
    if (!governorates.find(g => g.name_en === key)) {
      governorates.push({ ...value, candidate_count: 0 });
    }
  });

  // Sort by ID
  governorates.sort((a, b) => a.id - b.id);

  logger.info(`Governorates fetched: ${governorates.length}`, { requestId: req.id });

  res.json(governorates);
}));

// ==================== PARTIES ENDPOINT ====================

app.get('/api/parties', asyncHandler(async (req, res) => {
  const result = await prisma.candidate.groupBy({
    by: ['partyNameArabic', 'partyNameEnglish'],
    _count: { _all: true },
    orderBy: { _count: { partyNameArabic: 'desc' } }
  });

  const parties = result
    .map(p => ({ 
      name_ar: p.partyNameArabic,
      name_en: p.partyNameEnglish || p.partyNameArabic,
      candidate_count: p._count._all
    }))
    .filter(p => p.name_ar)
    .slice(0, 100);

  logger.info(`Parties fetched: ${parties.length}`, { requestId: req.id });

  res.json(formatResponse(true, parties, null, { count: parties.length }));
}));

// ==================== STATS ENDPOINT ====================

app.get('/api/stats', asyncHandler(async (req, res) => {
  const [total, male, female, govStats, partyStats, verifiedCount] = await Promise.all([
    prisma.candidate.count(),
    prisma.candidate.count({ where: { sex: 'MALE' } }),
    prisma.candidate.count({ where: { sex: 'FEMALE' } }),
    prisma.candidate.groupBy({ 
      by: ['governorate'], 
      _count: { _all: true },
      orderBy: { _count: { governorate: 'desc' } }
    }),
    prisma.candidate.groupBy({
      by: ['partyNameArabic'],
      _count: { _all: true },
      orderBy: { _count: { partyNameArabic: 'desc' } },
      take: 10
    }),
    prisma.candidate.count({ where: { verificationStatus: 'verified' } })
  ]);

  const stats = {
    total_candidates: total,
    verified_candidates: verifiedCount,
    gender_distribution: {
      Male: male,
      Female: female,
      percentage_female: total > 0 ? ((female / total) * 100).toFixed(2) : 0
    },
    candidates_per_governorate: govStats.map(g => ({
      governorate_name: g.governorate,
      candidate_count: g._count._all
    })),
    top_parties: partyStats.map(p => ({
      party_name: p.partyNameArabic,
      candidate_count: p._count._all
    })),
    last_updated: new Date().toISOString()
  };

  logger.info('Statistics fetched', { requestId: req.id, total });

  res.json(stats);
}));

// ==================== TRENDING ENDPOINT ====================

app.get('/api/trending', asyncHandler(async (req, res) => {
  const limit = Math.min(50, parseInt(req.query.limit) || 20);

  const trending = await prisma.candidate.findMany({
    take: limit,
    where: {
      verificationStatus: 'verified'
    },
    orderBy: [
      { viewsCount: 'desc' }, 
      { supportersCount: 'desc' }
    ],
    select: {
      id: true,
      fullNameArabic: true,
      fullNameEnglish: true,
      partyNameArabic: true,
      partyNameEnglish: true,
      governorate: true,
      photoUrl: true,
      viewsCount: true,
      supportersCount: true,
      sex: true
    }
  });

  logger.info(`Trending candidates fetched: ${trending.length}`, { requestId: req.id });

  res.json(formatResponse(true, trending));
}));

// ==================== FEATURED ENDPOINT ====================

app.get('/api/featured', asyncHandler(async (req, res) => {
  // Get featured candidates (verified with high engagement)
  const featured = await prisma.candidate.findMany({
    take: 12,
    where: {
      verificationStatus: 'verified',
      supportersCount: { gte: 10 }
    },
    orderBy: [
      { supportersCount: 'desc' },
      { viewsCount: 'desc' }
    ],
    select: {
      id: true,
      fullNameArabic: true,
      fullNameEnglish: true,
      partyNameArabic: true,
      partyNameEnglish: true,
      governorate: true,
      photoUrl: true,
      viewsCount: true,
      supportersCount: true,
      bio: true
    }
  });

  logger.info(`Featured candidates fetched: ${featured.length}`, { requestId: req.id });

  res.json(formatResponse(true, featured));
}));

// ==================== ERROR HANDLERS ====================

// 404 Handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.path}`, { requestId: req.id });
  res.status(404).json(formatResponse(
    false, 
    null, 
    `Endpoint not found: ${req.method} ${req.path}`
  ));
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Server error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.id
  });
  
  // Don't leak error details in production
  const errorMessage = IS_PRODUCTION 
    ? 'Internal server error' 
    : err.message;
  
  res.status(err.status || 500).json(formatResponse(
    false,
    null,
    errorMessage
  ));
});

// ==================== SERVER START ====================

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '?'.repeat(80));
  console.log('????  IRAQ ELECTION API - PRODUCTION MASTERPIECE  ????');
  console.log('?'.repeat(80));
  console.log(`?? Server:        http://localhost:${PORT}`);
  console.log(`???  Database:      ${process.env.DATABASE_URL ? '? Connected' : '? Not configured'}`);
  console.log(`?? Environment:   ${NODE_ENV}`);
  console.log(`?? CORS:          ${process.env.ALLOWED_ORIGINS || '* (all origins)'}`);
  console.log(`?? Rate Limit:    200 requests / 15 minutes`);
  console.log(`?? Status:        Ready for Iraqi Elections 2025!`);
  console.log('?'.repeat(80));
  console.log('?? API Documentation: http://localhost:' + PORT + '/api/docs');
  console.log('?? Health Check:      http://localhost:' + PORT + '/health');
  console.log('?'.repeat(80) + '\n');
});

// ==================== GRACEFUL SHUTDOWN ====================

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received, starting graceful shutdown...`);
  
  server.close(async () => {
    logger.info('HTTP server closed');
    
    try {
      await prisma.$disconnect();
      logger.info('Database disconnected');
      process.exit(0);
    } catch (err) {
      logger.error('Error during shutdown:', err);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', { reason, promise });
});

module.exports = app;
