import { describe, it, expect } from "vitest";
import { setTheme } from "../utils/theme-helpers";

describe("Global Styles Theme", () => {
  it("body background changes with theme", () => {
    setTheme("light");
    const lightBg = getComputedStyle(document.body).background;

    setTheme("dark");
    const darkBg = getComputedStyle(document.body).background;

    expect(lightBg).not.toBe(darkBg);
  });

  it("html background changes with theme", () => {
    setTheme("light");
    const lightBg = getComputedStyle(document.documentElement).background;

    setTheme("dark");
    const darkBg = getComputedStyle(document.documentElement).background;

    expect(lightBg).not.toBe(darkBg);
  });
});
