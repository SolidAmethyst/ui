/**
 * Tech Chip Component Types
 * Status indicator chip for technology stack display
 */

export type TechChipStatus = 'loading' | 'ready' | 'error'

export type TechChipVariant = 'frontend' | 'backend' | 'engine'

export interface TechChipProps {
	/**
	 * Display label for the chip
	 */
	label: string

	/**
	 * Material Symbols icon name
	 */
	icon: string

	/**
	 * Current status of the technology
	 */
	status: TechChipStatus

	/**
	 * Visual variant (color scheme)
	 */
	variant: TechChipVariant

	/**
	 * Optional class name for custom styling
	 */
	class?: string

	/**
	 * Click handler
	 */
	onClick?: () => void
}
