// Common types for the UI toolkit
import type { JSX } from 'solid-js'

export type { JSX }

export interface BaseComponentProps {
	class?: string
	style?: JSX.CSSProperties
	children?: JSX.Element
}

export type ScrollbarDirection = 'vertical' | 'horizontal'
export type ScrollbarTheme = 'default' | 'minimal' | 'modern'
