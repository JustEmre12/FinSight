# Proposed Roadmap

## Completed *documentation* (not software)
- [x] Sprint 1 proposal, initial project journal.
- [x] Sprint 2 investigation, two root-cause variants, feasibility.
- [x] Sprint 3 WBS, Gantt, critical-path network and risk plan.
- [x] Sprint 4 requirements and seven user stories.
- [x] Sprint 5 context, functional decomposition, data flows, dictionary.
- [x] Sprint 6 object tables, relationships, actors/use cases, sequences, state/activity diagrams and consistency recommendations **documented**.
- [x] Repository documentation and Issue tracking baseline.

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
- [ ] Decide technical stack, AI service and architecture.
- [ ] Produce reviewed responsive wireframes, data design and test fixtures.

## Engineering MVP — Sprint 6 recommended order
**Suggested sequence in Sprint 6:** Secure accounts → Stock search → Market data retrieval → AI explanation → Watchlist; then comparisons and advanced charts after validated core capabilities. This is a recommendation, not an implemented feature or override of Sprint 4 priority labels.

- [ ] Responsive shell and navigation.
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

## Future only if approved
News/article ingestion and alerts; manual portfolio records; social sentiment; premium billing; mobile-native app.

Items only move to **Done** with a real deliverable or tested implementation. See [KANBAN](KANBAN.md) and GitHub Issues.
