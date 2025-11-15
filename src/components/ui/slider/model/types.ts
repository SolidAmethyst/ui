/**
 * Slider Component Types
 * Range input slider component
 */

import type { JSX } from "solid-js";

export interface SliderProps {
  /**
   * Current value
   */
  value: number;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Step increment
   */
  step?: number;

  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;

  /**
   * Change handler
   */
  onChange?: (value: number) => void;

  /**
   * Input handler (fires on every change)
   */
  onInput?: (value: number) => void;

  /**
   * Label text
   */
  label?: string;

  /**
   * Whether to show the value
   */
  showValue?: boolean;

  /**
   * Value formatter function
   */
  formatValue?: (value: number) => string;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}
