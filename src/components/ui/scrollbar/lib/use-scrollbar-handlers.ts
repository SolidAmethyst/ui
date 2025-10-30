import { adjustForZoom } from "./scrollbar-calculations";
import { ScrollbarEngineManager } from "./scrollbar-engine";

export function useScrollbarHandlers(
  state: any,
  setState: any,
  direction: () => string,
  _containerRef: () => HTMLDivElement | undefined,
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
    if (direction() === "horizontal") {
      contentRef()!.scrollLeft += fastAmount;
    } else {
      contentRef()!.scrollTop += fastAmount;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (!contentRef()) return;
    e.preventDefault();

    let delta: number;
    let isHorizontal: boolean;

    if (direction() === "horizontal") {
      // Для горизонтального скроллбара используем deltaY (большинство мышей не поддерживают deltaX)
      delta = e.deltaY;
      isHorizontal = true;
    } else {
      // Для вертикального скроллбара используем deltaY, но если зажат Shift - deltaY для горизонтали
      delta = e.shiftKey ? e.deltaY : e.deltaY;
      isHorizontal = e.shiftKey;
    }

    const scrollAmount = delta * 0.5; // Меньше чувствительность

    if (isHorizontal) {
      contentRef()!.scrollLeft += scrollAmount;
    } else {
      contentRef()!.scrollTop += scrollAmount;
    }

    // Принудительно обновляем позицию слайдера после прокрутки
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

    setState((prev: any) => ({
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
    if (!state().isDragging || !trackRef() || !contentRef()) return;
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

    // Сначала обновляем позицию слайдера
    setState((prev: any) => ({ ...prev, thumbPosition: clampedPos }));

    // Затем обновляем позицию скролла
    const containerSize =
      direction() === "horizontal"
        ? trackRef()!.clientWidth
        : trackRef()!.clientHeight;
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

    // Мгновенная прокрутка без анимации
    if (direction() === "horizontal") {
      contentRef()!.scrollLeft = scrollPos;
    } else {
      contentRef()!.scrollTop = scrollPos;
    }
  };

  const handleMouseUp = () => {
    setState((prev: any) => ({
      ...prev,
      isDragging: false,
      dragOffset: 0,
    }));
    document.body.style.userSelect = "";
  };

  const handleTrackClick = (e: MouseEvent) => {
    if (!trackRef() || !contentRef() || !thumbRef()) return;
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

    setState((prev: any) => ({ ...prev, thumbPosition: clampedThumbPos }));

    const containerSize =
      direction() === "horizontal"
        ? trackRef()!.clientWidth
        : trackRef()!.clientHeight;
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
