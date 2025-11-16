/**
 * Color mapping utilities for automatic hardcoded color fixes
 * Uses colord for intelligent color analysis and replacement suggestions
 */

import { colord, extend } from "colord"
import a11yPlugin from "colord/plugins/a11y"
import valueParser from "postcss-value-parser"

// Extend colord with accessibility plugin
extend([a11yPlugin]);

/**
 * Common hardcoded color patterns and their CSS variable replacements
 */
export const COLOR_MAPPINGS: Record<string, string> = {
  // Pure white/black semi-transparent overlays
  "rgba(255, 255, 255, 0.05)": "hsl(var(--foreground) / 5%)",
  "rgba(255, 255, 255, 0.1)": "hsl(var(--foreground) / 10%)",
  "rgba(255, 255, 255, 0.2)": "hsl(var(--foreground) / 20%)",
  "rgba(0, 0, 0, 0.1)": "hsl(var(--background) / 10%)",
  "rgba(0, 0, 0, 0.3)": "hsl(var(--background) / 30%)",
  "rgba(0, 0, 0, 0.6)": "hsl(var(--background) / 60%)",

  // Pure white/black
  "#ffffff": "hsl(var(--foreground))",
  "#fff": "hsl(var(--foreground))",
  "#000000": "hsl(var(--background))",
  "#000": "hsl(var(--background))",
  "rgb(255, 255, 255)": "hsl(var(--foreground))",
  "rgb(0, 0, 0)": "hsl(var(--background))",

  // Light grays (text on dark bg)
  "#f6f6f6": "hsl(var(--foreground))",
  "rgba(246, 246, 246, 0.8)": "hsl(var(--foreground) / 80%)",
  "rgba(246, 246, 246, 0.9)": "hsl(var(--foreground) / 90%)",

  // Dark grays (text on light bg)
  "rgba(0, 0, 0, 0.9)": "hsl(var(--foreground))",
  "rgba(30, 30, 30, 0.5)": "hsl(var(--muted-foreground) / 50%)",

  // Common backgrounds
  "rgba(248, 248, 248, 1)": "hsl(var(--card))",
  "rgb(248, 248, 248)": "hsl(var(--card))",
};

/**
 * Normalize rgba color string for comparison
 */
function normalizeRgbaString(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    const r = match[1];
    const g = match[2];
    const b = match[3];
    const a = match[4] || "1";
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return rgba;
}

/**
 * Find the best CSS variable for a given color based on luminance analysis
 * @param colorString - Color string to analyze (rgba, rgb, hex)
 * @returns Suggested CSS variable replacement
 */
export function findBestCSSVariable(colorString: string): string {
  // Check if exact mapping exists
  const normalized = normalizeRgbaString(colorString);
  if (COLOR_MAPPINGS[normalized]) {
    return COLOR_MAPPINGS[normalized];
  }

  // Also check without normalization
  if (COLOR_MAPPINGS[colorString]) {
    return COLOR_MAPPINGS[colorString];
  }

  try {
    const color = colord(colorString);
    if (!color.isValid()) {
      return colorString; // Can't parse, return original
    }

    const luminance = color.luminance();
    const alpha = color.alpha();

    // Semi-transparent colors
    if (alpha < 1) {
      const percentage = Math.round(alpha * 100);

      // Very light colors with transparency -> foreground
      if (luminance > 0.8) {
        return `hsl(var(--foreground) / ${percentage}%)`;
      }

      // Very dark colors with transparency -> background/muted
      if (luminance < 0.2) {
        return `hsl(var(--muted) / ${percentage}%)`;
      }

      // Mid-range transparency
      return `hsl(var(--muted-foreground) / ${percentage}%)`;
    }

    // Fully opaque colors
    // Very light (> 0.9) -> foreground
    if (luminance > 0.9) {
      return "hsl(var(--foreground))";
    }

    // Light (0.6 - 0.9) -> card/background
    if (luminance > 0.6) {
      return "hsl(var(--card))";
    }

    // Mid (0.3 - 0.6) -> muted
    if (luminance > 0.3) {
      return "hsl(var(--muted))";
    }

    // Dark (0.1 - 0.3) -> muted-foreground
    if (luminance > 0.1) {
      return "hsl(var(--muted-foreground))";
    }

    // Very dark (< 0.1) -> background
    return "hsl(var(--background))";
  } catch (e) {
    // If analysis fails, return original
    return colorString;
  }
}

/**
 * Parse CSS value and extract color information
 * @param cssValue - CSS property value (e.g., "0 2px 8px rgba(0, 0, 0, 0.3)")
 * @returns Array of parsed value nodes
 */
export function parseStyleValue(cssValue: string) {
  return valueParser(cssValue);
}

