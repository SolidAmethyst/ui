import type { Accessor } from 'solid-js'
import { Component, For, createEffect, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import type { SidebarItem } from '../../../components/ui/sidebar'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { App } from '../../../composites/app'
import { docsStyles } from '../../lib/docs.styles'
import { appSnippets } from './code-snippets/app-snippets'

interface AppDocsProps {
	isDark: Accessor<boolean>
}

export const AppDocs: Component<AppDocsProps> = props => {
	const [basicUsageDark, setBasicUsageDark] = createSignal(false)
	const [adaptiveLayoutDark, setAdaptiveLayoutDark] = createSignal(false)
	const [overlayModeDark, setOverlayModeDark] = createSignal(false)
	const [basicUsageOverridden, setBasicUsageOverridden] = createSignal(false)
	const [adaptiveLayoutOverridden, setAdaptiveLayoutOverridden] =
		createSignal(false)
	const [overlayModeOverridden, setOverlayModeOverridden] = createSignal(false)

	// Track previous global theme value to detect changes
	const [previousGlobalTheme, setPreviousGlobalTheme] = createSignal<
		boolean | undefined
	>(undefined)

	// Reset all local theme overrides when global theme changes
	createEffect(() => {
		const currentGlobalTheme = props.isDark()
		const prevTheme = previousGlobalTheme()
		// Check if global theme actually changed (skip initial undefined)
		if (prevTheme !== undefined && prevTheme !== currentGlobalTheme) {
			// Reset all override flags
			setBasicUsageOverridden(false)
			setAdaptiveLayoutOverridden(false)
			setOverlayModeOverridden(false)
			// Set local themes to match global theme
			setBasicUsageDark(currentGlobalTheme)
			setAdaptiveLayoutDark(currentGlobalTheme)
			setOverlayModeDark(currentGlobalTheme)
		}
		// Update previous value
		setPreviousGlobalTheme(currentGlobalTheme)
	})

	// Sync with global theme if not overridden locally
	createEffect(() => {
		if (!basicUsageOverridden()) {
			setBasicUsageDark(props.isDark())
		}
		if (!adaptiveLayoutOverridden()) {
			setAdaptiveLayoutDark(props.isDark())
		}
		if (!overlayModeOverridden()) {
			setOverlayModeDark(props.isDark())
		}
	})

	const toggleBasicTheme = () => {
		setBasicUsageOverridden(true)
		setBasicUsageDark(!basicUsageDark())
	}

	const toggleAdaptiveLayoutTheme = () => {
		setAdaptiveLayoutOverridden(true)
		setAdaptiveLayoutDark(!adaptiveLayoutDark())
	}

	const toggleOverlayModeTheme = () => {
		setOverlayModeOverridden(true)
		setOverlayModeDark(!overlayModeDark())
	}

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

	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				App
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Full-featured application composition with Window, TitleBar, and Sidebar
			</Typography>

			{/* Installation */}
			<section style={{ 'margin-bottom': '32px' }}>
				<Typography variant='h4' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={appSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
			<section style={{ 'margin-bottom': '32px' }}>
				<Typography variant='h4' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							data-app-preview
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '0',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<App
								isDark={basicUsageDark()}
								toggleTheme={toggleBasicTheme}
								sidebarItems={sidebarItems}
								title='My Application'
							>
								<div
									style={{
										flex: '1',
										'min-height': '0',
										width: '100%',
										'max-width': '100%',
										padding: '32px',
										'box-sizing': 'border-box',
										background: basicUsageDark()
											? 'hsl(240 20% 10%)'
											: 'rgba(248, 248, 248, 1)',
										overflow: 'auto'
									}}
								/>
							</App>
						</div>
					}
					code={appSnippets.usage.basicUsage}
				/>
			</section>

			{/* Adaptive Layout */}
			<section style={{ 'margin-bottom': '32px' }}>
				<Typography variant='h4' as='h2' isDark={props.isDark()}>
					Adaptive Layout
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							data-app-preview
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '0',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<App
								isDark={adaptiveLayoutDark()}
								toggleTheme={toggleAdaptiveLayoutTheme}
								sidebarItems={sidebarItems}
								title='My Application'
							>
								<div
									style={{
										flex: '1',
										'min-height': '0',
										width: '100%',
										'max-width': '100%',
										padding: '32px',
										'box-sizing': 'border-box',
										background: adaptiveLayoutDark()
											? 'hsl(240 20% 10%)'
											: 'rgba(248, 248, 248, 1)',
										overflow: 'auto'
									}}
								>
									<div
										style={{
											width: '100%',
											'max-width': 'min(100%, 1200px)',
											'min-width': '0',
											margin: '0 auto',
											'box-sizing': 'border-box'
										}}
									>
										<Typography variant='h2' isDark={adaptiveLayoutDark()} style={{ margin: '0 0 16px 0' }}>
											Welcome to My Application
										</Typography>
										<div
											style={{
												display: 'grid',
												'grid-template-columns':
													'repeat(auto-fit, minmax(200px, 1fr))',
												gap: '16px',
												margin: '24px 0',
												width: '100%',
												'max-width': '100%',
												'min-width': '0',
												'box-sizing': 'border-box'
											}}
										>
											<For each={Array.from({ length: 6 })}>
												{(_, i) => (
													<div
														style={{
															padding: '24px',
															'border-radius': '0',
															background: adaptiveLayoutDark()
																? 'rgba(30, 30, 30, 0.5)'
																: 'rgba(255, 255, 255, 0.8)',
															border: `1px solid ${
																adaptiveLayoutDark()
																	? 'rgba(255, 255, 255, 0.1)'
																	: 'rgba(0, 0, 0, 0.1)'
															}`,
															'box-shadow': adaptiveLayoutDark()
																? '0 2px 8px rgba(0, 0, 0, 0.3)'
																: '0 2px 8px rgba(0, 0, 0, 0.1)',
															width: '100%',
															'max-width': '100%',
															'min-width': '0',
															'box-sizing': 'border-box',
															overflow: 'hidden',
															'word-wrap': 'break-word',
															'overflow-wrap': 'break-word'
														}}
													>
														<Typography
															variant='h4'
															as='h3'
															isDark={adaptiveLayoutDark()}
															style={{ margin: '0 0 8px 0' }}
														>
															Card {i() + 1}
														</Typography>
														<Typography variant='small' isDark={adaptiveLayoutDark()} style={{ margin: '0' }}>
															This is a sample card in the main content area.
														</Typography>
													</div>
												)}
											</For>
										</div>
									</div>
								</div>
							</App>
						</div>
					}
					code={appSnippets.usage.adaptiveLayout}
				/>
			</section>

			{/* Overlay Menu */}
			<section style={{ 'margin-bottom': '32px' }}>
				<Typography variant='h4' as='h2' isDark={props.isDark()}>
					Overlay Menu
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							data-app-preview
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '0',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<App
								isDark={overlayModeDark()}
								toggleTheme={toggleOverlayModeTheme}
								sidebarItems={sidebarItems}
								overlayMode={true}
								title='My Application'
							>
								<div
									style={{
										flex: '1',
										'min-height': '0',
										width: '100%',
										'max-width': '100%',
										padding: '32px',
										'box-sizing': 'border-box',
										background: overlayModeDark()
											? 'hsl(240 20% 10%)'
											: 'rgba(248, 248, 248, 1)',
										overflow: 'auto'
									}}
								>
									<div
										style={{
											width: '100%',
											'max-width': 'min(100%, 1200px)',
											'min-width': '0',
											margin: '0 auto',
											'box-sizing': 'border-box'
										}}
									>
										<Typography variant='h2' isDark={overlayModeDark()} style={{ margin: '0 0 16px 0' }}>
											Welcome to My Application
										</Typography>
										<div
											style={{
												display: 'grid',
												'grid-template-columns':
													'repeat(auto-fit, minmax(200px, 1fr))',
												gap: '16px',
												margin: '24px 0',
												width: '100%',
												'max-width': '100%',
												'min-width': '0',
												'box-sizing': 'border-box'
											}}
										>
											<For each={Array.from({ length: 6 })}>
												{(_, i) => (
													<div
														style={{
															padding: '24px',
															'border-radius': '0',
															background: overlayModeDark()
																? 'rgba(30, 30, 30, 0.5)'
																: 'rgba(255, 255, 255, 0.8)',
															border: `1px solid ${
																overlayModeDark()
																	? 'rgba(255, 255, 255, 0.1)'
																	: 'rgba(0, 0, 0, 0.1)'
															}`,
															'box-shadow': overlayModeDark()
																? '0 2px 8px rgba(0, 0, 0, 0.3)'
																: '0 2px 8px rgba(0, 0, 0, 0.1)',
															width: '100%',
															'max-width': '100%',
															'min-width': '0',
															'box-sizing': 'border-box',
															overflow: 'hidden',
															'word-wrap': 'break-word',
															'overflow-wrap': 'break-word'
														}}
													>
														<Typography
															variant='h4'
															as='h3'
															isDark={overlayModeDark()}
															style={{ margin: '0 0 8px 0' }}
														>
															Card {i() + 1}
														</Typography>
														<Typography variant='small' isDark={overlayModeDark()} style={{ margin: '0' }}>
															This is a sample card in the main content area.
														</Typography>
													</div>
												)}
											</For>
										</div>
									</div>
								</div>
							</App>
						</div>
					}
					code={appSnippets.usage.overlayMode}
				/>
			</section>
		</article>
	)
}
