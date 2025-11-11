/**
 * Grid Component Types
 */

import type { JSX } from 'solid-js'

/**
 * Responsive breakpoint configuration
 */
export interface GridBreakpoint {
	/**
	 * Minimum width for this breakpoint (in pixels)
	 */
	minWidth?: number

	/**
	 * Maximum width for this breakpoint (in pixels)
	 */
	maxWidth?: number

	/**
	 * Number of columns for this breakpoint
	 */
	columns?: number | string

	/**
	 * Row template for this breakpoint
	 */
	rows?: string

	/**
	 * Gap for this breakpoint
	 */
	gap?: string | { row?: string; column?: string }

	/**
	 * Minimum column width for this breakpoint
	 */
	minColumnWidth?: string

	/**
	 * Maximum column width for this breakpoint
	 */
	maxColumnWidth?: string

	/**
	 * Use auto-fit for this breakpoint
	 */
	autoFit?: boolean
}

/**
 * Constraint configuration for grid elements
 * Prevents elements from being compressed below specified dimensions
 */
export interface GridElementConstraint {
	/**
	 * CSS selector for target elements
	 * Examples: ".card", "[data-card]", ":first-child", ".row-1"
	 */
	selector: string

	/**
	 * Minimum height in pixels or percentage
	 * Examples: "100px", "20%", 100
	 * Percentage is relative to container height
	 */
	minHeight?: string | number

	/**
	 * Minimum width in pixels or percentage
	 * Examples: "200px", "30%", 200
	 * Percentage is relative to container width
	 */
	minWidth?: string | number

	/**
	 * Priority for this constraint (higher = more important)
	 * When multiple constraints conflict, higher priority wins
	 * Default: 0
	 */
	priority?: number
}

/**
 * Configuration for preserving element area when grid resizes
 */
export interface PreserveAreaConfig {
	/**
	 * Selector for elements that should preserve their area
	 * Examples: "[data-preserve-area]", ".preserve-area", ":last-child"
	 */
	selector?: string

	/**
	 * Base width for area calculation (optional, will use initial width if not provided)
	 * This is the reference width at which the element has its natural height
	 */
	baseWidth?: number

	/**
	 * Base height for area calculation (optional, will use initial height if not provided)
	 * This is the reference height that will scale based on width changes
	 */
	baseHeight?: number

	/**
	 * Minimum height constraint (optional)
	 */
	minHeight?: string

	/**
	 * Maximum height constraint (optional)
	 */
	maxHeight?: string

	/**
	 * Constraints for other grid elements
	 * Prevents specified elements from being compressed below minimum dimensions
	 * Works as soft limits - only applies when element would go below minimum
	 * Useful for maintaining readability of cards that need to shrink to accommodate preserve area
	 *
	 * Example:
	 * ```ts
	 * constraints: [
	 *   { selector: '[data-card]', minHeight: '80px', priority: 1 },
	 *   { selector: '.header', minHeight: '10%', priority: 2 }
	 * ]
	 * ```
	 */
	constraints?: GridElementConstraint[]
}

/**
 * Grid component props
 */
export interface GridProps {
	/**
	 * Number of columns or CSS grid-template-columns value
	 * Examples: 3, "1fr 1fr", "repeat(3, 1fr)", "auto 1fr", "200px 1fr"
	 */
	columns?: number | string

	/**
	 * Grid template rows (CSS grid-template-rows value)
	 * Examples: "1fr 1fr", "repeat(3, 1fr)", "auto 1fr", "32px 1fr"
	 */
	rows?: string

	/**
	 * Gap between grid items
	 * Can be a string (applies to both row and column) or an object with row/column
	 * Examples: "8px", "16px", "1rem", { row: "8px", column: "16px" }
	 */
	gap?: string | { row?: string; column?: string }

	/**
	 * Minimum column width (for auto-fit/auto-fill)
	 * Examples: "200px", "minmax(200px, 1fr)"
	 */
	minColumnWidth?: string

	/**
	 * Maximum column width
	 */
	maxColumnWidth?: string

	/**
	 * Use auto-fit instead of auto-fill (default: false)
	 * auto-fit collapses empty tracks, auto-fill keeps them
	 */
	autoFit?: boolean

	/**
	 * Responsive breakpoints configuration
	 * Grid will automatically adjust based on viewport width
	 */
	breakpoints?: GridBreakpoint[]

	/**
	 * Whether to enable resize observer for dynamic resizing
	 * Default: true
	 */
	observeResize?: boolean

	/**
	 * Configuration for preserving element area when grid resizes
	 * When enabled, specified elements will adjust their height to maintain
	 * consistent area when width changes (e.g., when sidebar opens/closes)
	 */
	preserveArea?: PreserveAreaConfig

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Grid content (children)
	 */
	children?: JSX.Element
}
