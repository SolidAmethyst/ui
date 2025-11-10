/**
 * Code Highlight Component
 * Syntax highlighting component for code blocks
 */

import { Component, createEffect, createSignal } from 'solid-js'
import { codeHighlightStyles } from '../lib/code-highlight.styles'
import { highlightCode } from '../lib/code-highlight.utils'
import type { CodeHighlightProps } from '../model/types'

export const CodeHighlight: Component<CodeHighlightProps> = props => {
	let codeRef: HTMLElement | undefined
	const [copied, setCopied] = createSignal(false)

	const isDark = () => {
		const dark = props.isDark
		return typeof dark === 'function' ? dark() : dark
	}

	createEffect(() => {
		if (codeRef) {
			codeRef.innerHTML = highlightCode(props.code)
		}
	})

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(props.code)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<div
			class={props.class}
			style={{
				...codeHighlightStyles.container({ isDark: isDark() }),
				...props.style
			}}
		>
			<button
				onClick={copyToClipboard}
				style={codeHighlightStyles.copyButton({ isDark: isDark() })}
				onMouseEnter={e => {
					e.currentTarget.style.color = isDark() ? '#f6f6f6' : '#1a1a1a'
				}}
				onMouseLeave={e => {
					e.currentTarget.style.color = isDark()
						? 'rgba(246, 246, 246, 0.6)'
						: 'rgba(26, 26, 26, 0.6)'
				}}
				title='Copy code'
			>
				{copied() ? 'Copied!' : 'Copy'}
			</button>
			<pre style={codeHighlightStyles.pre()}>
				<code
					ref={codeRef}
					class='code-block'
					style={codeHighlightStyles.code()}
				/>
			</pre>
		</div>
	)
}
