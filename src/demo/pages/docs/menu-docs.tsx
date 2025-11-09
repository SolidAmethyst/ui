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

			{/* Overlay Menu */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Overlay Menu
				</h2>
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
							<AppDemo
								isDark={props.isDark}
								toggleTheme={() => {}}
								overlayMode={true}
							/>
						</div>
					}
					code={`const [sidebarOpen, setSidebarOpen] = createSignal(false)

const sidebarItems: SidebarItem[] = [
	{ label: 'Home', icon: 'home', onClick: () => {} },
	{ label: 'Dashboard', icon: 'dashboard', onClick: () => {} },
	{ separator: true },
	{ label: 'Settings', icon: 'settings', onClick: () => {} }
]

<Window titleBar={<TitleBar onBurgerClick={() => setSidebarOpen(!sidebarOpen())} />}>
	{/* Backdrop overlay */}
	<Show when={sidebarOpen()}>
		<div
			onClick={() => setSidebarOpen(false)}
			style={{
				position: 'absolute',
				top: '0',
				left: '0',
				right: '0',
				bottom: '0',
				background: 'rgba(0, 0, 0, 0.5)',
				'backdrop-filter': 'blur(4px)',
				'z-index': '999'
			}}
		/>
	</Show>

	{/* Overlay Sidebar */}
	<Sidebar
		open={sidebarOpen()}
		items={sidebarItems}
		overlayMode={true}
		onItemClick={() => setSidebarOpen(false)}
	/>

	{/* Main content - doesn't shift */}
	<div>{/* Your content */}</div>
</Window>`}
				/>
			</section>
		</article>
	)
}
