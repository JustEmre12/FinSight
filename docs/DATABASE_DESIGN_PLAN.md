# FinSight database design plan — proposed physical implementation

**State:** Design proposal only. **No MongoDB Atlas/Supabase/Neon project has been provisioned, connected, migrated or approved.** Do not commit connection strings, secret tokens, or real customer/holding data. This document translates *logical requirements* to candidate physical data structures. It does not replace the source dictionary.

## 1. Official logical baseline — source traceability

| Sprint 5 store | Source logical fields | Related Sprint 6 objects | Candidate physical representation |
| --- | --- | --- | --- |
| **D1 User Profiles** | `user_id`, unique `email`, `password_hash`, `created_at` | User | `user_profiles` + secure auth provider's identity store |
| **D2 Market Data Cache** | `symbol`+`quote_time`, company_name, price, currency, history date/close, provider | Stock, MarketData | `instruments`, `quotes`, `daily_prices` |
| **D3 Watchlists** | `watchlist_item_id`, `user_id`, `symbol`, `added_at` | Watchlist, User, Stock | `watchlist_items` (or embedded items in user-owned watchlists) |
| **D4 Analysis History** | `analysis_id`, nullable `user_id`, `symbol`, `requested_at`, `status`, `summary_reference` | AIAnalysis | `analysis_runs` with metadata, optional summary pointer |
| Not an explicit store | Comparison calculations | StockComparison | Calculate on demand; `saved_comparisons` only if approved |

A **logical object is not necessarily one table**. StockSummary/Quote/PriceHistory/AiExplanation in the frontend are **API response shapes**, not automatically persistent entities.

## 2. Minimal candidate database for Sprint 4–6 MVP

| Candidate | Key fields | Index / integrity expectation |
| --- | --- | --- |
| `user_profiles` | `auth_user_id`, display_name, created_at | unique auth identity; email uniqueness handled by authentication provider |
| `instruments` | symbol, name/company_name, exchange, currency, asset_type | unique exchange+symbol where appropriate; verified identifiers |
| `quotes` | symbol/instrument_id, provider, quote_time, price, currency, delay_minutes, retrieved_at, freshness_status | query by instrument+time; retain original provider data timestamp |
| `daily_prices` | instrument_id, date, provider, close, currency, retrieved_at | unique instrument+date+provider; retain revisions policy |
| `watchlist_items` | user_id, instrument_id/symbol, added_at | unique user+instrument; **server-enforced** owner access |
| `analysis_runs` | id, optional user_id, symbol, analysis_type, requested_at, status, data_as_of, generator, summary_reference, error_code | statuses `Requested` / `Processing` / `Completed` / `Failed` and retention |

**Required behavior:** unique account emails; verified signed-in owner for watchlists; validated symbols and analysis requests; available source/currency/time for quotes; proper unavailable/stale errors; generated content clearly labeled informational. Do not treat password_hash in the logical dictionary as a requirement to implement password handling from scratch. Use a mature auth provider/framework and secure, server-side sessions.

## 3. Practical MongoDB mapping (if MongoDB is selected)

MongoDB can use the candidate names as **collections**, with ObjectId/UUID foreign references and schema validation. For financial quantities, avoid imprecise floating-point storage: use **Decimal128** (or fixed minor units as integers for currency amounts), explicit ISO currencies and consistent dates. Define ownership, role checks and unique compound indexes. Do not expose the database connection to the browser; the Next.js server would handle access.

Example suggested indexes:
- `instruments`: unique {exchange:1, symbol:1}.
- `daily_prices`: unique {instrument_id:1, date:1, provider:1}.
- `watchlist_items`: unique {user_id:1, instrument_id:1}; query {user_id:1, added_at:-1}.
- `analysis_runs`: {user_id:1, requested_at:-1}; {symbol:1, requested_at:-1}.
- `quotes`: {instrument_id:1, quote_time:-1}; stale/expiry policy after provider licensing review.

PostgreSQL is also valid; use native keys, constraints, NUMERIC, RLS where applicable, and migrations. **The user has discussed free MongoDB, Supabase, Neon, and free-tier AI; no actual vendor selection or integration is evidenced.**

## 4. Planned backend contract → Jake's real frontend

`app/lib/api.ts` is currently the single entry point and returns fictional data. The existing interfaces are in `app/lib/types.ts`:
- `StockSummary`: symbol, companyName, exchange, currency.
- `Quote`: symbol, companyName, exchange, currency, nullable price/previousClose/change/changePercent, quoteTime, provider, delayMinutes.
- `PriceHistory`: symbol, currency, provider, period, points [{date,close}], retrievedAt, firstAvailableDate.
- `AiExplanation`: symbol, generatedAt, dataAsOf, generator, paragraphs[], uncertaintyNotes[].
- `User`: id, email, createdAt. `WatchlistItem`: symbol, addedAt.

A real backend should **match these contracts or revise them deliberately in a reviewed PR**. Keep quote data/source provenance and historical alignment. Replace mock auth/context and browser localStorage with secure backend sessions plus server-authorized watchlists. Do **not** merely set `IS_SAMPLE_DATA=false` while still returning sample data.

See [frontend-backend integration plan](FRONTEND_BACKEND_HANDOFF.md).

## 5. Optional future expansion (requires signed-off scope)

| Candidate data | Purpose and privacy |
| --- | --- |
| `portfolios`, `holdings` | Optional manually entered positions, quantity/cost basis and valuation; sensitive user-owned data |
| `investment_transactions` | **Recordkeeping** of user-entered buys/sells, **not orders**, bank transactions or real trade execution |
| `research_sources`, `claims`, `claim_evidence` | Publication URL, source publisher, claim, competing evidence, review outcome and as-of timestamp |
| `company_relationships` | Company-to-company relationship type, source link, confirmation status and effective date |
| `ai_conversations`, `ai_messages` | Authorized user conversation history with retention/deletion rules |
| `research_reports` | Sourced company research and **scenario-based** checklists; not guaranteed or personalized trade directives |
| `topic_subscriptions` / `alerts` | Original Sprint 1–2 aggregation/alerts idea, only if approved |

For AI and news, prefer storing **links, necessary excerpts and licensing-compliant metadata** over copying entire copyrighted articles; avoid saving raw sensitive investment holdings in prompts/history without consent and a defined retention purpose.

## 6. Decisions needed before any database work

1. Agree on baseline vs optional FinSight AI/portfolio/news scope ([issue #25](https://github.com/JustEmre12/FinSight/issues/25)).
2. Select managed database, free-tier caveats, auth and backup/recovery plan ([issue #28](https://github.com/JustEmre12/FinSight/issues/28), [#30](https://github.com/JustEmre12/FinSight/issues/30)).
3. Choose licensed stock/market/news data providers and freshness policy ([#26](https://github.com/JustEmre12/FinSight/issues/26)).
4. Choose an AI service and evaluate privacy, operating limits and output reliability ([#27](https://github.com/JustEmre12/FinSight/issues/27)).
5. Document migration/validation rules, owner access, indexes, failure tests and real retention/backups before using personal information.

**No real database or API keys are stored in this repo.** A provider's free plan can have size/request limits; it is not an unconditional promise of unlimited cost-free service.

[Official data dictionary](DATA_DICTIONARY.md) · [Generic fintech reference](FINTECH_REFERENCE_DATA_MODEL.md) · [Roadmap](ROADMAP.md) · [AI design](FINSIGHT_AI_VISION.md).
