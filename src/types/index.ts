// Common types for the UI toolkit
export type { JSX } from "solid-js";

export interface BaseComponentProps {
  class?: string;
  style?: any;
  children?: any;
}

export type ScrollbarDirection = "vertical" | "horizontal";
export type ScrollbarTheme = "default" | "minimal" | "modern";
