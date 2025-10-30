// Scrollbar types and interfaces
import { JSX } from "solid-js";

export type ScrollbarDirection = "vertical" | "horizontal";

export type ScrollbarTheme = "default" | "minimal" | "modern";

export interface ScrollbarProps {
  children: JSX.Element;
  direction?: ScrollbarDirection;
  theme?: ScrollbarTheme;
  class?: string;
  style?: JSX.CSSProperties;
  showArrows?: boolean;
  autoHide?: boolean;
  minThumbSize?: number;
  engineIntegration?: boolean;
}

export interface ScrollbarState {
  thumbSize: number;
  thumbPosition: number;
  isVisible: boolean;
  isDragging: boolean;
  dragOffset: number;
  showArrows: boolean;
  canScrollUp: boolean;
  canScrollDown: boolean;
}

export interface ScrollbarEngine {
  physicsObjectId?: number;
  velocity: number;
  acceleration: number;
}
