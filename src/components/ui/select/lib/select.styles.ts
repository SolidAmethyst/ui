/**
 * Select Component Styles
 */

import type { JSX } from 'solid-js'

export interface SelectStyleOptions {
	isDark: boolean
	isOpen: boolean
	isDisabled: boolean
}

export const selectStyles = {
	container: (): JSX.CSSProperties => ({
		position: 'relative',
		width: '100%',
		'box-sizing': 'border-box'
	}),
	trigger: (options: SelectStyleOptions): JSX.CSSProperties => ({
		width: '100%',
		padding: 'var(--select-padding)',
		'font-size': 'var(--select-font-size)',
		'font-weight': '400',
		'line-height': '1.5',
		border: `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		'border-radius': 'var(--select-border-radius)',
		background: options.isDisabled
			? options.isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
			: options.isDark
				? 'rgba(255, 255, 255, 0.05)'
				: '#ffffff',
		color: options.isDisabled
			? 'hsla(var(--foreground) / 0.4)'
			: 'hsl(var(--foreground))',
		cursor: options.isDisabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.2s ease',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		'box-sizing': 'border-box',
		outline: 'none',
		'text-align': 'left'
	}),
	triggerHover: (options: SelectStyleOptions): JSX.CSSProperties => ({
		'border-color': options.isDark
			? 'hsla(var(--primary-hover) / 0.4)'
			: 'hsla(var(--primary-hover) / 0.3)',
		background: options.isDark
			? 'hsla(var(--primary-hover) / 0.12)'
			: 'hsla(var(--primary-hover) / 0.06)',
		'box-shadow': `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`
	}),
	triggerOpen: (options: SelectStyleOptions): JSX.CSSProperties => ({
		'border-color': 'hsl(var(--primary))',
		background: 'hsla(var(--primary) / 0.1)'
	}),
	triggerOpenHover: (options: SelectStyleOptions): JSX.CSSProperties => ({
		'border-color': 'hsl(var(--hover-color))',
		background: 'hsla(var(--primary-hover) / 0.18)',
		'box-shadow': `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`
	}),
	icon: (options: SelectStyleOptions): JSX.CSSProperties => ({
		'font-size': 'var(--select-icon-font-size)',
		color: 'hsla(var(--muted-foreground) / 0.8)',
		transition: 'transform 0.2s ease',
		transform: options.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
		'flex-shrink': '0',
		'margin-left': 'var(--select-icon-margin-left)'
	}),
	dropdown: (options: SelectStyleOptions): JSX.CSSProperties => ({
		position: 'absolute',
		top: '100%',
		left: '0',
		right: '0',
		'margin-top': 'var(--select-dropdown-margin-top)',
		padding: 'var(--select-dropdown-padding)',
		'border-radius': 'var(--select-border-radius)',
		background: 'hsl(var(--background))',
		border: `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		'box-shadow': options.isDark
			? '0 4px 12px rgba(0, 0, 0, 0.3)'
			: '0 2px 8px rgba(0, 0, 0, 0.1)',
		'z-index': '1000',
		'max-height': 'var(--select-dropdown-max-height)',
		height: 'var(--select-dropdown-max-height)',
		'box-sizing': 'border-box',
		display: 'flex',
		'flex-direction': 'column'
	}),
	option: (options: SelectStyleOptions): JSX.CSSProperties => ({
		padding: 'var(--select-option-padding)',
		'font-size': 'var(--select-option-font-size)',
		'line-height': '1.5',
		color: 'hsl(var(--foreground))',
		cursor: 'pointer',
		'border-radius': 'var(--radius-sm)',
		transition: 'background-color var(--transition-fast)',
		'box-sizing': 'border-box'
	}),
	optionHover: (options: SelectStyleOptions): JSX.CSSProperties => ({
		background: options.isDark
			? 'hsla(var(--primary-hover) / 0.18)'
			: 'hsla(var(--primary-hover) / 0.1)',
		'box-shadow': `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`
	}),
	optionSelected: (options: SelectStyleOptions): JSX.CSSProperties => ({
		background: 'hsla(var(--primary) / 0.2)',
		color: 'hsl(var(--primary))',
		'font-weight': '500'
	}),
	optionSelectedHover: (options: SelectStyleOptions): JSX.CSSProperties => ({
		background: 'hsla(var(--primary-hover) / 0.28)',
		color: 'hsl(var(--hover-color))',
		'text-shadow': `0 0 var(--hover-text-shadow-blur) hsla(var(--primary-hover) / var(--hover-text-shadow-opacity))`,
		'box-shadow': `0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity))`
	}),
	optionDisabled: (): JSX.CSSProperties => ({
		opacity: 0.5,
		cursor: 'not-allowed'
	}),
	optionLabel: (): JSX.CSSProperties => ({
		display: 'block',
		'font-weight': 'inherit'
	}),
	optionDescription: (options: SelectStyleOptions): JSX.CSSProperties => ({
		display: 'block',
		'font-size': 'var(--select-option-description-font-size)',
		'margin-top': 'var(--select-option-description-margin-top)',
		color: 'hsla(var(--muted-foreground) / 0.8)'
	})
} as const
