/**
 * DATABASE SEED SCRIPT
 * Populates the Iraq Election database with realistic candidate data
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Iraqi Governorates
const GOVERNORATES = [
  'Baghdad', 'Basra', 'Nineveh', 'Erbil', 'Sulaymaniyah', 'Duhok',
  'Anbar', 'Diyala', 'Kirkuk', 'Najaf', 'Karbala', 'Babil',
  'Wasit', 'Salah al-Din', 'Maysan', 'Dhi Qar', 'Muthanna', 'Qadisiyyah'
];

// Iraqi Political Parties (Real)
const PARTIES = [
  { ar: '??????? ?????????? ??????????', en: 'Kurdistan Democratic Coalition' },
  { ar: '??????? ?????? ??????????', en: 'Patriotic Union of Kurdistan' },
  { ar: '????? ???? ???????', en: 'State of Law Coalition' },
  { ar: '??????? ?????? ???????', en: 'Iraqi National Coalition' },
  { ar: '????? ?????', en: 'Victory Alliance' },
  { ar: '????? ?????', en: 'Fatah Alliance' },
  { ar: '???? ?????? ??????', en: 'National Wisdom Movement' },
  { ar: '?????? ??????', en: 'Sadrist Movement' },
  { ar: '??? ?????? ?????????', en: 'Islamic Dawa Party' },
  { ar: '?????? ?????? ????????', en: 'Islamic Supreme Council' },
  { ar: '????? ????? ????????', en: 'Iraqi Forces Alliance' },
  { ar: '????? ???????? ???????', en: 'Iraqi Islamic Party' },
  { ar: '???? ???????', en: 'Change Movement (Gorran)' },
  { ar: '??????? ???????? ??????????', en: 'Kurdistan Islamic Union' },
  { ar: '??????? ?????????', en: 'Islamic Group' },
  { ar: '?????', en: 'Independent' }
];

// Common Iraqi first names
const FIRST_NAMES = {
  male: [
    '????', '????', '???', '???', '????', '????', '?????', '????', '???', '????',
    '??? ????', '??? ??????', '???', '????', '????', '????', '????', '????', '????', '????',
    '????', '????', '????', '????', '????', '????', '????', '????', '????', '????'
  ],
  female: [
    '?????', '????', '????', '???', '????', '????', '???', '????', '???', '?????',
    '?????', '????', '?????', '????', '???', '????', '?????', '????', '?????', '?????',
    '????', '??????', '???', '????', '????', '????', '????', '????', '?????', '???'
  ]
};

// Common Iraqi family names
const FAMILY_NAMES = [
  '???????', '???????', '???????', '???????', '?????????', '??????', '??????', '??????',
  '????????', '???????', '?????????', '??????', '??????', '???????', '???????', '????????',
  '???????', '???????', '???????', '?????', '??????', '?????', '???????', '????????',
  '????????', '?????????', '?????????', '????????', '????????', '?????????'
];

// English equivalents
const FIRST_NAMES_EN = {
  male: [
    'Mohammed', 'Ahmed', 'Ali', 'Hassan', 'Hussein', 'Abbas', 'Mustafa', 'Kareem', 'Reda', 'Jafar',
    'Abdullah', 'Abdulrahman', 'Omar', 'Khalid', 'Saleh', 'Fadel', 'Nabil', 'Adel', 'Waleed', 'Tariq',
    'Yasser', 'Samir', 'Fouad', 'Majid', 'Munir', 'Nizar', 'Hisham', 'Basim', 'Firas', 'Imad'
  ],
  female: [
    'Fatima', 'Zainab', 'Maryam', 'Noor', 'Sarah', 'Layla', 'Huda', 'Rehab', 'Amal', 'Samira',
    'Nadia', 'Wafaa', 'Iman', 'Siham', 'Mona', 'Hanaa', 'Rania', 'Duaa', 'Shaymaa', 'Israa',
    'Bushra', 'Yasmin', 'Reem', 'Lubna', 'Salwa', 'Abeer', 'Ghada', 'Hala', 'Naglaa', 'Suha'
  ]
};

const FAMILY_NAMES_EN = [
  'Al-Maliki', 'Al-Jubouri', 'Al-Obeidi', 'Al-Dulaimi', 'Al-Karbalaei', 'Al-Najafi', 'Al-Basri', 'Al-Ani',
  'Al-Hamdani', 'Al-Zuhairi', 'Al-Samarrai', 'Al-Kaabi', 'Al-Shammari', 'Al-Tamimi', 'Al-Rubaie', 'Al-Fatlawi',
  'Al-Khafaji', 'Al-Mousawi', 'Al-Husseini', 'Al-Sayyid', 'Al-Hakim', 'Al-Sadr', 'Al-Jaafari', 'Al-Shirazi',
  'Al-Barzanji', 'Al-Talabani', 'Al-Barzani', 'Al-Zebari', 'Al-Halbusi', 'Al-Mohammedawi'
];

// Phone prefixes for Iraq
const PHONE_PREFIXES = ['0750', '0751', '0770', '0771', '0780', '0781', '0790', '0791'];

// Generate random element from array
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random number between min and max
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate Iraqi phone number
const generatePhone = () => {
  const prefix = random(PHONE_PREFIXES);
  const suffix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}${suffix}`;
};

// Generate candidate
const generateCandidate = (index, governorate) => {
  const sex = Math.random() > 0.33 ? 'MALE' : 'FEMALE'; // 67% male, 33% female (realistic for Iraq)
  const party = random(PARTIES);
  
  const firstNameAr = random(FIRST_NAMES[sex === 'MALE' ? 'male' : 'female']);
  const familyNameAr = random(FAMILY_NAMES);
  const fullNameAr = `${firstNameAr} ${familyNameAr}`;
  
  const firstNameIndex = FIRST_NAMES[sex === 'MALE' ? 'male' : 'female'].indexOf(firstNameAr);
  const familyNameIndex = FAMILY_NAMES.indexOf(familyNameAr);
  
  const firstNameEn = FIRST_NAMES_EN[sex === 'MALE' ? 'male' : 'female'][firstNameIndex] || firstNameAr;
  const familyNameEn = FAMILY_NAMES_EN[familyNameIndex] || familyNameAr;
  const fullNameEn = `${firstNameEn} ${familyNameEn}`;

  const verificationStatuses = ['verified', 'pending', 'unverified'];
  const verificationStatus = random(verificationStatuses);

  return {
    uniqueCandidateId: `CAND-2025-${index.toString().padStart(5, '0')}`,
    voterNumber: randomNumber(1000000, 9999999),
    ballotNumber: randomNumber(1, 999).toString(),
    partyNameArabic: party.ar,
    partyNameEnglish: party.en,
    candidateSequence: randomNumber(1, 50),
    nominationType: Math.random() > 0.3 ? 'Party List' : 'Individual',
    governorate,
    sex,
    fullNameArabic: fullNameAr,
    fullNameEnglish: fullNameEn,
    email: `${firstNameEn.toLowerCase()}.${familyNameEn.toLowerCase().replace('al-', '')}@example.iq`,
    phone: generatePhone(),
    bio: sex === 'MALE' 
      ? `???? ?? ?????? ${governorate} ?? ?????????? ?????????? ???????? 2025. ???? ?? ?????? ?????? ???????? ???????.`
      : `????? ?? ?????? ${governorate} ?? ?????????? ?????????? ???????? 2025. ?????? ?????? ?????? ???????? ?????????.`,
    photoUrl: sex === 'MALE' 
      ? `https://i.pravatar.cc/300?img=${randomNumber(1, 70)}`
      : `https://i.pravatar.cc/300?img=${randomNumber(1, 50)}`,
    verificationStatus,
    verifiedAt: verificationStatus === 'verified' ? new Date() : null,
    verifiedBy: verificationStatus === 'verified' ? 'IHEC' : null,
    profileCompletionPercent: randomNumber(40, 100),
    viewsCount: randomNumber(0, 5000),
    supportersCount: randomNumber(0, 1000),
    postsCount: randomNumber(0, 50),
    eventsCount: randomNumber(0, 20),
    referralCode: `REF-${index.toString().padStart(5, '0')}`,
    lastActiveAt: new Date(Date.now() - randomNumber(0, 30) * 24 * 60 * 60 * 1000) // Random within last 30 days
  };
};

// Main seed function
async function main() {
  console.log('\n' + '?'.repeat(70));
  console.log('?? SEEDING IRAQ ELECTION DATABASE');
  console.log('?'.repeat(70) + '\n');

  // Clear existing data
  console.log('?? Clearing existing data...');
  await prisma.candidate.deleteMany({});
  console.log('? Database cleared\n');

  // Determine number of candidates to create
  const TOTAL_CANDIDATES = parseInt(process.env.SEED_COUNT) || 7769; // Realistic number
  const candidatesPerGovernorate = Math.floor(TOTAL_CANDIDATES / GOVERNORATES.length);
  const remainder = TOTAL_CANDIDATES % GOVERNORATES.length;

  console.log(`?? Creating ${TOTAL_CANDIDATES} candidates across ${GOVERNORATES.length} governorates...\n`);

  let totalCreated = 0;
  const batchSize = 100; // Insert in batches for performance

  for (let govIndex = 0; govIndex < GOVERNORATES.length; govIndex++) {
    const governorate = GOVERNORATES[govIndex];
    const count = candidatesPerGovernorate + (govIndex < remainder ? 1 : 0);
    
    console.log(`?? ${governorate}: Creating ${count} candidates...`);
    
    let candidates = [];
    for (let i = 0; i < count; i++) {
      candidates.push(generateCandidate(totalCreated + i + 1, governorate));
      
      // Insert in batches
      if (candidates.length === batchSize || i === count - 1) {
        await prisma.candidate.createMany({
          data: candidates,
          skipDuplicates: true
        });
        candidates = [];
      }
    }
    
    totalCreated += count;
    console.log(`   ? ${governorate}: ${count} candidates created (Total: ${totalCreated})`);
  }

  console.log('\n' + '?'.repeat(70));
  console.log('? SEEDING COMPLETED SUCCESSFULLY');
  console.log('?'.repeat(70));
  console.log(`\n?? Summary:`);
  console.log(`   Total Candidates: ${totalCreated}`);
  
  // Get statistics
  const stats = await prisma.candidate.groupBy({
    by: ['sex'],
    _count: { _all: true }
  });
  
  const male = stats.find(s => s.sex === 'MALE')?._count._all || 0;
  const female = stats.find(s => s.sex === 'FEMALE')?._count._all || 0;
  
  console.log(`   Male: ${male} (${((male/totalCreated)*100).toFixed(1)}%)`);
  console.log(`   Female: ${female} (${((female/totalCreated)*100).toFixed(1)}%)`);
  console.log(`   Governorates: ${GOVERNORATES.length}`);
  console.log(`   Political Parties: ${PARTIES.length}`);
  console.log('\n?? Database is ready for Iraqi Elections 2025!\n');
}

main()
  .catch((e) => {
    console.error('? Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
