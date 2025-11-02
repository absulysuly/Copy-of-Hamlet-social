# 🚀 AI Agent Deployment Plan
## Hamlet Unified - Backend/Frontend Integration Project

**Version:** 1.0  
**Date:** Generated based on strategic roadmap  
**Objective:** Deploy unified backend and connect frontend using 11 AI agents organized into 3 specialized teams

---

## 📋 STRATEGIC OVERVIEW

### Project Goal
Connect the unified backend (deployed on Railway) with the Gemini-built frontend (Copy-of-Hamlet-social) to create a fully functional Iraqi Election Platform.

### Core Challenge
Coordinating 11 AI agents without conflicts, using natural language instructions, and ensuring each agent works in their specialized domain.

### Solution
Divide agents into 3 clear teams with sequential execution phases to prevent conflicts and ensure a reliable deployment.

---

## 👥 TEAM ORGANIZATION

### TEAM ONE: Backend Integration
**Lead:** Claude Code  
**Support Agents:** 2 agents (e.g., Agent-02: Backend Engineer, Agent-04: Data Specialist)

**Responsibilities:**
- Deploy the unified backend to Railway.
- Configure environment variables.
- Set up the PostgreSQL database connection.
- Run Prisma migrations.
- Implement any missing API endpoints.
- Test all backend endpoints to ensure they return correct data formats.
- Verify the database schema matches frontend expectations.
- Set up error handling and logging.

---

### TEAM TWO: Frontend Assembly
**Lead:** Cursor  
**Support Agents:** 2 agents (e.g., Agent-03: Frontend Engineer, Agent-06: Integration QA)

**Responsibilities:**
- Connect the frontend to the deployed backend URL.
- Implement the API client for backend requests.
- Add loading states and user-friendly error handling in the UI.
- Test the authentication flow (login, registration, protected pages).
- Ensure all social features (posts, comments, likes) work correctly.
- Test multilingual features (Arabic, Kurdish, English) and RTL compatibility.
- Deploy the final frontend to Vercel.

---

### TEAM THREE: Quality Assurance & Documentation
**Lead:** QA Coordinator (e.g., Agent-06: IntegrationQA)  
**Support Agents:** 4 agents (e.g., Authentication Tester, Social Features Tester, Candidate Features Tester, Documentation Specialist)

**Responsibilities:**
- Conduct end-to-end testing of the complete application.
- Intentionally try to break features to find edge cases.
- Document all bugs with clear, reproducible steps.
- Verify that bug fixes from other teams work correctly.
- Create user-facing and technical documentation.
- Generate a final verification report.

---

## 📅 10-DAY DEPLOYMENT TIMELINE

### PHASE ONE: Backend Deployment (Days 1-2)
**Objective:** Get the backend live and accessible on Railway.

**Instruction to Claude Code (Team One Lead):**
> "Following the `DEPLOYMENT_MERGE_GUIDE.md`, deploy the unified backend to Railway. Set up the PostgreSQL database, configure all environment variables, and run the Prisma migrations. When complete, provide the deployed backend URL and confirm that the health check endpoint returns a success status. Do not proceed to any other steps."

**Deliverable:** Live Backend URL + Health Check Confirmation.

---

### PHASE TWO: API Verification (Day 3)
**Objective:** Verify all API endpoints are working correctly.

**Instruction to Backend Support Agents:**
> "Test every API endpoint documented for the backend. For each endpoint, verify it returns data in the correct format. Create a simple checklist marking which endpoints work ('PASS') and which need fixes ('FAIL')."

**Deliverable:** API Endpoint Checklist (JSON or Markdown).

---

### PHASE THREE: Frontend Connection (Days 4-5)
**Objective:** Connect the frontend to the live backend and test features sequentially.

**Instruction to Cursor (Team Two Lead):**
> "Using the verified API endpoint checklist, connect the frontend to the backend. Start with the authentication flow, then candidate listings, then social features. Test each piece before moving to the next. Use the environment variables specified in the deployment guide."

**Deliverable:** Connected Frontend + Feature Status Report.

---

### PHASE FOUR: Integration Testing (Days 6-7)
**Objective:** Conduct comprehensive end-to-end testing of the integrated application.

**Instruction to QA Team:**
> "Test the complete application as a user would. Try to break things. Document every issue you find with clear steps to reproduce it. Test all user journeys, error scenarios, and multilingual layouts."

**Deliverable:** QA Test Report with a prioritized list of issues.

---

### PHASE FIVE: Bug Fixes and Polish (Days 8-9)
**Objective:** Fix all critical issues identified by the QA team.

**Instruction to Team Leads (Codex & Cursor):**
> "Fix only the issues assigned to your team from the QA report. The Backend team will fix API and database issues. The Frontend team will fix UI and interaction bugs. Confirm when each fix is complete."

**Deliverable:** Bug Fix Status Report.

---

### PHASE SIX: Final Verification & Production Deployment (Day 10)
**Objective:** Verify all fixes and deploy the final application to production.

**Instruction to QA Team & Cursor:**
> "QA Team: Verify all bug fixes are working correctly. Once confirmed, notify the Frontend team. Cursor (Frontend Lead): Deploy the final, tested version of the frontend to Vercel and verify that the production environment is fully functional."

**Deliverable:** Production Deployment Confirmation + Final QA Report.

---

## 🚨 CRITICAL COORDINATION RULES

1.  **Sequential Execution:** Only one team modifies the codebase at a time. The Frontend team waits for the Backend team to finish Phase 2. The QA team only tests and reports, never modifies code.
2.  **Completion Confirmation:** Each phase must be confirmed complete by the team lead and approved by you before the next phase begins.
3.  **Domain Boundaries:** Agents must not make changes outside their assigned domain (e.g., the backend team does not touch frontend UI code).
4.  **Centralized Coordination:** All reports and communications flow through you. You make the decisions and give the instructions.
5.  **Clear Instructions:** Every instruction must be simple, have a clear goal, and specify the deliverable.

---

## 🔧 TECHNICAL REFERENCES

-   **Backend URL (Target):** `https://hamlet-unified-complete-2027-production.up.railway.app`
-   **Frontend Location:** `E:\HamletUnified\Copy-of-Hamlet-social`
-   **Key Documentation:** `DEPLOYMENT_MERGE_GUIDE.md`, `agents_manifest.json`

This plan is now ready for execution.
