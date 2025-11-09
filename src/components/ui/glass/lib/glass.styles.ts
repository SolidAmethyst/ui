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
		// Opacity: 0% = opaque (1.0), 100% = transparent (0.0)
		// No inversion - opacity directly controls transparency
		const effectiveOpacity = 1 - opacity
		const saturation = props.saturation ?? 1.0
		const darkness = props.darkness ?? 1.0
		const isDark = props.isDark ?? true

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

		// Build backdrop-filter string conditionally
		// Blur and saturation work only when there's transparency (opacity > 0%)
		// When opacity = 0% (fully opaque), backdrop-filter is 'none'
		const backdropFilters: string[] = []
		// Apply blur and saturation only if there's transparency
		if (effectiveOpacity < 1) {
			if (blur > 0) {
				backdropFilters.push(`blur(${blur}px)`)
			}
			if (saturation > 0) {
				// Using quadratic easing for smooth, gradual transition
				// Small saturation values have minimal effect, larger values have stronger effect
				const easedSaturation = saturation * saturation
				backdropFilters.push(`saturate(${100 + easedSaturation * 100}%)`) // 100% (normal) to 200% (fully saturated)
			}
		}
		// Apply darkness through brightness filter for matte variant
		// Limited to 70% max effect: darkness 100% = darkness 70%
		// Using quadratic easing for smooth, gradual transition
		// Only apply brightness if darkness > 0 (no darkening when darkness = 0)
		if (variant === 'matte' && darkness > 0 && effectiveOpacity < 1) {
			// Quadratic easing: darkness^2 for smooth start, then accelerates
			const easedDarkness = darkness * darkness
			const brightness = 100 - easedDarkness * 70 // 100% to 30% (70% max effect)
			backdropFilters.push(`brightness(${brightness}%)`)
		}
		const backdropFilterValue =
			backdropFilters.length > 0 ? backdropFilters.join(' ') : 'none'

		switch (variant) {
			case 'mica':
				return {
					...baseStyles,
					background:
						effectiveOpacity > 0
							? `rgba(255, 255, 255, ${effectiveOpacity * 0.1})`
							: 'transparent',
					'backdrop-filter': backdropFilterValue,
					'-webkit-backdrop-filter': backdropFilterValue
				}

			case 'acrylic':
				return {
					...baseStyles,
					background:
						effectiveOpacity > 0
							? props.tintColor
								? `rgba(${hexToRgb(props.tintColor)}, ${
										props.tintOpacity ?? 0.6
								  })`
								: `rgba(255, 255, 255, ${effectiveOpacity * 0.3})`
							: 'transparent',
					'backdrop-filter': backdropFilterValue,
					'-webkit-backdrop-filter': backdropFilterValue
				}

			case 'blur':
				return {
					...baseStyles,
					background:
						effectiveOpacity > 0
							? `rgba(255, 255, 255, ${effectiveOpacity * 0.1})`
							: 'transparent',
					'backdrop-filter': backdropFilterValue,
					'-webkit-backdrop-filter': backdropFilterValue
				}

			case 'matte':
			default: {
				// Matte glass effect (like Windows Terminal)
				// Logic:
				// - opacity: 0% = fully opaque (1.0), 100% = fully transparent (0.0)
				// - When opacity = 0% (all sliders at 0): solid color (black in dark theme, white in light theme)
				// - When opacity > 0%: becomes transparent, darkness makes it darker
				// - blur and saturation work only when there's transparency (opacity > 0%)
				// - darkness affects color intensity, making it darker as it increases

				// If fully opaque (opacity = 0%, effectiveOpacity = 1.0)
				// Solid color based on theme (black in dark, white in light)
				if (effectiveOpacity === 1) {
					const solidColor = isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
					return {
						...baseStyles,
						background: solidColor,
						'backdrop-filter': 'none',
						'-webkit-backdrop-filter': 'none'
					}
				}

				// If fully transparent (opacity = 100%, effectiveOpacity = 0)
				if (effectiveOpacity === 0) {
					return {
						...baseStyles,
						background: 'transparent',
						'backdrop-filter': backdropFilterValue,
						'-webkit-backdrop-filter': backdropFilterValue
					}
				}

				// Calculate darkness color based on theme
				// When darkness = 0: solid color (black in dark theme, white in light theme)
				// When darkness > 0: becomes darker gradually (limited to 70% max effect via brightness filter)
				// Using quadratic easing for smooth, gradual transition - small values have minimal effect
				// Dark theme: darkness 0% = black (0.0), 100% = darker gray (0.2, then limited to 70% via brightness)
				// Light theme: darkness 0% = white (1.0), 100% = darker gray (0.8, then limited to 70% via brightness)
				let darknessValue: number
				if (isDark) {
					// Dark theme: smooth quadratic transition from black (0.0) to dark gray (0.2)
					// Quadratic easing ensures small darkness values have minimal effect
					const easedDarkness = darkness * darkness
					darknessValue = easedDarkness * 0.2 // 0.0 to 0.2 for gradual, smooth transition
				} else {
					// Light theme: smooth quadratic transition from white (1.0) to light gray (0.8)
					// Quadratic easing ensures small darkness values have minimal effect
					const easedDarkness = darkness * darkness
					darknessValue = 1.0 - easedDarkness * 0.2 // 1.0 to 0.8 for gradual, smooth transition
				}

				// Background color with opacity controlling alpha channel
				// darkness affects RGB color, making it darker as darkness increases
				const matteBackground = props.tintColor
					? `rgba(${hexToRgb(props.tintColor)}, ${props.tintOpacity ?? 0.7})`
					: `rgba(${Math.round(255 * darknessValue)}, ${Math.round(
							255 * darknessValue
					  )}, ${Math.round(255 * darknessValue)}, ${effectiveOpacity})`

				return {
					...baseStyles,
					background: matteBackground,
					'backdrop-filter': backdropFilterValue,
					'-webkit-backdrop-filter': backdropFilterValue
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
