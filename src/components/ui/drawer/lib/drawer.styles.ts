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
			background: `rgba(0, 0, 0, var(--drawer-backdrop-opacity))`,
			'backdrop-filter': `blur(var(--drawer-backdrop-blur))`,
			'-webkit-backdrop-filter': `blur(var(--drawer-backdrop-blur))`,
			'z-index': '9999',
			opacity: isOpen ? '1' : '0',
			visibility: isOpen ? 'visible' : 'hidden',
			transition:
				`opacity var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), visibility var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), right var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), left var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), top var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), bottom var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1)`,
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
			'backdrop-filter': `blur(var(--drawer-panel-blur)) saturate(var(--drawer-panel-saturate))`,
			'-webkit-backdrop-filter': `blur(var(--drawer-panel-blur)) saturate(var(--drawer-panel-saturate))`,
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
				`transform var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1), box-shadow var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1)`
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
