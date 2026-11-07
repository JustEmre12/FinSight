// The existing panel keeps its AiExplanation contract; secrets stay on the server.
import type { AiExplanation } from "../types";

export async function getAiExplanation(symbol: string): Promise<AiExplanation> {
  const response = await fetch("/api/analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol }),
    signal: AbortSignal.timeout(35_000),
  });
  if (!response.ok) throw new Error("AI explanation unavailable");
  return response.json() as Promise<AiExplanation>;
}
