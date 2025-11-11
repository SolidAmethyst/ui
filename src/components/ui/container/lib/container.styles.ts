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
			: options.maxWidth || 'var(--container-max-width)'

	return {
		width: '100%',
		'max-width': maxWidth,
		margin: '0 auto',
		padding: options.padding || 'var(--container-padding)',
		'box-sizing': 'border-box'
	}
}
