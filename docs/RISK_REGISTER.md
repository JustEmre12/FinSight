# Risk register — Sprint 3 documented analysis

Probability × impact gives a risk score out of 25. These are *risk estimates*, not recorded incidents.

| ID | Risk | Score | Possible delay | Mitigation |
| --- | --- | --- | --- | --- |
| R1 | Schedule delays | 15 High | 2–4 days | Monitor critical-path tasks, rebalance work |
| R2 | Incorrect financial calculations | 15 High | 2–3 days | Test against known values and recalculate |
| R7 | Integration problems | 15 High | 2–4 days | Integrate early and test connected modules |
| R5 | Scope changes | 12 Medium | 2–4 days | Document approved requirements and evaluate change requests |
| R3 | Security/privacy | 10 Medium | 3–5 days | Auth, encryption, access control, security retesting |
| R6 | Member unavailable | 9 Medium | 1–3 days | Share knowledge, reassign tasks |
| R8 | Confusing user experience | 9 Medium | 1–2 days | User feedback and usability tests |
| R4 | Database/data loss | 5 Low | 1–2 days | Backups and tested recovery |

## Additional uncertainties from Sprint 2/4/5
License/terms for stock and news APIs, pricing/limits, provider freshness, AI inaccuracy, investor reliance on speculative output, privacy and public repository exposure. Before integrating providers, validate feasibility and disclose timestamps and AI limitations. Maintain an issue for each serious blocker.
