/**
 * Slider Component Styles
 */

import type { JSX } from 'solid-js'
import type { SliderProps } from '../model/types'

export const sliderStyles = {
	container: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		gap: '8px',
		width: '100%'
	}),

	labelContainer: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center',
		'font-size': '14px',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		'font-weight': '500'
	}),

	value: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '12px',
		color: isDark ? 'rgba(246, 246, 246, 0.6)' : 'rgba(26, 26, 26, 0.6)',
		'font-weight': '400',
		'min-width': '40px',
		'text-align': 'right'
	}),

	slider: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		width: '100%',
		height: '6px',
		'border-radius': '3px',
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
