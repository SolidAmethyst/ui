/**
 * Sidebar Component Types
 */

import type { JSX } from "solid-js";

export interface SidebarItem {
  /**
   * Unique identifier for the sidebar item
   */
  id?: string;

  /**
   * Display label (required when separator is false)
   */
  label?: string;

  /**
   * Material Symbols icon name
   */
  icon?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Whether the item is a separator
   */
  separator?: boolean;
}

export interface SidebarProps {
  /**
   * Whether the sidebar is open
   */
  open: boolean;

  /**
   * Sidebar items to display
   */
  items: SidebarItem[];

  /**
   * Whether the sidebar is in overlay mode (absolute positioning)
   */
  overlayMode?: boolean;

  /**
   * Callback when an item is clicked (closes sidebar if provided)
   */
  onItemClick?: (item: SidebarItem) => void;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Custom inline styles
   */
  style?: JSX.CSSProperties;
}
