/**
 * Button Variants Helper
 * Generates CSS class string for button variants
 * Similar to shadcn/ui buttonVariants pattern
 */

import type { ButtonSize, ButtonVariant } from "../model/types";

export interface ButtonVariantsOptions {
  /**
   * Visual variant of the button
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   */
  size?: ButtonSize;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether the button is in loading state
   */
  loading?: boolean;

  /**
   * Whether the button is in active state
   */
  active?: boolean;

  /**
   * Whether the button is pinned (for pin buttons)
   */
  pinned?: boolean;

  /**
   * Whether the button is maximized (for maximize buttons)
   */
  maximized?: boolean;

  /**
   * Additional CSS class names
   */
  class?: string;
}

/**
 * Generates CSS class string for button based on variants
 * @param options - Button variant options
 * @returns CSS class string
 */
export const buttonVariants = (options: ButtonVariantsOptions = {}): string => {
  const {
    variant,
    size,
    disabled,
    loading,
    active,
    pinned,
    maximized,
    class: className,
  } = options;

  let baseClass = "control-btn";

  // Variant-based classes
  if (variant === "play-pause") {
    baseClass = "play-pause-btn";
  } else if (variant === "small") {
    baseClass = "control-btn small-btn";
  } else if (variant === "close") {
    baseClass = "control-btn close-btn";
  } else if (variant === "minimize") {
    baseClass = "control-btn minimize-btn";
  } else if (variant === "maximize") {
    baseClass = "control-btn maximize-btn";
  } else if (variant === "pin") {
    baseClass = "control-btn pin-btn";
  } else if (variant === "expand") {
    baseClass = "control-btn expand-btn";
  } else if (variant === "copy") {
    baseClass = "control-btn copy-btn";
  } else if (variant === "attach") {
    baseClass = "control-btn attach-btn";
  } else if (variant === "trigger") {
    baseClass = "control-btn trigger-btn";
  } else if (variant === "back") {
    baseClass = "control-btn back-btn";
  } else if (variant === "save") {
    baseClass = "control-btn save-btn";
  } else if (variant === "delete") {
    baseClass = "control-btn delete-btn";
  } else if (variant === "search") {
    baseClass = "control-btn search-btn";
  } else if (variant === "share") {
    baseClass = "control-btn share-btn";
  }

  // Size classes (if needed in future)
  if (size === "sm") {
    baseClass += " btn-sm";
  } else if (size === "lg") {
    baseClass += " btn-lg";
  }

  // State classes
  if (active) {
    baseClass += " active";
  }

  if (pinned) {
    baseClass += " pinned";
  }

  if (maximized) {
    baseClass += " maximized";
  }

  if (disabled || loading) {
    baseClass += " disabled";
  }

  // Additional classes
  if (className) {
    baseClass += ` ${className}`;
  }

  return baseClass.trim();
};
