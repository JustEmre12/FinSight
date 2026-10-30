# Draft acceptance test plan (not yet executed)

| Req | Test | Expected |
| --- | --- | --- |
| FR-01 | Sign up/log in/log out, wrong password, another user's data | Safe state and proper authorization |
| FR-02 | Valid ticker/company search, empty/bad ticker | Matching result or understandable error |
| FR-03 | Retrieve quote/historical series, provider timeout | Dated source data or honest warning |
| FR-04 | Analyze stock, empty market context, model outage | AI label, uncertainty and error handling |
| FR-05 | Add/remove watchlist then re-login | Persist privately across sessions |
| FR-06 | Compare two stocks with different history coverage | Correct aligned comparison and labels |
| FR-07 | Review chart on mobile/keyboard | Clear axes and accessible numeric alternative |
| FR-08 | Explain volatile stock | Historical risk and non-guarantee caveat |

## Nonfunctional verification
NFR-01 measure local performance vs three-second target, excluding external provider lag. NFR-02 check password hashes, TLS, no leaked keys, data permissions. NFR-03 run usability/accessibility reviews. NFR-04 monitor post-deployment availability against 99% goal. NFR-05 test bounded scale and rate limits. NFR-06 check modern browsers and desktop/tablet/mobile. NFR-07 validate timestamp, source and stale-data UI.

**Definition of Done for code:** PR reviewed and merged; tests/edge cases passed; docs updated; security and data-source attribution preserved. A completed paper requirements assignment never means the app feature passed testing.

## Sprint 6 modeling-based test design (not executed)
These cases follow the supplied Sprint 6 behaviors and [diagrams](SPRINT6_OBJECT_ORIENTED_MODEL.md). They are **planned checks**, not passing tests.

| Case | Model | Input / scenario | Expected behavior |
| --- | --- | --- | --- |
| S6-T01 | UC-01 / Fig. 6-18 | Search valid ticker or company | Validate, request provider data, display symbol, source and timestamp |
| S6-T02 | UC-01 / Fig. 6-21 | Missing/invalid ticker | Reject before calling provider; clear error |
| S6-T03 | UC-01 / Fig. 6-18 | Provider unavailable or no data | No fabricated quote; helpful error |
| S6-T04 | UC-02 / Fig. 6-19 | Valid stock, data and AI available | Market context fetched before AI, explanation and visible AI disclosure |
| S6-T05 | UC-02 / Fig. 6-20A | Request with missing market data | AIAnalysis Requested → Failed; show error |
| S6-T06 | Fig. 6-20A | AI service failure after Processing | Processing → Failed with clear feedback |
| S6-T07 | Fig. 6-20A | Successful analysis | Requested → Processing → Completed |
| S6-T08 | Fig. 6-20B | Save first watchlist ticker | Empty → Populated (after sign-in) |
| S6-T09 | Fig. 6-20B | Remove last saved ticker | Populated → Empty and persist |
| S6-T10 | Fig. 6-20B | Add/remove while some remain | Remain Populated; prevent cross-user access |
| S6-T11 | Fig. 6-15 | Compare two stocks | Compare Stocks use case functions with selected data, once detailed design accepted |
| S6-T12 | Activity Fig. 6-21 | Valid lookup without requesting AI | Display stock details and finish without contacting AI |

**Do not invent tests already run.** Record actual test code, execution results, environment and PR link before closing implementation issues. [Traceability](TRACEABILITY.md) · [Sprint 6 review gate](SPRINT6_DESIGN_REVIEW.md).
