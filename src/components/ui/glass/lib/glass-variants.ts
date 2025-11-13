/**
 * Glass Variants Helper
 * Generates CSS class string for glass effect variants
 * Similar to buttonVariants pattern
 */

import type { GlassVariant } from '../model/types'

export interface GlassVariantsOptions {
	/**
	 * Glass effect variant
	 */
	variant?: GlassVariant

	/**
	 * Whether the theme is dark
	 */
	isDark?: boolean

	/**
	 * Whether to use native effects
	 */
	useNative?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string
}

/**
 * Generates CSS class string for glass component based on variants
 * @param options - Glass variant options
 * @returns CSS class string
 */
export const glassVariants = (options: GlassVariantsOptions = {}): string => {
	const { variant, isDark, useNative, class: className } = options

	let baseClass = 'glass-container'

	// Variant-based classes
	if (variant === 'mica') {
		baseClass += ' glass-mica'
	} else if (variant === 'acrylic') {
		baseClass += ' glass-acrylic'
	} else if (variant === 'blur') {
		baseClass += ' glass-blur'
	} else if (variant === 'matte') {
		baseClass += ' glass-matte'
	} else if (variant === 'auto') {
		baseClass += ' glass-auto'
	}

	// Theme-based classes
	if (isDark) {
		baseClass += ' glass-dark'
	} else {
		baseClass += ' glass-light'
	}

	// Native effects indicator
	if (useNative) {
		baseClass += ' glass-native'
	} else {
		baseClass += ' glass-css'
	}

	// Additional classes
	if (className) {
		baseClass += ` ${className}`
	}

	return baseClass.trim()
}

