/**
 * Typography Component Styles
 */

import type { JSX } from "solid-js";
import type { TypographyVariant } from "../model/types";

export interface TypographyStyleOptions {
  variant: TypographyVariant;
}

const getDefaultElement = (
  variant: TypographyVariant,
): keyof JSX.IntrinsicElements => {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "body":
    case "body-large":
      return "p";
    case "small":
    case "caption":
    case "label":
      return "span";
    default:
      return "p";
  }
};

export const typographyStyles = {
  getDefaultElement,
  styles: (options: TypographyStyleOptions): JSX.CSSProperties => {
    const { variant } = options;
    const baseColor = "hsl(var(--foreground))";
    const mutedColor = "hsl(var(--muted-foreground))";

    switch (variant) {
      case "h1":
        return {
          "font-size": "var(--typography-h1-font-size)",
          "font-weight": "700",
          "line-height": "1.2",
          "margin-top": "0",
          "margin-bottom": "1rem",
          color: baseColor,
          "letter-spacing": "-0.02em",
        };
      case "h2":
        return {
          "font-size": "var(--typography-h2-font-size)",
          "font-weight": "700",
          "line-height": "1.3",
          "margin-top": "0",
          "margin-bottom": "0.875rem",
          color: baseColor,
          "letter-spacing": "-0.01em",
        };
      case "h3":
        return {
          "font-size": "var(--typography-h3-font-size)",
          "font-weight": "600",
          "line-height": "1.4",
          "margin-top": "0",
          "margin-bottom": "0.75rem",
          color: baseColor,
        };
      case "h4":
        return {
          "font-size": "var(--typography-h4-font-size)",
          "font-weight": "600",
          "line-height": "1.4",
          "margin-top": "0",
          "margin-bottom": "0.625rem",
          color: baseColor,
        };
      case "h5":
        return {
          "font-size": "var(--typography-h5-font-size)",
          "font-weight": "600",
          "line-height": "1.5",
          "margin-top": "0",
          "margin-bottom": "0.5rem",
          color: baseColor,
        };
      case "h6":
        return {
          "font-size": "var(--typography-h6-font-size)",
          "font-weight": "600",
          "line-height": "1.5",
          "margin-top": "0",
          "margin-bottom": "0.5rem",
          color: baseColor,
        };
      case "body-large":
        return {
          "font-size": "1.125rem",
          "font-weight": "400",
          "line-height": "1.6",
          "margin-top": "0",
          "margin-bottom": "1rem",
          color: baseColor,
        };
      case "body":
        return {
          "font-size": "var(--typography-body-font-size)",
          "font-weight": "400",
          "line-height": "1.6",
          "margin-top": "0",
          "margin-bottom": "1rem",
          color: baseColor,
        };
      case "small":
        return {
          "font-size": "var(--typography-small-font-size)",
          "font-weight": "400",
          "line-height": "1.5",
          "margin-top": "0",
          "margin-bottom": "0.5rem",
          color: mutedColor,
        };
      case "caption":
        return {
          "font-size": "0.75rem",
          "font-weight": "400",
          "line-height": "1.4",
          "margin-top": "0",
          "margin-bottom": "0.25rem",
          color: mutedColor,
        };
      case "label":
        return {
          "font-size": "0.875rem",
          "font-weight": "500",
          "line-height": "1.5",
          "margin-top": "0",
          "margin-bottom": "0.25rem",
          color: baseColor,
        };
      default:
        return {
          "font-size": "1rem",
          "font-weight": "400",
          "line-height": "1.6",
          margin: "0",
          color: baseColor,
        };
    }
  },
} as const;
