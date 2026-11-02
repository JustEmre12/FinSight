export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      <p className="sr-only">Loading stock data…</p>
      <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />
      <div className="h-32 animate-pulse rounded-xl bg-slate-200" />
      <div className="h-80 animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}
