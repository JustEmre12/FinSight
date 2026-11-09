# FinSight — Verified Project Status

**Snapshot: November 8, 2026.** This page separates what is actually merged/provisioned from what is still a demo, in review, blocked, or future.

## Current milestone

**Reliability + backend foundation.** The frontend baseline, MongoDB Atlas database and local/demo Groq integration now exist. The project is moving toward secure backend/auth, live market data, persistent data and end-to-end integration.

## Verified implementation evidence

| Area | Current state | Evidence | Remaining |
| --- | --- | --- | --- |
| **Frontend** | **Working responsive sample-data prototype** | Jake's merged [PR #69](https://github.com/JustEmre12/FinSight/pull/69) | Replace fictional/local data with live backend services; finish acceptance/accessibility/security review |
| **Stock search / compare / charts** | **Implemented in sample-data UI; In Review** | #37, #41, #42 + PR #69 | Real market provider, live histories and integrated acceptance |
| **MongoDB database** | **Live Atlas infrastructure exists** | Salih's PRs #85–#87; project **FinSight**, cluster **FinSight-MVP**, DB `finsight`, six collections | Apply final validator/unique-index integrity workflow; connect backend/auth and add integration tests |
| **AI explanation** | **Groq connected to existing explanation panel for local/demo use** | Henry's PR #90 | Production remains disabled; real licensed market context, durable controls and group acceptance remain |
| **AI/risk quality** | **Actively improving** | PR #91 merged; [PR #92](https://github.com/JustEmre12/FinSight/pull/92) open | Finish reliability evaluation and real-data QA |
| **Backend/API** | **Designed/Ready, not implemented end-to-end** | Sprint 5/6 models, backend deck, #22/#31/#35/#44/#46 | Server architecture, auth, market provider, MongoDB application connection |
| **Authentication/watchlists** | **Mock/local only** | Existing frontend | Secure sessions, owner authorization and persistent MongoDB-backed watchlists |
| **Market data** | **Fictional/sample only** | Existing frontend | Choose licensed provider (#26), then implement #38 |
| **Deployment** | **Not deployed as integrated MVP** | #48 backlog | Complete live integration, QA and controlled demonstration |

## AI status — important correction

Earlier repository text described AI as template-only. That is no longer fully current.

- PR #88 added the AI grounding/specification.
- PR #89 added synthetic Groq evaluation tooling.
- PR #90 connected **Groq** to Jake's existing explanation panel.
- PR #91 strengthened grounded explanations and historical-risk calculations.
- PR #92 is open to finish fresh-call reliability diagnostics/evaluation.

This is still a **local/demo integration using fictional sample market context**, not a production financial research service.

## Team ownership

- **Salih Emre / @JustEmre12:** GitHub, Scrum/project management, MongoDB/database.
- **Asad:** backend owner; exact GitHub handle still unverified.
- **Jake / @JakePepitone:** frontend, project management, information/research gathering, developer.
- **Henry / @HenryContrerasTan:** frontend, AI features, developer.

[Current ownership matrix](TEAM_OWNERSHIP.md)

## Current Kanban state

**82 issue records · 48 open · 34 closed**

- **In Progress:** 6
- **In Review:** 13
- **Ready:** 9
- **Blocked:** 7
- **Product Backlog:** 1
- **Future:** 12
- **Done:** 30
- **Unstaged retired/duplicate closed records:** 4

The active board is intentionally smaller than the old snapshot: completed frontend planning/workflow cards were closed, sample frontend feature stories moved to In Review, live-data-dependent stories moved to Blocked, and unimplemented backend tasks moved to Ready.

## Immediate priorities

1. **Henry:** finish PR #92 / AI reliability review (#39, #43).
2. **Asad:** backend architecture, API contracts and authentication (#22, #31, #35, #44).
3. **Salih:** close database integrity/application handoff (#30, #75, #84) and maintain Scrum/GitHub.
4. **Jake:** review frontend feature stories, support live adapter integration, and run user/research work (#32, #37, #41, #42).
5. **Team:** choose licensed market-data provider (#26) and then unblock real quote/history integration (#38).
6. Expand QA/security/accessibility coverage (#33, #47, #64, #67).
7. Deploy only after live integration and acceptance (#48).

## Blocked gates

- **#24:** Asad's exact GitHub account/access remains unverified; Salih/Jake/Henry are verified.
- **#25:** current MVP vs news/portfolio scope decision.
- **#26:** licensed market-data provider.
- **#38:** real data depends on #26.
- **#40:** persistent watchlists depend on backend/auth.
- **#68:** instructor/management design decision.
- **#78:** expanded conversational AI/holdings-aware scope approval.

## Scope boundary

The current Sprint 4–6 MVP remains a **stock-research support system**. Bank accounts, trade execution, guaranteed predictions and individualized investment instructions are not current MVP features. News, alerts, portfolio tracking, company graph and conversational sourced AI remain Future/Proposed until approved.

[Kanban](KANBAN.md) · [Roadmap](ROADMAP.md) · [Team Ownership](TEAM_OWNERSHIP.md) · [Issues](https://github.com/JustEmre12/FinSight/issues)
