/**
 * Settings Component Styles
 */

import type { JSX } from "solid-js";

export const settingsStyles = {
  header: (): JSX.CSSProperties => ({
    padding: "20px",
    "border-bottom": `1px solid hsl(var(--border))`,
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
  }),

  title: (): JSX.CSSProperties => ({
    "font-size": "18px",
    "font-weight": "600",
    color: `hsl(var(--foreground))`,
    margin: "0",
  }),

  closeButton: (): JSX.CSSProperties => ({
    background: "transparent",
    border: "none",
    color: `hsl(var(--foreground))`,
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "4px",
    transition: "background-color 0.2s ease",
  }),
} as const;
