/**
 * Theme testing utilities
 * Helpers for testing theme functionality and CSS variables
 */

/**
 * Set data-theme attribute on document.documentElement
 * Also updates CSS variables to match the theme
 */
export function setTheme(theme: "dark" | "light"): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);

    // Update CSS variables to match theme
    if (theme === "dark") {
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
      document.documentElement.style.setProperty("--popover", "222.2 84% 4.9%");
      document.documentElement.style.setProperty(
        "--popover-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty("--primary", "271 81% 63%");
      document.documentElement.style.setProperty(
        "--primary-hover",
        "271 81% 73%",
      );
      document.documentElement.style.setProperty(
        "--hover-color",
        "271 100% 66%",
      );
      document.documentElement.style.setProperty(
        "--primary-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty("--secondary", "240 15% 10%");
      document.documentElement.style.setProperty(
        "--secondary-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty(
        "--page-background",
        "222.2 84% 4.9%",
      );
      document.documentElement.style.setProperty("--muted", "240 14% 12%");
      document.documentElement.style.setProperty(
        "--muted-foreground",
        "215 20.2% 65.1%",
      );
      document.documentElement.style.setProperty("--accent", "231 95% 66%");
      document.documentElement.style.setProperty(
        "--accent-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty(
        "--destructive",
        "0 84.2% 60.2%",
      );
      document.documentElement.style.setProperty(
        "--destructive-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty("--border", "240 14% 13%");
      document.documentElement.style.setProperty(
        "--input",
        "217.2 32.6% 17.5%",
      );
      document.documentElement.style.setProperty("--ring", "271 81% 63%");
    } else {
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
      document.documentElement.style.setProperty("--popover", "0 0% 100%");
      document.documentElement.style.setProperty(
        "--popover-foreground",
        "222.2 84% 4.9%",
      );
      document.documentElement.style.setProperty("--primary", "271 81% 53%");
      document.documentElement.style.setProperty(
        "--primary-hover",
        "271 81% 63%",
      );
      document.documentElement.style.setProperty(
        "--hover-color",
        "271 100% 58%",
      );
      document.documentElement.style.setProperty(
        "--primary-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty("--secondary", "210 40% 96%");
      document.documentElement.style.setProperty(
        "--secondary-foreground",
        "222.2 84% 4.9%",
      );
      document.documentElement.style.setProperty(
        "--page-background",
        "0 0% 100%",
      );
      document.documentElement.style.setProperty("--muted", "240 14% 96%");
      document.documentElement.style.setProperty(
        "--muted-foreground",
        "215.4 16.3% 46.9%",
      );
      document.documentElement.style.setProperty("--accent", "231 95% 66%");
      document.documentElement.style.setProperty(
        "--accent-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty(
        "--destructive",
        "0 84.2% 60.2%",
      );
      document.documentElement.style.setProperty(
        "--destructive-foreground",
        "210 40% 98%",
      );
      document.documentElement.style.setProperty("--border", "240 14% 92%");
      document.documentElement.style.setProperty(
        "--input",
        "214.3 31.8% 91.4%",
      );
      document.documentElement.style.setProperty("--ring", "271 81% 53%");
    }
  }
}

/**
 * Get computed CSS variable value from document.documentElement
 */
export function getComputedCSSVariable(name: string): string {
  if (typeof document === "undefined") {
    return "";
  }
  const root = document.documentElement;
  // First try to get from inline style (set by test setup)
  const inlineValue = root.style.getPropertyValue(name);
  if (inlineValue) {
    return inlineValue.trim();
  }
  // Fallback to computed style
  const styles = getComputedStyle(root);
  return styles.getPropertyValue(name).trim();
}

/**
 * Assert that element styles match expected theme
 */
export function assertThemeStyles(
  element: HTMLElement,
  theme: "dark" | "light",
): void {
  const styles = getComputedStyle(element);
  const bg = styles.backgroundColor;
  const color = styles.color;

  if (theme === "dark") {
    // Dark theme: background should not be white, text should not be black
    expect(bg).not.toMatch(
      /rgba?\(255,\s*255,\s*255|rgb\(255\s+255\s+255\)|white|#fff/i,
    );
    expect(color).not.toMatch(
      /rgba?\(0,\s*0,\s*0|rgb\(0\s+0\s+0\)|black|#000/i,
    );
  } else {
    // Light theme: background should be light, text should be dark
    expect(bg).toMatch(/rgba?\(255|rgb\(255|white|#fff|hsl\(0\s+0%\s+100%\)/i);
    expect(color).toMatch(/rgba?\(0|rgb\(0|black|#000|hsl\(222/i);
  }
}

/**
 * Get all CSS variables from document.documentElement
 */
export function getAllCSSVariables(): Record<string, string> {
  if (typeof document === "undefined") {
    return {};
  }
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const variables: Record<string, string> = {};

  // Get all CSS variables (properties starting with --)
  for (let i = 0; i < styles.length; i++) {
    const prop = styles[i];
    if (prop.startsWith("--")) {
      variables[prop] = styles.getPropertyValue(prop).trim();
    }
  }

  return variables;
}

/**
 * Assert that CSS variable has expected value
 */
export function assertCSSVariable(
  name: string,
  expectedValue: string | RegExp,
): void {
  const value = getComputedCSSVariable(name);
  if (typeof expectedValue === "string") {
    expect(value).toBe(expectedValue);
  } else {
    expect(value).toMatch(expectedValue);
  }
}

/**
 * Assert that CSS variables change between themes
 */
export function assertThemeVariablesChange(
  varName: string,
  lightValue: string | RegExp,
  darkValue: string | RegExp,
): void {
  // Test light theme
  setTheme("light");
  const lightVar = getComputedCSSVariable(varName);
  if (typeof lightValue === "string") {
    expect(lightVar).toBe(lightValue);
  } else {
    expect(lightVar).toMatch(lightValue);
  }

  // Test dark theme
  setTheme("dark");
  const darkVar = getComputedCSSVariable(varName);
  if (typeof darkValue === "string") {
    expect(darkVar).toBe(darkValue);
  } else {
    expect(darkVar).toMatch(darkValue);
  }

  // Ensure they're different (only if expect is available - this is a test utility)
  if (typeof expect !== "undefined") {
    expect(lightVar).not.toBe(darkVar);
  }
}

/**
 * Reset theme to default (light)
 */
export function resetTheme(): void {
  setTheme("light");
}
