/**
 * Search Component Styles
 */

import type { JSX } from 'solid-js'

export interface SearchStyleOptions {
	isDark: boolean
	isDisabled: boolean
	isFocused: boolean
}

export const searchStyles = {
	container: (): JSX.CSSProperties => ({
		position: 'relative',
		width: '100%',
		'box-sizing': 'border-box'
	}),

	wrapper: (): JSX.CSSProperties => ({
		position: 'relative',
		display: 'flex',
		'align-items': 'center',
		width: '100%',
		'box-sizing': 'border-box'
	}),

	input: (options: SearchStyleOptions): JSX.CSSProperties => ({
		width: '100%',
		padding: 'var(--search-padding, 8px 12px 8px 40px)',
		'font-size': 'var(--search-font-size, 14px)',
		'font-weight': '400',
		'line-height': '1.5',
		border: `1px solid ${
			options.isFocused
				? options.isDark
					? '#3b82f6'
					: '#2563eb'
				: options.isDark
					? 'rgba(255, 255, 255, 0.1)'
					: 'rgba(0, 0, 0, 0.1)'
		}`,
		'border-radius': 'var(--search-border-radius, 8px)',
		background: options.isDisabled
			? options.isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
			: options.isDark
				? 'rgba(255, 255, 255, 0.05)'
				: '#ffffff',
		color: options.isDisabled
			? options.isDark
				? 'rgba(246, 246, 246, 0.4)'
				: 'rgba(26, 26, 26, 0.4)'
			: options.isDark
				? '#f6f6f6'
				: '#1a1a1a',
		cursor: options.isDisabled ? 'not-allowed' : 'text',
		transition: 'all 0.2s ease',
		'box-sizing': 'border-box',
		outline: 'none',
		'text-align': 'left'
	}),

	inputHover: (): JSX.CSSProperties => ({
		// Hover styles can be applied via CSS or inline styles
		// This is kept for consistency with other components
	}),

	icon: (options: SearchStyleOptions): JSX.CSSProperties => ({
		position: 'absolute',
		left: 'var(--search-icon-left, 12px)',
		'font-size': 'var(--search-icon-size, 20px)',
		color: options.isDisabled
			? options.isDark
				? 'rgba(246, 246, 246, 0.3)'
				: 'rgba(26, 26, 26, 0.3)'
			: options.isDark
				? 'rgba(246, 246, 246, 0.6)'
				: 'rgba(26, 26, 26, 0.6)',
		'pointer-events': 'none',
		'z-index': '1',
		transition: 'color 0.2s ease'
	}),

	clearButton: (options: SearchStyleOptions): JSX.CSSProperties => ({
		position: 'absolute',
		right: 'var(--search-clear-right, 8px)',
		width: 'var(--search-clear-size, 20px)',
		height: 'var(--search-clear-size, 20px)',
		padding: '0',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		'font-size': 'var(--search-clear-icon-size, 16px)',
		border: 'none',
		'border-radius': 'var(--radius-sm, 4px)',
		background: 'transparent',
		color: options.isDark
			? 'rgba(246, 246, 246, 0.6)'
			: 'rgba(26, 26, 26, 0.6)',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'z-index': '1',
		outline: 'none'
	}),

	clearButtonHover: (options: SearchStyleOptions): JSX.CSSProperties => ({
		background: options.isDark
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.05)',
		color: options.isDark ? '#f6f6f6' : '#1a1a1a'
	})
} as const

