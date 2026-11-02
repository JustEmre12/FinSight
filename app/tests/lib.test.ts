import { describe, expect, it } from "vitest";
import { getAiExplanation, getPriceHistory, getQuote, searchStocks } from "@/lib/api";
import { alignHistories } from "@/lib/compare";
import { getFreshness } from "@/lib/freshness";
import { classifyVolatility, computeRiskMetrics } from "@/lib/risk";
import { checkSearchQuery } from "@/lib/search";
import { ProviderUnavailableError, StockNotFoundError, type PriceHistory, type Quote } from "@/lib/types";

const NOW = new Date("2026-10-30T18:00:00Z");

describe("checkSearchQuery (FR-02)", () => {
  it("rejects empty and whitespace-only input", () => {
    expect(checkSearchQuery("")).toMatchObject({ ok: false, reason: "empty" });
    expect(checkSearchQuery("   ")).toMatchObject({ ok: false, reason: "empty" });
    expect(checkSearchQuery(undefined)).toMatchObject({ ok: false, reason: "empty" });
  });
  it("rejects invalid characters and overly long input", () => {
    expect(checkSearchQuery("<script>")).toMatchObject({ ok: false, reason: "invalid-characters" });
    expect(checkSearchQuery("a".repeat(51))).toMatchObject({ ok: false, reason: "too-long" });
  });
  it("accepts tickers and company names, trimmed", () => {
    expect(checkSearchQuery("  nova ")).toEqual({ ok: true, query: "nova" });
    expect(checkSearchQuery("Brookwater Foods Co.")).toMatchObject({ ok: true });
  });
});

describe("searchStocks", () => {
  it("puts an exact ticker match first", async () => {
    const results = await searchStocks("nova");
    expect(results[0].symbol).toBe("NOVA");
    expect(results.map((r) => r.symbol)).toContain("NVGU");
  });
  it("matches part of a company name", async () => {
    expect((await searchStocks("health")).map((r) => r.symbol)).toEqual(["QTRX"]);
  });
  it("returns no matches for unknown text", async () => {
    expect(await searchStocks("zzzzqqq")).toEqual([]);
  });
});

describe("market data (FR-03, NFR-07)", () => {
  it("returns a recent, delayed quote with provider and currency", async () => {
    const q = await getQuote("nova", NOW);
    expect(q.symbol).toBe("NOVA");
    expect(q.price).toBeGreaterThan(0);
    expect(q.provider).toMatch(/sample/i);
    expect(getFreshness(q, NOW)).toBe("delayed");
  });
  it("flags stale and missing quotes", async () => {
    expect(getFreshness(await getQuote("BRKW", NOW), NOW)).toBe("stale");
    const missing = await getQuote("QTRX", NOW);
    expect(missing.price).toBeNull();
    expect(getFreshness(missing, NOW)).toBe("missing");
  });
  it("throws typed errors for unknown symbols and outages", async () => {
    await expect(getQuote("NOPE", NOW)).rejects.toBeInstanceOf(StockNotFoundError);
    await expect(getQuote("ZZZT", NOW)).rejects.toBeInstanceOf(ProviderUnavailableError);
    await expect(getPriceHistory("ZZZT", "1Y", NOW)).rejects.toBeInstanceOf(ProviderUnavailableError);
  });
  it("returns weekday history within the period, oldest first", async () => {
    const h = await getPriceHistory("GRNL", "1M", NOW);
    expect(h.points.length).toBeGreaterThan(15);
    expect(h.points.length).toBeLessThan(25);
    expect([...h.points].sort((a, b) => a.date.localeCompare(b.date))).toEqual(h.points);
    for (const p of h.points) expect([0, 6]).not.toContain(new Date(`${p.date}T00:00:00Z`).getUTCDay());
  });
  it("is deterministic for the same day", async () => {
    expect(await getPriceHistory("NOVA", "3M", NOW)).toEqual(await getPriceHistory("NOVA", "3M", NOW));
  });
});

