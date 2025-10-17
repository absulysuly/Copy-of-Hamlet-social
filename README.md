# ProjectMVP — Iraqi Election Platform (Operation Phoenix)

This repository is the coordination point for the MVP built from the Hamlet Unified assets.

Branches
- main — protected, always deployable
- frontend — Google AI Studio (UI)
- backend — GitHub Copilot team (API)
- data — Data collection & enrichment
- ai-automation — n8n, prompts, automation
- marketing — outreach and templates
- future-features — Cursor team (refactors, Prisma)

Quick start
1. Clone: git clone https://github.com/absulysuly/Copy-of-Hamlet-social.git
2. Create team branches (if not present): git checkout -b frontend origin/main
3. Place code into frontend/, backend/, data/ and open PRs per CONTRIBUTING.md

3-Day MVP summary
- Day 1: DB + Backend (Prisma schema, GET endpoints, seed)
- Day 2: Frontend integration (CandidatesView → real API, CandidateProfile)
- Day 3: Deploy + outreach (Vercel, Render, SendGrid test batch)

Coordinator
- Heather (project director) — approves merges to main, triages blockers, oversees timelines.