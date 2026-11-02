// SAMPLE DATA ONLY — not real market prices.
//
// No market-data provider has been chosen yet (docs/DECISIONS.md, issue #26),
// so this file generates made-up prices for fictional companies. Only
// lib/api.ts should import it. When the backend is ready, lib/api.ts will call
// it instead and this file can be deleted.

import type { PricePoint, StockSummary } from "./types";

export const SAMPLE_PROVIDER = "FinSight sample data (not a real provider)";

/** What each fictional stock demonstrates, so testers can find every UI state. */
export type SampleScenario =
  | "normal"
  | "stale-quote" // quote is more than a week old
  | "missing-quote" // provider has history but no current price
  | "recent-listing" // only a few weeks of history
  | "outage"; // every request fails

export interface SampleStock extends StockSummary {
  scenario: SampleScenario;
  startPrice: number;
  /** Typical size of a daily move, e.g. 0.02 = 2%. */
  dailyVolatility: number;
  /** Average daily drift, e.g. 0.0003. */
  dailyDrift: number;
}

export const SAMPLE_STOCKS: SampleStock[] = [
  { symbol: "NOVA", companyName: "Nova Robotics Inc.", exchange: "NASDAQ", currency: "USD", scenario: "normal", startPrice: 84, dailyVolatility: 0.021, dailyDrift: 0.0006 },
  { symbol: "NVGU", companyName: "Nova Grid Utilities Corp.", exchange: "NYSE", currency: "USD", scenario: "normal", startPrice: 46, dailyVolatility: 0.009, dailyDrift: 0.0002 },
  { symbol: "GRNL", companyName: "Greenleaf Energy Corp.", exchange: "NYSE", currency: "USD", scenario: "normal", startPrice: 31, dailyVolatility: 0.031, dailyDrift: 0.0003 },
  { symbol: "MAPL", companyName: "Maple Harbor Financial", exchange: "TSX", currency: "CAD", scenario: "normal", startPrice: 52, dailyVolatility: 0.011, dailyDrift: 0.0002 },
  { symbol: "BRKW", companyName: "Brookwater Foods Co.", exchange: "NYSE", currency: "USD", scenario: "stale-quote", startPrice: 64, dailyVolatility: 0.012, dailyDrift: 0.0001 },
  { symbol: "QTRX", companyName: "Quantrix Health Ltd.", exchange: "NASDAQ", currency: "USD", scenario: "missing-quote", startPrice: 18, dailyVolatility: 0.027, dailyDrift: 0.0001 },
  { symbol: "LUMA", companyName: "Lumawave Media Inc.", exchange: "NASDAQ", currency: "USD", scenario: "recent-listing", startPrice: 21, dailyVolatility: 0.04, dailyDrift: 0.0008 },
  { symbol: "ZZZT", companyName: "Outage Test Systems (always fails)", exchange: "NYSE", currency: "USD", scenario: "outage", startPrice: 10, dailyVolatility: 0.01, dailyDrift: 0 },
];

/** Prices start on this fixed date so past values stay the same day to day. */
const HISTORY_ANCHOR = "2020-01-02";
/** How many days ago a stale quote was last updated. */
export const STALE_QUOTE_AGE_DAYS = 9;
/** How many calendar days of history a recently listed stock has. */
const RECENT_LISTING_DAYS = 75;
/** Sample quotes are shown as 15-minute delayed, like many free data feeds. */
export const SAMPLE_DELAY_MINUTES = 15;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function findSampleStock(symbol: string): SampleStock | undefined {
  const upper = symbol.trim().toUpperCase();
  return SAMPLE_STOCKS.find((s) => s.symbol === upper);
}

/** Small deterministic random generator so every run shows the same prices. */
function seededRandom(seedText: string): () => number {
  let seed = 0;
  for (const ch of seedText) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Normally distributed random number (Box–Muller). */
function gaussian(random: () => number): number {
  const u = Math.max(random(), 1e-12);
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isWeekday(date: Date): boolean {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Full daily closing-price history for a sample stock, from the anchor date to
 * `now` (weekdays only; holidays are ignored for simplicity).
 */
export function generateFullHistory(stock: SampleStock, now: Date): PricePoint[] {
  const random = seededRandom(stock.symbol);
  const points: PricePoint[] = [];
  let price = stock.startPrice;

  let end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (stock.scenario === "stale-quote") end = new Date(end.getTime() - STALE_QUOTE_AGE_DAYS * MS_PER_DAY);
  const listedFrom =
    stock.scenario === "recent-listing" ? toIsoDate(new Date(end.getTime() - RECENT_LISTING_DAYS * MS_PER_DAY)) : null;

  for (let d = new Date(`${HISTORY_ANCHOR}T00:00:00Z`); d <= end; d = new Date(d.getTime() + MS_PER_DAY)) {
    if (!isWeekday(d)) continue;
    price = Math.max(1, price * (1 + stock.dailyDrift + stock.dailyVolatility * gaussian(random)));
    const date = toIsoDate(d);
    if (listedFrom && date < listedFrom) continue;
    points.push({ date, close: round2(price) });
  }
  return points;
}
