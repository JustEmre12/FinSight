# Sprint 3 WBS / Gantt / PERT planning baseline

**Source:** FinSight_Sprint3_Deliverable(1).docx. Durations are planning estimates **not actual progress**.

| WBS | Task | Duration (working days) | Planned days |
| --- | --- | --- | --- |
| 1.1 A | Requirements Analysis | 3 | 1–3 |
| 1.2 B | System Design | 4 | 4–7 |
| 1.3 C | Database Design | 3 | 8–10 |
| 1.4 D | User Interface Development | 5 | 8–12 |
| 1.5 E | Portfolio Management Development | 6 | 13–18 |
| 1.6 F | Performance/Analytics | 4 | 19–22 |
| 1.7 G | System Integration | 3 | 23–25 |
| 1.8 H | Testing/QA | 4 | 26–29 |
| 1.9 I | Corrections/Deployment | 2 | 30–31 |

## Dependencies
~~~mermaid
flowchart LR
  A["A Requirements 3d"] --> B["B System Design 4d"]
  B --> C["C Database 3d"]
  B --> D["D UI 5d"]
  C --> E["E Core 6d"]
  D --> E
  E --> F["F Analytics 4d"]
  F --> G["G Integration 3d"]
  G --> H["H Testing 4d"]
  H --> I["I Deploy 2d"]
~~~

**Critical path:** A → B → D → E → F → G → H → I = **31 working days**, just over six work weeks. The path via C is 29 days; Database Design has 2 days of slack. Tasks C and D run in tandem.

## Historical milestones
M1 Requirements Day 3; M2 Design Day 7; M3 Core + Analytics Day 22; M4 Integration Day 25; M5 QA Day 29; M6 Delivery Day 31.

**Scope mismatch:** Sprint 3 used a portfolio-management work package; final Sprint 4/5 scope is stock research. Re-estimate/relabel before setting real deadlines. Do not treat these relative days as a dated live Gantt chart.
