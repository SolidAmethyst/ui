/**
 * Timeline Component Types
 * Timeline component for displaying events in chronological order
 */

import type { JSX } from 'solid-js'

export interface TimelineEvent {
	/**
	 * Unique identifier for the event
	 */
	id: string

	/**
	 * Event title
	 */
	title: string

	/**
	 * Event description or content
	 */
	description?: JSX.Element | string

	/**
	 * Event timestamp or date
	 */
	date?: string

	/**
	 * Event icon (Material Symbols name)
	 */
	icon?: string

	/**
	 * Event color variant
	 */
	variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'

	/**
	 * Whether the event is disabled
	 */
	disabled?: boolean

	/**
	 * Custom content for the event
	 */
	content?: JSX.Element
}

export interface TimelineProps {
	/**
	 * Array of timeline events
	 */
	events: TimelineEvent[]

	/**
	 * Timeline orientation (default: 'vertical')
	 */
	orientation?: 'vertical' | 'horizontal'

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Show connecting line between events
	 */
	showLine?: boolean

	/**
	 * Show date/timestamp for each event
	 */
	showDate?: boolean

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
