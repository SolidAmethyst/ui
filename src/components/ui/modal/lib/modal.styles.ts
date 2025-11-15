/**
 * Modal Component Styles
 * Modal dialog styles with backdrop and centered positioning
 */

import type { JSX } from "solid-js";
import { getThemeFromCSS } from "../../glass/lib/theme-utils";

export const modalStyles = {
  backdrop: (
    isOpen: boolean,
    showBackdrop: boolean,
    zIndex: number,
  ): JSX.CSSProperties => {
    if (!showBackdrop) {
      return {
        display: "none",
      };
    }

    return {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.5)",
      "backdrop-filter": "blur(4px)",
      "-webkit-backdrop-filter": "blur(4px)",
      "z-index": (zIndex - 1).toString(),
      opacity: isOpen ? "1" : "0",
      visibility: isOpen ? "visible" : "hidden",
      transition:
        "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), visibility 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "pointer-events": isOpen ? "auto" : "none",
    };
  },

  container: (isOpen: boolean, zIndex: number): JSX.CSSProperties => {
    return {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      "z-index": zIndex.toString(),
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      opacity: isOpen ? "1" : "0",
      visibility: isOpen ? "visible" : "hidden",
      transition:
        "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), visibility 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "pointer-events": isOpen ? "auto" : "none",
    };
  },

  content: (isOpen: boolean, size: string): JSX.CSSProperties => {
    const isDark = getThemeFromCSS();
    const sizeMap: Record<string, JSX.CSSProperties> = {
      sm: {
        width: "90%",
        "max-width": "320px",
      },
      md: {
        width: "90%",
        "max-width": "480px",
      },
      lg: {
        width: "90%",
        "max-width": "640px",
      },
      xl: {
        width: "90%",
        "max-width": "960px",
      },
      full: {
        width: "100%",
        height: "100%",
        "max-width": "100%",
        "max-height": "100%",
      },
    };

    const sizeStyles =
      sizeMap[size] ||
      (typeof size === "string" && size !== "auto"
        ? { width: size, "max-width": size }
        : {
            width: "90%",
            "max-width": "480px",
          });

    return {
      position: "relative",
      background: "hsl(var(--card) / 0.95)",
      "backdrop-filter": "blur(12px) saturate(180%)",
      "-webkit-backdrop-filter": "blur(12px) saturate(180%)",
      border: "none",
      "border-radius": "12px",
      "box-sizing": "border-box",
      overflow: "hidden",
      "box-shadow": isOpen
        ? isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)"
        : "none",
      transform: isOpen ? "scale(1)" : "scale(0.95)",
      transition:
        "transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "pointer-events": isOpen ? "auto" : "none",
      ...sizeStyles,
    };
  },
} as const;
