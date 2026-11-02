import { MAX_QUERY_LENGTH } from "@/lib/search";

/**
 * Plain HTML GET form, so search works with the keyboard and even before
 * JavaScript loads. Results are shown by app/search/page.tsx.
 */
export function SearchForm({ defaultValue = "", autoFocus = false }: { defaultValue?: string; autoFocus?: boolean }) {
  return (
    <form action="/search" method="get" role="search" className="w-full">
      <label htmlFor="search-q" className="mb-1 block text-sm font-medium">
        Ticker symbol or company name
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="search-q"
          name="q"
          type="search"
          defaultValue={defaultValue}
          // Lets an empty search through so the page can explain what to type.
          maxLength={MAX_QUERY_LENGTH + 10}
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="e.g. NOVA or Greenleaf"
          aria-describedby="search-hint"
          className="min-h-11 w-full rounded-md border border-slate-400 bg-white px-3 text-base placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="min-h-11 rounded-md bg-brand px-5 font-semibold text-white hover:bg-brand-dark"
        >
          Search
        </button>
      </div>
      <p id="search-hint" className="mt-1 text-sm text-muted">
        A ticker is the short code a stock trades under, like NOVA.
      </p>
    </form>
  );
}
