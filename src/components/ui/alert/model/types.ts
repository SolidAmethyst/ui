/**
 * Alert Component Types
 * Alert component for displaying inline messages
 */

import type { JSX } from 'solid-js'

export type AlertVariant = 'success' | 'error' | 'warning' | 'info'

export interface AlertProps {
	/**
	 * Alert variant (default: 'info')
	 */
	variant?: AlertVariant

	/**
	 * Alert title
	 */
	title?: string

	/**
	 * Alert description/content
	 */
	description?: string

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Whether to show close button (default: false)
	 */
	showClose?: boolean

	/**
	 * Callback when alert is closed
	 */
	onClose?: () => void

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Alert content (alternative to description)
	 */
	children?: JSX.Element
}

