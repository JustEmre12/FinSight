# Fintech Data Tree and Jake's Data Dictionary — reference, not approved FinSight schema

**Source:** `Fintech Data Tree.docx` (and byte-identical uploaded copies) plus Jake Pepitone's `Fintech Data Dictionary.docx`. The source dictionary uses **SQL-style tables**, primary/foreign keys, VARCHAR, DECIMAL and TIMESTAMP. This page summarizes it faithfully without pretending it has been implemented.

## What the reference diagram shows

The data tree runs **FinTech System → major branches → subcategories/data elements**. Its main branches are **User Management, Bank Accounts, Transactions, Investment Portfolio, Financial Goals, Financial Analysis & Reporting**. The tree is about **data hierarchy**; it is *not* a data-flow diagram, UML class model, or implementation. Its account and transaction branches include generic personal banking and spending categories, outside the combined Sprint 4–5 FinSight stock-research boundary.

## Six tables in the supplied generic Fintech dictionary

| Source table | Key and relationship | Selected exact fields | Notes from source |
| --- | --- | --- | --- |
| **Users** | `user_id` primary key; unique `email` | `first_name`, `last_name`, `email`, `password_hash`, `created_at`, `account_status` | Password hashes, active/inactive/suspended |
| **Bank Accounts** | `account_id` PK, `user_id` FK | `bank_name`, `account_type`, `account_mask` (last four digits), `balance`, `currency`, `last_updated` | Bank-account connection **not in current FinSight MVP** |
| **Transactions** | `transaction_id` PK, `account_id` FK | `transaction_date`, `transaction_type`, `amount`, `category`, `description`, `transaction_status` | Source examples include deposits, withdrawals, transfers, merchant spending |
| **Investment Portfolio** | `portfolio_id` PK, `user_id` FK | `portfolio_name`, `total_value`, `risk_level`, `created_at`, `last_updated` | Overlaps Sprint 3 portfolio concept, not required by Sprint 4/5 |
| **Investment Holdings** | `holding_id` PK, `portfolio_id` FK | `asset_symbol`, `asset_name`, `quantity`, `purchase_price`, `current_price`, `market_value` (calculated) | Stock/ETF holding tracking for an optional future portfolio feature |
| **Financial Goals** | `goal_id` PK, `user_id` FK | `goal_name`, `target_amount`, `current_amount`, `target_date`, `goal_status` | Generic goals, **not** FR-01–FR-08 |

The source's ER-style relationship diagram shows **Users 1:N Bank Accounts; Bank Accounts 1:N Transactions; Users 1:N Portfolios; Portfolios 1:N Holdings; Users 1:N Goals**. These are **reference associations only**; no actual tables or collections exist.

### Business rules from the submitted dictionary

- BR-01 unique email; BR-02 bank account must have valid owner.
- BR-03 positive transaction amount with type determining direction.
- BR-04 non-negative quantities in a long-only portfolio.
- BR-05 financial goal targets positive.
- BR-06 time-stamped bank-balance updates.
- BR-07 hashed passwords, never plaintext.
- BR-08 financial data accessible only by authorized users.

The document also recommends sensitive-data encryption, secure authentication, access controls, audit logging, retention and **not storing banking passwords**. Implementing those policies would require engineering work.

## What belongs in the FinSight system instead?

The **combined Sprint 4/5 data dictionary** has **D1 User Profiles, D2 Market Data Cache, D3 Watchlists, D4 Analysis History**. The **Sprint 6** objects are **User, Stock, Watchlist, MarketData, AIAnalysis, StockComparison**. These are the latest documented stock-research baseline, **not** the six Fintech banking tables above.

| Generic reference | Possible FinSight reuse | Status |
| --- | --- | --- |
| Users | Account/profile concepts compatible with FR-01 | Required user features; physical schema TBD |
| Portfolio/Holdings | Optional self-entered holdings to support portfolio-aware research | Proposed only (Sprint 3 and later user idea) |
| Transactions | Optional *investment recordkeeping* (not brokerage trade execution) | Proposed only |
| Bank Accounts | None in current Sprint 4–6 research scope | Out of scope |
| Financial Goals | Could inform future research preference questions, not financial goal management MVP | Out of scope |
| Financial Analysis & Reporting | Conceptual inspiration for risk explanation and AI research | FR-04 / FR-08 portions are required; detailed data TBD |

**Do not migrate these SQL types/fields directly into MongoDB without a physical schema decision.** Database choice (MongoDB Atlas, hosted Postgres, etc.), authentication provider, migrations, data policy and vendor budget are unapproved as of this synchronization.

## Related non-FinSight assignment

`AW Chapter 6 - SIM Object Modeling.docx` is about **Appliance Warehouse Service Information Manager**, with customers, technicians, appointment setters and parts. Its use cases, diagrams and objects are valid as a **class modeling exercise only**. They are **not** FinSight actors, collections or tasks. It must not contaminate FinSight's system models.

[Official FinSight logical dictionary](DATA_DICTIONARY.md) · [Physical database plan](DATABASE_DESIGN_PLAN.md) · [Scope/version reconciliation](SCOPE_AND_EVOLUTION.md).
