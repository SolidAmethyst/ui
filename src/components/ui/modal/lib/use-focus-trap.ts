/**
 * Focus Trap Hook
 * Traps focus within a container element
 */

import { createEffect, onCleanup, onMount } from "solid-js";

export function useFocusTrap(
  containerRef: () => HTMLElement | undefined,
  enabled: () => boolean,
) {
  let previousActiveElement: HTMLElement | null = null;
  let containerElement: HTMLElement | undefined;

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => {
        return (
          !el.hasAttribute("disabled") &&
          el.getAttribute("tabindex") !== "-1" &&
          el.offsetWidth > 0 &&
          el.offsetHeight > 0
        );
      },
    );
  };

  const handleTabKey = (e: KeyboardEvent) => {
    if (!enabled() || e.key !== "Tab") return;

    const container = containerElement || containerRef();
    if (!container) return;

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  onMount(() => {
    // Store previous active element
    previousActiveElement = (document.activeElement as HTMLElement) || null;
  });

  // Setup focus trap when container is available and enabled
  createEffect(() => {
    const container = containerRef();
    const isEnabled = enabled();

    if (!container || !isEnabled) {
      // Remove listener if container is not available or trap is disabled
      if (containerElement) {
        containerElement.removeEventListener("keydown", handleTabKey);
        containerElement = undefined;
      }
      return;
    }

    // Container is available and trap is enabled
    containerElement = container;

    // Add keyboard event listener
    container.addEventListener("keydown", handleTabKey);

    // Focus first focusable element
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      // Use requestAnimationFrame to ensure modal is fully rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (containerElement === container && enabled()) {
            focusableElements[0]?.focus();
          }
        });
      });
    }
  });

  onCleanup(() => {
    if (containerElement) {
      containerElement.removeEventListener("keydown", handleTabKey);
    }

    // Restore previous active element
    if (
      previousActiveElement &&
      typeof previousActiveElement.focus === "function"
    ) {
      previousActiveElement.focus();
    }
  });
}
