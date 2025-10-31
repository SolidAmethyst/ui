/**
 * Button Component Types
 * Reusable button component with multiple variants and states
 */

import type { JSX } from 'solid-js'

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'ghost'
	| 'danger'
	| 'success'
	| 'warning'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonIconPosition = 'left' | 'right' | 'only'

export interface ButtonProps {
	/**
	 * Visual variant of the button
	 */
	variant?: ButtonVariant

	/**
	 * Size of the button
	 */
	size?: ButtonSize

	/**
	 * Whether the button is disabled
	 */
	disabled?: boolean

	/**
	 * Whether the button is in loading state
	 */
	loading?: boolean

	/**
	 * Material Symbols icon name
	 */
	icon?: string

	/**
	 * Position of the icon relative to text
	 */
	iconPosition?: ButtonIconPosition

	/**
	 * Click handler function
	 */
	onClick?: () => void

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Button content (text or JSX elements)
	 */
	children?: JSX.Element

	/**
	 * Tooltip text
	 */
	title?: string

	/**
	 * HTML button type
	 */
	type?: 'button' | 'submit' | 'reset'
}
