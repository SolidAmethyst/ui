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

/**
 * Gets the local theme from the nearest parent element with data-theme attribute
 * Falls back to getThemeFromCSS() if no local theme is found
 * SSR-safe: returns default (dark) if document is undefined
 * @param element - The element to start searching from (or null)
 * @returns true if dark theme, false if light theme
 */
export function getLocalTheme(element: HTMLElement | null): boolean {
  if (typeof document === "undefined" || !element) {
    return getThemeFromCSS();
  }

  // Search up the DOM tree for data-theme attribute
  let current: HTMLElement | null = element;
  while (current) {
    const theme = current.getAttribute("data-theme");
    if (theme === "dark") {
      return true;
    }
    if (theme === "light") {
      return false;
    }
    current = current.parentElement;
  }

  // Fallback to global theme
  return getThemeFromCSS();
}
