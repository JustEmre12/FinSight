# FinSight — Scrum / Kanban Board

**Updated: November 8, 2026** · **82 issue records** · **48 open** · **34 closed** · **78 stage-tracked cards**  
GitHub Issues and their `stage:` labels are the source of truth. Four old duplicate/retired closed issue records remain intentionally unstaged.

> **Current milestone:** finish AI reliability, close the MongoDB integrity handoff, define the backend/auth/data-provider path, and prepare the sample frontend for live service integration.

## Current sprint focus

| Workstream | What is happening now | Lead / contributors | Evidence / next move |
| --- | --- | --- | --- |
| **AI reliability** | Groq integration works in the local/demo flow; reliability and fresh-call evaluation are still being tightened | **Henry** · Jake | #39, #43 · open PR #92 |
| **Database closeout** | Atlas project/cluster/database and six collections exist; final integrity/application connection remains | **Salih** · Asad | #30, #75, #84 |
| **Backend foundation** | API/auth/market-data architecture is defined enough to pick up, but implementation evidence is still missing | **Asad** · Jake/Henry | #22, #31, #35, #44, #46 |
| **Frontend review** | Search, compare and chart flows exist in the merged sample-data frontend and now need live integration review | **Jake** · Henry | #37, #41, #42 · PR #69 |
| **QA** | Frontend CI and extensive AI tests exist; integrated security/accessibility/end-to-end coverage is still incomplete | **Jake + Henry** · Asad | #33, #47, #64, #67 |
| **Scrum / scope / access** | Team ownership, priorities, scope gates and collaborator access are being maintained | **Salih + Jake** | #20, #24, #25, #68, #78 |

## Board at a glance

| Stage | Cards | Meaning right now |
| --- | ---: | --- |
| **In Progress** | **6** | Active implementation, evaluation or Scrum work with evidence |
| **In Review** | **13** | Work exists and needs team/acceptance/integration review |
| **Ready** | **9** | Defined enough to start; no verified implementation yet |
| **Blocked** | **7** | Waiting on provider, access, auth/dependency or scope approval |
| **Product Backlog** | **1** | Delivery item intentionally held until integration is ready |
| **Future** | **12** | Outside the current Sprint 4–6 MVP |
| **Done** | **30** | Completed documentation, prototype, workflow or verified milestone |

## In Progress — active now

