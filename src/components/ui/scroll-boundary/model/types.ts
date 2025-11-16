/**
 * Scroll Boundary Component Types
 * Manages scroll transfer between elements and window at boundaries
 */

export interface ScrollBoundaryOptions {
  /**
   * Scroll behavior when transferring to window
   * @default 'smooth'
   */
  behavior?: 'smooth' | 'auto';

  /**
   * Threshold in pixels for boundary detection
   * @default 10
   */
  threshold?: number;

  /**
   * Whether the boundary detection is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Callback fired when scroll boundary is reached
   * @param direction - Direction of scroll ('up' or 'down')
   */
  onBoundaryReached?: (direction: ScrollDirection) => void;
}

/**
 * Direction of scroll movement
 */
export type ScrollDirection = 'up' | 'down';
