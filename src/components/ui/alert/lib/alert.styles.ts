/**
 * Alert Component Styles
 * Alert styles with variants
 */

import type { JSX } from "solid-js";
import type { AlertVariant } from "../model/types";
import { getThemeFromCSS } from "../../glass/lib/theme-utils";

export const alertStyles = {
  container: (variant: AlertVariant): JSX.CSSProperties => {
    const isDark = getThemeFromCSS();
    const variantColors: Record<
      AlertVariant,
      { bg: string; border: string; icon: string }
    > = {
      success: {
        bg: isDark ? "hsla(142, 71%, 45%, 0.15)" : "hsla(142, 71%, 45%, 0.1)",
        border: "hsla(142, 71%, 45%, 0.5)",
        icon: "hsl(142, 71%, 45%)",
      },
      error: {
        bg: isDark ? "hsla(0, 84%, 60%, 0.15)" : "hsla(0, 84%, 60%, 0.1)",
        border: "hsla(0, 84%, 60%, 0.5)",
        icon: "hsl(0, 84%, 60%)",
      },
      warning: {
        bg: isDark ? "hsla(38, 92%, 50%, 0.15)" : "hsla(38, 92%, 50%, 0.1)",
        border: "hsla(38, 92%, 50%, 0.5)",
        icon: "hsl(38, 92%, 50%)",
      },
      info: {
        bg: isDark ? "hsla(217, 91%, 60%, 0.15)" : "hsla(217, 91%, 60%, 0.1)",
        border: "hsla(217, 91%, 60%, 0.5)",
        icon: "hsl(217, 91%, 60%)",
      },
    };

    // Ensure variant is valid, fallback to 'info' if not
    const validVariant: AlertVariant =
      variant && variantColors[variant] ? variant : "info";
    const colors = variantColors[validVariant];

    return {
      position: "relative",
      display: "flex",
      "align-items": "flex-start",
      gap: "12px",
      padding: "16px",
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      "border-left": `4px solid ${colors.icon}`,
      "border-radius": "8px",
      "box-shadow": isDark
        ? "0 2px 8px hsl(var(--shadow) / 10%)"
        : "0 2px 8px hsl(var(--shadow) / 5%)",
    };
  },

  icon: (variant: AlertVariant): JSX.CSSProperties => {
    const variantColors: Record<AlertVariant, string> = {
      success: "hsl(142, 71%, 45%)",
      error: "hsl(0, 84%, 60%)",
      warning: "hsl(38, 92%, 50%)",
      info: "hsl(217, 91%, 60%)",
    };

    // Ensure variant is valid, fallback to 'info' if not
    const validVariant: AlertVariant =
      variant && variantColors[variant] ? variant : "info";

    return {
      "font-size": "20px",
      color: variantColors[validVariant],
      "flex-shrink": 0,
    };
  },

  content: (): JSX.CSSProperties => ({
    flex: "1",
    "min-width": "0",
  }),

  title: (): JSX.CSSProperties => ({
    "font-size": "14px",
    "font-weight": "600",
    color: "hsl(var(--foreground))",
    "margin-bottom": "4px",
    "line-height": "1.4",
  }),

  description: (): JSX.CSSProperties => ({
    "font-size": "13px",
    color: "hsl(var(--muted-foreground))",
    "line-height": "1.4",
  }),

  closeButton: (): JSX.CSSProperties => ({
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "20px",
    height: "20px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    border: "none",
    background: "transparent",
    color: "hsl(var(--muted-foreground) / 0.5)",
    cursor: "pointer",
    "font-size": "16px",
    "border-radius": "4px",
    transition: "color 0.2s ease, background 0.2s ease",
    "flex-shrink": 0,
  }),
} as const;