| Issue | Work | Owner(s) |
| --- | --- | --- |
| [#20](https://github.com/JustEmre12/FinSight/issues/20) | Sprint breakdown and owner confirmations | Salih + Jake |
| [#28](https://github.com/JustEmre12/FinSight/issues/28) | Finish backend/auth/deployment stack decisions | Salih + Asad + Jake + Henry |
| [#33](https://github.com/JustEmre12/FinSight/issues/33) | Turn requirements into testable/integrated cases | Jake + Henry |
| [#39](https://github.com/JustEmre12/FinSight/issues/39) | AI-powered stock/trend explanations | Henry + Jake; Asad backend |
| [#43](https://github.com/JustEmre12/FinSight/issues/43) | Historical risk explanations | Henry + Jake; Asad backend |
| [#47](https://github.com/JustEmre12/FinSight/issues/47) | Automated/security/accessibility QA | Jake + Henry |

## In Review — built or documented, needs acceptance / integration review

| Issue | Review target | Owner(s) |
| --- | --- | --- |
| #16, #18 | MVP scope, acceptance criteria and prioritization | Salih + Jake |
| #17, #62, #63 | Sprint 5/6 model alignment and object ownership | Salih + Jake; Asad backend |
| #19 | Source/publication review | Jake + Salih |
| [#30](https://github.com/JustEmre12/FinSight/issues/30) | Physical MongoDB schema | Salih; Asad backend |
| [#37](https://github.com/JustEmre12/FinSight/issues/37) | Stock-search frontend flow | Jake + Henry |
| [#41](https://github.com/JustEmre12/FinSight/issues/41) | Stock comparison frontend flow | Jake + Henry |
| [#42](https://github.com/JustEmre12/FinSight/issues/42) | Historical-chart frontend flow | Jake + Henry |
| #64 | Sprint 6 use-case/state/error-path QA | Jake + Henry |
| [#75](https://github.com/JustEmre12/FinSight/issues/75) | Database authorization/index/retention design | Salih; Asad backend |
| [#84](https://github.com/JustEmre12/FinSight/issues/84) | Live Atlas database creation handoff | Salih; Asad backend |

## Ready — next implementation queue

| Issue | Next work | Owner |
| --- | --- | --- |
| [#22](https://github.com/JustEmre12/FinSight/issues/22) | Backend/data service architecture | **Asad** |
| [#31](https://github.com/JustEmre12/FinSight/issues/31) | Quote/search/history API contracts | **Asad** |
| [#32](https://github.com/JustEmre12/FinSight/issues/32) | Potential-user interviews | **Jake + Salih** |
| [#35](https://github.com/JustEmre12/FinSight/issues/35) | Authentication/authorization design | **Asad** |
| [#44](https://github.com/JustEmre12/FinSight/issues/44) | Secure registration/login/logout | **Asad** |
| [#46](https://github.com/JustEmre12/FinSight/issues/46) | Server/API/UI integration | **Asad** · Jake + Henry |
| #65 | Expand watchlist/comparison use cases | Asad · Jake + Salih |
| #66 | Map OO objects to physical services | **Asad** |
| #67 | Sprint 6 QA scenarios | Jake + Henry |

## Blocked — dependencies must be resolved first

| Issue | Blocker | Owner |
| --- | --- | --- |
| [#24](https://github.com/JustEmre12/FinSight/issues/24) | Asad's exact GitHub account/access is still unverified | Salih |
| [#25](https://github.com/JustEmre12/FinSight/issues/25) | Team decision on news/portfolio scope | Salih + Jake |
| [#26](https://github.com/JustEmre12/FinSight/issues/26) | Licensed market-data provider not selected | Asad + Salih |
| [#38](https://github.com/JustEmre12/FinSight/issues/38) | Real stock data depends on #26 | Asad |
| [#40](https://github.com/JustEmre12/FinSight/issues/40) | Persistent watchlists depend on auth/backend ownership | Asad · Jake |
| [#68](https://github.com/JustEmre12/FinSight/issues/68) | Instructor/management design decision | Salih + Jake |
| [#78](https://github.com/JustEmre12/FinSight/issues/78) | Expanded FinSight AI/portfolio scope not approved | Salih + Jake + Henry |

## Product Backlog

- [#48 — Deploy and demonstrate tested FinSight MVP](https://github.com/JustEmre12/FinSight/issues/48) — **All team members**, coordinated by Salih. Deployment starts after the live-service integration and acceptance gates are ready.

## Future — intentionally outside the current MVP

**Research/news:** #49, #50, #52, #72, #73  
**Portfolio / broader finance:** #51, #55, #74  
**Product/business:** #53, #54  
**Expanded conversational AI:** #71, #76

These stay in **Future** until the team changes scope. They should not crowd the active sprint.

## Done — archived milestones

The 30 Done cards are kept out of the active queues so the board stays readable. Major completed milestones include:

- Sprints 1–6 documentation and modeling (#1–#15, #56–#61)
- Initial frontend navigation/design planning (#21, #29)
- AI grounding/prompt planning (#23, #34)
- AI provider selection (#27)
- GitHub feature-branch / PR routine (#36)
- Responsive application shell/navigation (#45)
- Jake's merged frontend baseline (#70 / PR #69)
- Full source/documentation reconciliation (#77)
- MongoDB/GitHub database work is tracked separately in #30/#75/#84 because app integration is not finished.

## Ownership legend

- **Salih Emre / @JustEmre12:** GitHub, database, Scrum, project management
- **Asad:** backend owner — GitHub handle still pending verification
- **Jake / @JakePepitone:** frontend, project management, information/research, developer
- **Henry / @HenryContrerasTan:** frontend, AI features, developer

See [Current Team Ownership](TEAM_OWNERSHIP.md) for the full assignment matrix.

[Roadmap](ROADMAP.md) · [Project status](PROJECT_STATUS.md) · [Live Issues](https://github.com/JustEmre12/FinSight/issues)
