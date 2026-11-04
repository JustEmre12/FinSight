# FinSight MongoDB schema — implementation draft

**Status:** **Implemented as the live Phase 1 Atlas collection layout.** All six collections below exist in the `finsight` database and their query indexes are present. The Atlas connector used for provisioning cannot set JSON Schema validators or `unique` index flags; [`database/mongodb-init.js`](../database/mongodb-init.js) contains the exact remaining integrity commands to apply before real data.

## 1. user_profiles

Purpose: application profile information tied to a secure authentication identity.

| Field | BSON type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | yes | MongoDB document ID |
| `auth_user_id` | String | yes | Stable identity from chosen auth/session system |
| `email` | String | yes | Normalized email; uniqueness depends on auth architecture |
| `display_name` | String | no | Optional user display name |
| `created_at` | Date | yes | Account/profile creation time |
| `updated_at` | Date | yes | Last profile update |
| `status` | String | yes | `active`, `disabled` or other approved values |

Indexes: unique `auth_user_id`; optionally unique normalized `email`.

Do **not** store plaintext passwords. If an external auth provider manages passwords, MongoDB should store only the identity/profile reference needed by FinSight.

## 2. instruments

Purpose: canonical security/company identity used by search and market data.

| Field | BSON type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | yes | Instrument ID |
| `symbol` | String | yes | Uppercase ticker |
| `company_name` | String | yes | Display company/security name |
| `exchange` | String | yes | Exchange/venue |
| `currency` | String | yes | ISO currency code |
| `asset_type` | String | yes | e.g. `stock`; expand only if approved |
| `provider_symbol` | String | no | Provider-specific symbol if needed |
| `active` | Boolean | yes | Current lookup availability |
| `created_at` | Date | yes | First local record time |
| `updated_at` | Date | yes | Last metadata refresh |

Index: unique `{ exchange: 1, symbol: 1 }`. Search indexes may be added after real lookup behavior is tested.

## 3. quotes

Purpose: timestamped latest/recent quote snapshots with provenance and freshness.

| Field | BSON type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | yes | Quote record ID |
| `instrument_id` | ObjectId | yes | References `instruments._id` |
| `symbol` | String | yes | Denormalized for API/logging convenience |
| `price` | Decimal128/null | yes | Null allowed for provider missing-price state |
| `previous_close` | Decimal128/null | no | Provider value if available |
| `change` | Decimal128/null | no | May be computed |
| `change_percent` | Decimal128/null | no | May be computed |
| `currency` | String | yes | ISO currency |
| `provider` | String | yes | Actual source/provider name |
| `quote_time` | Date/null | yes | Provider market-data time; null if unavailable |
| `retrieved_at` | Date | yes | Time FinSight obtained the data |
| `delay_minutes` | Int32 | yes | Provider delay disclosure |
| `freshness_status` | String | yes | e.g. `fresh`, `delayed`, `stale`, `missing` |

Index: `{ instrument_id: 1, quote_time: -1 }`.

Do not invent a quote when the provider returns no data. Preserve the stale/missing/error behavior already demonstrated by the frontend.

## 4. daily_prices

Purpose: historical price points used by FR-03, FR-06, FR-07 and FR-08.

| Field | BSON type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | yes | History record ID |
| `instrument_id` | ObjectId | yes | References instrument |
| `symbol` | String | yes | Denormalized ticker |
| `date` | Date | yes | Trading date normalized consistently |
| `close` | Decimal128 | yes | Required baseline from current UI |
| `open` | Decimal128 | no | Provider permitting |
| `high` | Decimal128 | no | Provider permitting |
| `low` | Decimal128 | no | Provider permitting |
| `volume` | Decimal128/Int64 | no | Provider permitting |
| `currency` | String | yes | ISO currency |
| `provider` | String | yes | Source |
| `retrieved_at` | Date | yes | Cache retrieval time |

Index: unique `{ instrument_id: 1, date: 1, provider: 1 }`.

## 5. watchlist_items

Purpose: D3 user-owned saved securities.

| Field | BSON type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | yes | Watchlist item ID |
| `user_id` | ObjectId/String | yes | Authorized FinSight user/profile identity |
| `instrument_id` | ObjectId | yes | References instrument |
| `symbol` | String | yes | Denormalized for response convenience |
| `added_at` | Date | yes | Save time |

Indexes:
- unique `{ user_id: 1, instrument_id: 1 }`
- `{ user_id: 1, added_at: -1 }`

Authorization rule: the server session's user must match `user_id`. The API must not trust an arbitrary browser-supplied user ID.

## 6. analysis_runs

Purpose: D4 metadata for FR-04 / FR-08 AI analysis lifecycle.

| Field | BSON type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | yes | Analysis ID |
| `user_id` | ObjectId/String/null | no | Optional owner if saved for a signed-in user |
| `instrument_id` | ObjectId | yes | Analyzed security |
| `symbol` | String | yes | Ticker |
| `analysis_type` | String | yes | Approved analysis category |
| `requested_at` | Date | yes | Request time |
| `completed_at` | Date/null | no | Completion/failure time |
| `status` | String | yes | `Requested`, `Processing`, `Completed`, `Failed` |
| `data_as_of` | Date/null | no | Market data timestamp grounding the analysis |
| `generator` | String/null | no | Actual AI model/service when connected |
| `summary_reference` | String/null | no | Reference to saved result if retention is approved |
| `error_code` | String/null | no | Safe failure category |
| `created_at` | Date | yes | Local creation time |

Indexes:
- `{ user_id: 1, requested_at: -1 }`
- `{ symbol: 1, requested_at: -1 }`

Avoid retaining raw prompts or private portfolio details unless a future approved use case requires them and a retention/privacy policy is in place.

## Comparisons and charts

`StockComparison` from Sprint 6 does **not** require its own Phase 1 collection. The backend can retrieve aligned `daily_prices` for selected instruments, calculate comparable returns/risk values, and return the result. Add `saved_comparisons` only if a future requirement says users must save comparison sessions.

## Phase 2 — proposed, not part of current database creation

Do not create these until the team approves their product scope:

- `portfolios`
- `holdings`
- `investment_transactions`
- `research_sources`
- `claims`
- `claim_evidence`
- `company_relationships`
- `ai_conversations`
- `ai_messages`
- `research_reports`
- `topic_subscriptions`
- `alerts`

The generic FinTech Data Dictionary's **Bank Accounts, merchant Transactions and Financial Goals** remain outside the current FinSight stock-research database.

## Validation/testing before real data

When created, verify:

- duplicate instrument index rejects duplicate exchange+symbol;
- duplicate watchlist item is prevented;
- user A cannot read/write user B's watchlist;
- missing quote fields remain null rather than fabricated;
- source/provider, currency and quote timestamps are always returned when available;
- stale quote handling matches frontend warnings;
- Decimal128 round-trips correctly through server JSON conversion;
- analysis status only uses approved Sprint 6 values;
- database/API errors return safe UI states without leaking credentials.

[MONGODB_READINESS](MONGODB_READINESS.md) · [Official logical dictionary](DATA_DICTIONARY.md) · [Sprint 6 model](SPRINT6_OBJECT_ORIENTED_MODEL.md) · [Frontend types](../app/lib/types.ts)
