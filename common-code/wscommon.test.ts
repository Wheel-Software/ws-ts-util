import { describe, expect, test } from "@jest/globals";
import * as wsc from "../common-code/wscommon";

describe("get_unique_id", () => {
  test("returns a unique ID", () => {
    expect(wsc.get_unique_id()).not.toBe(wsc.get_unique_id());
  });
});

import { afterEach, jest } from "@jest/globals";
afterEach(() => {
  jest.restoreAllMocks(); // don't leak the Math.random mocks
});

describe("dshuffle", () => {
  test("preserves length and contents", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = structuredClone(input);

    wsc.dshuffle(copy);

    expect(copy).toHaveLength(input.length);
    expect([...copy].sort()).toEqual([...input].sort());
  });

  test("produces a deterministic permutation for a fixed random stream", () => {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    const input = [1, 2, 3, 4, 5];
    const copy = structuredClone(input);

    wsc.dshuffle(copy);

    expect(copy).toEqual([2, 3, 4, 5, 1]);
  });
});

describe("normalizeColor", () => {
  test("12-bit to 24-bit", () => {
    const the12 = "#123";
    const the24 = "#112233";
    const theConv = wsc.normalizeColor(the12);
    expect(theConv).toBe(the24);
  });
  test("webcolor to 24-bit", () => {
    const thewc = "teal";
    const the24 = "#008080";
    const theConv = wsc.normalizeColor(thewc);
    expect(theConv).toBe(the24);
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
