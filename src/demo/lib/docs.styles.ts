/**
 * Shared styles for documentation pages
 * Centralized styles to avoid duplication and improve maintainability
 */

import type { JSX } from 'solid-js'
import { getThemeColors } from './theme'

export interface DocsTheme {
	isDark: boolean
}

const getColors = (theme: DocsTheme) => getThemeColors(theme.isDark)

export const docsStyles = {
	article: (theme: DocsTheme): JSX.CSSProperties => ({
		width: '100%',
		'max-width': '700px',
		'box-sizing': 'border-box',
		margin: '0 auto',
		padding: '24px 0',
		color: getColors(theme).text,
		overflow: 'hidden',
		'overflow-x': 'hidden'
	}),

	title: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '1.75rem',
		'font-weight': '700',
		'margin-bottom': '12px',
		'line-height': '1.2',
		color: getColors(theme).text
	}),

	description: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '0.95rem',
		color: getColors(theme).textMuted,
		'margin-bottom': '24px',
		'line-height': '1.6'
	}),

	section: (): JSX.CSSProperties => ({
		'margin-bottom': '32px'
	}),

	sectionTitle: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '1.25rem',
		'font-weight': '600',
		'margin-bottom': '12px',
		'line-height': '1.3',
		color: getColors(theme).text
	}),

	label: (theme: DocsTheme): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		gap: '8px',
		color: getColors(theme).text,
		'font-size': '0.875rem'
	}),

	controlsContainer: (): JSX.CSSProperties => ({
		display: 'flex',
		gap: '12px',
		'margin-bottom': '16px',
		'flex-wrap': 'wrap',
		'align-items': 'center'
	}),

	card: (theme: DocsTheme): JSX.CSSProperties => ({
		padding: '12px 16px',
		'border-radius': '6px',
		background: getColors(theme).cardBackground,
		border: `1px solid ${getColors(theme).cardBorder}`,
		'box-sizing': 'border-box'
	}),

	cardTitle: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '0.75rem',
		'font-weight': '500',
		margin: '0 0 4px 0',
		color: getColors(theme).textMuted
	}),

	cardContent: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '1rem',
		'font-weight': '600',
		color: getColors(theme).text
	}),

	input: (theme: DocsTheme): JSX.CSSProperties => ({
		border: `1px solid ${getColors(theme).border}`,
		background: getColors(theme).inputBackground,
		color: getColors(theme).text
	}),

	inputFocus: (theme: DocsTheme): JSX.CSSProperties => ({
		'border-color': getColors(theme).borderFocus
	})
} as const
