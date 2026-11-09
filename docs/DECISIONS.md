# Scope conflicts and open team decisions

**Do not silently merge incompatible assignment versions.**

| Question | What the materials say | Decision still needed |
| --- | --- | --- |
| Core purpose | Sprints 1–2: financial-news/information aggregation; Sprint 3: portfolio tracking; Sprints 4–6: stock research | Confirm baseline with the whole team/instructor; Sprint 6 continues stock-research scope; latest object model and combined Sprint 4/5 logical model are working references |
| News and alerts | Central to Sprint 1–2; not separate FR in Sprint 4/5 | Explicitly approve for MVP or move to later phase |
| Bank links, budgets, merchant expenses, financial goals | Generic Fintech Data Tree | Not MVP without changed requirements |
| Provider and licensing | No vendor contracts or costs evidenced | Choose API and validate usage/redistribution terms, limits, quote freshness |
| AI provider | **Groq is selected for the current local/demo AI integration.** PR #90 connects it to the explanation panel; PRs #91–#92 cover quality/reliability | Keep production disabled until real market data, durable controls, auth and team acceptance are ready |
| Stack, backend and DB | **Next.js frontend + MongoDB Atlas + Groq local/demo AI are verified choices.** Backend/server architecture, auth provider, licensed market data and deployment remain incomplete | Finalize backend/auth/deployment path and integrate the chosen services safely |
| Feature status | **Jake's merged sample-data frontend passed CI; not a production service** | Track documentary milestones, demo code and actual production acceptance separately |
| Repository access | Salih=admin, Jake=write, Henry=write are verified; **Asad's exact GitHub account remains unverified** | Verify Asad's handle/permission, then assign backend issues to that account |
| Public/private | Repo currently public | Decide whether to restrict access before uploading original class files |

Proposed first engineering slice: market lookup + dated quotes + basic chart; then private accounts/watchlist, AI explanation, risk and comparisons. This is a proposal, not a final team vote.

## Sprint 6 pending design-gate decisions (October 28 document)
| Issue | Sprint 6 recommendation / status | Required action |
| --- | --- | --- |
| Approval to enter detailed design | **Conditional approval recommended**, not granted | Obtain and record management/instructor decision |
| Object model validation | Six object definitions and logical associations provided; no types/cardinalities fixed | Team review objects, relationships, method contracts and persistence |
| Primary use case completeness | Four names, only UC-01 and UC-02 described fully | Determine whether to author new UC descriptions for Manage Watchlist and Compare Stocks |
| Provider terminology and balanced DFD flows | Sprint 6 proposes alignment with original Sprint 4/5 SRD | Update source documents only with team agreement; repository documentation indicates corresponding actor names |
| Authentication / AI explanation | Watchlist needs signed-in investor; AI results informational | Approve requirement acceptance and security/error details |
| MVP implementation order | Accounts, search, reliable market data, AI explanations, watchlists; compare/charts follow | Confirm plan, taking care not to silently rewrite Sprint 4 priorities |

See [Sprint 6 modeling](SPRINT6_OBJECT_ORIENTED_MODEL.md) and [review checklist](SPRINT6_DESIGN_REVIEW.md). No **backend/provider/license**, instructor sign-off or deployed production app is evidenced; the frontend stack and runnable sample-data app **are** verified.

