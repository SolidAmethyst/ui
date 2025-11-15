/**
 * Tabs Component Exports
 * Public API for the Tabs component
 */

// Preview/Code tabs component (for documentation)
export { Tabs } from "./ui/tabs";

// Universal tabs components (for real applications)
export { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./lib/tabs-ui";

// Types
export type { TabsProps } from "./model/types";
export type { TabsStyleOptions } from "./lib/tabs.styles";
export type { TabsUIStyleOptions } from "./lib/tabs-ui.styles";

// Styles (for advanced usage)
export { tabsStyles } from "./lib/tabs.styles";
export { tabsUIStyles } from "./lib/tabs-ui.styles";
