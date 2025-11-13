/**
 * Drag Drop Component Styles
 */

import type { JSX } from 'solid-js'

export const dragDropStyles = {
	container: (orientation: 'vertical' | 'horizontal'): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': orientation === 'vertical' ? 'column' : 'row',
		width: '100%',
		'box-sizing': 'border-box'
	}),

	item: (
		isDark: boolean,
		isDragging: boolean,
		isOver: boolean,
		disabled: boolean,
		gap: string
	): JSX.CSSProperties => ({
		position: 'relative',
		'user-select': 'none',
		'box-sizing': 'border-box',
		cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
		opacity: disabled ? 0.5 : isDragging ? 0.6 : 1,
		transform: isDragging ? 'scale(1.02)' : 'scale(1)',
		transition: 'transform 0.2s ease, opacity 0.2s ease, background 0.2s ease',
		background: isDragging
			? 'hsla(var(--primary) / 0.15)'
			: isOver
				? 'hsla(var(--primary) / 0.12)'
				: 'hsla(var(--primary) / 0.08)',
		border: `1px solid ${
			isOver ? 'hsla(var(--primary) / 0.4)' : 'hsla(var(--primary) / 0.2)'
		}`,
		'border-radius': 'var(--drag-drop-item-border-radius)',
		padding: 'var(--drag-drop-item-padding)',
		margin: `0 0 ${gap} 0`,
		'pointer-events': disabled ? 'none' : 'auto',
		'box-shadow': isDragging
			? isDark
				? '0 4px 12px rgba(0, 0, 0, 0.3)'
				: '0 4px 12px rgba(0, 0, 0, 0.15)'
			: 'none',
		'z-index': isDragging ? 1000 : 1
	}),

	dragHandle: (isDark: boolean): JSX.CSSProperties => ({
		position: 'absolute',
		top: '50%',
		right: '8px',
		transform: 'translateY(-50%)',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		width: '20px',
		height: '20px',
		// Use CSS variable for theme-aware color and easy customization
		color: 'hsla(var(--primary) / 0.4)',
		opacity: 1,
		transition: 'opacity 0.2s ease',
		cursor: 'grab',
		'pointer-events': 'none'
	}),

	itemContent: (): JSX.CSSProperties => ({
		width: '100%',
		display: 'flex',
		'align-items': 'center',
		flex: '1'
	}),

	dropIndicator: (
		isDark: boolean,
		orientation: 'vertical' | 'horizontal'
	): JSX.CSSProperties => {
		if (orientation === 'vertical') {
			// Vertical orientation: items stacked vertically, indicator is vertical line (left side)
			return {
				position: 'absolute',
				left: '-1px',
				top: '0',
				bottom: '0',
				width: '2px',
				height: '100%',
				background: isDark
					? 'hsla(var(--drag-drop-indicator-color-dark))'
					: 'hsla(var(--drag-drop-indicator-color-light))',
				'border-radius': '1px',
				opacity: 0.8,
				'z-index': 1001,
				'pointer-events': 'none'
			}
		} else {
			// Horizontal orientation: items side by side, indicator is horizontal line (top)
			return {
				position: 'absolute',
				top: '-1px',
				left: '0',
				right: '0',
				width: '100%',
				height: '2px',
				background: isDark
					? 'hsla(var(--drag-drop-indicator-color-dark))'
					: 'hsla(var(--drag-drop-indicator-color-light))',
				'border-radius': '1px',
				opacity: 0.8,
				'z-index': 1001,
				'pointer-events': 'none'
			}
		}
	}
} as const
