/**
 * Container Styles
 * Shared styles for container component
 */

import type { JSX } from 'solid-js'

export interface ContainerStyleOptions {
	maxWidth?: string | number
	padding?: string
}

export const containerStyles = (
	options: ContainerStyleOptions
): JSX.CSSProperties => {
	const maxWidth =
		typeof options.maxWidth === 'number'
			? `${options.maxWidth}px`
			: options.maxWidth || '1400px'

	return {
		width: '100%',
		'max-width': maxWidth,
		margin: '0 auto',
		padding: options.padding || '0 32px',
		'box-sizing': 'border-box'
	}
}
