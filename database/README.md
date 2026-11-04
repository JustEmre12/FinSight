# FinSight MongoDB Atlas database

**Live status (November 3, 2026):** the FinSight MongoDB Atlas infrastructure and MVP database now exist.

## Live Atlas resources

- **Atlas project:** FinSight
- **Cluster:** FinSight-MVP
- **Tier:** Free
- **Cloud/region:** AWS US_EAST_1
- **MongoDB version:** 8.0.x
- **Database:** `finsight`
- **Application DB user:** `finsight_app`
- **Network access:** not opened broadly; deployment-specific access should be added only when the backend host is known.

No password, connection string, API key, or other secret belongs in this repository.

## Current collections

The live database contains exactly the six approved Sprint 4–6 MVP collections:

1. `user_profiles`
2. `instruments`
3. `quotes`
4. `daily_prices`
5. `watchlist_items`
6. `analysis_runs`

These implement Sprint 5 D1–D4 and support the Sprint 6 logical objects without creating one collection per class.

## Current live indexes

Normal query indexes were created through the MongoDB Atlas connector:

- `user_profiles`: `auth_user_id`, `email`
- `instruments`: `exchange + symbol`, `symbol`
- `quotes`: `instrument_id + quote_time desc`
- `daily_prices`: `instrument_id + date + provider`
- `watchlist_items`: `user_id + instrument_id`, `user_id + added_at desc`
- `analysis_runs`: `user_id + requested_at desc`, `symbol + requested_at desc`

The connector used for creation does not expose collection validators or the `unique` index option. Therefore the live database currently has the required query indexes, but **database-level uniqueness and JSON Schema validation still require the initialization script below**.

## Final integrity script

Run `mongodb-init.js` against the secure server-side connection before storing real users or production market data.

It will:

- apply strict MongoDB JSON Schema validators to all six collections;
- convert required logical uniqueness rules to unique indexes;
- preserve the existing query indexes;
- avoid inserting demo/fake financial data.

The script intentionally does **not** create:
- bank accounts;
- merchant spending;
- financial goals;
- brokerage credentials;
- trade/order records;
- proposed Phase 2 news/chat/portfolio collections.

Those remain outside the current approved MVP.

## Server-side connection

The application should receive `MONGODB_URI` through its secure deployment environment and use database `finsight`. Never expose the URI in browser code.

See:
- [MongoDB readiness](../docs/MONGODB_READINESS.md)
- [MongoDB schema](../docs/MONGODB_SCHEMA.md)
- [Frontend/backend handoff](../docs/FRONTEND_BACKEND_HANDOFF.md)
- [Issue #84](https://github.com/JustEmre12/FinSight/issues/84)
