/**
 * Shared styles for documentation pages
 * Centralized styles to avoid duplication and improve maintainability
 */

import type { JSX } from "solid-js";

export const docsStyles = {
  article: (): JSX.CSSProperties => ({
    width: "100%",
    "max-width": "700px",
    "box-sizing": "border-box",
    margin: "0 auto",
    padding: "8px 0 24px 0",
    color: "hsl(var(--foreground))",
    overflow: "hidden",
    "overflow-x": "hidden",
  }),

  title: (): JSX.CSSProperties => ({
    "font-size": "15px",
    "font-weight": "700",
    "margin-top": "0",
    "margin-bottom": "12px",
    "line-height": "1",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    color: "hsl(var(--foreground))",
  }),

  description: (): JSX.CSSProperties => ({
    "font-size": "0.85rem",
    color: "hsl(var(--muted-foreground))",
    "margin-bottom": "24px",
    "line-height": "1.6",
  }),

  paragraph: (): JSX.CSSProperties => ({
    "font-size": "0.85rem",
    "line-height": "1.7",
    color: "hsl(var(--foreground) / 0.9)",
  }),

  section: (): JSX.CSSProperties => ({
    "margin-bottom": "32px",
  }),

  sectionTitle: (): JSX.CSSProperties => ({
    "font-size": "11px",
    "font-weight": "600",
    "margin-bottom": "12px",
    "line-height": "1.3",
    color: "hsl(var(--foreground))",
  }),

  subsectionTitle: (): JSX.CSSProperties => ({
    "font-size": "10px",
    "font-weight": "600",
    "margin-bottom": "12px",
    "line-height": "1.3",
    color: "hsl(var(--foreground))",
  }),

  label: (): JSX.CSSProperties => ({
    display: "flex",
    "align-items": "center",
    gap: "8px",
    color: "hsl(var(--foreground))",
    "font-size": "0.875rem",
  }),

  controlsContainer: (): JSX.CSSProperties => ({
    display: "flex",
    gap: "12px",
    "margin-bottom": "16px",
    "flex-wrap": "wrap",
    "align-items": "center",
  }),

  card: (): JSX.CSSProperties => ({
    padding: "12px 16px",
    "border-radius": "6px",
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    "box-sizing": "border-box",
  }),

  cardTitle: (): JSX.CSSProperties => ({
    "font-size": "0.75rem",
    "font-weight": "500",
    margin: "0 0 4px 0",
    color: "hsl(var(--muted-foreground))",
  }),

  cardContent: (): JSX.CSSProperties => ({
    "font-size": "1rem",
    "font-weight": "600",
    color: "hsl(var(--foreground))",
  }),

  input: (): JSX.CSSProperties => ({
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--input))",
    color: "hsl(var(--foreground))",
  }),

  inputFocus: (): JSX.CSSProperties => ({
    "border-color": "hsl(var(--accent) / 0.5)",
  }),

  previewContainer: (): JSX.CSSProperties => ({
    width: "100%",
    "box-sizing": "border-box",
    border: "1px solid hsl(var(--border))",
    "border-radius": "8px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    padding: "24px",
    "min-height": "60px",
    background: "hsl(var(--muted))",
  }),
} as const;
