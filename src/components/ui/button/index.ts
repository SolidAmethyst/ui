/**
 * Button Component Exports
 * Public API for the Button component
 */

// Main component
export { Button } from "./ui/button";

// Types
export type {
  ButtonIconPosition,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./model/types";

// Variants helper (for advanced usage)
export { buttonVariants } from "./lib/button-variants";
export type { ButtonVariantsOptions } from "./lib/button-variants";

// Styles (for advanced usage)
export { buttonStyles } from "./lib/button.styles";
