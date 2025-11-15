/**
 * Accordion Component Types
 * Accordion component with collapsible sections
 */

import type { JSX } from "solid-js";

export interface AccordionItem {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Header content (title)
   */
  header: string | JSX.Element;

  /**
   * Content to display when expanded
   */
  content: string | JSX.Element;

  /**
   * Whether the item is initially expanded
   */
  defaultExpanded?: boolean;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}

export interface AccordionProps {
  /**
   * Accordion items
   */
  items: AccordionItem[];

  /**
   * Whether multiple items can be open at once (default: false)
   */
  allowMultiple?: boolean;

  /**
   * Callback when item is expanded/collapsed
   */
  onChange?: (itemId: string, expanded: boolean) => void;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}
