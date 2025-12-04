#!/bin/bash

# Amora MVP - Deployment Script
# This script automates the deployment of all components

set -e  # Exit on error

echo "🚀 Starting Amora MVP Deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found. Install: npm install -g supabase${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites met${NC}"

# Deploy Backend
echo -e "\n${BLUE}1. Deploying Backend...${NC}"
cd backend

# Push database migrations
echo "   📦 Pushing database migrations..."
supabase db push

# Deploy edge functions
echo "   ⚡ Deploying edge functions..."
supabase functions deploy pair_users
supabase functions deploy start_session
supabase functions deploy process_memory
supabase functions deploy cron_weekly

echo -e "${GREEN}✅ Backend deployed${NC}"

cd ..

# Build Admin Panel
echo -e "\n${BLUE}2. Building Admin Panel...${NC}"
cd admin-web

if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found in admin-web/${NC}"
    echo "   Please create .env from .env.example and add your credentials"
    exit 1
fi

npm install
npm run build

echo -e "${GREEN}✅ Admin panel built (dist/ folder ready)${NC}"

cd ..

# Summary
echo -e "\n${GREEN}🎉 Deployment Complete!${NC}"
echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Deploy admin panel: cd admin-web && vercel --prod"
echo "2. Set Supabase secrets: supabase secrets set OPENAI_API_KEY=sk-..."
echo "3. Setup cron job in Supabase Dashboard (see DEPLOYMENT.md)"
echo "4. Build iOS app in Xcode and upload to TestFlight"

echo -e "\n${BLUE}Verify deployment:${NC}"
echo "- Backend: Check Supabase Dashboard → Edge Functions"
echo "- Database: Check Supabase Dashboard → Database"
echo "- Admin: Deploy to Vercel/Netlify and test login"

echo -e "\n✨ Happy launching!"
