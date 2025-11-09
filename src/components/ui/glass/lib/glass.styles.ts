/**
 * Glass Component Styles
 * CSS fallback styles for glass morphism effects
 */

import type { JSX } from 'solid-js'
import type { GlassProps } from '../model/types'

export const glassStyles = {
	container: (props: GlassProps, useNative: boolean): JSX.CSSProperties => {
		const blur = props.blur ?? 15
		const opacity = props.opacity ?? 0.9
		const saturation = props.saturation ?? 1.0
		const darkness = props.darkness ?? 0.5

		// CSS variables for external override
		const cssVars: Record<string, string> = {
			'--glass-blur': `${blur}px`,
			'--glass-opacity': opacity.toString(),
			'--glass-saturation': saturation.toString(),
			'--glass-darkness': darkness.toString()
		}

		if (props.tintColor) {
			cssVars['--glass-tint-color'] = props.tintColor
		}
		if (props.tintOpacity !== undefined) {
			cssVars['--glass-tint-opacity'] = props.tintOpacity.toString()
		}

		// Base styles
		const baseStyles: JSX.CSSProperties = {
			...cssVars,
			position: 'relative',
			'box-sizing': 'border-box'
		}

		// If using native effects (Tauri), don't apply CSS backdrop-filter
		if (useNative) {
			return {
				...baseStyles
				// Native effects handle the visual appearance
				// CSS is only for layout
			}
		}

		// CSS fallback styles based on variant
		const variant = props.variant ?? 'matte'

		switch (variant) {
			case 'mica':
				return {
					...baseStyles,
					background: `rgba(255, 255, 255, ${opacity * 0.1})`,
					'backdrop-filter': `blur(${blur}px) saturate(${saturation * 100}%)`,
					'-webkit-backdrop-filter': `blur(${blur}px) saturate(${
						saturation * 100
					}%)`
				}

			case 'acrylic':
				return {
					...baseStyles,
					background: props.tintColor
						? `rgba(${hexToRgb(props.tintColor)}, ${props.tintOpacity ?? 0.6})`
						: `rgba(255, 255, 255, ${opacity * 0.3})`,
					'backdrop-filter': `blur(${blur}px) saturate(${saturation * 120}%)`,
					'-webkit-backdrop-filter': `blur(${blur}px) saturate(${
						saturation * 120
					}%)`
				}

			case 'blur':
				return {
					...baseStyles,
					background: `rgba(255, 255, 255, ${opacity * 0.1})`,
					'backdrop-filter': `blur(${blur}px)`,
					'-webkit-backdrop-filter': `blur(${blur}px)`
				}

			case 'matte':
			default: {
				// Matte glass effect (like Windows Terminal)
				// darkness: 0 = light, 1 = dark (inverted for RGB)
				const darknessValue = 1 - darkness
				const matteBackground = props.tintColor
					? `rgba(${hexToRgb(props.tintColor)}, ${props.tintOpacity ?? 0.7})`
					: `rgba(${Math.round(255 * darknessValue)}, ${Math.round(
							255 * darknessValue
					  )}, ${Math.round(255 * darknessValue)}, ${opacity})`

				return {
					...baseStyles,
					background: matteBackground,
					'backdrop-filter': `blur(${blur}px) saturate(${saturation * 100}%)`,
					'-webkit-backdrop-filter': `blur(${blur}px) saturate(${
						saturation * 100
					}%)`
				}
			}
		}
	}
} as const

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!result) {
		return '255, 255, 255' // Default to white
	}
	return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
		result[3],
		16
	)}`
}
