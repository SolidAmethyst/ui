/**
 * TechChip Variants Helper
 * Generates CSS class string for tech chip variants
 * Similar to buttonVariants pattern
 */

import type { TechChipStatus, TechChipVariant } from '../model/types'

export interface TechChipVariantsOptions {
	/**
	 * Visual variant of the chip
	 */
	variant?: TechChipVariant

	/**
	 * Current status of the chip
	 */
	status?: TechChipStatus

	/**
	 * Whether the chip is clickable
	 */
	clickable?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string
}

/**
 * Generates CSS class string for tech chip based on variants
 * @param options - Tech chip variant options
 * @returns CSS class string
 */
export const techChipVariants = (options: TechChipVariantsOptions = {}): string => {
	const { variant, status, clickable, class: className } = options

	let baseClass = 'tech-chip'

	// Variant-based classes
	if (variant === 'frontend') {
		baseClass += ' tech-chip-frontend'
	} else if (variant === 'backend') {
		baseClass += ' tech-chip-backend'
	} else if (variant === 'engine') {
		baseClass += ' tech-chip-engine'
	}

	// Status-based classes
	if (status === 'loading') {
		baseClass += ' tech-chip-loading'
	} else if (status === 'ready') {
		baseClass += ' tech-chip-ready'
	} else if (status === 'error') {
		baseClass += ' tech-chip-error'
	}

	// Clickable state
	if (clickable) {
		baseClass += ' tech-chip-clickable'
	}

	// Additional classes
	if (className) {
		baseClass += ` ${className}`
	}

	return baseClass.trim()
}