## New implementation evidence (November 2, 2026)
- [PR #69](https://github.com/JustEmre12/FinSight/pull/69) merged a **Next.js + TypeScript + Tailwind + Recharts** sample-data frontend prepared by Jake. This is the frontend prototype technology, **not a final endorsement of backend/database/vendor choices**.
- A GitHub Actions workflow now checks frontend lint/type/tests/build; the [PR run passed](https://github.com/JustEmre12/FinSight/actions/runs/41519999919).
- **Unresolved:** licensed market provider, secure auth/backend, MongoDB application connection, production AI controls, deployment, full QA and formal design approval. Groq now exists as a local/demo AI integration.
- [Frontend handoff](FRONTEND_PROTOTYPE.md) records exactly what is mock versus implemented.

## Current reconciliation from additional project documents — November 3, 2026
| Additional question | Evidence and status | Suggested decision gate |
| --- | --- | --- |
| Generic FinTech data tree and dictionary | Includes checking/savings banks, merchant transactions and financial goals; **not** included in Sprint 4–6 baseline | Keep as a reference; do not automatically include banking or payment functions |
| Sprint 3 manual holdings/transaction concept | A documented portfolio-focused plan, while combined Sprint 4–5 explicitly excludes portfolio custody, bank transactions and trade execution | Decide separately if **self-entered recordkeeping** belongs in a later phase |
| Proposed FinSight AI assistant | User concept includes chat, news/claim corroboration, company relationships and optional holding-aware research | Approve separate requirements, privacy/retention, data licenses and transparent claim-verification policy |
| Specific portfolio-aware buy/sell instructions | Conflicts with Sprint 4/5 and Sprint 6 **no personalized advice** scope | Not part of baseline; assess legal/regulatory implications before any user-specific recommendation feature |
| Real database connection | **MongoDB Atlas project, free cluster and `finsight` database are now created with the six MVP collections and query indexes** | Apply checked-in validators/unique flags, then connect the server-side backend; keep credentials out of Git |
| Frontend ZIP versus GitHub | Uploaded ZIP is a pre-CI snapshot; PR #69 already merged into `main` | Preserve existing code and use GitHub as the working source |

**Status correction:** The earlier “functional prototype not evidenced” and “no running app” wording refers to the *historical planning documents*. The [merged sample-data prototype](FRONTEND_PROTOTYPE.md) is now real, while a **production-integrated app** is not.

[Scope and project evolution](SCOPE_AND_EVOLUTION.md) · [FinSight AI vision](FINSIGHT_AI_VISION.md) · [Generic FinTech reference](FINTECH_REFERENCE_DATA_MODEL.md) · [Database architecture proposal](DATABASE_DESIGN_PLAN.md).

## MongoDB database decision — November 3, 2026
- **Selected platform:** MongoDB Atlas.
- **Reason for this repository update:** prepare the project for database creation without creating the database yet.
- **Phase 1 persistence:** `user_profiles`, `instruments`, `quotes`, `daily_prices`, `watchlist_items`, `analysis_runs`.
- **Not selected yet:** authentication/session provider, market-data provider, AI provider, hosting/deployment path.
- **Not automatically included:** bank accounts, merchant spending, financial goals, trade execution, and proposed conversational/portfolio collections.

[MongoDB readiness](MONGODB_READINESS.md) · [MongoDB schema](MONGODB_SCHEMA.md).

## Live MongoDB implementation — November 3, 2026
- Dedicated **FinSight** Atlas project created.
- Free **FinSight-MVP** cluster created in AWS US_EAST_1.
- Database **`finsight`** created with the six approved MVP collections.
- Scoped application DB user created; password/URI are **not stored in GitHub**.
- Query indexes created and verified.
- All six collections verified empty; sample frontend data was not copied into the live database.
- Strict validators and database-level unique flags remain to be applied with [`database/mongodb-init.js`](../database/mongodb-init.js), because the connected Atlas tool does not expose those options.
- Application authentication, market-data provider, AI provider and backend deployment/network access remain separate decisions.

[Live database](../database/README.md) · [Issue #84](https://github.com/JustEmre12/FinSight/issues/84).

## Current implementation decisions — November 8, 2026

- **Frontend:** Next.js + TypeScript + Tailwind + Recharts remains the current UI stack (PR #69).
- **Database:** MongoDB Atlas is live with project **FinSight**, cluster **FinSight-MVP**, database **`finsight`**, and six MVP collections.
- **AI:** Groq is the current local/demo AI service. PR #90 integrated it; PR #91 improved grounding/risk quality; PR #92 is the active reliability follow-up.
- **Backend:** not yet fully implemented; Asad is the working owner for server/API/auth/market-data integration.
- **Authentication:** provider/session solution still open.
- **Market data:** licensed provider still open and blocks real quote/history acceptance.
- **Deployment:** still open; no production-ready integrated deployment is claimed.

See [Project Status](PROJECT_STATUS.md), [Roadmap](ROADMAP.md) and [Current Team Ownership](TEAM_OWNERSHIP.md).
