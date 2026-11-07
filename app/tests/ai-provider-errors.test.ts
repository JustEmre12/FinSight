import { expect, it, vi } from "vitest";
import { generateAnalysis } from "@/lib/ai/groq";

it.each([
  [400, "json_validate_failed", "provider_schema"],
  [429, undefined, "rate_limit"],
  [401, undefined, "provider_auth"],
  [503, undefined, "provider_unavailable"],
])("classifies HTTP %s without exposing provider text", async (status, code, expected) => {
  const fetcher = vi.fn().mockResolvedValue(Response.json({ error: { code, message: "private-provider-details" } }, { status }));
  await expect(generateAnalysis("NOVA", "fake", new Date(), fetcher)).rejects.toMatchObject({ code: expected, httpStatus: status, message: "AI provider unavailable" });
});
it("preserves HTTP failure classification when its body is empty", async () => {
  await expect(generateAnalysis("NOVA", "fake", new Date(), vi.fn().mockResolvedValue(new Response(null, { status: 429 })))).rejects.toMatchObject({ code: "rate_limit" });
});
it("classifies transport failures and never retries automatically", async () => {
  const fetcher = vi.fn().mockRejectedValue(new TypeError("private transport details"));
  await expect(generateAnalysis("NOVA", "fake", new Date(), fetcher)).rejects.toMatchObject({ code: "network", message: "AI provider unavailable" });
  expect(fetcher).toHaveBeenCalledTimes(1);
});
it("bounds response body reads by the same request deadline", async () => {
  vi.useFakeTimers();
  const timeout = vi.spyOn(AbortSignal, "timeout").mockImplementation(ms => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  });
  try {
    const fetcher = vi.fn(async (_input, init) => ({ ok: true, status: 200,
      json: () => new Promise((_resolve, reject) => init.signal.addEventListener("abort", () => reject(new Error("aborted")))),
    } as Response));
    const assertion = expect(generateAnalysis("NOVA", "fake", new Date(), fetcher)).rejects.toMatchObject({ code: "timeout" });
    await vi.advanceTimersByTimeAsync(25_001);
    await assertion;
  } finally { timeout.mockRestore(); vi.useRealTimers(); }
});
