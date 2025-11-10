/**
 * Tabs Component Styles
 */

import type { JSX } from 'solid-js'

export interface TabsStyleOptions {
	isDark: boolean
	isActive: boolean
}

export const tabsStyles = {
	container: (): JSX.CSSProperties => ({
		width: '100%',
		'max-width': '100%',
		'box-sizing': 'border-box',
		margin: '24px 0'
	}),
	tabButtons: (options: TabsStyleOptions): JSX.CSSProperties => ({
		display: 'flex',
		gap: '8px',
		'border-bottom': `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		margin: '0 0 20px 0'
	}),
	tabButton: (options: TabsStyleOptions): JSX.CSSProperties => ({
		padding: '10px 20px',
		'font-size': '14px',
		'font-weight': '500',
		border: 'none',
		background: 'transparent',
		color: options.isActive
			? options.isDark
				? '#f6f6f6'
				: '#1a1a1a'
			: options.isDark
				? 'rgba(246, 246, 246, 0.5)'
				: 'rgba(26, 26, 26, 0.5)',
		cursor: 'pointer',
		'border-bottom': `2px solid ${options.isActive ? '#3b82f6' : 'transparent'}`,
		transition: 'all 0.2s ease',
		margin: '0 0 -1px 0'
	}),
	previewContainer: (options: TabsStyleOptions): JSX.CSSProperties => ({
		background: options.isDark
			? 'rgba(255, 255, 255, 0.03)'
			: 'rgba(0, 0, 0, 0.03)',
		border: `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		padding: '8px 12px',
		'box-sizing': 'border-box',
		width: '100%',
		'max-width': '100%',
		display: 'flex',
		'align-items': 'flex-start',
		'justify-content': 'center',
		'flex-wrap': 'wrap',
		gap: '12px'
	})
}

