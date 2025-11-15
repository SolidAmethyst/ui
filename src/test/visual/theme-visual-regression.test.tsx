/**
 * Visual Regression Tests for Theme
 * Verifies that key demo pages render with appropriate colors for each theme
 * Checks color ranges and contrast to detect visual inconsistencies
 */

import { render, cleanup } from "@solidjs/testing-library";
import { describe, expect, it, afterEach } from "vitest";
import { setTheme } from "../utils/theme-helpers";
import {
  isDarkColor,
  isLightColor,
  hasGoodContrast,
  extractRGBValues,
} from "../utils/style-validators";
import * as DocsPages from "../../demo/pages/docs";

describe("Theme Visual Regression", () => {
  afterEach(() => {
    cleanup();
  });

  // Key pages with complex styling and visual elements
  const keyPages = [
    { name: "GridDocs", Component: DocsPages.GridDocs },
    { name: "SearchDocs", Component: DocsPages.SearchDocs },
    { name: "AppDocs", Component: DocsPages.AppDocs },
  ];

  keyPages.forEach(({ name, Component }) => {
    describe(`${name} Visual Regression`, () => {
      it("should have appropriate background colors in dark theme", () => {
        setTheme("dark");
        const { container } = render(() => <Component />);

        // Find elements with background colors
        const elementsWithBg = container.querySelectorAll(
          '[style*="background"]',
        );
        const darkBackgrounds: string[] = [];
        const lightBackgrounds: string[] = [];

        elementsWithBg.forEach((element) => {
          const htmlElement = element as HTMLElement;
          const bgColor =
            htmlElement.style.backgroundColor || htmlElement.style.background;

          if (
            bgColor &&
            !bgColor.includes("var(--") &&
            !bgColor.includes("gradient")
          ) {
            // Only check solid colors (not CSS variables or gradients)
            try {
              const [r, g, b] = extractRGBValues(bgColor);
              // Skip transparent/very low opacity
              if (r === 0 && g === 0 && b === 0) return;

              if (isDarkColor(bgColor)) {
                darkBackgrounds.push(bgColor);
              } else if (isLightColor(bgColor)) {
                lightBackgrounds.push(bgColor);
              }
            } catch (e) {
              // Skip if can't parse
            }
          }
        });

        // In dark theme, we should have more dark backgrounds than light
        // Or use CSS variables (which we can't detect as hardcoded)
        if (lightBackgrounds.length > 0 && darkBackgrounds.length === 0) {
          expect.fail(
            `${name} in dark theme has ${lightBackgrounds.length} light background(s) but no dark backgrounds.\n` +
              `Light backgrounds found: ${lightBackgrounds.join(", ")}\n` +
              `This suggests hardcoded light colors instead of theme-aware styling.`,
          );
        }

        // Test passes if we have dark backgrounds or no hardcoded colors (using CSS vars)
        expect(
          lightBackgrounds.length === 0 || darkBackgrounds.length > 0,
        ).toBe(true);
      });

      it("should have appropriate background colors in light theme", () => {
        setTheme("light");
        const { container } = render(() => <Component />);

        // Find elements with background colors
        const elementsWithBg = container.querySelectorAll(
          '[style*="background"]',
        );
        const darkBackgrounds: string[] = [];
        const lightBackgrounds: string[] = [];

        elementsWithBg.forEach((element) => {
          const htmlElement = element as HTMLElement;
          const bgColor =
            htmlElement.style.backgroundColor || htmlElement.style.background;

          if (
            bgColor &&
            !bgColor.includes("var(--") &&
            !bgColor.includes("gradient")
          ) {
            try {
              const [r, g, b] = extractRGBValues(bgColor);
              // Skip transparent/very low opacity
              if (r === 0 && g === 0 && b === 0) return;

              if (isDarkColor(bgColor)) {
                darkBackgrounds.push(bgColor);
              } else if (isLightColor(bgColor)) {
                lightBackgrounds.push(bgColor);
              }
            } catch (e) {
              // Skip if can't parse
            }
          }
        });

        // In light theme, we should have more light backgrounds than dark
        // Or use CSS variables
        if (darkBackgrounds.length > 0 && lightBackgrounds.length === 0) {
          expect.fail(
            `${name} in light theme has ${darkBackgrounds.length} dark background(s) but no light backgrounds.\n` +
              `Dark backgrounds found: ${darkBackgrounds.join(", ")}\n` +
              `This suggests hardcoded dark colors instead of theme-aware styling.`,
          );
        }

        // Test passes if we have light backgrounds or no hardcoded colors
        expect(
          darkBackgrounds.length === 0 || lightBackgrounds.length > 0,
        ).toBe(true);
      });

      it("should maintain good contrast between text and background", () => {
        setTheme("dark");
        const { container } = render(() => <Component />);

        // Find elements with both color and background
        const textElements = container.querySelectorAll(
          '[style*="color"][style*="background"]',
        );
        const poorContrastElements: string[] = [];

        textElements.forEach((element, index) => {
          const htmlElement = element as HTMLElement;
          const color = htmlElement.style.color;
          const bgColor =
            htmlElement.style.backgroundColor || htmlElement.style.background;

          // Only check if both are hardcoded (not CSS variables)
          if (
            color &&
            bgColor &&
            !color.includes("var(--") &&
            !bgColor.includes("var(--") &&
            !bgColor.includes("gradient")
          ) {
            try {
              if (!hasGoodContrast(color, bgColor)) {
                poorContrastElements.push(
                  `Element ${index}: color=${color}, background=${bgColor}`,
                );
              }
            } catch (e) {
              // Skip if can't parse
            }
          }
        });

        if (poorContrastElements.length > 0) {
          expect.fail(
            `${name} has ${poorContrastElements.length} element(s) with poor contrast:\n` +
              poorContrastElements.join("\n") +
              "\n\nThese should use CSS variables for proper theming and accessibility.",
          );
        }

        expect(poorContrastElements).toHaveLength(0);
      });

      it("should render consistently in both themes", () => {
        // Render in dark theme
        setTheme("dark");
        const { container: darkContainer } = render(() => <Component />);
        const darkElements = darkContainer.querySelectorAll("*").length;

        cleanup();

        // Render in light theme
        setTheme("light");
        const { container: lightContainer } = render(() => <Component />);
        const lightElements = lightContainer.querySelectorAll("*").length;

        // Both themes should render same number of elements (structure shouldn't change)
        expect(lightElements).toBe(darkElements);
      });
    });
  });

  describe("Theme Color Ranges", () => {
    it("should correctly identify dark colors", () => {
      // Test dark color detection
      expect(isDarkColor("rgb(20, 20, 20)")).toBe(true);
      expect(isDarkColor("rgba(30, 30, 30, 0.8)")).toBe(true);
      expect(isDarkColor("#111111")).toBe(true);
      expect(isDarkColor("rgb(200, 200, 200)")).toBe(false);
    });

    it("should correctly identify light colors", () => {
      // Test light color detection
      expect(isLightColor("rgb(240, 240, 240)")).toBe(true);
      expect(isLightColor("rgba(250, 250, 250, 0.8)")).toBe(true);
      expect(isLightColor("#ffffff")).toBe(true);
      expect(isLightColor("rgb(50, 50, 50)")).toBe(false);
    });

    it("should correctly calculate contrast ratios", () => {
      // Test contrast calculation
      expect(hasGoodContrast("#000000", "#ffffff")).toBe(true); // Perfect contrast
      expect(hasGoodContrast("#333333", "#ffffff")).toBe(true); // Good contrast
      expect(hasGoodContrast("#888888", "#999999")).toBe(false); // Poor contrast
    });
  });

  describe("Global Theme State", () => {
    it("should have dark theme CSS variables set correctly", () => {
      setTheme("dark");

      // Check data-theme attribute
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

      // Check that dark theme CSS variables are set
      const rootStyle = document.documentElement.style;
      const background = rootStyle.getPropertyValue("--background");
      const foreground = rootStyle.getPropertyValue("--foreground");

      expect(background).toBeTruthy();
      expect(foreground).toBeTruthy();

      // Dark theme should have low background values
      if (background) {
        const [r, g, b] = extractRGBValues(background);
        // Very permissive check - just verify it's set to something dark-ish
        expect(r + g + b).toBeLessThan(400);
      }
    });

    it("should have light theme CSS variables set correctly", () => {
      setTheme("light");

      // Check data-theme attribute
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");

      // Check that light theme CSS variables are set
      const rootStyle = document.documentElement.style;
      const background = rootStyle.getPropertyValue("--background");
      const foreground = rootStyle.getPropertyValue("--foreground");

      expect(background).toBeTruthy();
      expect(foreground).toBeTruthy();

      // Light theme should have high background values
      if (background) {
        const [r, g, b] = extractRGBValues(background);
        // Very permissive check - just verify it's set to something light-ish
        expect(r + g + b).toBeGreaterThan(500);
      }
    });
  });
});
