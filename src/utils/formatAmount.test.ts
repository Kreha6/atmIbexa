import { describe, expect, it } from "@jest/globals";
import Big from "big.js";
import { formatAmount } from "./formatAmount";

describe("formatAmount", () => {
  it("Should format zero", () => {
    expect(formatAmount(new Big(0))).toBe("0");
  });

  it("Should not add separators for numbers below 1000", () => {
    expect(formatAmount(new Big(999))).toBe("999");
  });

  it("Should add a space separators", () => {
    expect(formatAmount(new Big(12345678))).toBe("12\u00a0345\u00a0678");
  });

  it("Should format a large number without scientific notation", () => {
    expect(formatAmount(new Big("999999999999999999"))).toBe(
      "999\u00a0999\u00a0999\u00a0999\u00a0999\u00a0999"
    );
  });
});
