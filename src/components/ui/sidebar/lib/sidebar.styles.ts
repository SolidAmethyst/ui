/**
 * Sidebar Component Styles
 */

import type { JSX } from 'solid-js'

export const sidebarStyles = {
	container: (isOpen: boolean, isOverlay: boolean, isDark: boolean): JSX.CSSProperties => {
		return {
			...(isOverlay
				? {
						position: 'absolute' as const,
						top: '0',
						left: isOpen ? '0' : '-250px',
						width: '250px',
						height: '100%',
						'z-index': '1000',
						transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
				  }
				: {
						width: isOpen ? '250px' : '0',
						height: '100%',
						overflow: 'hidden',
						transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
						position: 'relative' as const,
						'z-index': '100'
				  }),
			background: isDark
				? 'hsla(240, 5.9%, 10%, 0.95)'
				: 'hsla(0, 0%, 98%, 0.95)',
			'backdrop-filter': 'blur(20px) saturate(180%)',
			'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
			border: 'none',
			'box-sizing': 'border-box' as const,
			overflow: isOverlay ? ('auto' as const) : ('hidden' as const)
		}
	},
	innerContainer: (): JSX.CSSProperties => ({
		width: '250px',
		height: '100%',
		padding: '16px 0',
		'box-sizing': 'border-box',
		overflow: 'hidden',
		display: 'flex',
		'flex-direction': 'column'
	}),
	list: (): JSX.CSSProperties => ({
		'list-style': 'none',
		margin: '0',
		padding: '0',
		display: 'flex',
		'flex-direction': 'column',
		gap: '4px'
	}),
	separator: (isDark: boolean): JSX.CSSProperties => ({
		height: '1px',
		'background-color': isDark
			? 'hsla(240, 3.7%, 15.9%, 1)'
			: 'hsla(220, 13%, 91%, 1)',
		margin: '8px 12px'
	}),
	button: (disabled: boolean, isDark: boolean): JSX.CSSProperties => ({
		width: '100%',
		display: 'flex',
		'align-items': 'center',
		gap: '12px',
		padding: '10px 16px',
		'border-radius': '0',
		cursor: disabled ? 'not-allowed' : 'pointer',
		'font-size': '14px',
		color: disabled
			? isDark
				? 'hsla(240, 4.8%, 95.9%, 0.4)'
				: 'hsla(240, 5.3%, 26.1%, 0.4)'
			: isDark
				? 'hsla(240, 4.8%, 95.9%, 1)'
				: 'hsla(240, 5.3%, 26.1%, 1)',
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		'background-color': 'transparent',
		border: 'none',
		'text-align': 'left',
		'box-sizing': 'border-box',
		opacity: disabled ? 0.5 : 1
	}),
	icon: (): JSX.CSSProperties => ({
		'font-size': '20px',
		width: '20px',
		height: '20px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center'
	}),
	label: (): JSX.CSSProperties => ({
		flex: '1'
	})
} as const
