/**
 * TitleBar Component Styles
 */

import type { JSX } from 'solid-js'

export const titleBarStyles = {
	container: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		width: '100%',
		height: 'var(--title-bar-height)',
		'background-color': isDark ? 'rgba(30, 30, 30, 1)' : 'rgba(248, 248, 248, 1)',
		'user-select': 'none',
		'-webkit-app-region': 'drag' as const,
		'box-sizing': 'border-box',
		padding: '0',
		margin: '0',
		position: 'relative' as const,
		'z-index': '1000',
		border: 'none'
	}),
	leftSection: {
		display: 'flex',
		'align-items': 'center',
		height: '100%',
		'flex-shrink': '0'
	},
	burgerButton: (isDark: boolean): JSX.CSSProperties => ({
		'-webkit-app-region': 'no-drag' as const,
		width: 'var(--title-bar-button-size)',
		height: 'var(--title-bar-button-size)',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
		padding: '0',
		margin: '0',
		color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 26, 0.9)',
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
	}),
	titleArea: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		flex: '1',
		height: '100%',
		padding: '0 12px',
		overflow: 'hidden',
		'text-overflow': 'ellipsis',
		'white-space': 'nowrap',
		color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 26, 0.9)',
		'font-size': 'var(--font-size-sm)',
		'font-weight': '400',
		'letter-spacing': '0.01em'
	}),
	rightSection: {
		display: 'flex',
		'align-items': 'center',
		height: '100%',
		'flex-shrink': '0',
		'-webkit-app-region': 'no-drag' as const
	},
	controlsGroup: {
		display: 'flex',
		'align-items': 'center',
		height: '100%',
		gap: '0'
	},
	separator: (isDark: boolean): JSX.CSSProperties => ({
		width: '1px',
		height: '20px',
		'background-color': isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
		margin: '0 4px'
	}),
	controlButton: {
		width: 'var(--title-bar-button-size)',
		height: 'var(--title-bar-button-size)',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
		padding: '0',
		margin: '0',
		color: 'rgba(255, 255, 255, 0.8)',
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
	},
	controlButtonHover: {
		'background-color': 'rgba(255, 255, 255, 0.1)'
	},
	closeButtonHover: {
		'background-color': 'rgba(232, 17, 35, 0.2)'
	}
}
