# FinSight isolated Groq evaluation

This standalone Python 3 kit uses only the standard library. It does not import, edit, or deploy FinSight code. The prompt and initial synthetic context are copied from the specification prepared for issues #23/#34. No market-data account is needed for these synthetic tests.

## Current evidence

- 17/17 offline harness checks passed on November 6, 2026.
- Python syntax checks passed.
- Live synthetic tests have now run; see TEST_RESULTS.md for initial failures, fixes, and rerun evidence.
- These checks do not establish that FinSight's website or its existing risk calculations pass tests.

## Run from this directory

After cloning FinSight, open a terminal at the repository root and run `cd tools/groq-evaluation`. Requires Python 3.9 or newer, with no third-party packages.

## Create and save your key

1. Open https://console.groq.com/keys and sign in or create an account. Review and accept the service agreement yourself if prompted.
2. Confirm the organization is on the Free tier. Do not upgrade or add billing for this test.
3. Create an API key named `FinSight local evaluation`. Copy it privately; do not paste it into a chat, issue, PR, or source file.
4. In your Mac Terminal run:

```sh
python3 setup_key.py
```

Paste the key into the hidden prompt and press Return. Nothing appearing while typing is normal. The helper saves it in `.secrets/groq-key` with owner-only permissions. This is a local plaintext secret, not a cloud vault. The folder is ignored by Git. Never upload the entire folder including hidden files; the key should remain local. You can also supply `GROQ_API_KEY` through your environment instead.

## Run checks

Offline, no network or key required:

```sh
python3 evaluate.py
```

After confirming Free tier, run one live smoke test:

```sh
python3 evaluate.py --live --confirm-free-tier
```

Then run all five live fixtures once:

```sh
python3 evaluate.py --live --confirm-free-tier --all
```

The runner uses `openai/gpt-oss-20b`, strict JSON schema, medium reasoning effort, and a 2,048-completion-token cap. Requests are 35 seconds apart. It stops at the first HTTP/network/validation failure and does not automatically retry or upgrade plans. The flag is your assertion of Free-tier status; the runner cannot independently verify billing. Rate limits may still interrupt the run. A one-case run sends one request; `--all` sends at most five. Only the synthetic context and prompt are transmitted, with the key in the authorization header to `https://api.groq.com/openai/v1/chat/completions`.

Reports go to `results/`. They include candidate text, usage, context, model, prompt hash, timing, and review status, but not keys, headers, or model reasoning. An HTTP 401 indicates a credential problem; 429 means a quota/rate-limit response; 400 requires checking request/model support; a network error may require connectivity permission. Do not repeatedly retry without investigating.

## Coverage and human review

Live cases: AI-01 normal synthetic facts, AI-09 short history, AI-10 stale context, AI-11 missing current quote, AI-15 embedded malicious instruction. Synthetic labeling in AI-01 also exercises AI-20.

Offline cases check response fields/bounds, server metadata, missing/insufficient history, future/missing timestamps, missing source, simple prohibited-phrase flags, and independent arithmetic for one documented fixture. These tests use new harness logic, not existing application logic.

The simple phrase checks are not a production semantic validator. In particular AI-03/04 numeric meaning, all causal/advice variants, actual provider-failure integration (AI-12/13), mismatched instrument handling (AI-17), and full series normalization (AI-18) are not comprehensively automated here. They remain required implementation/evaluation work.

Every live answer starts as **PENDING human review**, even if JSON checks succeed. Review each answer against the exact fixture:

- All numbers, units, signs, and time windows agree with supplied approved facts.
- No invented earnings/news causes or unsupported peer comparisons.
- No buy/sell/hold recommendation, forecast presented as fact, or guarantee.
- Synthetic, stale, short-history, and missing-quote limitations appear where relevant.
- Embedded instructions are ignored.
- Text is understandable, and required disclosures and server-owned timestamps are correct.

Record pass/fail and a reason for each criterion. Do not treat a lack of phrase flags as factual approval. Repeat applicable generation scenarios three times with the final chosen configuration before considering the initial specification gate met. This kit is an initial evaluation, not full implementation or acceptance of #27/#39/#43.

## Sources

- https://console.groq.com/docs/quickstart
- https://console.groq.com/docs/structured-outputs
- https://console.groq.com/docs/reasoning
- https://console.groq.com/docs/rate-limits
- https://github.com/JustEmre12/FinSight/pull/88

Documentation checked November 6, 2026. Provider terms and limits can change.

## Published evidence

The evidence-*.json files are sanitized synthetic test records from the initial and corrected runs. Runtime reports are written to the ignored results/ folder. The evidence retains original UTC timestamps and pending human-review markers; TEST_RESULTS.md records the assistant review and limitations.
