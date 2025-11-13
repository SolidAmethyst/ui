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
			? 'rgba(59, 130, 246, 0.15)'
			: isOver
				? 'rgba(59, 130, 246, 0.12)'
				: 'rgba(59, 130, 246, 0.08)',
		border: `1px solid ${
			isOver ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)'
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
		// Use theme-aware color for future flexibility
		// Currently same color for both themes, but can be adjusted if needed
		color: 'rgba(59, 130, 246, 0.4)',
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
	): JSX.CSSProperties => ({
		position: 'absolute',
		[orientation === 'vertical' ? 'left' : 'top']: '0',
		[orientation === 'vertical' ? 'right' : 'bottom']: '0',
		[orientation === 'vertical' ? 'width' : 'height']: '2px',
		[orientation === 'vertical' ? 'height' : 'width']: '100%',
		background: isDark
			? 'hsla(var(--drag-drop-indicator-color-dark))'
			: 'hsla(var(--drag-drop-indicator-color-light))',
		'border-radius': '1px',
		opacity: 0.8,
		'z-index': 1001,
		'pointer-events': 'none'
	})
} as const
