/**
 * FileManager Component Types
 * Types and interfaces for file manager component
 */

import type { JSX } from "solid-js";

export interface FileItem {
  /**
   * File or folder name
   */
  name: string;

  /**
   * Full path to the file or folder
   */
  path: string;

  /**
   * Whether this item is a folder
   */
  isFolder: boolean;

  /**
   * File size in bytes (only for files)
   */
  size?: number;

  /**
   * Last modified date as timestamp string
   */
  modified?: string;
}

export type SortBy =
  | "name"
  | "name-desc"
  | "size"
  | "size-desc"
  | "type"
  | "type-desc"
  | "date"
  | "date-desc";

export interface FileManagerProps {
  /**
   * Current files and folders to display
   */
  files: FileItem[];

  /**
   * Current path
   */
  currentPath: string;

  /**
   * Callback when path changes
   */
  onPathChange?: (path: string) => void;

  /**
   * Callback when files are selected
   */
  onFileSelect?: (files: string[]) => void;

  /**
   * Callback to load folder contents (replaces Tauri invoke)
   */
  onLoadFolder?: (path: string) => Promise<FileItem[]>;

  /**
   * Callback to load available drives (optional)
   */
  onLoadDrives?: () => Promise<string[]>;

  /**
   * Allowed file extensions (without dot)
   */
  allowedExtensions?: string[];

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}
