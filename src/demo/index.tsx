import type { JSX } from 'solid-js'
import { createSignal, Show } from 'solid-js'
import { render } from 'solid-js/web'
import { ScrollbarProvider } from '../components/ui/scrollbar'
import '../styles/globals.css'
import { Footer, Sidebar, TopNav } from './components/layout'
import { DemoPage } from './pages/demo-page'
import {
	AppDocs,
	ButtonDocs,
	GridDocs,
	InstallationDocs,
	IntroductionDocs,
	ScrollbarDocs,
	SidebarDocs,
	TechChipDocs,
	TitleBarDocs
} from './pages/docs'
import './styles.css'

function App() {
	const [isDark, setIsDark] = createSignal(true)
	const [currentPage, setCurrentPage] = createSignal<'demo' | 'docs'>('demo')
	const [currentComponent, setCurrentComponent] = createSignal<string | null>(
		'introduction'
	)

	const toggleTheme = () => {
		setIsDark(!isDark())
	}

	const handlePageChange = (page: 'demo' | 'docs') => {
		setCurrentPage(page)
		if (page === 'docs') {
			setCurrentComponent('introduction')
		}
	}

	return (
		<ScrollbarProvider>
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
				/>

				<Show when={currentPage() === 'demo'}>
					<div
						style={{
							'padding-top': '60px',
							width: '100%',
							'box-sizing': 'border-box',
							'min-height': 'calc(100vh - 60px)'
						}}
					>
						<DemoPage isDark={isDark} toggleTheme={toggleTheme} />
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
						<div
							style={{
								width: '100%',
								'max-width': '1400px',
								margin: '0 auto',
								flex: '1',
								'box-sizing': 'border-box',
								padding: '0',
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
									gap: '32px',
									position: 'relative',
									padding: '0 32px'
								}}
							>
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
										position: 'relative'
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
									<Show when={currentComponent() === 'grid'}>
										<GridDocs isDark={isDark} />
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
										<Show when={currentComponent() === 'titlebar'}>
											<TitleBarDocs isDark={isDark} />
										</Show>
										<Show when={currentComponent() === 'app'}>
											<AppDocs isDark={isDark} />
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
						</div>
					</div>
				</Show>
			</div>
		</ScrollbarProvider>
	)
}

render(() => <App />, document.getElementById('app')!)
