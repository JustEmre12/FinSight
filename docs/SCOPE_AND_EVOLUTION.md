# FinSight — project evolution, approved baseline and proposed expansions

**Last synchronized:** November 3, 2026. This document preserves the meaning and differences of the supplied assignments; it does not rewrite their requirements retroactively. **No new scope has been signed off merely because it appears in this repository.**

## North star: reduce fragmented financial research

The initial FinSight concept and Sprint 2 root-cause exercises explain that investors hunt across market data sites, financial news, company announcements, public filings and social media. Information overload, source reliability, inconsistent relevance and rapidly changing facts make manual filtering difficult. The proposed product would **collect, organize, filter, analyze and explain** relevant information while keeping investors responsible for their own decisions.

The Jake and Henry Five Whys / fishbone submissions each use **People, Process, Machines, Materials and Measurement**. The diagrams analyze why relevant trustworthy information is hard to find; they are research evidence, not delivered product features. The ten prepared interview questions explore portfolio tracking, transactions, allocations, alerts and trust; **no interview responses have been provided**.

## Versions of the concept

| Period / evidence | Specific proposed focus | Status and interpretation |
| --- | --- | --- |
| Sprint 1 initial proposal | Financial news and market information consolidation; company and topic monitoring, filters, trends, summaries and alerts | Original direction; not necessarily all required for MVP |
| Sprint 2 investigation, Jake/Henry root-cause papers, journals | Reduce information overload; evaluate source quality, prioritization, feasibility, alternatives and cost | Documented research; provider costs and user validation not established |
| Sprint 3 WBS/Gantt/PERT/risks | **Portfolio management** with accounts, investments, manually recorded transactions, gain/loss, allocations | Different proposed scope; 31-day critical path is a **historical planning estimate**, not actual delivery timeline |
| October 6 team charter | Web-based stock analysis, market data, AI insight, charts, basic accounts; no trades/broker links/personal advice | Team goals and proposed roles; not product delivery evidence |
| Sprint 4 SRD; combined Sprint 4–5 requirements | **FR-01–FR-08**: account, search, quotes/history, AI explanation, watchlist, comparisons, charts, historical risk | **Latest explicit functional requirement baseline** |
| Sprint 5 logical model | 1.0 User Access, 2.0 Market Data, 3.0 Watchlists, 4.0 Comparison/Charts, 5.0 AI/Risk; D1–D4 | Logical data flows and data stores, not physical database tables |
| Sprint 6 OO model (Oct 28) | User, Stock, Watchlist, MarketData, AIAnalysis, StockComparison; use cases, message sequences, state and activity models | Design reference; **conditional approval recommended**, not granted |
| Nov 2 frontend PR [#69](https://github.com/JustEmre12/FinSight/pull/69) | Runnable Next.js sample-data UI, charts/comparisons, template explanation, mock browser auth/watchlist | Merged code, passing CI; no production services or secure account backend |
| Generic Fintech Data Tree + Jake Fintech Data Dictionary | Bank accounts, spending transactions, investment portfolios/holdings, goals and reporting | **Reusable broader-fintech example**; not automatically part of the Sprint 4–6 FinSight MVP |
| More recent FinSight AI product idea (discussion, not a submitted Sprint requirement) | Conversational research, corroboration/source validation, company relations, optional self-entered holdings, explainable investigation plans | **Proposed expansion**, requiring team decision, privacy plan and regulatory review |

## Baseline FR-01–FR-08

1. **FR-01**: secure registration/login and personalized access (High).
2. **FR-02**: search company/ticker (High).
3. **FR-03**: available quote/history and timestamps (High).
4. **FR-04**: understandable AI market explanations, disclosed as generated (High).
5. **FR-05**: private watchlists for signed-in users (Medium in Sprint 4).
6. **FR-06**: compare at least two stocks consistently (Medium).
7. **FR-07**: labeled historical charts (Medium).
8. **FR-08**: historical risk/volatility explanation (High).

Nonfunctional **NFR-01–NFR-07** include 3-second normal stock-detail goal (external delay excluded), secure authentication, usability, 99%-uptime aspiration, scaling, responsive browsers and source/time accuracy. This is a **research-support system**, not a brokerage, trading engine, bank connector, trade execution service or financial adviser. The later combined requirements explicitly exclude automated buy/sell instructions and personalized advice.

### What's *not* silently approved

- **Original vision / candidate research backlog:** articles/news feeds, topic following, source credibility, market alerts, sentiment and trend detection.
- **Sprint 3 portfolio direction / candidates:** self-entered holdings, purchases/sales **for recordkeeping**, cost basis, allocation, gains/losses and portfolio dashboards.
- **Generic Fintech reference (not FinSight MVP):** linked banking, checking/savings balances, merchant expenses, spending analysis, financial goals, actual transfers.
- **Expanded conversational AI:** chat history, research source verification, verified company links, optional holdings-informed **research scenarios**. A generated plan that tells an individual which securities to buy/sell when and where would differ from the agreed no-personalized-advice scope; review legal/compliance and revise requirements before promising that.

## Scope control / decision record template

Before moving an earlier idea into MVP: record **decision date, approvers, feature description, FR/US changes, privacy and source/licensing impacts, implementation/testing effort and Kanban issue**. Until then, mark it **Proposed / Blocked for decision / Future**, not Done. Use [DECISIONS](DECISIONS.md), [existing scope blocker #25](https://github.com/JustEmre12/FinSight/issues/25) and [the product roadmap](ROADMAP.md).

## Authorship and evidence boundaries

Team roles from charter: **Salih** project manager/business analyst; **Jake** frontend/UI; **Asad** backend/database; **Henry** AI/data. These are proposed functional responsibilities, not proof of completed assigned development. Jake's frontend source was merged via PR #69. No instructor approval, external provider contracts, deployed production service, integrated secure authentication or actual participant interviews are evidenced.

## Source navigation

[Source inventory](SOURCE_MATERIALS.md) · [Product overview](PRODUCT_OVERVIEW.md) · [Sprint 4 requirements](REQUIREMENTS.md) · [Sprint 5 logical DFD](SYSTEM_DESIGN.md) · [Sprint 6 models](SPRINT6_OBJECT_ORIENTED_MODEL.md) · [Generic Fintech dictionary distinction](FINTECH_REFERENCE_DATA_MODEL.md) · [FinSight AI proposal](FINSIGHT_AI_VISION.md).
