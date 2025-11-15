import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { TopNav } from "../../demo/components/layout/top-nav";
import { setTheme } from "../utils/theme-helpers";

describe("TopNav Theme", () => {
  const defaultProps = {
    toggleTheme: () => {},
    currentPage: "docs" as const,
    onPageChange: () => {},
    glassEnabled: false,
    glassBlur: 10,
    glassOpacity: 0.8,
    glassDarkness: 0.3,
    glassSaturation: 1.2,
  };

  it("background changes with theme", () => {
    setTheme("light");
    const { container: lightContainer } = render(() => (
      <TopNav {...defaultProps} />
    ));
    const lightHeader = lightContainer.querySelector("header");
    const lightBg = lightHeader?.style.background;

    setTheme("dark");
    const { container: darkContainer } = render(() => (
      <TopNav {...defaultProps} />
    ));
    const darkHeader = darkContainer.querySelector("header");
    const darkBg = darkHeader?.style.background;

    expect(lightBg).toBeTruthy();
    expect(darkBg).toBeTruthy();
    expect(lightBg).not.toBe(darkBg);
  });

  it("box-shadow uses CSS variables not hardcoded rgba", () => {
    const { container } = render(() => <TopNav {...defaultProps} />);
    const header = container.querySelector("header");
    const boxShadow = header?.style.boxShadow || "";

    // Should not contain hardcoded rgba
    expect(boxShadow).not.toMatch(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,/);

    // Should use hsl(var(--...)) format
    expect(boxShadow).toMatch(/hsl\(var\(--/);
  });

  it("theme toggle icon is correct", () => {
    setTheme("dark");
    const { container: darkContainer } = render(() => (
      <TopNav {...defaultProps} />
    ));
    const darkIcon = darkContainer.querySelector(
      '[title="Toggle theme"]',
    )?.textContent;
    expect(darkIcon).toBe("dark_mode");

    setTheme("light");
    const { container: lightContainer } = render(() => (
      <TopNav {...defaultProps} />
    ));
    const lightIcon = lightContainer.querySelector(
      '[title="Toggle theme"]',
    )?.textContent;
    expect(lightIcon).toBe("light_mode");
  });

  it("no hardcoded colors in inline styles", () => {
    const { container } = render(() => <TopNav {...defaultProps} />);
    const allElements = container.querySelectorAll("[style]");

    allElements.forEach((el) => {
      const style = (el as HTMLElement).getAttribute("style") || "";
      // Check for hardcoded rgba (except decorative)
      const rgbaMatches = style.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g);
      if (rgbaMatches) {
        // Allow decorative shadows but not theme colors
        const hasThemeColor =
          style.includes("background") ||
          style.includes("border") ||
          style.includes("color:");
        if (hasThemeColor) {
          expect(rgbaMatches).toHaveLength(0);
        }
      }
    });
  });
});
