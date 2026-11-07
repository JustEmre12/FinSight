import { afterEach, describe, expect, it, vi } from "vitest";
import { buildContext, generateAnalysis, validateExplanation } from "@/lib/ai/groq";
import { POST } from "@/app/api/analysis/route";

const NOW = new Date("2026-11-06T18:00:00Z");
afterEach(() => vi.unstubAllEnvs());

describe("Groq explanation integration", () => {
  it("uses existing sample history, with stale/missing/short context", async () => {
    expect((await buildContext("NOVA", NOW)).facts.limitations).toMatch(/fictional/i);
    expect((await buildContext("BRKW", NOW)).facts.stale).toMatch(/stale/);
    expect((await buildContext("QTRX", NOW)).facts.missing).toMatch(/unavailable/);
    expect((await buildContext("LUMA", NOW)).facts.short).toMatch(/limited/i);
    await expect(buildContext("NOPE", NOW)).rejects.toThrow();
    await expect(buildContext("ZZZT", NOW)).rejects.toThrow();
  });
  it("rejects invalid output and unsupported numerical claims", () => {
    const good = { paragraphs: ["Synthetic prices rose 10%.", "No causal evidence is available."], uncertaintyNotes: ["Sample only."] };
    expect(validateExplanation(good, { performance: "rose 10%" })).toEqual(good);
    expect(() => validateExplanation({ ...good, paragraphs: ["sample 99%", "text"] }, { performance: "10%" })).toThrow();
    expect(() => validateExplanation({ ...good, paragraphs: ["sample buy now", "text"] }, {})).toThrow();
    expect(() => validateExplanation({ ...good, paragraphs: ["sample" ] }, {})).toThrow();
    expect(() => validateExplanation({ ...good, paragraphs: ["sample", "x".repeat(701)] }, {})).toThrow();
  });
  it("calls only Groq, returns panel contract and server-owned disclosure", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ choices: [{ finish_reason: "stop", message: { content: JSON.stringify({ paragraphs: ["Synthetic prices reflect past performance.", "No causal evidence is available."], uncertaintyNotes: ["Sample only."] }) } }] }));
    const result = await generateAnalysis("QTRX", "fake-test-key", NOW, fetcher);
    expect(result.symbol).toBe("QTRX");
    expect(result.generator).toMatch(/Groq.*FICTIONAL/);
    expect(result.uncertaintyNotes.join(" ")).toMatch(/current quote is unavailable/i);
    expect(fetcher.mock.calls[0][0]).toBe("https://api.groq.com/openai/v1/chat/completions");
    expect(fetcher.mock.calls[0][1].headers.Authorization).toBe("Bearer fake-test-key");
    expect(result).not.toHaveProperty("key");
  });
  it("rejects provider errors and incomplete responses without template fallback", async () => {
    await expect(generateAnalysis("NOVA", "fake", NOW, vi.fn().mockResolvedValue(new Response(null, { status: 429 })))).rejects.toThrow();
    await expect(generateAnalysis("NOVA", "fake", NOW, vi.fn().mockResolvedValue(Response.json({ choices: [{ finish_reason: "length" }] })))).rejects.toThrow();
  });
});

describe("local analysis route guard", () => {
  const req = (body: string, origin = "http://localhost:3000") => new Request("http://localhost:3000/api/analysis", { method: "POST", headers: { origin }, body });
  it("is disabled in production even with the feature enabled", async () => {
    vi.stubEnv("NODE_ENV", "production"); vi.stubEnv("FINSIGHT_AI_ENABLED", "true");
    expect((await POST(req('{"symbol":"NOVA"}'))).status).toBe(503);
  });
  it("requires local same-origin, a server key and a symbol-only request", async () => {
    vi.stubEnv("NODE_ENV", "development"); vi.stubEnv("FINSIGHT_AI_ENABLED", "true");
    expect((await POST(req('{"symbol":"NOVA"}', "https://unrelated.example"))).status).toBe(403);
    vi.stubEnv("GROQ_API_KEY", "");
    expect((await POST(req('{"symbol":"NOVA"}'))).status).toBe(503);
    vi.stubEnv("GROQ_API_KEY", "fake");
    expect((await POST(req('{"symbol":"NOVA","context":"client facts"}'))).status).toBe(400);
    expect((await POST(req("not json"))).status).toBe(400);
    expect((await POST(req("x".repeat(257)))).status).toBe(413);
  });
});
