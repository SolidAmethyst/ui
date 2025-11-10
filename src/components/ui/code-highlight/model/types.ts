/**
 * Code Highlight Component Types
 */

import type { Accessor } from 'solid-js'

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
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: Record<string, string>
}
