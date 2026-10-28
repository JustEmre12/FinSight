# FinSight — AI-Powered Financial Market Research

> **Project stage: Systems analysis completed in documents; implementation not yet demonstrated.**  
> **Course:** BCS 301W · Systems Analysis & Design · Fall 2026  
> **Team:** Salih (Project Manager / Business Analyst), Jake (Frontend / UI), Asad (Backend / Database), Henry (AI / Data)

FinSight is a proposed web application for beginner and individual investors. It aims to bring stock-market information into one easy-to-use research space with historical prices, stock comparisons, watchlists, clear charts, AI-assisted explanations, and investment-risk context. The broader original vision also includes financial news and trend detection.

**Research support only.** FinSight is not a brokerage, does not execute trades or hold funds, and is not intended to provide personalized investment advice or guaranteed predictions.

## Current progress — October 28, 2026

| Area | Evidence / current state |
| --- | --- |
| Sprint 1 | Initial proposal and problem framing documented |
| Sprint 2 | Preliminary investigation, Five Whys, fishbone, SWOT, feasibility documented |
| Sprint 3 | WBS, Gantt schedule, PERT/CPM critical path, risk register documented |
| Sprint 4 | Functional / nonfunctional requirements and user stories documented |
| Sprint 5 | Context, functional decomposition, Level 0 & 1 DFDs, data dictionary documented |
| Actual product implementation | **Not verified / not started in this repository** |
| APIs and AI model | Not selected or integrated |
| User research and design validation | Questions prepared; completed interviews and tested prototype not evidenced |

**Documentation completed ≠ code implemented.** Items shown as “Done” on our work board refer to the *documented deliverable*, not working product functionality.

## Start here

- [Project goals and boundaries](docs/PROJECT_BRIEF.md)
- [Requirements FR-01–FR-08 and NFR-01–NFR-07](docs/REQUIREMENTS.md)
- [All user stories US-01–US-07](docs/USER_STORIES.md)
- [System diagrams and logical model](docs/SYSTEM_DESIGN.md)
- [Data dictionary](docs/DATA_DICTIONARY.md)
- [Sprint history and completed artifacts](docs/SPRINT_HISTORY.md)
- [Work breakdown / schedule](docs/PROJECT_SCHEDULE.md)
- [Risk management](docs/RISK_REGISTER.md)
- [Team charter and responsibilities](docs/TEAM_CHARTER.md)
- [Project roadmap and milestones](docs/ROADMAP.md)
- [Kanban task board](docs/KANBAN.md)
- [Source-document inventory (14 provided files)](docs/SOURCE_MATERIALS.md)
- [Open decisions and discrepancies](docs/DECISIONS.md)
- [How we collaborate](CONTRIBUTING.md)
- [All GitHub Issues](../../issues)

## Feature baseline

| ID | Function | Priority in Sprint 4 |
| --- | --- | --- |
| FR-01 | Register and sign in securely | High |
| FR-02 | Search by company/ticker | High |
| FR-03 | View quotes, history, timestamps | High |
| FR-04 | AI-generated understandable analysis | High |
| FR-05 | Personalized watchlist | Medium |
| FR-06 | Compare multiple stocks | Medium |
| FR-07 | Labeled stock charts | Medium |
| FR-08 | Explain historical risk / volatility | High |

All eight are **requirements**, not finished implementations. The [work board](docs/KANBAN.md) separates documentation completion from engineering work.

## Team and workflow

| Team member | Role from October 6 charter |
| --- | --- |
| Salih | Project management, requirements, meetings, progress |
| Jake | Frontend, UI/UX, charts, navigation |
| Asad | Backend, database, financial APIs, authentication |
| Henry | AI / data analysis, trend and insight work |

Roles other than project manager were proposed in the charter and can change after team agreement. Use a feature branch and pull request for implementation; link each change to an Issue. Never commit API keys or financial account credentials.

## Scope caution

Some early files discuss banking, transactions, financial goals or portfolio management; the **Sprint 4+5 combined logical model** explicitly treats FinSight as a **stock research system** and excludes brokerage trading, linked banks, custodial portfolios and personal financial advice. We preserve those broader ideas as historical or future-scope suggestions rather than silently treating them as approved MVP features.

## Getting started

This repository begins with a **planning and tracking baseline**, not a deployed website. Next decisions: confirm MVP scope, validate data provider licensing and AI costs, pick a stack, produce UI wireframes, then build small tested vertical slices. See [roadmap](docs/ROADMAP.md) and [issues](../../issues).

_This documentation was prepared from the team's supplied project materials. Original .docx/.pdf files remain outside this repository unless the team chooses to upload them separately._
