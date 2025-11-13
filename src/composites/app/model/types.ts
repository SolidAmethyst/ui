/**
 * App Component Types
 */

import type { Accessor } from 'solid-js'
import type { JSX } from 'solid-js'
import type { SidebarItem } from '../../../components/ui/sidebar'
import type { TitleBarProps } from '../../title-bar'

export interface AppProps {
	/**
	 * Application title
	 */
	title?: string

	/**
	 * Whether the theme is dark
	 */
	isDark?: Accessor<boolean> | boolean

	/**
	 * Theme toggle handler
	 */
	toggleTheme?: () => void

	/**
	 * Sidebar items
	 */
	sidebarItems?: SidebarItem[]

	/**
	 * Whether the sidebar is in overlay mode
	 */
	overlayMode?: boolean

	/**
	 * TitleBar props (overrides default title if provided)
	 */
	titleBarProps?: Partial<TitleBarProps>

	/**
	 * Main content (children)
	 */
	children?: JSX.Element

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Custom inline styles
	 */
	style?: JSX.CSSProperties
}