describe("AI explanation (FR-04)", () => {
  it("includes uncertainty notes and never tells the user to buy or sell", async () => {
    const e = await getAiExplanation("NOVA", NOW);
    expect(e.uncertaintyNotes.length).toBeGreaterThan(0);
    const text = e.paragraphs.join(" ").toLowerCase();
    expect(text).not.toMatch(/\byou should (buy|sell)\b|\bguarantee/);
  });
});

describe("computeRiskMetrics (FR-08)", () => {
  it("returns null with fewer than two prices", () => {
    expect(computeRiskMetrics([])).toBeNull();
    expect(computeRiskMetrics([{ date: "2026-01-01", close: 10 }])).toBeNull();
  });
  it("computes change, drawdown and daily extremes", () => {
    const m = computeRiskMetrics([
      { date: "2026-01-01", close: 100 },
      { date: "2026-01-02", close: 110 },
      { date: "2026-01-05", close: 88 },
      { date: "2026-01-06", close: 120 },
    ])!;
    expect(m.priceChange).toBe(20);
    expect(m.priceChangePercent).toBeCloseTo(20);
    expect(m.maxDrawdownPercent).toBeCloseTo(-20);
    expect(m.largestDailyGainPercent).toBeCloseTo(36.36, 1);
    expect(m.largestDailyLossPercent).toBeCloseTo(-20);
  });
  it("gives zero volatility for a flat price", () => {
    const flat = Array.from({ length: 5 }, (_, i) => ({ date: `2026-01-0${i + 1}`, close: 50 }));
    expect(computeRiskMetrics(flat)!.annualizedVolatilityPercent).toBe(0);
  });
  it("classifies volatility bands", () => {
    expect(classifyVolatility(10)).toBe("lower");
    expect(classifyVolatility(25)).toBe("moderate");
    expect(classifyVolatility(55)).toBe("higher");
  });
});

describe("alignHistories (FR-06)", () => {
  const hist = (symbol: string, points: [string, number][]): PriceHistory => ({
    symbol,
    currency: "USD",
    provider: "test",
    period: "1M",
    retrievedAt: NOW.toISOString(),
    firstAvailableDate: points[0]?.[0] ?? null,
    points: points.map(([date, close]) => ({ date, close })),
  });

  it("uses only shared dates and reports the shorter history", () => {
    const a = hist("AAA", [["2026-01-01", 10], ["2026-01-02", 11], ["2026-01-05", 12]]);
    const b = hist("BBB", [["2026-01-02", 100], ["2026-01-05", 90]]);
    const c = alignHistories([a, b]);
    expect(c.startDate).toBe("2026-01-02");
    expect(c.rows.map((r) => r.date)).toEqual(["2026-01-02", "2026-01-05"]);
    expect(c.rows[1]).toMatchObject({ AAA: 9.09, BBB: -10 });
    expect(c.shortHistories).toEqual([{ symbol: "BBB", firstDate: "2026-01-02" }]);
    expect(c.summaries[1].priceChange).toBe(-10);
    expect(c.summaries[1].percentChange).toBeCloseTo(-10);
  });
  it("handles a stock with no history in the period", () => {
    const c = alignHistories([hist("AAA", [["2026-01-01", 10]]), hist("BBB", [])]);
    expect(c.rows).toEqual([]);
    expect(c.shortHistories).toEqual([{ symbol: "BBB", firstDate: null }]);
  });
});

describe("getFreshness", () => {
  const base: Quote = {
    symbol: "X", companyName: "X", exchange: "X", currency: "USD", price: 1, previousClose: 1,
    change: 0, changePercent: 0, quoteTime: NOW.toISOString(), provider: "p", delayMinutes: 0,
  };
  it("treats a fresh zero-delay quote as real-time", () => {
    expect(getFreshness(base, NOW)).toBe("realtime");
  });
  it("treats a quote over four days old as stale", () => {
    const old = new Date(NOW.getTime() - 97 * 3_600_000).toISOString();
    expect(getFreshness({ ...base, quoteTime: old }, NOW)).toBe("stale");
  });
});
