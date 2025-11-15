/**
 * FilterBar Component Styles
 * Styles for filter bar component using only CSS variables
 */

import type { JSX } from "solid-js";

export const filterBarStyles = {
  container: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-wrap": "nowrap",
    gap: "var(--spacing-md)",
    "align-items": "flex-start",
    "justify-content": "space-between",
    padding: `var(--spacing-md) var(--spacing-lg)`,
    background: "hsla(var(--background) / 0.5)",
    "backdrop-filter": "blur(8px)",
    "-webkit-backdrop-filter": "blur(8px)",
    border: `1px solid hsl(var(--border))`,
    "border-radius": "var(--radius-lg)",
    "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.1)",
  }),

  filterItem: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    gap: "var(--spacing-xs)",
    "min-width": "120px",
    "flex-shrink": "0",
  }),

  filterLabel: (): JSX.CSSProperties => ({
    "font-size": "var(--font-size-sm)",
    "font-weight": "500",
    color: "hsl(var(--muted-foreground))",
    "line-height": "1.2",
  }),

  checkboxGroup: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    gap: "var(--spacing-xs)",
  }),

  dateInput: (): JSX.CSSProperties => ({
    padding: `var(--spacing-xs) var(--spacing-sm)`,
    "font-size": "var(--font-size-base)",
    "border-radius": "var(--radius-md)",
    border: `1px solid hsl(var(--border))`,
    background: "hsl(var(--secondary))",
    color: "hsl(var(--foreground))",
    transition: "all var(--transition-base)",
    outline: "none",
    "box-sizing": "border-box",
    width: "100%",
  }),

  clearButton: (): JSX.CSSProperties => ({
    padding: "0",
    width: "24px",
    height: "24px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "var(--radius-sm)",
    border: "none",
    background: "transparent",
    color: "hsl(var(--muted-foreground))",
    cursor: "pointer",
    transition: "all var(--transition-base)",
    outline: "none",
    "box-sizing": "border-box",
    "align-self": "flex-start",
    "margin-top": "0",
    "flex-shrink": "0",
  }),

  clearButtonHover: (): JSX.CSSProperties => ({
    background: "hsl(var(--muted) / 0.3)",
    color: "hsl(var(--foreground))",
  }),
} as const;
