import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { listAvailableStocks } from "@/lib/api";

export default async function HomePage() {
  const stocks = await listAvailableStocks();
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Research stocks in plain language</h1>
        <p className="max-w-2xl text-lg text-muted">
          Look up a company, see its price history on a labeled chart, compare stocks and read about past risk —
          explained for beginners.
        </p>
        <div className="max-w-2xl">
          <SearchForm />
        </div>
      </section>

      <section aria-labelledby="sample-heading" className="space-y-3">
        <h2 id="sample-heading" className="text-xl font-semibold">
          Try a sample stock
        </h2>
        <p className="text-sm text-muted">
          These fictional companies show different situations, such as an out-of-date price or a data outage.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stocks.map((s) => (
            <li key={s.symbol}>
              <Link
                href={`/stock/${s.symbol}`}
                className="block h-full rounded-lg border border-slate-200 bg-white p-4 hover:border-brand hover:shadow-sm"
              >
                <span className="block font-mono text-lg font-bold">{s.symbol}</span>
                <span className="block text-sm text-muted">{s.companyName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-heading" className="space-y-2">
        <h2 id="about-heading" className="text-xl font-semibold">
          What FinSight is (and isn&apos;t)
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          <li>A place to learn how a stock has behaved in the past.</li>
          <li>Not a broker: you can&apos;t buy or sell here.</li>
          <li>Not advice: nothing here tells you what to buy, sell or hold.</li>
        </ul>
      </section>
    </div>
  );
}
