/**
 * Typography Component
 * Unified typography system for consistent text styling
 */

import type { JSX } from 'solid-js'
import { Component } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { typographyStyles } from '../lib/typography.styles'
import type { TypographyProps } from '../model/types'

export const Typography: Component<TypographyProps> = props => {
	const variant = () => props.variant ?? 'body'
	const isDark = () => props.isDark ?? false

	const getElement = (): keyof JSX.IntrinsicElements => {
		if (props.as) return props.as
		return typographyStyles.getDefaultElement(variant())
	}

	const styles = (): JSX.CSSProperties => {
		return {
			...typographyStyles.styles({
				variant: variant(),
				isDark: isDark()
			}),
			...(props.style as JSX.CSSProperties)
		}
	}

	return (
		<Dynamic component={getElement()} class={props.class} style={styles()}>
			{props.children}
		</Dynamic>
	)
}

