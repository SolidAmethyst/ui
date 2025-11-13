/**
 * NumberInput Component Types
 * Input component with spinner arrows and mouse wheel support
 */

import type { JSX } from 'solid-js'

export type NumberInputValue = number | string

export interface NumberInputProps {
	/**
	 * Current value (number or string with units like "12px")
	 */
	value: NumberInputValue

	/**
	 * Value change handler
	 */
	onChange: (value: NumberInputValue) => void

	/**
	 * Minimum value (for numeric values)
	 */
	min?: number

	/**
	 * Maximum value (for numeric values)
	 */
	max?: number

	/**
	 * Step size for increment/decrement (default: 1)
	 */
	step?: number

	/**
	 * Whether to show spinner arrows (default: true)
	 */
	showArrows?: boolean

	/**
	 * Whether to enable mouse wheel scrolling (default: true)
	 */
	enableWheel?: boolean

	/**
	 * Input type: 'number' or 'text' (for values with units like "12px")
	 */
	type?: 'number' | 'text'

	/**
	 * Placeholder text
	 */
	placeholder?: string

	/**
	 * Whether the input is disabled
	 */
	disabled?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Input ID
	 */
	id?: string

	/**
	 * Input name
	 */
	name?: string

	/**
	 * Focus handler
	 */
	onFocus?: (e: FocusEvent) => void

	/**
	 * Blur handler
	 */
	onBlur?: (e: FocusEvent) => void

	/**
	 * Input handler (for direct text input)
	 */
	onInput?: (e: Event) => void

	/**
	 * Whether to auto-validate and format value on blur (for string values with units)
	 * Default: true
	 */
	autoValidate?: boolean

	/**
	 * Default unit to append if value is a number without unit (e.g., "px")
	 * Only used when type="text" and autoValidate is true
	 */
	defaultUnit?: string

	/**
	 * Whether the component should use theme-aware styles
	 * If true, uses CSS variables for colors based on data-theme attribute
	 */
	themeAware?: boolean

	/**
	 * Title for increase button (default: "Increase")
	 */
	increaseButtonTitle?: string

	/**
	 * Title for decrease button (default: "Decrease")
	 */
	decreaseButtonTitle?: string

	/**
	 * Unit pattern regex for validation (default: /^-?\d+px$/)
	 * Only used when type="text" and autoValidate is true
	 */
	unitPattern?: RegExp
}
