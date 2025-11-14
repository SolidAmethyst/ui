/**
 * ProgressBar Component Styles
 * Progress bar styles with determinate and indeterminate variants
 */

import type { JSX } from 'solid-js'
import type { ProgressBarVariant } from '../model/types'

export const progressBarStyles = {
	container: (isDark: boolean, height: string): JSX.CSSProperties => ({
		position: 'relative',
		width: '100%',
		height: height,
		'border-radius': '4px',
		background: isDark
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.1)',
		overflow: 'hidden'
	}),

	track: (
		variant: ProgressBarVariant,
		value: number,
		isDark: boolean
	): JSX.CSSProperties => {
		const baseStyles: JSX.CSSProperties = {
			position: 'absolute',
			top: '0',
			left: '0',
			height: '100%',
			'border-radius': '4px',
			transition: 'width 0.3s ease, transform 0.3s ease'
		}

		if (variant === 'determinate') {
			return {
				...baseStyles,
				width: `${Math.min(Math.max(value, 0), 100)}%`,
				background: isDark
					? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))'
					: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.9))',
				'box-shadow': isDark
					? '0 0 8px hsla(var(--primary) / 0.3)'
					: '0 0 4px hsla(var(--primary) / 0.2)'
			}
		}

		// Indeterminate variant
		return {
			...baseStyles,
			width: '30%',
			background: isDark
				? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))'
				: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.9))',
			'box-shadow': isDark
				? '0 0 8px hsla(var(--primary) / 0.3)'
				: '0 0 4px hsla(var(--primary) / 0.2)',
			animation: 'progress-indeterminate 1.5s ease-in-out infinite'
		}
	},

	label: (isDark: boolean): JSX.CSSProperties => ({
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		'font-size': '12px',
		'font-weight': '500',
		color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
		'z-index': 1,
		'pointer-events': 'none',
		'text-shadow': isDark
			? '0 1px 2px rgba(0, 0, 0, 0.5)'
			: '0 1px 2px rgba(255, 255, 255, 0.8)'
	})
} as const

