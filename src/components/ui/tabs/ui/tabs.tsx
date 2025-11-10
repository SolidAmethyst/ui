/**
 * Tabs Component
 * Tabbed interface for switching between preview and code
 */

import { Component, createSignal, Show } from 'solid-js'
import { CodeHighlight } from '../../code-highlight'
import { tabsStyles } from '../lib/tabs.styles'
import type { TabsProps } from '../model/types'

export const Tabs: Component<TabsProps> = props => {
	const [activeTab, setActiveTab] = createSignal<'preview' | 'code'>('preview')

	const isDark = () => {
		const dark = props.isDark
		return typeof dark === 'function' ? dark() : dark
	}

	return (
		<div class={props.class} style={{ ...tabsStyles.container(), ...props.style }}>
			{/* Tab buttons */}
			<div style={tabsStyles.tabButtons({ isDark: isDark(), isActive: false })}>
				<button
					onClick={() => setActiveTab('preview')}
					style={tabsStyles.tabButton({
						isDark: isDark(),
						isActive: activeTab() === 'preview'
					})}
				>
					Preview
				</button>
				<button
					onClick={() => setActiveTab('code')}
					style={tabsStyles.tabButton({
						isDark: isDark(),
						isActive: activeTab() === 'code'
					})}
				>
					Code
				</button>
			</div>

			{/* Tab content */}
			<div>
				<Show when={activeTab() === 'preview'}>
					<div style={tabsStyles.previewContainer({ isDark: isDark(), isActive: false })}>
						{props.preview}
					</div>
				</Show>
				<Show when={activeTab() === 'code'}>
					<CodeHighlight code={props.code} isDark={isDark} />
				</Show>
			</div>
		</div>
	)
}

