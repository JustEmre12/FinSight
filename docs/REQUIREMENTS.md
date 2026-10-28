# System Requirements — Sprint 4, revised by Sprint 5

These requirements are documented, **not implemented**.

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
