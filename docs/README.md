# FinSight — Documentation and Project Hub

**Last reconciled: November 8, 2026.** FinSight is a student **AI-assisted stock research** project with a working sample-data frontend, a live MongoDB Atlas database, and a Groq-powered local/demo AI explanation flow. The production backend/auth and licensed market-data integration are still incomplete.

[Main README](../README.md) · [Current project status](PROJECT_STATUS.md) · [Work board](KANBAN.md) · [GitHub Issues](https://github.com/JustEmre12/FinSight/issues)

## Start with what the team is making

| Read first | What you will find |
| --- | --- |
| **[Product overview](PRODUCT_OVERVIEW.md)** | Audience, research purpose, main features and current reality |
| **[Scope and evolution](SCOPE_AND_EVOLUTION.md)** | How Sprints 1–3, 4–6 and proposed conversational FinSight AI differ |
| **[Current status and evidence](PROJECT_STATUS.md)** | What is documented, actually coded, unverified or blocked |
| **[Source material inventory](SOURCE_MATERIALS.md)** | 18 catalogued project source attachments + separate AW class example |
| **[Roadmap](ROADMAP.md)** | Proposed next steps, integration milestones and later ideas |
| **[Open decisions](DECISIONS.md)** | Features requiring team/instructor decisions and vendor choices |

## Requirements, research and team

- [Sprint 1/2 discovery and Five Whys/fishbone](RESEARCH_AND_DISCOVERY.md)
- [Initial project brief](PROJECT_BRIEF.md)
- [Sprint 4 requirements FR-01–FR-08 / NFR-01–NFR-07](REQUIREMENTS.md)
- [Seven original user stories US-01–US-07](USER_STORIES.md)
- [Prepared potential-investor questions (not completed interviews)](STAKEHOLDER_QUESTIONS.md)
- [October 6 team charter and roles](TEAM_CHARTER.md)
- **[Current team ownership and GitHub contribution matrix](TEAM_OWNERSHIP.md)**
- [Sprint 1–6 history](SPRINT_HISTORY.md)

## Logical backend and object modeling

- [Sprint 5 context, functional decomposition and Level 0/1 DFD](SYSTEM_DESIGN.md)
- [Sprint 5 D1–D4 logical data dictionary](DATA_DICTIONARY.md)
- [Sprint 6 objects, associations, use cases, sequences, states and activity](SPRINT6_OBJECT_ORIENTED_MODEL.md)
- [Sprint 6 review and conditional-approval recommendation](SPRINT6_DESIGN_REVIEW.md)
- [Requirements / objects / issue traceability](TRACEABILITY.md)
- **[Frontend-to-backend integration handoff](FRONTEND_BACKEND_HANDOFF.md)** — exact existing API contracts, backend process mapping and missing services

## Database and expanded FinSight AI

- **[Live MongoDB Atlas database](../database/README.md)** — actual FinSight project/cluster/database, collections, indexes, empty-data verification and remaining constraint step

- **[MongoDB readiness](MONGODB_READINESS.md)** — live Atlas resources, Phase 1 collections, indexes, security rules and remaining integration checklist
- **[MongoDB schema draft](MONGODB_SCHEMA.md)** — concrete fields, BSON types and indexes ready to implement
- **[Physical database design background](DATABASE_DESIGN_PLAN.md)** — source D1–D4 mapping, MongoDB persistence decisions, auth/privacy and future data
- **[Jake's generic FinTech data dictionary and tree](FINTECH_REFERENCE_DATA_MODEL.md)** — banking, spending, portfolio and goals; **separate from approved FinSight MVP**
- **[FinSight AI conversational research vision](FINSIGHT_AI_VISION.md)** — news/filings, provenance, company relationships, optional holdings, privacy and grounded research **proposed**
- [Future concepts vs approved scope](SCOPE_AND_EVOLUTION.md)

## AI implementation and quality

- **[AI analysis specification](AI_ANALYSIS_SPECIFICATION.md)** — grounding, response contract, failure rules and evaluation scenarios
- **[Groq integration guide](../app/docs/GROQ_INTEGRATION.md)** — local/demo server integration
- **[AI/risk quality](../app/docs/AI_RISK_QUALITY.md)** — grounding/risk improvements from PR #91
- **[Groq reliability](../app/docs/AI_GROQ_RELIABILITY.md)** — active PR #92 reliability work

## Executable frontend and delivery

- **[Merged Next.js frontend prototype](FRONTEND_PROTOTYPE.md)** by Jake ([PR #69](https://github.com/JustEmre12/FinSight/pull/69))
- [App setup, pages, demo symbols and mock limitations](../app/README.md)
- [Sprint 3 WBS/Gantt/PERT schedule](PROJECT_SCHEDULE.md) — **historical planning estimate**
- [Risk register](RISK_REGISTER.md)
- [Test and acceptance plan](TEST_PLAN.md) — frontend CI passes; end-to-end acceptance pending
- [GitHub Kanban snapshot](KANBAN.md) and [read-only board](../board/README.md)
- [Contribution and PR workflow](../CONTRIBUTING.md)

**No original classroom assignment files have been automatically posted to this public repo.** Documentation is a curated project reference. For actual working code, read the frontend under `app/`; the backend deck and all Mermaid diagrams are logical/design artifacts.
