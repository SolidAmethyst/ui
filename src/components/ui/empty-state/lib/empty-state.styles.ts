/**
 * EmptyState Component Styles
 * Styles for empty state component
 */

import type { JSX } from 'solid-js'

export const emptyStateStyles = {
	container: (): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		padding: '48px 24px',
		'text-align': 'center',
		width: '100%',
		'min-height': '200px'
	}),

	icon: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '64px',
		color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
		'margin-bottom': '16px',
		'line-height': '1'
	}),

	title: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '18px',
		'font-weight': '600',
		color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
		'margin-bottom': '8px',
		'line-height': '1.4'
	}),

	description: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '14px',
		color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
		'margin-bottom': '24px',
		'line-height': '1.5',
		'max-width': '400px'
	}),

	action: (): JSX.CSSProperties => ({
		'margin-top': '8px'
	})
} as const

