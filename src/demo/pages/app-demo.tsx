import { Accessor, Component, createSignal, For, Show } from 'solid-js'
import type { MenuItem } from '../../components/ui/menu'
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

	const sidebarItems: MenuItem[] = [
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

	const renderSidebar = () => (
		<aside
			style={{
				...(props.overlayMode
					? {
							position: 'absolute' as const,
							top: '0',
							left: sidebarOpen() ? '0' : '-250px',
							width: '250px',
							height: '100%',
							'z-index': '1000',
							transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
					  }
					: {
							width: sidebarOpen() ? '250px' : '0',
							height: '100%',
							overflow: 'hidden',
							transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
							position: 'relative' as const,
							'z-index': '100'
					  }),
				background: props.isDark()
					? 'rgba(30, 30, 30, 0.95)'
					: 'rgba(255, 255, 255, 0.95)',
				'backdrop-filter': 'blur(20px) saturate(180%)',
				'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
				border: 'none',
				'box-sizing': 'border-box' as const,
				overflow: props.overlayMode ? ('auto' as const) : ('hidden' as const)
			}}
		>
			<Show when={sidebarOpen()}>
				<div
					style={{
						width: '250px',
						height: '100%',
						padding: '16px 0',
						'box-sizing': 'border-box',
						overflow: 'auto'
					}}
				>
					<ul
						style={{
							'list-style': 'none',
							margin: '0',
							padding: '0',
							display: 'flex',
							'flex-direction': 'column',
							gap: '4px'
						}}
					>
						<For each={sidebarItems}>
							{item => (
								<>
									<Show when={item.separator}>
										<li
											style={{
												height: '1px',
												'background-color': props.isDark()
													? 'rgba(255, 255, 255, 0.1)'
													: 'rgba(0, 0, 0, 0.1)',
												margin: '8px 12px'
											}}
										/>
									</Show>
									<Show when={!item.separator}>
										<li>
											<button
												type='button'
												onClick={() => {
													item.onClick?.()
													setSidebarOpen(false)
												}}
												disabled={item.disabled}
												style={{
													width: '100%',
													display: 'flex',
													'align-items': 'center',
													gap: '12px',
													padding: '10px 16px',
													'border-radius': '0',
													cursor: item.disabled ? 'not-allowed' : 'pointer',
													'font-size': '14px',
													color: item.disabled
														? props.isDark()
															? 'rgba(255, 255, 255, 0.4)'
															: 'rgba(0, 0, 0, 0.4)'
														: props.isDark()
														? 'rgba(255, 255, 255, 0.9)'
														: 'rgba(0, 0, 0, 0.9)',
													transition:
														'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
													'background-color': 'transparent',
													border: 'none',
													'text-align': 'left',
													'box-sizing': 'border-box',
													opacity: item.disabled ? 0.5 : 1
												}}
												onMouseEnter={e => {
													if (!item.disabled) {
														e.currentTarget.style.backgroundColor =
															props.isDark()
																? 'rgba(255, 255, 255, 0.1)'
																: 'rgba(0, 0, 0, 0.05)'
													}
												}}
												onMouseLeave={e => {
													e.currentTarget.style.backgroundColor = 'transparent'
												}}
											>
												<Show when={item.icon}>
													<span
														class='material-symbols-rounded'
														style={{
															'font-size': '20px',
															width: '20px',
															height: '20px',
															display: 'flex',
															'align-items': 'center',
															'justify-content': 'center'
														}}
													>
														{item.icon}
													</span>
												</Show>
												<span style={{ flex: '1' }}>{item.label}</span>
											</button>
										</li>
									</Show>
								</>
							)}
						</For>
					</ul>
				</div>
			</Show>
		</aside>
	)

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
			sidebar={props.overlayMode ? undefined : renderSidebar()}
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
				{renderSidebar()}
			</Show>
			<div
				style={{
					flex: '1',
					'min-height': '0',
					width: '100%',
					'max-width': '100%',
					padding: '32px',
					'box-sizing': 'border-box',
					background: props.isDark()
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
							'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
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
