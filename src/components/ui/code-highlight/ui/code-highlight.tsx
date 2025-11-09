/**
 * CodeHighlight Component
 * Syntax highlighting component for displaying code blocks
 */

import { Component, createEffect, createSignal } from 'solid-js'
import type { CodeHighlightProps } from '../model/types'
import { codeHighlightStyles } from '../lib/code-highlight.styles'
import { highlightCode } from '../lib/highlight-code'

export const CodeHighlight: Component<CodeHighlightProps> = props => {
	let codeRef: HTMLElement | undefined
	const [copied, setCopied] = createSignal(false)
	const [isHovered, setIsHovered] = createSignal(false)

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
				...codeHighlightStyles.container(props),
				...props.style
			}}
		>
			<button
				onClick={copyToClipboard}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={codeHighlightStyles.copyButton(props, isHovered())}
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

