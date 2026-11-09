# FinSight — Project Roadmap

**Updated: November 8, 2026**  
This roadmap separates **finished project foundations**, **the current integration milestone**, **next engineering work**, and **future ideas**. It is intentionally more readable than the historical Sprint 3 Gantt, which described an earlier portfolio-focused scope.

## Roadmap overview

| Phase | Status | Main outcome | Primary owners |
| --- | --- | --- | --- |
| **1. Discovery & course design** | ✅ Complete | Sprints 1–6 requirements, models, risks, use cases and project documentation | Salih + team |
| **2. Working prototype & infrastructure** | ✅ Major milestones complete | Responsive frontend, MongoDB Atlas database, Groq AI demo/evaluation, GitHub workflow | Jake · Salih · Henry |
| **3. Reliability & backend foundation** | 🚧 **Current** | Finish AI reliability, auth/API design, DB integrity closeout, provider decision, QA | Henry · Asad · Salih · Jake |
| **4. Live-service integration** | ⏭ Next | Replace mock/local flows with server-side MongoDB, real market data, auth and persistent watchlists | Asad · Jake · Henry |
| **5. Validation, deployment & class demo** | ⏭ After integration | End-to-end tests, accessibility/security review, user/team acceptance, deploy demonstration | All team |
| **6. Expanded product vision** | 🔮 Future / approval required | News, alerts, portfolios, sourced chat/company graph, mobile/premium ideas | Team decision first |

---

## Phase 1 — Discovery & course design ✅

Completed foundations:

- Sprint 1 problem statement and business concept.
- Sprint 2 investigation, Five Whys/fishbone, feasibility and risks.
- Sprint 3 WBS, schedule, PERT/CPM and risk response.
- Sprint 4 FR-01–FR-08, NFRs and seven user stories.
- Sprint 5 functional decomposition, DFDs and D1–D4 logical stores.
- Sprint 6 objects, use cases, sequences, states and activity/error flows.
- Repository documentation, issue taxonomy and source traceability.

**Exit condition:** project requirements and logical design are documented.  
**Status:** complete as coursework/design evidence; formal instructor design-gate decision is still tracked in #68.

---

## Phase 2 — Working prototype & infrastructure ✅ / review

