/**
 * File Filters Hook
 * Hook for filtering and searching files
 */

import { createMemo, createSignal, Accessor } from "solid-js";
import type { FileItem, SortBy } from "../model/types";

export interface FilterOptions {
  searchQuery: string;
  sortBy: SortBy;
  allowedExtensions: string[];
  showHiddenFiles: boolean;
  minFileSize: number;
  maxFileSize: number;
}

export function useFileFilters(
  items: Accessor<FileItem[]>,
  filterOptions: Accessor<FilterOptions>,
) {
  /**
   * Check if file extension is allowed
   */
  const isAllowedFile = (
    fileName: string,
    allowedExtensions: string[],
  ): boolean => {
    if (!allowedExtensions || allowedExtensions.length === 0) {
      return true; // If filter is not active, show all
    }
    const ext = fileName.split(".").pop()?.toLowerCase();
    return ext ? allowedExtensions.includes(ext) : false;
  };

  /**
   * Filter and sort items
   */
  const filteredItems = createMemo<FileItem[]>(() => {
    const options = filterOptions();
    let result = items();

    // Filter by file type (folders always visible)
    result = result.filter(
      (item) =>
        item.isFolder || isAllowedFile(item.name, options.allowedExtensions),
    );

    // Filter hidden files
    if (!options.showHiddenFiles) {
      result = result.filter((item) => !item.name.startsWith("."));
    }

    // Filter by file size
    const minSize = options.minFileSize;
    const maxSize = options.maxFileSize;
    if (minSize > 0 || maxSize > 0) {
      result = result.filter((item) => {
        if (item.isFolder) return true;
        if (!item.size) return true;
        const sizeKB = item.size / 1024;
        if (minSize > 0 && sizeKB < minSize) return false;
        if (maxSize > 0 && sizeKB > maxSize) return false;
        return true;
      });
    }

    // Filter by search query
    const query = options.searchQuery.toLowerCase();
    if (query) {
      result = result.filter((item) => item.name.toLowerCase().includes(query));
    }

    // Sort: folders always on top
    result.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;

      const currentSort = options.sortBy;
      let comparison = 0;

      if (currentSort === "name" || currentSort === "name-desc") {
        comparison = a.name.localeCompare(b.name);
      } else if (currentSort === "size" || currentSort === "size-desc") {
        comparison = (a.size || 0) - (b.size || 0);
      } else if (currentSort === "type" || currentSort === "type-desc") {
        const aType = a.isFolder ? "Folder" : "File";
        const bType = b.isFolder ? "Folder" : "File";
        comparison = aType.localeCompare(bType);
      } else if (currentSort === "date" || currentSort === "date-desc") {
        const aDate = a.modified ? parseInt(a.modified) : 0;
        const bDate = b.modified ? parseInt(b.modified) : 0;
        comparison = aDate - bDate;
      }

      // Invert for desc sorting
      if (currentSort.endsWith("-desc")) {
        comparison = -comparison;
      }

      return comparison;
    });

    return result;
  });

  return {
    filteredItems,
  };
}
