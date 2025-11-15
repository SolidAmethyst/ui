/**
 * Tabs Component Types
 */

import type { Accessor, JSX } from "solid-js";

export interface TabsProps {
  /**
   * Preview content to show in preview tab
   */
  preview: JSX.Element;

  /**
   * Code string to show in code tab
   */
  code: string;

  /**
   * Preview tab label (default: "Preview")
   */
  previewLabel?: string;

  /**
   * Code tab label (default: "Code")
   */
  codeLabel?: string;

  /**
   * Preview tab value (default: "preview")
   */
  previewValue?: string;

  /**
   * Code tab value (default: "code")
   */
  codeValue?: string;

  /**
   * Default active tab value (default: previewValue or "preview")
   */
  defaultValue?: string;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Custom inline styles
   */
  style?: Record<string, string>;

  /**
   * Center align tabs (default: false)
   */
  center?: boolean;

  /**
   * Gap between tabs (overrides CSS variable)
   */
  gap?: string;

  /**
   * Custom border bottom color for tab list (overrides default)
   */
  borderColor?: string;
}
