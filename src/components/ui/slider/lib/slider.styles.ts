/**
 * Slider Component Styles
 */

import type { JSX } from 'solid-js'

export const sliderStyles = {
	container: (): JSX.CSSProperties => ({
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
		color: 'hsl(var(--foreground))',
		'font-weight': 'var(--slider-label-font-weight)'
	}),

	value: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': 'var(--slider-value-font-size)',
		color: 'hsla(var(--muted-foreground) / 0.8)',
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
			? 'hsl(var(--muted) / 0.5)'
			: 'hsl(var(--muted))',
		outline: 'none',
		cursor: disabled ? 'not-allowed' : 'pointer',
		opacity: disabled ? 0.5 : 1,
		transition: 'background 0.2s ease, opacity 0.2s ease'
	})
} as const
