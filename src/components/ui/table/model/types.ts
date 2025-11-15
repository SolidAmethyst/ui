/**
 * Table Component Types
 * Table component with sorting and pagination
 */

import type { JSX } from "solid-js";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T = unknown> {
  /**
   * Unique identifier for the column
   */
  id: string;

  /**
   * Column header label
   */
  header: string | JSX.Element;

  /**
   * Accessor function or string key to get cell value from row data
   */
  accessor: ((row: T) => string | number | JSX.Element) | string;

  /**
   * Whether column is sortable
   */
  sortable?: boolean;

  /**
   * Custom sort function (optional)
   */
  sortFn?: (a: T, b: T) => number;

  /**
   * Column width (CSS value)
   */
  width?: string;

  /**
   * Column alignment
   */
  align?: "left" | "center" | "right";
}

export interface TableProps<T = unknown> {
  /**
   * Table data (rows)
   */
  data: T[];

  /**
   * Column definitions
   */
  columns: TableColumn<T>[];

  /**
   * Whether to enable sorting (default: true)
   */
  sortable?: boolean;

  /**
   * Initial sort column ID
   */
  defaultSortColumn?: string;

  /**
   * Initial sort direction
   */
  defaultSortDirection?: SortDirection;

  /**
   * Callback when sort changes
   */
  onSortChange?: (columnId: string, direction: SortDirection) => void;

  /**
   * Whether to enable pagination (default: false)
   */
  paginated?: boolean;

  /**
   * Items per page (default: 10)
   */
  pageSize?: number;

  /**
   * Current page (1-based, controlled)
   */
  page?: number;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}
