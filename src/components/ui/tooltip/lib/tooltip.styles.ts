/**
 * Tooltip Component Styles
 * Tooltip styles with positioning
 */

import type { JSX } from 'solid-js'
import type { TooltipPosition } from '../model/types'

export const tooltipStyles = {
	tooltip: (
		position: TooltipPosition,
		isDark: boolean,
		isVisible: boolean
	): JSX.CSSProperties => {
		const baseStyles: JSX.CSSProperties = {
			position: 'absolute',
			'z-index': '10002',
			padding: '8px 12px',
			'min-width': 'max-content',
			'max-width': '200px',
			background: isDark
				? 'hsla(240, 5.9%, 10%, 0.95)'
				: 'hsla(0, 0%, 98%, 0.95)',
			'backdrop-filter': 'blur(8px) saturate(180%)',
			'-webkit-backdrop-filter': 'blur(8px) saturate(180%)',
			color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
			'font-size': '12px',
			'line-height': '1.4',
			'border-radius': '6px',
			'box-shadow': isDark
				? '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
				: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
			'pointer-events': 'none',
			'white-space': 'normal',
			'word-wrap': 'break-word',
			opacity: isVisible ? '1' : '0',
			visibility: isVisible ? 'visible' : 'hidden',
			transition: 'opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease'
		}

		const positionStyles: Record<TooltipPosition, JSX.CSSProperties> = {
			top: {
				...baseStyles,
				bottom: '100%',
				left: '50%',
				transform: isVisible
					? 'translateX(-50%) translateY(-8px)'
					: 'translateX(-50%) translateY(0)',
				'margin-bottom': '8px'
			},
			bottom: {
				...baseStyles,
				top: '100%',
				left: '50%',
				transform: isVisible
					? 'translateX(-50%) translateY(8px)'
					: 'translateX(-50%) translateY(0)',
				'margin-top': '8px'
			},
			left: {
				...baseStyles,
				right: '100%',
				top: '50%',
				transform: isVisible
					? 'translateY(-50%) translateX(-8px)'
					: 'translateY(-50%) translateX(0)',
				'margin-right': '8px'
			},
			right: {
				...baseStyles,
				left: '100%',
				top: '50%',
				transform: isVisible
					? 'translateY(-50%) translateX(8px)'
					: 'translateY(-50%) translateX(0)',
				'margin-left': '8px'
			}
		}

		return positionStyles[position]
	},

	arrow: (position: TooltipPosition, isDark: boolean): JSX.CSSProperties => {
		const arrowSize = '6px'
		const arrowColor = isDark
			? 'hsla(240, 5.9%, 10%, 0.95)'
			: 'hsla(0, 0%, 98%, 0.95)'

		const baseArrow: JSX.CSSProperties = {
			position: 'absolute',
			width: '0',
			height: '0',
			'border-style': 'solid'
		}

		const positionArrows: Record<TooltipPosition, JSX.CSSProperties> = {
			top: {
				...baseArrow,
				top: '100%',
				left: '50%',
				transform: 'translateX(-50%)',
				'border-width': `${arrowSize} ${arrowSize} 0 ${arrowSize}`,
				'border-color': `${arrowColor} transparent transparent transparent`
			},
			bottom: {
				...baseArrow,
				bottom: '100%',
				left: '50%',
				transform: 'translateX(-50%)',
				'border-width': `0 ${arrowSize} ${arrowSize} ${arrowSize}`,
				'border-color': `transparent transparent ${arrowColor} transparent`
			},
			left: {
				...baseArrow,
				left: '100%',
				top: '50%',
				transform: 'translateY(-50%)',
				'border-width': `${arrowSize} 0 ${arrowSize} ${arrowSize}`,
				'border-color': `transparent transparent transparent ${arrowColor}`
			},
			right: {
				...baseArrow,
				right: '100%',
				top: '50%',
				transform: 'translateY(-50%)',
				'border-width': `${arrowSize} ${arrowSize} ${arrowSize} 0`,
				'border-color': `transparent ${arrowColor} transparent transparent`
			}
		}

		return positionArrows[position]
	}
} as const
