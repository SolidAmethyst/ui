/**
 * Timeline Component Styles
 * Styles for timeline component using CSS variables
 */

import type { JSX } from "solid-js";
import type { TimelineEvent } from "../model/types";

export const timelineStyles = {
  container: (orientation: "vertical" | "horizontal"): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      display: "flex",
      "box-sizing": "border-box",
      width: "100%",
    };

    if (orientation === "horizontal") {
      return {
        ...base,
        "flex-direction": "row",
        "align-items": "flex-start",
        gap: "var(--timeline-horizontal-gap, 24px)",
        overflow: "auto",
      };
    }

    return {
      ...base,
      "flex-direction": "column",
      gap: "var(--timeline-vertical-gap, 24px)",
      padding: "var(--timeline-padding, 16px 0)",
    };
  },

  event: (
    orientation: "vertical" | "horizontal",
    showLine: boolean,
  ): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      position: "relative",
      display: "flex",
      "box-sizing": "border-box",
    };

    if (orientation === "horizontal") {
      return {
        ...base,
        "flex-direction": "column",
        "align-items": "center",
        "min-width": "var(--timeline-event-min-width, 200px)",
        "flex-shrink": "0",
      };
    }

    return {
      ...base,
      "flex-direction": "row",
      "align-items": "flex-start",
      "padding-left": showLine
        ? "var(--timeline-event-padding-left, 40px)"
        : "0",
    };
  },

  line: (
    orientation: "vertical" | "horizontal",
    isLast: boolean,
  ): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      position: "absolute",
      background: "hsl(var(--border) / 0.5)",
      "z-index": "0",
    };

    if (orientation === "horizontal") {
      return {
        ...base,
        top: "var(--timeline-icon-size, 24px)",
        left: "50%",
        right: isLast
          ? "50%"
          : "calc(-50% - var(--timeline-horizontal-gap, 24px))",
        height: "2px",
        transform: "translateY(-50%)",
      };
    }

    return {
      ...base,
      left: "calc(var(--timeline-icon-size, 24px) / 2)",
      top: "var(--timeline-icon-size, 24px)",
      bottom: isLast ? "0" : "calc(-1 * var(--timeline-vertical-gap, 24px))",
      width: "2px",
      transform: "translateX(-50%)",
    };
  },

  iconContainer: (
    variant: TimelineEvent["variant"],
    disabled: boolean,
  ): JSX.CSSProperties => {
    const variantColors: Record<
      NonNullable<TimelineEvent["variant"]>,
      string
    > = {
      default: "hsl(var(--primary))",
      primary: "hsl(var(--primary))",
      success: "hsl(var(--success))",
      error: "hsl(var(--destructive))",
      warning: "hsl(var(--warning))",
      info: "hsl(var(--info))",
    };

    const color = variantColors[variant || "default"];

    return {
      position: "relative",
      "z-index": "1",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      width: "var(--timeline-icon-size, 24px)",
      height: "var(--timeline-icon-size, 24px)",
      "min-width": "var(--timeline-icon-size, 24px)",
      "min-height": "var(--timeline-icon-size, 24px)",
      "border-radius": "50%",
      background: disabled ? "hsl(var(--muted) / 0.5)" : color,
      color: disabled
        ? "hsl(var(--muted-foreground) / 0.3)"
        : "hsl(var(--foreground))",
      "font-size": "var(--timeline-icon-font-size, 14px)",
      "flex-shrink": "0",
      transition: "all 0.2s ease",
    };
  },

  content: (orientation: "vertical" | "horizontal"): JSX.CSSProperties => {
    const base: JSX.CSSProperties = {
      display: "flex",
      "flex-direction": "column",
      "flex-grow": "1",
      "min-width": "0",
    };

    if (orientation === "horizontal") {
      return {
        ...base,
        "align-items": "center",
        "text-align": "center",
        "margin-top": "var(--timeline-content-margin-top, 12px)",
      };
    }

    return {
      ...base,
      "margin-left": "var(--timeline-content-margin-left, 16px)",
    };
  },

  title: (disabled: boolean): JSX.CSSProperties => ({
    "font-size": "var(--timeline-title-font-size, 15px)",
    "font-weight": "600",
    "line-height": "1.4",
    color: disabled
      ? "hsl(var(--muted-foreground) / 0.4)"
      : "hsl(var(--foreground))",
    margin: "0",
    "word-wrap": "break-word",
  }),

  description: (disabled: boolean): JSX.CSSProperties => ({
    "font-size": "var(--timeline-description-font-size, 13px)",
    "line-height": "1.5",
    color: disabled
      ? "hsl(var(--muted-foreground) / 0.3)"
      : "hsl(var(--muted-foreground))",
    margin: "var(--timeline-description-margin, 4px 0 0 0)",
    "word-wrap": "break-word",
  }),

  date: (disabled: boolean): JSX.CSSProperties => ({
    "font-size": "var(--timeline-date-font-size, 12px)",
    "line-height": "1.4",
    color: disabled
      ? "hsl(var(--muted-foreground) / 0.3)"
      : "hsl(var(--muted-foreground) / 0.7)",
    margin: "var(--timeline-date-margin, 4px 0 0 0)",
    "word-wrap": "break-word",
  }),
} as const;
