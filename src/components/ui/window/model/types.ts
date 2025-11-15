/**
 * Window Component Types
 */

import type { JSX } from "solid-js";

export interface WindowProps {
  /**
   * TitleBar component to render at the top
   */
  titleBar?: JSX.Element;

  /**
   * Sidebar component to render on the left
   */
  sidebar?: JSX.Element;

  /**
   * Main content (children)
   */
  children?: JSX.Element;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Custom inline styles
   */
  style?: JSX.CSSProperties;
}
