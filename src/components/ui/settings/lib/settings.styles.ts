/**
 * Settings Component Styles
 */

import type { JSX } from 'solid-js'

export const settingsStyles = {
	backdrop: (isOpen: boolean, width: string): JSX.CSSProperties => ({
		position: 'fixed',
		top: '0',
		left: '0',
		right: isOpen ? width : '0',
		bottom: '0',
		background: 'rgba(0, 0, 0, 0.3)',
		'backdrop-filter': 'blur(2px)',
		'z-index': '9999',
		opacity: isOpen ? '1' : '0',
		visibility: isOpen ? 'visible' : 'hidden',
		transition:
			'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), visibility 300ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 300ms cubic-bezier(0.4, 0, 0.2, 1), right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
		'pointer-events': isOpen ? 'auto' : 'none'
	}),

	panel: (
		isOpen: boolean,
		isDark: boolean,
		width: string,
		top: string
	): JSX.CSSProperties => ({
		position: 'fixed',
		top,
		right: isOpen ? '0' : `-${width}`,
		width,
		height: top === '0' ? '100vh' : `calc(100vh - ${top})`,
		'z-index': '10000',
		background: isDark
			? 'hsla(240, 5.9%, 10%, 0.95)'
			: 'hsla(0, 0%, 98%, 0.95)',
		'backdrop-filter': 'blur(20px) saturate(180%)',
		'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
		border: 'none',
		'box-sizing': 'border-box',
		overflow: 'hidden',
		display: 'flex',
		'flex-direction': 'column',
		transition: 'right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
		'box-shadow': isDark
			? '0 4px 16px rgba(0, 0, 0, 0.3), -2px 0 8px rgba(0, 0, 0, 0.2)'
			: '0 4px 16px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.05)'
	}),

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
