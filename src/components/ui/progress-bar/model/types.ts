/**
 * ProgressBar Component Types
 * Progress bar component with determinate and indeterminate variants
 */

import type { JSX } from 'solid-js'

export type ProgressBarVariant = 'determinate' | 'indeterminate'

export interface ProgressBarProps {
	/**
	 * Progress value (0-100) for determinate variant
	 * Ignored for indeterminate variant
	 */
	value?: number

	/**
	 * Variant type (default: 'determinate')
	 */
	variant?: ProgressBarVariant

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Show label with percentage (default: false)
	 */
	showLabel?: boolean

	/**
	 * Custom label text (overrides default percentage)
	 */
	label?: string

	/**
	 * Height of progress bar (default: '8px')
	 */
	height?: string

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}

