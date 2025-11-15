/**
 * CheckboxTree Component Styles
 * Styles for hierarchical checkbox tree
 */

import type { JSX } from "solid-js";

export const checkboxTreeStyles = {
  container: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    gap: "4px",
    width: "auto",
  }),

  node: (level: number): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    gap: "2px",
    "padding-left": `${level * 20}px`,
  }),

  nodeContent: (): JSX.CSSProperties => ({
    display: "flex",
    "align-items": "center",
    gap: "8px",
    padding: "4px 8px",
    "border-radius": "4px",
    transition: "background 0.2s ease",
    cursor: "pointer",
    "user-select": "none",
  }),

  nodeContentHover: (): JSX.CSSProperties => ({
    background: "var(--surface-overlay-dark, rgba(255, 255, 255, 0.05))",
  }),

  label: (disabled: boolean): JSX.CSSProperties => ({
    "font-size": "14px",
    color: disabled
      ? "hsl(var(--muted-foreground) / 0.3)"
      : "hsl(var(--foreground))",
    "line-height": "1.5",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
} as const;
