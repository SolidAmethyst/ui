/**
 * Slider Component Styles
 */

import type { JSX } from 'solid-js'

export const sliderStyles = {
	container: (_isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		gap: 'var(--slider-gap)',
		width: '100%',
		'align-items': 'center'
	}),

	labelContainer: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		gap: 'var(--slider-gap)',
		'font-size': 'var(--slider-label-font-size)',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		'font-weight': 'var(--slider-label-font-weight)'
	}),

	value: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': 'var(--slider-value-font-size)',
		color: isDark ? 'rgba(246, 246, 246, 0.6)' : 'rgba(26, 26, 26, 0.6)',
		'font-weight': '400',
		'min-width': 'var(--slider-value-min-width)',
		'text-align': 'center'
	}),

	slider: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		width: '100%',
		'max-width': '100%',
		height: 'var(--slider-height)',
		'border-radius': 'var(--slider-border-radius)',
		background: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
			: isDark
				? 'rgba(255, 255, 255, 0.1)'
				: 'rgba(0, 0, 0, 0.1)',
		outline: 'none',
		cursor: disabled ? 'not-allowed' : 'pointer',
		opacity: disabled ? 0.5 : 1,
		transition: 'background 0.2s ease, opacity 0.2s ease'
	})
} as const
