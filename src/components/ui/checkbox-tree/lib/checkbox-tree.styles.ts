/**
 * CheckboxTree Component Styles
 * Styles for hierarchical checkbox tree
 */

import type { JSX } from 'solid-js'

export const checkboxTreeStyles = {
	container: (): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		gap: '4px',
		width: '100%'
	}),

	node: (isDark: boolean, level: number): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		gap: '2px',
		'padding-left': `${level * 20}px`
	}),

	nodeContent: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		gap: '8px',
		padding: '4px 8px',
		'border-radius': '4px',
		transition: 'background 0.2s ease',
		cursor: 'pointer',
		'user-select': 'none'
	}),

	nodeContentHover: (isDark: boolean): JSX.CSSProperties => ({
		background: isDark
			? 'rgba(255, 255, 255, 0.05)'
			: 'rgba(0, 0, 0, 0.05)'
	}),

	label: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		'font-size': '14px',
		color: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(0, 0, 0, 0.3)'
			: isDark
				? 'rgba(255, 255, 255, 0.9)'
				: 'rgba(0, 0, 0, 0.9)',
		'line-height': '1.5',
		cursor: disabled ? 'not-allowed' : 'pointer'
	})
} as const
