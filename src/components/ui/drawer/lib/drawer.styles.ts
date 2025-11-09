/**
 * Drawer Component Styles
 * Universal sliding panel styles
 */

import type { JSX } from 'solid-js'
import type { DrawerPosition } from '../model/types'

export const drawerStyles = {
	backdrop: (
		isOpen: boolean,
		showBackdrop: boolean,
		position: DrawerPosition,
		size: string
	): JSX.CSSProperties => {
		if (!showBackdrop) {
			return {
				display: 'none'
			}
		}

		// Calculate backdrop coverage based on position
		const backdropCoverage: Record<DrawerPosition, JSX.CSSProperties> = {
			right: {
				right: isOpen ? size : '0'
			},
			left: {
				left: isOpen ? size : '0'
			},
			top: {
				top: isOpen ? size : '0'
			},
			bottom: {
				bottom: isOpen ? size : '0'
			}
		}

		return {
			position: 'fixed',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			...backdropCoverage[position],
			background: 'rgba(0, 0, 0, 0.3)',
			'backdrop-filter': 'blur(2px)',
			'-webkit-backdrop-filter': 'blur(2px)',
			'z-index': '9999',
			opacity: isOpen ? '1' : '0',
			visibility: isOpen ? 'visible' : 'hidden',
			transition:
				'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), visibility 300ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 300ms cubic-bezier(0.4, 0, 0.2, 1), right 300ms cubic-bezier(0.4, 0, 0.2, 1), left 300ms cubic-bezier(0.4, 0, 0.2, 1), top 300ms cubic-bezier(0.4, 0, 0.2, 1), bottom 300ms cubic-bezier(0.4, 0, 0.2, 1)',
			'pointer-events': isOpen ? 'auto' : 'none'
		}
	},

	panel: (
		isOpen: boolean,
		isDark: boolean,
		position: DrawerPosition,
		size: string,
		zIndex: number
	): JSX.CSSProperties => {
		const baseStyles: JSX.CSSProperties = {
			position: 'fixed',
			'z-index': zIndex.toString(),
			background: isDark
				? 'hsla(240, 5.9%, 10%, 0.95)'
				: 'hsla(0, 0%, 98%, 0.95)',
			'backdrop-filter': 'blur(20px) saturate(180%)',
			'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
			border: 'none',
			'box-sizing': 'border-box',
			overflow: 'hidden',
			display: 'flex',
			'flex-direction': 'column',
			'will-change': 'transform',
			'box-shadow': isOpen
				? isDark
					? '0 4px 16px rgba(0, 0, 0, 0.3), -2px 0 8px rgba(0, 0, 0, 0.2)'
					: '0 4px 16px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.05)'
				: 'none',
			transition:
				'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)'
		}

		// Position-specific styles
		switch (position) {
			case 'right':
				return {
					...baseStyles,
					top: '0',
					right: '0',
					width: size,
					height: '100vh',
					transform: isOpen ? 'translateX(0)' : `translateX(100%)`,
					'pointer-events': isOpen ? 'auto' : 'none'
				}
			case 'left':
				return {
					...baseStyles,
					top: '0',
					left: '0',
					width: size,
					height: '100vh',
					transform: isOpen ? 'translateX(0)' : `translateX(-100%)`,
					'pointer-events': isOpen ? 'auto' : 'none'
				}
			case 'top':
				return {
					...baseStyles,
					top: '0',
					left: '0',
					right: '0',
					width: '100%',
					height: size,
					transform: isOpen ? 'translateY(0)' : `translateY(-100%)`,
					'pointer-events': isOpen ? 'auto' : 'none'
				}
			case 'bottom':
				return {
					...baseStyles,
					bottom: '0',
					left: '0',
					right: '0',
					width: '100%',
					height: size,
					transform: isOpen ? 'translateY(0)' : `translateY(100%)`,
					'pointer-events': isOpen ? 'auto' : 'none'
				}
		}
	}
} as const
