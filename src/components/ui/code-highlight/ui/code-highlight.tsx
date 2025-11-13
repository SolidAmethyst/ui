/**
 * Code Highlight Component
 * Syntax highlighting component for code blocks
 */

import { Component, createEffect, createSignal } from 'solid-js'
import { Scrollbar } from '../../scrollbar'
import { codeHighlightStyles } from '../lib/code-highlight.styles'
import { highlightCode } from '../lib/code-highlight.utils'
import { useHighlightProfile } from '../lib/highlight-context'
import { getHighlightColors } from '../lib/highlight-profiles'
import type { CodeHighlightProps } from '../model/types'

export const CodeHighlight: Component<CodeHighlightProps> = props => {
	let codeRef: HTMLElement | undefined
	const [copied, setCopied] = createSignal(false)

	const isDark = () => {
		const dark = props.isDark
		return typeof dark === 'function' ? dark() : dark
	}

	const contextProfile = useHighlightProfile()
	const profile = () => props.highlightProfile ?? contextProfile()
	const colors = () => getHighlightColors(profile())

	createEffect(() => {
		if (codeRef) {
			codeRef.innerHTML = highlightCode(props.code)
			// Apply color profile (only syntax colors, not background/foreground)
			const currentColors = colors()
			codeRef.style.setProperty('--code-comment', currentColors.comment)
			codeRef.style.setProperty('--code-string', currentColors.string)
			codeRef.style.setProperty('--code-keyword', currentColors.keyword)
			codeRef.style.setProperty('--code-attribute', currentColors.attribute)
			codeRef.style.setProperty('--code-operator', currentColors.operator)
			codeRef.style.setProperty('--code-tag', currentColors.tag)
		}
	})

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(props.code)
			setCopied(true)
			setTimeout(() => setCopied(false), props.copiedTimeout ?? 2000)
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
					e.currentTarget.style.color = 'hsl(var(--hover-color))'
				}}
				onMouseLeave={e => {
					e.currentTarget.style.color = isDark()
						? 'hsla(var(--muted-foreground) / 0.8)'
						: 'hsla(var(--muted-foreground) / 0.8)'
				}}
				title={props.copyButtonTitle ?? 'Copy code'}
			>
				{copied() ? (props.copiedButtonText ?? 'Copied!') : (props.copyButtonText ?? 'Copy')}
			</button>
			<Scrollbar
				direction='vertical'
				style={{
					...codeHighlightStyles.pre(),
					flex: '1',
					'min-height': '0'
				}}
			>
				<pre style={codeHighlightStyles.preInner()}>
					<code
						ref={codeRef}
						class='code-block'
						style={codeHighlightStyles.code()}
					/>
				</pre>
			</Scrollbar>
		</div>
	)
}
