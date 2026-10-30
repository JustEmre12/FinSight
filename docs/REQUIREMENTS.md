# System Requirements — Sprint 4/5 baseline, clarified in Sprint 6

These requirements are documented, **not implemented**. Sprint 6 §12 explicitly says to **retain FR-01–FR-08**, require authentication for personalized watchlists and label AI summaries as informational. Sprint 6 does **not** introduce new FR identifiers.

## Functional requirements
| ID | What the system shall do | Priority in Sprint 4 |
|---|---|---|
| FR-01 | Register and securely authenticate users | High |
| FR-02 | Search stocks by ticker or company name | High |
| FR-03 | Show available quotes, historical prices and data timestamps | High |
| FR-04 | Provide understandable AI-generated explanations of market activity | High |
| FR-05 | Add/view/remove stocks in a personal watchlist | Medium |
| FR-06 | Compare two or more stocks using consistent measures and periods | Medium |
| FR-07 | Display understandable, labeled price charts and trends | Medium |
| FR-08 | Explain risks such as historical volatility and price changes | High |

## Nonfunctional requirements
| ID | Target / constraint |
|---|---|
| NFR-01 | Standard stock details within 3 seconds under normal operating conditions, excluding external provider delay |
| NFR-02 | Secure authentication, encrypted transport, secure password handling and access control |
| NFR-03 | Accessible, organized, beginner-friendly UI |
| NFR-04 | Aim for 99% availability, excluding scheduled maintenance |
| NFR-05 | Scale to more accounts and stock lookups |
| NFR-06 | Support modern browsers and desktop/tablet/mobile sizes |
| NFR-07 | Use reliable providers and clearly show update time, source and stale or missing data |

## Acceptance criteria
- [ ] Sign up, log in and access own personalized information.
- [ ] Search by symbol or company name; handle invalid symbols.
- [ ] View current/available historical market data and timestamps.
- [ ] Request AI explanation with AI label and proper uncertainty caveats.
- [ ] Add and remove personal watchlist entries, with owner-based access.
- [ ] Compare at least two stocks on common measures/date ranges.
- [ ] View labeled historical stock chart and understandable empty/error states.
- [ ] Read general risk information without personalized advice.

## Traceability
FR-02 → US-01; FR-03 → US-02; FR-04 → US-03; FR-01 & FR-05 → US-04; FR-06 → US-05; FR-07 → US-06; FR-08 → US-07.

**Sources:** FinSight - Sprint 4.docx; Combined System Requirements Document and Logical Model.docx. Source APIs, AI costs, provider licenses and architecture remain open decisions.

## Sprint 6 behavior and acceptance refinements
| Requirement | Clarification from Sprint 6 | Source evidence |
| --- | --- | --- |
| FR-01 / FR-05 | Investor must sign in before personal watchlist operations; Watchlist states Empty and Populated | Use-case actors and Fig. 6-20B |
| FR-02 / FR-03 | UC-01 validates ticker before provider request; result shows original source/timestamp or understandable error | UC-01 and Fig. 6-18 |
| FR-04 | UC-02 retrieves market context before AI call; success displays explanation **and AI disclosure**; missing data/failed request returns error | UC-02, Fig. 6-19 |
| FR-04 / FR-08 | AIAnalysis status transitions Requested → Processing → Completed or Failed; explanatory content is informational | Fig. 6-20A |
| FR-06 | Compare Stocks is a named investor use case; no separate detailed UC table supplied | Fig. 6-15 |
| FR-07 | Historical stock/chart use remains required; Sprint 6 suggests advanced charts after core function validation | Recommendation §14 |

**Implementation order is not the same as requirement priority:** the Sprint 4 document calls FR-05 Medium, whereas Sprint 6 recommends building watchlist management among the early core functions. Do not silently alter the original Sprint 4 priority table without a team decision.

[Full Sprint 6 models](SPRINT6_OBJECT_ORIENTED_MODEL.md) · [Traceability](TRACEABILITY.md) · [Design review gate](SPRINT6_DESIGN_REVIEW.md).
