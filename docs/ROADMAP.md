# Proposed Roadmap

## Completed *documentation* (not software)
- [x] Sprint 1 proposal, initial project journal.
- [x] Sprint 2 investigation, two root-cause variants, feasibility.
- [x] Sprint 3 WBS, Gantt, critical-path network and risk plan.
- [x] Sprint 4 requirements and seven user stories.
- [x] Sprint 5 context, functional decomposition, data flows, dictionary.
- [x] Sprint 6 object tables, relationships, actors/use cases, sequences, state/activity diagrams and consistency recommendations **documented**.
- [x] Repository documentation and Issue tracking baseline.

## Frontend prototype milestone (November 2, 2026)
- [x] Jake's Next.js frontend branch reviewed and merged via [PR #69](https://github.com/JustEmre12/FinSight/pull/69).
- [x] Automated frontend lint, typecheck, unit tests and build passed in GitHub Actions.
- [x] A sample-data application skeleton, pages, charts, comparisons and demo watchlists exist.
- [ ] Replace fictional quotes with approved market APIs and documented freshness/rights.
- [ ] Replace template explanations with controlled AI service integrations.
- [ ] Replace mock browser-only login/watchlists with secure backend auth/data storage.
- [ ] Complete hands-on UX, accessibility and security verification, then staging/deployment.

[Frontend prototype details](FRONTEND_PROTOTYPE.md).

## Sprint 6 transition to detailed design (not yet approved)
- [ ] Review [object-oriented Sprint 6 diagrams](SPRINT6_OBJECT_ORIENTED_MODEL.md) with the team.
- [ ] Confirm Sprint 4/5 alignment: FR-01–FR-08, authenticated watchlist, informational AI disclosures and consistent external data-flow actors.
- [ ] Validate stock-search and AI-analysis sequence error paths and state transitions.
- [ ] Seek instructor/management **conditional-approval decision**; document outcome rather than treating recommendation as approval.
- [ ] Identify unresolved physical schema, types and UML multiplicities as design decisions.

## Next: scope and foundations
- [ ] Verify GitHub access for all teammates.
- [ ] Reconcile news/alerts vs portfolio tracking vs narrower stock research.
- [ ] Review user discovery questions and carry out interviews.
- [ ] Select data provider and validate licensing/price/delay/rate limit.
- [x] **Select database platform: MongoDB Atlas.** Schema/readiness documentation prepared; database intentionally not created yet.
- [ ] Choose authentication/session solution, backend route structure, AI service and deployment architecture.
- [ ] Produce reviewed responsive wireframes, data design and test fixtures.

## MongoDB readiness milestone — November 3, 2026
- [x] MongoDB Atlas selected as the database platform.
- [x] D1–D4 mapped to six Phase 1 collections.
- [x] MongoDB field/types/index draft documented.
- [x] Six Phase 1 collections created in Atlas.
- [x] Query indexes created on all six collections.
- [ ] Apply strict JSON Schema validators and database-level unique flags using `database/mongodb-init.js` before real data.
- [x] Environment placeholders updated without real secrets.
- [x] Atlas project, free `FinSight-MVP` cluster and `finsight` database created.
- [ ] Authentication/session provider still undecided.
- [ ] MongoDB application connection code not written yet; database exists and is reachable through the Atlas connector.

[MongoDB readiness](MONGODB_READINESS.md) · [MongoDB schema](MONGODB_SCHEMA.md)

## Engineering MVP — Sprint 6 recommended order
**Suggested sequence in Sprint 6:** Secure accounts → Stock search → Market data retrieval → AI explanation → Watchlist; then comparisons and advanced charts after validated core capabilities. This is a recommendation, not an implemented feature or override of Sprint 4 priority labels.

- [x] **Prototype** responsive shell/navigation exists (real application acceptance still pending).
- [ ] **Create/connect MongoDB Atlas when ready** using [MONGODB_READINESS](MONGODB_READINESS.md) and [MONGODB_SCHEMA](MONGODB_SCHEMA.md); do not commit credentials.
- [ ] Auth with safe storage and private user sessions.
- [ ] Stock search, quote/history, timestamps and provider errors.
- [ ] Watchlist persistence.
- [ ] Historical graphs and at-least-two-stock comparison.
- [ ] Source-grounded AI explanation and historical risk context.
- [ ] Error handling, security, accessible UX and tests.

## Verify and deliver
- [ ] Review PRs and demonstrated acceptance criteria.
- [ ] Test provider failure, bad tickers, cache freshness and cross-user access.
- [ ] Evaluate AI outputs and disclaimers.
- [ ] Validate with potential users.
- [ ] Deploy a demonstration and document limitations.

## Broader vision and new product expansion (separate approval required)
- [ ] Team decision: whether original **news aggregation, source filters, topics, trends and alerts** belong to the MVP or later research phase.
- [ ] Team decision: whether earlier Sprint 3 **manual portfolio holdings and investment transactions** should be developed; avoid conflating them with generic bank/spending transactions.
- [ ] Review Jake's **generic FinTech** dictionary only as a possible portfolio reference, not the current schema.
- [ ] Define separate user stories and privacy/security acceptance for proposed **FinSight AI chat**, source verification, evidence-backed company relationships and optional user-entered holdings.
- [ ] Establish legal/compliance and source-licensing review before any individualized company buy/sell instructions are considered.

[Scope evolution](SCOPE_AND_EVOLUTION.md) · [FinSight AI vision](FINSIGHT_AI_VISION.md) · [Database plan](DATABASE_DESIGN_PLAN.md) · [Frontend/backend handoff](FRONTEND_BACKEND_HANDOFF.md).

## Future only if approved
News/article ingestion and alerts; manual portfolio records; social sentiment; premium billing; mobile-native app.

Documentation and the **prototype milestone** can be Done when verified; full FR/US implementation issues remain open until real integration and acceptance. See [KANBAN](KANBAN.md) and GitHub Issues.
