# Groq connection to the existing explanation panel

This AI-only development integration connects Jake's existing stock explanation panel to a new server endpoint. The panel's design, controls, loading/error states, and AiExplanation return type are reused. Its only source change is the import of a new client adapter. The original template function remains available for the existing demo tests; the panel now uses the Groq route.

## Run locally

From `app/`, create an ignored `.env.local` file:

```dotenv
FINSIGHT_AI_ENABLED=true
GROQ_API_KEY=your_private_key
```

Use a Groq organization on the Free tier. The application cannot verify the billing tier itself and never upgrades it. Use a separate key for each teammate; do not commit it. Then run `npm ci` and `npm run dev`. Search a fictional demo symbol such as NOVA, open its stock page, and use the existing explanation button. No new npm dependencies are introduced.

The route is intentionally disabled outside `NODE_ENV=development`. It also requires a localhost URL and matching Origin header. Missing configuration uses the existing panel error state. No template response is silently substituted for a failed AI call.

## Request flow

Existing explanation panel → lib/ai/client.ts → POST /api/analysis → existing sample quote/history adapters → existing computeRiskMetrics → Groq → validation → existing panel.

The client submits only a symbol. The server obtains and validates history, computes approved facts, includes dates and missing/stale/short-history limitations, and calls `openai/gpt-oss-20b`. The model returns prose in the existing paragraphs/uncertaintyNotes structure. Metadata and mandatory disclosures are supplied by the server. Credentials and raw provider errors are never returned to the browser.

The prompt is copied from the updated isolated evaluation kit and adapted to the website's computed sample context. Real model generation does not turn these fictional prices into real market data. The UI retains the sample-data banner and returned content explicitly identifies synthetic input. The synthetic data-as-of timestamp represents its observation date at UTC midnight, not a verified real exchange close.

## Limits and acceptance boundaries

- At most ten uncached analysis attempts per hour and one concurrent call per development server process; errors count toward this limit. Successful results cache for five minutes per symbol. Limits/cache reset when the process restarts or hot-reloads. They are not durable deployment controls.
- Provider call timeout: 25 seconds; browser timeout: 35 seconds. No automatic retries or paid fallback.
- Validates response structure, text bounds, sample disclosure, numbers against approved facts, and selected prohibited phrases. These checks do not establish full semantic correctness: matching numbers cannot prove correct signs, attribution, or causal meaning. Model prose can still be misleading. Teammate review and repeated evaluations are required.
- Production deployment needs secure authentication, durable quotas/cache, ownership/privacy design, provider terms review, and stronger semantic evaluation. These are not implemented here. D4 persistence is not added.
- Real market-provider integration, auth, watchlists, comparisons and risk formulas are unchanged. The original template function and its tests remain intact.

Related: #27, #34, #39; specification PR #88 and isolated evaluation PR #89. This is a reviewable local demo milestone, not completion of the production FR-04 requirement.
