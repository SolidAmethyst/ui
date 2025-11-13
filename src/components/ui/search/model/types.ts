/**
 * Search Component Types
 */

import type { JSX } from 'solid-js'

export interface SearchProps {
	/**
	 * Current search value
	 */
	value?: string

	/**
	 * Placeholder text
	 */
	placeholder?: string

	/**
	 * Whether the search is disabled
	 */
	disabled?: boolean

	/**
	 * Dark theme mode (boolean or accessor)
	 */
	isDark?: boolean | (() => boolean)

	/**
	 * Debounce delay in milliseconds (default: 300)
	 */
	debounceMs?: number

	/**
	 * Callback fired when search value changes (after debounce)
	 */
	onSearch?: (value: string) => void

	/**
	 * Callback fired immediately on input change (before debounce)
	 */
	onInput?: (value: string) => void

	/**
	 * Show search icon
	 */
	showIcon?: boolean

	/**
	 * Show clear button when there's a value
	 */
	showClear?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: JSX.CSSProperties

	/**
	 * Input name attribute
	 */
	name?: string

	/**
	 * Input id attribute
	 */
	id?: string

	/**
	 * Auto-focus the input
	 */
	autofocus?: boolean
}
