"use client";

// Labeled price chart (FR-07 / US-06) with an accessible table alternative.

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatAxisDate, formatDate, formatDateTime, formatMoney, formatSignedMoney } from "@/lib/format";
import type { CurrencyCode, PricePoint } from "@/lib/types";

interface Props {
  symbol: string;
  points: PricePoint[];
  currency: CurrencyCode;
  provider: string;
  retrievedAt: string;
  periodLabel: string;
}

export function PriceChart({ symbol, points, currency, provider, retrievedAt, periodLabel }: Props) {
  const first = points[0];
  const last = points[points.length - 1];
  const longRange = points.length > 0 && first.date.slice(0, 4) !== last.date.slice(0, 4);
  const low = Math.min(...points.map((p) => p.close));
  const high = Math.max(...points.map((p) => p.close));
  const summary = first
    ? `Line chart of ${symbol} daily closing prices in ${currency} from ${formatDate(first.date)} to ${formatDate(last.date)}. ` +
      `Started at ${formatMoney(first.close, currency)}, ended at ${formatMoney(last.close, currency)}. ` +
      `Lowest ${formatMoney(low, currency)}, highest ${formatMoney(high, currency)}.`
    : "";

  return (
    <figure className="space-y-3">
      <figcaption className="space-y-0.5">
        <span className="block font-semibold">
          {symbol} daily closing price, last {periodLabel}
        </span>
        <span className="block text-sm text-muted">
          Source: {provider} · retrieved {formatDateTime(retrievedAt)}
        </span>
      </figcaption>

      <div role="img" aria-label={summary} className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 8, right: 16, bottom: 28, left: 16 }}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(d: string) => formatAxisDate(d, longRange)}
              minTickGap={32}
              tick={{ fill: "#334155", fontSize: 12 }}
              label={{ value: "Date", position: "insideBottom", offset: -18, fill: "#334155", fontSize: 12 }}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(v: number) => formatMoney(v, currency).replace(/\.00$/, "")}
              width={72}
              tick={{ fill: "#334155", fontSize: 12 }}
              label={{
                value: `Closing price (${currency})`,
                angle: -90,
                position: "insideLeft",
                offset: -8,
                style: { textAnchor: "middle", fill: "#334155", fontSize: 12 },
              }}
            />
            <Tooltip
              formatter={(value) => [formatMoney(Number(value), currency), "Close"]}
              labelFormatter={(label) => formatDate(String(label))}
            />
            <Line type="monotone" dataKey="close" name="Closing price" stroke="#1d4ed8" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <details className="rounded-lg border border-slate-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-brand">
          Show chart data as a table ({points.length} trading days)
        </summary>
        <div tabIndex={0} role="region" aria-label={`${symbol} price table`} className="max-h-80 overflow-auto border-t border-slate-200">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {symbol} daily closing prices in {currency}, newest first. Source: {provider}.
            </caption>
            <thead className="sticky top-0 bg-slate-100 text-left">
              <tr>
                <th scope="col" className="px-4 py-2">Date</th>
                <th scope="col" className="px-4 py-2 text-right">Closing price ({currency})</th>
                <th scope="col" className="px-4 py-2 text-right">Change from previous day ({currency})</th>
              </tr>
            </thead>
            <tbody>
              {points
                .map((p, i) => ({ ...p, change: i > 0 ? p.close - points[i - 1].close : null }))
                .reverse()
                .map((p) => (
                  <tr key={p.date} className="border-t border-slate-100">
                    <th scope="row" className="px-4 py-1.5 text-left font-normal">{formatDate(p.date)}</th>
                    <td className="px-4 py-1.5 text-right tabular-nums">{formatMoney(p.close, currency)}</td>
                    <td className="px-4 py-1.5 text-right tabular-nums">
                      {p.change === null ? "—" : formatSignedMoney(p.change, currency)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
