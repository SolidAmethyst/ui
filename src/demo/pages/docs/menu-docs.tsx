import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'
import { AppDemo } from '../app-demo'
import { menuExamples } from './code-snippets/menu-snippets'

interface MenuDocsProps {
	isDark: Accessor<boolean>
}

export const MenuDocs: Component<MenuDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Menu</h1>
			<p style={docsStyles.description(theme())}>
				Dropdown menu component for navigation and actions. Supports icons,
				separators, disabled items, and custom positioning.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight code={menuExamples.installation} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Basic Usage</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<AppDemo isDark={props.isDark} toggleTheme={() => {}} />
						</div>
					}
					code={menuExamples.basicUsage}
				/>
			</section>

			{/* Overlay Menu */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Overlay Menu</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden'
							}}
						>
							<AppDemo
								isDark={props.isDark}
								toggleTheme={() => {}}
								overlayMode={true}
							/>
						</div>
					}
					code={menuExamples.overlayMenu}
				/>
			</section>
		</article>
	)
}
