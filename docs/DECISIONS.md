# Scope conflicts and open team decisions

**Do not silently merge incompatible assignment versions.**

| Question | What the materials say | Decision still needed |
| --- | --- | --- |
| Core purpose | Sprints 1–2: financial-news/information aggregation; Sprint 3: portfolio tracking; Sprints 4–6: stock research | Confirm baseline with the whole team/instructor; Sprint 6 continues stock-research scope; latest object model and combined Sprint 4/5 logical model are working references |
| News and alerts | Central to Sprint 1–2; not separate FR in Sprint 4/5 | Explicitly approve for MVP or move to later phase |
| Bank links, budgets, merchant expenses, financial goals | Generic Fintech Data Tree | Not MVP without changed requirements |
| Provider and licensing | No vendor contracts or costs evidenced | Choose API and validate usage/redistribution terms, limits, quote freshness |
| AI provider | Sprint 5 says external AI analysis service | Choose provider, server-side controls and evaluation |
| Stack, backend and DB | Logical model only | Approve architecture and developer setup |
| Feature status | Docs exist; functional prototype not evidenced | Track working code and tested demos separately |
| Repository access | Team charter names roles, but does not establish invitations | Verify each member accepted collaborator invite |
| Public/private | Repo currently public | Decide whether to restrict access before uploading original class files |

Proposed first engineering slice: market lookup + dated quotes + basic chart; then private accounts/watchlist, AI explanation, risk and comparisons. This is a proposal, not a final team vote.

## Sprint 6 pending design-gate decisions (October 28 document)
| Issue | Sprint 6 recommendation / status | Required action |
| --- | --- | --- |
| Approval to enter detailed design | **Conditional approval recommended**, not granted | Obtain and record management/instructor decision |
| Object model validation | Six object definitions and logical associations provided; no types/cardinalities fixed | Team review objects, relationships, method contracts and persistence |
| Primary use case completeness | Four names, only UC-01 and UC-02 described fully | Determine whether to author new UC descriptions for Manage Watchlist and Compare Stocks |
| Provider terminology and balanced DFD flows | Sprint 6 proposes alignment with original Sprint 4/5 SRD | Update source documents only with team agreement; repository documentation indicates corresponding actor names |
| Authentication / AI explanation | Watchlist needs signed-in investor; AI results informational | Approve requirement acceptance and security/error details |
| MVP implementation order | Accounts, search, reliable market data, AI explanations, watchlists; compare/charts follow | Confirm plan, taking care not to silently rewrite Sprint 4 priorities |

See [Sprint 6 modeling](SPRINT6_OBJECT_ORIENTED_MODEL.md) and [review checklist](SPRINT6_DESIGN_REVIEW.md). No provider, stack, legal/data license, instructor sign-off or running app is evidenced as of the update.
