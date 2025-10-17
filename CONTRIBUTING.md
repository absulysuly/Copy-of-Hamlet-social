# Contributing

Branch model
- main — protected, always deployable.
- team branches: frontend, backend, data, ai-automation, marketing, future-features.
- Feature branches: feat/<team>/<short-desc> created from the team branch.

PR workflow
1. Create a feature branch from your team branch.
2. Open PR → team branch for internal review.
3. When team branch ready, open PR from team branch → main.
4. PRs into main require at least one reviewer and passing CI.

PR checklist
- Code builds locally
- Lint/format passes
- Tests added (if applicable)
- Docs updated
- Target branch correct

Coding standards
- TypeScript with "strict": true
- Zod for runtime validation on API inputs
- Tailwind for styling; use RTL-aware utilities for Arabic
- Keep PRs small (<300 LOC) to reduce merge conflicts

CI / Quality gates
- Each PR must run lint/build/test (GH Actions)
- Require 1 reviewer for team branches and 1 reviewer + CI for main

Communications
- Daily standup posts in Slack #general (15 minutes)
- Use Trello/Notion for task tracking (Backlog | In Progress | Review | Done)

Security & Secrets
- Never commit .env or secrets
- Add service keys to GitHub Actions secrets (SUPABASE_URL, SUPABASE_SERVICE_ROLE, SENDGRID_KEY, TWILIO_*