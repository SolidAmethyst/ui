import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";
import type { ScrollbarProps, ScrollbarState } from "../model/types";
import { useScrollbarConfig } from "./scrollbar-provider";

export function useScrollbarState(props: ScrollbarProps) {
  const config = useScrollbarConfig();

  const showArrows: Accessor<boolean> = () => props.showArrows ?? true;

  const [state, setState] = createSignal<ScrollbarState>({
    thumbSize: 20,
    thumbPosition: 0,
    isVisible: false,
    isDragging: false,
    dragOffset: 0,
    showArrows: showArrows(),
    canScrollUp: false,
    canScrollDown: false,
  });

  // Update showArrows when props change
  createEffect(() => {
    setState((prev) => ({ ...prev, showArrows: showArrows() }));
  });

  const [isHovered, setIsHovered] = createSignal(false);
  const [hideTimeout, setHideTimeout] = createSignal<NodeJS.Timeout | null>(
    null,
  );

  const direction = () => props.direction ?? "vertical";
  const theme = () => props.theme ?? config.config.theme.name;
  const autoHide = () => props.autoHide ?? true;
  const minThumbSize = () => props.minThumbSize ?? 4;
  const engineIntegration = () => {
    if (props.engineIntegration !== undefined) {
      return props.engineIntegration && config.config.engine.enabled;
    }
    return config.config.engine.enabled;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const timeout = hideTimeout();
    if (timeout) {
      clearTimeout(timeout);
      setHideTimeout(null);
    }
    // Don't set isVisible here - updateScrollbar does that
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // No need to hide scrollbar immediately - CSS transition handles fade-out
    // The scrollbar stays in DOM but becomes invisible via CSS class
    // Only set isVisible to false if autoHide is disabled (but that shouldn't happen)
    if (autoHide()) {
      // CSS transition will handle the fade-out animation
      // Track will remain in DOM but opacity goes to 0 via CSS
      const timeout = setTimeout(() => {
        // After transition completes, we can optionally hide it from DOM
        // But keeping it in DOM is fine for smoother animations
        setState((prev) => ({ ...prev, isVisible: false }));
      }, 400); // Delay to allow CSS transition to complete (250ms) + buffer
      setHideTimeout(timeout);
    }
  };

  onCleanup(() => {
    const timeout = hideTimeout();
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  return {
    state,
    setState,
    isHovered,
    setIsHovered,
    hideTimeout,
    setHideTimeout,
    direction,
    theme,
    autoHide,
    minThumbSize,
    engineIntegration,
    showArrows,
    handleMouseEnter,
    handleMouseLeave,
  };
}
