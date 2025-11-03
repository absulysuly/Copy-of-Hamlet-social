/**
 * API TEST SUITE
 * Simple testing script for Iraq Election API endpoints
 */

const BASE_URL = process.env.API_URL || 'http://localhost:4001';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

// Helper function to make HTTP requests
async function request(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

// Test helper
async function test(name, fn) {
  testsRun++;
  process.stdout.write(`${colors.cyan}Testing:${colors.reset} ${name}... `);
  
  try {
    await fn();
    testsPassed++;
    console.log(`${colors.green}? PASS${colors.reset}`);
  } catch (error) {
    testsFailed++;
    console.log(`${colors.red}? FAIL${colors.reset}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
  }
}

// Assertion helpers
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// Run tests
async function runTests() {
  console.log('\n' + '?'.repeat(70));
  console.log('?? IRAQ ELECTION API - TEST SUITE');
  console.log('?'.repeat(70));
  console.log(`Testing API at: ${colors.blue}${BASE_URL}${colors.reset}\n`);

  // Test 1: Health Check
  await test('GET /health', async () => {
    const { status, data } = await request('GET', '/health');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.status === 'ok', 'Health status should be ok');
    assert(data.database === 'connected', 'Database should be connected');
  });

  // Test 2: Root Endpoint
  await test('GET / (root)', async () => {
    const { status, data } = await request('GET', '/');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.status === 'online', 'Service should be online');
    assert(data.service, 'Service name should be present');
    assert(data.endpoints, 'Endpoints list should be present');
  });

  // Test 3: API Documentation
  await test('GET /api/docs', async () => {
    const { status, data } = await request('GET', '/api/docs');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.endpoints, 'Documentation should list endpoints');
    assert(Array.isArray(data.endpoints), 'Endpoints should be an array');
  });

  // Test 4: Get Candidates (default)
  await test('GET /api/candidates (default)', async () => {
    const { status, data } = await request('GET', '/api/candidates');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.data, 'Should have data array');
    assert(Array.isArray(data.data), 'Data should be an array');
    assert(typeof data.total === 'number', 'Should have total count');
    assert(typeof data.page === 'number', 'Should have page number');
    assert(typeof data.limit === 'number', 'Should have limit');
  });

  // Test 5: Get Candidates with pagination
  await test('GET /api/candidates?page=2&limit=10', async () => {
    const { status, data } = await request('GET', '/api/candidates?page=2&limit=10');
    assertEquals(status, 200, 'Status should be 200');
    assertEquals(data.page, 2, 'Page should be 2');
    assertEquals(data.limit, 10, 'Limit should be 10');
    assert(data.data.length <= 10, 'Should return max 10 items');
  });

  // Test 6: Get Candidates with governorate filter
  await test('GET /api/candidates?governorate=Baghdad', async () => {
    const { status, data } = await request('GET', '/api/candidates?governorate=Baghdad');
    assertEquals(status, 200, 'Status should be 200');
    if (data.data.length > 0) {
      assert(data.data[0].governorate === 'Baghdad', 'Should filter by Baghdad');
    }
  });

  // Test 7: Get Candidates with gender filter
  await test('GET /api/candidates?gender=Female', async () => {
    const { status, data } = await request('GET', '/api/candidates?gender=Female');
    assertEquals(status, 200, 'Status should be 200');
    if (data.data.length > 0) {
      assert(data.data[0].gender === 'Female', 'Should filter by Female');
    }
  });

  // Test 8: Search Candidates
  await test('GET /api/candidates/search?q=ahmed', async () => {
    const { status, data } = await request('GET', '/api/candidates/search?q=ahmed');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.success === true, 'Search should be successful');
    assert(Array.isArray(data.data), 'Search results should be an array');
  });

  // Test 9: Search without query (should fail)
  await test('GET /api/candidates/search (no query)', async () => {
    const { status, data } = await request('GET', '/api/candidates/search');
    assertEquals(status, 400, 'Status should be 400');
    assert(data.success === false, 'Should fail without query');
  });

  // Test 10: Get Governorates
  await test('GET /api/governorates', async () => {
    const { status, data } = await request('GET', '/api/governorates');
    assertEquals(status, 200, 'Status should be 200');
    assert(Array.isArray(data), 'Should return array');
    assert(data.length === 18, 'Iraq has 18 governorates');
    if (data.length > 0) {
      assert(data[0].name_en, 'Should have English name');
      assert(data[0].name_ar, 'Should have Arabic name');
      assert(typeof data[0].candidate_count === 'number', 'Should have candidate count');
    }
  });

  // Test 11: Get Parties
  await test('GET /api/parties', async () => {
    const { status, data } = await request('GET', '/api/parties');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.success === true, 'Should be successful');
    assert(Array.isArray(data.data), 'Should return array');
    if (data.data.length > 0) {
      assert(data.data[0].name_ar, 'Should have Arabic name');
      assert(typeof data.data[0].candidate_count === 'number', 'Should have candidate count');
    }
  });

  // Test 12: Get Statistics
  await test('GET /api/stats', async () => {
    const { status, data } = await request('GET', '/api/stats');
    assertEquals(status, 200, 'Status should be 200');
    assert(typeof data.total_candidates === 'number', 'Should have total count');
    assert(data.gender_distribution, 'Should have gender distribution');
    assert(typeof data.gender_distribution.Male === 'number', 'Should have male count');
    assert(typeof data.gender_distribution.Female === 'number', 'Should have female count');
    assert(Array.isArray(data.candidates_per_governorate), 'Should have governorate breakdown');
  });

  // Test 13: Get Trending Candidates
  await test('GET /api/trending', async () => {
    const { status, data } = await request('GET', '/api/trending');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.success === true, 'Should be successful');
    assert(Array.isArray(data.data), 'Should return array');
  });

  // Test 14: Get Featured Candidates
  await test('GET /api/featured', async () => {
    const { status, data } = await request('GET', '/api/featured');
    assertEquals(status, 200, 'Status should be 200');
    assert(data.success === true, 'Should be successful');
    assert(Array.isArray(data.data), 'Should return array');
  });

  // Test 15: 404 Handling
  await test('GET /api/nonexistent (404)', async () => {
    const { status, data } = await request('GET', '/api/nonexistent');
    assertEquals(status, 404, 'Status should be 404');
    assert(data.success === false, 'Should indicate failure');
  });

  // Test 16: Get Single Candidate (if database has data)
  await test('GET /api/candidates/:id', async () => {
    // First get a candidate
    const { data: listData } = await request('GET', '/api/candidates?limit=1');
    if (listData.data && listData.data.length > 0) {
      const candidateId = listData.data[0].id;
      const { status, data } = await request('GET', `/api/candidates/${candidateId}`);
      assertEquals(status, 200, 'Status should be 200');
      assert(data.success === true, 'Should be successful');
      assert(data.data, 'Should have candidate data');
      assert(data.data.id === candidateId, 'Should return correct candidate');
    }
  });

  // Print summary
  console.log('\n' + '?'.repeat(70));
  console.log('?? TEST RESULTS');
  console.log('?'.repeat(70));
  console.log(`Total Tests: ${testsRun}`);
  console.log(`${colors.green}Passed: ${testsPassed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${testsFailed}${colors.reset}`);
  console.log(`Success Rate: ${((testsPassed/testsRun)*100).toFixed(1)}%`);
  console.log('?'.repeat(70) + '\n');

  // Exit with appropriate code
  process.exit(testsFailed > 0 ? 1 : 0);
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
