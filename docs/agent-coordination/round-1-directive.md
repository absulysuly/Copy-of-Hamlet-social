# Directorate Bulletin – Unified Operations Cycle

## Mission Focus (Week 1)
- **Platform validation** Identify and log all UI/UX or data gaps for Google AI Studio follow-up.
- **Backup verification** Confirm all code, AI Studio merges, and daily archives are secured.
- **Social-media intelligence** Continue mapping Facebook, Twitter, and Telegram ecosystems for eventual outreach.

## Immediate Agent Actions
### Agent 3 – Platform Assessment (Primary)
- **Run** 30-minute audit on `E:\HamletUnified\Copy-of-Hamlet-social`.
- **Checklist**
  - Women badge visibility
  - Filter buttons (governorate, party, gender)
  - Responsive behavior across breakpoints
  - Language toggles (Arabic, English, Kurdish)
  - Search bar performance
  - Social share buttons
  - Candidate contact methods
  - Dashboard statistics accuracy
- **Log findings in** `docs/daily-reports/YYYY-MM-DD-agent3.md`.
- **Escalate issues via** `docs/agent-coordination/feature-requests.md` using the template provided below.

### Agent 5 – Quality Assurance Alignment
- **Mirror checklist** in `docs/testing/qa-matrix.md`.
- **After Agent 3 report**
  - Mark each item ✅ / ❌.
  - Attach one screenshot per failure.
  - Reference issue IDs from `feature-requests.md`.

### Agent 2 – Backup Verification
- **Execute once manually** `scripts/Backup.ps1`.
- **Confirm**
  - Git commit and push completed.
  - `.zip` / `.7z` archive exists in `E:\HamletUnified\backups\daily\`.
- **Record timestamp and result** in `docs/agent-coordination/backup-log.md`.
- **Verify** Task Scheduler daily entry.

### Agent 1 – Social Media Intelligence
- **Expand** `SocialMedia/Facebook_Targets.xlsx`.
- **Add sheets** for Twitter and Telegram with columns: Name, Link, Members, Type, Contact, Notes.

### Agent 4 – Marketing Preparation
- **Draft** bilingual pre-launch posts (Weeks 1–3) in `marketing/content-calendar.md`.
- **Store assets** in `marketing-assets/` (no publishing yet).

### Agent 6 – Documentation & Coordination
- **Update** `docs/agent-coordination/status.md` twice daily (09:00, 18:00).
- **Append** new feature requests, test outcomes, AI Studio merges.
- **Note** deprecation guidance for `hamlat-forntend-6-10` and `amlet-unified` once backups verified.

## Feature Request Template
```
Feature Request – Iraqi Election Platform

Missing Feature: [Name]
Location: [Expected placement]
Purpose: [User benefit]
Priority: High / Medium / Low

Technical Notes:
- Must support Arabic + English
- Mobile-responsive
- Compatible with existing candidate data

Example Implementation:
[Reference or brief concept]
```

## Coordination Cadence
| Time  | Action                        | Responsible |
|-------|-------------------------------|-------------|
| 09:00 | Morning status sync           | Agent 6 → Director |
| 12:00 | Backup verification ping      | Agent 2     |
| 15:00 | Interim QA check              | Agent 5     |
| 18:00 | Daily recap commit + summary  | Agent 6     |
| 20:00 | Director review + AI Studio submissions | Director |

## Current Status
- **All six agents active and authorized.**
- **Agent 3** begins platform audit immediately.
- **Agents 1, 2, 4, 5, 6** continue parallel tasks.
- **Awaiting** Agent 3 report before forwarding new feature requests to Google AI Studio.
