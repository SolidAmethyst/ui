/**
 * Table Component Styles
 * Styles for table component
 */

import type { JSX } from 'solid-js'

export const tableStyles = {
	container: (): JSX.CSSProperties => ({
		width: '100%',
		overflow: 'auto',
		'border-radius': '8px',
		border: '1px solid var(--border, rgba(255, 255, 255, 0.1))'
	}),

	table: (isDark: boolean): JSX.CSSProperties => ({
		width: '100%',
		'border-collapse': 'collapse',
		background: isDark
			? 'hsla(240, 5.9%, 10%, 0.95)'
			: 'hsla(0, 0%, 98%, 0.95)',
		'font-size': '14px'
	}),

	thead: (isDark: boolean): JSX.CSSProperties => ({
		background: isDark
			? 'rgba(255, 255, 255, 0.05)'
			: 'rgba(0, 0, 0, 0.05)',
		'border-bottom': `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
	}),

	th: (isDark: boolean, sortable: boolean, align: 'left' | 'center' | 'right'): JSX.CSSProperties => ({
		padding: '12px 16px',
		'text-align': align,
		'font-weight': '600',
		'font-size': '13px',
		'text-transform': 'uppercase',
		'letter-spacing': '0.05em',
		color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
		cursor: sortable ? 'pointer' : 'default',
		'user-select': 'none',
		transition: 'background 0.2s ease',
		position: 'relative'
	}),

	thHover: (isDark: boolean): JSX.CSSProperties => ({
		background: isDark
			? 'rgba(255, 255, 255, 0.08)'
			: 'rgba(0, 0, 0, 0.08)'
	}),

	sortIcon: (isDark: boolean, direction: 'asc' | 'desc' | null): JSX.CSSProperties => ({
		'font-size': '16px',
		color: direction
			? 'hsl(var(--primary))'
			: isDark
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(0, 0, 0, 0.3)',
		'margin-left': '8px',
		'vertical-align': 'middle',
		display: 'inline-block',
		transform: direction === 'desc' ? 'rotate(180deg)' : 'none',
		transition: 'transform 0.2s ease, color 0.2s ease'
	}),

	tbody: (): JSX.CSSProperties => ({}),

	tr: (isDark: boolean, isEven: boolean): JSX.CSSProperties => ({
		'border-bottom': `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
		background: isEven
			? isDark
				? 'rgba(255, 255, 255, 0.02)'
				: 'rgba(0, 0, 0, 0.02)'
			: 'transparent',
		transition: 'background 0.2s ease'
	}),

	trHover: (isDark: boolean): JSX.CSSProperties => ({
		background: isDark
			? 'rgba(255, 255, 255, 0.05)'
			: 'rgba(0, 0, 0, 0.05)'
	}),

	td: (isDark: boolean, align: 'left' | 'center' | 'right'): JSX.CSSProperties => ({
		padding: '12px 16px',
		'text-align': align,
		color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
		'line-height': '1.5'
	}),

	pagination: (isDark: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		padding: '16px',
		'border-top': `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
		background: isDark
			? 'rgba(255, 255, 255, 0.02)'
			: 'rgba(0, 0, 0, 0.02)'
	}),

	paginationInfo: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '14px',
		color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
	}),

	paginationControls: (): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		gap: '8px'
	}),

	paginationButton: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		padding: '6px 12px',
		'font-size': '14px',
		border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
		background: disabled
			? 'transparent'
			: isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)',
		color: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(0, 0, 0, 0.3)'
			: isDark
				? 'rgba(255, 255, 255, 0.9)'
				: 'rgba(0, 0, 0, 0.9)',
		'border-radius': '4px',
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'background 0.2s ease, border-color 0.2s ease',
		opacity: disabled ? 0.5 : 1
	}),

	paginationButtonHover: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		background: disabled
			? 'transparent'
			: isDark
				? 'rgba(255, 255, 255, 0.1)'
				: 'rgba(0, 0, 0, 0.1)',
		'border-color': disabled
			? undefined
			: isDark
				? 'rgba(255, 255, 255, 0.2)'
				: 'rgba(0, 0, 0, 0.2)'
	})
} as const

