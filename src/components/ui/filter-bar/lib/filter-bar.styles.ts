/**
 * FilterBar Component Styles
 * Styles for filter bar component using CSS variables
 */

import type { JSX } from 'solid-js'

export const filterBarStyles = {
	container: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'flex-wrap': 'wrap',
		gap: 'var(--filter-bar-gap, 12px)',
		'align-items': 'center',
		padding: 'var(--filter-bar-padding, 12px 16px)',
		background: isDark
			? 'hsla(var(--background) / 0.5)'
			: 'hsla(var(--background) / 0.8)',
		'backdrop-filter': 'blur(var(--filter-bar-blur, 8px))',
		'-webkit-backdrop-filter': 'blur(var(--filter-bar-blur, 8px))',
		border: `1px solid ${
			isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		'border-radius': 'var(--filter-bar-border-radius, 8px)',
		'box-shadow': isDark
			? '0 2px 8px rgba(0, 0, 0, 0.2)'
			: '0 2px 8px rgba(0, 0, 0, 0.1)'
	}),

	filterItem: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		gap: 'var(--filter-bar-item-gap, 4px)',
		'min-width': 'var(--filter-bar-item-min-width, 120px)'
	}),

	filterLabel: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': 'var(--filter-bar-label-font-size, 12px)',
		'font-weight': '500',
		color: isDark
			? 'hsla(var(--foreground) / 0.7)'
			: 'hsla(var(--foreground) / 0.8)',
		'line-height': '1.2'
	}),

	filterInput: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		padding: 'var(--filter-bar-input-padding, 6px 10px)',
		'font-size': 'var(--filter-bar-input-font-size, 14px)',
		'border-radius': 'var(--filter-bar-input-border-radius, 6px)',
		border: `1px solid ${
			disabled
				? isDark
					? 'rgba(255, 255, 255, 0.05)'
					: 'rgba(0, 0, 0, 0.05)'
				: isDark
					? 'rgba(255, 255, 255, 0.1)'
					: 'rgba(0, 0, 0, 0.1)'
		}`,
		background: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
			: isDark
				? 'rgba(255, 255, 255, 0.1)'
				: '#ffffff',
		color: disabled
			? 'hsla(var(--foreground) / 0.4)'
			: 'hsl(var(--foreground))',
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.2s ease',
		outline: 'none',
		'box-sizing': 'border-box'
	}),

	checkboxGroup: (): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		gap: 'var(--filter-bar-checkbox-gap, 6px)'
	}),

	clearButton: (isDark: boolean): JSX.CSSProperties => ({
		padding: 'var(--filter-bar-button-padding, 6px 12px)',
		'font-size': 'var(--filter-bar-button-font-size, 13px)',
		'border-radius': 'var(--filter-bar-button-border-radius, 6px)',
		border: `1px solid ${
			isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		background: isDark
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.05)',
		color: 'hsl(var(--foreground))',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		outline: 'none',
		'box-sizing': 'border-box'
	}),

	clearButtonHover: (isDark: boolean): JSX.CSSProperties => ({
		background: isDark
			? 'rgba(255, 255, 255, 0.15)'
			: 'rgba(0, 0, 0, 0.1)',
		border: `1px solid ${
			isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
		}`
	})
} as const

