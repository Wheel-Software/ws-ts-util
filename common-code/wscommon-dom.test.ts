import { beforeAll, afterAll, describe, expect, test } from "@jest/globals";

import * as wscd from "./wscommon-dom";

let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
  originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;

  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: function () {
      const width = parseFloat(this.style.width) || 0;
      const height = parseFloat(this.style.height) || 0;
      return {
        width,
        height,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
      };
    },
  });
});

afterAll(() => {
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: originalGetBoundingClientRect,
  });
});

describe("getLargestAncestorRect", () => {
  test("gets parent size for 2-deep element", () => {
    document.body.innerHTML = `
      <div id="parent" style="width:420px;height:69px;">
        <span id="username"></span>
        <button id="button"></button>
      </div>
    `;

    const el = document.getElementById("username");
    expect(el).toBeDefined();

    const therect = wscd.getLargestAncestorRect(el);
    expect(therect).toEqual({ width: 420, height: 69 });
  });
  test("gets parent size for 3-deep element: large > small > id", () => {
    document.body.innerHTML = `
      <div id="parent" style="width:520px;height:72px;">
      <div id="parent" style="width:420px;height:69px;">
        <span id="username"></span>
        <button id="button"></button>
      </div>
      </div>
    `;

    const el = document.getElementById("username");
    expect(el).toBeDefined();

    const therect = wscd.getLargestAncestorRect(el);
    expect(therect).toEqual({ width: 520, height: 72 });
  });
  test("gets parent size for 3-deep element: small >  large > id", () => {
    document.body.innerHTML = `
      <div id="parent" style="width:420px;height:69px;">
      <div id="parent" style="width:520px;height:72px;">
        <span id="username"></span>
        <button id="button"></button>
      </div>
      </div>
    `;

    const el = document.getElementById("username");
    expect(el).toBeDefined();

    const therect = wscd.getLargestAncestorRect(el);
    expect(therect).toEqual({ width: 520, height: 72 });
  });
});
