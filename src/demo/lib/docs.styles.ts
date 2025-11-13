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
		padding: '8px 0 24px 0',
		color: getColors(theme).text,
		overflow: 'hidden',
		'overflow-x': 'hidden'
	}),

	title: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '15px',
		'font-weight': '700',
		'margin-top': '0',
		'margin-bottom': '12px',
		'line-height': '1',
		'letter-spacing': '0.08em',
		'text-transform': 'uppercase',
		color: getColors(theme).text
	}),

	description: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '0.85rem',
		color: getColors(theme).textMuted,
		'margin-bottom': '24px',
		'line-height': '1.6'
	}),

	paragraph: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '0.85rem',
		'line-height': '1.7',
		color: theme.isDark ? 'rgba(246, 246, 246, 0.9)' : 'rgba(26, 26, 26, 0.9)'
	}),

	section: (): JSX.CSSProperties => ({
		'margin-bottom': '32px'
	}),

	sectionTitle: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '11px',
		'font-weight': '600',
		'margin-bottom': '12px',
		'line-height': '1.3',
		color: getColors(theme).text
	}),

	subsectionTitle: (theme: DocsTheme): JSX.CSSProperties => ({
		'font-size': '10px',
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
	}),

	previewContainer: (theme: DocsTheme): JSX.CSSProperties => ({
		width: '100%',
		'box-sizing': 'border-box',
		border: `1px solid ${
			theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		'border-radius': '8px',
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		padding: '16px',
		'min-height': '80px',
		background: theme.isDark ? 'hsl(240 20% 7%)' : '#fafafa'
	})
} as const
