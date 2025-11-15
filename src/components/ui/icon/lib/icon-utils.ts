/**
 * Icon Utilities
 * Helper functions for Material 3 SVG icons
 */

import type { IconVariant } from '../model/types'

/**
 * Get Material Symbols SVG URL from Google CDN
 */
export function getMaterialSymbolSVGUrl(
	name: string,
	variant: IconVariant = 'rounded',
	filled: boolean = false
): string {
	// Material Symbols SVG CDN URL format
	// https://fonts.gstatic.com/s/materialsymbolsrounded/v1/[icon-name].svg
	const variantMap: Record<IconVariant, string> = {
		rounded: 'materialsymbolsrounded',
		sharp: 'materialsymbolssharp',
		outlined: 'materialsymbolsoutlined'
	}

	const baseUrl = 'https://fonts.gstatic.com/s'
	const variantName = variantMap[variant]
	const fillSuffix = filled ? '_fill' : ''

	// Convert icon name to kebab-case if needed
	const iconName = name.replace(/_/g, '-').toLowerCase()

	return `${baseUrl}/${variantName}/v1/${iconName}${fillSuffix}.svg`
}

/**
 * Get icon size in pixels
 */
export function getIconSize(size?: number | string): string {
	if (!size) return '24px'
	if (typeof size === 'number') return `${size}px`
	return size
}
