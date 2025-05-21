import { expect, test } from "@jest/globals";
import {
  sum,
  isPrime,
  reverseString,
  getCharactersCount,
  formatDate,
  validatePassword,
} from "./modules";

describe("Sum", () => {
  test("sum test", () => {
    const result = sum(1, 2);
    const expected = 3;
    expect(result).toBe(expected);
  });
});

describe("isPrime", () => {
  test("should return false for numbers <= 1", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });

  test("should return true for prime numbers", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(97)).toBe(true);
  });

  test("should return false for non-prime numbers", () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(100)).toBe(false);
  });
});

describe("reverseString", () => {
  test("should return a string type", () => {
    const type = typeof reverseString("mohamed");
    expect(type).toBe("string");
  });

  test("should reverse the string correctly", () => {
    expect(reverseString("mohamed")).toBe("demahom");
  });
});

describe("getCharactersCount", () => {
  test("counts characters in a simple string", () => {
    const input = "mohamed";
    const expected = { m: 2, o: 1, h: 1, a: 1, e: 1, d: 1 };
    expect(getCharactersCount(input)).toEqual(expected);
  });

  test("returns empty object for empty string", () => {
    expect(getCharactersCount("")).toEqual({});
  });

  test("counts repeated characters correctly", () => {
    const input = "aabbccddaa";
    const expected = { a: 4, b: 2, c: 2, d: 2 };
    expect(getCharactersCount(input)).toEqual(expected);
  });

  test("counts spaces and special characters", () => {
    const input = "a a! a?";
    const expected = { a: 3, " ": 2, "!": 1, "?": 1 };
    expect(getCharactersCount(input)).toEqual(expected);
  });
});

describe("formatDate", () => {
  test("formats full date correctly with double digits", () => {
    const date = new Date("2025-12-25");
    expect(formatDate(date)).toBe("2025-12-25");
  });

  test("formats single-digit month and day with leading zeros", () => {
    const date = new Date("2025-01-05");
    expect(formatDate(date)).toBe("2025-01-05");
  });

  test("handles leap year correctly", () => {
    const date = new Date("2024-02-29");
    expect(formatDate(date)).toBe("2024-02-29");
  });

  test("handles end of month correctly", () => {
    const date = new Date("2025-04-30");
    expect(formatDate(date)).toBe("2025-04-30");
  });
});
describe("Validate password", () => {
  test("Password doesn't have any special charachters ", () => {
    expect(validatePassword("Mohamed123")).toBe(false);
  });
  test("Password doesn't have any numbers ", () => {
    expect(validatePassword("Mohamed@mohamed")).toBe(false);
  });
  test("Passwordis too short doesn't have any numbers ", () => {
    expect(validatePassword("Moh_12")).toBe(false);
  });
  test("Passwordis passed our criteria", () => {
    expect(validatePassword("MHaleem_125")).toBe(true);
  });
});
