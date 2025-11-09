/**
 * CodeHighlight component styles
 */

import type { CodeHighlightProps } from '../model/types'

export const codeHighlightStyles = {
	container: (props: CodeHighlightProps): JSX.CSSProperties => ({
		position: 'relative',
		background: props.isDark() ? '#1a1a1f' : '#f8f9fa',
		border: `1px solid ${
			props.isDark() ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
		}`,
		'border-radius': '8px',
		overflow: 'hidden',
		'margin-bottom': '20px',
		'word-wrap': 'break-word',
		'overflow-wrap': 'break-word',
		'box-shadow': props.isDark()
			? '0 2px 8px rgba(0, 0, 0, 0.3)'
			: '0 1px 3px rgba(0, 0, 0, 0.1)'
	}),

	copyButton: (props: CodeHighlightProps, isHovered: boolean): JSX.CSSProperties => ({
		position: 'absolute',
		top: '8px',
		right: '8px',
		padding: '4px 10px',
		'font-size': '11px',
		'font-weight': '500',
		border: 'none',
		background: 'transparent',
		color: isHovered
			? props.isDark()
				? '#f6f6f6'
				: '#1a1a1a'
			: props.isDark()
				? 'rgba(246, 246, 246, 0.6)'
				: 'rgba(26, 26, 26, 0.6)',
		cursor: 'pointer',
		transition: 'color 0.2s ease',
		'z-index': '10'
	}),

	pre: (): JSX.CSSProperties => ({
		margin: '0',
		padding: '16px',
		overflow: 'auto',
		'overflow-x': 'auto',
		'font-size': '13px',
		'line-height': '1.6',
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
} as const

