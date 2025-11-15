import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { ScrollbarProvider } from "../lib/scrollbar-provider";
import { useScrollbarHandlers } from "../lib/use-scrollbar-handlers";
import { useScrollbarLogic } from "../lib/use-scrollbar-logic";
import { useScrollbarObservers } from "../lib/use-scrollbar-observers";
import { useScrollbarState } from "../lib/use-scrollbar-state";
import type { ScrollbarProps } from "../model/types";
import { ScrollbarArrows } from "./scrollbar-arrows";
import { ScrollbarThumb } from "./scrollbar-thumb";

const ScrollbarComponent = (props: ScrollbarProps) => {
  // Refs
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const [contentRef, setContentRef] = createSignal<HTMLDivElement>();
  const [trackRef, setTrackRef] = createSignal<HTMLDivElement>();
  const [thumbRef] = createSignal<HTMLDivElement>();

  // State hook
  const {
    state,
    setState,
    isHovered,
    direction,
    autoHide,
    engineIntegration,
    handleMouseEnter,
    handleMouseLeave,
  } = useScrollbarState(props);

  // Logic hook
  const { updateScrollbar, handleScroll } = useScrollbarLogic(
    state,
    setState,
    direction,
    containerRef,
    contentRef,
    trackRef,
  );

  // Handlers hook
  const {
    scrollBy,
    handleWheel,
    handleThumbMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTrackClick,
  } = useScrollbarHandlers(
    state,
    setState,
    direction,
    containerRef,
    contentRef,
    trackRef,
    thumbRef,
    engineIntegration,
    updateScrollbar,
  );

  // Observers hook
  const { setupObservers } = useScrollbarObservers(
    containerRef,
    contentRef,
    updateScrollbar,
  );

  // Determine if scrollbar should be rendered (when content needs scrolling)
  const shouldRenderScrollbar = () => state().isVisible;

  // Track visibility state for smooth animation
  const [shouldBeVisible, setShouldBeVisible] = createSignal(false);

  // Determine if scrollbar should be visible (opacity animation)
  const shouldShowScrollbar = () => {
    return isHovered() || !autoHide() || state().isDragging;
  };

  // Handle smooth appearance - ensure transition works on first render
  createEffect(() => {
    const needsToShow = shouldShowScrollbar();
    const isRendered = shouldRenderScrollbar();

    if (needsToShow && isRendered) {
      // Use requestAnimationFrame to ensure DOM is ready before adding class
      // This allows CSS transition to work properly
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldBeVisible(true);
        });
      });
    } else {
      // Hide immediately - fade-out transition works fine
      setShouldBeVisible(false);
    }
  });

  onMount(() => {
    // Wait for full content load - multiple attempts
    const initScrollbar = () => {
      updateScrollbar();
    };

    // Multiple attempts for full content load
    initScrollbar();
    setTimeout(initScrollbar, 0);
    setTimeout(initScrollbar, 50);
    setTimeout(initScrollbar, 100);
    setTimeout(initScrollbar, 200);
    setTimeout(initScrollbar, 500);
    setTimeout(initScrollbar, 1000);
    setTimeout(initScrollbar, 2000);

    // Setup scroll listener
    if (contentRef()) {
      contentRef()!.addEventListener("scroll", handleScroll);
      // Add wheel event listener directly to contentRef to ensure it works
      contentRef()!.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Setup observers
    const cleanupObservers = setupObservers();

    // Global mouse events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    onCleanup(() => {
      cleanupObservers?.();
      if (contentRef()) {
        contentRef()!.removeEventListener("scroll", handleScroll);
        contentRef()!.removeEventListener("wheel", handleWheel);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    });
  });

  return (
    <div
      ref={setContainerRef}
      class={`scrollbar-container ${props.class || ""}`}
      style={props.style}
      onMouseEnter={() => {
        handleMouseEnter();
        updateScrollbar(); // Check if scrollbar is needed on hover
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={setContentRef}
        class="scrollbar-content"
        style={{
          "overflow-y": direction() === "vertical" ? "scroll" : "hidden",
          "overflow-x": direction() === "horizontal" ? "scroll" : "hidden",
        }}
      >
        {props.children}
      </div>

      {shouldRenderScrollbar() && (
        <div
          ref={setTrackRef}
          class={`scrollbar-track ${
            direction() === "horizontal"
              ? "scrollbar-track-horizontal"
              : "scrollbar-track-vertical"
          } ${shouldBeVisible() ? "visible" : ""}`}
          onClick={handleTrackClick}
        >
          {/* Arrow buttons */}
          {state().showArrows && (
            <ScrollbarArrows
              direction={direction()}
              canScrollUp={state().canScrollUp}
              canScrollDown={state().canScrollDown}
              onScrollBy={scrollBy}
            />
          )}

          {/* Thumb */}
          <ScrollbarThumb
            direction={direction()}
            thumbSize={state().thumbSize}
            thumbPosition={state().thumbPosition}
            isDragging={state().isDragging}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
};

export const Scrollbar = (props: ScrollbarProps) => {
  return (
    <ScrollbarProvider>
      <ScrollbarComponent {...props} />
    </ScrollbarProvider>
  );
};
