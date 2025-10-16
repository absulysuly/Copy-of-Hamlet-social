#!/bin/bash
# Comprehensive deployment verification script

echo "🚀 Smart Campaign - Deployment Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
CHECKS_PASSED=0
CHECKS_FAILED=0

# Function to check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((CHECKS_PASSED++))
    else
        echo -e "${RED}✗${NC} $1"
        ((CHECKS_FAILED++))
    fi
}

# 1. Check .env file exists
echo "📋 Checking Configuration..."
if [ -f .env ]; then
    check ".env file exists"
    
    # Check required env vars
    if grep -q "VITE_API_KEY=" .env && ! grep -q "VITE_API_KEY=$" .env; then
        check "VITE_API_KEY is configured"
    else
        false; check "VITE_API_KEY is configured"
    fi
else
    false; check ".env file exists"
fi

echo ""

# 2. Check dependencies
echo "📦 Checking Dependencies..."
if [ -d "node_modules" ]; then
    check "node_modules exists"
else
    echo -e "${YELLOW}⚠${NC}  node_modules not found, installing..."
    npm ci
    check "Dependencies installed"
fi

echo ""

# 3. Build the project
echo "🔨 Building Project..."
npm run build > /dev/null 2>&1
check "Build successful"

echo ""

# 4. Check build output
echo "📁 Checking Build Output..."
if [ -d "dist" ]; then
    check "dist folder created"
    
    if [ -f "dist/index.html" ]; then
        check "index.html exists in dist"
    else
        false; check "index.html exists in dist"
    fi
    
    # Check for assets
    if [ -d "dist/assets" ]; then
        check "Assets folder created"
    else
        false; check "Assets folder created"
    fi
else
    false; check "dist folder created"
fi

echo ""

# 5. Check critical files
echo "🔍 Checking Critical Files..."
[ -f "package.json" ]; check "package.json exists"
[ -f "vite.config.ts" ]; check "vite.config.ts exists"
[ -f "index.html" ]; check "index.html exists"
[ -f "index.tsx" ]; check "index.tsx exists"
[ -f "App.tsx" ]; check "App.tsx exists"

echo ""

# 6. Check for common issues
echo "⚠️  Checking for Common Issues..."

# Check for duplicate HTML tags
DUPLICATE_HEAD=$(grep -c "</head>" index.html)
if [ "$DUPLICATE_HEAD" -eq 1 ]; then
    check "No duplicate </head> tags"
else
    false; check "No duplicate </head> tags"
fi

DUPLICATE_BODY=$(grep -c "<body" index.html)
if [ "$DUPLICATE_BODY" -eq 1 ]; then
    check "No duplicate <body> tags"
else
    false; check "No duplicate <body> tags"
fi

# Check for console.log in production code (warning only)
if grep -r "console.log" App.tsx > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC}  Found console.log statements (consider removing for production)"
fi

echo ""

# 7. Final Summary
echo "=========================================="
echo "📊 Summary:"
echo -e "${GREEN}✓ Passed: $CHECKS_PASSED${NC}"
echo -e "${RED}✗ Failed: $CHECKS_FAILED${NC}"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready to deploy!${NC}"
    echo ""
    echo "📝 Next Steps:"
    echo "  1. Test locally: npm run preview"
    echo "  2. Deploy to your platform (Vercel/Netlify/etc)"
    echo "  3. Test on different devices and browsers"
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Please fix the issues above.${NC}"
    exit 1
fi
