// Formatting helpers. Times are shown in UTC so the server and browser render
// the same text, and the time zone is always written out.

import type { CurrencyCode } from "./types";

export function formatMoney(value: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: currency === "USD" ? "symbol" : "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Money change with an explicit + or − sign, e.g. "+$1.25". */
export function formatSignedMoney(value: number, currency: CurrencyCode): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return sign + formatMoney(Math.abs(value), currency);
}

/** Percent with an explicit sign, e.g. "+3.20%". Input is already in percent units. */
export function formatSignedPercent(value: number, digits = 2): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(digits)}%`;
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

/** "Oct 30, 2026" from "2026-10-30". */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(`${isoDate.slice(0, 10)}T00:00:00Z`),
  );
}

/** "Oct 30, 2026, 3:45 PM UTC" */
export function formatDateTime(iso: string): string {
  return (
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date(iso)) + " UTC"
  );
}

/** Short axis label, e.g. "Oct 30" or "Oct '26". */
export function formatAxisDate(isoDate: string, includeYear: boolean): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (includeYear) {
    const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    return `${month} '${String(d.getUTCFullYear()).slice(2)}`;
  }
  return d.toLocaleString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

/** Plain-language age, e.g. "15 minutes ago", "9 days ago". */
export function formatAge(iso: string, now: Date = new Date()): string {
  const minutes = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} days ago`;
}
