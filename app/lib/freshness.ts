// How current is a quote? (NFR-07: clearly show stale or missing data.)

import type { Quote } from "./types";

/** A quote older than this is "stale". Four days covers normal and long weekends. */
export const STALE_AFTER_HOURS = 96;

export type Freshness = "delayed" | "realtime" | "stale" | "missing";

export function getFreshness(quote: Quote, now: Date = new Date()): Freshness {
  if (quote.price === null || quote.quoteTime === null) return "missing";
  const ageHours = (now.getTime() - new Date(quote.quoteTime).getTime()) / 3_600_000;
  if (ageHours > STALE_AFTER_HOURS) return "stale";
  return quote.delayMinutes > 0 ? "delayed" : "realtime";
}
