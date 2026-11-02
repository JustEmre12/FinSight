// The ONE place the UI gets data from.
//
// Today every function returns typed SAMPLE data (see lib/sample-data.ts),
// because no market-data or AI provider has been chosen (docs/DECISIONS.md).
// When the backend is ready, replace the body of each function with a call to
// the backend (e.g. `fetch("/api/stocks/" + symbol)`) and keep the same
// signatures and return types. Components should not need to change.
//
// Never put API keys in this file: it is bundled for the browser. Provider keys
// belong on the server (see ../.env.example).

import { computeRiskMetrics } from "./risk";
import {
  SAMPLE_DELAY_MINUTES,
  SAMPLE_PROVIDER,
  SAMPLE_STOCKS,
  findSampleStock,
  generateFullHistory,
  type SampleStock,
} from "./sample-data";
import {
  ProviderUnavailableError,
  StockNotFoundError,
  type AiExplanation,
  type Period,
  type PriceHistory,
  type Quote,
  type StockSummary,
  type WatchlistItem,
} from "./types";

/** True while the app is showing sample data. The UI uses this to show the banner. */
export const IS_SAMPLE_DATA = true;
export const DATA_SOURCE_NAME = SAMPLE_PROVIDER;

/** Days of history to return for each period (calendar days). */
const PERIOD_DAYS: Record<Period, number> = { "1M": 31, "3M": 92, "6M": 183, "1Y": 366, "5Y": 1827 };

function toSummary(s: SampleStock): StockSummary {
  return { symbol: s.symbol, companyName: s.companyName, exchange: s.exchange, currency: s.currency };
}

function requireStock(symbol: string): SampleStock {
  const stock = findSampleStock(symbol);
  if (!stock) throw new StockNotFoundError(symbol.toUpperCase());
  if (stock.scenario === "outage") throw new ProviderUnavailableError();
  return stock;
}

// ---------------------------------------------------------------- Search (FR-02)

/**
 * Find stocks whose ticker or company name matches the query.
 * Exact ticker matches come first. Validate the query with checkSearchQuery() first.
 */
export async function searchStocks(query: string): Promise<StockSummary[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = SAMPLE_STOCKS.map((s) => {
    const symbol = s.symbol.toLowerCase();
    const name = s.companyName.toLowerCase();
    let score = 0;
    if (symbol === q) score = 4;
    else if (symbol.startsWith(q)) score = 3;
    else if (name.startsWith(q)) score = 2;
    else if (name.includes(q)) score = 1;
    return { s, score };
  }).filter((x) => x.score > 0);
  scored.sort((a, b) => b.score - a.score || a.s.symbol.localeCompare(b.s.symbol));
  return scored.map((x) => toSummary(x.s));
}

/** Basic info for a symbol, or null if it does not exist. Does not contact the provider. */
export async function getStockSummary(symbol: string): Promise<StockSummary | null> {
  const stock = findSampleStock(symbol);
  return stock ? toSummary(stock) : null;
}

/** All stocks available in the sample data (used for suggestions). */
export async function listAvailableStocks(): Promise<StockSummary[]> {
  return SAMPLE_STOCKS.map(toSummary);
}

// ------------------------------------------------------------ Market data (FR-03)

/** Latest quote. Throws StockNotFoundError or ProviderUnavailableError. */
export async function getQuote(symbol: string, now: Date = new Date()): Promise<Quote> {
  const stock = requireStock(symbol);
  const history = generateFullHistory(stock, now);
  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const base = {
    symbol: stock.symbol,
    companyName: stock.companyName,
    exchange: stock.exchange,
    currency: stock.currency,
    provider: SAMPLE_PROVIDER,
    delayMinutes: SAMPLE_DELAY_MINUTES,
  };

  if (stock.scenario === "missing-quote" || !last) {
    return { ...base, price: null, previousClose: prev?.close ?? null, change: null, changePercent: null, quoteTime: null };
  }

  const quoteTime =
    stock.scenario === "stale-quote"
      ? new Date(`${last.date}T20:00:00Z`) // market close on the last day with data
      : new Date(now.getTime() - SAMPLE_DELAY_MINUTES * 60_000);
  const change = prev ? last.close - prev.close : null;
  return {
    ...base,
    price: last.close,
    previousClose: prev?.close ?? null,
    change,
    changePercent: prev && change !== null ? (change / prev.close) * 100 : null,
    quoteTime: quoteTime.toISOString(),
  };
}

