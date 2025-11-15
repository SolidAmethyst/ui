import { Component } from "solid-js";

interface ScrollbarArrowsProps {
  direction: "horizontal" | "vertical";
  canScrollUp: boolean;
  canScrollDown: boolean;
  onScrollBy: (amount: number) => void;
}

export const ScrollbarArrows: Component<ScrollbarArrowsProps> = (props) => {
  const handleArrowClick = (e: MouseEvent, amount: number) => {
    e.stopPropagation();
    props.onScrollBy(amount);
  };

  return (
    <>
      {props.direction === "vertical" ? (
        <>
          <div class="scrollbar-arrow-up">
            <button
              class={`scrollbar-arrow ${!props.canScrollUp ? "disabled" : ""}`}
              disabled={!props.canScrollUp}
              onClick={(e) => handleArrowClick(e, -50)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
              </svg>
            </button>
          </div>
          <div class="scrollbar-arrow-down">
            <button
              class={`scrollbar-arrow ${!props.canScrollDown ? "disabled" : ""}`}
              disabled={!props.canScrollDown}
              onClick={(e) => handleArrowClick(e, 50)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div class="scrollbar-arrow-left">
            <button
              class={`scrollbar-arrow ${!props.canScrollUp ? "disabled" : ""}`}
              disabled={!props.canScrollUp}
              onClick={(e) => handleArrowClick(e, -50)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
          </div>
          <div class="scrollbar-arrow-right">
            <button
              class={`scrollbar-arrow ${!props.canScrollDown ? "disabled" : ""}`}
              disabled={!props.canScrollDown}
              onClick={(e) => handleArrowClick(e, 50)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  );
};
