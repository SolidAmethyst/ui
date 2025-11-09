/**
 * Window Component Styles
 */

import type { JSX } from 'solid-js'

export const windowStyles = {
	container: {
		width: '100%',
		height: '100vh',
		display: 'grid',
		'grid-template-rows': '32px 1fr',
		'grid-template-columns': '1fr',
		'box-sizing': 'border-box' as const,
		overflow: 'hidden',
		margin: '0',
		padding: '0'
	} as JSX.CSSProperties,
	titleBarSlot: {
		width: '100%',
		height: '32px',
		'grid-row': '1',
		'grid-column': '1 / -1',
		'box-sizing': 'border-box' as const,
		overflow: 'hidden'
	} as JSX.CSSProperties,
	contentArea: {
		display: 'grid',
		'grid-template-columns': 'auto 1fr',
		'grid-row': '2',
		'grid-column': '1 / -1',
		overflow: 'hidden',
		position: 'relative' as const,
		'box-sizing': 'border-box' as const,
		width: '100%',
		height: '100%'
	} as JSX.CSSProperties,
	sidebarSlot: {
		'grid-column': '1',
		overflow: 'hidden',
		'box-sizing': 'border-box' as const
	} as JSX.CSSProperties,
	mainSlot: {
		'grid-column': '2',
		'box-sizing': 'border-box' as const,
		width: '100%',
		height: '100%',
		position: 'relative' as const,
		display: 'flex',
		'flex-direction': 'column'
	} as JSX.CSSProperties
}
