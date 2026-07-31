import { describe, expect, test } from "@jest/globals";
import * as wsc from "../common-code/wscommon";

describe("get_unique_id", () => {
  test("returns a unique ID", () => {
    expect(wsc.get_unique_id()).not.toBe(wsc.get_unique_id());
  });
});

describe("constrastingColor24bit", () => {
  test("returns contrasting color for #000000", () => {
    expect(wsc.constrastingColor24bit("#000000")).not.toBe("#000000");
  });
  test("returns contrasting color for #aaaaaa", () => {
    expect(wsc.constrastingColor24bit("#aaaaaa")).not.toBe("#aaaaaa");
  });
  test("returns contrasting color for #ffffff", () => {
    expect(wsc.constrastingColor24bit("#ffffff")).not.toBe("#ffffff");
  });
});

describe("normalizeColor", () => {
  test("12bit to 24bit: #333->#333333", () => {
    expect(wsc.normalizeColor("#333")).toBe("#333333");
  });
  test("24bit unchanged: #333333->#333333", () => {
    expect(wsc.normalizeColor("#333333")).toBe("#333333");
  });
  test("web color properly replaced: teal->#008080", () => {
    expect(wsc.normalizeColor("teal")).toBe("#008080");
  });
});

describe("deepEqual", () => {
  test("returns true for identical objects", () => {
    const obj1 = { a: 1, b: "test", c: [1, 2, 3] };
    const obj2 = { a: 1, b: "test", c: [1, 2, 3] };
    expect(wsc.deepEqual(obj1, obj2)).toBe(true);
  });

  test("returns false for different objects", () => {
    const obj1 = { a: 1, b: "test", c: [1, 2, 3] };
    const obj2 = { a: 1, b: "test", c: [1, 2, 4] };
    expect(wsc.deepEqual(obj1, obj2)).toBe(false);
  });
});

describe("escapeRegex", () => {
  test("escapes special regex characters", () => {
    const input = "Hello. How are you? (I hope you're well!)";
    const expectedOutput = "Hello\\. How are you\\? \\(I hope you're well!\\)";
    expect(wsc.escapeRegex(input)).toBe(expectedOutput);
  });

  test("does not escape non-special characters", () => {
    const input = "Hello World";
    const expectedOutput = "Hello World";
    expect(wsc.escapeRegex(input)).toBe(expectedOutput);
  });
});
