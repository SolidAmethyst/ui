/**
 * Menu Component Types
 */

import type { JSX } from 'solid-js'

export interface MenuItem {
	/**
	 * Unique identifier for the menu item
	 */
	id?: string

	/**
	 * Display label (required when separator is false)
	 */
	label?: string

	/**
	 * Material Symbols icon name
	 */
	icon?: string

	/**
	 * Click handler
	 */
	onClick?: () => void

	/**
	 * Whether the item is disabled
	 */
	disabled?: boolean

	/**
	 * Whether the item is a separator
	 */
	separator?: boolean

	/**
	 * Submenu items (nested menu)
	 */
	children?: MenuItem[]
}

export interface MenuProps {
	/**
	 * Whether the menu is open
	 */
	open: boolean

	/**
	 * Callback when menu should close
	 */
	onClose: () => void

	/**
	 * Menu items to display
	 */
	items: MenuItem[]

	/**
	 * Anchor element reference for positioning
	 */
	anchorRef?: HTMLElement | null

	/**
	 * Menu position relative to anchor
	 */
	position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom content (replaces items if provided)
	 */
	children?: JSX.Element
}
