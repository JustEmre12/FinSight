// Conservative checks for the current price-only demo. This is not a general
// financial claim verifier. Ambiguous numerical prose is rejected for review.
function normalize(text: string): string {
  const months: Record<string,string> = { january: "01", february: "02", march: "03", april: "04", may: "05", june: "06", july: "07", august: "08", september: "09", october: "10", november: "11", december: "12" };
  const normalized = text.normalize("NFKC").replace(/[−–‐‑]/g, "-").replace(/\s+%/g, "%");
  return normalized.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/gi,
    (_match, month: string, day: string, year: string) => `${year}-${months[month.toLowerCase()]}-${day.padStart(2, "0")}`);
}

function percentage(text: string): number | undefined {
  const value = normalize(text).match(/([+-]?\d+(?:\.\d+)?)%/);
  return value ? Number(value[1]) : undefined;
}

export function assertGroundedText(text: string, facts: Record<string, string>): void {
  const normal = normalize(text);
  const allowed = new Set(normalize(Object.values(facts).join(" ")).match(/\d+(?:\.\d+)?/g));
  if ((normal.match(/\d+(?:\.\d+)?/g) ?? []).some(n => !allowed.has(n))) throw new Error("Unsupported number");
  // Observation counts are trading samples, not elapsed calendar-day durations.
  // No day-duration fact is currently supplied by this adapter.
  if (/\b\d+\s*[- ]?\s*(?:calendar\s+|trading\s+)?days?\s+(?:window|period)|\b(?:window|period)\s+(?:of|spans?|covers?|lasts?)\s+\d+\s+(?:calendar\s+|trading\s+)?days?\b/i.test(normal)) {
    throw new Error("Unsupported day-duration claim");
  }
  const dates = normal.match(/\d{4}-\d{2}-\d{2}/g) ?? [];
  if (dates.some(date => !Object.values(facts).some(fact => fact.includes(date)))) throw new Error("Unsupported date");
  for (const range of normal.matchAll(/(\d{4}-\d{2}-\d{2})\s+(?:through|to|until)[^\d]*(\d{4}-\d{2}-\d{2})/g)) {
    if (range[1] > range[2]) throw new Error("Reversed date window");
  }
  // Do not infer causality, company attributes or individualized actions from prices.
  if (/\b(?:because of|due to|driven by|caused by|earnings|interest rates|partnership|subsidiar\w*|technology company|invest in|buy now|sell now|hold now|you should|guaranteed|risk.free|safer than|will (?:rise|fall|increase|decrease))\b/i.test(normal)) {
    throw new Error("Unsupported advice or causal/company claim");
  }
  const definitionText = normal.replace(/\b(?:it is )?not (?:an? )?average (?:daily|yearly) (?:price )?(?:movement|move)\b/gi, "");
  if (/\bvolatility\b[^.!?]*(?:averag|daily (?:gain|loss) of)|(?:averag|daily (?:gain|loss) of)[^.!?]*\bvolatility\b/i.test(definitionText)) throw new Error("Misleading volatility definition");
  const expected = {
    performance: percentage(facts.performance ?? ""),
    volatility: percentage(facts.volatility ?? ""),
    drawdown: percentage(facts.drawdown ?? ""),
  };
  const expectedDirection = /increased|rose|gained/i.test(facts.performance ?? "") ? "up" :
    /decreased|fell|declined/i.test(facts.performance ?? "") ? "down" : "flat";
  let previousSentence = "";
  for (const sentence of normal.split(/(?<=[.!?])\s+/)) {
    const preceding = previousSentence;
    previousSentence = sentence;
    const percentages = sentence.match(/[+-]?\d+(?:\.\d+)?%/g) ?? [];
    if (!percentages.length) continue;
    // Single metric and one percentage per sentence removes cross-association ambiguity.
    if (percentages.length !== 1) throw new Error("Ambiguous numerical sentence");
    let categories = [
      /\bvolatility\b/i.test(sentence) ? "volatility" : null,
      /drawdown|peak.to.trough|below (?:a |its |the )?(?:preceding |previous |prior )?(?:peak|high)/i.test(sentence) ? "drawdown" : null,
      /\b(?:prices?|shares?|stocks?)\b/i.test(sentence) && /\b(?:rose|fell|increase\w*|decrease\w*|gain\w*|declin\w*|unchanged)\b/i.test(sentence) ? "performance" : null,
    ].filter(Boolean) as (keyof typeof expected)[];
    // Resolve a narrow, explicit reference to the immediately preceding definition.
    // Do not infer a metric across paragraphs or across a prior numerical claim.
    if (!categories.length && /\b(?:it|(?:this|that|its) (?:figure|value))\b/i.test(sentence) && !/%/.test(preceding)) {
      const priorVolatility = /annualized volatility|annualised volatility/i.test(preceding);
      const priorDrawdown = /maximum drawdown/i.test(preceding);
      if (priorVolatility && !priorDrawdown) categories = ["volatility"];
      if (priorDrawdown && !priorVolatility) categories = ["drawdown"];
    }
    if (categories.length !== 1) throw new Error("Unidentified numerical claim");
    const category = categories[0];
    if (expected[category] === undefined || percentage(sentence) !== expected[category]) throw new Error("Metric mismatch");
    if (category === "performance") {
      const up = /\b(?:rose|increase\w*|gain\w*)\b/i.test(sentence);
      const down = /\b(?:fell|decrease\w*|declin\w*)\b/i.test(sentence);
      if ((expectedDirection === "up" && (!up || down)) ||
          (expectedDirection === "down" && (!down || up)) ||
          (expectedDirection === "flat" && !/unchanged/i.test(sentence)) ||
          /\bnot\s+(?:rise|rose|fall|fell|increase|decrease|gain|decline)/i.test(sentence)) throw new Error("Price direction mismatch");
    }
    if (category === "drawdown" && /\b(?:rose|increased|gained|above)\b/i.test(sentence)) throw new Error("Drawdown direction mismatch");
    if (category === "volatility" && /annualized|annualised|year|annual/i.test(preceding + " " + sentence) === false) throw new Error("Volatility time basis missing");
  }
}
