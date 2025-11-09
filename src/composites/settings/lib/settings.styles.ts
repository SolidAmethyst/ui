/**
 * Settings Component Styles
 */

import type { JSX } from 'solid-js'

export const settingsStyles = {
	header: (isDark: boolean): JSX.CSSProperties => ({
		padding: '20px',
		'border-bottom': `1px solid ${
			isDark ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`,
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center'
	}),

	title: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '18px',
		'font-weight': '600',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		margin: '0'
	}),

	closeButton: (isDark: boolean): JSX.CSSProperties => ({
		background: 'transparent',
		border: 'none',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		cursor: 'pointer',
		padding: '4px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		'border-radius': '4px',
		transition: 'background-color 0.2s ease'
	})
} as const
