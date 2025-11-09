import { Accessor, Component, createSignal, For } from 'solid-js'
import { Button } from '../../../components/ui/button'
import type { SidebarItem } from '../../../components/ui/sidebar'
import { Sidebar } from '../../../components/ui/sidebar'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'

interface SidebarDocsProps {
	isDark: Accessor<boolean>
}

export const SidebarDocs: Component<SidebarDocsProps> = props => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)
	const theme = () => ({ isDark: props.isDark() })

	const sidebarItems: SidebarItem[] = [
		{ label: 'Home', icon: 'home', onClick: () => console.log('Home') },
		{
			label: 'Dashboard',
			icon: 'dashboard',
			onClick: () => console.log('Dashboard')
		},
		{
			label: 'Settings',
			icon: 'settings',
			onClick: () => console.log('Settings')
		},
		{ separator: true },
		{
			label: 'Documents',
			icon: 'description',
			onClick: () => console.log('Documents')
		},
		{ label: 'Images', icon: 'image', onClick: () => console.log('Images') },
		{
			label: 'Videos',
			icon: 'video_library',
			onClick: () => console.log('Videos')
		},
		{ separator: true },
		{ label: 'Help', icon: 'help', onClick: () => console.log('Help') },
		{ label: 'About', icon: 'info', onClick: () => console.log('About') }
	]

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Sidebar</h1>
			<p style={docsStyles.description(theme())}>
				A composable, themeable and customizable sidebar component. Supports
				overlay and shift modes, icons, separators, and can be controlled by any
				trigger.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight
					code={`import { Sidebar } from '@sapphiresolid/ui'
import type { SidebarItem } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			{/* Your First Sidebar */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Your First Sidebar</h2>
				<p style={docsStyles.description(theme())}>
					Let's start with a complete, self-contained sidebar example. This
					example demonstrates shift mode (sidebar shifts content), icons,
					separators, and custom trigger button.
				</p>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '500px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative',
								display: 'flex',
								background: props.isDark() ? 'hsl(240 20% 8%)' : '#ffffff'
							}}
						>
							<Sidebar
								open={sidebarOpen()}
								items={sidebarItems}
								isDark={props.isDark()}
								overlayMode={false}
								onItemClick={() => setSidebarOpen(false)}
							/>
							<div
								style={{
									flex: '1',
									display: 'flex',
									'flex-direction': 'column',
									height: '100%',
									overflow: 'hidden'
								}}
							>
								<div
									style={{
										padding: '16px',
										'border-bottom': `1px solid ${
											props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)'
										}`,
										display: 'flex',
										'align-items': 'center',
										gap: '12px'
									}}
								>
									<Button
										icon='menu'
										variant='ghost'
										onClick={() => setSidebarOpen(!sidebarOpen())}
									>
										Menu
									</Button>
									<h2
										style={{
											'font-size': '1.25rem',
											'font-weight': '600',
											margin: '0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Application
									</h2>
								</div>
								<div
									style={{
										flex: '1',
										padding: '24px',
										overflow: 'auto',
										background: props.isDark()
											? 'hsl(240 20% 10%)'
											: 'rgba(248, 248, 248, 1)'
									}}
								>
									<h3
										style={{
											'font-size': '1.1rem',
											'font-weight': '600',
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Main Content
									</h3>
									<p
										style={{
											'font-size': '0.9rem',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)',
											'line-height': '1.6',
											margin: '0 0 16px 0'
										}}
									>
										Click the menu button to toggle the sidebar. The sidebar
										supports icons, separators, and can be controlled by any
										trigger you provide.
									</p>
									<div
										style={{
											display: 'grid',
											'grid-template-columns':
												'repeat(auto-fit, minmax(200px, 1fr))',
											gap: '16px',
											margin: '24px 0'
										}}
									>
										<For each={Array.from({ length: 4 })}>
											{(_, i) => (
												<div
													style={{
														padding: '16px',
														'border-radius': '8px',
														background: props.isDark()
															? 'rgba(30, 30, 30, 0.5)'
															: 'rgba(255, 255, 255, 0.8)',
														border: `1px solid ${
															props.isDark()
																? 'rgba(255, 255, 255, 0.1)'
																: 'rgba(0, 0, 0, 0.1)'
														}`
													}}
												>
													<h4
														style={{
															'font-size': '0.9rem',
															'font-weight': '600',
															margin: '0 0 8px 0',
															color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
														}}
													>
														Card {i() + 1}
													</h4>
													<p
														style={{
															'font-size': '0.8rem',
															color: props.isDark()
																? 'rgba(246, 246, 246, 0.6)'
																: 'rgba(26, 26, 26, 0.6)',
															margin: '0'
														}}
													>
														Content area
													</p>
												</div>
											)}
										</For>
									</div>
								</div>
							</div>
						</div>
					}
					code={`import { createSignal } from 'solid-js'
import { Sidebar } from '@sapphiresolid/ui'
import type { SidebarItem } from '@sapphiresolid/ui'
import { Button } from '@sapphiresolid/ui'

export function App() {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)

	const sidebarItems: SidebarItem[] = [
		{ label: 'Home', icon: 'home', onClick: () => {} },
		{ label: 'Dashboard', icon: 'dashboard', onClick: () => {} },
		{ label: 'Settings', icon: 'settings', onClick: () => {} },
		{ separator: true },
		{ label: 'Documents', icon: 'description', onClick: () => {} },
		{ label: 'Images', icon: 'image', onClick: () => {} },
		{ label: 'Videos', icon: 'video_library', onClick: () => {} },
		{ separator: true },
		{ label: 'Help', icon: 'help', onClick: () => {} },
		{ label: 'About', icon: 'info', onClick: () => {} }
	]

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Sidebar
				open={sidebarOpen()}
				items={sidebarItems}
				isDark={isDark}
				overlayMode={false}
				onItemClick={() => setSidebarOpen(false)}
			/>
			<div style={{ flex: '1', display: 'flex', 'flex-direction': 'column' }}>
				<div style={{ padding: '16px', 'border-bottom': '1px solid rgba(0,0,0,0.1)' }}>
					<Button icon="menu" onClick={() => setSidebarOpen(!sidebarOpen())}>
						Menu
					</Button>
				</div>
				<div style={{ flex: '1', padding: '24px', overflow: 'auto' }}>
					{/* Your content */}
				</div>
			</div>
		</div>
	)
}`}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Customization</h2>
				<p style={docsStyles.description(theme())}>
					The sidebar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</p>
				<CodeHighlight
					code={`@layer base {
  :root {
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
  }

  .dark,
  [data-theme="dark"] {
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
  }
}`}
					isDark={props.isDark}
				/>
				<p style={docsStyles.description(theme())}>
					The sidebar component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</p>
			</section>
		</article>
	)
}