/**
 * Convert hardcoded colors in a CSS value to theme-aware CSS variables
 * @param cssValue - CSS property value
 * @returns Converted value with CSS variables
 */
export function convertToThemeAware(cssValue: string): string {
  // Quick check if already using CSS variables
  if (cssValue.includes("var(--")) {
    return cssValue;
  }

  // Parse the CSS value
  const parsed = parseStyleValue(cssValue);
  let converted = cssValue;

  // Walk through nodes and replace color values
  parsed.walk((node) => {
    if (
      node.type === "function" &&
      (node.value === "rgba" || node.value === "rgb")
    ) {
      const originalColor = valueParser.stringify(node);
      const replacement = findBestCSSVariable(originalColor);
      if (replacement !== originalColor) {
        converted = converted.replace(originalColor, replacement);
      }
    }
  });

  // Also check for hex colors
  const hexPattern = /#[0-9a-fA-F]{3,6}\b/g;
  converted = converted.replace(hexPattern, (hex) => {
    const replacement = findBestCSSVariable(hex);
    return replacement !== hex ? replacement : hex;
  });

  return converted;
}

/**
 * Generate a replacement suggestion for a hardcoded color
 * @param color - Color string to analyze
 * @param context - Context where color is used (e.g., "background", "color", "border")
 * @returns Object with replacement suggestion and reason
 */
export function generateReplacement(
  color: string,
  context: string = "",
): { replacement: string; reason: string } {
  const replacement = findBestCSSVariable(color);

  let reason = "General theme-aware replacement";

  try {
    const parsed = colord(color);
    if (parsed.isValid()) {
      const luminance = parsed.luminance();
      const alpha = parsed.alpha();

      if (alpha < 1) {
        reason = `Semi-transparent ${luminance > 0.5 ? "light" : "dark"} color (${Math.round(alpha * 100)}% opacity)`;
      } else if (luminance > 0.9) {
        reason = "Very light color suitable for text/foreground";
      } else if (luminance < 0.1) {
        reason = "Very dark color suitable for backgrounds";
      } else {
        reason = `Mid-range luminance (${(luminance * 100).toFixed(1)}%)`;
      }
    }
  } catch (e) {
    // Use default reason
  }

  return { replacement, reason };
}

/**
 * Check if a color would have good contrast in both themes
 * @param color - Color to check
 * @param lightBg - Light theme background color
 * @param darkBg - Dark theme background color
 * @returns True if color works well in both themes
 */
export function worksInBothThemes(
  color: string,
  lightBg: string = "#ffffff",
  darkBg: string = "#000000",
): boolean {
  try {
    const colorObj = colord(color);
    const lightBgObj = colord(lightBg);
    const darkBgObj = colord(darkBg);

    if (!colorObj.isValid() || !lightBgObj.isValid() || !darkBgObj.isValid()) {
      return false;
    }

    // Check if it has good contrast against both backgrounds
    const lightContrast = colorObj.isReadable(lightBgObj, {
      level: "AA",
      size: "normal",
    });
    const darkContrast = colorObj.isReadable(darkBgObj, {
      level: "AA",
      size: "normal",
    });

    // Color should work in both themes
    return lightContrast && darkContrast;
  } catch (e) {
    return false;
  }
}

/**
 * Analyze a color and provide detailed information
 * @param color - Color string to analyze
 * @returns Color analysis object
 */
export function analyzeColor(color: string): {
  isValid: boolean;
  luminance: number;
  alpha: number;
  isDark: boolean;
  isLight: boolean;
  hex: string;
  rgb: string;
  hsl: string;
} {
  try {
    const parsed = colord(color);

    // Handle CSS variable HSL format
    const hslMatch = color.match(/(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%/);
    if (hslMatch) {
      const h = parseFloat(hslMatch[1]);
      const s = parseFloat(hslMatch[2]);
      const l = parseFloat(hslMatch[3]);
      const hslColor = colord({ h, s, l });

      return {
        isValid: true,
        luminance: hslColor.luminance(),
        alpha: 1,
        isDark: hslColor.luminance() < 0.2,
        isLight: hslColor.luminance() > 0.6,
        hex: hslColor.toHex(),
        rgb: hslColor.toRgbString(),
        hsl: hslColor.toHslString(),
      };
    }

    return {
      isValid: parsed.isValid(),
      luminance: parsed.luminance(),
      alpha: parsed.alpha(),
      isDark: parsed.luminance() < 0.2,
      isLight: parsed.luminance() > 0.6,
      hex: parsed.toHex(),
      rgb: parsed.toRgbString(),
      hsl: parsed.toHslString(),
    };
  } catch (e) {
    return {
      isValid: false,
      luminance: 0,
      alpha: 1,
      isDark: false,
      isLight: false,
      hex: "",
      rgb: "",
      hsl: "",
    };
  }
}
