import { generateAnalysis } from "@/lib/ai/groq";
import { ProviderUnavailableError, StockNotFoundError } from "@/lib/types";

export const runtime = "nodejs";
// Local demo only. Public deployment requires authenticated, durable quotas.
let calls = 0;
let windowStart = 0;
let busy = false;
const cache = new Map<string, { value: Awaited<ReturnType<typeof generateAnalysis>>; expires: number }>();

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development" || process.env.FINSIGHT_AI_ENABLED !== "true") {
    return reply({ error: "AI demo is disabled" }, 503);
  }
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") ?? url.host;
  let originUrl: URL;
  try { originUrl = new URL(origin ?? ""); } catch { return reply({ error: "Local origin required" }, 403); }
  if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) || !["localhost", "127.0.0.1", "[::1]"].includes(originUrl.hostname) || originUrl.host !== host || originUrl.protocol !== url.protocol) {
    return reply({ error: "Local same-origin requests only" }, 403);
  }
  const key = process.env.GROQ_API_KEY;
  if (!key) return reply({ error: "AI provider is not configured" }, 503);
  let symbol: string;
  try {
    const text = await request.text();
    if (text.length > 256) return reply({ error: "Request too large" }, 413);
    const body = JSON.parse(text);
    if (!body || Object.keys(body).length !== 1 || typeof body.symbol !== "string" || !/^[A-Za-z]{1,10}$/.test(body.symbol)) {
      return reply({ error: "A valid symbol is required" }, 400);
    }
    symbol = body.symbol.toUpperCase();
  } catch { return reply({ error: "Invalid JSON" }, 400); }
  const cached = cache.get(symbol);
  if (cached && cached.expires > Date.now()) return reply(cached.value);
  if (Date.now() - windowStart >= 3600_000) { calls = 0; windowStart = Date.now(); }
  if (busy || calls >= 10) return reply({ error: "Local demo usage limit reached; try later" }, 429);
  busy = true;
  calls++;
  try {
    const value = await generateAnalysis(symbol, key);
    cache.set(symbol, { value, expires: Date.now() + 5 * 60_000 });
    return reply(value);
  } catch (error) {
    if (error instanceof StockNotFoundError) return reply({ error: "Stock not found" }, 404);
    if (error instanceof ProviderUnavailableError) return reply({ error: "Market context unavailable" }, 503);
    return reply({ error: "AI explanation unavailable; please try later" }, 502);
  } finally { busy = false; }
}
