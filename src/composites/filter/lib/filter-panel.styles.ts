/**
 * FilterPanel Component Styles
 * Styles for filter panel component in modal format using only CSS variables
 */

import type { JSX } from "solid-js";

export const filterPanelStyles = {
  container: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background: "transparent",
  }),

  header: (): JSX.CSSProperties => ({
    padding: `var(--spacing-sm) var(--spacing-md)`,
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "flex-shrink": "0",
  }),

  title: (): JSX.CSSProperties => ({
    margin: "0",
  }),

  closeButton: (): JSX.CSSProperties => ({
    background: "transparent",
    border: "none",
    color: "hsl(var(--muted-foreground))",
    cursor: "pointer",
    padding: "var(--spacing-xs)",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "50%",
    transition: "all var(--transition-base)",
    width: "var(--button-small-size)",
    height: "var(--button-small-size)",
    "min-width": "var(--button-small-size)",
    "min-height": "var(--button-small-size)",
  }),

  content: (): JSX.CSSProperties => ({
    flex: "1",
    overflow: "visible",
    display: "flex",
    "flex-direction": "column",
    padding: "0 0 var(--spacing-md) 0",
  }),

  section: (): JSX.CSSProperties => ({
    padding: `var(--spacing-sm) var(--spacing-md) var(--spacing-md) var(--spacing-md)`,
    display: "flex",
    "flex-direction": "column",
    gap: "var(--spacing-xs)",
  }),

  sectionTitle: (): JSX.CSSProperties => ({
    margin: "0 0 2px 0",
  }),

  sectionHeader: (): JSX.CSSProperties => ({
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    width: "100%",
    margin: "0 0 2px 0",
  }),

  visibilityHeader: (): JSX.CSSProperties => ({
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    width: "100%",
    margin: "0 0 var(--spacing-xs) 0",
  }),

  selectedCount: (): JSX.CSSProperties => ({
    margin: "0",
    color: "hsl(var(--muted-foreground))",
  }),

  checkboxListContainer: (): JSX.CSSProperties => ({
    background: "hsl(var(--secondary))",
    border: `1px solid hsl(var(--muted))`,
    "border-radius": "0",
    padding: `0`,
    "padding-bottom": `calc(var(--spacing-md) / 2)`,
    "box-sizing": "border-box",
    display: "flex",
    "flex-direction": "column",
    overflow: "hidden",
  }),

  checkboxListScrollable: (): JSX.CSSProperties => ({
    "max-height": "300px",
    height: "300px",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    "padding-right": "4px",
  }),

  selectAllContainer: (): JSX.CSSProperties => ({
    "background-color": "hsla(var(--primary-hover) / 0.1)",
    padding: `calc(var(--spacing-xs) / 2) calc(var(--spacing-sm) / 2)`,
    "padding-left": `calc(var(--spacing-md) / 2)`,
    "padding-right": `calc(var(--spacing-sm) / 2)`,
    "border-radius": "0",
    margin: "0",
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    cursor: "pointer",
    "user-select": "none",
    color: "hsl(var(--foreground))",
  }),

  checkboxItem: (): JSX.CSSProperties => ({
    padding: `calc(var(--spacing-xs) / 2) calc(var(--spacing-sm) / 2)`,
    "padding-left": `calc(var(--spacing-md) / 2)`,
    "border-radius": "var(--command-border-radius)",
    transition: "background-color 0.15s ease, color 0.15s ease",
    cursor: "pointer",
    "user-select": "none",
    "background-color": "transparent",
    color: "hsl(var(--foreground))",
    display: "flex",
    "align-items": "center",
  }),

  checkboxItemHover: (): JSX.CSSProperties => ({
    "background-color": "hsla(var(--primary-hover) / 0.1)",
    color: "hsl(var(--foreground))",
  }),

  checkboxItemSelected: (): JSX.CSSProperties => ({
    "background-color": "transparent",
    color: "hsl(var(--foreground))",
    "text-shadow": "none",
    "box-shadow": "none",
  }),

  checkboxItemSelectedHover: (): JSX.CSSProperties => ({
    "background-color": "hsla(var(--primary-hover) / 0.18)",
    color: "hsl(var(--foreground))",
    "text-shadow": "none",
    "box-shadow": "none",
  }),

  checkboxList: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    gap: "2px",
    padding: "0",
    "padding-top": `calc(var(--spacing-xs) / 2)`,
  }),

  sizeInputs: (): JSX.CSSProperties => ({
    display: "flex",
    gap: "var(--spacing-sm)",
    "align-items": "flex-start",
  }),

  sizeInputGroup: (): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    gap: "var(--spacing-xs)",
    flex: "1",
  }),

  sizeLabel: (): JSX.CSSProperties => ({
    "font-size": "var(--font-size-sm)",
    "font-weight": "400",
    color: "hsl(var(--muted-foreground))",
    "line-height": "1.5",
  }),

  sizeInput: (): JSX.CSSProperties => ({
    width: "100%",
    "box-sizing": "border-box",
    background: "hsl(var(--secondary))",
    border: "1px solid hsl(var(--border))",
    color: "hsl(var(--foreground))",
  }),

  footer: (): JSX.CSSProperties => ({
    padding: `var(--spacing-xs) var(--spacing-md)`,
    display: "flex",
    "justify-content": "flex-end",
    "flex-shrink": "0",
  }),

  resetButton: (): JSX.CSSProperties => ({
    background: "transparent",
    border: "none",
    outline: "none",
    "box-shadow": "none",
    "text-shadow": "none",
    filter: "none",
    color: "hsl(var(--muted-foreground))",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "50%",
    transition: "all var(--transition-base)",
    width: "20px",
    height: "20px",
    "min-width": "20px",
    "min-height": "20px",
  }),

  resetButtonHover: (): JSX.CSSProperties => ({
    background: "transparent",
    color: "hsl(var(--primary))",
  }),
} as const;
