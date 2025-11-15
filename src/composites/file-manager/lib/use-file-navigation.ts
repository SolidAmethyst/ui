/**
 * File Navigation Hook
 * Hook for managing file navigation (breadcrumbs, path history)
 */

import { createMemo } from "solid-js";

export interface BreadcrumbPart {
  name: string;
  path: string;
}

export function useFileNavigation(currentPath: () => string) {
  /**
   * Get breadcrumb parts from current path
   */
  const breadcrumbs = createMemo<BreadcrumbPart[]>(() => {
    const path = currentPath();
    const parts = path.split(/[\\/]/).filter((p) => p);

    return parts.map((part, index) => ({
      name: part,
      path: parts.slice(0, index + 1).join("\\") + "\\",
    }));
  });

  /**
   * Get parent path
   */
  const getParentPath = (path: string): string | null => {
    const parts = path.split(/[\\/]/).filter((p) => p);
    if (parts.length > 1) {
      parts.pop();
      return parts.join("\\") + "\\";
    } else if (parts.length === 1) {
      return parts[0] + "\\";
    }
    return null;
  };

  return {
    breadcrumbs,
    getParentPath,
  };
}
