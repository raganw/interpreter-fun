import { describe, expect, test } from "vitest";
import { Calculator } from "../../src/calculator.js";

describe(Calculator, () => {
  test("should add two integers", () => {
    const calculator = new Calculator("1+2");
    expect(calculator.expr()).toBe(3);
  });
  test("should throw error for invalid character", () => {
    const calculator = new Calculator("1-2");
    expect(() => calculator.expr()).toThrowError("Invalid character");
  });
});
