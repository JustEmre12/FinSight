# FinSight source materials and provenance

**Synchronized November 3, 2026.** This inventory describes the source materials shared in the project conversation, plus uploaded duplicate copies. These **original Word, PDF, PPTX and ZIP binaries have not been uploaded into this public GitHub repository** by this update; this repo contains written, paraphrased project summaries and the separately merged frontend code.

## Project material inventory

| # | Source filename (canonical first-seen name) | What this source actually supports | Main linked repository reference |
| --- | --- | --- | --- |
| 1 | `TA1_Pepitone.docx` | Early proposal: fragmented financial news/information, trends, summarization, filtering, potential alerts | [Concept evolution](SCOPE_AND_EVOLUTION.md), [discovery](RESEARCH_AND_DISCOVERY.md) |
| 2 | `Project Journal 1 -  Salih Kocyigit.pdf` | Sept. project brainstorming, meetings, personal reflection | [Sprint history](SPRINT_HISTORY.md) |
| 3 | `FinSight_Sprint2_Preliminary_Investigation_Report_FINAL.docx` | Preliminary investigation, feasibility, root cause, SWOT/alternatives and planning | [Discovery](RESEARCH_AND_DISCOVERY.md) |
| 4 | `BCS301W_FinSight_5_Whys_Fishbone_Jake_Pepitone.docx` | Jake's root-cause analysis and fishbone diagram | [Discovery](RESEARCH_AND_DISCOVERY.md) |
| 5 | `Project Journal 2 .pdf` | Henry's meetings and Sprint 2 research reflection | [Sprint history](SPRINT_HISTORY.md) |
| 6 | `5 Whys and Fishbone.pdf` | Henry's analysis/diagram about fragmented sources and relevance | [Discovery](RESEARCH_AND_DISCOVERY.md) |
| 7 | `FinSight - 10 Questions for Potential Users.docx` | Prepared user-interview prompts on investments, goals, watchlists, allocation and trust; **not responses** | [Stakeholder questions](STAKEHOLDER_QUESTIONS.md) |
| 8 | `FinSight_Sprint3_Deliverable(1).docx` | Broader **portfolio** scope, nine-part WBS, 31-working-day Gantt/PERT/CPM, risk plan | [Schedule](PROJECT_SCHEDULE.md), [risks](RISK_REGISTER.md), [scope](SCOPE_AND_EVOLUTION.md) |
| 9 | `FinSight_Team_Charter.docx` | Oct. 6 team mission, roles and operating norms; non-PM roles proposed | [Charter](TEAM_CHARTER.md) |
| 10 | `FinSight - User Stories.docx` | Seven user stories US-01–US-07 | [Stories](USER_STORIES.md) |
| 11 | `FinSight - Sprint 4.docx` | Eight functional and seven nonfunctional requirements; user stories | [Requirements](REQUIREMENTS.md) |
| 12 | `Fintech Data Tree.docx` | **Generic FinTech** banking, transactions, portfolios/goals and reports | [Generic reference](FINTECH_REFERENCE_DATA_MODEL.md) |
| 13 | `Fintech Data Tree(1).docx` | Another copy of the same generic FinTech tree (not a second requirement set) | [Generic reference](FINTECH_REFERENCE_DATA_MODEL.md) |
| 14 | `Combined System Requirements Document and Logical Model.docx` | Refined Sprint 4 scope + Sprint 5 FDD, context/DFDs, D1–D4 and data dictionary | [System model](SYSTEM_DESIGN.md), [logical dictionary](DATA_DICTIONARY.md) |
| 15 | `Sprint 6- Object-Oriented Modeling.docx` | Six objects, relationships, UC-01/UC-02, four named use cases, sequences, states/activity, conditional approval *recommendation* | [Sprint 6](SPRINT6_OBJECT_ORIENTED_MODEL.md) |
| 16 | `Fintech Data Dictionary.docx` | Jake's **generic** SQL-style Users, Bank Accounts, Transactions, Investment Portfolio/Holdings, Goals; relationships and security | [Generic dictionary reference](FINTECH_REFERENCE_DATA_MODEL.md) |
| 17 | `FinSight_Backend.pptx` | 16-slide FinSight backend **design** explaining five processes, D1–D4, validation, AI workflow, security and proposed order | [Handoff](FRONTEND_BACKEND_HANDOFF.md), [model](SYSTEM_DESIGN.md) |
| 18 | `FinSight-feature-frontend.zip` | Snapshot of Jake's Next.js sample-data frontend code, screenshots, tests | [Frontend evidence](FRONTEND_PROTOTYPE.md), [merged PR #69](https://github.com/JustEmre12/FinSight/pull/69) |

**Duplicate uploads:** Second batches of `TA1_Pepitone(1)`, investigation/requirements/combined materials, `Sprint 6- Object-Oriented Modeling(1).docx`, `FinSight_Backend(1).pptx`, `FinSight-feature-frontend(1).zip` and `Fintech Data Tree(2).docx` were supplied. Spot-checked duplicates (frontend ZIP, backend deck, Sprint 6, Fintech Tree, proposal, combined model) are **byte-identical**, not evidence of a newly revised deliverable. Count **18 catalog rows**, not 18 distinct content versions.

## Separate class case study (not a FinSight system source)

**`AW Chapter 6 - SIM Object Modeling.docx`** is the **Appliance Warehouse** Service Information Manager assignment (customers, technicians, service appointments, parts/invoices). It is an educational example of use cases/object modeling. **Do not add Appliance Warehouse actors, objects or transactions into FinSight's database, backend, or requirements.**

## Status of evidence

- **Actual merged source:** Jake's frontend PR #69 is in the repository and automated frontend checks passed, but it uses fictional stock prices, template-generated explanations and browser-local mock auth.
- **Design-only files:** The backend PowerPoint and Sprint 6 Word document define how a future backend should work; neither constitutes an executable API, live database or instructor approval.
- **Generic reference:** The Fintech Tree and Jake's Fintech Data Dictionary are not an approved banking/portfolio schema for the current stock-research MVP.
- **Product conversation:** Later discussion of **FinSight AI chat, multi-source verification, company relationship research and optional portfolio-aware scenarios** is a proposed extension and not a submitted Sprint FR.
- **Source image fidelity:** Mermaid diagrams in the repo are editable reconstructions of supplied figures, **not the original page images** or a signed-off physical database model.
- **Sensitive publication:** Project journals, class assignments and full original ZIP/Word/PPTX/PDF files should be reviewed for personal details, permissions, trademarks and licensed content before uploading to the public GitHub repo.

See [project scope timeline](SCOPE_AND_EVOLUTION.md), [research](RESEARCH_AND_DISCOVERY.md), [project status](PROJECT_STATUS.md), [AI proposal](FINSIGHT_AI_VISION.md) and [database design plan](DATABASE_DESIGN_PLAN.md).
