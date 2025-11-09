/**
 * Glass Component Types
 * Glass morphism effect component with Tauri integration support
 */

import type { JSX } from 'solid-js'
import type { GlassEffectType } from '../../../engines/types/engine-interface'

export type GlassVariant = GlassEffectType | 'auto'

export interface GlassProps {
	/**
	 * Glass effect type
	 * - 'mica': Windows 11 Mica effect
	 * - 'acrylic': Windows 10/11 Acrylic effect
	 * - 'blur': Simple blur effect
	 * - 'matte': Matte glass effect (like Windows Terminal)
	 * - 'auto': Automatically detect best available (Tauri > CSS fallback)
	 */
	variant?: GlassVariant

	/**
	 * Blur intensity (0-100)
	 * Only used when variant is 'blur' or 'matte'
	 */
	blur?: number

	/**
	 * Background opacity (0-1)
	 */
	opacity?: number

	/**
	 * Tint color (hex or rgba)
	 */
	tintColor?: string

	/**
	 * Tint opacity (0-1)
	 */
	tintOpacity?: number

	/**
	 * Saturation level (0-2)
	 * Only used for matte variant
	 */
	saturation?: number

	/**
	 * Darkness level (0-1)
	 * Only used for matte variant
	 */
	darkness?: number

	/**
	 * Whether to use native Tauri effects when available
	 * If false, always uses CSS fallback
	 */
	useNative?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Component content
	 */
	children?: JSX.Element

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
