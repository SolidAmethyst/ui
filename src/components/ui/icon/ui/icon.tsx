/**
 * Icon Component
 * Material 3 SVG icon component using Google Material Symbols
 * Uses SVG instead of font for better performance and customization
 */

import { Component, createEffect, createSignal, onMount, Show } from 'solid-js'
import { getIconSize } from '../lib/icon-utils'
import type { IconProps } from '../model/types'

export const Icon: Component<IconProps> = props => {
	const [svgContent, setSvgContent] = createSignal<string | null>(null)
	const [loading, setLoading] = createSignal(true)
	let svgContainerRef: HTMLSpanElement | undefined

	const variant = () => props.variant ?? 'rounded'
	const filled = () => props.filled ?? false
	const size = () => getIconSize(props.size ?? 24)
	const color = () => props.color ?? 'currentColor'

	// Load SVG from Material Symbols CDN
	onMount(async () => {
		try {
			// Use Google Material Symbols CDN
			// Format: https://fonts.gstatic.com/s/materialsymbolsrounded/v1/[icon-name].svg
			const variantMap: Record<string, string> = {
				rounded: 'materialsymbolsrounded',
				sharp: 'materialsymbolssharp',
				outlined: 'materialsymbolsoutlined'
			}

			const variantName = variantMap[variant()]
			const iconName = props.name.replace(/_/g, '-').toLowerCase()
			const fillSuffix = filled() ? '_fill' : ''

			// Try to load from CDN
			const url = `https://fonts.gstatic.com/s/${variantName}/v1/${iconName}${fillSuffix}.svg`

			const response = await fetch(url)
			if (response.ok) {
				const svg = await response.text()
				// Inject currentColor for fill/stroke and set size
				const coloredSvg = svg
					.replace(/fill="[^"]*"/g, `fill="${color()}"`)
					.replace(/stroke="[^"]*"/g, `stroke="${color()}"`)
					.replace(/<svg([^>]*)>/, `<svg$1 width="${size()}" height="${size()}"`)
				setSvgContent(coloredSvg)
			} else {
				// Fallback: use font icon
				setSvgContent(null)
			}
		} catch {
			// Fallback: use font icon
			setSvgContent(null)
		} finally {
			setLoading(false)
		}
	})

	// Update SVG content when it changes
	createEffect(() => {
		if (svgContainerRef && svgContent()) {
			svgContainerRef.innerHTML = svgContent()!
		}
	})

	return (
		<Show
			when={!loading() && svgContent()}
			fallback={
				<span
					class={`material-symbols-rounded ${props.class || ''}`}
					style={{
						'font-size': size(),
						color: color(),
						...props.style
					}}
					aria-label={props['aria-label']}
					aria-hidden={props['aria-hidden'] ?? true}
				>
					{props.name}
				</span>
			}
		>
			<span
				ref={el => (svgContainerRef = el)}
				class={props.class}
				style={{
					display: 'inline-flex',
					'align-items': 'center',
					'justify-content': 'center',
					width: size(),
					height: size(),
					color: color(),
					...props.style
				}}
				aria-label={props['aria-label']}
				aria-hidden={props['aria-hidden'] ?? true}
			/>
		</Show>
	)
}
