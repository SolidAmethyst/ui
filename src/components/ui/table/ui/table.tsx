/**
 * Table Component
 * Table component with sorting and pagination
 */

import { For, Show, createMemo } from "solid-js";
import { tableStyles } from "../lib/table.styles";
import { useTableSort } from "../lib/use-table-sort";
import { useTablePagination } from "../lib/use-table-pagination";
import type { TableProps } from "../model/types";

export const Table = <T,>(props: TableProps<T>) => {
  const sortable = () => props.sortable ?? true;
  const paginated = () => props.paginated ?? false;
  const pageSize = () => props.pageSize ?? 10;

  const { sortColumn, sortDirection, toggleSort, getSortDirection } =
    useTableSort<T>(
      props.defaultSortColumn,
      props.defaultSortDirection,
      props.onSortChange,
    );

  // Sort data
  const sortedData = createMemo(() => {
    const data = props.data;
    const columnId = sortColumn();
    const direction = sortDirection();

    if (!columnId || !direction) return data;

    const column = props.columns.find((col) => col.id === columnId);
    if (!column || !column.sortable) return data;

    const sorted = [...data];

    if (column.sortFn) {
      sorted.sort(column.sortFn);
    } else {
      sorted.sort((a, b) => {
        const aVal =
          typeof column.accessor === "function"
            ? column.accessor(a)
            : ((a as Record<string, any>)[column.accessor] ?? "");
        const bVal =
          typeof column.accessor === "function"
            ? column.accessor(b)
            : ((b as Record<string, any>)[column.accessor] ?? "");

        // Handle JSX elements (convert to string for comparison)
        const aStr =
          typeof aVal === "object" && aVal !== null
            ? String(aVal)
            : String(aVal);
        const bStr =
          typeof bVal === "object" && bVal !== null
            ? String(bVal)
            : String(bVal);

        if (aStr < bStr) return direction === "asc" ? -1 : 1;
        if (aStr > bStr) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  });

  // Paginate data
  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
  } = useTablePagination<T>(
    sortedData,
    pageSize,
    props.page,
    props.onPageChange,
  );

  const displayData = createMemo(() => {
    return paginated() ? paginatedData() : sortedData();
  });

  const getSortIcon = (columnId: string) => {
    const direction = getSortDirection(columnId);
    if (!direction) return "unfold_more";
    return "arrow_upward";
  };

  return (
    <div
      class={`table-container ${props.class || ""}`}
      style={{
        ...tableStyles.container(),
        ...props.style,
      }}
    >
      <table style={tableStyles.table()}>
        <thead style={tableStyles.thead()}>
          <tr>
            <For each={props.columns}>
              {(column) => {
                const sortableColumn = sortable() && (column.sortable ?? true);
                const direction = getSortDirection(column.id);
                const align = column.align ?? "left";

                return (
                  <th
                    style={tableStyles.th(sortableColumn, align)}
                    onClick={() => {
                      if (sortableColumn) {
                        toggleSort(column.id);
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (sortableColumn) {
                        const hoverStyles = tableStyles.thHover();
                        e.currentTarget.style.background =
                          hoverStyles.background as string;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                    role={sortableColumn ? "button" : undefined}
                    tabindex={sortableColumn ? 0 : undefined}
                    aria-sort={
                      direction === "asc"
                        ? "ascending"
                        : direction === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    {column.header}
                    <Show when={sortableColumn}>
                      <span
                        class="material-symbols-rounded"
                        style={tableStyles.sortIcon(direction)}
                      >
                        {getSortIcon(column.id)}
                      </span>
                    </Show>
                  </th>
                );
              }}
            </For>
          </tr>
        </thead>
        <tbody style={tableStyles.tbody()}>
          <For each={displayData()}>
            {(row, index) => {
              const isEven = index() % 2 === 0;

              return (
                <tr
                  style={tableStyles.tr(isEven)}
                  onMouseEnter={(e) => {
                    const hoverStyles = tableStyles.trHover();
                    e.currentTarget.style.background =
                      hoverStyles.background as string;
                  }}
                  onMouseLeave={(e) => {
                    const isEvenRow = index() % 2 === 0;
                    e.currentTarget.style.background = isEvenRow
                      ? "var(--surface-overlay-dark, rgba(255, 255, 255, 0.02))"
                      : "transparent";
                  }}
                >
                  <For each={props.columns}>
                    {(column) => {
                      const cellValue =
                        typeof column.accessor === "function"
                          ? column.accessor(row)
                          : ((row as Record<string, any>)[column.accessor] ??
                            "");
                      const align = column.align ?? "left";

                      return <td style={tableStyles.td(align)}>{cellValue}</td>;
                    }}
                  </For>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      <Show when={paginated()}>
        <div style={tableStyles.pagination()}>
          <div style={tableStyles.paginationInfo()}>
            Showing {startIndex() + 1} to {endIndex()} of {props.data.length}{" "}
            entries
          </div>
          <div style={tableStyles.paginationControls()}>
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage() === 1}
              style={tableStyles.paginationButton(currentPage() === 1)}
              onMouseEnter={(e) => {
                if (currentPage() !== 1) {
                  const hoverStyles = tableStyles.paginationButtonHover(false);
                  e.currentTarget.style.background =
                    hoverStyles.background as string;
                  if (hoverStyles["border-color"]) {
                    e.currentTarget.style.borderColor = hoverStyles[
                      "border-color"
                    ] as string;
                  }
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderColor = "";
              }}
              aria-label="Previous page"
            >
              <span
                class="material-symbols-rounded"
                style={{ "font-size": "16px" }}
              >
                chevron_left
              </span>
            </button>
            <span
              style={{
                padding: "0 12px",
                "font-size": "14px",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {currentPage()} / {totalPages()}
            </span>
            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage() === totalPages()}
              style={tableStyles.paginationButton(
                currentPage() === totalPages(),
              )}
              onMouseEnter={(e) => {
                if (currentPage() !== totalPages()) {
                  const hoverStyles = tableStyles.paginationButtonHover(false);
                  e.currentTarget.style.background =
                    hoverStyles.background as string;
                  if (hoverStyles["border-color"]) {
                    e.currentTarget.style.borderColor = hoverStyles[
                      "border-color"
                    ] as string;
                  }
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderColor = "";
              }}
              aria-label="Next page"
            >
              <span
                class="material-symbols-rounded"
                style={{ "font-size": "16px" }}
              >
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};
