/**
 * Command Component Exports
 * Public API for the Command component
 */

// Main component
export { Command } from "./ui/command";

// Types
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandItemProps,
  CommandGroupProps,
  CommandSeparatorProps,
  CommandEmptyProps,
  CommandLoadingProps,
  CommandShortcutProps,
} from "./model/types";

// Styles (for advanced usage)
export { commandStyles } from "./lib/command.styles";
export type { CommandStyleOptions } from "./lib/command.styles";
