import type { Metadata } from "next";
import { CompareChart } from "@/components/compare-chart";
import { CompareForm } from "@/components/compare-form";
import { Notice } from "@/components/notice";
import { PeriodSelector, parsePeriod } from "@/components/period-selector";
import { DATA_SOURCE_NAME, getPriceHistory, getStockSummary, listAvailableStocks } from "@/lib/api";
import { MAX_COMPARE, alignHistories } from "@/lib/compare";
import { formatDate, formatDateTime, formatMoney, formatSignedMoney, formatSignedPercent } from "@/lib/format";
import { PERIOD_LABELS, ProviderUnavailableError, type PriceHistory } from "@/lib/types";

export const metadata: Metadata = { title: "Compare stocks" };

type Search = { symbols?: string | string[]; period?: string | string[] };

function parseSymbols(value: string | string[] | undefined): string[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");
  const list = raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
  return [...new Set(list)].slice(0, MAX_COMPARE);
}

export default async function ComparePage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const period = parsePeriod(params.period);
  const requested = parseSymbols(params.symbols);
  const available = await listAvailableStocks();

  const known: string[] = [];
  const unknown: string[] = [];
  for (const s of requested) ((await getStockSummary(s)) ? known : unknown).push(s);

  const now = new Date();
  const histories: PriceHistory[] = [];
  const unavailable: string[] = [];
  await Promise.all(
    known.map(async (s) => {
      try {
        histories.push(await getPriceHistory(s, period, now));
      } catch (err) {
        if (err instanceof ProviderUnavailableError) unavailable.push(s);
        else throw err;
      }
    }),
  );
  histories.sort((a, b) => known.indexOf(a.symbol) - known.indexOf(b.symbol));

  const comparison = histories.length >= 2 ? alignHistories(histories) : null;
  const currencies = new Set(histories.map((h) => h.currency));
  const symbolsParam = known.join(",");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Compare stocks</h1>
        <p className="text-muted">
          See how 2 to {MAX_COMPARE} stocks changed over the same dates. Percent change is used so stocks with
          different prices can be compared fairly.
        </p>
      </div>

      <CompareForm key={requested.join(",")} initial={known} period={period} available={available} />

      {unknown.length > 0 && (
        <Notice tone="warning" title="Some symbols were not found">
          <p>We don&apos;t have data for: {unknown.join(", ")}. They were left out.</p>
        </Notice>
      )}
      {unavailable.length > 0 && (
        <Notice tone="error" title="Some data is temporarily unavailable">
          <p>
            The market data provider did not respond for {unavailable.join(", ")}, so{" "}
            {unavailable.length === 1 ? "it is" : "they are"} not included. Try again later.
          </p>
        </Notice>
      )}

      {histories.length < 2 ? (
        <Notice tone="info" title="Choose at least two stocks">
          <p>Add ticker symbols above to compare them. For example, try NOVA and GRNL.</p>
        </Notice>
      ) : (
        <section aria-labelledby="compare-results" className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="compare-results" className="text-xl font-semibold">
              Results
            </h2>
            <PeriodSelector
              current={period}
              hrefFor={(p) => `/compare?symbols=${symbolsParam}&period=${p}`}
              label="Comparison time period"
            />
          </div>

          {comparison && comparison.shortHistories.length > 0 && comparison.startDate && (
            <Notice tone="warning" title="Not every stock has the full history">
              {comparison.shortHistories.map((g) => (
                <p key={g.symbol}>
                  {g.symbol} {g.firstDate ? `only has prices from ${formatDate(g.firstDate)}` : "has no prices in this period"}.
                </p>
              ))}
              <p>
                To keep it fair, all stocks are compared on the dates they share: {formatDate(comparison.startDate)} to{" "}
                {formatDate(comparison.endDate!)}.
              </p>
            </Notice>
          )}

          {!comparison || comparison.rows.length < 2 ? (
            <Notice tone="info" title="No shared dates to compare">
              <p>These stocks don&apos;t have prices on enough of the same days in this period. Try a different period.</p>
            </Notice>
          ) : (
            <>
              <CompareChart
                symbols={histories.map((h) => h.symbol)}
                rows={comparison.rows}
                title={`Percent change since ${formatDate(comparison.startDate!)}, last ${PERIOD_LABELS[period]}`}
                source={`Source: ${DATA_SOURCE_NAME} · retrieved ${formatDateTime(now.toISOString())}`}
              />

              <div className="space-y-2">
                <h3 className="font-semibold">Summary table</h3>
                {currencies.size > 1 && (
                  <Notice tone="info" title="Different currencies">
                    <p>
                      These stocks are priced in different currencies ({[...currencies].join(" and ")}), so the money
                      amounts can&apos;t be compared directly. Use the percent column to compare.
                    </p>
                  </Notice>
                )}
                <div tabIndex={0} role="region" aria-label="Comparison summary table" className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full min-w-[40rem] text-sm">
                    <caption className="sr-only">
                      Price change from {formatDate(comparison.startDate!)} to {formatDate(comparison.endDate!)}. Money
                      columns are in each stock&apos;s own currency; the last column is percent.
                    </caption>
                    <thead className="bg-slate-100">
                      <tr>
                        <th scope="col" rowSpan={2} className="px-4 py-2 text-left">Stock</th>
                        <th scope="colgroup" colSpan={3} className="border-b border-slate-300 px-4 py-2 text-center">
                          Money (stock&apos;s own currency)
                        </th>
                        <th scope="col" rowSpan={2} className="border-l border-slate-300 bg-blue-50 px-4 py-2 text-right">
                          Change (%)
                          <span className="block text-xs font-normal text-muted">comparable</span>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" className="px-4 py-2 text-right">Start price</th>
                        <th scope="col" className="px-4 py-2 text-right">End price</th>
                        <th scope="col" className="px-4 py-2 text-right">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.summaries.map((s) => (
                        <tr key={s.symbol} className="border-t border-slate-100">
                          <th scope="row" className="px-4 py-2 text-left font-mono font-bold">{s.symbol}</th>
                          <td className="px-4 py-2 text-right tabular-nums">{formatMoney(s.startPrice, s.currency)}</td>
                          <td className="px-4 py-2 text-right tabular-nums">{formatMoney(s.endPrice, s.currency)}</td>
                          <td className="px-4 py-2 text-right tabular-nums">{formatSignedMoney(s.priceChange, s.currency)}</td>
                          <td className={`border-l border-slate-300 bg-blue-50/50 px-4 py-2 text-right font-semibold tabular-nums ${s.percentChange >= 0 ? "text-gain" : "text-loss"}`}>
                            {formatSignedPercent(s.percentChange, 1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <details className="rounded-lg border border-slate-200">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-brand">
                  Show chart data as a table ({comparison.rows.length} shared trading days)
                </summary>
                <div tabIndex={0} role="region" aria-label="Comparison chart data" className="max-h-80 overflow-auto border-t border-slate-200">
                  <table className="w-full text-sm">
                    <caption className="sr-only">Percent change since {formatDate(comparison.startDate!)}, newest first.</caption>
                    <thead className="sticky top-0 bg-slate-100">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left">Date</th>
                        {comparison.summaries.map((s) => (
                          <th key={s.symbol} scope="col" className="px-4 py-2 text-right">{s.symbol} (%)</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...comparison.rows].reverse().map((r) => (
                        <tr key={String(r.date)} className="border-t border-slate-100">
                          <th scope="row" className="px-4 py-1.5 text-left font-normal">{formatDate(String(r.date))}</th>
                          {comparison.summaries.map((s) => (
                            <td key={s.symbol} className="px-4 py-1.5 text-right tabular-nums">
                              {formatSignedPercent(Number(r[s.symbol]), 1)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>

              <p className="text-sm font-medium">
                Past performance only. This comparison is not a recommendation to buy, sell or hold any stock.
              </p>
            </>
          )}
        </section>
      )}
    </div>
  );
}
