import type { Accessor, Setter } from "solid-js";
import type { ScrollbarState } from "../model/types";
import { adjustForZoom } from "./scrollbar-calculations";
import { ScrollbarEngineManager } from "./scrollbar-engine";

export function useScrollbarHandlers(
  state: Accessor<ScrollbarState>,
  setState: Setter<ScrollbarState>,
  direction: () => string,
  containerRef: () => HTMLDivElement | undefined,
  contentRef: () => HTMLDivElement | undefined,
  trackRef: () => HTMLDivElement | undefined,
  thumbRef: () => HTMLDivElement | undefined,
  engineIntegration: () => boolean,
  updateScrollbar?: () => void,
) {
  const engine = new ScrollbarEngineManager();

  const scrollBy = (amount: number) => {
    if (!contentRef()) return;
    const fastAmount = amount * 3;
    const currentScroll =
      direction() === "horizontal"
        ? contentRef()!.scrollLeft
        : contentRef()!.scrollTop;
    const targetScroll = currentScroll + fastAmount;

    // Use smooth scrolling for better UX
    contentRef()!.scrollTo({
      left: direction() === "horizontal" ? targetScroll : undefined,
      top: direction() === "horizontal" ? undefined : targetScroll,
      behavior: "smooth",
    });

    // handleScroll will be called automatically during smooth scroll
    // No need to manually update here
  };

  const handleWheel = (e: WheelEvent) => {
    if (!contentRef() || !containerRef()) return;

    // Check if content actually needs scrolling
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
      // Content doesn't overflow - don't prevent default, let page scroll
      return;
    }

    // Check if we can scroll in the direction of the wheel
    const currentScroll =
      direction() === "horizontal"
        ? contentRef()!.scrollLeft
        : contentRef()!.scrollTop;
    const maxScroll = contentSize - containerSize;

    let delta: number;
    let isHorizontal: boolean;

    if (direction() === "horizontal") {
      // For horizontal scrollbar use deltaY (most mice don't support deltaX)
      delta = e.deltaY;
      isHorizontal = true;
    } else {
      // For vertical scrollbar use deltaY, but if Shift is pressed - deltaY for horizontal
      delta = e.shiftKey ? e.deltaY : e.deltaY;
      isHorizontal = e.shiftKey;
    }

    // Check if we're at the boundary and trying to scroll further
    const scrollingDown = delta > 0;
    const scrollingUp = delta < 0;
    const atBottom = currentScroll >= maxScroll - 1; // Allow 1px tolerance
    const atTop = currentScroll <= 1; // Allow 1px tolerance

    // If at boundary and trying to scroll further, don't prevent default
    if ((scrollingDown && atBottom) || (scrollingUp && atTop)) {
      return;
    }

    // Only prevent default if we actually need to scroll
    e.preventDefault();
    e.stopPropagation();

    // Handle delta based on deltaMode for standard scroll behavior
    let scrollAmount: number;
    if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      // Delta is in lines - standard is about 16-20px per line
      scrollAmount = delta * 16;
    } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      // Delta is in pages - use container height/width
      scrollAmount = delta * containerSize;
    } else {
      // DOM_DELTA_PIXEL - use delta directly but normalize for standard behavior
      // Standard browsers typically scroll ~40-50px per tick
      // For hyper-scroll, scale down proportionally
      if (Math.abs(delta) > 100) {
        // Hyper-scroll: scale down to reasonable amount
        scrollAmount = delta * 0.2;
      } else {
        // Normal scroll: use delta as-is (browser already provides pixel values)
        scrollAmount = delta;
      }
    }

    // Direct scroll - standard browser behavior (no smooth for wheel)
    if (isHorizontal) {
      contentRef()!.scrollLeft += scrollAmount;
    } else {
      contentRef()!.scrollTop += scrollAmount;
    }

    // Force update thumb position after scrolling
    if (updateScrollbar) {
      setTimeout(updateScrollbar, 0);
    }
  };

  const handleThumbMouseDown = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const trackRect = trackRef()!.getBoundingClientRect();
    const mousePos =
      direction() === "horizontal"
        ? adjustForZoom(e.clientX - trackRect.left)
        : adjustForZoom(e.clientY - trackRect.top);

    const thumbCenter = state().thumbPosition + state().thumbSize / 2;
    const offset = mousePos - thumbCenter;

    setState((prev) => ({
      ...prev,
      isDragging: true,
      dragOffset: offset,
    }));

    if (engineIntegration()) {
      await engine.createPhysicsObject(mousePos, 0);
    }

    document.body.style.userSelect = "none";
  };

  const handleMouseMove = async (e: MouseEvent) => {
    if (!state().isDragging || !trackRef() || !contentRef() || !containerRef())
      return;
    e.preventDefault();

    const trackRect = trackRef()!.getBoundingClientRect();
    const mousePos =
      direction() === "horizontal"
        ? adjustForZoom(e.clientX - trackRect.left)
        : adjustForZoom(e.clientY - trackRect.top);

    if (engineIntegration()) {
      await engine.updatePhysicsObject(mousePos, 0);
    }

    const thumbCenterPos = mousePos - state().dragOffset;
    const newThumbPos = thumbCenterPos - state().thumbSize / 2;

    const arrowSpace = state().showArrows ? 12 : 0;
    const trackSize =
      direction() === "horizontal"
        ? trackRef()!.clientWidth
        : trackRef()!.clientHeight;
    const availableTrackSize = trackSize - arrowSpace * 2;
    const maxThumbPos = availableTrackSize - state().thumbSize;
    const clampedPos = Math.max(
      arrowSpace,
      Math.min(newThumbPos, maxThumbPos + arrowSpace),
    );

    // First update thumb position
    setState((prev) => ({ ...prev, thumbPosition: clampedPos }));

    // Then update scroll position - use container size, not track size
    const containerSize =
      direction() === "horizontal"
        ? containerRef()!.clientWidth
        : containerRef()!.clientHeight;
    const contentSize =
      direction() === "horizontal"
        ? contentRef()!.scrollWidth
        : contentRef()!.scrollHeight;
    const maxScroll = contentSize - containerSize;

    const adjustedThumbPos = clampedPos - arrowSpace;
    const availableScrollSize = availableTrackSize - state().thumbSize;
    const scrollRatio = Math.max(
      0,
      Math.min(1, adjustedThumbPos / availableScrollSize),
    );
    const scrollPos = scrollRatio * maxScroll;

    // Instant scroll without animation
    if (direction() === "horizontal") {
      contentRef()!.scrollLeft = scrollPos;
    } else {
      contentRef()!.scrollTop = scrollPos;
    }
  };

  const handleMouseUp = () => {
    setState((prev) => ({
      ...prev,
      isDragging: false,
      dragOffset: 0,
    }));
    document.body.style.userSelect = "";
  };

  const handleTrackClick = (e: MouseEvent) => {
    if (!trackRef() || !contentRef() || !thumbRef() || !containerRef()) return;
    if (e.target === thumbRef()) return;

    const trackRect = trackRef()!.getBoundingClientRect();
    const clickPosition =
      direction() === "horizontal"
        ? adjustForZoom(e.clientX - trackRect.left)
        : adjustForZoom(e.clientY - trackRect.top);

    const arrowSpace = state().showArrows ? 12 : 0;
    const availableTrackSize =
      (direction() === "horizontal"
        ? trackRef()!.clientWidth
        : trackRef()!.clientHeight) -
      arrowSpace * 2;
    const adjustedClickPos = clickPosition - arrowSpace;
    const newThumbPos = adjustedClickPos - state().thumbSize / 2;
    const maxThumbPos = availableTrackSize - state().thumbSize;
    const clampedThumbPos =
      Math.max(0, Math.min(newThumbPos, maxThumbPos)) + arrowSpace;

    setState((prev) => ({ ...prev, thumbPosition: clampedThumbPos }));

    // Use container size, not track size
    const containerSize =
      direction() === "horizontal"
        ? containerRef()!.clientWidth
        : containerRef()!.clientHeight;
    const contentSize =
      direction() === "horizontal"
        ? contentRef()!.scrollWidth
        : contentRef()!.scrollHeight;
    const maxScroll = contentSize - containerSize;

    const adjustedThumbPos = clampedThumbPos - arrowSpace;
    const scrollRatio = Math.max(
      0,
      Math.min(1, adjustedThumbPos / maxThumbPos),
    );
    const scrollPos = scrollRatio * maxScroll;

    if (direction() === "horizontal") {
      contentRef()!.scrollLeft = scrollPos;
    } else {
      contentRef()!.scrollTop = scrollPos;
    }
  };

  return {
    scrollBy,
    handleWheel,
    handleThumbMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTrackClick,
  };
}
