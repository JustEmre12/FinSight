import type { Metadata } from "next";
import Link from "next/link";
import { Notice } from "@/components/notice";
import { SearchForm } from "@/components/search-form";
import { searchStocks } from "@/lib/api";
import { checkSearchQuery } from "@/lib/search";

export const metadata: Metadata = { title: "Search results" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const raw = Array.isArray(q) ? q[0] : q;
  const check = checkSearchQuery(raw);
  const results = check.ok ? await searchStocks(check.query) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search stocks</h1>
      <div className="max-w-2xl">
        <SearchForm defaultValue={raw ?? ""} autoFocus={!check.ok} />
      </div>

      {!check.ok ? (
        <Notice tone={check.reason === "empty" ? "info" : "warning"} title={check.reason === "empty" ? "Nothing to search yet" : "We can't search for that"} live>
          <p>{check.message}</p>
        </Notice>
      ) : results.length === 0 ? (
        <Notice tone="info" title={`No stocks match “${check.query}”`} live>
          <p>Check the spelling, try the ticker symbol instead of the name (or the other way round), or use fewer words.</p>
          <p>
            This demo only has a few sample companies. <Link href="/" className="font-medium underline">See the list</Link>.
          </p>
        </Notice>
      ) : (
        <section aria-labelledby="results-heading" className="space-y-3">
          <h2 id="results-heading" className="text-lg font-semibold">
            {results.length} result{results.length === 1 ? "" : "s"} for “{check.query}”
          </h2>
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
            {results.map((s) => (
              <li key={s.symbol}>
                <Link
                  href={`/stock/${s.symbol}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 p-4 hover:bg-slate-50"
                >
                  <span>
                    <span className="font-mono text-lg font-bold">{s.symbol}</span>{" "}
                    <span className="text-ink">{s.companyName}</span>
                  </span>
                  <span className="text-sm text-muted">
                    {s.exchange} · prices in {s.currency}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
