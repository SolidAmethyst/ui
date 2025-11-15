/**
 * NumberInput Component Styles
 */

import type { JSX } from "solid-js";

export const numberInputStyles = {
  wrapper: {
    position: "relative",
    display: "inline-flex",
    "align-items": "center",
  } as JSX.CSSProperties,

  input: (themeAware?: boolean): JSX.CSSProperties => ({
    width: "var(--number-input-width)",
    padding: "var(--number-input-padding)",
    "border-radius": "var(--number-input-border-radius)",
    "box-sizing": "border-box",
    "font-size": "var(--number-input-font-size)",
    outline: "none",
    transition: "border-color 150ms ease",
    // Theme-aware styles using CSS variables
    ...(themeAware
      ? {
          border: "1px solid var(--number-input-border, hsl(var(--border)))",
          background: "var(--number-input-bg, hsl(var(--input)))",
          color: "var(--number-input-text, hsl(var(--foreground)))",
        }
      : {
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--input))",
          color: "hsl(var(--foreground))",
        }),
  }),

  arrowsContainer: {
    position: "absolute",
    right: "var(--number-input-arrow-right)",
    display: "flex",
    "flex-direction": "column",
    gap: "var(--number-input-arrow-gap)",
    height: "100%",
    "justify-content": "center",
    "pointer-events": "none",
  } as JSX.CSSProperties,

  arrowButton: {
    width: "var(--number-input-arrow-size)",
    height: "var(--number-input-arrow-height)",
    padding: "0",
    "min-width": "var(--number-input-arrow-size)",
    "min-height": "var(--number-input-arrow-height)",
    "pointer-events": "auto",
  } as JSX.CSSProperties,
};
