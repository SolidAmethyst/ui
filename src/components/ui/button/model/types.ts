/**
 * Button Component Types
 * Based on Tauri project button styles
 */

import type { Component, JSX } from 'solid-js'

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'ghost'
	| 'danger'
	| 'success'
	| 'warning'
	| 'control'
	| 'play-pause'
	| 'small'
	| 'close'
	| 'minimize'
	| 'maximize'
	| 'pin'
	| 'expand'
	| 'copy'
	| 'attach'
	| 'back'
	| 'forward'
	| 'refresh'
	| 'home'
	| 'save'
	| 'download'
	| 'upload'
	| 'edit'
	| 'delete'
	| 'cancel'
	| 'stop'
	| 'skip-next'
	| 'skip-previous'
	| 'fullscreen'
	| 'view-list'
	| 'view-grid'
	| 'search'
	| 'filter'
	| 'share'
	| 'favorite'
	| 'trigger'

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
	 * Whether the icon is filled (for Material Symbols)
	 */
	iconFilled?: boolean

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

	/**
	 * Whether the button is in active state
	 */
	active?: boolean

	/**
	 * Whether the button is pinned (for pin buttons)
	 */
	pinned?: boolean

	/**
	 * Whether the button is maximized (for maximize buttons)
	 */
	maximized?: boolean

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Polymorphic component - render as different element/component
	 * Examples: "a", Component, etc.
	 */
	as?: Component<any> | keyof JSX.IntrinsicElements | string

	/**
	 * Anchor-specific props (when as="a")
	 */
	href?: string
	target?: string
	rel?: string
}
