import { describe, expect, it } from "vitest";
import { assertGroundedText } from "@/lib/ai/grounding";
import { computeRiskMetrics } from "@/lib/risk";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { RiskSection } from "@/components/risk-section";
import type { PriceHistory } from "@/lib/types";

const facts = {
  performance: "Price increased 10.0% from 2026-01-01 through 2026-01-03.",
  volatility: "Annualized historical volatility was 25.0%.",
  drawdown: "Maximum drawdown was 15.0% below a preceding peak.",
};
const series = (values: number[]) => values.map((close, i) => ({ date: `2026-01-${String(i + 1).padStart(2, "0")}`, close }));

describe("AI numerical meaning checks (#39)", () => {
  it("accepts separate, correctly attributed percentages and unicode spacing", () => {
    expect(() => assertGroundedText("Sample price increased 10.0 %. Annualized volatility was 25.0%. Maximum drawdown was 15.0% below a preceding peak.", facts)).not.toThrow();
  });
  it.each([
    "Price fell 10.0%.",
    "The window runs from 2026-01-03 through 2026-01-01.",
    "Daily volatility was 25.0%.",
    "Price did not increase 10.0%.",
    "Annualized volatility was 15.0%.",
    "Maximum drawdown was 25.0% below a preceding peak.",
    "Maximum drawdown increased 15.0% above a preceding peak.",
    "Annualized volatility averaged daily gains of 25.0%.",
    "Price increased 10.0% and annualized volatility was 25.0%.",
    "Returns reached 25.0%.",
    "Price increased 99.0%.",
    "The window is 2026-03-01 through 2026-01-01.",
    "Price increased 10.0% due to earnings.",
    "You should invest in this technology company.",
    "The stock will rise next month.",
  ])("rejects unsupported meaning: %s", text => {
    expect(() => assertGroundedText(text, facts)).toThrow();
  });
  it("resolves only an immediately preceding unambiguous definition", () => {
    expect(() => assertGroundedText("Annualized volatility measures daily-return variability. For TEST, this figure was 25.0%.", facts)).not.toThrow();
    expect(() => assertGroundedText("Annualized volatility measures daily-return variability. For TEST, it was 15.0%.", facts)).toThrow();
    expect(() => assertGroundedText("Annualized volatility and maximum drawdown describe history. It was 25.0%.", facts)).toThrow();
  });
  it("does not accept a volatility number when that metric was withheld", () => {
    expect(() => assertGroundedText("Annualized volatility was 10.0%.", { performance: facts.performance })).toThrow();
  });
});

describe("risk calculations and disclosures (#43)", () => {
  it("does not label one observed return as zero volatility", () => {
    expect(computeRiskMetrics(series([100, 110]))).toBeNull();
  });
  it.each([0, -1, NaN, Infinity])("rejects invalid closing price %s", bad => {
    expect(computeRiskMetrics(series([100, bad, 99]))).toBeNull();
  });
  it("rejects duplicate, unordered, invalid and noncanonical dates without sorting input", () => {
    for (const dates of [["2026-01-01", "2026-01-01", "2026-01-03"], ["2026-01-03", "2026-01-02", "2026-01-01"], ["2026-02-30", "2026-03-03", "2026-03-04"], ["2026-1-01", "2026-01-02", "2026-01-03"]]) {
      expect(computeRiskMetrics(dates.map(date => ({ date, close: 100 })))).toBeNull();
    }
  });
  it("matches independently calculated sample-standard-deviation and drawdown fixtures", () => {
    const result = computeRiskMetrics(series([100, 110, 99]))!;
    expect(result.priceChangePercent).toBeCloseTo(-1, 10);
    expect(result.annualizedVolatilityPercent).toBeCloseTo(224.499443206, 7);
    expect(result.maxDrawdownPercent).toBeCloseTo(-10, 10);
  });
  it("reports no daily loss in all-positive returns and no daily gain in all-negative returns", () => {
    expect(computeRiskMetrics(series([100, 110, 121]))!.largestDailyLossPercent).toBe(0);
    expect(computeRiskMetrics(series([100, 90, 81]))!.largestDailyGainPercent).toBe(0);
    expect(computeRiskMetrics(series([100, 100, 100]))!.annualizedVolatilityPercent).toBe(0);
  });
  it("shows limited-history warnings, correct return definition, and no peer comparison", () => {
    const history: PriceHistory = { symbol: "TEST", currency: "USD", provider: "Synthetic QA fixture", period: "1M", points: series([100, 110, 121]), retrievedAt: "2026-01-04T00:00:00Z", firstAvailableDate: "2026-01-01" };
    const html = renderToStaticMarkup(createElement(RiskSection, { history, periodLabel: "1 month" }));
    expect(html).toContain("No negative daily return");
    expect(html).toContain("Limited history");
    expect(html).toContain("past daily percentage returns");
    expect(html).not.toContain("than many stocks");
  });
});
