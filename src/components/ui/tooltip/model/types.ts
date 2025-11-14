/**
 * Tooltip Component Types
 * Tooltip component with positioning
 */

import type { JSX } from 'solid-js'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
	/**
	 * Tooltip content
	 */
	content: string | JSX.Element

	/**
	 * Tooltip position (default: 'top')
	 */
	position?: TooltipPosition

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Delay before showing tooltip in milliseconds (default: 300)
	 */
	delay?: number

	/**
	 * Whether to show tooltip on focus (default: true)
	 */
	showOnFocus?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Child element that triggers the tooltip
	 */
	children: JSX.Element
}
