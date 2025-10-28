// Main entry point for the library
export * from "./components/ui/scrollbar";
export * from "./lib/utils";
export * from "./types";
export * from "./engines";

// Re-export types
export type { ScrollbarDirection, ScrollbarTheme } from "./types";
export type { UIEngine, EngineState, EngineConfig } from "./engines";
