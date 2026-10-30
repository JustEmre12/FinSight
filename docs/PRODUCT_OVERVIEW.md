# FinSight — Product Overview

**Product:** FinSight — AI-Powered Financial Market Analysis Platform  
**Phase:** Sprint 6 Object-Oriented Modeling documented; detailed design review/approval pending  
**Audience:** Beginner investors and individuals researching publicly traded stocks  
**Course:** BCS 301W, Fall 2026

## Short product description

FinSight is a proposed AI-assisted stock research website that brings key market information into one organized place. Users would be able to find stocks, explore historical prices, view charts and comparisons, save watchlists, and read easy-to-understand AI-generated explanations and general risk information.

FinSight is intended to **support research** and does not execute investments, hold money, provide personalized financial advice, or guarantee predictions.

## Problem to solve

The team's preliminary investigation found that individual investors must search across financial websites, company information, news sources, and social media to understand potential investments. Sources can differ in recency, reliability, and relevance, making it time-consuming to compare information and recognize meaningful developments.

The Five Whys and fishbone studies identified **fragmented information and manual filtering** as the core research problem. FinSight's original vision emphasizes aggregation and simplified interpretation.

## Intended user journey

1. **Find a stock.** Search a company name or ticker; validate it before calling a provider.
2. **Review data.** View available quotes and historical information with the provider and timestamp visible.
3. **Understand performance.** Inspect a historical price chart or compare multiple companies.
4. **Request AI explanation.** If a valid stock is selected, the system gathers relevant market data and asks an external AI service to explain it in beginner-friendly terms.
5. **Check limitations.** See an AI-content disclosure, potential historical risk, and a helpful error if data or services are unavailable.
6. **Follow companies.** Signed-in users can maintain personal watchlists and return to saved stocks.

These are planned behaviors, **not a demonstration of a working application**.

## Core MVP baseline from Sprint 4–6

| Feature | Requirement | Primary value |
| --- | --- | --- |
| User accounts | FR-01 | Secure personalized access |
| Stock search | FR-02 | Find companies and tickers |
| Quotes and history | FR-03 | See available market data and timestamps |
| AI market explanations | FR-04 | Understand financial information more easily |
| Personal watchlist | FR-05 | Follow stocks without repeated searching |
| Stock comparison | FR-06 | Evaluate performance using consistent periods |
| Historical charts | FR-07 | Understand performance patterns |
| General risk analysis | FR-08 | Understand uncertainty and historic volatility |

[Requirements](REQUIREMENTS.md) · [User stories](USER_STORIES.md) · [Acceptance and test plan](TEST_PLAN.md)

## Object-oriented design baseline (Sprint 6)

The six logical objects are **User, Stock, Watchlist, MarketData, AIAnalysis, StockComparison**. The four named primary use cases are **Search Stocks**, **Generate AI Analysis**, **Manage Watchlist**, and **Compare Stocks**.

The supplied Sprint 6 document details **UC-01 Search for a Stock** and **UC-02 Generate AI Market Analysis**. It also includes the object relationship diagram, two sequence diagrams, AIAnalysis and Watchlist state diagrams, and the combined search/analysis activity diagram.

**Watchlist** requires authentication; its model moves between Empty and Populated. **AIAnalysis** moves Requested → Processing → Completed or Failed. These are conceptual behavior models, not an existing implementation.

[Sprint 6 models](SPRINT6_OBJECT_ORIENTED_MODEL.md) · [Sprint 5 system diagrams](SYSTEM_DESIGN.md) · [Traceability matrix](TRACEABILITY.md)

## Scope and important distinctions

**Within the current stock research baseline:** accounts, stock data, searching, comparisons, charts, AI explanation, risk context, watchlists, responsive browser access.

**Earlier ideas requiring a scope decision:** financial news and article aggregation, personalized news/market alerts, industry and topic following, social sentiment, manual portfolio transactions and allocation. Sprint 1–2 featured news and filtering prominently; Sprint 3 emphasized portfolio tracking. Sprint 4–6 narrow the technical model to stock research. The team still needs to decide whether to promote earlier ideas to approved MVP requirements.

**Outside the documented stock-research scope:** linked bank accounts, brokerage trading/execution, custodial accounts, automatic buy/sell instructions, personalized fiduciary advice, a dedicated native mobile application, or guaranteed investment returns.

## Current project status

- **Documented:** Sprints 1–6, requirements, user stories, conceptual diagrams, feasibility, planning schedule, team roles, and draft test scenarios.
- **Pending decision/review:** Team agreement on final MVP boundaries; provider selection, licensing, refresh/freshness policy, AI service and cost, stack, database/physical design, usability validation, and management/instructor approval.
- **Not demonstrated by the repository:** A deployed website, real API integration, functional login, working watchlists, AI analysis, passing tests, or verified user-research results.

Sprint 6 **recommends conditional approval to enter detailed system design**. That recommendation should not be presented as approval already granted.

## Team and documentation

Salih — Project Manager / Business Analyst; Jake — Frontend / UI; Asad — Backend / Database; Henry — AI / Data. These roles are drawn from the October 6 charter; non-PM roles were described as proposed.

[Full documentation index](README.md) · [Roadmap](ROADMAP.md) · [Seven-stage Kanban](KANBAN.md) · [Open decisions](DECISIONS.md) · [Source inventory](SOURCE_MATERIALS.md)

_Source basis: the team's initial proposal; Sprint 2 preliminary investigation and root-cause work; Sprint 3 management plan; Sprint 4 SRD; combined Sprint 4–5 logical models; Sprint 6 Object-Oriented Modeling document. This page is a structured description of those sources rather than a claim of completed software._
