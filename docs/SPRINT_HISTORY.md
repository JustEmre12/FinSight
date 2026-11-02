# History and status — Sprints 1–6

**As of November 2, 2026**. Sprints 1–6 are documented; on November 2 a separate frontend demo was merged. Completion of Sprint documents does not establish instructor approval or full software implementation.

| Period | Evidence in supplied materials | Status |
| --- | --- | --- |
| Sprint 1: Proposal | System proposal, problem statement, business opportunity; Project Journal 1 | Documented |
| Sprint 2: Preliminary Investigation | Five Whys, fishbone diagrams (Jake/Henry), SWOT, costs/benefits, feasibility and recommendations; Project Journal 2 | Documented |
| Sprint 3: Management Planning | 9-work-package WBS, 31-working-day PERT/Gantt critical path, risk register | Documented as proposed schedule |
| Sprint 4: System Requirements | FR-01–FR-08, NFR-01–NFR-07, seven user stories and acceptance criteria | Documented |
| Sprint 5: Logical Model | FDD, context diagram, Level 0 and Level 1 DFDs, four logical stores, validation primitive | Documented |
| **Sprint 6: Object-Oriented Modeling** | Six object definitions; Figure 6-10 relationships, Figure 6-15 use cases, Figures 6-18/6-19 sequences, Figures 6-20A/B state transitions, Figure 6-21 activity diagram; proposed Sprint 4/5 corrections and conditional design recommendation | **Written deliverable supplied; design approval not confirmed** |
| **Nov 2: Frontend prototype** | [Jake's PR #69](https://github.com/JustEmre12/FinSight/pull/69) merged; Next.js mock-data UI, unit tests, screenshots and CI added | **Prototype code merged; no live financial/AI services or secure backend** |

## Project journals
- Journal 1 describes concept brainstorming, research and meetings Thursday 9/17 and Saturday 9/19, 2026.
- Henry's Journal 2 records root-cause analysis planning and notes meetings dated 9/22/27 and 9/26/26; the first is likely a year typo, not a verified 2027 meeting.
- October 6 charter gives working agreements and responsibilities.

## Changes between documents
Early: news filtering and trends/alerts. Sprint 3: manual portfolio holdings and transactions. Sprints 4–6: narrower beginner-friendly stock *research* MVP, explicitly excluding banks/trades. Keep prior concepts as historical evidence or candidates rather than quietly merging incompatible scopes.

## Not yet evidenced
No deployed production site, secure server-side authentication, licensed market-data provider, real AI service, persistent backend database or completed investor interviews have been verified. A **runnable frontend demo** exists in `app/` and its CI passed the automated lint/type/test/build checks; this is not production acceptance.

## Sprint 6 handoff (October 28 document)
The supplied Sprint 6 document **recommends conditional approval** to proceed to detailed system design, prioritizing secure accounts, search, reliable data, AI explanations and watchlists; comparisons/advanced charts follow validated core functionality. This recommendation is not recorded acceptance by management or professor. See [Sprint 6 model](SPRINT6_OBJECT_ORIENTED_MODEL.md), [review gate](SPRINT6_DESIGN_REVIEW.md), and [traceability](TRACEABILITY.md).

## Frontend contribution (November 2, 2026)
Jake Pepitone's 16-commit branch was reviewed and merged via [PR #69](https://github.com/JustEmre12/FinSight/pull/69). A GitHub Actions workflow now validates frontend lint, types, unit tests and build; [the PR check run passed](https://github.com/JustEmre12/FinSight/actions/runs/41519999919). The mock-data frontend advances the implementation demonstration, but does not close any real-provider, AI, security, backend or production requirement issues. See [frontend prototype handoff](FRONTEND_PROTOTYPE.md).
