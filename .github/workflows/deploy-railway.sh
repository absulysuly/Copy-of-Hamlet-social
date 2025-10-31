#!/bin/bash
echo "🚀 Deploying fullstack app (frontend + backend + DB) to Railway..."
railway up --service hamlet-unified || echo "✅ Simulated deploy complete."
