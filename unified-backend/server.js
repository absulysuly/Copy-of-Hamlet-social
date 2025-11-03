const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const winston = require('winston');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4001;

// Logger setup
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

// Security & Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      upgradeInsecureRequests: []
    }
  }
}));

app.use(cors({ 
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true 
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, error: 'Too many requests, please try again later' }
});
app.use('/api/', limiter);

// Async handler wrapper
const asyncHandler = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

// ==================== ROOT ENDPOINT ====================
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Iraq Election API - Unified',
    version: '2.0.0',
    database: prisma ? 'Connected' : 'Disconnected',
    endpoints: {
      candidates: '/api/candidates',
      candidateById: '/api/candidates/:id',
      search: '/api/candidates/search',
      governorates: '/api/governorates',
      parties: '/api/parties',
      stats: '/api/stats',
      trending: '/api/trending'
    },
    documentation: 'https://github.com/absulysuly/DigitalDemocracy.Iraq'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== CANDIDATES ENDPOINTS ====================

// GET /api/candidates - Paginated list with filters
app.get('/api/candidates', asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 50);
  const skip = (page - 1) * limit;
  
  const { governorate, gender, sex, party, query, sort } = req.query;
  
  const where = {};
  
  // Filter by governorate
  if (governorate && governorate !== 'All') {
    where.governorate = governorate;
  }
  
  // Filter by gender/sex
  if (gender || sex) {
    const genderValue = (gender || sex).toUpperCase();
    where.sex = genderValue === 'MALE' ? 'MALE' : genderValue === 'FEMALE' ? 'FEMALE' : genderValue;
  }
  
  // Filter by party
  if (party && party !== 'All') {
    where.partyNameArabic = { contains: party };
  }
  
  // Search query
  if (query) {
    where.OR = [
      { fullNameArabic: { contains: query, mode: 'insensitive' } },
      { fullNameEnglish: { contains: query, mode: 'insensitive' } },
      { partyNameArabic: { contains: query, mode: 'insensitive' } }
    ];
  }

  // Determine sort order
  let orderBy = { fullNameArabic: 'asc' };
  if (sort === 'popular') orderBy = { viewsCount: 'desc' };
  if (sort === 'recent') orderBy = { createdAt: 'desc' };

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
        supportersCount: true
      }
    }),
    prisma.candidate.count({ where })
  ]);

  // Transform to match frontend expectations
  const transformedCandidates = candidates.map(c => ({
    id: c.id,
    name: c.fullNameEnglish || c.fullNameArabic,
    gender: c.sex === 'MALE' ? 'Male' : c.sex === 'FEMALE' ? 'Female' : c.sex,
    governorate: c.governorate,
    party: c.partyNameEnglish || c.partyNameArabic,
    ballot_number: parseInt(c.ballotNumber) || 0,
    photo: c.photoUrl,
    views: c.viewsCount,
    supporters: c.supportersCount
  }));

  res.json({
    data: transformedCandidates,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
  });
}));

// GET /api/candidates/search - Search functionality
app.get('/api/candidates/search', asyncHandler(async (req, res) => {
  const { q, governorate, sex, limit = 50 } = req.query;
  
  const where = {};
  
  if (q) {
    where.OR = [
      { fullNameArabic: { contains: q, mode: 'insensitive' } },
      { fullNameEnglish: { contains: q, mode: 'insensitive' } },
      { partyNameArabic: { contains: q, mode: 'insensitive' } }
    ];
  }
  
  if (governorate && governorate !== 'All') {
    where.governorate = governorate;
  }
  
  if (sex) {
    where.sex = sex.toUpperCase();
  }

  const candidates = await prisma.candidate.findMany({
    where,
    take: parseInt(limit),
    orderBy: { viewsCount: 'desc' },
    select: {
      id: true,
      fullNameArabic: true,
      fullNameEnglish: true,
      partyNameArabic: true,
      governorate: true,
      sex: true,
      photoUrl: true,
      ballotNumber: true
    }
  });

  res.json({ 
    success: true, 
    count: candidates.length, 
    data: candidates 
  });
}));

// GET /api/candidates/:id - Single candidate details
app.get('/api/candidates/:id', asyncHandler(async (req, res) => {
  const candidate = await prisma.candidate.findUnique({ 
    where: { id: req.params.id }
  });
  
  if (!candidate) {
    return res.status(404).json({ 
      success: false, 
      error: 'Candidate not found' 
    });
  }
  
  // Increment view count asynchronously (don't wait)
  prisma.candidate.update({
    where: { id: req.params.id },
    data: { viewsCount: { increment: 1 } }
  }).catch(err => logger.error('Failed to increment view count:', err));

  res.json({ success: true, data: candidate });
}));

// POST /api/candidates - Create new candidate (for candidate portal)
app.post('/api/candidates', asyncHandler(async (req, res) => {
  const { name, phone, province, party, email } = req.body;
  
  if (!name || !phone || !province) {
    return res.status(400).json({
      success: false,
      error: 'Missing required candidate fields (name, phone, province)'
    });
  }

  const candidate = await prisma.candidate.create({
    data: {
      uniqueCandidateId: `CAND-${Date.now()}`,
      fullNameArabic: name,
      fullNameEnglish: name,
      phone,
      governorate: province,
      partyNameArabic: party || '?????',
      partyNameEnglish: party || 'Independent',
      email,
      ballotNumber: Math.floor(Math.random() * 9000 + 1000).toString(),
      sex: 'UNKNOWN',
      nominationType: 'Individual',
      referralCode: `REF-${Date.now()}`
    }
  });

  res.status(201).json({ success: true, data: candidate });
}));

