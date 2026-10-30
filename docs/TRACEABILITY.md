# FinSight Requirements → Sprint 6 Object / Use Case Traceability

**Status:** Mapping for planning/design, *not* implementation verification. Sources: Sprint 4 SRD, combined Sprint 4/5 logical model, Sprint 6 object-oriented document. Original Sprint 6 defines six objects and **two detailed use-case descriptions (UC-01, UC-02)**; the remaining two use cases appear by name only in the use-case diagram.

| Functional requirement | User story | Sprint 6 objects | Sprint 6 use case / behavior | Existing engineering issue |
| --- | --- | --- | --- | --- |
| FR-01 Secure register/login | Supports US-04 | User, Watchlist | Watchlist requires signed-in investor; User.register/login/logout | [#44](https://github.com/JustEmre12/FinSight/issues/44) |
| FR-02 Stock search | US-01 | User, Stock, MarketData | **UC-01**; stock-search sequence + activity input validation | [#37](https://github.com/JustEmre12/FinSight/issues/37) |
| FR-03 Quotes / history | US-02 | Stock, MarketData | Data provider sequence; source/timestamp display | [#38](https://github.com/JustEmre12/FinSight/issues/38) |
| FR-04 AI market explanation | US-03 | Stock, MarketData, AIAnalysis | **UC-02**; AI sequence and Requested → Processing → Completed/Failed | [#39](https://github.com/JustEmre12/FinSight/issues/39) |
| FR-05 Private watchlist | US-04 | User, Watchlist, Stock | Manage Watchlist; Empty ↔ Populated transitions | [#40](https://github.com/JustEmre12/FinSight/issues/40) |
| FR-06 Stock comparison | US-05 | StockComparison, Stock, MarketData | Compare Stocks; detailed flow TBD | [#41](https://github.com/JustEmre12/FinSight/issues/41) |
| FR-07 Visualizations | US-06 | Stock, MarketData | Price-history display; detailed visual design TBD | [#42](https://github.com/JustEmre12/FinSight/issues/42) |
| FR-08 Risk information | US-07 | AIAnalysis, Stock, MarketData | General risk context; no individualized advice | [#43](https://github.com/JustEmre12/FinSight/issues/43) |

## Sprint 5 functional decomposition to Sprint 6 objects
| Sprint 5 process | Object-oriented mapping | Note |
| --- | --- | --- |
| 1.0 Manage User Access | User | Authentication protects Watchlist use case |
| 2.0 Retrieve Market Data | Stock, MarketData | Market Data Provider remains external |
| 3.0 Manage Watchlists | Watchlist, User, Stock | Owns stock references, not a brokerage order |
| 4.0 Compare and Visualize Stocks | StockComparison, Stock, MarketData | Advanced charts described as later priority |
| 5.0 Generate AI and Risk Insights | AIAnalysis, Stock, MarketData | Uses AI Service Provider; status and disclosures |

## Sprint 5 stores to Sprint 6 objects
| Logical store | Primary related Sprint 6 object(s) | Do not assume |
| --- | --- | --- |
| D1 User Profiles | User | No physical table mapping formally approved |
| D2 Market Data Cache | Stock, MarketData | No real-time data source or cache TTL chosen |
| D3 Watchlists | Watchlist, User, Stock | Ownership and auth still require implementation |
| D4 Analysis History | AIAnalysis | Whether/how summary text persists remains a design decision |

## Nonfunctional verification crosses all these flows
- NFR-01/NFR-04/NFR-05: performance, reliability, scale; includes provider outages.
- NFR-02: security, hashes, per-user access control.
- NFR-03/NFR-06: beginner UX, accessibility and responsive screens.
- NFR-07: correct source, quote time, stale data warnings.

## Traceability maintenance
Do not close a user-story implementation issue because a diagram is complete. Link a reviewed PR, passing tests, and actual demo evidence before moving any FR/US issue to Done. Design review tasks should reference this file and the source [Sprint 6 model](SPRINT6_OBJECT_ORIENTED_MODEL.md).
