/**
 * Sidebar Component Styles
 */

import type { JSX } from "solid-js";

export const sidebarStyles = {
  container: (isOpen: boolean, isOverlay: boolean): JSX.CSSProperties => {
    return {
      ...(isOverlay
        ? {
            position: "absolute" as const,
            top: "0",
            left: isOpen ? "0" : "-250px",
            width: "var(--sidebar-width)",
            height: "100%",
            "z-index": "1000",
            transition: "left 200ms linear",
          }
        : {
            width: isOpen ? "var(--sidebar-width)" : "0",
            height: "100%",
            overflow: "hidden",
            transition: "width 200ms linear",
            position: "relative" as const,
            "z-index": "100",
          }),
      background: "hsl(var(--sidebar-background))",
      "backdrop-filter": "blur(20px) saturate(180%)",
      "-webkit-backdrop-filter": "blur(20px) saturate(180%)",
      border: "none",
      "box-sizing": "border-box" as const,
      overflow: isOverlay ? ("auto" as const) : ("hidden" as const),
    };
  },
  innerContainer: (): JSX.CSSProperties => ({
    width: "var(--sidebar-width)",
    height: "100%",
    padding: "var(--sidebar-padding)",
    "box-sizing": "border-box",
    overflow: "hidden",
    display: "flex",
    "flex-direction": "column",
  }),
  list: (): JSX.CSSProperties => ({
    "list-style": "none",
    margin: "0",
    padding: "0",
    display: "flex",
    "flex-direction": "column",
    gap: "var(--sidebar-list-gap)",
  }),
  separator: (): JSX.CSSProperties => ({
    height: "var(--sidebar-separator-height)",
    "background-color": "hsl(var(--border))",
    margin: "var(--sidebar-separator-margin)",
  }),
  button: (disabled: boolean): JSX.CSSProperties => ({
    width: "100%",
    display: "flex",
    "align-items": "center",
    gap: "var(--sidebar-button-gap)",
    padding: "var(--sidebar-button-padding)",
    "border-radius": "0",
    cursor: disabled ? "not-allowed" : "pointer",
    "font-size": "var(--sidebar-button-font-size)",
    color: disabled
      ? "hsla(var(--foreground) / 0.4)"
      : "hsl(var(--foreground))",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    "background-color": "transparent",
    border: "none",
    "text-align": "left",
    "box-sizing": "border-box",
    opacity: disabled ? 0.5 : 1,
  }),
  icon: (): JSX.CSSProperties => ({
    "font-size": "var(--sidebar-icon-font-size)",
    width: "var(--sidebar-icon-size)",
    height: "var(--sidebar-icon-size)",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  }),
  label: (): JSX.CSSProperties => ({
    flex: "1",
  }),
} as const;
