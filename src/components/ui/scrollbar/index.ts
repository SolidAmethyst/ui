// Scrollbar component exports
export { Scrollbar } from './ui/scrollbar'
export { ScrollbarArrows } from './ui/scrollbar-arrows'
export { ScrollbarThumb } from './ui/scrollbar-thumb'

// Hooks
export { useScrollbarState } from './lib/use-scrollbar-state'
export { useScrollbarHandlers } from './lib/use-scrollbar-handlers'
export { useScrollbarLogic } from './lib/use-scrollbar-logic'
export { useScrollbarObservers } from './lib/use-scrollbar-observers'

// Provider and config
export { ScrollbarProvider, useScrollbarConfig } from './lib/scrollbar-provider'
export { ScrollbarControls } from './lib/scrollbar-controls'
export { scrollbarConfig } from './lib/scrollbar-config'

// Styles
export { scrollbarStyles } from './lib/scrollbar.styles'

// Types
export type { ScrollbarProps, ScrollbarDirection, ScrollbarTheme } from './model/types'
export type { ScrollbarConfig } from './lib/scrollbar-config'