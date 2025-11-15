/**
 * Filter Component Types
 * Filter bar component for advanced filtering options
 */

import type { JSX } from 'solid-js'

export type FilterType = 'checkbox' | 'select' | 'date' | 'range' | 'text'

export interface FilterOption {
	label: string
	value: string | number
	disabled?: boolean
}

export interface FilterItem {
	id: string
	label: string
	type: FilterType
	options?: FilterOption[]
	value?: string | number | string[] | number[]
	placeholder?: string
	min?: number
	max?: number
	step?: number
	disabled?: boolean
}

export interface FilterBarProps {
	/**
	 * Array of filter items
	 */
	filters: FilterItem[]

	/**
	 * Callback when filter values change
	 */
	onFilterChange?: (filterId: string, value: string | number | string[] | number[]) => void

	/**
	 * Callback when all filters change
	 */
	onFiltersChange?: (filters: Record<string, string | number | string[] | number[]>) => void

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Show clear all button
	 */
	showClearAll?: boolean

	/**
	 * Label for clear all button
	 */
	clearAllLabel?: string

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
