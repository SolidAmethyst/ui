/**
 * Container Component Types
 * Centered container with max-width constraint
 */

import type { JSX } from 'solid-js'

export interface ContainerProps {
	/**
	 * Maximum width of the container
	 * @default '1400px'
	 */
	maxWidth?: string | number

	/**
	 * Horizontal padding
	 * @default '0 32px'
	 */
	padding?: string

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Container content
	 */
	children?: JSX.Element

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}

