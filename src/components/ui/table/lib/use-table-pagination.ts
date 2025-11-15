/**
 * Table Pagination Hook
 * Manages table pagination state and logic
 */

import { createSignal, createMemo } from "solid-js";

export function useTablePagination<T>(
  data: () => T[],
  pageSize: () => number,
  page?: number,
  onPageChange?: (page: number) => void,
) {
  const [currentPage, setCurrentPage] = createSignal<number>(page ?? 1);

  const totalPages = createMemo(() => {
    const size = pageSize();
    if (size <= 0) return 1;
    return Math.ceil(data().length / size);
  });

  const paginatedData = createMemo(() => {
    const size = pageSize();
    if (size <= 0) return data();

    const page = currentPage();
    const start = (page - 1) * size;
    const end = start + size;

    return data().slice(start, end);
  });

  const goToPage = (newPage: number) => {
    const total = totalPages();
    const clampedPage = Math.max(1, Math.min(newPage, total));
    setCurrentPage(clampedPage);
    onPageChange?.(clampedPage);
  };

  const nextPage = () => {
    const total = totalPages();
    if (currentPage() < total) {
      goToPage(currentPage() + 1);
    }
  };

  const prevPage = () => {
    if (currentPage() > 1) {
      goToPage(currentPage() - 1);
    }
  };

  const startIndex = createMemo(() => {
    const size = pageSize();
    if (size <= 0) return 0;
    return (currentPage() - 1) * size;
  });

  const endIndex = createMemo(() => {
    const size = pageSize();
    if (size <= 0) return data().length;
    return Math.min(startIndex() + size, data().length);
  });

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
  };
}
