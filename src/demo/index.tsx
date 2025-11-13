import type { JSX } from 'solid-js'
import { createSignal, Show } from 'solid-js'
import { Container } from '../components/ui/container'
import { ScrollbarProvider } from '../components/ui/scrollbar'
import { HighlightContext } from '../components/ui/code-highlight/lib/highlight-context'
import type { GlassSettings, HighlightsSettings } from '../composites/settings'
import { SettingsComposite } from '../composites/settings'
import '../styles/globals.css'
import { Footer, Sidebar, TopNav } from './components/layout'
import { BlocksPage } from './pages/blocks-page'
import {
	AppDocs,
	ButtonDocs,
	CodeHighlightDocs,
	CommandDocs,
	DrawerDocs,
	GridDocs,
	InstallationDocs,
	IntroductionDocs,
	NumberInputDocs,
	ScrollbarDocs,
	SearchDocs,
	SidebarDocs,
	SliderDocs,
	TabsDocs,
	TechChipDocs,
	TitleBarDocs
} from './pages/docs'
import { SettingsPage } from './pages/settings-page'
import { TestPage } from './pages/test-page'
import './styles.css'

function App() {
	const [isDark, setIsDark] = createSignal(true)
	const [currentPage, setCurrentPage] = createSignal<
		'docs' | 'blocks' | 'settings'
	>('docs')
	const [currentComponent, setCurrentComponent] = createSignal<string | null>(
		'introduction'
	)

	// Glass settings state
	const [glassEnabled, setGlassEnabled] = createSignal(true)
	const [glassBlur, setGlassBlur] = createSignal(0)
	const [glassOpacity, setGlassOpacity] = createSignal(0)
	const [glassDarkness, setGlassDarkness] = createSignal(0)
	const [glassSaturation, setGlassSaturation] = createSignal(0)
	const [glassSettingsOpen, setGlassSettingsOpen] = createSignal(false)

	// Highlights settings state
	const [highlightsProfile, setHighlightsProfile] = createSignal<'default' | 'monokai' | 'dracula' | 'github' | 'vs-code' | 'one-dark'>('default')

	const toggleTheme = () => {
		setIsDark(!isDark())
	}

	const handlePageChange = (page: 'docs' | 'blocks' | 'settings') => {
		setCurrentPage(page)
		if (page === 'docs') {
			setCurrentComponent('introduction')
		}
	}

	return (
		<ScrollbarProvider>
			<HighlightContext.Provider value={{ profile: highlightsProfile }}>
				<div
				data-theme={isDark() ? 'dark' : 'light'}
				style={
					{
						'font-family': 'Montserrat, sans-serif',
						'min-height': '100vh',
						width: '100%',
						margin: '0',
						padding: '0',
						'box-sizing': 'border-box',
						'overflow-x': 'hidden',
						background: isDark() ? 'hsl(240 20% 8%)' : '#ffffff',
						color: isDark() ? '#f6f6f6' : '#1a1a1a',
						transition: 'background 0.3s ease, color 0.3s ease',
						'--text-color': isDark() ? '#ffffff' : '#1a1a1a',
						'--icon-color': isDark() ? '#ffffff' : '#1a1a1a'
					} as JSX.CSSProperties & Record<`--${string}`, string>
				}
			>
				<TopNav
					isDark={isDark}
					toggleTheme={toggleTheme}
					currentPage={currentPage()}
					onPageChange={handlePageChange}
					onSettingsClick={() => setGlassSettingsOpen(!glassSettingsOpen())}
					glassEnabled={glassEnabled()}
					glassBlur={glassBlur()}
					glassOpacity={glassOpacity()}
					glassDarkness={glassDarkness()}
					glassSaturation={glassSaturation()}
				/>

				<SettingsComposite
					isOpen={glassSettingsOpen()}
					onClose={() => setGlassSettingsOpen(false)}
					isDark={isDark}
					onThemeChange={setIsDark}
					glassSettings={{
						enabled: glassEnabled(),
						blur: glassBlur(),
						opacity: glassOpacity(),
						darkness: glassDarkness(),
						saturation: glassSaturation()
					}}
					onGlassSettingsChange={(settings: GlassSettings) => {
						setGlassEnabled(settings.enabled)
						setGlassBlur(settings.blur)
						setGlassOpacity(settings.opacity)
						setGlassDarkness(settings.darkness)
						setGlassSaturation(settings.saturation)
					}}
					highlightsSettings={{
						profile: highlightsProfile()
					}}
					onHighlightsSettingsChange={(settings: HighlightsSettings) => {
						setHighlightsProfile(settings.profile)
					}}
				/>

				<Show when={currentPage() === 'blocks'}>
					<BlocksPage isDark={isDark} />
				</Show>

				<Show when={currentPage() === 'settings'}>
					<div
						style={{
							'padding-top': '60px',
							width: '100%',
							'min-height': 'calc(100vh - 60px)',
							'box-sizing': 'border-box',
							position: 'relative',
							display: 'flex',
							'flex-direction': 'column'
						}}
					>
						<Container
							padding='0'
							style={{
								flex: '1',
								display: 'flex',
								'flex-direction': 'column',
								height: 'calc(100vh - 60px)'
							}}
						>
							<div
								style={{
									display: 'flex',
									width: '100%',
									flex: '1',
									'box-sizing': 'border-box',
									gap: '32px',
									position: 'relative',
									padding: '0 32px',
									overflow: 'hidden'
								}}
							>
								<SettingsPage
									isDark={isDark}
									glassSettings={{
										enabled: glassEnabled(),
										blur: glassBlur(),
										opacity: glassOpacity(),
										darkness: glassDarkness(),
										saturation: glassSaturation()
									}}
									onGlassSettingsChange={(settings: GlassSettings) => {
										setGlassEnabled(settings.enabled)
										setGlassBlur(settings.blur)
										setGlassOpacity(settings.opacity)
										setGlassDarkness(settings.darkness)
										setGlassSaturation(settings.saturation)
									}}
								/>
								{/* Invisible spacer for symmetry with sidebar */}
								<div
									style={{
										width: '220px',
										'min-width': '220px',
										'max-width': '220px',
										'flex-shrink': '0',
										visibility: 'hidden',
										'pointer-events': 'none'
									}}
								/>
							</div>
						</Container>
					</div>
				</Show>

				<Show when={currentPage() === 'docs'}>
					<div
						style={{
							'padding-top': '60px',
							width: '100%',
							'min-height': 'calc(100vh - 60px)',
							'box-sizing': 'border-box',
							position: 'relative',
							display: 'flex',
							'flex-direction': 'column'
						}}
					>
						<Container
							padding='0'
							style={{
								flex: '1',
								display: 'flex',
								'flex-direction': 'column'
							}}
						>
							<div
								data-docs-container
								style={{
									display: 'flex',
									width: '100%',
									flex: '1',
									'box-sizing': 'border-box',
									gap: '0',
									position: 'relative',
									padding: '24px 32px 0 32px',
									'align-items': 'flex-start'
								}}
							>
								{/* Debug line to check alignment */}
								{/* <div
									style={{
										position: 'absolute',
										top: '24px',
										left: '32px',
										right: '32px',
										height: '2px',
										background: 'red',
										'z-index': '9999',
										'pointer-events': 'none'
									}}
								/> */}
								<Sidebar
									isDark={isDark}
									currentComponent={currentComponent()}
									onComponentSelect={setCurrentComponent}
								/>
								<main
									style={{
										flex: '1 1 0%',
										'min-width': '0',
										width: '100%',
										'box-sizing': 'border-box',
										padding: '0',
										display: 'flex',
										'flex-direction': 'column',
										position: 'relative',
										margin: '0'
									}}
								>
									<div
										style={{
											width: '100%',
											'max-width': '100%',
											'box-sizing': 'border-box',
											padding: '0',
											overflow: 'hidden',
											'overflow-x': 'hidden',
											flex: '1'
										}}
									>
										<Show when={currentComponent() === 'introduction'}>
											<IntroductionDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'installation'}>
											<InstallationDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'button'}>
											<ButtonDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'code-highlight'}>
											<CodeHighlightDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'command'}>
											<CommandDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'drawer'}>
											<DrawerDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'grid'}>
											<GridDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'number-input'}>
											<NumberInputDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'sidebar'}>
											<SidebarDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'techchip'}>
											<TechChipDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'scrollbar'}>
											<ScrollbarDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'search'}>
											<SearchDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'slider'}>
											<SliderDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'tabs'}>
											<TabsDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'titlebar'}>
											<TitleBarDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'app'}>
											<AppDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'test'}>
											<TestPage isDark={isDark} />
										</Show>
									</div>
								</main>
								{/* Invisible spacer for symmetry with sidebar */}
								<div
									style={{
										width: '220px',
										'min-width': '220px',
										'max-width': '220px',
										'flex-shrink': '0',
										visibility: 'hidden',
										'pointer-events': 'none'
									}}
								/>
							</div>
							<Footer isDark={isDark} />
						</Container>
					</div>
				</Show>
			</div>
			</HighlightContext.Provider>
		</ScrollbarProvider>
	)
}

// Export for use in Astro
export default App

// For Vite/standalone usage
if (typeof window !== 'undefined' && document.getElementById('app')) {
	import('solid-js/web').then(({ render }) => {
		render(() => <App />, document.getElementById('app')!)
	})
}
