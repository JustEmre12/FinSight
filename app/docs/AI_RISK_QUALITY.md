# AI and historical risk quality — issues #39 and #43

This increment improves the local synthetic-data demo. It does not select a market-data vendor, enable production, add analysis-history persistence, or close the production feature issues.

## Numerical interpretation

The previous validator allowed any number found anywhere in the supplied facts. The new check also associates each percentage sentence with price performance, annualized volatility, or maximum drawdown; checks its value against that metric; and rejects a reversed price direction or a drawdown described as a gain. Only one percentage and one metric are permitted per sentence. Exact supplied dates must match; full English month/day/year dates are normalized before comparison. An exact calendar-month duration is computed server-side only when the first and last observation have the same day of the month, so the model need not infer it. A reference such as “this figure” or “that value” can bind only to an immediately preceding, unambiguous metric definition in the same paragraph. Ambiguous numerical prose fails visibly rather than being repaired silently.

The prompt now requests this explicit format. Only the ticker is sent in the stock identity object, and company/exchange attributes are omitted from the performance fact to reduce unsupported listing/profile claims. Basic rejection rules cover selected unsupported causal/company claims, predictions and advice. These are conservative rules for this price-only demo, not a general semantic verifier. Spelled-out numbers, subtle implications, negation variants, arbitrary company attributes and unrecognized causal/advice phrasing are not comprehensively understood. Human review remains necessary; do not claim hallucinations are eliminated.

## Risk calculation policy (proposed engineering baseline)

- Require at least three ordered, unique, canonical ISO-date observations with finite positive prices. Two observations provide only one return, insufficient for sample-standard-deviation estimation. Invalid series return an unavailable result without sorting, filling gaps or treating missing prices as zero.
- Compute simple consecutive-observation returns `close[i] / close[i-1] - 1`. Volatility is their sample standard deviation (`n-1` denominator), multiplied by `sqrt(252) * 100`. This daily annualization convention is an assumption; a future real provider must establish daily trading-session coverage, adjustment basis, currency and exchange calendar. This increment does not validate holidays or detect every missing trading session.
- Under twenty returns, warn that estimates are unstable. Three prices is mathematical computability, not a claim of statistical reliability; there is no universal reliable minimum established by this demo. Agree any release threshold with the team.
- Drawdown is the most negative `price / runningPeak - 1` over the actual available window, not future maximum loss.
- Largest gain/loss are clamped to zero when no positive/negative return exists. Zero here means no observed gain/loss, not missing data or zero investment risk.
- Existing 20%/40% volatility bands remain rough descriptive guides; remove unsupported comparisons with other stocks. They are not evidence-based peer rankings or suitability ratings.
- Values describe the supplied closing-price series, not total return. Do not infer dividend, split or inflation adjustments. Provider-adjusted prices and split treatment must be defined before real-data acceptance. A split can otherwise look like a loss.

The risk panel now explains daily-return variability correctly, distinguishes unavailable data from zero, and displays the limited-history and no-observed-loss/gain conditions.

## Verification and remaining acceptance

`npm test` runs deterministic claim-rejection, arithmetic, data-integrity and rendered-risk-panel checks, alongside the existing tests. A separate opt-in test repeats actual website-adapter calls for NOVA, BRKW, QTRX and LUMA three times each. Optional GROQ_QUALITY_SYMBOLS (a comma-separated subset of those four symbols) and GROQ_QUALITY_REPETITIONS (1–3) permit smaller diagnostic runs without exceeding the twelve-call bound. It requires RUN_GROQ_QUALITY=true, a private GROQ_API_KEY, CONFIRM_GROQ_FREE_TIER=true, and GROQ_EVALUATION_OUTPUT pointing to a local report. It makes at most twelve calls, paced 35 seconds apart, with no automatic retry or paid fallback. Run only on a confirmed Free-tier organization. The test does not independently inspect the provider billing plan.

The opt-in test freezes one context clock for the run and records input context plus source hashes, making later replay possible. It writes only synthetic results and usage metadata. It does not record keys, request headers or model reasoning. Normal CI skips it. A validated response is not automatically a semantic pass; team review remains pending in reports.

Before closing #39: strengthen and review semantic checks, approve the current-data/provenance contract with #26/#31, add appropriate owner-scoped D4 metadata with the backend owner, test authorization/quotas, and accept the combined feature. Before closing #43: validate adjusted real price series and trading calendars, agree minimum-history/band policy, independently verify financial calculations, and obtain acceptance. Production remains disabled under the existing guard.

## Recorded evaluation outcome — November 7, 2026

- Final deterministic suite: 56 tests passed; the opt-in live test is skipped in normal CI. TypeScript, lint and production build passed.
- Completed repeated live run: 12 actual model calls (three each for NOVA, BRKW, QTRX and LUMA), with 10 accepted and 2 rejected by that revision. The all-valid live gate therefore failed. See AI_RISK_REPEATED_EVIDENCE.json for exact source hashes, frozen input clock, contexts, usage and answers.
- Review found the two rejected answers used a clear immediate reference (“that value”) and a correct derived twelve-month duration. The follow-up accepts that narrow reference and computes exact month duration server-side when justified by the dates. A separate earlier rejection of a correct “not average daily movement” caveat and written-out dates was also fixed with regression coverage.
- Deterministic replay of those two rejected candidates against the corrected code and recomputed context passed 2/2 with no new model calls (AI_RISK_REPLAY_EVIDENCE.json). This is replay evidence, not a fresh model reliability result.
- The subsequent targeted fresh-call run was incomplete: NOVA recorded one accepted answer and two provider-unavailable outcomes, and the test timed out before reaching QTRX. It is a failed/inconclusive fresh-run gate, not a passing rerun. See AI_RISK_INCOMPLETE_EVIDENCE.json; do not infer a provider or machine root cause without further diagnostics.
- Assistant review of the completed cohort found the reported percentages/directions consistent with context and appropriate synthetic/stale/missing/short-history caveats. Human/team acceptance remains pending. No claim of universal factual correctness follows from this finite set.

No billing upgrade, live market-data feed, D4 storage, authentication or production enablement was added. Keep #39 and #43 open. PR #91 contains the quality increment for review rather than a completed production release. The next live verification should use the published source hashes and frozen context clock; investigate availability/timeouts before repeating larger runs.
