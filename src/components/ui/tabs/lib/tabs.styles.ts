/**
 * Tabs Component Styles
 * Re-exports unified styles from tabs-ui.styles.ts
 */

import type { JSX } from "solid-js";
import { tabsUIStyles } from "./tabs-ui.styles";

export interface TabsStyleOptions {
  isActive: boolean;
}

export const tabsStyles = {
  container: (): JSX.CSSProperties => tabsUIStyles.root(),
  tabButtons: (options: TabsStyleOptions): JSX.CSSProperties =>
    tabsUIStyles.list({ isActive: options.isActive }),
  tabButton: (options: TabsStyleOptions): JSX.CSSProperties =>
    tabsUIStyles.trigger({ isActive: options.isActive }),
  tabButtonHover: (options: TabsStyleOptions): JSX.CSSProperties =>
    tabsUIStyles.triggerHover({ isActive: options.isActive }),
  previewContainer: (options: TabsStyleOptions): JSX.CSSProperties => ({
    background: "var(--surface-overlay-dark, rgba(255, 255, 255, 0.03))",
    border: "1px solid hsl(var(--border))",
    padding: "var(--tabs-preview-padding)",
    "box-sizing": "border-box",
    width: "100%",
    "max-width": "100%",
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "center",
    "flex-wrap": "wrap",
    gap: "var(--tabs-preview-gap)",
  }),
};
