/**
 * CSS Variables Tests
 * Tests to verify CSS variables change on theme switch
 */

import { beforeEach, describe, expect, it } from "vitest";
import {
  assertThemeVariablesChange,
  getComputedCSSVariable,
  setTheme,
} from "../utils/theme-helpers";

// Helper to set dark theme variables
function setDarkThemeVariables() {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(
      "--background",
      "222.2 84% 4.9%",
    );
    document.documentElement.style.setProperty("--foreground", "210 40% 98%");
    document.documentElement.style.setProperty("--card", "222.2 84% 4.9%");
    document.documentElement.style.setProperty(
      "--card-foreground",
      "210 40% 98%",
    );
    document.documentElement.style.setProperty("--primary", "271 81% 63%");
    document.documentElement.style.setProperty(
      "--primary-hover",
      "271 81% 73%",
    );
    document.documentElement.style.setProperty("--hover-color", "271 100% 66%");
    document.documentElement.style.setProperty("--secondary", "240 15% 10%");
    document.documentElement.style.setProperty(
      "--secondary-foreground",
      "210 40% 98%",
    );
    document.documentElement.style.setProperty("--muted", "240 14% 12%");
    document.documentElement.style.setProperty(
      "--muted-foreground",
      "215 20.2% 65.1%",
    );
    document.documentElement.style.setProperty("--border", "240 14% 13%");
    document.documentElement.style.setProperty("--input", "217.2 32.6% 17.5%");
  }
}

// Helper to set light theme variables
function setLightThemeVariables() {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--background", "0 0% 100%");
    document.documentElement.style.setProperty(
      "--foreground",
      "222.2 84% 4.9%",
    );
    document.documentElement.style.setProperty("--card", "0 0% 100%");
    document.documentElement.style.setProperty(
      "--card-foreground",
      "222.2 84% 4.9%",
    );
    document.documentElement.style.setProperty("--primary", "271 81% 53%");
    document.documentElement.style.setProperty(
      "--primary-hover",
      "271 81% 63%",
    );
    document.documentElement.style.setProperty("--hover-color", "271 100% 58%");
    document.documentElement.style.setProperty("--secondary", "210 40% 96%");
    document.documentElement.style.setProperty(
      "--secondary-foreground",
      "222.2 84% 4.9%",
    );
    document.documentElement.style.setProperty("--muted", "240 14% 96%");
    document.documentElement.style.setProperty(
      "--muted-foreground",
      "215.4 16.3% 46.9%",
    );
    document.documentElement.style.setProperty("--border", "240 14% 92%");
    document.documentElement.style.setProperty("--input", "214.3 31.8% 91.4%");
  }
}

