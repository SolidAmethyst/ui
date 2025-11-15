import { describe, it, expect } from "vitest";
import { setTheme } from "../utils/theme-helpers";

describe("Sidebar Theme", () => {
  it("uses CSS variables for colors", () => {
    setTheme("dark");
    const darkSidebarBg = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--sidebar-background");
    expect(darkSidebarBg.trim()).toBeTruthy();

    setTheme("light");
    const lightSidebarBg = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--sidebar-background");
    expect(lightSidebarBg.trim()).toBeTruthy();
    expect(lightSidebarBg).not.toBe(darkSidebarBg);
  });

  it("sidebar colors defined for both themes", () => {
    const sidebarVars = [
      "--sidebar-background",
      "--sidebar-foreground",
      "--sidebar-accent",
      "--sidebar-border",
    ];

    setTheme("dark");
    sidebarVars.forEach((varName) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        varName,
      );
      expect(value.trim()).toBeTruthy();
    });

    setTheme("light");
    sidebarVars.forEach((varName) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        varName,
      );
      expect(value.trim()).toBeTruthy();
    });
  });
});
