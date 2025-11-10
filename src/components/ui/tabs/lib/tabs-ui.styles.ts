/**
 * Universal Tabs UI Component Styles
 * For real application tabs (not Preview/Code)
 */

import type { JSX } from 'solid-js'

export interface TabsUIStyleOptions {
	isDark: boolean
	isActive: boolean
}

export const tabsUIStyles = {
	root: (): JSX.CSSProperties => ({
		width: '100%',
		display: 'flex',
		'flex-direction': 'column'
	}),
	list: (options: TabsUIStyleOptions): JSX.CSSProperties => ({
		display: 'flex',
		height: '38px',
		'align-items': 'center',
		'justify-content': 'flex-start',
		'border-radius': '6px',
		background: options.isDark
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.1)',
		padding: '4px',
		'box-sizing': 'border-box',
		width: '100%',
		'max-width': '100%',
		overflow: 'auto',
		'flex-wrap': 'nowrap',
		gap: '4px'
	}),
	trigger: (options: TabsUIStyleOptions): JSX.CSSProperties => ({
		display: 'inline-flex',
		'align-items': 'center',
		'justify-content': 'center',
		'white-space': 'nowrap',
		'border-radius': '4px',
		'font-size': '14px',
		'font-weight': '500',
		transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
		padding: '6px 12px',
		cursor: 'pointer',
		border: 'none',
		'box-sizing': 'border-box',
		background: options.isActive
			? options.isDark
				? 'rgba(255, 255, 255, 0.15)'
				: 'rgba(0, 0, 0, 0.15)'
			: 'transparent',
		color: options.isActive
			? options.isDark
				? '#ffffff'
				: '#000000'
			: options.isDark
				? 'rgba(255, 255, 255, 0.8)'
				: 'rgba(0, 0, 0, 0.8)',
		'box-shadow': options.isActive
			? options.isDark
				? '0 1px 3px rgba(0, 0, 0, 0.3)'
				: '0 1px 3px rgba(0, 0, 0, 0.15)'
			: 'none',
		'min-width': '60px',
		height: '30px'
	}),
	content: (): JSX.CSSProperties => ({
		'margin-top': '16px',
		outline: 'none'
	})
}
