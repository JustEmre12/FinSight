"use client";

// Pick 2–5 stocks to compare. Updates the URL (?symbols=A,B&period=1Y).

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MAX_COMPARE } from "@/lib/compare";
import type { Period, StockSummary } from "@/lib/types";

export function CompareForm({
  initial,
  period,
  available,
}: {
  initial: string[];
  period: Period;
  available: StockSummary[];
}) {
  const router = useRouter();
  const [symbols, setSymbols] = useState<string[]>(initial);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function go(next: string[]) {
    router.push(`/compare?symbols=${next.join(",")}&period=${period}`, { scroll: false });
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    const symbol = input.trim().toUpperCase();
    if (!symbol) return setError("Type a ticker symbol to add, like GRNL.");
    if (!available.some((s) => s.symbol === symbol))
      return setError(`We don't have a stock with the symbol “${symbol}”.`);
    if (symbols.includes(symbol)) return setError(`${symbol} is already in the comparison.`);
    if (symbols.length >= MAX_COMPARE) return setError(`You can compare up to ${MAX_COMPARE} stocks at a time.`);
    const next = [...symbols, symbol];
    setSymbols(next);
    setInput("");
    setError(null);
    go(next);
  }

  function remove(symbol: string) {
    const next = symbols.filter((s) => s !== symbol);
    setSymbols(next);
    go(next);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={add} noValidate className="max-w-xl space-y-1">
        <label htmlFor="compare-add" className="block text-sm font-medium">
          Add a stock by ticker symbol ({symbols.length} of {MAX_COMPARE} chosen)
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="compare-add"
            list="compare-options"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            placeholder="e.g. GRNL"
            aria-invalid={!!error}
            aria-describedby={error ? "compare-error" : undefined}
            className="min-h-11 w-full rounded-md border border-slate-400 bg-white px-3 font-mono uppercase placeholder:normal-case placeholder:font-sans aria-[invalid=true]:border-red-700"
          />
          <datalist id="compare-options">
            {available.map((s) => (
              <option key={s.symbol} value={s.symbol}>
                {s.companyName}
              </option>
            ))}
          </datalist>
          <button type="submit" className="min-h-11 rounded-md bg-brand px-5 font-semibold text-white hover:bg-brand-dark">
            Add
          </button>
        </div>
        {error && (
          <p id="compare-error" role="alert" className="text-sm font-medium text-loss">
            {error}
          </p>
        )}
      </form>

      {symbols.length > 0 && (
        <ul aria-label="Stocks being compared" className="flex flex-wrap gap-2">
          {symbols.map((s) => (
            <li key={s} className="flex items-center gap-1 rounded-full border border-slate-300 bg-white py-1 pl-3 pr-1">
              <span className="font-mono font-semibold">{s}</span>
              <button
                type="button"
                onClick={() => remove(s)}
                aria-label={`Remove ${s} from comparison`}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
