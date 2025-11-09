/**
 * CodeHighlight component types
 */

export interface CodeHighlightProps {
	/**
	 * Code string to highlight
	 */
	code: string

	/**
	 * Dark theme accessor
	 */
	isDark: () => boolean

	/**
	 * Optional CSS class name
	 */
	class?: string

	/**
	 * Optional inline styles
	 */
	style?: JSX.CSSProperties
}

