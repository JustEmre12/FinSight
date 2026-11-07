# Groq reliability diagnostic — issue #39

This increment changes only AI adapter code, AI tests and AI evaluation evidence. It retains the Groq Free-tier setup, local-only route guard, the existing 25-second provider deadline, model and token cap, and no automatic retry or paid fallback. Credentials remain private and are not evidence artifacts.

## Findings

The previous targeted attempt combined different failures under “AI provider unavailable.” One recorded Groq error was `json_validate_failed`: a provider schema failure, not proof of a network timeout. A separate unavailable outcome had insufficient diagnostics to establish its cause. No claim is made that a Mac sleep event, network outage or Groq outage caused that earlier failure.

The old evaluation's 600-second test deadline could not cover its own worst-case schedule: twelve 25-second calls plus eleven 35-second pauses require 685 seconds before setup and evidence writes. Its bounded deadline is now 750 seconds. The provider deadline remains 25 seconds.

The adapter now reads each response body once under the request's existing deadline. The old evaluation consumed a cloned body before returning the response to the adapter. HTTP/schema, rate-limit, authorization, network and deadline failures are classified separately. Browser-facing errors remain generic. The evaluation records latency, status, usage and candidate text without request headers or credentials, and checkpoints the active case before its call.

## Run and interpretation

Run normal tests, typecheck and lint from `app`. Normal CI skips all live calls. For the explicit live evaluation, supply the private server key through the environment, `RUN_GROQ_QUALITY=true`, `CONFIRM_GROQ_FREE_TIER=true` and an absolute `GROQ_EVALUATION_OUTPUT` path; run `npm test -- tests/groq-quality-live.test.ts`. Verify the account is still on Free before opting in. Default evaluation is capped at twelve calls with 35-second pauses; no automatic retry. Each report freezes input contexts and hashes the three AI source modules.

A completed evaluation is not necessarily a passing evaluation. Every rejection stays in the report and fails the all-valid gate. A later correction or offline replay does not retroactively change a fresh-call result. Candidate answers require semantic review; numerical checks remain conservative heuristics.

## Remaining acceptance

Issue #39 remains open for real licensed market context/provenance, appropriate D4 analysis metadata storage, deployment access and durable usage controls, reviewed PR and group acceptance. Issue #43 still requires real-data financial QA and group acceptance; this AI-only increment does not change risk calculations. Production remains disabled. No instructor or independent team approval is claimed.

## Corrections discovered during fresh evaluation

The first diagnostic cohort completed twelve calls in about 405 seconds: eleven validated and one correct “Its value” reference was conservatively rejected. The reference check now accepts that exact construction only after an immediate unambiguous metric definition without a previous percentage; swapped values and ambiguous references still fail.

The next cohort completed twelve calls in about 406 seconds with twelve automated validations. Assistant review rejected LUMA repetitions 1 and 3: 55 daily observations were incorrectly called a 55-day window, while the supplied dates span 74 elapsed calendar days. This cohort therefore failed semantic review despite passing the automated gate. The evidence remains unchanged. The validator now rejects numerical day-window/period claims because the adapter does not supply approved day-duration facts; the prompt explicitly distinguishes observation counts from calendar durations. Unicode hyphens are normalized after NFKC so these checks and date checks apply consistently. This does not establish a general ability to verify all prose or spelled-out quantities.

Two preliminary live starts were interrupted during implementation and are not treated as completed evaluation cohorts. They are excluded from reliability claims, not counted as passes. No automatic retries were introduced.

## Final bounded cohort — November 7, 2026

Twelve fresh calls completed: **10 validated, 2 rejected, 0 timeouts and 0 provider HTTP errors**. All responses were HTTP 200. Measured request-plus-body latency ranged from 1.33 to 8.87 seconds (median 1.69 seconds). The all-valid live test **failed**; evaluation completion does not mean its gate passed.

| Case | Validated | Rejected |
| --- | ---: | ---: |
| NOVA — normal | 2 | 1 |
| BRKW — stale | 2 | 1 |
| QTRX — missing quote | 3 | 0 |
| LUMA — short history | 3 | 0 |

NOVA repetition 2 combined volatility and drawdown percentages in one sentence and was correctly withheld under the required format. BRKW repetition 3 used “The value” immediately after defining volatility: a conservative false rejection outside the narrow supported reference rule. No rule was loosened after seeing the final cohort. These remain usability/reliability limitations. All three final LUMA answers preserved observation-count wording without inventing day durations.

The assistant reviewed the ten accepted answers against their frozen facts and found no additional factual failures in this sample. This is assistant review, not independent human/group acceptance. The raw reports retain `humanReview: PENDING`. `AI_GROQ_REVIEW.json` records review findings separately.

Local verification: **71 deterministic tests passed**, one opt-in live test skipped in normal runs; TypeScript and lint passed. The final opt-in live test completed and failed on the two preserved rejections. Only AI modules, tests and documentation/evidence changed; risk calculations, teammates’ other code, billing and deployment guards were not changed.

Evidence: `AI_GROQ_DIAGNOSTIC_EVIDENCE.json`, `AI_GROQ_DURATION_REVIEW_EVIDENCE.json`, `AI_GROQ_FRESH_EVIDENCE.json`, and `AI_GROQ_REVIEW.json`. Earlier cohorts used earlier source hashes; do not combine them into one success-rate estimate.
