/**
 * Drag Drop Component Types
 * Drag and drop functionality component
 */

import type { JSX } from "solid-js";

export interface DragDropItem {
  /**
   * Unique identifier for the item
   */
  id: string | number;

  /**
   * Item content to display
   */
  content: JSX.Element;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Additional data associated with the item
   */
  data?: unknown;
}

export interface DragDropProps {
  /**
   * Array of draggable items
   */
  items: DragDropItem[];

  /**
   * Callback when item is dragged
   */
  onDragStart?: (item: DragDropItem, index: number) => void;

  /**
   * Callback when item is being dragged over a drop zone
   */
  onDragOver?: (item: DragDropItem, index: number) => void;

  /**
   * Callback when item is dropped
   */
  onDrop?: (item: DragDropItem, fromIndex: number, toIndex: number) => void;

  /**
   * Callback when drag ends
   */
  onDragEnd?: (item: DragDropItem, index: number) => void;

  /**
   * Whether drag and drop is disabled
   */
  disabled?: boolean;

  /**
   * Orientation of the list (default: 'vertical')
   */
  orientation?: "vertical" | "horizontal";

  /**
   * Gap between items
   */
  gap?: string;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;

  /**
   * Custom render function for items
   */
  renderItem?: (
    item: DragDropItem,
    index: number,
    isDragging: boolean,
  ) => JSX.Element;

  /**
   * Drag handle icon name (default: "drag_handle")
   */
  dragHandleIcon?: string;
}
