/**
 * Select Component Types
 */

import type { Accessor, JSX } from 'solid-js'

export interface SelectOption<T = string> {
	/**
	 * Option value
	 */
	value: T

	/**
	 * Option label to display
	 */
	label: string

	/**
	 * Optional description
	 */
	description?: string

	/**
	 * Whether the option is disabled
	 */
	disabled?: boolean
}

export interface SelectProps<T = string> {
	/**
	 * Array of select options
	 */
	options: SelectOption<T>[]

	/**
	 * Current selected value
	 */
	value: T

	/**
	 * Callback when value changes
	 */
	onChange: (value: T) => void

	/**
	 * Placeholder text
	 */
	placeholder?: string

	/**
	 * Whether dark theme is active
	 */
	isDark?: Accessor<boolean> | boolean

	/**
	 * Whether the select is disabled
	 */
	disabled?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: JSX.CSSProperties
}
