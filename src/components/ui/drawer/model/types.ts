/**
 * Drawer Component Types
 * Universal sliding panel component
 */

import type { JSX } from 'solid-js'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
	/**
	 * Whether the drawer is open
	 */
	isOpen: boolean

	/**
	 * Callback when drawer should be closed
	 */
	onClose: () => void

	/**
	 * Drawer position (default: 'right')
	 */
	position?: DrawerPosition

	/**
	 * Drawer width (for left/right position) or height (for top/bottom position)
	 * Default: '320px' for left/right, '50vh' for top/bottom
	 */
	size?: string

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Whether to show backdrop (default: true)
	 */
	showBackdrop?: boolean

	/**
	 * Whether to close on backdrop click (default: true)
	 */
	closeOnBackdropClick?: boolean

	/**
	 * Custom z-index for drawer (default: 10000)
	 */
	zIndex?: number

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Drawer content
	 */
	children?: JSX.Element

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}

