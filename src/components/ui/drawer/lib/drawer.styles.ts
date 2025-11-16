/**
 * Drawer Component Styles
 * Universal sliding panel styles
 */

import type { JSX } from "solid-js";
import type { DrawerPosition } from "../model/types";

export const drawerStyles = {
  overlay: (
    isOpen: boolean,
    zIndex: number,
  ): JSX.CSSProperties => {
    return {
      position: "fixed",
      top: "var(--top-nav-height, 60px)",
      left: "0",
      right: "0",
      bottom: "0",
      background: "transparent",
      "z-index": (zIndex - 1).toString(),
      opacity: isOpen ? "1" : "0",
      visibility: isOpen ? "visible" : "hidden",
      "pointer-events": isOpen ? "auto" : "none",
      transition: `opacity var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), visibility var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  },

  backdrop: (
    isOpen: boolean,
    showBackdrop: boolean,
    position: DrawerPosition,
    size: string,
  ): JSX.CSSProperties => {
    if (!showBackdrop) {
      return {
        display: "none",
      };
    }

    // Calculate backdrop coverage based on position
    // Backdrop should cover the area NOT occupied by the drawer
    // Backdrop starts below top-nav (60px) to avoid blurring the header
    const topNavHeight = "60px";
    const backdropCoverage: Record<DrawerPosition, JSX.CSSProperties> = {
      right: {
        top: topNavHeight,
        left: "0",
        bottom: "0",
        right: isOpen ? size : "100%",
      },
      left: {
        top: topNavHeight,
        left: isOpen ? size : "100%",
        bottom: "0",
        right: "0",
      },
      top: {
        top: isOpen ? size : "100%",
        left: "0",
        bottom: "0",
        right: "0",
      },
      bottom: {
        top: topNavHeight,
        left: "0",
        bottom: isOpen ? size : "100%",
        right: "0",
      },
    };

    return {
      position: "fixed",
      ...backdropCoverage[position],
      background: `transparent`,
      "backdrop-filter": "none",
      "-webkit-backdrop-filter": "none",
      "z-index": "50",
      opacity: isOpen ? "1" : "0",
      visibility: isOpen ? "visible" : "hidden",
      transition: `opacity var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), visibility var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1)`,
      "pointer-events": isOpen ? "auto" : "none",
      "will-change": "backdrop-filter",
    };
  },

  panel: (
    isOpen: boolean,
    position: DrawerPosition,
    size: string,
    zIndex: number,
  ): JSX.CSSProperties => {
    const baseStyles: JSX.CSSProperties = {
      position: "fixed",
      "z-index": zIndex.toString(),
      background: "hsl(var(--card))",
      "backdrop-filter": "none",
      "-webkit-backdrop-filter": "none",
      border: "none",
      "box-sizing": "border-box",
      overflow: "hidden",
      display: "flex",
      "flex-direction": "column",
      "will-change": "transform",
      "box-shadow": isOpen
        ? "0 4px 16px hsl(var(--shadow) / 0.1), -2px 0 8px hsl(var(--shadow) / 0.05)"
        : "none",
      transition: `transform var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), box-shadow var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1)`,
    };

    // Position-specific styles
    const topNavHeight = "60px";
    switch (position) {
      case "right":
        return {
          ...baseStyles,
          top: topNavHeight,
          right: "0",
          width: size,
          height: `calc(100vh - ${topNavHeight})`,
          transform: isOpen ? "translateX(0)" : `translateX(100%)`,
          "pointer-events": isOpen ? "auto" : "none",
        };
      case "left":
        return {
          ...baseStyles,
          top: topNavHeight,
          left: "0",
          width: size,
          height: `calc(100vh - ${topNavHeight})`,
          transform: isOpen ? "translateX(0)" : `translateX(-100%)`,
          "pointer-events": isOpen ? "auto" : "none",
        };
      case "top":
        return {
          ...baseStyles,
          top: "0",
          left: "0",
          right: "0",
          width: "100%",
          height: size,
          transform: isOpen ? "translateY(0)" : `translateY(-100%)`,
          "pointer-events": isOpen ? "auto" : "none",
        };
      case "bottom":
        return {
          ...baseStyles,
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          height: size,
          transform: isOpen ? "translateY(0)" : `translateY(100%)`,
          "pointer-events": isOpen ? "auto" : "none",
        };
    }
  },
} as const;
