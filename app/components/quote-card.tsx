import { Notice } from "./notice";
import { getFreshness, STALE_AFTER_HOURS } from "@/lib/freshness";
import { formatAge, formatDateTime, formatMoney, formatSignedMoney, formatSignedPercent } from "@/lib/format";
import type { Quote } from "@/lib/types";

const FRESHNESS_BADGE = {
  realtime: { text: "Real-time", className: "bg-emerald-100 text-emerald-900" },
  delayed: { text: "Delayed", className: "bg-blue-100 text-blue-900" },
  stale: { text: "Out of date", className: "bg-amber-200 text-amber-950" },
  missing: { text: "No current price", className: "bg-slate-200 text-slate-900" },
} as const;

/** Current price plus where it came from and how old it is (FR-03, NFR-07). */
export function QuoteCard({ quote, now }: { quote: Quote; now: Date }) {
  const freshness = getFreshness(quote, now);
  const badge = FRESHNESS_BADGE[freshness];
  const up = (quote.change ?? 0) >= 0;

  return (
    <section aria-labelledby="quote-heading" className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <h2 id="quote-heading" className="sr-only">Current price</h2>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {quote.price !== null ? (
          <p className="text-4xl font-bold tabular-nums">{formatMoney(quote.price, quote.currency)}</p>
        ) : (
          <p className="text-2xl font-semibold text-muted">Price not available</p>
        )}
        {quote.change !== null && quote.changePercent !== null && (
          <p className={`text-lg font-semibold tabular-nums ${up ? "text-gain" : "text-loss"}`}>
            <span aria-hidden="true">{up ? "▲" : "▼"} </span>
            {formatSignedMoney(quote.change, quote.currency)} ({formatSignedPercent(quote.changePercent)})
            <span className="ml-1 text-sm font-normal text-muted">vs. previous close</span>
          </p>
        )}
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${badge.className}`}>{badge.text}</span>
      </div>

      {freshness === "stale" && quote.quoteTime && (
        <Notice tone="warning" title="This price is out of date">
          <p>
            The latest price we have is from {formatDateTime(quote.quoteTime)} ({formatAge(quote.quoteTime, now)}). Prices
            older than {STALE_AFTER_HOURS / 24} days may be very different from today&apos;s price.
          </p>
        </Notice>
      )}
      {freshness === "missing" && (
        <Notice tone="warning" title="No current price from the data provider">
          <p>
            The provider did not send a current price for {quote.symbol}. This can happen when trading is paused or
            the provider has a delay. Price history below may still be available.
          </p>
        </Notice>
      )}

      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-muted">Price time</dt>
          <dd className="font-medium">
            {quote.quoteTime ? (
              <>
                {formatDateTime(quote.quoteTime)}
                <span className="block text-muted">{formatAge(quote.quoteTime, now)}</span>
              </>
            ) : (
              "Not available"
            )}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Currency</dt>
          <dd className="font-medium">{quote.currency === "USD" ? "US dollars (USD)" : "Canadian dollars (CAD)"}</dd>
        </div>
        <div>
          <dt className="text-muted">Data source</dt>
          <dd className="font-medium">{quote.provider}</dd>
        </div>
        <div>
          <dt className="text-muted">Delay</dt>
          <dd className="font-medium">
            {quote.delayMinutes > 0 ? `Up to ${quote.delayMinutes} minutes behind the market` : "Real-time"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
