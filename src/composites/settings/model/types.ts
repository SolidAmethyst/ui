/**
 * Settings Composite Types
 * Full-featured settings panel with sections for different components
 */

import type { JSX } from 'solid-js'

export interface GlassSettings {
	/**
	 * Whether glass effect is enabled
	 */
	enabled: boolean

	/**
	 * Blur intensity (0-50)
	 */
	blur: number

	/**
	 * Opacity (0-1)
	 */
	opacity: number

	/**
	 * Darkness level (0-1, where 1 is darkest)
	 */
	darkness: number

	/**
	 * Saturation level (0-2, where 1 is normal)
	 */
	saturation: number
}

export interface FontSettings {
	/**
	 * Font family
	 */
	fontFamily?: string

	/**
	 * Font size
	 */
	fontSize?: string

	/**
	 * Font weight
	 */
	fontWeight?: string
}

export type MainCategory = 'appearance' | 'fonts'

export type AppearanceSubcategory = 'glass' | 'theme'

export type SettingsCategory = MainCategory | AppearanceSubcategory

export interface SettingsCompositeProps {
	/**
	 * Whether the settings panel is open
	 */
	isOpen: boolean

	/**
	 * Callback when panel should be closed
	 */
	onClose: () => void

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean | (() => boolean)

	/**
	 * Glass effect settings
	 */
	glassSettings?: GlassSettings

	/**
	 * Callback when glass settings change
	 */
	onGlassSettingsChange?: (settings: GlassSettings) => void

	/**
	 * Font settings (placeholder for future implementation)
	 */
	fontSettings?: FontSettings

	/**
	 * Callback when font settings change
	 */
	onFontSettingsChange?: (settings: FontSettings) => void

	/**
	 * Additional CSS class name
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