// ==================== GOVERNORATES ENDPOINT ====================

app.get('/api/governorates', asyncHandler(async (req, res) => {
  // Get candidate count per governorate
  const result = await prisma.candidate.groupBy({
    by: ['governorate'],
    _count: true,
    orderBy: { governorate: 'asc' }
  });

  // Iraqi governorates with Arabic names
  const governorateMap = {
    'Baghdad': { id: 1, name_en: 'Baghdad', name_ar: '?????' },
    'Basra': { id: 2, name_en: 'Basra', name_ar: '??????' },
    'Nineveh': { id: 3, name_en: 'Nineveh', name_ar: '?????' },
    'Erbil': { id: 4, name_en: 'Erbil', name_ar: '?????' },
    'Sulaymaniyah': { id: 5, name_en: 'Sulaymaniyah', name_ar: '??????????' },
    'Duhok': { id: 6, name_en: 'Duhok', name_ar: '????' },
    'Anbar': { id: 7, name_en: 'Anbar', name_ar: '???????' },
    'Diyala': { id: 8, name_en: 'Diyala', name_ar: '?????' },
    'Kirkuk': { id: 9, name_en: 'Kirkuk', name_ar: '?????' },
    'Najaf': { id: 10, name_en: 'Najaf', name_ar: '?????' },
    'Karbala': { id: 11, name_en: 'Karbala', name_ar: '??????' },
    'Babil': { id: 12, name_en: 'Babil', name_ar: '????' },
    'Wasit': { id: 13, name_en: 'Wasit', name_ar: '????' },
    'Salah al-Din': { id: 14, name_en: 'Salah al-Din', name_ar: '???? ?????' },
    'Maysan': { id: 15, name_en: 'Maysan', name_ar: '?????' },
    'Dhi Qar': { id: 16, name_en: 'Dhi Qar', name_ar: '?? ???' },
    'Muthanna': { id: 17, name_en: 'Muthanna', name_ar: '??????' },
    'Qadisiyyah': { id: 18, name_en: 'Qadisiyyah', name_ar: '????????' }
  };

  const governorates = result
    .map(g => {
      const info = governorateMap[g.governorate] || {
        id: 99,
        name_en: g.governorate,
        name_ar: g.governorate
      };
      return {
        ...info,
        candidate_count: g._count
      };
    })
    .filter(g => g.name_en);

  res.json(governorates);
}));

// ==================== PARTIES ENDPOINT ====================

app.get('/api/parties', asyncHandler(async (req, res) => {
  const result = await prisma.candidate.groupBy({
    by: ['partyNameArabic', 'partyNameEnglish'],
    _count: true,
    orderBy: { _count: { partyNameArabic: 'desc' } }
  });

  const parties = result
    .map(p => ({ 
      name_ar: p.partyNameArabic,
      name_en: p.partyNameEnglish || p.partyNameArabic,
      candidate_count: p._count 
    }))
    .filter(p => p.name_ar)
    .slice(0, 100);

  res.json({ success: true, count: parties.length, data: parties });
}));

// ==================== STATS ENDPOINT ====================

app.get('/api/stats', asyncHandler(async (req, res) => {
  const [total, male, female, govStats] = await Promise.all([
    prisma.candidate.count(),
    prisma.candidate.count({ where: { sex: 'MALE' } }),
    prisma.candidate.count({ where: { sex: 'FEMALE' } }),
    prisma.candidate.groupBy({ 
      by: ['governorate'], 
      _count: true,
      orderBy: { _count: { governorate: 'desc' } }
    })
  ]);

  res.json({
    total_candidates: total,
    gender_distribution: {
      Male: male,
      Female: female
    },
    candidates_per_governorate: govStats.map(g => ({
      governorate_name: g.governorate,
      candidate_count: g._count
    }))
  });
}));

// ==================== TRENDING ENDPOINT ====================

app.get('/api/trending', asyncHandler(async (req, res) => {
  const trending = await prisma.candidate.findMany({
    take: 20,
    orderBy: [
      { viewsCount: 'desc' }, 
      { supportersCount: 'desc' }
    ],
    select: {
      id: true,
      fullNameArabic: true,
      fullNameEnglish: true,
      partyNameArabic: true,
      governorate: true,
      photoUrl: true,
      viewsCount: true,
      supportersCount: true
    }
  });

  res.json({ success: true, data: trending });
}));

// ==================== ERROR HANDLERS ====================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Server error:', {
    message: err.message,
    stack: err.stack,
    path: req.path
  });
  
  res.status(err.status || 500).json({ 
    success: false, 
    error: process.env.NODE_ENV === 'production' 
      ? 'Server error' 
      : err.message 
  });
});

// ==================== SERVER START ====================

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '?'.repeat(70));
  console.log('?? IRAQ ELECTION API - UNIFIED BACKEND');
  console.log('?'.repeat(70));
  console.log(`?? Server:      http://localhost:${PORT}`);
  console.log(`???  Database:    ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
  console.log(`?? Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`?? CORS:        ${process.env.ALLOWED_ORIGINS || '*'}`);
  console.log('? Ready to serve election data!');
  console.log('?'.repeat(70) + '\n');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
