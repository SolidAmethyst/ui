/**
 * Code Highlight Component Styles
 */

import type { JSX } from 'solid-js'

export interface CodeHighlightStyleOptions {
	isDark: boolean
}

export const codeHighlightStyles = {
	container: (options: CodeHighlightStyleOptions): JSX.CSSProperties => ({
		position: 'relative',
		width: '100%',
		'max-width': '100%',
		'box-sizing': 'border-box',
		background: 'hsl(var(--code-background))',
		border: `1px solid hsl(var(--border) / 0.12)`,
		'border-radius': 'var(--code-highlight-border-radius)',
		overflow: 'hidden',
		'margin-bottom': '20px',
		'word-wrap': 'break-word',
		'overflow-wrap': 'break-word',
		'box-shadow': options.isDark
			? '0 2px 8px rgba(0, 0, 0, 0.3)'
			: '0 1px 3px rgba(0, 0, 0, 0.1)'
	}),
	copyButton: (options: CodeHighlightStyleOptions): JSX.CSSProperties => ({
		position: 'absolute',
		top: '8px',
		right: '8px',
		padding: '4px 10px',
		'font-size': '11px',
		'font-weight': '500',
		border: 'none',
		background: 'transparent',
		color: 'hsl(var(--muted-foreground))',
		cursor: 'pointer',
		transition: 'color 0.2s ease',
		'z-index': '10'
	}),
	pre: (): JSX.CSSProperties => ({
		margin: '0',
		width: '100%',
		height: '100%',
		'max-width': '100%',
		'box-sizing': 'border-box',
		display: 'flex',
		'flex-direction': 'column'
	}),
	preInner: (): JSX.CSSProperties => ({
		margin: '0',
		padding: 'var(--code-highlight-padding)',
		'font-size': 'var(--code-highlight-font-size)',
		'line-height': 'var(--code-highlight-line-height)',
		'font-family': 'Monaco, Menlo, "Ubuntu Mono", monospace',
		background: 'transparent',
		'word-wrap': 'break-word',
		'overflow-wrap': 'break-word',
		width: '100%',
		'max-width': '100%',
		'box-sizing': 'border-box'
	}),
	code: (): JSX.CSSProperties => ({
		display: 'block',
		'white-space': 'pre',
		overflow: 'visible',
		'word-wrap': 'normal',
		'word-break': 'normal'
	})
}
