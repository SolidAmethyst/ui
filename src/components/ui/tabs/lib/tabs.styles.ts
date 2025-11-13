/**
 * Tabs Component Styles
 * Re-exports unified styles from tabs-ui.styles.ts
 */

import type { JSX } from 'solid-js'
import { tabsUIStyles, type TabsUIStyleOptions } from './tabs-ui.styles'

export interface TabsStyleOptions {
	isDark: boolean
	isActive: boolean
}

export const tabsStyles = {
	container: (): JSX.CSSProperties => tabsUIStyles.root(),
	tabButtons: (options: TabsStyleOptions): JSX.CSSProperties =>
		tabsUIStyles.list({ isDark: options.isDark, isActive: options.isActive }),
	tabButton: (options: TabsStyleOptions): JSX.CSSProperties =>
		tabsUIStyles.trigger({ isDark: options.isDark, isActive: options.isActive }),
	tabButtonHover: (options: TabsStyleOptions): JSX.CSSProperties =>
		tabsUIStyles.triggerHover({ isDark: options.isDark, isActive: options.isActive }),
	previewContainer: (options: TabsStyleOptions): JSX.CSSProperties => ({
		background: options.isDark
			? 'rgba(255, 255, 255, 0.03)'
			: 'rgba(0, 0, 0, 0.03)',
		border: `1px solid ${
			options.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
		}`,
		padding: 'var(--tabs-preview-padding)',
		'box-sizing': 'border-box',
		width: '100%',
		'max-width': '100%',
		display: 'flex',
		'align-items': 'flex-start',
		'justify-content': 'center',
		'flex-wrap': 'wrap',
		gap: 'var(--tabs-preview-gap)'
	})
}
