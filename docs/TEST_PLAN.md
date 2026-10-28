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
