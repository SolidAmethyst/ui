import { Accessor, Component, createSignal, For } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Grid } from '../../../components/ui/grid'
import type { SidebarItem } from '../../../components/ui/sidebar'
import { Sidebar } from '../../../components/ui/sidebar'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { sidebarSnippets } from './code-snippets/sidebar-snippets'

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
			<Typography variant='h1' isDark={props.isDark()}>
				Sidebar
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				A composable, themeable and customizable sidebar component. Supports
				overlay and shift modes, icons, separators, and can be controlled by any
				trigger.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={sidebarSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Your First Sidebar */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Your First Sidebar
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					Let's start with a complete, self-contained sidebar example. This
					example demonstrates shift mode (sidebar shifts content), icons,
					separators, and custom trigger button.
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '600px',
								'max-width': '800px',
								margin: '0 auto',
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
									width: '100%',
									overflow: 'hidden',
									'min-height': '0',
									'min-width': '0'
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
										gap: '12px',
										'flex-shrink': '0'
									}}
								>
									<Button
										variant='trigger'
										iconPosition='only'
										title={sidebarOpen() ? 'Close Sidebar' : 'Open Sidebar'}
										active={sidebarOpen()}
										onClick={() => setSidebarOpen(!sidebarOpen())}
										style={{
											width: '28px',
											height: '28px'
										}}
									/>
									<Typography
										variant='h4'
										as='h2'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										Application
									</Typography>
								</div>
								<div
									style={{
										flex: '1 1 0',
										padding: '24px',
										overflow: 'hidden',
										background: props.isDark()
											? 'hsl(240 20% 10%)'
											: 'rgba(248, 248, 248, 1)',
										display: 'flex',
										'flex-direction': 'column',
										height: '100%',
										width: '100%',
										'box-sizing': 'border-box',
										'min-height': '0',
										'min-width': '0',
										position: 'relative'
									}}
								>
									<h3
										style={{
											'font-size': '1.1rem',
											'font-weight': '600',
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
											'flex-shrink': '0'
										}}
									>
										Main Content
									</h3>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0 0 16px 0', 'flex-shrink': '0' }}
									>
										Click the menu button to toggle the sidebar. The sidebar
										supports icons, separators, and can be controlled by any
										trigger you provide.
									</Typography>
									<Grid
										columns='repeat(3, minmax(0, 1fr))'
										rows='auto 1fr'
										gap='4px'
										preserveArea={{
											selector: '[data-preserve-area="true"]',
											minHeight: 200
										}}
										style={{
											flex: '1 1 0',
											width: '100%',
											'max-height': '100%',
											'box-sizing': 'border-box',
											'min-height': '0',
											'min-width': '0',
											overflow: 'hidden'
										}}
									>
										<For each={Array.from({ length: 4 })}>
											{(_, i) => (
												<div
													data-preserve-area={i() === 3 ? 'true' : undefined}
													style={{
														padding: '32px',
														'border-radius': '8px',
														background: props.isDark()
															? 'rgba(30, 30, 30, 0.5)'
															: 'rgba(255, 255, 255, 0.8)',
														border: `1px solid ${
															props.isDark()
																? 'rgba(255, 255, 255, 0.1)'
																: 'rgba(0, 0, 0, 0.1)'
														}`,
														'grid-column': i() === 3 ? '1 / -1' : 'auto',
														'grid-row': i() === 3 ? '2' : '1',
														display: 'flex',
														'flex-direction': 'column',
														'align-items': i() === 3 ? 'flex-start' : 'center',
														'justify-content':
															i() === 3 ? 'flex-start' : 'center',
														'box-sizing': 'border-box'
													}}
												>
													<Typography
														variant='h5'
														as='h4'
														isDark={props.isDark()}
														style={{ margin: '0 0 8px 0' }}
													>
														Card {i() + 1}
													</Typography>
													<Typography
														variant='caption'
														isDark={props.isDark()}
														style={{ margin: '0' }}
													>
														Content area
													</Typography>
												</div>
											)}
										</For>
									</Grid>
								</div>
							</div>
						</div>
					}
					code={sidebarSnippets.usage.yourFirstSidebarComplete}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The sidebar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={sidebarSnippets.usage.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The sidebar component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</Typography>
			</section>
		</article>
	)
}
