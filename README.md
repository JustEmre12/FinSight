# FinSight
**AI-assisted financial market research, explained simply.**

FinSight is a proposed website that helps beginner and individual investors research stocks from one organized place. The planned experience brings together market data, historical charts, stock comparisons, personal watchlists, and AI-generated explanations that make financial information easier to understand.

**Current phase:** Sprint 6 object-oriented modeling **documented** → detailed system design **pending review/approval**.  
**Project:** BCS 301W · Systems Analysis & Design · Fall 2026  
**Team:** Salih, Jake, Asad, and Henry

> **Project status:** This repository contains the team's project planning, requirements, system models, and work tracking. **It does not yet contain a running or deployed FinSight website.** Completed modeling assignments do not mean software features have been implemented.

## Explore FinSight

| Start here | Purpose |
| --- | --- |
| **[Product Overview](docs/PRODUCT_OVERVIEW.md)** | What FinSight aims to do, who it serves, and the intended user experience |
| **[Work Board / Kanban](docs/KANBAN.md)** | Planned, active, review, completed, blocked, and future work |
| **[All GitHub Issues](https://github.com/JustEmre12/FinSight/issues)** | Track tasks, requirements, reviews, and progress |
| **[Documentation Hub](docs/README.md)** | Browse every sprint, model, requirement, and project document |
| **[Sprint 6 Object-Oriented Models](docs/SPRINT6_OBJECT_ORIENTED_MODEL.md)** | Objects, relationships, use cases, sequences, state transitions, and activity flows |
| **[Roadmap](docs/ROADMAP.md)** | What the team has documented and what must happen next |

## Product goal

Individual investors often switch between separate sources for stock prices, historical data, market analysis, and financial news. FinSight aims to reduce that research effort by presenting selected information in a clear, beginner-friendly interface.

The latest **Sprint 4–6 requirements and models** focus on a stock **research-support** website. Financial-news aggregation, market alerts, and broader portfolio features appear in earlier project ideas but are **not automatically included in the current MVP**.

### Proposed core features

| Requirement | Planned capability | Implementation |
| --- | --- | --- |
| FR-01 | Secure user registration and login | Not implemented |
| FR-02 | Search stocks by company name or ticker | Not implemented |
| FR-03 | View available quotes, historical prices, and timestamps | Not implemented |
| FR-04 | Request plain-language AI market explanations | Not implemented |
| FR-05 | Add and remove stocks from a personal watchlist | Not implemented |
| FR-06 | Compare two or more stocks | Not implemented |
| FR-07 | View historical price charts | Not implemented |
| FR-08 | Understand general investment risk and volatility | Not implemented |

**[Full functional/nonfunctional requirements](docs/REQUIREMENTS.md)** · **[Seven user stories](docs/USER_STORIES.md)** · **[Requirements-to-design traceability](docs/TRACEABILITY.md)**

## Project progress — October 30, 2026

| Sprint | Documented work |
| --- | --- |
| 1 — Proposal | Problem statement, business case, and project concept |
| 2 — Investigation | Five Whys, fishbone diagrams, SWOT, feasibility, risks |
| 3 — Project management | Work Breakdown Structure, Gantt, PERT/CPM, risk response |
| 4 — Requirements | FR-01–FR-08, NFR-01–NFR-07, user stories, acceptance criteria |
| 5 — Logical modeling | Functional decomposition, context and data-flow diagrams, data dictionary |
| **6 — Object-oriented modeling** | **Six objects; four named use cases; two detailed use-case descriptions; object relationship, derived class, sequence, state and activity diagrams** |

**Status:** The submitted Sprint 6 material **recommends conditional approval** to enter detailed system design. It does not establish that management/instructor approval was granted. The market-data provider, AI service, technology stack, and working application still require decisions and development.

### Task tracking

The project has **68 GitHub Issues** in the October 30 snapshot: **21 closed documentation/modeling tasks and 47 open tasks**.

[View seven-stage Kanban](docs/KANBAN.md) · [Browse Issues](https://github.com/JustEmre12/FinSight/issues) · [Read-only interactive board source](board/index.html)

The seven stages are **Product Backlog, Ready, In Progress, In Review, Done, Blocked, Future**. Some In Progress items represent provisional planning focus, not verified engineering activity. The interactive board reads live public Issues when served, but GitHub Pages is **not currently enabled**, and this is **not** a native GitHub Projects drag-and-drop board.

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
| [docs/](docs/README.md) | Project overview, discovery, Sprints 1–6, requirements, diagrams, risks, planning, testing and status |
| [board/](board/README.md) | Read-only GitHub Issues Kanban webpage (not hosted yet) |
| [app/](app/README.md) | Placeholder and guidance for future app implementation; **no working app yet** |
| [.github/](.github/) | Feature and bug issue templates, pull-request template |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Team collaboration and review workflow |
| [.env.example](.env.example) | Empty configuration variable template; **no real credentials** |

## Contributing and next steps

1. Review the [Sprint 6 design gate](docs/SPRINT6_DESIGN_REVIEW.md) and [scope decisions](docs/DECISIONS.md).
2. Resolve access and provider dependencies in [GitHub Issues](https://github.com/JustEmre12/FinSight/issues).
3. Agree on the implementation stack and convert designs to small feature branches and reviewed pull requests.
4. Demonstrate and test each story before moving an **implementation** issue to Done.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the group's suggested workflow.

---

**Important:** FinSight is intended for informational investment research. It does **not** execute trades, hold funds, provide personalized financial advice, or guarantee outcomes. Market information must display its source and freshness, and AI-generated content must be identified as such.

_This public repository contains organized summaries of the team's **15 supplied project documents**. The original Word/PDF submissions are not uploaded here. Nothing in this README claims instructor approval or a completed software application._
