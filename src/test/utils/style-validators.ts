/**
 * Style validation utilities for theme testing
 * Provides functions to extract, validate and analyze inline styles
 * Uses colord library for professional color analysis
 */

import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

// Extend colord with accessibility plugin for WCAG contrast checks
extend([a11yPlugin]);

/**
 * Extract all inline styles from DOM elements in a container
 * @param container - Root element to search
 * @returns Map of element identifiers to their inline style declarations
 */
export function extractInlineStyles(
  container: HTMLElement,
): Map<string, CSSStyleDeclaration> {
  const stylesMap = new Map<string, CSSStyleDeclaration>();
  const elementsWithStyles = container.querySelectorAll("[style]");

  elementsWithStyles.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    const identifier = `${element.tagName.toLowerCase()}-${index}`;
    stylesMap.set(identifier, htmlElement.style);
  });

  return stylesMap;
}

/**
 * Check if a style string contains hardcoded color values
 * Detects rgba(), rgb(), and hex color formats
 * @param style - Style string to check
 * @returns True if hardcoded colors are found
 */
export function hasHardcodedColors(style: string): boolean {
  // Patterns for hardcoded colors
  const rgbaPattern = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/i;
  const hexPattern = /#[0-9a-fA-F]{3,6}/;

  return rgbaPattern.test(style) || hexPattern.test(style);
}

/**
 * Check if a style property uses theme-sensitive CSS variables
 * @param propertyValue - CSS property value to check
 * @returns True if CSS variables are used
 */
export function usesCSSVariables(propertyValue: string): boolean {
  return (
    propertyValue.includes("var(--") || propertyValue.includes("hsl(var(--")
  );
}

/**
 * Check if code uses getThemeFromCSS function
 * @param code - Source code to check
 * @returns True if getThemeFromCSS is used
 */
export function usesThemeFunction(code: string): boolean {
  return code.includes("getThemeFromCSS()");
}

/**
 * Extract RGB values from a color string using colord
 * Supports rgb(), rgba(), hex, HSL, and all CSS color formats
 * @param color - Color string to parse
 * @returns Tuple of [R, G, B] values (0-255)
 */
export function extractRGBValues(color: string): [number, number, number] {
  try {
    // Handle HSL format from CSS variables: "222.2 47.4% 11.2%"
    const hslMatch = color.match(/(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%/);
    if (hslMatch) {
      const h = parseFloat(hslMatch[1]);
      const s = parseFloat(hslMatch[2]);
      const l = parseFloat(hslMatch[3]);
      const rgb = colord({ h, s, l }).toRgb();
      return [rgb.r, rgb.g, rgb.b];
    }

    // Use colord to parse all standard color formats
    const parsedColor = colord(color);
    if (parsedColor.isValid()) {
      const rgb = parsedColor.toRgb();
      return [rgb.r, rgb.g, rgb.b];
    }
  } catch (e) {
    // Ignore parsing errors
  }

  // Default to white if parsing fails
  return [255, 255, 255];
}

/**
 * Check if a color is dark (suitable for dark theme backgrounds)
 * Uses colord's luminance calculation
 * @param color - Color string to check
 * @returns True if color is dark
 */
export function isDarkColor(color: string): boolean {
  try {
    // Handle HSL format from CSS variables
    const hslMatch = color.match(/(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%/);
    if (hslMatch) {
      const h = parseFloat(hslMatch[1]);
      const s = parseFloat(hslMatch[2]);
      const l = parseFloat(hslMatch[3]);
      return colord({ h, s, l }).luminance() < 0.2;
    }

    const parsed = colord(color);
    if (parsed.isValid()) {
      return parsed.luminance() < 0.2;
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return false;
}

/**
 * Check if a color is light (suitable for light theme backgrounds)
 * Uses colord's luminance calculation
 * @param color - Color string to check
 * @returns True if color is light
 */
export function isLightColor(color: string): boolean {
  try {
    // Handle HSL format from CSS variables
    const hslMatch = color.match(/(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%/);
    if (hslMatch) {
      const h = parseFloat(hslMatch[1]);
      const s = parseFloat(hslMatch[2]);
      const l = parseFloat(hslMatch[3]);
      return colord({ h, s, l }).luminance() > 0.6;
    }

    const parsed = colord(color);
    if (parsed.isValid()) {
      return parsed.luminance() > 0.6;
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return false;
}

/**
 * Calculate contrast ratio between two colors
 * @param fg - Foreground color string
 * @param bg - Background color string
 * @returns Contrast ratio value (1-21)
 */
export function getContrastRatio(fg: string, bg: string): number {
  try {
    const fgColor = colord(fg);
    const bgColor = colord(bg);

    if (fgColor.isValid() && bgColor.isValid()) {
      const fgLum = fgColor.luminance();
      const bgLum = bgColor.luminance();
      const lighter = Math.max(fgLum, bgLum);
      const darker = Math.min(fgLum, bgLum);
      return (lighter + 0.05) / (darker + 0.05);
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return 1;
}

/**
 * Check if foreground and background colors have good contrast
 * Uses colord's isReadable() for WCAG compliance
 * @param fg - Foreground color string
 * @param bg - Background color string
 * @param minRatio - Minimum contrast ratio (default: 4.5 for WCAG AA)
 * @returns True if contrast ratio meets requirements
 */
export function hasGoodContrast(
  fg: string,
  bg: string,
  minRatio: number = 4.5,
): boolean {
  try {
    const fgColor = colord(fg);
    const bgColor = colord(bg);

    if (fgColor.isValid() && bgColor.isValid()) {
      // Use isReadable for WCAG AA compliance
      return fgColor.isReadable(bgColor, { level: "AA", size: "normal" });
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return false;
}

/**
 * Find all hardcoded colors in inline styles within a container
 * @param container - Root element to search
 * @returns Array of objects with element info and hardcoded color details
 */
export function findHardcodedColors(
  container: HTMLElement,
): Array<{ element: string; property: string; value: string }> {
  const hardcodedColors: Array<{
    element: string;
    property: string;
    value: string;
  }> = [];
  const elementsWithStyles = container.querySelectorAll("[style]");

  elementsWithStyles.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    const style = htmlElement.style;

    // Theme-sensitive properties to check
    const themeSensitiveProps = [
      "background",
      "background-color",
      "color",
      "border-color",
      "box-shadow",
      "text-shadow",
    ];

    themeSensitiveProps.forEach((prop) => {
      const value = style.getPropertyValue(prop);
      if (value && hasHardcodedColors(value) && !usesCSSVariables(value)) {
        hardcodedColors.push({
          element: `${element.tagName.toLowerCase()}-${index}`,
          property: prop,
          value,
        });
      }
    });
  });

  return hardcodedColors;
}

/**
 * Check if an element's inline styles are theme-aware
 * @param element - Element to check
 * @returns True if element uses CSS variables or getThemeFromCSS for colors
 */
export function isThemeAware(element: HTMLElement): boolean {
  const style = element.getAttribute("style");
  if (!style) return true; // No inline styles is fine

  // Check if uses CSS variables
  if (usesCSSVariables(style)) return true;

  // If has hardcoded colors in theme-sensitive properties, not theme-aware
  const themeSensitivePattern = /(background|color|border-color):\s*(rgba?|#)/i;
  return !themeSensitivePattern.test(style);
}
