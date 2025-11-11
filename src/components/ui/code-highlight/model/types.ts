/**
 * Code Highlight Component Types
 */

import type { Accessor, JSX } from 'solid-js'
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
}
