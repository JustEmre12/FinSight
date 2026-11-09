# FinSight — Current Team Ownership

**Updated: November 8, 2026.** This page records the team's current working allocation for implementation and Scrum tracking. It supplements the original October 6 charter without rewriting the submitted charter.

## Current roles

| Team member | GitHub | Current working responsibilities | Verified repository evidence |
| --- | --- | --- | --- |
| **Salih Emre** | [@JustEmre12](https://github.com/JustEmre12) | **GitHub / repository management, Scrum, project management, database** | Repository admin; MongoDB/database PRs #85–#87; project/source synchronization PR #83; issue/Kanban/roadmap management |
| **Asad** | **GitHub handle not yet verified** | **Backend** — server/API architecture, authentication, market-data services, persistence integration | Named backend owner in team workflow; no verified PR/account activity in this repository yet |
| **Jake Pepitone** | [@JakePepitone](https://github.com/JakePepitone) | **Frontend, project management, information/research gathering, developer** | Merged frontend PR #69; write permission verified |
| **Henry Contreras** | [@HenryContrerasTan](https://github.com/HenryContrerasTan) | **Frontend, AI features, developer** | AI PRs #88–#91 merged; active Groq reliability PR #92; write permission verified |

## Ownership by workstream

| Workstream | Lead | Contributors / reviewers | Current issues |
| --- | --- | --- | --- |
| **Scrum, scope, GitHub and release coordination** | Salih | Jake (project management) | #16, #18, #20, #24, #25, #68, #78 |
| **Database / MongoDB Atlas** | Salih | Asad (backend), Jake/Henry review integration | #30, #75, #84 |
| **Backend, API and authentication** | Asad | Jake (frontend contracts), Henry (AI/data), Salih (Scrum) | #22, #31, #35, #38, #40, #44, #46, #66 |
| **Frontend and user experience** | Jake | Henry (frontend/developer), Asad (backend integration) | #37, #41, #42, #53 |
| **AI explanations and risk** | Henry | Jake (frontend/developer), Asad (backend), Salih (Scrum) | #39, #43, #52, #71, #76 |
| **Research / information gathering** | Jake | Salih (project oversight), Henry (AI/source work) | #19, #32, #49, #72, #73 |
| **QA / validation** | Jake + Henry | Asad (backend tests), Salih (acceptance coordination) | #33, #47, #64, #67 |
| **Delivery / demonstration** | Salih | Jake, Asad, Henry | #48 |

## Verified completed contribution milestones

### Salih
- Organized the repository, requirements, issue-based Kanban and project documentation.
- Selected and provisioned the FinSight MongoDB Atlas database through PRs #85–#87.
- Created the live `FinSight-MVP` cluster, `finsight` database, six MVP collections and sharing package.

### Jake
- Authored the merged frontend baseline in [PR #69](https://github.com/JustEmre12/FinSight/pull/69).
- Delivered the responsive Next.js/TypeScript/Tailwind/Recharts sample-data experience used by the current project.

### Henry
- Authored AI specification/evaluation work in PRs #88–#89.
- Connected Groq to the existing explanation panel in [PR #90](https://github.com/JustEmre12/FinSight/pull/90).
- Strengthened AI grounding and historical-risk quality in [PR #91](https://github.com/JustEmre12/FinSight/pull/91).
- Currently owns the reliability/evaluation follow-up in open [PR #92](https://github.com/JustEmre12/FinSight/pull/92).

### Asad
- Current team owner for backend work.
- **Repository attribution remains pending** because an exact GitHub username/accepted collaborator identity is not yet verified.

## Assignment rule

GitHub assignees are used only for verified accounts. Asad is documented as the backend owner inside backend issues and this matrix, but the repository will not assign an unknown GitHub username. Once his exact handle is confirmed, replace the pending note with his account and assign the backend issues.

[Kanban](KANBAN.md) · [Roadmap](ROADMAP.md) · [Team Charter](TEAM_CHARTER.md) · [Project Status](PROJECT_STATUS.md)
