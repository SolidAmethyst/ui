/**
 * TitleBar Component Types
 */

import type { JSX } from "solid-js";

export interface TitleBarProps {
  /**
   * Title text displayed in the center area
   */
  title?: string;

  /**
   * Whether the title bar is draggable (for Tauri drag region)
   */
  draggable?: boolean;

  /**
   * Burger menu button click handler
   */
  onBurgerClick?: () => void;

  /**
   * Whether the burger menu is active (for trigger button)
   */
  burgerActive?: boolean;

  /**
   * Theme toggle button click handler
   */
  onThemeToggle?: () => void;

  /**
   * Debug button click handler
   */
  onDebugClick?: () => void;

  /**
   * Pin button click handler
   */
  onPinClick?: () => void;

  /**
   * Settings button click handler
   */
  onSettingsClick?: () => void;

  /**
   * Minimize window button click handler
   */
  onMinimizeClick?: () => void;

  /**
   * Maximize/Restore window button click handler
   */
  onMaximizeClick?: () => void;

  /**
   * Close window button click handler
   */
  onCloseClick?: () => void;

  /**
   * Whether the window is maximized (affects maximize button icon)
   */
  maximized?: boolean;

  /**
   * Whether the pin button is active/pinned
   */
  pinned?: boolean;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Custom content for the title area (replaces title text if provided)
   */
  children?: JSX.Element;
}
