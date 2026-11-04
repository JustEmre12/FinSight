# FinSight
**AI-assisted financial market research, explained simply.**

FinSight is a student-built financial research project for beginner and individual investors. A **runnable sample-data frontend prototype** is now available in the repository, while the production platform remains under development. The current required experience covers stock search, market data, charts, comparisons, watchlists and AI explanations. The **original vision** also features news/source aggregation, filtering, trends and alerts. A newer **FinSight AI** conversational research assistant is proposed, not yet implemented.

**Current phase:** Sprint 6 modeling **documented** + frontend demonstration **merged** + **MongoDB Atlas selected and schema prepared** → database provisioning and real backend integration **next**.  
**Project:** BCS 301W · Systems Analysis & Design · Fall 2026  
**Team:** Salih, Jake, Asad, and Henry

> **Project status:** The repo includes a **runnable Next.js demo frontend** with fictional stock data, charts, comparisons, template-generated explanations and mock browser-only accounts/watchlists. **MongoDB Atlas is now the selected database platform, but no Atlas database/cluster/collections are created or connected yet.** There is still no licensed live market provider, real AI service, secure backend authentication or deployed production site.

## Explore FinSight

| Start here | Purpose |
| --- | --- |
| **[Complete Project Scope and Evolution](docs/SCOPE_AND_EVOLUTION.md)** | Understand Sprints 1–6, early news/portfolio concepts and newly proposed AI research |
| **[Verified Project Status](docs/PROJECT_STATUS.md)** | Exactly what exists in code and what still needs work |
| **[Product Overview](docs/PRODUCT_OVERVIEW.md)** | What FinSight aims to do, who it serves, and the intended user experience |
| **[Frontend Prototype](docs/FRONTEND_PROTOTYPE.md)** | How to run Jake's merged demo and what is still simulated |
| **[Work Board / Kanban](docs/KANBAN.md)** | Planned, active, review, completed, blocked, and future work |
| **[All GitHub Issues](https://github.com/JustEmre12/FinSight/issues)** | Track tasks, requirements, reviews, and progress |
| **[Documentation Hub](docs/README.md)** | Browse every sprint, model, requirement, and project document |
| **[Sprint 6 Object-Oriented Models](docs/SPRINT6_OBJECT_ORIENTED_MODEL.md)** | Objects, relationships, use cases, sequences, state transitions, and activity flows |
| **[Frontend-to-Backend Handoff](docs/FRONTEND_BACKEND_HANDOFF.md)** | Existing app data contracts, backend steps and integration plan |
| **[MongoDB Readiness](docs/MONGODB_READINESS.md)** | Selected database, six Phase 1 collections, indexes, safety rules and exact next steps |
| **[MongoDB Schema Draft](docs/MONGODB_SCHEMA.md)** | Collection fields/types/indexes ready to implement later |
| **[Database Design Background](docs/DATABASE_DESIGN_PLAN.md)** | D1–D4 mapping, MongoDB decisions, security and future expansion |
| **[FinSight AI Research Vision](docs/FINSIGHT_AI_VISION.md)** | Proposed sourced conversation, verified claims and optional portfolio context |
| **[Roadmap](docs/ROADMAP.md)** | What the team has documented and what must happen next |

## Product goal

**Reduce fragmented investor research.** The Sprint 1 proposal and Sprint 2 investigation explain the problem of cross-checking separate company disclosures, financial news, market data and online discussion. FinSight's long-term mission is to **gather, filter, attribute and explain** relevant information, while the later Sprint 4–6 baseline intentionally narrows the current deliverable to eight stock-research requirements.

The latest **Sprint 4–6 requirements and models** focus on a stock **research-support** website. Financial-news aggregation, market alerts, and broader portfolio features appear in earlier project ideas but are **not automatically included in the current MVP**.

### Proposed core features

| Requirement | Planned capability | Implementation |
| --- | --- | --- |
| FR-01 | Secure user registration and login | **Mock demo only; no security** |
| FR-02 | Search stocks by company name or ticker | Sample UI only |
| FR-03 | View available quotes, historical prices, and timestamps | Sample UI only |
| FR-04 | Request plain-language AI market explanations | **Template text only; no AI service** |
| FR-05 | Add and remove stocks from a personal watchlist | **Local browser demo only** |
| FR-06 | Compare two or more stocks | Sample UI only |
| FR-07 | View historical price charts | Sample UI only |
| FR-08 | Understand general investment risk and volatility | Sample UI only |

**[Full functional/nonfunctional requirements](docs/REQUIREMENTS.md)** · **[Seven user stories](docs/USER_STORIES.md)** · **[Requirements-to-design traceability](docs/TRACEABILITY.md)**

## Project progress — November 3, 2026

| Sprint | Documented work |
| --- | --- |
| 1 — Proposal | Problem statement, business case, and project concept |
| 2 — Investigation | Five Whys, fishbone diagrams, SWOT, feasibility, risks |
| 3 — Project management | Work Breakdown Structure, Gantt, PERT/CPM, risk response |
| 4 — Requirements | FR-01–FR-08, NFR-01–NFR-07, user stories, acceptance criteria |
| 5 — Logical modeling | Functional decomposition, context and data-flow diagrams, data dictionary |
| **6 — Object-oriented modeling** | **Six objects; four named use cases; two detailed use-case descriptions; object relationship, derived class, sequence, state and activity diagrams** |
| **Frontend prototype — Nov 2** | **Jake's feature branch merged via [PR #69](https://github.com/JustEmre12/FinSight/pull/69); frontend lint, TypeScript, unit tests and build passed** |

**Status:** The submitted Sprint 6 material **recommends conditional approval** to enter detailed system design. It does not establish that management/instructor approval was granted. A runnable **Next.js/TypeScript/Tailwind/Recharts frontend demo exists**. **MongoDB Atlas has been selected and the physical schema is drafted**, but the Atlas project/database is intentionally not created yet. Secure login, backend routes, a licensed market-data provider, real AI service and production deployment remain unfinished.

### Task tracking

**November 3 tracking snapshot:** **82 GitHub Issue records**, **55 open**, **27 closed**, **78 stage-tracked cards**; 4 closed duplicate records are not shown in Kanban. The **23 Done-lane cards** are documented deliverables and verified prototype/documentation milestones—not finished production features. See the [Kanban](docs/KANBAN.md) for current stage filters.

[View seven-stage Kanban](docs/KANBAN.md) · [Browse Issues](https://github.com/JustEmre12/FinSight/issues) · [Read-only interactive board source](board/index.html)

The seven stages are **Product Backlog, Ready, In Progress, In Review, Done, Blocked, Future**. Some In Progress items represent provisional planning focus, not verified engineering activity. The Done lane includes a distinct frontend **prototype** task, while production FR/US issues remain open. The interactive board reads live public Issues when served, but GitHub Pages is **not currently enabled**, and this is **not** a native GitHub Projects drag-and-drop board.

## Original vision and proposed expansion

- **Sprints 1–2:** financial news, source links and filtering, topic/company following, trend detection, summaries and relevance-based alerts — original goals awaiting a scope decision for the current MVP.
- **Sprint 3:** manually tracked holdings, portfolio values, transactions, gains/losses and allocations — a different portfolio-focused planning document, not automatically part of the later FR-01–FR-08 baseline.
- **Generic FinTech dictionary:** bank accounts, spending transactions and financial goals — **reference material, not FinSight backend requirements**. [Reference comparison](docs/FINTECH_REFERENCE_DATA_MODEL.md).
- **Proposed FinSight AI:** conversational sourced company research, evidence/claim checks, verified company relationships and optional user-entered holdings-aware scenarios. This requires approval, security, privacy and investment-advice boundary review. [AI proposal](docs/FINSIGHT_AI_VISION.md).

**AI-generated-text detection is not proof a financial claim is true:** the proposal prioritizes primary documents, source dates, corroboration, contradictions and uncertainty.

## Run the frontend prototype locally

Requires Node.js 20.9+ and npm. From the repository root:

```bash
cd app
npm ci
npm run dev
```

Then open `http://localhost:3000`. **Sample/demo data only**—use fictional demo account details, not real passwords or financial information. See the [frontend handoff](docs/FRONTEND_PROTOTYPE.md), [app README](app/README.md) and [merged PR](https://github.com/JustEmre12/FinSight/pull/69).

## How the system is intended to work

The **Investor/User** searches companies, views market data, manages an authenticated watchlist, compares stocks, and may request an AI explanation. FinSight's logical model communicates with a **Market Data Provider** and an **AI Service Provider**.

Sprint 6 identifies six main logical objects: **User, Stock, Watchlist, MarketData, AIAnalysis, StockComparison**. Search should validate input before requesting provider data. AI analysis should use available market context, show an AI disclosure, and handle missing data or service failures.

[Explore Sprint 5 structured design](docs/SYSTEM_DESIGN.md) · [Explore Sprint 6 object-oriented design](docs/SPRINT6_OBJECT_ORIENTED_MODEL.md) · [Review outstanding design decisions](docs/DECISIONS.md)

## Team

| Team member | Role in the October 6 team charter |
| --- | --- |
| **Salih** | Project Manager / Business Analyst |
| **Jake** | Frontend Developer / UI Designer |
| **Asad** | Backend Developer / Database Manager |
| **Henry** | AI / Data Analyst |

The charter describes roles other than Project Manager as proposed and adjustable by team agreement.

## Repository layout

| Location | Contents |
| --- | --- |
| [docs/](docs/README.md) | Full documented vision, Sprints 1–6, new source references, proposed AI/database, frontend/backend handoff, risks and tracking |
| [board/](board/README.md) | Read-only GitHub Issues Kanban webpage (not hosted yet) |
| [app/](app/README.md) | **Runnable Next.js sample-data frontend**, unit tests, screenshots and setup guide |
| [.github/](.github/) | Feature and bug issue templates, pull-request template |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Team collaboration and review workflow |
| [.env.example](.env.example) | Empty configuration variable template; **no real credentials** |

## Contributing and next steps

1. Review the [Sprint 6 design gate](docs/SPRINT6_DESIGN_REVIEW.md) and [scope decisions](docs/DECISIONS.md).
2. Resolve access and provider dependencies in [GitHub Issues](https://github.com/JustEmre12/FinSight/issues).
3. Use the reviewed [MongoDB readiness plan](docs/MONGODB_READINESS.md) when the team is ready to provision the database; keep credentials server-side and out of Git.
4. Demonstrate and test each story before moving an **implementation** issue to Done. The [frontend prototype PR #69](https://github.com/JustEmre12/FinSight/pull/69) is merged, but the full FR/US issues remain open.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the group's suggested workflow.

---

**Important:** FinSight is intended for informational investment research. It does **not** execute trades, hold funds, provide personalized financial advice, or guarantee outcomes. Market information must display its source and freshness, and AI-generated content must be identified as such.

_This public repository contains organized summaries of the team's **18 catalogued project source entries** plus a separate Appliance Warehouse modeling example, plus Jake's separately contributed frontend prototype. The original Word/PDF submissions are not uploaded here. Nothing in this README claims instructor approval or a completed software application._
