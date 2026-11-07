// Explicit opt-in evaluation of the website adapter. Normal CI makes no API calls.
import { it, expect } from "vitest";
import { writeFile } from "node:fs/promises";
import { generateAnalysis, MODEL } from "@/lib/ai/groq";

const enabled = process.env.RUN_GROQ_QUALITY === "true";
it.skipIf(!enabled)("repeats normal, stale, missing-quote and short-history cases three times", async () => {
  const key = process.env.GROQ_API_KEY;
  const output = process.env.GROQ_EVALUATION_OUTPUT;
  if (!key || !output || process.env.CONFIRM_GROQ_FREE_TIER !== "true") throw new Error("Private key, output path and Free-tier confirmation required");
  const runs: Record<string, unknown>[] = [];
  const repetitions = Number(process.env.GROQ_QUALITY_REPETITIONS ?? 3);
  const symbols = (process.env.GROQ_QUALITY_SYMBOLS ?? "NOVA,BRKW,QTRX,LUMA").split(",");
  if (![1,2,3].includes(repetitions) || symbols.some(s => !["NOVA","BRKW","QTRX","LUMA"].includes(s)) || new Set(symbols).size !== symbols.length) throw new Error("Invalid bounded evaluation configuration");
  let calls = 0;
  for (const symbol of symbols) {
    for (let repetition = 1; repetition <= repetitions; repetition++) {
      if (calls++) await new Promise(resolve => setTimeout(resolve, 35_000));
      let usage: unknown;
      let candidate: unknown;
      let providerError: unknown;
      const fetcher: typeof fetch = async (input, init) => {
        const response = await fetch(input, init);
        try {
          const body = await response.clone().json(); usage = body.usage;
          candidate = body.choices?.[0]?.message?.content;
          providerError = body.error ? { code: body.error.code, message: body.error.message } : undefined;
        } catch { /* unavailable */ }
        return response;
      };
      try {
        const result = await generateAnalysis(symbol, key, new Date(), fetcher);
        runs.push({ symbol, repetition, status: "VALIDATED", result, usage, humanReview: "PENDING" });
      } catch (error) {
        runs.push({ symbol, repetition, status: "REJECTED_OR_UNAVAILABLE", usage, candidate, providerError,
          reason: error instanceof Error ? error.message : "Unknown failure", humanReview: "PENDING" });
      }
      await writeFile(output, JSON.stringify({ model: MODEL, mode: "synthetic-website-adapter", runs }, null, 2) + "\n");
      console.log(symbol, repetition, runs[runs.length - 1].status);
    }
  }
  expect(runs.filter(run => run.status !== "VALIDATED")).toEqual([]);
}, 600_000);
