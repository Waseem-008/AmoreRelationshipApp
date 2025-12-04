#!/bin/bash

# Amora MVP - Test Script
# Runs basic validation checks on all components

set -e

echo "🧪 Running Amora MVP Tests..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

FAILED=0

# Test Backend
echo -e "\n${BLUE}Testing Backend...${NC}"

if [ -d "backend/supabase/migrations" ]; then
    MIGRATION_COUNT=$(ls -1 backend/supabase/migrations/*.sql 2>/dev/null | wc -l)
    if [ $MIGRATION_COUNT -gt 0 ]; then
        echo -e "${GREEN}✓ Found $MIGRATION_COUNT migration(s)${NC}"
    else
        echo -e "${RED}✗ No migrations found${NC}"
        FAILED=1
    fi
else
    echo -e "${RED}✗ Migrations directory not found${NC}"
    FAILED=1
fi

if [ -d "backend/supabase/functions" ]; then
    FUNCTION_COUNT=$(ls -d backend/supabase/functions/*/ 2>/dev/null | wc -l)
    if [ $FUNCTION_COUNT -gt 0 ]; then
        echo -e "${GREEN}✓ Found $FUNCTION_COUNT edge function(s)${NC}"
        
        # Check each function has index.ts
        for dir in backend/supabase/functions/*/; do
            if [ -f "$dir/index.ts" ]; then
                echo -e "${GREEN}  ✓ ${dir}index.ts exists${NC}"
            else
                echo -e "${RED}  ✗ ${dir}index.ts missing${NC}"
                FAILED=1
            fi
        done
    else
        echo -e "${RED}✗ No edge functions found${NC}"
        FAILED=1
    fi
else
    echo -e "${RED}✗ Functions directory not found${NC}"
    FAILED=1
fi

# Test Admin Panel
echo -e "\n${BLUE}Testing Admin Panel...${NC}"

if [ -f "admin-web/package.json" ]; then
    echo -e "${GREEN}✓ package.json exists${NC}"
else
    echo -e "${RED}✗ package.json not found${NC}"
    FAILED=1
fi

if [ -f "admin-web/.env.example" ]; then
    echo -e "${GREEN}✓ .env.example exists${NC}"
else
    echo -e "${YELLOW}⚠ .env.example not found${NC}"
fi

if [ -d "admin-web/src/pages" ]; then
    PAGE_COUNT=$(ls -1 admin-web/src/pages/*.tsx 2>/dev/null | wc -l)
    if [ $PAGE_COUNT -gt 0 ]; then
        echo -e "${GREEN}✓ Found $PAGE_COUNT page(s)${NC}"
    else
        echo -e "${RED}✗ No pages found${NC}"
        FAILED=1
    fi
else
    echo -e "${RED}✗ Pages directory not found${NC}"
    FAILED=1
fi

# Test iOS App
echo -e "\n${BLUE}Testing iOS App...${NC}"

if [ -f "ios/Amora/Amora/AmoraApp.swift" ]; then
    echo -e "${GREEN}✓ AmoraApp.swift exists${NC}"
else
    echo -e "${RED}✗ AmoraApp.swift not found${NC}"
    FAILED=1
fi

if [ -f "ios/Amora/Amora/Info.plist" ]; then
    echo -e "${GREEN}✓ Info.plist exists${NC}"
    
    # Check for required keys
    if grep -q "NSMicrophoneUsageDescription" ios/Amora/Amora/Info.plist; then
        echo -e "${GREEN}  ✓ Microphone permission configured${NC}"
    else
        echo -e "${RED}  ✗ Microphone permission missing${NC}"
        FAILED=1
    fi
    
    if grep -q "amora" ios/Amora/Amora/Info.plist; then
        echo -e "${GREEN}  ✓ Deep link scheme configured${NC}"
    else
        echo -e "${YELLOW}  ⚠ Deep link scheme not found${NC}"
    fi
else
    echo -e "${RED}✗ Info.plist not found${NC}"
    FAILED=1
fi

VIEW_COUNT=$(find ios/Amora/Amora/Views -name "*.swift" 2>/dev/null | wc -l)
if [ $VIEW_COUNT -gt 0 ]; then
    echo -e "${GREEN}✓ Found $VIEW_COUNT view(s)${NC}"
else
    echo -e "${RED}✗ No views found${NC}"
    FAILED=1
fi

# Test Documentation
echo -e "\n${BLUE}Testing Documentation...${NC}"

DOCS=("README.md" "DEPLOYMENT.md" "QUICKSTART.md" "DEVELOPMENT.md" "TROUBLESHOOTING.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓ $doc exists${NC}"
    else
        echo -e "${YELLOW}⚠ $doc not found${NC}"
    fi
done

# Test Configuration Files
echo -e "\n${BLUE}Testing Configuration...${NC}"

CONFIGS=(".gitignore" "package.json" "LICENSE")
for config in "${CONFIGS[@]}"; do
    if [ -f "$config" ]; then
        echo -e "${GREEN}✓ $config exists${NC}"
    else
        echo -e "${YELLOW}⚠ $config not found${NC}"
    fi
done

# Summary
echo -e "\n${BLUE}═══════════════════════════${NC}"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    echo -e "${YELLOW}Review the errors above${NC}"
    exit 1
fi
