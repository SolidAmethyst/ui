/**
 * File Selection Hook
 * Hook for managing file selection (multiple selection, Ctrl+click, Shift+click)
 */

import { createSignal, Accessor } from "solid-js";
import type { FileItem } from "../model/types";

export function useFileSelection() {
  const [selectedFiles, setSelectedFiles] = createSignal<string[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = createSignal<number>(-1);

  /**
   * Toggle file selection
   */
  const toggleFile = (path: string) => {
    setSelectedFiles((prev) => {
      if (prev.includes(path)) {
        return prev.filter((p) => p !== path);
      } else {
        return [...prev, path];
      }
    });
  };

  /**
   * Select all files from filtered items
   */
  const selectAllFiles = (filteredItems: FileItem[]) => {
    const paths = filteredItems
      .filter((item) => !item.isFolder)
      .map((item) => item.path);
    setSelectedFiles(paths);
  };

  /**
   * Deselect all files
   */
  const deselectAll = () => {
    setSelectedFiles([]);
    setLastSelectedIndex(-1);
  };

  /**
   * Select range of files (Shift+click)
   */
  const selectRange = (
    startIndex: number,
    endIndex: number,
    filteredItems: FileItem[],
  ) => {
    const files = filteredItems.filter((item) => !item.isFolder);
    const start = Math.min(startIndex, endIndex);
    const end = Math.max(startIndex, endIndex);

    // Create new range from start to end
    const rangePaths = files.slice(start, end + 1).map((item) => item.path);

    // If clicking in opposite direction from last point, remove selection from previous range
    if (endIndex < startIndex) {
      // Clicking left - remove selection from right of startIndex
      const rightRange = files.slice(startIndex + 1).map((item) => item.path);
      const currentSelected = selectedFiles();
      const filtered = currentSelected.filter(
        (path) => !rightRange.includes(path),
      );
      setSelectedFiles([...filtered, ...rangePaths]);
    } else {
      // Clicking right - remove selection from left of startIndex
      const leftRange = files.slice(0, startIndex).map((item) => item.path);
      const currentSelected = selectedFiles();
      const filtered = currentSelected.filter(
        (path) => !leftRange.includes(path),
      );
      setSelectedFiles([...filtered, ...rangePaths]);
    }
  };

  /**
   * Handle file click with modifier keys
   */
  const handleFileClick = (
    item: FileItem,
    index: number,
    event: MouseEvent,
    filteredItems: FileItem[],
  ) => {
    if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd+click - toggle selection
      const currentSelected = selectedFiles();
      if (currentSelected.includes(item.path)) {
        setSelectedFiles(currentSelected.filter((path) => path !== item.path));
      } else {
        setSelectedFiles([...currentSelected, item.path]);
      }
      setLastSelectedIndex(index);
    } else if (event.shiftKey && lastSelectedIndex() !== -1) {
      // Shift+click - select range
      selectRange(lastSelectedIndex(), index, filteredItems);
    } else {
      // Normal click - toggle selection
      toggleFile(item.path);
      setLastSelectedIndex(index);
    }
  };

  /**
   * Check if file is selected
   */
  const isSelected = (path: string): boolean => {
    return selectedFiles().includes(path);
  };

  /**
   * Get selected files count
   */
  const selectedCount = (): number => {
    return selectedFiles().length;
  };

  /**
   * Clear selection
   */
  const clearSelection = () => {
    setSelectedFiles([]);
    setLastSelectedIndex(-1);
  };

  return {
    selectedFiles: selectedFiles as Accessor<string[]>,
    setSelectedFiles,
    toggleFile,
    selectAllFiles,
    deselectAll,
    selectRange,
    handleFileClick,
    isSelected,
    selectedCount,
    clearSelection,
  };
}
