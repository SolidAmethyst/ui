import type { Accessor, Setter } from "solid-js";
import type { ScrollbarState } from "../model/types";

export function useScrollbarLogic(
  state: Accessor<ScrollbarState>,
  setState: Setter<ScrollbarState>,
  direction: () => string,
  containerRef: () => HTMLDivElement | undefined,
  contentRef: () => HTMLDivElement | undefined,
  trackRef: () => HTMLDivElement | undefined,
) {
  const updateScrollbar = () => {
    if (!containerRef() || !contentRef()) return;

    const containerSize =
      direction() === "horizontal"
        ? containerRef()!.clientWidth
        : containerRef()!.clientHeight;
    const contentSize =
      direction() === "horizontal"
        ? contentRef()!.scrollWidth
        : contentRef()!.scrollHeight;

    const needsScrollbar = contentSize > containerSize;
    if (!needsScrollbar) {
      setState((prev) => ({ ...prev, isVisible: false }));
      return;
    }

    const scrollPosition =
      direction() === "horizontal"
        ? contentRef()!.scrollLeft
        : contentRef()!.scrollTop;
    const maxScroll = contentSize - containerSize;

    // Get track size - if trackRef is not ready yet, use containerSize as fallback
    const trackSize =
      trackRef() && trackRef()!.clientWidth > 0 && trackRef()!.clientHeight > 0
        ? direction() === "horizontal"
          ? trackRef()!.clientWidth
          : trackRef()!.clientHeight
        : direction() === "horizontal"
          ? containerRef()!.clientWidth
          : containerRef()!.clientHeight;

    // Ensure trackSize is valid (greater than 0)
    if (trackSize <= 0) {
      setState((prev) => ({ ...prev, isVisible: false }));
      return;
    }

    const arrowSpace = state().showArrows ? 12 : 0;
    const availableTrackSize = Math.max(0, trackSize - arrowSpace * 2);

    // Ensure we have valid values for calculation
    if (availableTrackSize <= 0 || contentSize <= 0 || containerSize <= 0) {
      setState((prev) => ({ ...prev, isVisible: false }));
      return;
    }

    // Calculate thumb size proportionally to content
    // Ensure we don't get invalid sizes when trackSize is still initializing
    const calculatedThumbSize =
      (availableTrackSize * containerSize) / contentSize;
    const thumbSize = Math.max(
      20,
      Math.min(
        availableTrackSize - 4, // Leave some padding to prevent thumb from touching edges
        calculatedThumbSize,
      ),
    );

    // Calculate thumb position - only if NOT dragging
    const thumbPosition = state().isDragging
      ? state().thumbPosition // Preserve position while dragging
      : Math.max(
          arrowSpace,
          Math.min(
            arrowSpace +
              (scrollPosition / maxScroll) * (availableTrackSize - thumbSize),
            availableTrackSize - thumbSize + arrowSpace,
          ),
        );

    setState((prev) => ({
      ...prev,
      isVisible: true,
      thumbSize,
      thumbPosition,
      canScrollUp: scrollPosition > 0,
      canScrollDown: scrollPosition < maxScroll,
    }));
  };

  const handleScroll = () => {
    // Don't update while dragging - causes conflicts
    if (state().isDragging) return;
    updateScrollbar();
  };

  return {
    updateScrollbar,
    handleScroll,
  };
}
