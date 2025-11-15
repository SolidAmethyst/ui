/**
 * Icon Component Types
 * Material 3 SVG icon component
 */

import type { JSX } from 'solid-js'

export type IconVariant = 'rounded' | 'sharp' | 'outlined'

export interface IconProps {
	/**
	 * Material Symbols icon name (e.g., 'home', 'settings', 'close')
	 */
	name: string

	/**
	 * Icon size in pixels or CSS value (default: 24px)
	 */
	size?: number | string

	/**
	 * Icon color (default: currentColor)
	 */
	color?: string

	/**
	 * Icon variant: rounded, sharp, or outlined (default: rounded)
	 */
	variant?: IconVariant

	/**
	 * Whether icon is filled (default: false)
	 */
	filled?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties

	/**
	 * ARIA label for accessibility
	 */
	'aria-label'?: string

	/**
	 * Whether icon is decorative (aria-hidden)
	 */
	'aria-hidden'?: boolean
}
