import { describe, it, expect, beforeEach } from "vitest";
import { setTheme } from "../utils/theme-helpers";

describe("Layout Integration Theme Tests", () => {
  beforeEach(() => {
    setTheme("light");
  });

  it("body background matches theme", () => {
    setTheme("dark");
    const bodyBg = getComputedStyle(document.body).background;
    expect(bodyBg).toContain("hsl"); // Should use CSS variable

    setTheme("light");
    const lightBodyBg = getComputedStyle(document.body).background;
    expect(lightBodyBg).not.toBe(bodyBg);
  });

  it("html background matches theme", () => {
    setTheme("dark");
    const htmlBg = getComputedStyle(document.documentElement).background;
    expect(htmlBg).toBeTruthy();

    setTheme("light");
    const lightHtmlBg = getComputedStyle(document.documentElement).background;
    expect(lightHtmlBg).not.toBe(htmlBg);
  });

  it("all CSS variables are defined for both themes", () => {
    const requiredVars = [
      "--background",
      "--foreground",
      "--card",
      "--border",
      "--primary",
      "--top-nav-background",
      "--shadow",
    ];

    setTheme("dark");
    requiredVars.forEach((varName) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        varName,
      );
      expect(value.trim()).toBeTruthy();
    });

    setTheme("light");
    requiredVars.forEach((varName) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        varName,
      );
      expect(value.trim()).toBeTruthy();
    });
  });

  it("theme colors are actually different between themes", () => {
    setTheme("light");
    const lightBg = getComputedStyle(document.documentElement).getPropertyValue(
      "--background",
    );
    const lightFg = getComputedStyle(document.documentElement).getPropertyValue(
      "--foreground",
    );

    setTheme("dark");
    const darkBg = getComputedStyle(document.documentElement).getPropertyValue(
      "--background",
    );
    const darkFg = getComputedStyle(document.documentElement).getPropertyValue(
      "--foreground",
    );

    expect(lightBg).not.toBe(darkBg);
    expect(lightFg).not.toBe(darkFg);
  });

  it("no undefined CSS variables in critical properties", () => {
    setTheme("dark");
    const bodyBg = getComputedStyle(document.body).background;
    const htmlBg = getComputedStyle(document.documentElement).background;

    // Should not be empty or 'initial'
    expect(bodyBg).not.toBe("");
    expect(bodyBg).not.toBe("initial");
    expect(htmlBg).not.toBe("");
    expect(htmlBg).not.toBe("initial");
  });
});
