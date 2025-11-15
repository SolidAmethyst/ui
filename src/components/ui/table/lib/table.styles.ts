/**
 * Table Component Styles
 * Styles for table component
 */

import type { JSX } from "solid-js";

export const tableStyles = {
  container: (): JSX.CSSProperties => ({
    width: "100%",
    overflow: "auto",
    "border-radius": "8px",
    border: "1px solid hsl(var(--border))",
  }),

  table: (): JSX.CSSProperties => ({
    width: "100%",
    "border-collapse": "collapse",
    background: "hsl(var(--card) / 0.95)",
    "font-size": "14px",
  }),

  thead: (): JSX.CSSProperties => ({
    background: "var(--surface-overlay-dark, rgba(255, 255, 255, 0.05))",
    "border-bottom": "1px solid hsl(var(--border))",
  }),

  th: (
    sortable: boolean,
    align: "left" | "center" | "right",
  ): JSX.CSSProperties => ({
    padding: "12px 16px",
    "text-align": align,
    "font-weight": "600",
    "font-size": "13px",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    color: "hsl(var(--foreground) / 0.8)",
    cursor: sortable ? "pointer" : "default",
    "user-select": "none",
    transition: "background 0.2s ease",
    position: "relative",
  }),

  thHover: (): JSX.CSSProperties => ({
    background: "var(--surface-overlay-dark, rgba(255, 255, 255, 0.08))",
  }),

  sortIcon: (direction: "asc" | "desc" | null): JSX.CSSProperties => ({
    "font-size": "16px",
    color: direction
      ? "hsl(var(--primary))"
      : "hsl(var(--muted-foreground) / 0.3)",
    "margin-left": "8px",
    "vertical-align": "middle",
    display: "inline-block",
    transform: direction === "desc" ? "rotate(180deg)" : "none",
    transition: "transform 0.2s ease, color 0.2s ease",
  }),

  tbody: (): JSX.CSSProperties => ({}),

  tr: (isEven: boolean): JSX.CSSProperties => ({
    "border-bottom": "1px solid hsl(var(--border) / 0.5)",
    background: isEven
      ? "var(--surface-overlay-dark, rgba(255, 255, 255, 0.02))"
      : "transparent",
    transition: "background 0.2s ease",
  }),

  trHover: (): JSX.CSSProperties => ({
    background: "var(--surface-overlay-dark, rgba(255, 255, 255, 0.05))",
  }),

  td: (align: "left" | "center" | "right"): JSX.CSSProperties => ({
    padding: "12px 16px",
    "text-align": align,
    color: "hsl(var(--foreground))",
    "line-height": "1.5",
  }),

  pagination: (): JSX.CSSProperties => ({
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    padding: "16px",
    "border-top": "1px solid hsl(var(--border))",
    background: "var(--surface-overlay-dark, rgba(255, 255, 255, 0.02))",
  }),

  paginationInfo: (): JSX.CSSProperties => ({
    "font-size": "14px",
    color: "hsl(var(--muted-foreground))",
  }),

  paginationControls: (): JSX.CSSProperties => ({
    display: "flex",
    "align-items": "center",
    gap: "8px",
  }),

  paginationButton: (disabled: boolean): JSX.CSSProperties => ({
    padding: "6px 12px",
    "font-size": "14px",
    border: "1px solid hsl(var(--border))",
    background: disabled
      ? "transparent"
      : "var(--surface-overlay-dark, rgba(255, 255, 255, 0.05))",
    color: disabled
      ? "hsl(var(--muted-foreground) / 0.3)"
      : "hsl(var(--foreground))",
    "border-radius": "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.2s ease, border-color 0.2s ease",
    opacity: disabled ? 0.5 : 1,
  }),

  paginationButtonHover: (disabled: boolean): JSX.CSSProperties => ({
    background: disabled
      ? "transparent"
      : "var(--surface-overlay-dark, rgba(255, 255, 255, 0.1))",
    "border-color": disabled ? undefined : "hsl(var(--border) / 0.8)",
  }),
} as const;
