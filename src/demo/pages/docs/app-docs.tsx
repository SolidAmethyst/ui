import type { Accessor } from 'solid-js'
import { Component, For, createSignal, createEffect } from 'solid-js'
import type { SidebarItem } from '../../../components/ui/sidebar'
import { App } from '../../../composites/app'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { appSnippets } from './code-snippets/app-snippets'

interface AppDocsProps {
	isDark: Accessor<boolean>
}

export const AppDocs: Component<AppDocsProps> = props => {
	const [basicUsageDark, setBasicUsageDark] = createSignal(props.isDark())
	const [adaptiveLayoutDark, setAdaptiveLayoutDark] = createSignal(props.isDark())
	const [overlayModeDark, setOverlayModeDark] = createSignal(props.isDark())
	const [basicUsageOverridden, setBasicUsageOverridden] = createSignal(false)
	const [adaptiveLayoutOverridden, setAdaptiveLayoutOverridden] = createSignal(false)
	const [overlayModeOverridden, setOverlayModeOverridden] = createSignal(false)

	// Синхронизация с глобальной темой, если не переопределено локально
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

	return (
		<article
			style={{
				width: '100%',
				'max-width': '700px'
			}}
		>
			<h1
				style={{
					'font-size': '2rem',
					'font-weight': '700',
					margin: '0 0 8px 0',
					color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
				}}
			>
				App
			</h1>
			<p
				style={{
					'font-size': '1rem',
					'line-height': '1.6',
					color: props.isDark()
						? 'rgba(246, 246, 246, 0.7)'
						: 'rgba(26, 26, 26, 0.7)',
					margin: '0 0 32px 0'
				}}
			>
				Full-featured application composition with Window, TitleBar, and Sidebar
			</p>

			{/* Installation */}
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
					Installation
				</h2>
				<CodeHighlight code={appSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
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
					Basic Usage
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
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Adaptive Layout
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
										<h1
											style={{
												'font-size': '2rem',
												'font-weight': '700',
												margin: '0 0 16px 0',
												color: adaptiveLayoutDark() ? '#f6f6f6' : '#1a1a1a'
											}}
										>
											Welcome to My Application
										</h1>
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
															'border-radius': '8px',
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
														<h3
															style={{
																'font-size': '1.25rem',
																'font-weight': '600',
																margin: '0 0 8px 0',
																color: adaptiveLayoutDark()
																	? '#f6f6f6'
																	: '#1a1a1a'
															}}
														>
															Card {i() + 1}
														</h3>
														<p
															style={{
																'font-size': '0.9rem',
																color: adaptiveLayoutDark()
																	? 'rgba(246, 246, 246, 0.6)'
																	: 'rgba(26, 26, 26, 0.6)',
																margin: '0'
															}}
														>
															This is a sample card in the main content area.
														</p>
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
										<h1
											style={{
												'font-size': '2rem',
												'font-weight': '700',
												margin: '0 0 16px 0',
												color: overlayModeDark() ? '#f6f6f6' : '#1a1a1a'
											}}
										>
											Welcome to My Application
										</h1>
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
															'border-radius': '8px',
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
														<h3
															style={{
																'font-size': '1.25rem',
																'font-weight': '600',
																margin: '0 0 8px 0',
																color: overlayModeDark() ? '#f6f6f6' : '#1a1a1a'
															}}
														>
															Card {i() + 1}
														</h3>
														<p
															style={{
																'font-size': '0.9rem',
																color: overlayModeDark()
																	? 'rgba(246, 246, 246, 0.6)'
																	: 'rgba(26, 26, 26, 0.6)',
																margin: '0'
															}}
														>
															This is a sample card in the main content area.
														</p>
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
