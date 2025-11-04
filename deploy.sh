#!/bin/bash

# Cloudflare Pages Deployment Script
# Replace YOUR_TOKEN_HERE with your actual Cloudflare API token

echo "🚀 Starting Cloudflare Pages deployment..."

# Set your API token
export CLOUDFLARE_API_TOKEN="YOUR_TOKEN_HERE"

# Deploy to Cloudflare Pages
npx wrangler pages deploy .next --project-name=digitaldemocracy-iraq

echo "✅ Deployment complete!"
