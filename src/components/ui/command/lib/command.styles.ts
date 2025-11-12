/**
 * Command Component Styles
 * Based on cmdk-solid with custom theming
 */

import type { JSX } from 'solid-js'

export interface CommandStyleOptions {
	isDark?: boolean
}

export const commandStyles = {
	root: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		position: 'relative',
		width: '100%',
		display: 'flex',
		'flex-direction': 'column',
		overflow: 'hidden',
		'background-color': options?.isDark ? '#242424' : '#ffffff',
		'border-radius': '8px',
		'box-shadow': options?.isDark
			? '0 8px 32px rgba(0, 0, 0, 0.6)'
			: '0 8px 32px rgba(0, 0, 0, 0.15)',
		border: `1px solid ${
			options?.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`
	}),

	dialog: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '640px',
		'max-width': '90vw',
		'max-height': '85vh',
		'z-index': 9999,
		...commandStyles.root(options)
	}),

	input: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		width: '100%',
		padding: 'var(--command-input-padding)',
		'font-size': 'var(--command-input-font-size)',
		'line-height': 'var(--command-input-line-height)',
		border: 'none',
		outline: 'none',
		background: 'transparent',
		color: options?.isDark ? '#f6f6f6' : '#1a1a1a',
		'border-bottom': `1px solid ${
			options?.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`
	}),

	list: (): JSX.CSSProperties => ({
		flex: '1',
		overflow: 'auto',
		padding: '0',
		'max-height': '400px'
	}),

	item: (
		options?: CommandStyleOptions & { selected?: boolean; disabled?: boolean }
	): JSX.CSSProperties => ({
		position: 'relative',
		display: 'flex',
		'align-items': 'center',
		padding: 'var(--command-item-padding)',
		height: 'var(--command-item-height)',
		'font-size': 'var(--command-item-font-size)',
		'line-height': 'var(--command-item-line-height)',
		'border-radius': 'var(--command-border-radius)',
		cursor: options?.disabled ? 'not-allowed' : 'pointer',
		'user-select': 'none',
		'background-color': options?.selected
			? options?.isDark
				? 'rgba(255, 255, 255, 0.1)'
				: 'rgba(0, 0, 0, 0.05)'
			: 'transparent',
		color: options?.disabled
			? options?.isDark
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(26, 26, 26, 0.3)'
			: options?.isDark
				? '#ffffff'
				: '#1a1a1a',
		transition: 'background-color 0.15s ease'
	}),

	group: (): JSX.CSSProperties => ({
		padding: '0'
	}),

	groupHeading: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		'font-size': 'var(--command-group-heading-font-size)',
		'font-weight': 'var(--command-group-heading-font-weight)',
		'text-transform': 'none',
		'letter-spacing': '0',
		'line-height': 'var(--command-group-heading-line-height)',
		padding: 'var(--command-group-heading-padding)',
		'margin-top': 'var(--command-group-heading-margin-top)',
		'margin-bottom': 'var(--command-group-heading-margin-bottom)',
		color: options?.isDark
			? 'rgba(255, 255, 255, 0.6)'
			: 'rgba(26, 26, 26, 0.6)',
		'user-select': 'none'
	}),

	separator: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		height: 'var(--command-separator-height)',
		'background-color': options?.isDark
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.1)',
		margin: 'var(--command-separator-margin)'
	}),

	empty: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		padding: 'var(--command-empty-padding)',
		'text-align': 'center',
		'font-size': 'var(--command-empty-font-size)',
		color: options?.isDark
			? 'rgba(246, 246, 246, 0.5)'
			: 'rgba(26, 26, 26, 0.5)'
	}),

	loading: (options?: CommandStyleOptions): JSX.CSSProperties => ({
		padding: 'var(--command-empty-padding)',
		'text-align': 'center',
		'font-size': 'var(--command-empty-font-size)',
		color: options?.isDark
			? 'rgba(246, 246, 246, 0.5)'
			: 'rgba(26, 26, 26, 0.5)'
	})
}
