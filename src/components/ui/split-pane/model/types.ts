/**
 * SplitPane Component Types
 * Split pane component for resizable panels
 */

import type { JSX } from 'solid-js'

export type SplitPaneDirection = 'horizontal' | 'vertical'

export interface SplitPaneProps {
	/**
	 * First panel content
	 */
	first: JSX.Element

	/**
	 * Second panel content
	 */
	second: JSX.Element

	/**
	 * Split direction (default: 'horizontal')
	 */
	direction?: SplitPaneDirection

	/**
	 * Initial split position as percentage (0-100, default: 50)
	 */
	defaultSplit?: number

	/**
	 * Controlled split position as percentage (0-100)
	 */
	split?: number

	/**
	 * Callback when split position changes
	 */
	onSplitChange?: (split: number) => void

	/**
	 * Minimum size for first panel as percentage (default: 10)
	 */
	minFirst?: number

	/**
	 * Maximum size for first panel as percentage (default: 90)
	 */
	maxFirst?: number

	/**
	 * Minimum size for second panel as percentage (default: 10)
	 */
	minSecond?: number

	/**
	 * Maximum size for second panel as percentage (default: 90)
	 */
	maxSecond?: number

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Show resize handle
	 */
	showHandle?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
