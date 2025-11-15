/**
 * Checkbox Component Types
 */

import type { JSX } from 'solid-js'

export interface CheckboxProps {
	/**
	 * Whether the checkbox is checked
	 */
	checked?: boolean

	/**
	 * Whether the checkbox is disabled
	 */
	disabled?: boolean

	/**
	 * Whether the checkbox is in indeterminate state
	 */
	indeterminate?: boolean

	/**
	 * Label text for the checkbox
	 */
	label?: string

	/**
	 * Whether the label should be positioned on the right (default) or left
	 */
	labelPosition?: 'left' | 'right'

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Change handler function
	 */
	onChange?: (checked: boolean) => void

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties

	/**
	 * HTML input name attribute
	 */
	name?: string

	/**
	 * HTML input value attribute
	 */
	value?: string

	/**
	 * HTML input id attribute
	 */
	id?: string

	/**
	 * Material 3 style - no border, just checkmark icon
	 */
	material3?: boolean

	/**
	 * HTML title attribute for tooltip
	 */
	title?: string
}
