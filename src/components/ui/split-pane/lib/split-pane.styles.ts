/**
 * SplitPane Component Styles
 * Styles for split pane component using CSS variables
 */

import type { JSX } from "solid-js";
import type { SplitPaneDirection } from "../model/types";

export const splitPaneStyles = {
  container: (direction: SplitPaneDirection): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": direction === "horizontal" ? "row" : "column",
    width: "100%",
    height: "100%",
    position: "relative",
    "box-sizing": "border-box",
    overflow: "hidden",
  }),

  panel: (direction: SplitPaneDirection, size: number): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      position: "relative",
      overflow: "auto",
      "box-sizing": "border-box",
    };

    if (direction === "horizontal") {
      return {
        ...base,
        width: `${size}%`,
        height: "100%",
        "flex-shrink": "0",
      };
    }

    return {
      ...base,
      width: "100%",
      height: `${size}%`,
      "flex-shrink": "0",
    };
  },

  handle: (
    direction: SplitPaneDirection,
    isDragging: boolean,
  ): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      position: "relative",
      background: "hsl(var(--border) / 0.5)",
      cursor: direction === "horizontal" ? "col-resize" : "row-resize",
      "z-index": "10",
      transition: isDragging ? "none" : "background 0.2s ease",
      "user-select": "none",
      "flex-shrink": "0",
    };

    if (direction === "horizontal") {
      return {
        ...base,
        width: "var(--split-pane-handle-size, 4px)",
        height: "100%",
        "min-width": "var(--split-pane-handle-size, 4px)",
        "max-width": "var(--split-pane-handle-size, 4px)",
      };
    }

    return {
      ...base,
      width: "100%",
      height: "var(--split-pane-handle-size, 4px)",
      "min-height": "var(--split-pane-handle-size, 4px)",
      "max-height": "var(--split-pane-handle-size, 4px)",
    };
  },

  handleHover: (direction: SplitPaneDirection): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      background: "hsl(var(--border))",
    };

    if (direction === "horizontal") {
      return {
        ...base,
        cursor: "col-resize",
      };
    }

    return {
      ...base,
      cursor: "row-resize",
    };
  },

  handleDragging: (direction: SplitPaneDirection): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      background: "hsl(var(--primary))",
      opacity: "0.8",
    };

    if (direction === "horizontal") {
      return {
        ...base,
        cursor: "col-resize",
      };
    }

    return {
      ...base,
      cursor: "row-resize",
    };
  },
} as const;
