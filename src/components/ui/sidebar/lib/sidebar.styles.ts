/**
 * Sidebar Component Styles
 */

import type { JSX } from 'solid-js'

export interface SidebarStylesProps {
	isDark: boolean
	overlayMode: boolean
	open: boolean
}

export const sidebarStyles = {
	container: (props: SidebarStylesProps): JSX.CSSProperties => ({
		...(props.overlayMode
			? {
					position: 'absolute' as const,
					top: '0',
					left: props.open ? '0' : '-250px',
					width: '250px',
					height: '100%',
					'z-index': '1000',
					transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
				}
			: {
					width: props.open ? '250px' : '0',
					height: '100%',
					overflow: 'hidden',
					transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
					position: 'relative' as const,
					'z-index': '100'
				}),
		background: props.isDark
			? 'rgba(30, 30, 30, 0.95)'
			: 'rgba(255, 255, 255, 0.95)',
		'backdrop-filter': 'blur(20px) saturate(180%)',
		'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
		border: 'none',
		'box-sizing': 'border-box' as const,
		overflow: props.overlayMode ? ('auto' as const) : ('hidden' as const)
	}),
	innerContainer: (): JSX.CSSProperties => ({
		width: '250px',
		height: '100%',
		padding: '16px 0',
		'box-sizing': 'border-box',
		overflow: 'auto'
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
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.1)',
		margin: '8px 12px'
	}),
	button: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
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
				? 'rgba(255, 255, 255, 0.4)'
				: 'rgba(0, 0, 0, 0.4)'
			: isDark
			? 'rgba(255, 255, 255, 0.9)'
			: 'rgba(0, 0, 0, 0.9)',
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
