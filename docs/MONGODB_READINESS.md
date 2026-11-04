# MongoDB readiness — FinSight

**Status:** MongoDB Atlas is the selected database platform for the next FinSight backend milestone. **No Atlas project, cluster, database, collection, database user, IP access list, connection string, or production data has been created by this repository update.**

This document turns the Sprint 4–6 logical design and the merged frontend into a concrete MongoDB implementation handoff so the database can be created later without re-deciding the basic structure.

## Decision

- **Selected database:** MongoDB Atlas.
- **Database name when created:** `finsight` (recommended).
- **Current repository state:** database design only; no MongoDB connection.
- **MongoDB ChatGPT plugin:** available for later creation/inspection work.
- **Authentication:** still a separate decision. MongoDB will store application profile references and private product data, but FinSight should not invent its own plaintext-password system.
- **Market-data provider:** still unselected.
- **AI provider:** still unselected.

MongoDB Atlas was selected after the team/project owner considered MongoDB, Supabase, Neon and other hosted options. The selection does **not** change the original FR-01–FR-08 requirements or the Sprint 5 logical data stores.

## Source-to-database mapping

The combined Sprint 4–5 model defines four logical stores:

| Logical store | Required information | MongoDB physical collections |
| --- | --- | --- |
| **D1 User Profiles** | user identity/profile reference, unique email concept, created time | `user_profiles` |
| **D2 Market Data Cache** | symbol/company, price, currency, provider, quote time, historical prices | `instruments`, `quotes`, `daily_prices` |
| **D3 Watchlists** | user-owned saved symbols and added time | `watchlist_items` |
| **D4 Analysis History** | analysis request metadata, symbol, time, status, result reference | `analysis_runs` |

Sprint 6's **User, Stock, Watchlist, MarketData, AIAnalysis and StockComparison** are logical objects. They are **not** a requirement to create exactly six collections. Stock comparison can be computed from stored market data; a separate saved-comparison collection is optional.

## Phase 1 collections — ready to create later

1. **`user_profiles`** — application profile linked to the authentication identity.
2. **`instruments`** — ticker/company/exchange/currency identity.
3. **`quotes`** — timestamped market quote snapshots and source/freshness metadata.
4. **`daily_prices`** — historical daily prices used by charts, comparisons and risk calculations.
5. **`watchlist_items`** — private user-owned saved securities.
6. **`analysis_runs`** — FR-04 / FR-08 AI-analysis request/result metadata and status.

These six collections are the **database-ready MVP baseline**. They deliberately do **not** include bank accounts, merchant spending, financial goals, brokerage credentials or trade orders.

## Optional Phase 2 collections — do not create until scope is approved

The project has earlier or proposed ideas for:

- `portfolios`, `holdings`, `investment_transactions` — self-entered portfolio recordkeeping only.
- `research_sources`, `claims`, `claim_evidence` — source provenance and claim corroboration.
- `company_relationships` — verified subsidiaries, suppliers, customers or partnerships.
- `ai_conversations`, `ai_messages`, `research_reports` — proposed conversational FinSight AI.
- `topic_subscriptions`, `alerts` — original news/alert concept.

These are **not approved Sprint 4–6 MVP collections**. Do not create them automatically with Phase 1.

## MongoDB implementation rules

- Use MongoDB schema validation for required fields and allowed enums where practical.
- Store money/price values with **Decimal128** or fixed minor-unit integers; do not rely on imprecise binary floating point for persisted financial values.
- Store timestamps as BSON Date values and retain the provider's original market/quote time.
- Store ISO currency codes explicitly.
- Create unique compound indexes where the logical model requires uniqueness.
- Never expose `MONGODB_URI` to client-side JavaScript.
- Route all database access through the server/backend.
- Do not store plaintext passwords, market API keys, AI API keys, or MongoDB credentials in collections or Git.
- A browser-provided user ID is never enough to authorize private data; derive the current user from the authenticated server session.
- Keep fictional frontend sample symbols/data separate from live market collections.

## Required indexes when created

| Collection | Index |
| --- | --- |
| `user_profiles` | unique `auth_user_id`; optional unique normalized email if the chosen auth system requires it |
| `instruments` | unique `{ exchange: 1, symbol: 1 }` |
| `quotes` | `{ instrument_id: 1, quote_time: -1 }` |
| `daily_prices` | unique `{ instrument_id: 1, date: 1, provider: 1 }` |
| `watchlist_items` | unique `{ user_id: 1, instrument_id: 1 }`; plus `{ user_id: 1, added_at: -1 }` |
| `analysis_runs` | `{ user_id: 1, requested_at: -1 }` and `{ symbol: 1, requested_at: -1 }` |

Retention/TTL for quote cache and AI-analysis history should be decided after provider terms, privacy rules and course requirements are confirmed.

## Backend compatibility

Jake's current frontend already expects these response shapes in `app/lib/types.ts`:

- `StockSummary`
- `Quote`
- `PriceHistory`
- `AiExplanation`
- `User`
- `WatchlistItem`

The real backend should either preserve these contracts or change them deliberately in a reviewed PR. `app/lib/api.ts` remains the frontend's single adapter and currently returns fictional data.

## Exact next steps when the team is ready

1. Use the MongoDB Atlas plugin to create/select the FinSight Atlas project and free cluster.
2. Create a least-privilege database user and appropriate network access.
3. Create database `finsight`.
4. Create the six Phase 1 collections with validators.
5. Create indexes from [MONGODB_SCHEMA.md](MONGODB_SCHEMA.md).
6. Add the real connection string only to secure server environment settings, never GitHub.
7. Build a server-only MongoDB connection module.
8. Implement secure auth/session ownership.
9. Replace mock watchlists first, then market-data cache, then AI-analysis metadata.
10. Run cross-user authorization, duplicate-index, stale-data and provider-failure tests before using real user data.

## Readiness checklist

- [x] Sprint 4–6 requirements mapped to data.
- [x] Sprint 5 D1–D4 mapped to physical MongoDB collections.
- [x] Sprint 6 logical objects reconciled with persistence.
- [x] Current frontend contracts mapped to backend responses.
- [x] MongoDB Atlas selected as database platform.
- [x] Collection names, fields and indexes drafted.
- [x] Public repo has no MongoDB credentials.
- [ ] MongoDB Atlas project/cluster created.
- [ ] Database and collections created.
- [ ] Validators and indexes applied.
- [ ] Authentication provider/session design finalized.
- [ ] Market-data provider selected/licensed.
- [ ] AI provider selected and evaluated.
- [ ] Backend connected and integration tests passed.

**The repository is ready for the database-creation step, but that step has intentionally not been performed yet.** Actual creation is tracked in [GitHub Issue #84](https://github.com/JustEmre12/FinSight/issues/84).

[MongoDB schema](MONGODB_SCHEMA.md) · [Database design background](DATABASE_DESIGN_PLAN.md) · [Frontend/backend handoff](FRONTEND_BACKEND_HANDOFF.md) · [Current status](PROJECT_STATUS.md)
