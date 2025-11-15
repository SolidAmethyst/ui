/**
 * EmptyState Component Types
 * Empty state component for displaying empty content states
 */

import type { JSX } from "solid-js";

export interface EmptyStateProps {
  /**
   * Icon name (Material Symbols)
   */
  icon?: string;

  /**
   * Title text
   */
  title?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Action button/link (JSX element)
   */
  action?: JSX.Element;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Custom content (alternative to icon/title/description)
   */
  children?: JSX.Element;
}
