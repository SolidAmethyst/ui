/**
 * Theme utility functions
 * Utilities for detecting theme from CSS data-theme attribute
 */

/**
 * Gets the current theme from CSS data-theme attribute
 * Falls back to prefers-color-scheme media query if data-theme is not set
 * SSR-safe: returns default (dark) if document is undefined
 * @returns true if dark theme, false if light theme
 */
export function getThemeFromCSS(): boolean {
  if (typeof document === "undefined") {
    return true; // SSR default to dark
  }

  const theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    return true;
  }
  if (theme === "light") {
    return false;
  }

  // Fallback to prefers-color-scheme
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return true; // Default to dark
}
