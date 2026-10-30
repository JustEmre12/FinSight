# Sprint 6 — Design Review / Management Gate

**Source:** "Sprint 6- Object-Oriented Modeling.docx", §§12–15.  
**Document status:** Prepared on October 28, 2026. **Instructor/management approval not evidenced.**

## Documentation completeness (existing supplied artifact)
- [x] Six logical object definitions: User, Stock, Watchlist, MarketData, AIAnalysis, StockComparison.
- [x] Object relationship diagram (Figure 6-10).
- [x] Investor/provider actors, four top-level use cases (Figure 6-15).
- [x] Detailed UC-01 Stock Search and UC-02 AI Analysis tables.
- [x] Stock-search sequence (Figure 6-18).
- [x] AI-analysis sequence (Figure 6-19).
- [x] AIAnalysis state transitions (Figure 6-20A).
- [x] Watchlist state transitions (Figure 6-20B).
- [x] Search/analysis activity diagram (Figure 6-21).
- [x] Proposed corrections to earlier Sprint 4/5 terminology and flows.
- [x] Conditional-approval recommendation and conclusion.

## Pending review / decisions (not complete)
- [ ] Team reviews diagrams, actors, flows and terminology against Sprint 4/5 materials.
- [ ] Confirm UC-01/UC-02 error-state acceptance criteria and define test cases.
- [ ] Confirm authentication for watchlists, source timestamps and visible AI disclosure.
- [ ] Decide whether to add detailed use-case narratives for Watchlist and Compare as **new design work** (not present as tables in original Sprint 6).
- [ ] Determine object-to-physical-schema mapping without treating logical object attributes as final database fields.
- [ ] Choose licensed market-data provider, freshness policy and budget.
- [ ] Choose AI service, reliability evaluation and privacy controls.
- [ ] Confirm technical architecture, tech stack and real delivery schedule.
- [ ] Obtain management/instructor approval **before claiming progression to detailed design approved**.

## Priorities *recommended in Sprint 6* (not implemented)
1. Secure accounts.
2. Stock search.
3. Reliable stock market data retrieval.
4. AI explanations (informational, with disclosure).
5. Watchlist management.
6. Stock comparisons and advanced charts *after core behavior is validated*.

## Evidence required to advance
Record decisions in [DECISIONS](DECISIONS.md), update links in [TRACEABILITY](TRACEABILITY.md), and attach teammate review/approval to relevant GitHub Issues. Product code, provider integration, security testing and actual stakeholder approval remain unverified.
