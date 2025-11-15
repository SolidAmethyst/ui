/**
 * Table Sort Hook
 * Manages table sorting state and logic
 */

import { createSignal } from "solid-js";
import type { SortDirection } from "../model/types";

export function useTableSort<T>(
  defaultSortColumn?: string,
  defaultSortDirection?: SortDirection,
  onSortChange?: (columnId: string, direction: SortDirection) => void,
) {
  const [sortColumn, setSortColumn] = createSignal<string | undefined>(
    defaultSortColumn,
  );
  const [sortDirection, setSortDirection] = createSignal<SortDirection>(
    defaultSortDirection ?? null,
  );

  const toggleSort = (columnId: string) => {
    const currentColumn = sortColumn();
    const currentDirection = sortDirection();

    if (currentColumn === columnId) {
      // Cycle: asc -> desc -> null
      if (currentDirection === "asc") {
        setSortDirection("desc");
        onSortChange?.(columnId, "desc");
      } else if (currentDirection === "desc") {
        setSortDirection(null);
        setSortColumn(undefined);
        onSortChange?.(columnId, null);
      } else {
        setSortDirection("asc");
        onSortChange?.(columnId, "asc");
      }
    } else {
      // New column, start with asc
      setSortColumn(columnId);
      setSortDirection("asc");
      onSortChange?.(columnId, "asc");
    }
  };

  const getSortDirection = (columnId: string): SortDirection => {
    return sortColumn() === columnId ? sortDirection() : null;
  };

  return {
    sortColumn,
    sortDirection,
    toggleSort,
    getSortDirection,
  };
}
