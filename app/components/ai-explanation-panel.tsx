"use client";

// AI explanation (FR-04 / US-03). Always labeled "AI-generated", with
// uncertainty notes and no buy/sell advice.

import { useState } from "react";
import { getAiExplanation } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import type { AiExplanation } from "@/lib/types";
import { Notice } from "./notice";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; explanation: AiExplanation }
  | { status: "error" };

export function AiExplanationPanel({ symbol }: { symbol: string }) {
  const [state, setState] = useState<State>({ status: "idle" });

  async function request() {
    setState({ status: "loading" });
    try {
      setState({ status: "done", explanation: await getAiExplanation(symbol) });
    } catch {
      setState({ status: "error" });
    }
  }

  return (
    <section aria-labelledby="ai-heading" className="space-y-4 rounded-xl border-2 border-violet-300 bg-violet-50/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="ai-heading" className="flex flex-wrap items-center gap-2 text-xl font-semibold">
          Explain in plain language
          <span className="rounded-full bg-violet-700 px-3 py-0.5 text-sm font-semibold text-white">AI-generated</span>
        </h2>
        <button
          type="button"
          onClick={request}
          disabled={state.status === "loading"}
          className="min-h-11 rounded-md bg-violet-700 px-4 font-semibold text-white hover:bg-violet-800 disabled:opacity-60"
        >
          {state.status === "done" ? "Generate again" : state.status === "loading" ? "Generating…" : `Explain ${symbol}'s recent movement`}
        </button>
      </div>
      <p className="text-sm text-slate-700">
        Text in this box is written by a computer, not a person. It can make mistakes and is not financial advice.
      </p>

      <div aria-live="polite" aria-busy={state.status === "loading"}>
        {state.status === "loading" && <p className="text-sm">Generating explanation…</p>}
        {state.status === "error" && (
          <Notice tone="error" title="We couldn't generate an explanation">
            <p>The analysis service did not respond. Please try again in a moment.</p>
          </Notice>
        )}
        {state.status === "done" && (
          <article className="space-y-4">
            <div className="space-y-3 text-base leading-relaxed">
              {state.explanation.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="rounded-lg border border-amber-400 bg-amber-50 p-4 text-amber-950">
              <h3 className="font-semibold">How sure is this?</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {state.explanation.uncertaintyNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-slate-700">
              Generated {formatDateTime(state.explanation.generatedAt)} · based on prices up to{" "}
              {formatDateTime(state.explanation.dataAsOf)} · {state.explanation.generator}
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
