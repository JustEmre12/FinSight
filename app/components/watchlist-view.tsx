"use client";

// Personal watchlist: add, view and remove stocks (FR-05 / US-04).
// Only shown to a signed-in user; each user's list is stored separately.

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { addToWatchlist, getQuote, getStockSummary, getWatchlist, removeFromWatchlist } from "@/lib/api";
import { getFreshness } from "@/lib/freshness";
import { formatDate, formatMoney, formatSignedPercent } from "@/lib/format";
import type { Quote, WatchlistItem } from "@/lib/types";
import { useAuth } from "./auth-context";
import { Notice } from "./notice";

type Row = WatchlistItem & { quote: Quote | null; companyName: string; outage: boolean };

async function loadRows(userId: string): Promise<Row[]> {
  const items = await getWatchlist(userId);
  return Promise.all(
    items.map(async (item) => {
      const summary = await getStockSummary(item.symbol);
      try {
        return { ...item, companyName: summary?.companyName ?? "", quote: await getQuote(item.symbol), outage: false };
      } catch {
        return { ...item, companyName: summary?.companyName ?? "", quote: null, outage: true };
      }
    }),
  );
}

export function WatchlistView() {
  const { user, ready } = useAuth();
  // Rows are tagged with their owner so a previous user's list is never shown.
  const [loaded, setLoaded] = useState<{ userId: string; rows: Row[] } | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const refresh = useCallback(async () => {
    if (user) setLoaded({ userId: user.id, rows: await loadRows(user.id) });
  }, [user]);

  useEffect(() => {
    // Loads from browser storage, which is only available after mounting.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const rows = loaded && user && loaded.userId === user.id ? loaded.rows : null;

  if (!ready) return <p role="status">Loading your watchlist…</p>;

  if (!user) {
    return (
      <div className="max-w-xl space-y-4">
        <h1 className="text-2xl font-bold">Your watchlist</h1>
        <Notice tone="info" title="Log in to see your watchlist">
          <p>A watchlist saves the stocks you want to follow so you don&apos;t have to search for them each time.</p>
        </Notice>
        <div className="flex flex-wrap gap-3">
          <Link href="/login?next=/watchlist" className="inline-flex min-h-11 items-center rounded-md bg-brand px-5 font-semibold text-white hover:bg-brand-dark">
            Log in
          </Link>
          <Link href="/signup?next=/watchlist" className="inline-flex min-h-11 items-center rounded-md border border-slate-300 bg-white px-5 font-semibold text-brand hover:bg-slate-50">
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const symbol = input.trim().toUpperCase();
    setStatus("");
    if (!symbol) {
      setError("Type a ticker symbol, like NOVA.");
      return;
    }
    if (!(await getStockSummary(symbol))) {
      setError(`We don't have a stock with the symbol “${symbol}”. Use search to find the right symbol.`);
      return;
    }
    if (rows?.some((r) => r.symbol === symbol)) {
      setError(`${symbol} is already on your watchlist.`);
      return;
    }
    await addToWatchlist(user.id, symbol);
    setError(null);
    setInput("");
    setStatus(`${symbol} added to your watchlist.`);
    await refresh();
  }

  async function onRemove(symbol: string) {
    if (!user) return;
    await removeFromWatchlist(user.id, symbol);
    setStatus(`${symbol} removed from your watchlist.`);
    await refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your watchlist</h1>
        <p className="text-sm text-muted">Only you can see this list. Saved in this browser for now (demo).</p>
      </div>

      <form onSubmit={onAdd} noValidate className="max-w-xl space-y-2">
        <label htmlFor="add-symbol" className="block text-sm font-medium">
          Add a stock by ticker symbol
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="add-symbol"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            placeholder="e.g. NOVA"
            aria-invalid={!!error}
            aria-describedby={error ? "add-error" : undefined}
            className="min-h-11 w-full rounded-md border border-slate-400 bg-white px-3 font-mono uppercase placeholder:normal-case placeholder:font-sans aria-[invalid=true]:border-red-700"
          />
          <button type="submit" className="min-h-11 rounded-md bg-brand px-5 font-semibold text-white hover:bg-brand-dark">
            Add
          </button>
        </div>
        {error && (
          <p id="add-error" role="alert" className="text-sm font-medium text-loss">
            {error}
          </p>
        )}
      </form>

      <p role="status" className="text-sm font-medium">
        {status}
      </p>

      {rows === null ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <Notice tone="info" title="Your watchlist is empty">
          <p>
            Add a ticker above, or open any stock and choose “Add to watchlist”.{" "}
            <Link href="/" className="font-medium underline">
              Search for a stock
            </Link>
          </p>
        </Notice>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[36rem] text-sm">
            <caption className="sr-only">Stocks on your watchlist</caption>
            <thead className="bg-slate-100 text-left">
              <tr>
                <th scope="col" className="px-4 py-3">Stock</th>
                <th scope="col" className="px-4 py-3 text-right">Price</th>
                <th scope="col" className="px-4 py-3 text-right">Day change (%)</th>
                <th scope="col" className="px-4 py-3">Added</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const fresh = r.quote ? getFreshness(r.quote) : null;
                return (
                  <tr key={r.symbol} className="border-t border-slate-100">
                    <th scope="row" className="px-4 py-3 text-left font-normal">
                      <Link href={`/stock/${r.symbol}`} className="font-mono font-bold text-brand underline">
                        {r.symbol}
                      </Link>
                      <span className="block text-muted">{r.companyName}</span>
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {r.outage ? (
                        <span className="text-loss">Data unavailable</span>
                      ) : r.quote?.price != null ? (
                        <>
                          {formatMoney(r.quote.price, r.quote.currency)}
                          {fresh === "stale" && <span className="block text-xs font-semibold text-amber-800">Out of date</span>}
                        </>
                      ) : (
                        <span className="text-muted">No current price</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {r.quote?.changePercent != null ? (
                        <span className={r.quote.changePercent >= 0 ? "text-gain" : "text-loss"}>
                          {formatSignedPercent(r.quote.changePercent)}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">{formatDate(r.addedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onRemove(r.symbol)}
                        aria-label={`Remove ${r.symbol} from watchlist`}
                        className="min-h-10 rounded-md border border-slate-300 px-3 font-medium hover:bg-red-50 hover:text-loss"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
