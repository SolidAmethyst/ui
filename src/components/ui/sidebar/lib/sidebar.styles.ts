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
						width: 'var(--sidebar-width)',
						height: '100%',
						'z-index': '1000',
						transition: 'left 200ms linear'
				  }
					: {
						width: isOpen ? 'var(--sidebar-width)' : '0',
						height: '100%',
						overflow: 'hidden',
						transition: 'width 200ms linear',
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
		width: 'var(--sidebar-width)',
		height: '100%',
		padding: 'var(--sidebar-padding)',
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
		gap: 'var(--sidebar-list-gap)'
	}),
	separator: (isDark: boolean): JSX.CSSProperties => ({
		height: 'var(--sidebar-separator-height)',
		'background-color': isDark
			? 'hsla(240, 3.7%, 15.9%, 1)'
			: 'hsla(220, 13%, 91%, 1)',
		margin: 'var(--sidebar-separator-margin)'
	}),
	button: (disabled: boolean, isDark: boolean): JSX.CSSProperties => ({
		width: '100%',
		display: 'flex',
		'align-items': 'center',
		gap: 'var(--sidebar-button-gap)',
		padding: 'var(--sidebar-button-padding)',
		'border-radius': '0',
		cursor: disabled ? 'not-allowed' : 'pointer',
		'font-size': 'var(--sidebar-button-font-size)',
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
		'font-size': 'var(--sidebar-icon-font-size)',
		width: 'var(--sidebar-icon-size)',
		height: 'var(--sidebar-icon-size)',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center'
	}),
	label: (): JSX.CSSProperties => ({
		flex: '1'
	})
} as const
