// Historical risk measures (FR-08). These describe the PAST only and are not forecasts.

import type { PricePoint } from "./types";

/** Typical number of trading days in a year, used to annualize volatility. */
const TRADING_DAYS_PER_YEAR = 252;

export type VolatilityLevel = "lower" | "moderate" | "higher";

export interface RiskMetrics {
  startDate: string;
  endDate: string;
  startPrice: number;
  endPrice: number;
  /** Price change in currency units (e.g. dollars). */
  priceChange: number;
  /** Price change in percent. */
  priceChangePercent: number;
  /** Annualized standard deviation of daily returns, in percent. */
  annualizedVolatilityPercent: number;
  volatilityLevel: VolatilityLevel;
  /** Largest fall from a previous high within the period, in percent (negative or 0). */
  maxDrawdownPercent: number;
  largestDailyGainPercent: number;
  largestDailyLossPercent: number;
  tradingDays: number;
}

/** General bands for annualized volatility. They are rough guides, not ratings. */
export function classifyVolatility(annualizedPercent: number): VolatilityLevel {
  if (annualizedPercent < 20) return "lower";
  if (annualizedPercent < 40) return "moderate";
  return "higher";
}

/** Returns null when there are fewer than 2 prices (not enough to measure change). */
export function computeRiskMetrics(points: PricePoint[]): RiskMetrics | null {
  if (points.length < 2) return null;

  const returns: number[] = [];
  for (let i = 1; i < points.length; i++) {
    returns.push(points[i].close / points[i - 1].close - 1);
  }
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance =
    returns.length > 1 ? returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (returns.length - 1) : 0;
  const annualizedVolatilityPercent = Math.sqrt(variance) * Math.sqrt(TRADING_DAYS_PER_YEAR) * 100;

  let peak = points[0].close;
  let maxDrawdown = 0;
  for (const p of points) {
    peak = Math.max(peak, p.close);
    maxDrawdown = Math.min(maxDrawdown, p.close / peak - 1);
  }

  const first = points[0];
  const last = points[points.length - 1];
  return {
    startDate: first.date,
    endDate: last.date,
    startPrice: first.close,
    endPrice: last.close,
    priceChange: last.close - first.close,
    priceChangePercent: (last.close / first.close - 1) * 100,
    annualizedVolatilityPercent,
    volatilityLevel: classifyVolatility(annualizedVolatilityPercent),
    maxDrawdownPercent: maxDrawdown * 100,
    largestDailyGainPercent: Math.max(...returns) * 100,
    largestDailyLossPercent: Math.min(...returns) * 100,
    tradingDays: points.length,
  };
}
