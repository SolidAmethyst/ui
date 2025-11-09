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

	input: {
		width: '60px',
		padding: '4px 20px 4px 8px',
		'border-radius': '4px',
		'box-sizing': 'border-box',
		'font-size': '0.875rem',
		outline: 'none',
		transition: 'border-color 150ms ease'
	} as JSX.CSSProperties,

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
