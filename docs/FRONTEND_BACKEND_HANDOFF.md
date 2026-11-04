# FinSight frontend-to-backend engineering handoff

**Evidence:** [Merged PR #69](https://github.com/JustEmre12/FinSight/pull/69) by Jake Pepitone (November 2, 2026), current `app/` source, Sprint 5 data flows, Sprint 6 OO model and the 16-slide backend presentation. **The backend presentation is a design deck, not a running API.** **MongoDB Atlas is now selected for persistence, but no Atlas database is provisioned or connected.** Auth, market provider and AI inference are still not connected.

## Existing runnable frontend

- `app/`: Next.js App Router, React, TypeScript, Tailwind CSS, Recharts.
- `app/app/`: routes for home/search, stock detail, comparison, login, signup and watchlist.
- `app/components/`: chart, comparison, risk, sample-data banner, explanation, login and watchlist UI.
- `app/lib/types.ts`: exact shared client-side shapes (`StockSummary`, `Quote`, `PriceHistory`, `AiExplanation`, `User`, `WatchlistItem`).
- `app/lib/api.ts`: **only data-access adapter** today returning fictional records from `sample-data.ts`. `IS_SAMPLE_DATA = true`; no provider secret may live here because browser imports it.
- `app/components/auth-context.tsx`: mock identity in browser localStorage, not safe authentication; passwords are **not verified**.
- `app/tests/lib.test.ts`: selected unit tests; `.github/workflows/frontend-ci.yml` verifies lint, TypeScript, tests and build.
- `app/docs/screenshots/`: 16 screenshot assets, including mobile, comparison, auth, errors and missing/stale quote states.

The uploaded `FinSight-feature-frontend.zip` and its `(1)` copy are the **same source snapshot** and predate the merged repository's CI/handoff additions. Do not replace the newer `main` with an older ZIP. Jake's GitHub work must remain credited to him.

## Five backend processes — exact source naming

| Process | Required behavior | Logical store / external service | Existing demo vs missing backend |
| --- | --- | --- | --- |
| 1.0 Manage User Access | Sign up, authenticate, user-owned data | D1 User Profiles | Mock UI; no secure auth |
| 2.0 Retrieve Market Data | Validate ticker, fetch/cache quote and history, provider/time labels | D2 Market Data Cache + Market Data Provider | Fictional adapter data; no vendor API |
| 3.0 Manage Watchlists | Add/view/remove only signed-in user's symbols | D3 Watchlists | Browser-local watchlist; no persistent secure storage |
| 4.0 Compare and Visualize Stocks | Align historical dates, percentages, labels and chart points | Read D2 | Sample comparisons/charts exist; no live source |
| 5.0 Generate AI and Risk Insights | 5.1 validate → 5.2 market context → 5.3 AI request → 5.4 review answer → 5.5 return/store metadata | D2 + external AI service + D4 Analysis History | Template explanation only; no AI calls or D4 |

**Sprint 6** adds User, Stock, Watchlist, MarketData, AIAnalysis, StockComparison and models search/analysis sequences. Preserve `AIAnalysis Requested→Processing→Completed/Failed`; preserve Watchlist `Empty↔Populated`, and the user's ownership boundary.

## Exact interface contracts to protect

| Existing call in `app/lib/api.ts` | Current behavior | Production backend proposal |
| --- | --- | --- |
| `searchStocks(query)` | Searches fictitious in-memory symbols | GET `/api/stocks/search?q=...` |
| `getStockSummary(symbol)` | Returns mock stock name/exchange/currency | GET `/api/stocks/:symbol` |
| `listAvailableStocks()` | Lists sample stocks | GET `/api/stocks` (bounded list) |
| `getQuote(symbol, now?)` | Sample quote incl. nullable fields, provider/quoteTime/delayMinutes | GET `/api/stocks/:symbol/quote` |
| `getPriceHistory(symbol, period, now?)` | Sample historical daily points | GET `/api/stocks/:symbol/history?period=1M` |
| `getAiExplanation(symbol, now?)` | Local template strings; label says no model | POST `/api/analysis` with validated symbol/analysis type |
| `getWatchlist(userId)` | Browser localStorage per mock identity | GET `/api/me/watchlist` (derive user from session, **not** arbitrary client userId) |
| `addToWatchlist(userId,symbol)` | Browser localStorage append | POST `/api/me/watchlist` with symbol; server authorization |
| `removeFromWatchlist(userId,symbol)` | Browser localStorage delete | DELETE `/api/me/watchlist/:symbol`; server authorization |

**Endpoint paths are proposals, not implemented code or source-documented routes.** Preserve return types, error semantics (including `StockNotFoundError` / `ProviderUnavailableError`), period definitions and meaningful UI warnings. Resolve scope and privacy before modifying these interfaces.

## Safe incremental integration plan

1. **Database is selected: MongoDB Atlas.** Review [MONGODB_READINESS](MONGODB_READINESS.md) and [MONGODB_SCHEMA](MONGODB_SCHEMA.md); then choose auth/market/AI providers. Never commit credentials.
2. Implement authenticated backend sessions and access-controlled user profile/watchlist records. Test user A cannot read user B data.
3. Build a server-only market provider adapter. Validate symbols, attach **provider+quoteTime+currency+delayMinutes**, handle stale/no-data/timeout/rate limit.
4. Replace the sample adapter **function by function** with backend fetch; do not hide the banner until live data truly replaces the sample.
5. Add real external AI request with *dated* market context, disclosed model, response-review/uncertainty checks and D4 metadata; avoid personal advice claims.
6. Align comparison/chart math on history from same windows; keep demo-specific edge-case fixtures for tests.
7. Run lint, typecheck, Vitest, build, plus end-to-end auth, privacy, provider-failure, mobile and accessibility testing.
8. Deploy *only after* provenance, privacy and provider terms have been reviewed. Do not equate a successful build with production acceptance.

## Key test scenarios already modeled in the frontend

- `NOVA` / `NVGU` / `GRNL`: normal matching sample stock lists.
- `MAPL`: CAD currency.
- `BRKW`: intentionally stale quote.
- `QTRX`: missing current quote.
- `LUMA`: short historical range.
- `ZZZT`: provider outage.
- Unsupported symbol (example `AAPL` in mock sample app) → **no demo result**, not proof AAPL does not exist in reality.

These are fictional demonstration symbols/prices; **do not store as actual tradeable instruments** in a future live financial database without clear test-fixture separation.

## Responsibilities and status

The charter suggests Jake (UI), Asad (backend/database/APIs), Henry (AI/data) and Salih (requirements/project management), but the allocation is not proof tasks are underway. Track real changes in [GitHub Issues](https://github.com/JustEmre12/FinSight/issues), PRs and [current status](PROJECT_STATUS.md). No backend code is claimed to exist because of the uploaded PowerPoint.

[Frontend handoff](FRONTEND_PROTOTYPE.md) · [Backend logical diagrams](SYSTEM_DESIGN.md) · [MongoDB readiness](MONGODB_READINESS.md) · [MongoDB schema](MONGODB_SCHEMA.md) · [Database design](DATABASE_DESIGN_PLAN.md) · [Sprint 6 model](SPRINT6_OBJECT_ORIENTED_MODEL.md).