/** Daily closing prices for a period. Throws StockNotFoundError or ProviderUnavailableError. */
export async function getPriceHistory(symbol: string, period: Period, now: Date = new Date()): Promise<PriceHistory> {
  const stock = requireStock(symbol);
  const full = generateFullHistory(stock, now);
  const cutoff = new Date(now.getTime() - PERIOD_DAYS[period] * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return {
    symbol: stock.symbol,
    currency: stock.currency,
    provider: SAMPLE_PROVIDER,
    period,
    points: full.filter((p) => p.date >= cutoff),
    retrievedAt: now.toISOString(),
    firstAvailableDate: full[0]?.date ?? null,
  };
}

// ------------------------------------------------------------ AI explanation (FR-04)

/**
 * A plain-language explanation of recent price movement.
 * Today this is TEMPLATE text built from the sample prices — no AI model is
 * connected (issue #27). The real version must keep the same rules: no buy/sell
 * advice, no predictions presented as fact, and clear uncertainty notes.
 */
export async function getAiExplanation(symbol: string, now: Date = new Date()): Promise<AiExplanation> {
  const history = await getPriceHistory(symbol, "1Y", now);
  const stock = requireStock(symbol);
  const metrics = computeRiskMetrics(history.points);
  const lastDate = history.points[history.points.length - 1]?.date ?? now.toISOString().slice(0, 10);

  const paragraphs: string[] = [];
  if (!metrics) {
    paragraphs.push(
      `There is not enough price history for ${stock.symbol} yet to describe how it has moved. ` +
        "An explanation will be possible once more trading days are available.",
    );
  } else {
    const direction = metrics.priceChangePercent >= 0 ? "rose" : "fell";
    const months = Math.max(1, Math.round(metrics.tradingDays / 21));
    paragraphs.push(
      `Over the last ${months === 1 ? "month" : `${months} months`} of available data, ${stock.companyName} ` +
        `(${stock.symbol}) ${direction} about ${Math.abs(metrics.priceChangePercent).toFixed(0)}%. ` +
        "That number only compares the first and last price, so it hides the ups and downs in between.",
    );
    const swing =
      metrics.volatilityLevel === "higher"
        ? "large day-to-day swings compared with many established companies"
        : metrics.volatilityLevel === "moderate"
          ? "moderate day-to-day swings"
          : "relatively small day-to-day swings";
    paragraphs.push(
      `The price showed ${swing}. At its worst point in this period it was about ` +
        `${Math.abs(metrics.maxDrawdownPercent).toFixed(0)}% below its earlier high, which shows how far ` +
        "someone who bought at the high would have been down at that moment.",
    );
    paragraphs.push(
      "Price moves like these can come from company news, earnings reports, interest rates or the overall " +
        "market mood. This explanation does not know which of those caused the moves.",
    );
  }

  return {
    symbol: stock.symbol,
    generatedAt: now.toISOString(),
    dataAsOf: `${lastDate}T20:00:00Z`,
    generator: "Sample template text — no AI model connected yet",
    paragraphs,
    uncertaintyNotes: [
      "This text is generated automatically and can be wrong or incomplete.",
      "It only looks at past prices. It cannot predict future prices.",
      "It does not consider your goals or finances, so it is not advice to buy, sell or hold.",
    ],
  };
}

// ------------------------------------------------------------ Watchlist (FR-05)
//
// Mock storage in the browser's localStorage, keyed by user id so one user
// cannot see another user's list. Asad's backend will replace this with
// authenticated, server-side storage (issue #40).

const watchlistKey = (userId: string) => `finsight.watchlist.${userId}`;

function readWatchlist(userId: string): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(watchlistKey(userId));
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as WatchlistItem[]) : [];
  } catch {
    return [];
  }
}

function writeWatchlist(userId: string, items: WatchlistItem[]): void {
  window.localStorage.setItem(watchlistKey(userId), JSON.stringify(items));
}

export async function getWatchlist(userId: string): Promise<WatchlistItem[]> {
  return readWatchlist(userId);
}

/** Adds a symbol. Throws StockNotFoundError for unknown symbols. Adding twice is a no-op. */
export async function addToWatchlist(userId: string, symbol: string): Promise<WatchlistItem[]> {
  const stock = findSampleStock(symbol);
  if (!stock) throw new StockNotFoundError(symbol.toUpperCase());
  const items = readWatchlist(userId);
  if (!items.some((i) => i.symbol === stock.symbol)) {
    items.push({ symbol: stock.symbol, addedAt: new Date().toISOString() });
    writeWatchlist(userId, items);
  }
  return items;
}

export async function removeFromWatchlist(userId: string, symbol: string): Promise<WatchlistItem[]> {
  const items = readWatchlist(userId).filter((i) => i.symbol !== symbol.toUpperCase());
  writeWatchlist(userId, items);
  return items;
}
