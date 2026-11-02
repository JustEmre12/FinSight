"use client";

// "Add to watchlist" toggle on the stock page (FR-05).

import Link from "next/link";
import { useEffect, useState } from "react";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "@/lib/api";
import { useAuth } from "./auth-context";

export function WatchlistButton({ symbol }: { symbol: string }) {
  const { user, ready } = useAuth();
  const [saved, setSaved] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    getWatchlist(user.id).then((items) => setSaved(items.some((i) => i.symbol === symbol)));
  }, [user, symbol]);

  if (!ready) return null;
  if (!user) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(`/stock/${symbol}`)}`}
        className="inline-flex min-h-11 items-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-brand hover:bg-slate-50"
      >
        Log in to save to your watchlist
      </Link>
    );
  }

  async function toggle() {
    if (!user) return;
    if (saved) {
      await removeFromWatchlist(user.id, symbol);
      setSaved(false);
      setMessage(`${symbol} removed from your watchlist.`);
    } else {
      await addToWatchlist(user.id, symbol);
      setSaved(true);
      setMessage(`${symbol} added to your watchlist.`);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={saved === null}
        aria-pressed={saved ?? false}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold hover:bg-slate-50 aria-pressed:border-brand aria-pressed:bg-blue-50 aria-pressed:text-brand-dark"
      >
        <span aria-hidden="true">{saved ? "★" : "☆"}</span>
        {saved ? "On your watchlist" : "Add to watchlist"}
      </button>
      <p role="status" className="text-sm text-muted">
        {message}
        {saved && (
          <>
            {message ? " " : ""}
            <Link href="/watchlist" className="text-brand underline">
              View watchlist
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
