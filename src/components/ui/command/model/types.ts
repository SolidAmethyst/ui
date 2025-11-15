/**
 * Command Component Types
 * Based on cmdk-solid library
 */

import type { JSX } from "solid-js";

export interface CommandProps {
  /**
   * Whether the command menu should loop through items
   */
  loop?: boolean;

  /**
   * Whether to filter items automatically
   */
  shouldFilter?: boolean;

  /**
   * Custom filter function
   */
  filter?: (value: string, search: string) => number;

  /**
   * Label for accessibility
   */
  label?: string;

  /**
   * Keyboard event handler
   */
  onKeyDown?: (e: KeyboardEvent) => void;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandDialogProps {
  /**
   * Whether the dialog is open
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Container element for portal
   */
  container?: HTMLElement;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandInputProps {
  /**
   * Input value (controlled)
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}

export interface CommandListProps {
  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandItemProps {
  /**
   * Unique value for the item
   */
  value?: string;

  /**
   * Keywords for filtering
   */
  keywords?: string[];

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Whether to force mount the item
   */
  forceMount?: boolean;

  /**
   * Callback when item is selected
   */
  onSelect?: (value: string) => void;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandGroupProps {
  /**
   * Group heading text
   */
  heading?: string;

  /**
   * Whether to force mount the group
   */
  forceMount?: boolean;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandSeparatorProps {
  /**
   * Whether to always render the separator
   */
  alwaysRender?: boolean;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}

export interface CommandEmptyProps {
  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandLoadingProps {
  /**
   * Progress value (0-100)
   */
  progress?: number;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements
   */
  children?: JSX.Element;
}

export interface CommandShortcutProps {
  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Children elements (the shortcut text)
   */
  children?: JSX.Element;
}
