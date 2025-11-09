import { Accessor, Component, createSignal, Show } from 'solid-js'
import type { SidebarItem } from '../../components/ui/sidebar'
import { Sidebar } from '../../components/ui/sidebar'
import { TitleBar } from '../../components/ui/title-bar'
import { Window } from '../../components/ui/window'

interface AppDemoProps {
	isDark: Accessor<boolean>
	toggleTheme: () => void
	overlayMode?: boolean
}

export const AppDemo: Component<AppDemoProps> = props => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)
	const [maximized, setMaximized] = createSignal(false)
	const [pinned, setPinned] = createSignal(false)

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

	const handleMinimize = () => {
		console.log('Minimize clicked')
	}

	const handleMaximize = () => {
		setMaximized(!maximized())
	}

	const handleClose = () => {
		console.log('Close clicked')
	}

	const handlePin = () => {
		setPinned(!pinned())
	}

	return (
		<Window
			style={{
				background: props.isDark() ? 'hsl(240 20% 8%)' : '#ffffff',
				color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
			}}
			titleBar={
				<TitleBar
					title='My Application'
					isDark={props.isDark()}
					maximized={maximized()}
					pinned={pinned()}
					onBurgerClick={() => setSidebarOpen(!sidebarOpen())}
					onThemeToggle={props.toggleTheme}
					onDebugClick={() => console.log('Debug clicked')}
					onPinClick={handlePin}
					onSettingsClick={() => console.log('Settings clicked')}
					onMinimizeClick={handleMinimize}
					onMaximizeClick={handleMaximize}
					onCloseClick={handleClose}
				/>
			}
			sidebar={props.overlayMode ? undefined : (
				<Sidebar
					open={sidebarOpen()}
					items={sidebarItems}
					isDark={props.isDark()}
					overlayMode={false}
					onItemClick={() => setSidebarOpen(false)}
				/>
			)}
		>
			{/* Overlay mode: backdrop + sidebar */}
			<Show when={props.overlayMode}>
				{/* Backdrop */}
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
						'z-index': '999',
						opacity: sidebarOpen() ? '1' : '0',
						visibility: sidebarOpen() ? 'visible' : 'hidden',
						transition:
							'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), visibility 300ms cubic-bezier(0.4, 0, 0.2, 1)',
						'pointer-events': sidebarOpen() ? 'auto' : 'none'
					}}
				/>
				{/* Overlay Sidebar */}
				<Sidebar
					open={sidebarOpen()}
					items={sidebarItems}
					isDark={props.isDark()}
					overlayMode={true}
					onItemClick={() => setSidebarOpen(false)}
				/>
			</Show>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '24px',
					'box-sizing': 'border-box',
					overflow: 'auto',
					background: props.isDark()
						? 'hsl(240 20% 10%)'
						: 'rgba(248, 248, 248, 1)'
				}}
			>
				<div
					style={{
						'max-width': '1200px',
						margin: '0 auto'
					}}
				>
					<h1
						style={{
							'font-size': '2rem',
							'font-weight': '700',
							margin: '0 0 16px 0',
							color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
						}}
					>
						Welcome to My Application
					</h1>
					<p
						style={{
							'font-size': '1rem',
							'line-height': '1.6',
							color: props.isDark()
								? 'rgba(246, 246, 246, 0.7)'
								: 'rgba(26, 26, 26, 0.7)',
							margin: '0 0 24px 0'
						}}
					>
						This is a full-featured application demo with TitleBar and side
						menu. Click the burger menu icon in the top-left corner to open the
						sidebar.
					</p>
					<div
						style={{
							display: 'grid',
							'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
							gap: '16px',
							margin: '24px 0'
						}}
					>
						<For each={Array.from({ length: 6 })}>
							{(_, i) => (
								<div
									style={{
										padding: '24px',
										'border-radius': '8px',
										background: props.isDark()
											? 'rgba(30, 30, 30, 0.5)'
											: 'rgba(255, 255, 255, 0.8)',
										border: `1px solid ${
											props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)'
										}`,
										'box-shadow': props.isDark()
											? '0 2px 8px rgba(0, 0, 0, 0.3)'
											: '0 2px 8px rgba(0, 0, 0, 0.1)'
									}}
								>
									<h3
										style={{
											'font-size': '1.25rem',
											'font-weight': '600',
											margin: '0 0 8px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Card {i() + 1}
									</h3>
									<p
										style={{
											'font-size': '0.9rem',
											color: props.isDark()
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
		</Window>
	)
}
