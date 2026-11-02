// Line up several price histories on the same dates (FR-06 / US-05).

import type { CurrencyCode, PriceHistory } from "./types";

export interface ComparisonSummary {
  symbol: string;
  currency: CurrencyCode;
  startDate: string;
  endDate: string;
  startPrice: number;
  endPrice: number;
  /** Change in the stock's own currency. */
  priceChange: number;
  /** Change in percent — the measure that can be compared across stocks. */
  percentChange: number;
}

export interface HistoryGap {
  symbol: string;
  /** First date this stock has data in the requested period, or null if none. */
  firstDate: string | null;
}

export interface Comparison {
  /** Shared date range used for every stock. */
  startDate: string | null;
  endDate: string | null;
  /** One row per shared date: { date, NOVA: 3.2, GRNL: -1.1 } as % change since start. */
  rows: Array<{ date: string } & Record<string, number | string>>;
  summaries: ComparisonSummary[];
  /** Stocks whose history starts later than the others, shortening the shared range. */
  shortHistories: HistoryGap[];
}

/**
 * Keep only the dates every stock has, then express each price as the % change
 * since the first shared date so stocks with very different prices can be compared.
 */
export function alignHistories(histories: PriceHistory[]): Comparison {
  const empty: Comparison = { startDate: null, endDate: null, rows: [], summaries: [], shortHistories: [] };
  if (histories.length === 0) return empty;

  const dateSets = histories.map((h) => new Set(h.points.map((p) => p.date)));
  const sharedDates = [...dateSets[0]].filter((d) => dateSets.every((set) => set.has(d))).sort();

  const firstDates = histories.map((h) => h.points[0]?.date ?? null);
  const earliest = firstDates.filter((d): d is string => d !== null).sort()[0];
  const shortHistories: HistoryGap[] = histories
    .map((h, i) => ({ symbol: h.symbol, firstDate: firstDates[i] }))
    .filter((g) => g.firstDate === null || g.firstDate > earliest);

  if (sharedDates.length === 0) return { ...empty, shortHistories };

  const priceBy = histories.map((h) => new Map(h.points.map((p) => [p.date, p.close])));
  const startDate = sharedDates[0];
  const endDate = sharedDates[sharedDates.length - 1];

  const rows = sharedDates.map((date) => {
    const row: { date: string } & Record<string, number | string> = { date };
    histories.forEach((h, i) => {
      const start = priceBy[i].get(startDate)!;
      row[h.symbol] = Math.round((priceBy[i].get(date)! / start - 1) * 10000) / 100;
    });
    return row;
  });

  const summaries = histories.map((h, i) => {
    const startPrice = priceBy[i].get(startDate)!;
    const endPrice = priceBy[i].get(endDate)!;
    return {
      symbol: h.symbol,
      currency: h.currency,
      startDate,
      endDate,
      startPrice,
      endPrice,
      priceChange: endPrice - startPrice,
      percentChange: (endPrice / startPrice - 1) * 100,
    };
  });

  return { startDate, endDate, rows, summaries, shortHistories };
}
