/**
 * Command Component Styles
 * Based on cmdk-solid with custom theming
 */

import type { JSX } from "solid-js";
import { getThemeFromCSS } from "../../glass/lib/theme-utils";

export interface CommandStyleOptions {
  // Removed isDark - now using getThemeFromCSS()
}

export const commandStyles = {
  root: (options?: CommandStyleOptions): JSX.CSSProperties => {
    const isDark = getThemeFromCSS();
    return {
      position: "relative",
      width: "100%",
      display: "flex",
      "flex-direction": "column",
      overflow: "hidden",
      "background-color": "hsl(var(--background))",
      "border-radius": "8px",
      "box-shadow": isDark
        ? "0 8px 32px rgba(0, 0, 0, 0.6)"
        : "0 8px 32px rgba(0, 0, 0, 0.15)",
      border: `1px solid hsl(var(--border))`,
    };
  },

  dialog: (options?: CommandStyleOptions): JSX.CSSProperties => ({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "640px",
    "max-width": "90vw",
    "max-height": "85vh",
    "z-index": 9999,
    ...commandStyles.root(options),
  }),

  input: (options?: CommandStyleOptions): JSX.CSSProperties => ({
    width: "100%",
    padding: "var(--command-input-padding)",
    "font-size": "var(--command-input-font-size)",
    "line-height": "var(--command-input-line-height)",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "hsl(var(--foreground))",
    "border-bottom": `1px solid hsl(var(--border))`,
  }),

  list: (): JSX.CSSProperties => ({
    flex: "1",
    overflow: "auto",
    padding: "0",
    "max-height": "400px",
  }),

  item: (
    options?: CommandStyleOptions & { selected?: boolean; disabled?: boolean },
  ): JSX.CSSProperties => ({
    position: "relative",
    display: "flex",
    "align-items": "center",
    padding: "var(--command-item-padding)",
    height: "var(--command-item-height)",
    "font-size": "var(--command-item-font-size)",
    "line-height": "var(--command-item-line-height)",
    "border-radius": "var(--command-border-radius)",
    cursor: options?.disabled ? "not-allowed" : "pointer",
    "user-select": "none",
    "background-color": options?.selected
      ? "hsla(var(--primary) / 0.1)"
      : "transparent",
    color: options?.disabled
      ? "hsla(var(--foreground) / 0.3)"
      : options?.selected
        ? "hsl(var(--primary))"
        : "hsl(var(--foreground))",
    transition:
      "background-color 0.15s ease, color 0.15s ease, text-shadow 0.15s ease",
  }),
  itemHover: (
    options?: CommandStyleOptions & { selected?: boolean; disabled?: boolean },
  ): JSX.CSSProperties => ({
    "background-color": options?.selected
      ? "hsla(var(--primary-hover) / 0.18)"
      : "hsla(var(--primary-hover) / 0.18)",
    color: options?.selected
      ? "hsl(var(--hover-color))"
      : "hsl(var(--foreground))",
    "text-shadow": options?.selected
      ? `0 0 var(--hover-text-shadow-blur) hsla(var(--primary-hover) / var(--hover-text-shadow-opacity))`
      : "none",
    "box-shadow": options?.selected
      ? `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`
      : "none",
  }),

  group: (): JSX.CSSProperties => ({
    padding: "0",
  }),

  groupHeading: (options?: CommandStyleOptions): JSX.CSSProperties => ({
    "font-size": "var(--command-group-heading-font-size)",
    "font-weight": "var(--command-group-heading-font-weight)",
    "text-transform": "none",
    "letter-spacing": "0",
    "line-height": "var(--command-group-heading-line-height)",
    padding: "var(--command-group-heading-padding)",
    "margin-top": "var(--command-group-heading-margin-top)",
    "margin-bottom": "var(--command-group-heading-margin-bottom)",
    color: "hsla(var(--muted-foreground) / 0.8)",
    "user-select": "none",
  }),

  separator: (options?: CommandStyleOptions): JSX.CSSProperties => ({
    height: "var(--command-separator-height)",
    "background-color": "hsl(var(--border))",
    margin: "var(--command-separator-margin)",
  }),

  empty: (options?: CommandStyleOptions): JSX.CSSProperties => ({
    padding: "var(--command-empty-padding)",
    "text-align": "center",
    "font-size": "var(--command-empty-font-size)",
    color: "hsla(var(--muted-foreground) / 0.7)",
  }),

  loading: (options?: CommandStyleOptions): JSX.CSSProperties => ({
    padding: "var(--command-empty-padding)",
    "text-align": "center",
    "font-size": "var(--command-empty-font-size)",
    color: "hsla(var(--muted-foreground) / 0.7)",
  }),
};
