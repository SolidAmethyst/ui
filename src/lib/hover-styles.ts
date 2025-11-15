/**
 * Unified Hover Effect System
 * Centralized hover styles for all components
 */

import type { JSX } from "solid-js";

/**
 * Get hover color using color-mix with unified parameters
 */
export const getHoverColor = (): string => {
  return `color-mix(in hsl, hsl(var(--primary-hover)) var(--hover-color-mix-primary), white var(--hover-color-mix-white))`;
};

/**
 * Get drop-shadow filter for icons/text with unified parameters
 */
export const getHoverGlowFilter = (): string => {
  return `drop-shadow(0 0 var(--hover-glow-blur) hsla(var(--primary-hover) / var(--hover-glow-opacity)))`;
};

/**
 * Get box-shadow for hover effects with unified parameters
 */
export const getHoverBoxShadow = (): string => {
  return `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`;
};

/**
 * Get text-shadow for hover effects with unified parameters
 */
export const getHoverTextShadow = (): string => {
  return `0 0 var(--hover-text-shadow-blur) hsla(var(--primary-hover) / var(--hover-text-shadow-opacity))`;
};

/**
 * Unified hover styles for icons (SVG, material-icons)
 */
export const hoverIconStyles = (): JSX.CSSProperties => ({
  color: getHoverColor(),
  filter: getHoverGlowFilter(),
});

/**
 * Unified hover styles for text with glow
 */
export const hoverTextStyles = (): JSX.CSSProperties => ({
  color: getHoverColor(),
  "text-shadow": getHoverTextShadow(),
});

/**
 * Unified hover styles for containers with box-shadow
 */
export const hoverContainerStyles = (
  backgroundOpacity?: number,
): JSX.CSSProperties => ({
  "box-shadow": getHoverBoxShadow(),
  ...(backgroundOpacity !== undefined && {
    "background-color": `hsla(var(--primary-hover) / ${backgroundOpacity})`,
  }),
});

/**
 * Combined hover styles for interactive elements
 */
export const hoverInteractiveStyles = (options?: {
  includeTextShadow?: boolean;
  includeBoxShadow?: boolean;
  backgroundOpacity?: number;
}): JSX.CSSProperties => {
  const styles: JSX.CSSProperties = {
    color: getHoverColor(),
  };

  if (options?.includeTextShadow) {
    styles["text-shadow"] = getHoverTextShadow();
  }

  if (options?.includeBoxShadow || options?.backgroundOpacity !== undefined) {
    styles["box-shadow"] = getHoverBoxShadow();
  }

  if (options?.backgroundOpacity !== undefined) {
    styles["background-color"] =
      `hsla(var(--primary-hover) / ${options.backgroundOpacity})`;
  }

  return styles;
};
