# FinSight — verified project status and evidence

**Snapshot as of November 3, 2026.** Distinguish **documented**, **working demo**, **proposed**, **blocked/undecided**, and **production-verified**. Issue labels are the live status source, not this dated snapshot.

## Verified from repository

| Deliverable / capability | Current status | Evidence | What still remains |
| --- | --- | --- | --- |
| Sprint 1/2 discovery and proposal | **Documented** | Uploaded proposal, investigation, root-cause reports, journals; [research](RESEARCH_AND_DISCOVERY.md) | User interviews/independent data-source validation |
| Sprint 3 management plan | **Documented estimate** | 9-task WBS, Gantt, 31-workday critical path, risk response | Actual dates/progress unknown; plan describes broader portfolio scope |
| Sprint 4 FR/NFR and 7 user stories | **Documented baseline** | [requirements](REQUIREMENTS.md), [user stories](USER_STORIES.md) | Real integrated acceptance testing |
| Sprint 5 functional/logical modeling | **Documented** | 5 processes and D1–D4 [system design](SYSTEM_DESIGN.md), [logical dictionary](DATA_DICTIONARY.md) | Physical database and service implementations |
| Sprint 6 OO modeling | **Documented** | 6 objects, use cases, sequences, states, activity [Sprint 6](SPRINT6_OBJECT_ORIENTED_MODEL.md) | Team/instructor approval not evidenced |
| Responsive user interface | **Working sample-data demo** | [PR #69](https://github.com/JustEmre12/FinSight/pull/69), [frontend app](../app/README.md), 16 screenshots | Real providers, secure auth, manual browser/accessibility QA |
| Search and stock details | **Demo only** | `app/lib/api.ts` / `sample-data.ts` | Licensed live data, accurate timestamps/caching |
| Charts, comparisons and risk | **Demo calculations/UI** | `app/lib/risk.ts`, `compare.ts` and screenshots | Live data and production QA |
| Log in / watchlists | **Mock browser state** | `app/components/auth-context.tsx` and `app/lib/api.ts` | Auth provider/session and owner-protected persistence |
| AI explanation | **Template text** | `getAiExplanation()` | External AI provider, response evaluation, provenance, privacy |
| Conversational verified-source FinSight AI | **Proposed expansion** | Product discussion only; [AI vision](FINSIGHT_AI_VISION.md) | Approval, architecture, source rights, implementation |
| Investment holdings and portfolios | **Earlier proposal / future** | Sprint 3 plan and Jake Fintech reference | Scope decision, data protection and user consent |
| Live database and server endpoints | **Not evidenced** | `.env.example` placeholder; backend PowerPoint is design | Vendor selection, migrations, security, integration |
| Deployed production site | **Not evidenced** | No live deployment link or production run | Deployment and production acceptance |
| GitHub Actions frontend checks | **Passed for merged prototype** | [PR run](https://github.com/JustEmre12/FinSight/actions/runs/41519999919) and post-merge run | No assertion of backend/AI tests |

## High-priority open decisions

- [#25](https://github.com/JustEmre12/FinSight/issues/25): scope reconciliation: news/portfolio vs Sprint 4–6 baseline.
- [#26](https://github.com/JustEmre12/FinSight/issues/26): licensed financial data provider/freshness.
- [#27](https://github.com/JustEmre12/FinSight/issues/27): real AI provider, handling and budget.
- [#28](https://github.com/JustEmre12/FinSight/issues/28) and [#30](https://github.com/JustEmre12/FinSight/issues/30): approved stack and database design.
- [#35](https://github.com/JustEmre12/FinSight/issues/35) and [#44](https://github.com/JustEmre12/FinSight/issues/44): private session and authentication plan.
- [#68](https://github.com/JustEmre12/FinSight/issues/68): management/instructor decision on detailed design.
- [#24](https://github.com/JustEmre12/FinSight/issues/24): collaborator access confirmation.

**No production issue is complete just because a prototype feature has a screen.** Real tests, secure integration and review are required.

## Two distinct release levels

**A. Course-appropriate demo milestone:** Clearly labeled sample data with responsive front end and visible failure cases, plus documented logical backend/OO models. This milestone is genuinely advanced by PR #69 but **not yet a fully integrated course acceptance test**.

**B. Integrated research MVP:** Actual secure user accounts, real licensed data, reliable history/quotes with freshness warnings, persistent private watchlists, a real AI explanation service, comparisons/charts, risk notes, source timestamps and tested failures. This remains **in development**.

**C. Broader product vision (not approved):** News aggregation, verified claims/company relationships, AI chat, optional holdings-aware scenario research, portfolio tracking, alerts. Requires scope and safety/legal/licensing decisions.

## Team and evidence

Charter proposes Salih (PM/analysis), Jake (frontend), Asad (backend/database), Henry (AI/data). Jake is the verified author of merged PR #69. No tool-connected evidence proves other engineering work complete. Keep any work owner labels, stage “In Progress,” or sign-off as *provisional* unless a teammate has confirmed it.

[Full GitHub Issues](https://github.com/JustEmre12/FinSight/issues) · [Kanban snapshot](KANBAN.md) · [Roadmap](ROADMAP.md) · [Source catalog](SOURCE_MATERIALS.md).
