/**
 * Timeline Component Styles
 * Styles for timeline component using CSS variables
 */

import type { JSX } from 'solid-js'
import type { TimelineEvent } from '../model/types'

export const timelineStyles = {
	container: (orientation: 'vertical' | 'horizontal', isDark: boolean): JSX.CSSProperties => {
		const base: JSX.CSSProperties = {
			display: 'flex',
			'box-sizing': 'border-box',
			width: '100%'
		}

		if (orientation === 'horizontal') {
			return {
				...base,
				'flex-direction': 'row',
				'align-items': 'flex-start',
				gap: 'var(--timeline-horizontal-gap, 24px)',
				overflow: 'auto'
			}
		}

		return {
			...base,
			'flex-direction': 'column',
			gap: 'var(--timeline-vertical-gap, 24px)',
			padding: 'var(--timeline-padding, 16px 0)'
		}
	},

	event: (
		orientation: 'vertical' | 'horizontal',
		isDark: boolean,
		showLine: boolean
	): JSX.CSSProperties => {
		const base: JSX.CSSProperties = {
			position: 'relative',
			display: 'flex',
			'box-sizing': 'border-box'
		}

		if (orientation === 'horizontal') {
			return {
				...base,
				'flex-direction': 'column',
				'align-items': 'center',
				'min-width': 'var(--timeline-event-min-width, 200px)',
				'flex-shrink': '0'
			}
		}

		return {
			...base,
			'flex-direction': 'row',
			'align-items': 'flex-start',
			'padding-left': showLine ? 'var(--timeline-event-padding-left, 40px)' : '0'
		}
	},

	line: (
		orientation: 'vertical' | 'horizontal',
		isDark: boolean,
		isLast: boolean
	): JSX.CSSProperties => {
		const base: JSX.CSSProperties = {
			position: 'absolute',
			background: isDark
				? 'rgba(255, 255, 255, 0.1)'
				: 'rgba(0, 0, 0, 0.1)',
			'z-index': '0'
		}

		if (orientation === 'horizontal') {
			return {
				...base,
				top: 'var(--timeline-icon-size, 24px)',
				left: '50%',
				right: isLast ? '50%' : 'calc(-50% - var(--timeline-horizontal-gap, 24px))',
				height: '2px',
				transform: 'translateY(-50%)'
			}
		}

		return {
			...base,
			left: 'calc(var(--timeline-icon-size, 24px) / 2)',
			top: 'var(--timeline-icon-size, 24px)',
			bottom: isLast ? '0' : 'calc(-1 * var(--timeline-vertical-gap, 24px))',
			width: '2px',
			transform: 'translateX(-50%)'
		}
	},

	iconContainer: (
		variant: TimelineEvent['variant'],
		isDark: boolean,
		disabled: boolean
	): JSX.CSSProperties => {
		const variantColors: Record<
			NonNullable<TimelineEvent['variant']>,
			string
		> = {
			default: 'hsl(var(--primary))',
			primary: 'hsl(var(--primary))',
			success: 'hsl(142, 71%, 45%)',
			error: 'hsl(0, 84%, 60%)',
			warning: 'hsl(38, 92%, 50%)',
			info: 'hsl(217, 91%, 60%)'
		}

		const color = variantColors[variant || 'default']

		return {
			position: 'relative',
			'z-index': '1',
			display: 'flex',
			'align-items': 'center',
			'justify-content': 'center',
			width: 'var(--timeline-icon-size, 24px)',
			height: 'var(--timeline-icon-size, 24px)',
			'min-width': 'var(--timeline-icon-size, 24px)',
			'min-height': 'var(--timeline-icon-size, 24px)',
			'border-radius': '50%',
			background: disabled
				? isDark
					? 'rgba(255, 255, 255, 0.1)'
					: 'rgba(0, 0, 0, 0.1)'
				: color,
			color: disabled
				? isDark
					? 'rgba(255, 255, 255, 0.3)'
					: 'rgba(0, 0, 0, 0.3)'
				: '#ffffff',
			'font-size': 'var(--timeline-icon-font-size, 14px)',
			'flex-shrink': '0',
			transition: 'all 0.2s ease'
		}
	},

	content: (orientation: 'vertical' | 'horizontal'): JSX.CSSProperties => {
		const base: JSX.CSSProperties = {
			display: 'flex',
			'flex-direction': 'column',
			'flex-grow': '1',
			'min-width': '0'
		}

		if (orientation === 'horizontal') {
			return {
				...base,
				'align-items': 'center',
				'text-align': 'center',
				'margin-top': 'var(--timeline-content-margin-top, 12px)'
			}
		}

		return {
			...base,
			'margin-left': 'var(--timeline-content-margin-left, 16px)'
		}
	},

	title: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		'font-size': 'var(--timeline-title-font-size, 15px)',
		'font-weight': '600',
		'line-height': '1.4',
		color: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.4)'
				: 'rgba(0, 0, 0, 0.4)'
			: isDark
				? '#f6f6f6'
				: '#1a1a1a',
		margin: '0',
		'word-wrap': 'break-word'
	}),

	description: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		'font-size': 'var(--timeline-description-font-size, 13px)',
		'line-height': '1.5',
		color: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(0, 0, 0, 0.3)'
			: isDark
				? 'rgba(255, 255, 255, 0.7)'
				: 'rgba(0, 0, 0, 0.7)',
		margin: 'var(--timeline-description-margin, 4px 0 0 0)',
		'word-wrap': 'break-word'
	}),

	date: (isDark: boolean, disabled: boolean): JSX.CSSProperties => ({
		'font-size': 'var(--timeline-date-font-size, 12px)',
		'line-height': '1.4',
		color: disabled
			? isDark
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(0, 0, 0, 0.3)'
			: isDark
				? 'rgba(255, 255, 255, 0.5)'
				: 'rgba(0, 0, 0, 0.5)',
		margin: 'var(--timeline-date-margin, 4px 0 0 0)',
		'word-wrap': 'break-word'
	})
} as const
