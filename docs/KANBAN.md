# FinSight Kanban — November 2, 2026

**GitHub Issues snapshot:** **69 Issues**, **22 closed**, **47 open**. This is an Issue-label-based seven-stage table, not a native GitHub Projects board. Open [GitHub Issues](https://github.com/JustEmre12/FinSight/issues) or the [read-only interactive dashboard](../board/index.html) for live results; this Markdown view is a snapshot.

**Evidence rule:** Done includes **documented Sprint 1–6 deliverables** and a separate **frontend prototype merged under PR #69**. That prototype has passing automated CI, but it uses fictional market data, a local explanation template and mock accounts. **No production stock data, secure backend, actual AI service, full feature sign-off or live deployment is implied.**

## Seven-stage board

| Product Backlog (12) | Ready (12) | In Progress (4) | In Review (7) | Done (22) | Blocked (5) | Future (7) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [#37 US-01 FR-02 Implement stock search by name or ticker](https://github.com/JustEmre12/FinSight/issues/37) | [#28 FOUNDATION Select frontend, backend, database and deployment stack](https://github.com/JustEmre12/FinSight/issues/28) | [#20 PLANNING Coordinate the next sprint breakdown and owner confirmations](https://github.com/JustEmre12/FinSight/issues/20) | [#16 REVIEW Team sign-off on the stock-research MVP scope](https://github.com/JustEmre12/FinSight/issues/16) | [#1 DONE Document Sprint 1 project proposal and problem statement](https://github.com/JustEmre12/FinSight/issues/1) | [#24 ACCESS Verify Jake, Asad and Henry can contribute to FinSight](https://github.com/JustEmre12/FinSight/issues/24) | [#49 FUTURE Curated financial news and article aggregation](https://github.com/JustEmre12/FinSight/issues/49) |
| [#38 US-02 FR-03 Display timestamped current and historical stock data](https://github.com/JustEmre12/FinSight/issues/38) | [#29 DESIGN Create mobile/desktop wireframes and primary user flow](https://github.com/JustEmre12/FinSight/issues/29) | [#21 PLANNING Draft initial frontend navigation and UX flow](https://github.com/JustEmre12/FinSight/issues/21) | [#17 REVIEW Verify the Sprint 5 logical diagrams with teammates](https://github.com/JustEmre12/FinSight/issues/17) | [#2 DOCS Complete Sprint 2 Five Whys and fishbone analyses](https://github.com/JustEmre12/FinSight/issues/2) | [#25 SCOPE Resolve whether news and portfolio tracking are in MVP](https://github.com/JustEmre12/FinSight/issues/25) | [#50 FUTURE Personalized news/market alerts and subscriptions](https://github.com/JustEmre12/FinSight/issues/50) |
| [#39 US-03 FR-04 Implement AI-powered stock and trend explanations](https://github.com/JustEmre12/FinSight/issues/39) | [#30 DATABASE Define physical schema for users, watchlists, cache and analysis history](https://github.com/JustEmre12/FinSight/issues/30) | [#22 PLANNING Research backend/data service architecture](https://github.com/JustEmre12/FinSight/issues/22) | [#18 REVIEW Confirm acceptance criteria and prioritization with team](https://github.com/JustEmre12/FinSight/issues/18) | [#3 DOCS Produce Sprint 2 preliminary investigation and feasibility report](https://github.com/JustEmre12/FinSight/issues/3) | [#26 DATA Choose a licensed market provider before integration](https://github.com/JustEmre12/FinSight/issues/26) | [#51 FUTURE Manual portfolio holdings, transactions and allocation tracking](https://github.com/JustEmre12/FinSight/issues/51) |
| [#40 US-04 FR-05 Build persistent personal stock watchlists](https://github.com/JustEmre12/FinSight/issues/40) | [#31 DATA Define stock quote, search and historical-series API contracts](https://github.com/JustEmre12/FinSight/issues/31) | [#23 PLANNING Outline AI response review and grounding policy](https://github.com/JustEmre12/FinSight/issues/23) | [#19 REVIEW Review original source citations and project publication rules](https://github.com/JustEmre12/FinSight/issues/19) | [#4 DOCS Create Sprint 3 Work Breakdown Structure](https://github.com/JustEmre12/FinSight/issues/4) | [#27 AI Choose service, data handling and operating budget](https://github.com/JustEmre12/FinSight/issues/27) | [#52 FUTURE Industry/topic following and social sentiment research](https://github.com/JustEmre12/FinSight/issues/52) |
| [#41 US-05 FR-06 Compare multiple stocks on common timescales](https://github.com/JustEmre12/FinSight/issues/41) | [#32 UX Run interviews using ten prepared questions](https://github.com/JustEmre12/FinSight/issues/32) |  | [#62 S6 REVIEW Check alignment with Sprint 4 requirements and Sprint 5 DFDs](https://github.com/JustEmre12/FinSight/issues/62) | [#5 DOCS Create Sprint 3 Gantt schedule and PERT/CPM model](https://github.com/JustEmre12/FinSight/issues/5) | [#68 S6 GATE Obtain management/instructor decision on detailed system design](https://github.com/JustEmre12/FinSight/issues/68) | [#53 FUTURE Mobile-native application beyond responsive website](https://github.com/JustEmre12/FinSight/issues/53) |
| [#42 US-06 FR-07 Build historical stock charts and visualizations](https://github.com/JustEmre12/FinSight/issues/42) | [#33 QA Turn eight functional requirements into testable cases](https://github.com/JustEmre12/FinSight/issues/33) |  | [#63 S6 REVIEW Validate six classes, associations and ownership rules](https://github.com/JustEmre12/FinSight/issues/63) | [#6 DOCS Complete Sprint 3 risk register and response plan](https://github.com/JustEmre12/FinSight/issues/6) |  | [#54 FUTURE Premium subscription model and revenue analysis](https://github.com/JustEmre12/FinSight/issues/54) |
| [#43 US-07 FR-08 Show historical volatility and investment risk explanations](https://github.com/JustEmre12/FinSight/issues/43) | [#34 AI Define safe analysis prompt and output response format](https://github.com/JustEmre12/FinSight/issues/34) |  | [#64 S6 REVIEW Validate use cases, sequences, states and activity/error paths](https://github.com/JustEmre12/FinSight/issues/64) | [#7 DOCS Write FinSight Team Charter and role proposal](https://github.com/JustEmre12/FinSight/issues/7) |  | [#55 FUTURE Financial goals, banking or budgeting features](https://github.com/JustEmre12/FinSight/issues/55) |
| [#44 FR-01 Implement secure registration, login and logout](https://github.com/JustEmre12/FinSight/issues/44) | [#35 SECURITY Plan authentication and authorization flows](https://github.com/JustEmre12/FinSight/issues/35) |  |  | [#8 DOCS Prepare ten interview questions for potential investors](https://github.com/JustEmre12/FinSight/issues/8) |  |  |
| [#45 APP Create responsive application shell and navigation](https://github.com/JustEmre12/FinSight/issues/45) | [#36 WORKFLOW Establish feature-branch PR and review routine](https://github.com/JustEmre12/FinSight/issues/36) |  |  | [#9 DOCS Draft seven investor user stories US-01 through US-07](https://github.com/JustEmre12/FinSight/issues/9) |  |  |
| [#46 INTEGRATION Connect market APIs, server and UI incrementally](https://github.com/JustEmre12/FinSight/issues/46) | [#65 S6 DESIGN Expand Manage Watchlist and Compare Stocks use cases](https://github.com/JustEmre12/FinSight/issues/65) |  |  | [#10 DOCS Write Sprint 4 System Requirements Document](https://github.com/JustEmre12/FinSight/issues/10) |  |  |
| [#47 QUALITY Add automated tests, security and accessibility checks](https://github.com/JustEmre12/FinSight/issues/47) | [#66 S6 DESIGN Map OO attributes/methods to physical data and service interfaces](https://github.com/JustEmre12/FinSight/issues/66) |  |  | [#11 DOCS Produce Sprint 5 functional decomposition and context diagram](https://github.com/JustEmre12/FinSight/issues/11) |  |  |
| [#48 DELIVERY Deploy and demonstrate tested FinSight MVP](https://github.com/JustEmre12/FinSight/issues/48) | [#67 S6 QA Prepare tests for sequences, states and user-activity decisions](https://github.com/JustEmre12/FinSight/issues/67) |  |  | [#12 DOCS Produce Sprint 5 Level 0 and Level 1 data-flow diagrams](https://github.com/JustEmre12/FinSight/issues/12) |  |  |
|  |  |  |  | [#13 DOCS Define Sprint 5 data dictionary and validation primitive](https://github.com/JustEmre12/FinSight/issues/13) |  |  |
|  |  |  |  | [#14 DOCS Record project journals 1 and 2 in sprint history](https://github.com/JustEmre12/FinSight/issues/14) |  |  |
|  |  |  |  | [#15 DOCS Initialize repository documentation and source index](https://github.com/JustEmre12/FinSight/issues/15) |  |  |
|  |  |  |  | [#56 S6 DOCS Define six OO objects and their logical associations](https://github.com/JustEmre12/FinSight/issues/56) |  |  |
|  |  |  |  | [#57 S6 DOCS Record actors, four use cases and detailed UC-01/UC-02](https://github.com/JustEmre12/FinSight/issues/57) |  |  |
|  |  |  |  | [#58 S6 DOCS Document stock search and AI interaction sequences](https://github.com/JustEmre12/FinSight/issues/58) |  |  |
|  |  |  |  | [#59 S6 DOCS Document AIAnalysis and Watchlist state models](https://github.com/JustEmre12/FinSight/issues/59) |  |  |
|  |  |  |  | [#60 S6 DOCS Document search and AI-analysis activity paths](https://github.com/JustEmre12/FinSight/issues/60) |  |  |
|  |  |  |  | [#61 S6 DOCS Record prior-sprint corrections and management recommendation](https://github.com/JustEmre12/FinSight/issues/61) |  |  |
|  |  |  |  | [#70 PROTOTYPE Merge and document Jake's sample-data frontend baseline](https://github.com/JustEmre12/FinSight/issues/70) |  |  |

## Current work stage links

- [**Product Backlog (12)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Abacklog%22) — Accepted product work; full implementation not yet started.
- [**Ready (12)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Aready%22) — Work candidate sufficiently scoped to pick up.
- [**In Progress (4)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Ain-progress%22) — Provisional or underway; owner and evidence should be verified.
- [**In Review (7)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Ain-review%22) — Written artifact/plan awaiting team review or sign-off.
- [**Done (22)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Adone%22) — 21 documentary issues plus one reviewed and merged frontend prototype.
- [**Blocked (5)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Ablocked%22) — Waiting for access, scope approval, service licensing or management decision.
- [**Future (7)**](https://github.com/JustEmre12/FinSight/issues?q=label%3A%22stage%3Afuture%22) — Ideas beyond the current stock-research MVP.

## Frontend milestone

- [PR #69 — frontend prototype](https://github.com/JustEmre12/FinSight/pull/69) was merged into `main` November 2, 2026. Frontend author: **JakePepitone**.
- [CI run](https://github.com/JustEmre12/FinSight/actions/runs/41519999919) passed lint, TypeScript, unit tests and production build.
- [Prototype handoff](FRONTEND_PROTOTYPE.md) explains setup, sample features and limitations.
- [Issue #70](https://github.com/JustEmre12/FinSight/issues/70) documents prototype review and merge. **Full FR/US implementation Issues remain open.**

## Sprint 6 and forthcoming work

Sprint 6 defines the six object types, four named use cases, stock search and AI sequences, AIAnalysis/Watchlist state models and activity/error paths. It **recommends conditional approval**, rather than proving approval. See [Sprint 6 modeling](SPRINT6_OBJECT_ORIENTED_MODEL.md), [traceability](TRACEABILITY.md) and [design review](SPRINT6_DESIGN_REVIEW.md).

**Next:** Confirm scope and member access, select and license data sources, choose AI service, build secure backend accounts and watchlists, connect real providers, validate AI outputs and run comprehensive accessibility/integration tests. Do not close real-provider/user-story Issues simply because demo screens exist.

## Maintain the board

1. Open the Issue and update its acceptance checklist, evidence, owner and links to code or approvals.
2. Replace the existing `stage:` label when moving a task. Keep one stage per Issue.
3. Use pull requests and review to document code changes. A passing automated build alone is not a product acceptance test.
4. Use the [interactive dashboard](../board/index.html) for a read-only live display; native editable Projects requires a separate GitHub Projects setup.

See [CONTRIBUTING](../CONTRIBUTING.md) for branch and PR rules.
