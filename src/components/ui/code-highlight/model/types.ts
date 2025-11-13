/**
 * Code Highlight Component Types
 */

import type { Accessor, JSX } from 'solid-js'
// @ts-expect-error - TypeScript module resolution issue with bundler mode
import type { HighlightProfile } from '../../../composites/settings'

export interface CodeHighlightProps {
	/**
	 * Code string to highlight
	 */
	code: string

	/**
	 * Whether dark theme is active
	 */
	isDark: Accessor<boolean> | boolean

	/**
	 * Highlight color profile
	 * @default 'default'
	 */
	highlightProfile?: HighlightProfile

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Copy button title (default: "Copy code")
	 */
	copyButtonTitle?: string

	/**
	 * Copy button text when not copied (default: "Copy")
	 */
	copyButtonText?: string

	/**
	 * Copy button text when copied (default: "Copied!")
	 */
	copiedButtonText?: string

	/**
	 * Timeout in milliseconds before resetting copied state (default: 2000)
	 */
	copiedTimeout?: number
}
