# FinSight Frontend Prototype — November 2, 2026

**Status:** Merged sample-data frontend baseline; **not production-ready**.  
**Code author:** @JakePepitone.  
**Pull request:** [#69](https://github.com/JustEmre12/FinSight/pull/69).  
**Merged commit:** [0e72ed89](https://github.com/JustEmre12/FinSight/commit/0e72ed89df00a248901d3fe1c89f5c04079106bf).  
**CI:** [Frontend checks — PR run](https://github.com/JustEmre12/FinSight/actions/runs/41519999919) — passed lint, TypeScript, unit tests and production build.

## Purpose

This is the first runnable **interface demonstration** for the FinSight research concept described in Sprints 1–6. It demonstrates the intended user experience and frontend data contracts using fictitious stocks. It does **not** validate financial data sources, a production AI service, secure authentication or actual investing functionality.

## Technology and setup

The `app/` directory contains a Next.js App Router application built with React, TypeScript, Tailwind CSS and Recharts. Run locally from that directory:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. There is no configured deployment.

Automated checks (all passed on the reviewed PR head `633fd37e`):

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The `Frontend checks` GitHub Actions workflow now runs on pull requests touching `app/` and pushes to `main`.

## Demonstrated pages and behaviors

| Screen / behavior | Current evidence | Production work still pending |
| --- | --- | --- |
| Stock search | Search by company/ticker with invalid, empty and no-match UI | Licensed search/market API, caching, integration |
| Stock details | Price/history presentation with sample provider, timestamps, freshness states | Real, appropriately licensed quotes |
| Historical charts | Labeled chart/time ranges, numeric data table | Real history and manual accessibility review |
| Comparison | Align 2–5 sample stocks by shared dates, compare percentages and currency | Real quotes/data validation |
| Risk | Historical change, volatility and drawdown presentation | Reviewed calculations, historical metrics and domain QA |
| Explanation panel | **Local template-generated** explanatory text, uncertainty and disclosure | Real AI service, source grounding, validation and budget |
| Login/signup | **Mock** browser-only identity with localStorage, password not verified | Secure backend auth, password hashing, sessions |
| Watchlist | **Mock** browser-local persistence by demo identity | Secure server persistence and authorization |

Sample symbols include `NOVA`, `NVGU`, `GRNL`, `MAPL`, `BRKW`, `QTRX`, `LUMA` and `ZZZT` to demonstrate ordinary, currency, stale, missing-history and outage states. These are **not authentic market quotes**.

Screenshots provided in [`app/docs/screenshots/`](../app/docs/screenshots/) illustrate the proposed UI. They are not evidence of real financial data or backend connectivity.

## Code layout

- [`app/app/`](../app/app/) — pages and route handling.
- [`app/components/`](../app/components/) — reusable layout, charts, search, comparison, watchlist and explanation UI.
- [`app/lib/api.ts`](../app/lib/api.ts) — typed demo data adapter; future backend integration point.
- [`app/lib/sample-data.ts`](../app/lib/sample-data.ts) — fictional market data.
- [`app/lib/types.ts`](../app/lib/types.ts) — frontend data contracts.
- [`app/lib/risk.ts`](../app/lib/risk.ts), [`compare.ts`](../app/lib/compare.ts), [`search.ts`](../app/lib/search.ts) — calculations and validation.
- [`app/tests/lib.test.ts`](../app/tests/lib.test.ts) — unit tests for selected logic.
- [`app/README.md`](../app/README.md) — full frontend setup and sample-data scenarios.

## Known limitations and safety boundaries

1. **All sample stock data is fictional.** No provider has been selected; provider names/timestamps shown in the demo should never be marketed as live licensed quotes.
2. **No actual AI model is integrated.** Explanations come from code-defined templates; the UI's generator information and sample banner are essential.
3. **Demo accounts are not authentication.** The browser stores a demo email identity and local watchlist. Enter only fictitious/demo account details; real user data is not protected by server authorization.
4. **CI is not equivalent to manual QA.** Browser, mobile, keyboard/screen-reader testing and integration/security acceptance checks remain open.
5. **No trading, predictions, brokerage access, bank accounts or personalized investment advice** are implemented.

## Next actions

- Choose market-data provider and licensing: [#26](https://github.com/JustEmre12/FinSight/issues/26).
- Choose AI provider, costs and output-review rules: [#27](https://github.com/JustEmre12/FinSight/issues/27).
- Design real authentication and private storage: [#35](https://github.com/JustEmre12/FinSight/issues/35), [#44](https://github.com/JustEmre12/FinSight/issues/44), [#40](https://github.com/JustEmre12/FinSight/issues/40).
- Integrate APIs and harden tests/security: [#46](https://github.com/JustEmre12/FinSight/issues/46), [#47](https://github.com/JustEmre12/FinSight/issues/47).
- Review interface against the [requirements](REQUIREMENTS.md), [Sprint 6 design](SPRINT6_OBJECT_ORIENTED_MODEL.md) and [test plan](TEST_PLAN.md).

**Issue tracking:** The full functional requirements and stories remain **open** until real integration and acceptance tests are completed. Prototype completion is tracked separately in [#70](https://github.com/JustEmre12/FinSight/issues/70).