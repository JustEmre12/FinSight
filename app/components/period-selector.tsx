import Link from "next/link";
import { PERIODS, PERIOD_LABELS, type Period } from "@/lib/types";

/**
 * Period choices as links (?period=1Y). Links work with keyboard, screen
 * readers and the back button, and need no JavaScript.
 */
export function PeriodSelector({
  current,
  hrefFor,
  label = "Time period",
}: {
  current: Period;
  hrefFor: (period: Period) => string;
  label?: string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
        {PERIODS.map((p) => (
          <li key={p}>
            <Link
              href={hrefFor(p)}
              scroll={false}
              aria-current={p === current ? "true" : undefined}
              className="block min-h-10 min-w-12 rounded-md px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-white aria-[current=true]:bg-brand aria-[current=true]:text-white"
            >
              <span aria-hidden="true">{p}</span>
              <span className="sr-only">{PERIOD_LABELS[p]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function parsePeriod(value: string | string[] | undefined, fallback: Period = "1Y"): Period {
  const v = Array.isArray(value) ? value[0] : value;
  return (PERIODS as readonly string[]).includes(v ?? "") ? (v as Period) : fallback;
}
