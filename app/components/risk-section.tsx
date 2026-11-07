// Historical risk (FR-08 / US-07). Past measures and the (absent) forecast are
// shown in separate, clearly labeled blocks.

import { Notice } from "./notice";
import { formatDate, formatMoney, formatPercent, formatSignedMoney, formatSignedPercent } from "@/lib/format";
import { computeRiskMetrics, type VolatilityLevel } from "@/lib/risk";
import type { PriceHistory } from "@/lib/types";

const LEVEL_TEXT: Record<VolatilityLevel, string> = {
  lower: "Lower historical variability",
  moderate: "Moderate",
  higher: "Higher historical variability",
};

function Stat({ label, value, explain }: { label: string; value: string; explain: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 space-y-1">
        <span className="block text-2xl font-semibold tabular-nums">{value}</span>
        <span className="block text-sm text-muted">{explain}</span>
      </dd>
    </div>
  );
}

export function RiskSection({ history, periodLabel }: { history: PriceHistory; periodLabel: string }) {
  const m = computeRiskMetrics(history.points);
  const cur = history.currency;

  return (
    <section aria-labelledby="risk-heading" className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="space-y-1">
        <h2 id="risk-heading" className="text-xl font-semibold">
          Risk: how the price behaved in the past
        </h2>
        <p className="text-sm text-muted">
          Risk here means how much and how quickly the price has moved. Bigger, faster moves mean a bigger chance of
          losing money over short periods.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="flex flex-wrap items-center gap-2 font-semibold">
          <span className="rounded-full bg-slate-200 px-3 py-0.5 text-sm text-slate-900">Past data</span>
          Last {periodLabel}
        </h3>
        {!m ? (
          <Notice tone="info" title="Risk measures unavailable">
            <p>We need at least three valid, ordered daily prices. Missing or invalid data cannot be treated as zero risk. Try a longer period.</p>
          </Notice>
        ) : (
          <>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Stat
                label={`Price change (${cur})`}
                value={formatSignedMoney(m.priceChange, cur)}
                explain={`From ${formatMoney(m.startPrice, cur)} to ${formatMoney(m.endPrice, cur)} per share.`}
              />
              <Stat
                label="Price change (%)"
                value={formatSignedPercent(m.priceChangePercent, 1)}
                explain="The same change as a percentage, so it can be compared with other stocks."
              />
              <Stat
                label="Volatility (yearly, %)"
                value={formatPercent(m.annualizedVolatilityPercent)}
                explain={`${LEVEL_TEXT[m.volatilityLevel]}. The spread of past daily percentage returns, scaled by the square root of 252 trading days. This is not an average yearly price move.`}
              />
              <Stat
                label="Biggest drop from a high (%)"
                value={formatSignedPercent(m.maxDrawdownPercent, 1)}
                explain="The largest fall from a previous peak during this period."
              />
              <Stat
                label="Largest one-day rise (%)"
                value={formatSignedPercent(m.largestDailyGainPercent, 1)}
                explain={m.largestDailyGainPercent === 0 ? "No positive daily return was observed in this window." : "The biggest gain between consecutive daily observations."}
              />
              <Stat
                label="Largest one-day fall (%)"
                value={formatSignedPercent(m.largestDailyLossPercent, 1)}
                explain={m.largestDailyLossPercent === 0 ? "No negative daily return was observed in this window." : "The biggest loss between consecutive daily observations."}
              />
            </dl>
            <p className="text-sm text-muted">
              Based on {m.tradingDays} daily closing prices from {formatDate(m.startDate)} to {formatDate(m.endDate)}.
              {m.tradingDays < 21 && "Limited history: fewer than 20 daily returns; estimates may be unstable. "}
              Source: {history.provider}. Volatility bands (under 20%, 20–40%, over 40%) are rough guides, not ratings or comparisons with other stocks.
            </p>
          </>
        )}
      </div>

      <div className="space-y-2 rounded-lg border border-dashed border-slate-400 p-4">
        <h3 className="flex flex-wrap items-center gap-2 font-semibold">
          <span className="rounded-full border border-slate-400 px-3 py-0.5 text-sm">Future</span>
          No forecast
        </h3>
        <p className="text-sm">
          FinSight does not predict future prices. A stock that rose or stayed calm in the past can still fall or
          swing sharply later.
        </p>
      </div>

      <p className="text-sm font-medium">
        General information only — not personal financial advice and not a recommendation to buy, sell or hold.
      </p>
    </section>
  );
}
