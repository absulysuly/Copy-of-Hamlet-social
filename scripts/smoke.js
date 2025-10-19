#!/usr/bin/env node
/**
 * Smoke test script - verifies critical API endpoints
 * Run: node scripts/smoke.js
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:4001';

async function testEndpoint(name, url, validator) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ ${name}: HTTP ${response.status}`);
      return false;
    }

    if (validator && !validator(data)) {
      console.error(`❌ ${name}: Invalid response structure`);
      return false;
    }

    console.log(`✅ ${name}: OK`);
    return true;
  } catch (error) {
    console.error(`❌ ${name}: ${(error instanceof Error && error.message) || 'Unknown error'}`);
    return false;
  }
}

async function runSmokeTests() {
  console.log('🔍 Running smoke tests...\n');
  console.log(`API Base: ${API_BASE}\n`);

  const results = await Promise.all([
    testEndpoint(
      'Health Check',
      `${API_BASE}/health`,
      (data) => data.status === 'ok' || Boolean(data.message)
    ),
    testEndpoint(
      'Get Candidates',
      `${API_BASE}/api/candidates?limit=2`,
      (data) => Array.isArray(data) || Array.isArray(data.data)
    ),
    testEndpoint(
      'Get Stats',
      `${API_BASE}/api/stats`,
      (data) => typeof data.total_candidates === 'number'
    ),
    testEndpoint(
      'Get Governorates',
      `${API_BASE}/api/governorates`,
      (data) => Array.isArray(data) || Array.isArray(data.data)
    ),
  ]);

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`\n📊 Results: ${passed}/${total} tests passed`);

  if (passed < total) {
    process.exit(1);
  }
}

runSmokeTests();
