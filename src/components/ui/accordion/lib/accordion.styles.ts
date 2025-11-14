/**
 * Accordion Component Styles
 * Styles for accordion component
 */

import type { JSX } from 'solid-js'

export const accordionStyles = {
	container: (): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		width: '100%',
		'border-radius': '8px',
		overflow: 'hidden'
	}),

	item: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		'border-bottom': `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
	}),

	header: (isDark: boolean, disabled: boolean, expanded: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		padding: '16px',
		background: expanded
			? isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
			: 'transparent',
		cursor: disabled ? 'not-allowed' : 'pointer',
		'user-select': 'none',
		transition: 'background 0.2s ease',
		opacity: disabled ? 0.5 : 1
	}),

	headerHover: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		background: disabled
			? 'transparent'
			: isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
	}),

	headerContent: (): JSX.CSSProperties => ({
		flex: '1',
		'font-size': '14px',
		'font-weight': '500',
		'line-height': '1.5'
	}),

	icon: (isDark: boolean, expanded: boolean): JSX.CSSProperties => ({
		'font-size': '20px',
		color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
		transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
		transition: 'transform 0.2s ease',
		'flex-shrink': 0,
		'margin-left': '12px'
	}),

	content: (isDark: boolean, expanded: boolean): JSX.CSSProperties => ({
		overflow: 'hidden',
		'max-height': expanded ? '1000px' : '0',
		opacity: expanded ? '1' : '0',
		transition: 'max-height 0.3s ease, opacity 0.2s ease, padding 0.3s ease',
		padding: expanded ? '16px' : '0 16px',
		color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
		'font-size': '14px',
		'line-height': '1.5'
	})
} as const

