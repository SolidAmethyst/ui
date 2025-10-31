import { Component } from "solid-js";

interface ScrollbarThumbProps {
  direction: "horizontal" | "vertical";
  thumbSize: number;
  thumbPosition: number;
  isDragging: boolean;
  onMouseDown: (e: MouseEvent) => void;
}

export const ScrollbarThumb: Component<ScrollbarThumbProps> = (props) => {
  return (
    <div
      class={`scrollbar-thumb ${props.isDragging ? "dragging" : ""}`}
      style={{
        width:
          props.direction === "horizontal"
            ? `${Math.max(1, props.thumbSize)}px`
            : "4px",
        height:
          props.direction === "horizontal"
            ? "4px"
            : `${Math.max(1, props.thumbSize)}px`,
        left:
          props.direction === "horizontal"
            ? `${props.thumbPosition}px`
            : "auto",
        top:
          props.direction === "horizontal" ? "50%" : `${props.thumbPosition}px`,
        right: props.direction === "horizontal" ? "auto" : "4px",
        transform:
          props.direction === "horizontal" ? "translateY(-50%)" : "none",
      }}
      onMouseDown={(e) => props.onMouseDown(e)}
    />
  );
};