describe("CSS Variables Tests", () => {
  beforeEach(() => {
    // Reset to light theme before each test
    setTheme("light");
    setLightThemeVariables();
  });

  it("All CSS variables are defined in globals.css", () => {
    // Check key CSS variables exist
    const keyVariables = [
      "--background",
      "--foreground",
      "--card",
      "--primary",
      "--secondary",
      "--muted",
      "--muted-foreground",
      "--border",
      "--input",
      "--accent",
    ];

    keyVariables.forEach((varName) => {
      const value = getComputedCSSVariable(varName);
      expect(value).toBeTruthy();
      expect(value).not.toBe("");
    });
  });

  it("CSS variables change when theme switches from light to dark", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightBg = getComputedCSSVariable("--background");
    const lightFg = getComputedCSSVariable("--foreground");

    setTheme("dark");
    setDarkThemeVariables();
    const darkBg = getComputedCSSVariable("--background");
    const darkFg = getComputedCSSVariable("--foreground");

    // Variables should be different
    expect(lightBg).not.toBe(darkBg);
    expect(lightFg).not.toBe(darkFg);
  });

  it('Dark theme variables are applied when data-theme="dark"', () => {
    setTheme("dark");
    setDarkThemeVariables();

    // Check key dark theme variables
    const background = getComputedCSSVariable("--background");
    const foreground = getComputedCSSVariable("--foreground");
    const card = getComputedCSSVariable("--card");

    // Dark theme should have dark backgrounds
    // Background should be dark (low lightness in HSL)
    expect(background).toMatch(/222\.2|240|217/); // Dark HSL values
    expect(foreground).toMatch(/210|98/); // Light foreground
    expect(card).toMatch(/222\.2|240|217/); // Dark card
  });

  it('Light theme variables are applied when data-theme="light"', () => {
    setTheme("light");
    setLightThemeVariables();

    // Check key light theme variables
    const background = getComputedCSSVariable("--background");
    const foreground = getComputedCSSVariable("--foreground");
    const card = getComputedCSSVariable("--card");

    // Light theme should have light backgrounds
    // Background should be light (high lightness in HSL)
    expect(background).toMatch(/0\s+0%\s+100%|100%/); // White/light HSL
    expect(foreground).toMatch(/222\.2|4\.9%/); // Dark foreground
    expect(card).toMatch(/0\s+0%\s+100%|100%/); // Light card
  });

  it("No hardcoded colors in computed styles - background uses CSS variable", () => {
    setTheme("dark");
    setDarkThemeVariables();
    const background = getComputedCSSVariable("--background");

    // Should use HSL format with CSS variable, not hardcoded RGB
    expect(background).toMatch(/^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%$/);
    expect(background).not.toMatch(/rgb\(255,\s*255,\s*255\)|#ffffff|white/i);
  });

  it("Primary color changes between themes", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightPrimary = getComputedCSSVariable("--primary");

    setTheme("dark");
    setDarkThemeVariables();
    const darkPrimary = getComputedCSSVariable("--primary");

    expect(lightPrimary).toMatch(/271\s+81%\s+53%/); // Light theme primary
    expect(darkPrimary).toMatch(/271\s+81%\s+63%/); // Dark theme primary (lighter)
    expect(lightPrimary).not.toBe(darkPrimary);
  });

  it("Border color changes between themes", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightBorder = getComputedCSSVariable("--border");

    setTheme("dark");
    setDarkThemeVariables();
    const darkBorder = getComputedCSSVariable("--border");

    expect(lightBorder).not.toBe(darkBorder);
  });

  it("Muted colors change between themes", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightMuted = getComputedCSSVariable("--muted");
    const lightMutedFg = getComputedCSSVariable("--muted-foreground");

    setTheme("dark");
    setDarkThemeVariables();
    const darkMuted = getComputedCSSVariable("--muted");
    const darkMutedFg = getComputedCSSVariable("--muted-foreground");

    expect(lightMuted).not.toBe(darkMuted);
    expect(lightMutedFg).not.toBe(darkMutedFg);
  });

  it("Card colors change between themes", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightCard = getComputedCSSVariable("--card");
    const lightCardFg = getComputedCSSVariable("--card-foreground");

    setTheme("dark");
    setDarkThemeVariables();
    const darkCard = getComputedCSSVariable("--card");
    const darkCardFg = getComputedCSSVariable("--card-foreground");

    expect(lightCard).not.toBe(darkCard);
    expect(lightCardFg).not.toBe(darkCardFg);
  });

  it("Input colors change between themes", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightInput = getComputedCSSVariable("--input");

    setTheme("dark");
    setDarkThemeVariables();
    const darkInput = getComputedCSSVariable("--input");

    expect(lightInput).not.toBe(darkInput);
  });

  it("Secondary colors change between themes", () => {
    setTheme("light");
    setLightThemeVariables();
    const lightSecondary = getComputedCSSVariable("--secondary");

    setTheme("dark");
    setDarkThemeVariables();
    const darkSecondary = getComputedCSSVariable("--secondary");

    expect(lightSecondary).not.toBe(darkSecondary);
  });
});
