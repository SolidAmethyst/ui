/**
 * Modal Component Types
 * Modal dialog component with overlay and focus trap
 */

import type { JSX } from 'solid-js'

export interface ModalProps {
	/**
	 * Whether the modal is open
	 */
	isOpen: boolean

	/**
	 * Callback when modal should be closed
	 */
	onClose: () => void

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
	 * Whether to close on Escape key (default: true)
	 */
	closeOnEscape?: boolean

	/**
	 * Whether to trap focus inside modal (default: true)
	 */
	trapFocus?: boolean

	/**
	 * Custom z-index for modal (default: 10000)
	 */
	zIndex?: number

	/**
	 * Modal size (default: 'auto')
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Modal content
	 */
	children?: JSX.Element

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}

