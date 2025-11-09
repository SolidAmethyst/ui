/**
 * NumberInput Component Styles
 */

import type { JSX } from 'solid-js'

export const numberInputStyles = {
	wrapper: {
		position: 'relative',
		display: 'inline-flex',
		'align-items': 'center'
	} as JSX.CSSProperties,

	input: (themeAware?: boolean): JSX.CSSProperties => ({
		width: '60px',
		padding: '4px 20px 4px 8px',
		'border-radius': '4px',
		'box-sizing': 'border-box',
		'font-size': '0.875rem',
		outline: 'none',
		transition: 'border-color 150ms ease',
		// Theme-aware styles using CSS variables
		...(themeAware
			? {
					border: '1px solid var(--number-input-border, rgba(255, 255, 255, 0.1))',
					background: 'var(--number-input-bg, rgba(255, 255, 255, 0.05))',
					color: 'var(--number-input-text, #f6f6f6)'
				}
			: {
					border: '1px solid rgba(255, 255, 255, 0.1)',
					background: 'rgba(255, 255, 255, 0.05)',
					color: '#f6f6f6'
				})
	}),

	arrowsContainer: {
		position: 'absolute',
		right: '4px',
		display: 'flex',
		'flex-direction': 'column',
		gap: '2px',
		height: '100%',
		'justify-content': 'center',
		'pointer-events': 'none'
	} as JSX.CSSProperties,

	arrowButton: {
		width: '12px',
		height: '10px',
		padding: '0',
		'min-width': '12px',
		'min-height': '10px',
		'pointer-events': 'auto'
	} as JSX.CSSProperties
}
