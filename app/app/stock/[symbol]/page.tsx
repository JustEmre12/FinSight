import type { Metadata } from "next";
import Link from "next/link";
import { Notice } from "@/components/notice";
import { PeriodSelector, parsePeriod } from "@/components/period-selector";
import { PriceChart } from "@/components/price-chart";
import { QuoteCard } from "@/components/quote-card";
import { SearchForm } from "@/components/search-form";
import { getPriceHistory, getQuote, getStockSummary } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { PERIOD_LABELS, ProviderUnavailableError, type PriceHistory, type Quote } from "@/lib/types";

type Params = { symbol: string };
type Search = { period?: string | string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { symbol } = await params;
  return { title: decodeURIComponent(symbol).toUpperCase() };
}

/** Run a data request and turn a provider outage into `null` instead of a crash. */
async function orOutage<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (err) {
    if (err instanceof ProviderUnavailableError) return null;
    throw err;
  }
}

export default async function StockPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<Search> }) {
  const symbol = decodeURIComponent((await params).symbol).toUpperCase();
  const period = parsePeriod((await searchParams).period);
  const summary = await getStockSummary(symbol);

  if (!summary) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Stock not found</h1>
        <Notice tone="warning" title={`We don't have a stock with the symbol “${symbol}”`}>
          <p>Check the spelling or search by company name instead.</p>
        </Notice>
        <div className="max-w-2xl">
          <SearchForm />
        </div>
      </div>
    );
  }

  const now = new Date();
  const [quote, history]: [Quote | null, PriceHistory | null] = await Promise.all([
    orOutage(getQuote(symbol, now)),
    orOutage(getPriceHistory(symbol, period, now)),
  ]);
  const outage = quote === null || history === null;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm font-semibold text-muted">
            {summary.exchange}: {summary.symbol}
          </p>
          <h1 className="text-3xl font-bold">{summary.companyName}</h1>
        </div>
      </header>

      {outage ? (
        <Notice tone="error" title="Market data is temporarily unavailable">
          <p>
            We couldn&apos;t reach the market data provider, so we can&apos;t show a price or history for {summary.symbol}{" "}
            right now. This is a problem on our side, not with your search.
          </p>
          <p>
            <Link href={`/stock/${summary.symbol}?period=${period}`} className="font-medium underline">
              Try again
            </Link>{" "}
            in a few minutes.
          </p>
        </Notice>
      ) : (
        <>
          <QuoteCard quote={quote} now={now} />

          <section aria-labelledby="chart-heading" className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="chart-heading" className="text-xl font-semibold">
                Price history
              </h2>
              <PeriodSelector current={period} hrefFor={(p) => `/stock/${summary.symbol}?period=${p}`} label="Chart time period" />
            </div>
            {history.points.length < 2 ? (
              <Notice tone="info" title={`No price history for the last ${PERIOD_LABELS[period]}`}>
                <p>The data provider has no daily prices for {summary.symbol} in this period. Try a different period.</p>
              </Notice>
            ) : (
              <>
                {history.firstAvailableDate && history.points[0].date === history.firstAvailableDate && (
                  <Notice tone="info" title="Shorter history than the selected period">
                    <p>
                      {summary.symbol} only has prices from {formatDate(history.firstAvailableDate)}, so the chart starts
                      there.
                    </p>
                  </Notice>
                )}
                <PriceChart
                  symbol={summary.symbol}
                  points={history.points}
                  currency={history.currency}
                  provider={history.provider}
                  retrievedAt={history.retrievedAt}
                  periodLabel={PERIOD_LABELS[period]}
                />
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
