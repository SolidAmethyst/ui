/**
 * Scroll Boundary Hook
 * Manages scroll transfer between element and window at boundaries
 */

import { onCleanup, onMount } from "solid-js";
import type { ScrollBoundaryOptions } from "../model/types";

/**
 * Hook for managing scroll boundary behavior
 *
 * Intercepts wheel events at scroll boundaries and transfers control to window scroll,
 * enabling smooth footer reveal/hide functionality.
 *
 * @param options - Configuration options for scroll boundary behavior
 * @returns Ref callback function to attach to scrollable element
 *
 * @example
 * ```tsx
 * const mainRef = useScrollBoundary({
 *   behavior: 'smooth',
 *   threshold: 10,
 *   enabled: true,
 *   onBoundaryReached: (direction) => console.log(`Boundary reached: ${direction}`)
 * });
 *
 * <main ref={mainRef}>
 *   {content}
 * </main>
 * ```
 */
export function useScrollBoundary(
  options: ScrollBoundaryOptions = {}
): (element: HTMLElement) => void {
  const {
    behavior = 'smooth',
    threshold = 10,
    enabled = true,
    onBoundaryReached,
  } = options;

  return (element: HTMLElement) => {
    onMount(() => {
      if (!enabled) return;

      const handleWheel = (e: WheelEvent) => {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;

        const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
        const isAtBottom = distanceFromBottom < threshold;

        // Scrolling down: transfer to window when at bottom or no scroll
        if (e.deltaY > 0) {
          const hasScroll = scrollHeight > clientHeight;

          if (!hasScroll) {
            // No scroll in element, transfer to window immediately
            e.preventDefault();
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: maxScroll, behavior });
            onBoundaryReached?.('down');
            return;
          }

          if (isAtBottom) {
            // At bottom of element, transfer to window
            e.preventDefault();
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: maxScroll, behavior });
            onBoundaryReached?.('down');
            return;
          }

          // Has scroll and not at bottom - let element scroll naturally
          return;
        }

        // Scrolling up: if footer visible (window scrolled), hide it first
        if (e.deltaY < 0) {
          if (window.scrollY > 0) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior });
            onBoundaryReached?.('up');
            return;
          }

          // Footer hidden, let element scroll naturally
          return;
        }
      };

      element.addEventListener('wheel', handleWheel, { passive: false });

      onCleanup(() => {
        element.removeEventListener('wheel', handleWheel);
      });
    });
  };
}
