# FinSight web app (frontend)

The FinSight user interface, built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with **Recharts** for charts.

> **Sample data only.** No market-data or AI provider has been chosen yet ([docs/DECISIONS.md](../docs/DECISIONS.md), issues #26 and #27). Every page shows a **"Sample data, not real market prices"** banner. The companies and prices are fictional and generated in code.

## Backend/database status

**MongoDB Atlas is the selected database platform, but it is not created or connected yet.** The current app still runs completely from fictional sample data and browser localStorage. When backend work begins, database access must happen on the server; never import a MongoDB connection string into browser code.

See [MongoDB readiness](../docs/MONGODB_READINESS.md), [schema draft](../docs/MONGODB_SCHEMA.md), and [frontend/backend handoff](../docs/FRONTEND_BACKEND_HANDOFF.md).

## Setup

You need **Node.js 20.9 or newer** (check with `node -v`).

```bash
cd app
npm install
npm run dev
```

Then open <http://localhost:3000>.

No API keys or `.env` file are needed. Never commit keys: real provider keys will live only in server-side environment settings (see [`../.env.example`](../.env.example)).

### Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` then `npm start` | Production build and server |
| `npm test` | Unit tests (Vitest) for search, data, risk and comparison logic |
| `npm run lint` | ESLint (Next.js rules) |
| `npm run typecheck` | TypeScript check |

## What's included

| Page | Route | Requirement / story |
| --- | --- | --- |
| Search by ticker or company name, with empty, invalid and no-match messages | `/`, `/search?q=` | FR-02 · US-01 (#37) |
| Stock detail: price, change, currency, provider, price time, freshness, plus stale, missing and outage states | `/stock/NOVA` | FR-03, NFR-07 · US-02 (#38) |
| Labeled price chart with period selector (1M–5Y), axis labels, source and a data-table alternative | stock page | FR-07 · US-06 (#42) |
| Risk section: price change ($ and % shown separately), volatility, biggest drop; past data kept apart from "no forecast"; no-advice note | stock page | FR-08 · US-07 (#43) |
| AI explanation panel labeled **AI-generated**, with "How sure is this?" notes and no buy/sell advice | stock page | FR-04 · US-03 (#39) |
| Compare 2–5 stocks on shared dates: % chart, money and % columns kept separate, notes for short or missing history | `/compare?symbols=NOVA,GRNL` | FR-06 · US-05 (#41) |
| Sign up / log in (mock) and a watchlist you can add to, view and remove from | `/signup`, `/login`, `/watchlist` | FR-01, FR-05 · US-04 (#44, #40) |

### Sample tickers for testing each state

| Ticker | Shows |
| --- | --- |
| `NOVA`, `NVGU`, `GRNL` | Normal data (search "nova" returns two matches) |
| `MAPL` | Prices in Canadian dollars (CAD) |
| `BRKW` | Out-of-date quote (9 days old) |
| `QTRX` | Missing current price (history still available) |
| `LUMA` | Recently listed: short history, so comparisons use a shorter shared range |
| `ZZZT` | Data provider outage on every request |
| anything else, e.g. `AAPL` | Not found / no match |

## How the code is organized

```
app/                 Next.js routes (pages)
components/          UI pieces (chart, quote card, risk section, AI panel, forms…)
lib/api.ts           THE ONLY place the UI gets data from
lib/sample-data.ts   Fictional price generator (used only by lib/api.ts)
lib/types.ts         Shared data types, matching docs/DATA_DICTIONARY.md
lib/risk.ts          Volatility, drawdown and price-change maths
lib/compare.ts       Lines up several stocks on the same dates
lib/search.ts        Search input rules
tests/               Unit tests
docs/screenshots/    Screenshots used in the pull request
```

### Connecting the real backend later

All data goes through **`lib/api.ts`**. To switch to real data, replace the body of each function (`searchStocks`, `getQuote`, `getPriceHistory`, `getAiExplanation`, `getWatchlist`, `addToWatchlist`, `removeFromWatchlist`, …) with calls to the backend, keeping the same signatures and return types from `lib/types.ts`. Throw `ProviderUnavailableError` for outages and `StockNotFoundError` for unknown symbols, and the existing error screens will work. Then set `IS_SAMPLE_DATA = false` to hide the banner.

**Auth is a mock** (`components/auth-context.tsx`): accounts are just email addresses in the browser's localStorage, and passwords are not checked or stored. The watchlist is also in localStorage, stored separately for each user. Both are placeholders for the backend's secure auth and storage (#35, #40). Keep the `useAuth()` shape (`user`, `signUp`, `logIn`, `logOut`) when replacing it.

## Accessibility and responsiveness (NFR-03, NFR-06)

- Skip link, landmarks, one `h1` per page, labeled form fields, and errors announced to screen readers.
- Everything works with the keyboard, and focus is always visible. Period selectors are links, so they also work without JavaScript.
- Charts have a text summary for screen readers plus an expandable data table. Comparison lines use dash patterns as well as colour.
- Text colours meet WCAG AA contrast. All pages were scanned with axe-core (WCAG 2.1 A/AA) with no violations.
- Layouts were checked at mobile (390px), tablet (820px) and desktop (1280px) widths.

## Known limitations

- Prices are fictional and are regenerated from a fixed seed. Weekends are skipped, but market holidays are not.
- The AI panel shows template text, because no AI model is connected yet.
- Times are shown in UTC so the server and browser always agree.
- Mock auth is not secure and must not be deployed as real login.
