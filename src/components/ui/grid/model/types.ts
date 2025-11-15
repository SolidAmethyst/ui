/**
 * Grid Component Types
 */

import type { JSX } from "solid-js";

/**
 * Responsive breakpoint configuration
 */
export interface GridBreakpoint {
  /**
   * Minimum width for this breakpoint (in pixels)
   */
  minWidth?: number;

  /**
   * Maximum width for this breakpoint (in pixels)
   */
  maxWidth?: number;

  /**
   * Number of columns for this breakpoint
   */
  columns?: number | string;

  /**
   * Row template for this breakpoint
   */
  rows?: string;

  /**
   * Gap for this breakpoint
   */
  gap?: string | { row?: string; column?: string };

  /**
   * Minimum column width for this breakpoint
   */
  minColumnWidth?: string;

  /**
   * Maximum column width for this breakpoint
   */
  maxColumnWidth?: string;

  /**
   * Use auto-fit for this breakpoint
   */
  autoFit?: boolean;

  /**
   * Preserve area configuration for this specific breakpoint
   * Allows different preserve area behavior per viewport size
   */
  preserveArea?: PreserveAreaConfig;
}

/**
 * Configuration for preserve area feature
 * Maintains element visual area by adjusting height when width changes
 */
export interface PreserveAreaConfig {
  /**
   * CSS selector to identify the priority element(s)
   * This element will maintain its area when container width changes
   * Default: '[data-preserve-area]'
   */
  selector?: string;

  /**
   * Minimum height for the preserve area element (in pixels)
   * Prevents the element from becoming too small
   */
  minHeight?: number;

  /**
   * Maximum height for the preserve area element (in pixels)
   * Prevents the element from becoming too large
   */
  maxHeight?: number;

  /**
   * Base width for area calculation (optional, auto-detected if not provided)
   * Used as reference width for calculating area
   */
  baseWidth?: number;

  /**
   * Constraints for other elements in the grid
   * Prevents them from being compressed below specified sizes
   */
  constraints?: {
    /**
     * CSS selector for elements to constrain
     */
    selector: string;
    /**
     * Minimum height in pixels
     */
    minHeight?: number;
  }[];
}

/**
 * Grid component props
 */
export interface GridProps {
  /**
   * Number of columns or CSS grid-template-columns value
   * Examples: 3, "1fr 1fr", "repeat(3, 1fr)", "auto 1fr", "200px 1fr"
   */
  columns?: number | string;

  /**
   * Grid template rows (CSS grid-template-rows value)
   * Examples: "1fr 1fr", "repeat(3, 1fr)", "auto 1fr", "32px 1fr"
   */
  rows?: string;

  /**
   * Gap between grid items
   * Can be a string (applies to both row and column) or an object with row/column
   * Examples: "8px", "16px", "1rem", { row: "8px", column: "16px" }
   */
  gap?: string | { row?: string; column?: string };

  /**
   * Minimum column width (for auto-fit/auto-fill)
   * Examples: "200px", "minmax(200px, 1fr)"
   */
  minColumnWidth?: string;

  /**
   * Maximum column width
   */
  maxColumnWidth?: string;

  /**
   * Use auto-fit instead of auto-fill (default: false)
   * auto-fit collapses empty tracks, auto-fill keeps them
   */
  autoFit?: boolean;

  /**
   * Responsive breakpoints configuration
   * Grid will automatically adjust based on viewport width
   */
  breakpoints?: GridBreakpoint[];

  /**
   * Whether to enable resize observer for dynamic resizing
   * Default: true
   */
  observeResize?: boolean;

  /**
   * Global preserve area configuration
   * Can be overridden per breakpoint
   */
  preserveArea?: PreserveAreaConfig;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Custom inline styles
   */
  style?: JSX.CSSProperties;

  /**
   * Grid content (children)
   */
  children?: JSX.Element;
}
