/**
 * Button Component Types
 * Based on Tauri project button styles
 */

import type { JSX } from 'solid-js'

export type ButtonVariant =
	| 'control'
	| 'play-pause'
	| 'small'
	| 'close'
	| 'minimize'
	| 'maximize'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonIconPosition = 'left' | 'right' | 'only'

export interface ButtonProps {
	variant?: ButtonVariant
	size?: ButtonSize
	disabled?: boolean
	loading?: boolean
	icon?: string
	iconPosition?: ButtonIconPosition
	iconFilled?: boolean
	onClick?: () => void
	class?: string
	children?: JSX.Element
	title?: string
	type?: 'button' | 'submit' | 'reset'
	active?: boolean
	pinned?: boolean
	maximized?: boolean
}
