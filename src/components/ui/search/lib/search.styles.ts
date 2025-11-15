/**
 * Search Component Styles
 */

import type { JSX } from "solid-js";

export interface SearchStyleOptions {
  isDisabled: boolean;
  isFocused: boolean;
}

export const searchStyles = {
  container: (): JSX.CSSProperties => ({
    position: "relative",
    width: "100%",
    "box-sizing": "border-box",
  }),

  wrapper: (): JSX.CSSProperties => ({
    position: "relative",
    display: "flex",
    "align-items": "center",
    width: "100%",
    "box-sizing": "border-box",
    cursor: "text",
  }),

  input: (options: SearchStyleOptions): JSX.CSSProperties => ({
    width: "100%",
    padding: "var(--search-padding, 8px 12px 8px 40px)",
    "font-size": "var(--search-font-size, 14px)",
    "font-weight": "400",
    "line-height": "1.5",
    border: `1px solid ${
      options.isFocused ? "hsl(var(--primary))" : "hsl(var(--border))"
    }`,
    "border-radius": "var(--search-border-radius, 8px)",
    background: options.isDisabled
      ? "hsl(var(--muted) / 0.5)"
      : "hsl(var(--background))",
    color: options.isDisabled
      ? "hsla(var(--foreground) / 0.4)"
      : "hsl(var(--foreground))",
    cursor: options.isDisabled ? "not-allowed" : "text",
    transition: "all 0.2s ease",
    "box-sizing": "border-box",
    outline: "none",
    "text-align": "left",
    "pointer-events": "auto",
  }),

  inputHover: (): JSX.CSSProperties => ({
    // Hover styles can be applied via CSS or inline styles
    // This is kept for consistency with other components
  }),

  icon: (options: SearchStyleOptions): JSX.CSSProperties => ({
    position: "absolute",
    left: "var(--search-icon-left, 12px)",
    "font-size": "var(--search-icon-size, 20px)",
    color: options.isDisabled
      ? "hsla(var(--foreground) / 0.3)"
      : "hsla(var(--muted-foreground) / 0.8)",
    "pointer-events": "none",
    "z-index": "1",
    transition: "color 0.2s ease",
  }),

  clearButton: (options: SearchStyleOptions): JSX.CSSProperties => ({
    position: "absolute",
    right: "var(--search-clear-right, 8px)",
    width: "var(--search-clear-size, 20px)",
    height: "var(--search-clear-size, 20px)",
    padding: "0",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "font-size": "var(--search-clear-icon-size, 16px)",
    border: "none",
    "border-radius": "var(--radius-sm, 4px)",
    background: "transparent",
    color: "hsla(var(--muted-foreground) / 0.8)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "z-index": "1",
    outline: "none",
  }),

  clearButtonHover: (): JSX.CSSProperties => ({
    background: "hsla(var(--primary-hover) / 0.18)",
    color: "hsl(var(--hover-color))",
    "box-shadow": `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`,
  }),
} as const;
