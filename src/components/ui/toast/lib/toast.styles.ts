/**
 * Toast Component Styles
 * Toast notification styles with variants and positioning
 */

import type { JSX } from 'solid-js'
import type { ToastPosition, ToastVariant } from '../model/types'

export const toastStyles = {
	container: (position: ToastPosition): JSX.CSSProperties => {
		const positions: Record<ToastPosition, JSX.CSSProperties> = {
			'top-left': {
				top: '16px',
				left: '16px',
				'flex-direction': 'column'
			},
			'top-center': {
				top: '16px',
				left: '50%',
				transform: 'translateX(-50%)',
				'flex-direction': 'column'
			},
			'top-right': {
				top: '16px',
				right: '16px',
				'flex-direction': 'column'
			},
			'bottom-left': {
				bottom: '16px',
				left: '16px',
				'flex-direction': 'column-reverse'
			},
			'bottom-center': {
				bottom: '16px',
				left: '50%',
				transform: 'translateX(-50%)',
				'flex-direction': 'column-reverse'
			},
			'bottom-right': {
				bottom: '16px',
				right: '16px',
				'flex-direction': 'column-reverse'
			}
		}

		return {
			position: 'fixed',
			'z-index': '10001',
			display: 'flex',
			gap: '12px',
			'pointer-events': 'none',
			...positions[position]
		}
	},

	toast: (variant: ToastVariant, isDark: boolean, isVisible: boolean): JSX.CSSProperties => {
		const variantColors: Record<ToastVariant, { bg: string; border: string; icon: string }> = {
			success: {
				bg: isDark
					? 'hsla(142, 71%, 45%, 0.15)'
					: 'hsla(142, 71%, 45%, 0.1)',
				border: 'hsla(142, 71%, 45%, 0.5)',
				icon: 'hsl(142, 71%, 45%)'
			},
			error: {
				bg: isDark
					? 'hsla(0, 84%, 60%, 0.15)'
					: 'hsla(0, 84%, 60%, 0.1)',
				border: 'hsla(0, 84%, 60%, 0.5)',
				icon: 'hsl(0, 84%, 60%)'
			},
			warning: {
				bg: isDark
					? 'hsla(38, 92%, 50%, 0.15)'
					: 'hsla(38, 92%, 50%, 0.1)',
				border: 'hsla(38, 92%, 50%, 0.5)',
				icon: 'hsl(38, 92%, 50%)'
			},
			info: {
				bg: isDark
					? 'hsla(217, 91%, 60%, 0.15)'
					: 'hsla(217, 91%, 60%, 0.1)',
				border: 'hsla(217, 91%, 60%, 0.5)',
				icon: 'hsl(217, 91%, 60%)'
			}
		}

		const colors = variantColors[variant]

		return {
			position: 'relative',
			display: 'flex',
			'align-items': 'flex-start',
			gap: '12px',
			padding: '16px',
			'min-width': '320px',
			'max-width': '420px',
			background: isDark
				? 'hsla(240, 5.9%, 10%, 0.95)'
				: 'hsla(0, 0%, 98%, 0.95)',
			'backdrop-filter': 'blur(12px) saturate(180%)',
			'-webkit-backdrop-filter': 'blur(12px) saturate(180%)',
			border: `1px solid ${colors.border}`,
			'border-left': `4px solid ${colors.icon}`,
			'border-radius': '8px',
			'box-shadow': isDark
				? '0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)'
				: '0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
			'pointer-events': 'auto',
			opacity: isVisible ? '1' : '0',
			transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
			transition: 'opacity 0.2s ease, transform 0.2s ease'
		}
	},

	icon: (variant: ToastVariant, isDark: boolean): JSX.CSSProperties => {
		const variantColors: Record<ToastVariant, string> = {
			success: 'hsl(142, 71%, 45%)',
			error: 'hsl(0, 84%, 60%)',
			warning: 'hsl(38, 92%, 50%)',
			info: 'hsl(217, 91%, 60%)'
		}

		return {
			'font-size': '20px',
			color: variantColors[variant],
			'flex-shrink': 0
		}
	},

	content: (): JSX.CSSProperties => ({
		flex: '1',
		'min-width': '0'
	}),

	title: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '14px',
		'font-weight': '600',
		color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
		'margin-bottom': '4px',
		'line-height': '1.4'
	}),

	description: (isDark: boolean): JSX.CSSProperties => ({
		'font-size': '13px',
		color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
		'line-height': '1.4'
	}),

	closeButton: (isDark: boolean): JSX.CSSProperties => ({
		position: 'absolute',
		top: '8px',
		right: '8px',
		width: '20px',
		height: '20px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		border: 'none',
		background: 'transparent',
		color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
		cursor: 'pointer',
		'font-size': '16px',
		'border-radius': '4px',
		transition: 'color 0.2s ease, background 0.2s ease',
		'flex-shrink': 0
	})
} as const
