/**
 * Typography Component Types
 */

import type { JSX } from 'solid-js'

export type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body'
	| 'body-large'
	| 'small'
	| 'caption'
	| 'label'

export interface TypographyProps {
	/**
	 * Typography variant (h1, h2, h3, body, etc.)
	 * @default 'body'
	 */
	variant?: TypographyVariant

	/**
	 * Whether the theme is dark
	 */
	isDark?: boolean

	/**
	 * HTML element to render (overrides variant default)
	 */
	as?: keyof JSX.IntrinsicElements

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Content
	 */
	children?: JSX.Element
}

