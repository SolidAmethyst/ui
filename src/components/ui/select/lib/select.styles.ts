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
		padding: '10px 12px',
		'font-size': '14px',
		'font-weight': '400',
		'line-height': '1.5',
		border: `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		'border-radius': '6px',
		background: options.isDisabled
			? options.isDark
				? 'rgba(255, 255, 255, 0.05)'
				: 'rgba(0, 0, 0, 0.05)'
			: options.isDark
				? 'rgba(255, 255, 255, 0.05)'
				: '#ffffff',
		color: options.isDisabled
			? options.isDark
				? 'rgba(246, 246, 246, 0.4)'
				: 'rgba(26, 26, 26, 0.4)'
			: options.isDark
				? '#f6f6f6'
				: '#1a1a1a',
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
			? 'rgba(255, 255, 255, 0.2)'
			: 'rgba(0, 0, 0, 0.2)',
		background: options.isDark
			? 'rgba(255, 255, 255, 0.08)'
			: 'rgba(0, 0, 0, 0.02)'
	}),
	triggerOpen: (options: SelectStyleOptions): JSX.CSSProperties => ({
		'border-color': options.isDark ? '#3b82f6' : '#2563eb',
		background: options.isDark
			? 'rgba(59, 130, 246, 0.1)'
			: 'rgba(37, 99, 235, 0.05)'
	}),
	icon: (options: SelectStyleOptions): JSX.CSSProperties => ({
		'font-size': '18px',
		color: options.isDark
			? 'rgba(246, 246, 246, 0.6)'
			: 'rgba(26, 26, 26, 0.6)',
		transition: 'transform 0.2s ease',
		transform: options.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
		'flex-shrink': '0',
		'margin-left': '8px'
	}),
	dropdown: (options: SelectStyleOptions): JSX.CSSProperties => ({
		position: 'absolute',
		top: '100%',
		left: '0',
		right: '0',
		'margin-top': '4px',
		padding: '4px',
		'border-radius': '6px',
		background: options.isDark ? '#1a1a1f' : '#ffffff',
		border: `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		'box-shadow': options.isDark
			? '0 4px 12px rgba(0, 0, 0, 0.3)'
			: '0 2px 8px rgba(0, 0, 0, 0.1)',
		'z-index': '1000',
		'max-height': '300px',
		height: '300px',
		'box-sizing': 'border-box',
		display: 'flex',
		'flex-direction': 'column'
	}),
	option: (options: SelectStyleOptions): JSX.CSSProperties => ({
		padding: '10px 12px',
		'font-size': '14px',
		'line-height': '1.5',
		color: options.isDark ? '#f6f6f6' : '#1a1a1a',
		cursor: 'pointer',
		'border-radius': '4px',
		transition: 'background-color 0.15s ease',
		'box-sizing': 'border-box'
	}),
	optionHover: (options: SelectStyleOptions): JSX.CSSProperties => ({
		background: options.isDark
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.05)'
	}),
	optionSelected: (options: SelectStyleOptions): JSX.CSSProperties => ({
		background: options.isDark
			? 'rgba(59, 130, 246, 0.2)'
			: 'rgba(37, 99, 235, 0.1)',
		color: options.isDark ? '#60a5fa' : '#2563eb',
		'font-weight': '500'
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
		'font-size': '12px',
		'margin-top': '2px',
		color: options.isDark ? 'rgba(246, 246, 246, 0.6)' : 'rgba(26, 26, 26, 0.6)'
	})
} as const
