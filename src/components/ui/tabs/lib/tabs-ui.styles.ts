/**
 * Universal Tabs UI Component Styles
 * Unified style with documentation tabs (border-bottom indicator)
 */

import type { JSX } from 'solid-js'

export interface TabsUIStyleOptions {
	isDark: boolean
	isActive: boolean
}

export const tabsUIStyles = {
	root: (): JSX.CSSProperties => ({
		width: '100%',
		'max-width': '100%',
		'box-sizing': 'border-box',
		margin: 'var(--tabs-container-margin)'
	}),
	list: (options: TabsUIStyleOptions): JSX.CSSProperties => ({
		display: 'flex',
		gap: 'var(--tabs-button-gap)',
		'border-bottom': `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		margin: `0 0 var(--tabs-buttons-margin-bottom) 0`
		// Note: justify-content and align-items should be set via inline styles when center prop is used
	}),
	trigger: (options: TabsUIStyleOptions): JSX.CSSProperties => ({
		padding: 'var(--tabs-button-padding)',
		'font-size': 'var(--tabs-button-font-size)',
		'font-weight': 'var(--tabs-button-font-weight)',
		border: 'none',
		background: 'transparent',
		color: options.isActive
			? 'hsl(var(--foreground))'
			: 'hsla(var(--muted-foreground) / 0.7)',
		cursor: 'pointer',
		'border-bottom': `2px solid ${options.isActive ? 'hsl(var(--primary))' : 'transparent'}`,
		transition: 'all 0.2s ease',
		margin: `0 0 var(--tabs-button-margin-bottom) 0`
	}),
	triggerHover: (options: TabsUIStyleOptions): JSX.CSSProperties => ({
		color: options.isActive
			? 'hsl(var(--hover-color))'
			: 'hsl(var(--foreground))',
		'border-bottom': `2px solid ${
			options.isActive
				? 'hsl(var(--hover-color))'
				: 'transparent'
		}`,
		'text-shadow': options.isActive
			? `0 0 var(--hover-text-shadow-blur) hsla(var(--hover-color) / var(--hover-text-shadow-opacity))`
			: 'none'
	}),
	content: (): JSX.CSSProperties => ({
		outline: 'none'
	})
}