### Frontend — Jake
- [x] Next.js + TypeScript + Tailwind + Recharts frontend baseline merged in [PR #69](https://github.com/JustEmre12/FinSight/pull/69).
- [x] Search, stock detail, charts, comparisons, risk states, login/signup screens and local watchlists demonstrated with sample data.
- [x] Responsive app shell/navigation completed.
- [ ] Review search/comparison/chart stories against live-service requirements (#37, #41, #42).

### Database — Salih
- [x] MongoDB Atlas selected.
- [x] Dedicated **FinSight** Atlas project and free **FinSight-MVP** cluster created.
- [x] `finsight` database and six MVP collections created.
- [x] Query indexes and sharing package documented through PRs #85–#87.
- [ ] Apply final validator/unique-index integrity setup and connect the application (#30, #75, #84).

### AI — Henry
- [x] AI analysis specification / grounding policy added in PR #88.
- [x] Synthetic Groq evaluation tooling added in PR #89.
- [x] Groq connected to the existing explanation panel in PR #90.
- [x] Grounding and historical-risk quality strengthened in PR #91.
- [ ] Finish fresh-call reliability work and team acceptance in open [PR #92](https://github.com/JustEmre12/FinSight/pull/92).

### GitHub / Scrum — Salih + Jake
- [x] Feature-branch / PR routine established.
- [x] Issue-based seven-stage Kanban reorganized.
- [x] Current ownership and contributor assignments documented.
- [ ] Verify Asad's exact GitHub handle and repository access (#24).

---

# Phase 3 — Reliability & backend foundation 🚧 CURRENT

This is the team's **current working milestone**.

## 3A. Finish AI reliability
**Lead: Henry · Contributor: Jake · Backend: Asad**

- [ ] Finish PR #92 fresh-call evaluation and team review.
- [ ] Keep AI disclosures and conservative validation behavior.
- [ ] Keep production disabled until real data/auth/usage controls are ready.
- [ ] Complete real-data financial QA when a licensed provider exists.

**Issues:** #39, #43, #47

## 3B. Establish backend and auth path
**Lead: Asad · Scrum: Salih · Frontend contracts: Jake · AI contracts: Henry**

- [ ] Finalize backend/server architecture (#22).
- [ ] Finalize quote/search/history API contracts (#31).
- [ ] Select authentication/session design (#35).
- [ ] Implement secure registration/login/logout (#44).
- [ ] Map Sprint 6 objects to physical service interfaces (#66).

## 3C. Resolve market-data dependency
**Lead: Asad · Decision coordination: Salih**

- [ ] Choose licensed data provider and verify quotas, attribution, history and freshness (#26).
- [ ] Then unblock timestamped real quotes/history (#38).
- [ ] Keep fictional sample data clearly labeled until this is resolved.

## 3D. Close database handoff
**Lead: Salih · Backend: Asad**

- [ ] Apply final MongoDB integrity constraints/validator workflow.
- [ ] Define secure server-only connection and authorization boundary.
- [ ] Prepare DB integration tests and ownership checks.

**Issues:** #30, #75, #84

## 3E. Continue QA
**Leads: Jake + Henry · Backend support: Asad**

- [ ] Expand requirement test cases (#33).
- [ ] Continue automated/security/accessibility QA (#47).
- [ ] Validate Sprint 6 states, sequences and errors (#64, #67).

### Phase 3 exit criteria
Move to live integration when:
1. backend/auth approach is agreed,
2. market-data provider is chosen,
3. AI reliability increment is reviewed,
4. DB integrity/connection plan is ready,
5. test cases exist for each integrated flow.

---

# Phase 4 — Live-service integration ⏭ NEXT

**Main owner: Asad · Frontend: Jake · AI/frontend: Henry · Scrum/database: Salih**

### Integration order

1. **Secure server + authentication**
   - Server session identifies the user.
   - No browser-supplied user ID is trusted for private data.

2. **MongoDB connection**
   - Connect server-side to the live `finsight` database.
   - Persist user profiles and watchlists.

3. **Licensed market data**
   - Replace sample quote/history values.
   - Preserve provider, currency, quote time and stale/error states.

4. **Frontend adapters**
   - Replace mock/local functions in `app/lib/api.ts` incrementally.
   - Keep Jake's existing TypeScript response contracts where practical.

5. **AI with live context**
   - Feed the AI dated provider context rather than fictional sample data.
   - Store appropriate analysis metadata in `analysis_runs`.

6. **Comparison/chart/risk validation**
   - Re-test comparisons, charts and volatility using live provider histories.

**Core issues:** #38, #40, #44, #46 plus #37/#41/#42 review follow-through.

---

# Phase 5 — Validation, deployment & class demonstration ⏭

**All team members**

- [ ] Cross-user authorization tests.
- [ ] Provider failure/stale-data tests.
- [ ] AI failure/reliability and disclosure review.
- [ ] Mobile/responsive/manual UX checks.
- [ ] Accessibility and security checks.
- [ ] Team acceptance of FR-01–FR-08.
- [ ] Record instructor/management design decision.
- [ ] Deploy a controlled demonstration and document limitations (#48).

**Definition of Done for the integrated MVP:** real backend behavior + reviewed PR + relevant tests + secure ownership + documented limitations. A UI screen alone is not enough.

---

# Phase 6 — Future product vision 🔮

These remain **Future** until scope is formally changed:

### Research / news
- #49 curated financial news
- #50 alerts/subscriptions
- #52 sentiment/topic research
- #72 source verification
- #73 company relationships

### Portfolio / broader finance
- #51 manual holdings/transactions
- #55 banking/budgeting/financial goals — currently out of MVP
- #74 holdings-aware AI

### Product expansion
- #53 mobile-native app
- #54 premium/revenue model
- #71 conversational FinSight AI
- #76 adversarial/citation AI quality

---

## Team workstream map

| Member | Current focus | Next |
| --- | --- | --- |
| **Salih Emre** | GitHub, Scrum, roadmap/Kanban, MongoDB closeout | Coordinate integration/release and database handoff |
| **Asad** | Backend owner | Auth, API/server architecture, market-data and MongoDB integration |
| **Jake** | Frontend, PM, research/info gathering | Review prototype stories, live adapter integration, UX/interviews |
| **Henry** | AI + frontend/developer | Finish PR #92, AI quality, live-context AI integration |

[Current Team Ownership](TEAM_OWNERSHIP.md) · [Kanban](KANBAN.md) · [Project Status](PROJECT_STATUS.md) · [Issues](https://github.com/JustEmre12/FinSight/issues)
