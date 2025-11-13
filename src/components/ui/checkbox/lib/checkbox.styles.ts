/**
 * Checkbox Component Styles
 */

import type { JSX } from 'solid-js'

export interface CheckboxStyleOptions {
	isDark?: boolean
	disabled?: boolean
	checked?: boolean
	indeterminate?: boolean
}

export const checkboxStyles = {
	container: (): JSX.CSSProperties => ({
		display: 'inline-flex',
		'align-items': 'center',
		gap: '8px',
		cursor: 'pointer',
		'user-select': 'none'
	}),

	containerDisabled: (): JSX.CSSProperties => ({
		cursor: 'not-allowed',
		opacity: '0.5'
	}),

	input: (options?: CheckboxStyleOptions): JSX.CSSProperties => {
		const isDark = options?.isDark ?? false
		const disabled = options?.disabled ?? false
		const checked = options?.checked ?? false
		const indeterminate = options?.indeterminate ?? false

		return {
			width: '18px',
			height: '18px',
			margin: '0',
			cursor: disabled ? 'not-allowed' : 'pointer',
			'accent-color': isDark ? '#3b82f6' : '#2563eb',
			// Custom styling for checkbox
			appearance: 'none',
			'-webkit-appearance': 'none',
			'-moz-appearance': 'none',
			'border-radius': '4px',
			border: `2px solid ${
				checked || indeterminate
					? isDark
						? '#3b82f6'
						: '#2563eb'
					: isDark
						? 'rgba(255, 255, 255, 0.3)'
						: 'rgba(0, 0, 0, 0.3)'
			}`,
			background:
				checked || indeterminate
					? isDark
						? '#3b82f6'
						: '#2563eb'
					: isDark
						? 'rgba(255, 255, 255, 0.05)'
						: 'rgba(0, 0, 0, 0.02)',
			transition: 'all 150ms ease',
			position: 'relative',
			'box-sizing': 'border-box',
			'flex-shrink': '0',
			'align-self': 'center'
		}
	},

	inputHover: (options?: CheckboxStyleOptions): JSX.CSSProperties => {
		const isDark = options?.isDark ?? false
		const disabled = options?.disabled ?? false
		const checked = options?.checked ?? false
		const indeterminate = options?.indeterminate ?? false

		if (disabled) {
			return {}
		}

		return {
			'border-color':
				checked || indeterminate
					? isDark
						? '#60a5fa'
						: '#3b82f6'
					: isDark
						? 'rgba(255, 255, 255, 0.5)'
						: 'rgba(0, 0, 0, 0.5)'
		}
	},

	inputFocus: (options?: CheckboxStyleOptions): JSX.CSSProperties => {
		const isDark = options?.isDark ?? false

		return {
			outline: 'none',
			'box-shadow': `0 0 0 3px ${
				isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.3)'
			}`
		}
	},

	label: (options?: CheckboxStyleOptions): JSX.CSSProperties => {
		const isDark = options?.isDark ?? false
		const disabled = options?.disabled ?? false

		return {
			'font-size': '0.875rem',
			color: disabled
				? isDark
					? 'rgba(255, 255, 255, 0.4)'
					: 'rgba(0, 0, 0, 0.4)'
				: isDark
					? '#f6f6f6'
					: '#1a1a1a',
			'line-height': '1',
			cursor: disabled ? 'not-allowed' : 'pointer',
			'user-select': 'none'
		}
	}
} as const
