// Explicit opt-in evaluation of the website adapter. Normal CI makes no API calls.
import { it, expect } from "vitest";
import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { generateAnalysis, buildContext, MODEL, AnalysisUnavailable, type AnalysisTelemetry } from "@/lib/ai/groq";

const enabled = process.env.RUN_GROQ_QUALITY === "true";
it.skipIf(!enabled)("repeats normal, stale, missing-quote and short-history cases three times", async () => {
  const key = process.env.GROQ_API_KEY;
  const output = process.env.GROQ_EVALUATION_OUTPUT;
  if (!key || !output || process.env.CONFIRM_GROQ_FREE_TIER !== "true") throw new Error("Private key, output path and Free-tier confirmation required");
  const runs: Record<string, unknown>[] = [];
  const repetitions = Number(process.env.GROQ_QUALITY_REPETITIONS ?? 3);
  const symbols = (process.env.GROQ_QUALITY_SYMBOLS ?? "NOVA,BRKW,QTRX,LUMA").split(",");
  if (![1,2,3].includes(repetitions) || symbols.some(s => !["NOVA","BRKW","QTRX","LUMA"].includes(s)) || new Set(symbols).size !== symbols.length) throw new Error("Invalid bounded evaluation configuration");
  const codeHashes: Record<string,string> = {};
  for (const file of ["groq.ts", "grounding.ts", "prompt.ts"]) {
    codeHashes[file] = createHash("sha256").update(await readFile(new URL(`../lib/ai/${file}`, import.meta.url))).digest("hex");
  }
  const evaluationNow = new Date();
  let calls = 0;
  for (const symbol of symbols) {
    for (let repetition = 1; repetition <= repetitions; repetition++) {
      if (calls++) await new Promise(resolve => setTimeout(resolve, 35_000));
      const context = await buildContext(symbol, evaluationNow);
      let telemetry: AnalysisTelemetry | undefined;
      const startedAt = new Date().toISOString();
      await writeFile(output, JSON.stringify({ model: MODEL, evaluationNow: evaluationNow.toISOString(), codeHashes,
        status: "RUNNING", active: { symbol, repetition, startedAt }, runs }, null, 2) + "\n");
      try {
        const result = await generateAnalysis(symbol, key, evaluationNow, fetch, event => { telemetry = event; });
        runs.push({ symbol, repetition, status: "VALIDATED", context, result, telemetry, startedAt, humanReview: "PENDING" });
      } catch (error) {
        runs.push({ symbol, repetition, status: "REJECTED_OR_UNAVAILABLE", context, telemetry, startedAt, failureCode: error instanceof AnalysisUnavailable ? error.code : "unknown",
          reason: error instanceof Error ? error.message : "Unknown failure", humanReview: "PENDING" });
      }
      await writeFile(output, JSON.stringify({ model: MODEL, evaluationNow: evaluationNow.toISOString(), codeHashes, mode: "synthetic-website-adapter", status: runs.length === symbols.length * repetitions ? "COMPLETE" : "RUNNING", runs }, null, 2) + "\n");
      console.log(symbol, repetition, runs[runs.length - 1].status);
    }
  }
  expect(runs.filter(run => run.status !== "VALIDATED")).toEqual([]);
// 12 calls at 25 seconds plus 11 pauses at 35 seconds require up to 685 seconds.
// Explicit finite allowance includes context preparation and evidence writes.
}, 750_000);
