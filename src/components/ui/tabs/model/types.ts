/**
 * Tabs Component Types
 */

import type { Accessor, JSX } from 'solid-js'

export interface TabsProps {
	/**
	 * Preview content to show in preview tab
	 */
	preview: JSX.Element

	/**
	 * Code string to show in code tab
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

