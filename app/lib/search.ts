// Search input rules (FR-02 / US-01). Kept separate from lib/api.ts so the
// same validation runs before any request is sent.

export const MAX_QUERY_LENGTH = 50;

export type QueryCheck =
  | { ok: true; query: string }
  | { ok: false; reason: "empty" | "too-long" | "invalid-characters"; message: string };

/** Letters, digits, spaces and the punctuation found in tickers and company names. */
const ALLOWED = /^[A-Za-z0-9 .,&'\-]+$/;

export function checkSearchQuery(raw: string | null | undefined): QueryCheck {
  const query = (raw ?? "").trim();
  if (query.length === 0) {
    return { ok: false, reason: "empty", message: "Type a ticker symbol (like NOVA) or a company name to search." };
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return {
      ok: false,
      reason: "too-long",
      message: `Searches can be up to ${MAX_QUERY_LENGTH} characters. Try a shorter company name or the ticker symbol.`,
    };
  }
  if (!ALLOWED.test(query)) {
    return {
      ok: false,
      reason: "invalid-characters",
      message: "Use only letters, numbers, spaces and . , & ' - in your search.",
    };
  }
  return { ok: true, query };
}
