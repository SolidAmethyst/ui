// Scrollbar component exports
export { Scrollbar } from "./ui/scrollbar";
export { ScrollbarArrows } from "./ui/scrollbar-arrows";
export { ScrollbarThumb } from "./ui/scrollbar-thumb";

// Hooks
export { useScrollbarHandlers } from "./lib/use-scrollbar-handlers";
export { useScrollbarLogic } from "./lib/use-scrollbar-logic";
export { useScrollbarObservers } from "./lib/use-scrollbar-observers";
export { useScrollbarState } from "./lib/use-scrollbar-state";

// Provider and config
export { scrollbarConfig } from "./lib/scrollbar-config";
export { ScrollbarControls } from "./lib/scrollbar-controls";
export {
  ScrollbarProvider,
  useScrollbarConfig,
} from "./lib/scrollbar-provider";

// Styles
export { scrollbarStyles } from "./lib/scrollbar.styles";

// Types
export type { ScrollbarConfig } from "./lib/scrollbar-config";
export type {
  ScrollbarDirection,
  ScrollbarProps,
  ScrollbarTheme,
} from "./model/types";
