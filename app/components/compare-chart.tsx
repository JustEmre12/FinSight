"use client";

// Percent-change comparison chart (FR-06). Every line starts at 0% on the same
// date, so stocks with very different prices can be compared fairly.

import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatAxisDate, formatDate, formatSignedPercent } from "@/lib/format";

/** Colours chosen for contrast on white; dash patterns help colour-blind readers. */
export const SERIES_STYLES = [
  { color: "#1d4ed8", dash: undefined },
  { color: "#b45309", dash: "8 4" },
  { color: "#047857", dash: "2 3" },
  { color: "#7c3aed", dash: "12 4 2 4" },
  { color: "#be185d", dash: "4 4" },
];

export function CompareChart({
  symbols,
  rows,
  title,
  source,
}: {
  symbols: string[];
  rows: Array<Record<string, number | string>>;
  title: string;
  source: string;
}) {
  const first = String(rows[0]?.date ?? "");
  const last = String(rows[rows.length - 1]?.date ?? "");
  const longRange = first.slice(0, 4) !== last.slice(0, 4);
  const endRow = rows[rows.length - 1] ?? {};
  const summary =
    `Line chart of percent change since ${formatDate(first)} up to ${formatDate(last)}. ` +
    symbols.map((s) => `${s} ended at ${formatSignedPercent(Number(endRow[s]), 1)}`).join(", ") +
    ".";

  return (
    <figure className="space-y-3">
      <figcaption className="space-y-0.5">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted">{source}</span>
      </figcaption>
      <div role="img" aria-label={summary} className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 16, bottom: 28, left: 16 }}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(d: string) => formatAxisDate(d, longRange)}
              minTickGap={32}
              tick={{ fill: "#334155", fontSize: 12 }}
              label={{ value: "Date", position: "insideBottom", offset: -18, fill: "#334155", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(v: number) => `${v}%`}
              width={64}
              tick={{ fill: "#334155", fontSize: 12 }}
              label={{
                value: "Change since start (%)",
                angle: -90,
                position: "insideLeft",
                offset: -4,
                style: { textAnchor: "middle", fill: "#334155", fontSize: 12 },
              }}
            />
            <ReferenceLine y={0} stroke="#64748b" />
            <Tooltip
              formatter={(value, name) => [formatSignedPercent(Number(value), 1), String(name)]}
              labelFormatter={(label) => formatDate(String(label))}
            />
            <Legend verticalAlign="top" height={32} />
            {symbols.map((s, i) => (
              <Line
                key={s}
                type="monotone"
                dataKey={s}
                name={s}
                stroke={SERIES_STYLES[i % SERIES_STYLES.length].color}
                strokeDasharray={SERIES_STYLES[i % SERIES_STYLES.length].dash}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
