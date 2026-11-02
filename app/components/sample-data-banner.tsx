import { IS_SAMPLE_DATA } from "@/lib/api";

/** Shown on every page while lib/api.ts returns sample data. */
export function SampleDataBanner() {
  if (!IS_SAMPLE_DATA) return null;
  return (
    <aside aria-label="Sample data notice" className="border-b border-amber-300 bg-amber-100 text-amber-950">
      <p className="mx-auto max-w-6xl px-4 py-2 text-sm">
        <strong className="font-semibold">Sample data, not real market prices.</strong>{" "}
        Companies and prices on this site are made up for testing. Do not use them to make decisions.
      </p>
    </aside>
  );
}
