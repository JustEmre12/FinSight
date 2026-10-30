# Logical data dictionary — Sprint 5, terminology aligned with Sprint 6

| Store | Conceptual fields | Role |
| --- | --- | --- |
| D1 User Profiles | user_id PK, unique email, password_hash, created_at | Identity and authentication |
| D2 Market Data Cache | symbol+quote_time key, company_name, price, currency, historical_date, historical_close, provider | Timestamped quotes/history |
| D3 Watchlists | watchlist_item_id PK, user_id FK, symbol, added_at | Private saved symbols |
| D4 Analysis History | analysis_id PK, optional user_id FK, symbol, requested_at, status, summary_reference | Analysis metadata; avoid sensitive raw prompts |

## External entities
Investor/User; Market Data Provider; AI Analysis Service.

## Logical data flows
- Credentials: email, transient password, authentication_status.
- Search: query_text, symbol, company_name, result_status.
- Quotes: symbol, date_range, price, quote_time, source.
- Watchlists: user_id, symbol, operation, saved_symbols.
- Compare/chart: symbols, date_range, comparison_values, chart_points.
- Insights: symbol, analysis_type, explanation_text, risk_notes, data_timestamp.
- AI prompts: market_context, question, generated_explanation.

## Rules
Passwords stored securely hashed, not in raw form; unique email; authenticated owner controls watchlist; ticker and analysis type validated; provider and quote times displayed; failed external calls handled; AI identified as generated rather than personalized advice.

**Do not turn the two generic Fintech Data Tree copies into FinSight tables without approval.** They describe bank accounts, personal expenses, financial goals and merchant transactions for broader fintech systems. These are outside the later stock-research system boundary. Physical database design remains to be chosen.

## Sprint 6 object-to-store mapping (conceptual, not a schema migration)
| Sprint 6 object | Exact Sprint 6 attributes | Related Sprint 5 store |
| --- | --- | --- |
| User | userID, name, email, passwordHash | D1 User Profiles |
| Stock | stockID, ticker, companyName, currentPrice | D2 market data and stock search (no physical Stock table specified) |
| Watchlist | watchlistID, userID, stockList | D3 Watchlists |
| MarketData | dataID, stockID, price, timestamp | D2 Market Data Cache |
| AIAnalysis | analysisID, stockID, summary, status | D4 Analysis History |
| StockComparison | comparisonID, stockIDs, results | No distinct Sprint 5 store specified |

**Alignment cautions:** This is a crosswalk, **not** an assertion that Sprint 5's user_id, quote_time, summary_reference, etc. have been renamed or migrated. The source §12 proposes aligning dictionary *terms* with User, Stock, Watchlist, MarketData and AIAnalysis, while the §2 table also defines StockComparison. Whether StockComparison results require persistence and which classes map to separate database tables remain open physical-design questions.

**State semantics:** AIAnalysis.status ∈ {Requested, Processing, Completed, Failed} in the Sprint 6 model; Watchlist's Empty/Populated states derive from current stock count, not a required stored state field. [Sprint 6 diagrams](SPRINT6_OBJECT_ORIENTED_MODEL.md).
