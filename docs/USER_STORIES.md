# All seven FinSight user stories

The numbered stories were supplied in **FinSight - User Stories.docx**, and repeated in Sprints 4–5. The checklists below are intended engineering acceptance conditions, not finished work.

## US-01 — Stock Search (FR-02; High)
> As an investor, I want to search for stocks using a company name or ticker symbol so that I can quickly find information about companies I am interested in.
- [ ] Search company names and tickers.
- [ ] Show relevant match and navigation to stock details.
- [ ] Explain invalid/empty/no-match inputs.

## US-02 — Stock Market Data (FR-03; High)
> As an investor, I want to view current and historical stock prices so that I can understand how a stock has performed over time.
- [ ] Display available quote and historical price data.
- [ ] Display provider, currency, source time, freshness.
- [ ] Handle API outages, missing or delayed quotes.

## US-03 — AI-Powered Market Analysis (FR-04; High)
> As a beginner investor, I want AI to explain stock performance and market trends in simple language so that I can better understand financial information and make informed decisions.
- [ ] Request an analysis grounded in known market context.
- [ ] Clearly label generated text and uncertainty.
- [ ] Avoid guaranteed returns, unsupported precision or personal buy/sell instructions.

## US-04 — Personalized Watchlist (FR-01, FR-05; Medium)
> As an investor, I want to save stocks to a personal watchlist so that I can easily track companies I am interested in without searching for them every time.
- [ ] Add/view/remove tickers as an authenticated user.
- [ ] Persist watchlist across sessions.
- [ ] Prevent one user accessing another user's entries.

## US-05 — Stock Comparison (FR-06; Medium)
> As an investor, I want to compare multiple stocks based on their prices, performance, and market trends so that I can evaluate different investment opportunities.
- [ ] Compare two or more stocks across the same dates.
- [ ] Clearly distinguish dollars, percentages and other measures.
- [ ] Handle unaligned/missing history.

## US-06 — Financial Charts and Visualizations (FR-07; Medium)
> As a user, I want to view stock performance through interactive charts and graphs so that I can easily identify patterns and understand market movements.
- [ ] Show clear period/axes/source; responsive view.
- [ ] Provide keyboard-friendly and accessible data alternative.
- [ ] Show failure/empty states.

## US-07 — Investment Risk Analysis (FR-08; High)
> As an investor, I want to understand the potential risks associated with different stocks so that I can make more informed investment decisions and avoid unnecessary financial losses.
- [ ] Explain historical volatility and price changes.
- [ ] Separate past performance from forecasts.
- [ ] Include date/source and no-advice caveats.

**Additional required work:** FR-01 sign-up/login is tracked in its own engineering issue. News aggregation/alerts are historic candidate features, not yet formally part of US-01–US-07.
