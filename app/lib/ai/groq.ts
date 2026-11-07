// Server module: imported only by the route handler, never by the client panel.
import { ANALYSIS_PROMPT } from "./prompt";
import { getPriceHistory, getQuote, getStockSummary } from "../api";
import { computeRiskMetrics } from "../risk";
import { StockNotFoundError, type AiExplanation } from "../types";

export const MODEL = "openai/gpt-oss-20b";
export class AnalysisUnavailable extends Error {}

// Compute approved numerical facts in code; the model explains this context.
export async function buildContext(symbol: string, now: Date) {
  const stock = await getStockSummary(symbol);
  if (!stock) throw new StockNotFoundError(symbol);
  const history = await getPriceHistory(symbol, "1Y", now);
  const quote = await getQuote(symbol, now);
  if (history.points.length < 3) throw new AnalysisUnavailable("Insufficient history");
  for (let i = 0; i < history.points.length; i++) {
    const p = history.points[i];
    if (!Number.isFinite(p.close) || p.close <= 0 || (i > 0 && p.date <= history.points[i - 1].date)) {
      throw new AnalysisUnavailable("Invalid history");
    }
  }
  const metrics = computeRiskMetrics(history.points);
  if (!metrics) throw new AnalysisUnavailable("Insufficient history");
  const first = history.points[0].date;
  const last = history.points[history.points.length - 1].date;
  // Synthetic daily observations have date-only semantics, not actual exchange close times.
  const dataAsOf = `${last}T00:00:00.000Z`;
  const facts: Record<string, string> = {
    performance: `For ${stock.companyName} (${stock.symbol}), the available synthetic prices cover ${first} through ${last}. Price ${metrics.priceChangePercent >= 0 ? "increased" : "decreased"} ${Math.abs(metrics.priceChangePercent).toFixed(1)}% between the first and last observations. This is historical performance, not a forecast.`,
    volatility: `Annualized historical volatility was ${metrics.annualizedVolatilityPercent.toFixed(1)}%. It measures the spread of past daily percentage returns, scaled to a yearly measure; it is not average daily movement or a complete measure of risk.`,
    drawdown: `Maximum drawdown was ${Math.abs(metrics.maxDrawdownPercent).toFixed(1)}% below a preceding peak within this window. This describes the largest observed peak-to-trough decline, not a prediction of future losses.`,
    limitations: "These are fictional FinSight sample prices, not live market data. Price history alone does not establish why a price moved. No news or causal evidence was supplied.",
  };
  if (quote.price === null) facts.missing = "A current quote is unavailable. The explanation uses historical sample prices only.";
  if (quote.quoteTime && now.getTime() - Date.parse(quote.quoteTime) > 3 * 86400_000) {
    facts.stale = "This sample quote is marked stale. It must not be treated as current market information.";
  }
  if (history.points.length < 100) facts.short = `Only ${history.points.length} daily observations are available. The limited history does not cover the full requested year and makes historical risk estimates less representative.`;
  return { stock, dataAsOf, facts };
}

export function validateExplanation(value: unknown, facts: Record<string, string>): { paragraphs: string[]; uncertaintyNotes: string[] } {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new AnalysisUnavailable("Invalid response");
  const record = value as Record<string, unknown>;
  if (Object.keys(record).sort().join() !== "paragraphs,uncertaintyNotes") throw new AnalysisUnavailable("Invalid fields");
  for (const [field, min, max, length] of [["paragraphs",2,4,700],["uncertaintyNotes",1,4,300]] as const) {
    const arr = record[field];
    if (!Array.isArray(arr) || arr.length < min || arr.length > max || arr.some(s => typeof s !== "string" || !s.trim() || s.length > length || /https?:|<[^>]*>|```/.test(s))) throw new AnalysisUnavailable("Invalid text");
  }
  const paragraphs = record.paragraphs as string[];
  const uncertaintyNotes = record.uncertaintyNotes as string[];
  const text = [...paragraphs,...uncertaintyNotes].join(" ");
  const allowed = new Set(Object.values(facts).join(" ").match(/\d+(?:\.\d+)?/g));
  if ((text.match(/\d+(?:\.\d+)?/g) ?? []).some(n => !allowed.has(n))) throw new AnalysisUnavailable("Unsupported number");
  if (!/synthetic|fictional|sample/i.test(text) || /buy now|you should (buy|sell|hold)|guaranteed|earnings beat|safer than most|averaged about|is a[n]? .*company|listed (?:on|in)/i.test(text)) throw new AnalysisUnavailable("Unsupported claim");
  return { paragraphs, uncertaintyNotes };
}

export async function generateAnalysis(symbol: string, key: string, now = new Date(), fetcher = fetch): Promise<AiExplanation> {
  const context = await buildContext(symbol, now);
  let response: Response;
  try {
    response = await fetcher("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(25_000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "User-Agent": "FinSight-AI-Demo/1.0" },
      body: JSON.stringify({ model: MODEL, reasoning_effort: "medium", max_completion_tokens: 2048,
        messages: [
          { role: "system", content: ANALYSIS_PROMPT + " Use only the numerical facts in approvedFacts. Do not add observation counts or other numbers. Include every supplied limitation. Do not describe synthetic exchange labels as actual listings. Do not infer an industry, sector, or company profile from a name. State only the ticker and available historical facts." },
          { role: "user", content: JSON.stringify({ stock: context.stock, dataMode: "synthetic-test", source: { provider: "FinSight fictional sample data", dataAsOf: context.dataAsOf }, approvedFacts: context.facts, limitations: [context.facts.limitations, ...["short", "stale", "missing"].filter(id => context.facts[id]).map(id => context.facts[id])] }) },
        ],
        response_format: { type: "json_schema", json_schema: { name: "finsight_explanation", strict: true,
          schema: { type: "object", properties: {
            paragraphs: { type: "array", minItems: 2, maxItems: 4, items: { type: "string", minLength: 1, maxLength: 700 } },
            uncertaintyNotes: { type: "array", minItems: 1, maxItems: 4, items: { type: "string", minLength: 1, maxLength: 300 } },
          }, required: ["paragraphs", "uncertaintyNotes"], additionalProperties: false } } },
      }),
    });
  } catch { throw new AnalysisUnavailable("AI provider unavailable"); }
  if (!response.ok) throw new AnalysisUnavailable("AI provider unavailable");
  try {
    const body = await response.json();
    if (body.choices?.[0]?.finish_reason !== "stop") throw new Error("Incomplete");
    const result = validateExplanation(JSON.parse(body.choices[0].message.content), context.facts);
    return { symbol: context.stock.symbol, generatedAt: new Date().toISOString(), dataAsOf: context.dataAsOf,
      generator: `Groq / ${MODEL} — AI explanation of FICTIONAL SAMPLE DATA`,
      paragraphs: result.paragraphs,
      uncertaintyNotes: [...new Set(["AI-generated text may contain errors or omissions.",
        "Fictional sample data only. Historical measures do not predict future performance.",
        "General research information, not a recommendation to buy, sell, or hold.",
        "The data-as-of timestamp represents the synthetic observation date at UTC midnight, not an exchange close.",
        ...["short", "stale", "missing"].filter(id => context.facts[id]).map(id => context.facts[id]), ...result.uncertaintyNotes])],
    };
  } catch { throw new AnalysisUnavailable("Invalid AI response"); }
}
