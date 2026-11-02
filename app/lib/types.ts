// Shared data types for the FinSight frontend.
// Field names follow docs/DATA_DICTIONARY.md (D2 Market Data Cache, D3 Watchlists,
// D4 Analysis History) so the backend can return the same shapes later.

export type CurrencyCode = "USD" | "CAD";

/** A stock that can be found by search (FR-02). */
export interface StockSummary {
  symbol: string;
  companyName: string;
  exchange: string;
  currency: CurrencyCode;
}

/** The latest available quote for a stock (FR-03). */
export interface Quote {
  symbol: string;
  companyName: string;
  exchange: string;
  currency: CurrencyCode;
  /** null when the provider has no current price (missing quote). */
  price: number | null;
  previousClose: number | null;
  change: number | null;
  changePercent: number | null;
  /** ISO timestamp of when the provider recorded this price; null if missing. */
  quoteTime: string | null;
  /** Name of the data source shown to users (NFR-07). */
  provider: string;
  /** How many minutes the provider delays quotes (0 = real time). */
  delayMinutes: number;
}

export const PERIODS = ["1M", "3M", "6M", "1Y", "5Y"] as const;
export type Period = (typeof PERIODS)[number];

export const PERIOD_LABELS: Record<Period, string> = {
  "1M": "1 month",
  "3M": "3 months",
  "6M": "6 months",
  "1Y": "1 year",
  "5Y": "5 years",
};

/** One daily closing price. `date` is YYYY-MM-DD. */
export interface PricePoint {
  date: string;
  close: number;
}

/** Daily closing prices for one stock over a period (FR-03, FR-07). */
export interface PriceHistory {
  symbol: string;
  currency: CurrencyCode;
  provider: string;
  period: Period;
  points: PricePoint[];
  /** ISO timestamp of when this history was retrieved. */
  retrievedAt: string;
  /** Earliest date the provider has any history for (e.g. a recent listing). */
  firstAvailableDate: string | null;
}

/** An AI-generated explanation (FR-04). Always shown with an "AI-generated" label. */
export interface AiExplanation {
  symbol: string;
  generatedAt: string;
  /** Timestamp of the market data the explanation was based on. */
  dataAsOf: string;
  /** Which model or service produced the text. */
  generator: string;
  paragraphs: string[];
  uncertaintyNotes: string[];
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

/** A saved watchlist entry (D3 Watchlists). */
export interface WatchlistItem {
  symbol: string;
  addedAt: string;
}

/** Thrown when the market-data provider cannot be reached (outage state). */
export class ProviderUnavailableError extends Error {
  constructor(message = "The market data provider is not responding right now.") {
    super(message);
    this.name = "ProviderUnavailableError";
  }
}

/** Thrown when a symbol does not exist. */
export class StockNotFoundError extends Error {
  constructor(symbol: string) {
    super(`No stock found with symbol "${symbol}".`);
    this.name = "StockNotFoundError";
  }
}
