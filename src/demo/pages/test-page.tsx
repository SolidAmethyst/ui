import { Component } from 'solid-js'
import { Grid } from '../../components/ui/grid'
import type { SidebarItem } from '../../components/ui/sidebar'
import { App } from '../../composites/app'

interface TestPageProps {
	isDark: () => boolean
}

export const TestPage: Component<TestPageProps> = props => {
	// Sidebar items for the test app
	const sidebarItems: SidebarItem[] = [
		{
			id: 'dashboard',
			label: 'Dashboard',
			icon: 'dashboard',
			onClick: () => console.log('Dashboard clicked')
		},
		{
			id: 'analytics',
			label: 'Analytics',
			icon: 'analytics',
			onClick: () => console.log('Analytics clicked')
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: 'settings',
			onClick: () => console.log('Settings clicked')
		},
		{
			separator: true
		},
		{
			id: 'help',
			label: 'Help',
			icon: 'help',
			onClick: () => console.log('Help clicked')
		}
	]

	return (
		<div
			style={{
				width: '100%',
				height: 'calc(100vh - 60px)',
				padding: '32px',
				'box-sizing': 'border-box',
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center'
			}}
		>
			<App
				title='Grid Test App'
				isDark={props.isDark}
				sidebarItems={sidebarItems}
				overlayMode={false}
				style={{
					width: '800px',
					height: '800px',
					'max-width': '90vw',
					'max-height': '90vh',
					'box-shadow': props.isDark()
						? '0 20px 60px rgba(0, 0, 0, 0.5)'
						: '0 20px 60px rgba(0, 0, 0, 0.2)',
					'border-radius': '12px',
					overflow: 'hidden'
				}}
			>
				{/* Main content area with Grid */}
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						'flex-direction': 'column',
						padding: '24px',
						'box-sizing': 'border-box',
						overflow: 'hidden'
					}}
				>
					{/* Fixed height header */}
					<div
						style={{
							height: '80px',
							'min-height': '80px',
							'max-height': '80px',
							'margin-bottom': '16px',
							display: 'flex',
							'flex-direction': 'column',
							gap: '8px',
							'flex-shrink': '0'
						}}
					>
						<h2
							style={{
								margin: '0',
								'font-size': '1.5rem',
								'font-weight': '700',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								'line-height': '1.2'
							}}
						>
							Preserve Area Demo
						</h2>
						<p
							style={{
								margin: '0',
								'font-size': '0.875rem',
								color: props.isDark()
									? 'rgba(246, 246, 246, 0.6)'
									: 'rgba(26, 26, 26, 0.6)',
								'line-height': '1.4',
								overflow: 'hidden',
								'text-overflow': 'ellipsis'
							}}
						>
							Toggle the sidebar (burger menu) to see how Card 4 maintains its
							area while Cards 1-3 shrink.
						</p>
					</div>

					<Grid
						columns='repeat(3, minmax(0, 1fr))'
						rows='100px 1fr'
						gap='12px'
						preserveArea={{
							selector: '[data-preserve-area="true"]',
							minHeight: '50px'
						}}
						style={{
							flex: '1 1 0',
							width: '100%',
							height: '100%',
							'box-sizing': 'border-box',
							'min-height': '0',
							'min-width': '0',
							overflow: 'hidden'
						}}
					>
						{/* Card 1 */}
						<div
							style={{
								padding: '20px',
								'border-radius': '8px',
								background: props.isDark()
									? 'rgba(34, 197, 94, 0.12)'
									: 'rgba(34, 197, 94, 0.1)',
								border: `2px solid ${
									props.isDark()
										? 'rgba(34, 197, 94, 0.3)'
										: 'rgba(34, 197, 94, 0.25)'
								}`,
								display: 'flex',
								'flex-direction': 'column',
								'align-items': 'center',
								'justify-content': 'center',
								gap: '8px',
								'box-sizing': 'border-box',
								height: '100%',
								overflow: 'hidden'
							}}
						>
							<div
								style={{
									'font-size': '1.1rem',
									'font-weight': '700',
									color: props.isDark() ? '#22c55e' : '#16a34a',
									'white-space': 'nowrap'
								}}
							>
								Card 1
							</div>
							<div
								style={{
									'font-size': '0.875rem',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.6)'
										: 'rgba(26, 26, 26, 0.6)',
									'text-align': 'center',
									'white-space': 'nowrap'
								}}
							>
								Statistics
							</div>
						</div>

						{/* Card 2 */}
						<div
							style={{
								padding: '20px',
								'border-radius': '8px',
								background: props.isDark()
									? 'rgba(59, 130, 246, 0.12)'
									: 'rgba(59, 130, 246, 0.1)',
								border: `2px solid ${
									props.isDark()
										? 'rgba(59, 130, 246, 0.3)'
										: 'rgba(59, 130, 246, 0.25)'
								}`,
								display: 'flex',
								'flex-direction': 'column',
								'align-items': 'center',
								'justify-content': 'center',
								gap: '8px',
								'box-sizing': 'border-box',
								height: '100%',
								overflow: 'hidden'
							}}
						>
							<div
								style={{
									'font-size': '1.1rem',
									'font-weight': '700',
									color: props.isDark() ? '#3b82f6' : '#2563eb',
									'white-space': 'nowrap'
								}}
							>
								Card 2
							</div>
							<div
								style={{
									'font-size': '0.875rem',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.6)'
										: 'rgba(26, 26, 26, 0.6)',
									'text-align': 'center',
									'white-space': 'nowrap'
								}}
							>
								Activity
							</div>
						</div>

						{/* Card 3 */}
						<div
							style={{
								padding: '20px',
								'border-radius': '8px',
								background: props.isDark()
									? 'rgba(168, 85, 247, 0.12)'
									: 'rgba(168, 85, 247, 0.1)',
								border: `2px solid ${
									props.isDark()
										? 'rgba(168, 85, 247, 0.3)'
										: 'rgba(168, 85, 247, 0.25)'
								}`,
								display: 'flex',
								'flex-direction': 'column',
								'align-items': 'center',
								'justify-content': 'center',
								gap: '8px',
								'box-sizing': 'border-box',
								height: '100%',
								overflow: 'hidden'
							}}
						>
							<div
								style={{
									'font-size': '1.1rem',
									'font-weight': '700',
									color: props.isDark() ? '#a855f7' : '#9333ea',
									'white-space': 'nowrap'
								}}
							>
								Card 3
							</div>
							<div
								style={{
									'font-size': '0.875rem',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.6)'
										: 'rgba(26, 26, 26, 0.6)',
									'text-align': 'center',
									'white-space': 'nowrap'
								}}
							>
								Notifications
							</div>
						</div>

						{/* Card 4 - Priority card with preserve area */}
						<div
							data-preserve-area='true'
							style={{
								padding: '24px',
								'border-radius': '8px',
								background: props.isDark()
									? 'rgba(236, 72, 153, 0.15)'
									: 'rgba(236, 72, 153, 0.12)',
								border: `3px solid ${
									props.isDark()
										? 'rgba(236, 72, 153, 0.4)'
										: 'rgba(236, 72, 153, 0.3)'
								}`,
								'grid-column': '1 / -1',
								'grid-row': '2',
								display: 'flex',
								'flex-direction': 'column',
								'align-items': 'flex-start',
								'justify-content': 'flex-start',
								gap: '12px',
								'box-sizing': 'border-box',
								overflow: 'hidden',
								'box-shadow': props.isDark()
									? '0 4px 16px rgba(236, 72, 153, 0.2)'
									: '0 4px 16px rgba(236, 72, 153, 0.15)'
							}}
						>
							<div
								style={{
									'font-size': '1.15rem',
									'font-weight': '700',
									color: props.isDark() ? '#ec4899' : '#db2777',
									display: 'flex',
									'align-items': 'center',
									gap: '8px',
									'flex-shrink': '0'
								}}
							>
								Card 4 (Priority)
								<span
									style={{
										padding: '3px 10px',
										'border-radius': '4px',
										background: props.isDark()
											? 'rgba(236, 72, 153, 0.25)'
											: 'rgba(236, 72, 153, 0.2)',
										'font-size': '0.7rem',
										'font-weight': '600',
										'text-transform': 'uppercase',
										'letter-spacing': '0.05em',
										'white-space': 'nowrap'
									}}
								>
									Preserve Area
								</span>
							</div>
							<div
								style={{
									'font-size': '0.9rem',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.8)'
										: 'rgba(26, 26, 26, 0.8)',
									'line-height': '1.5',
									flex: '1',
									'min-height': '0'
								}}
							>
								This card maintains its area when width changes. Sidebar opening
								narrows content - this card grows taller to preserve area while
								top cards shrink.
							</div>
							<div
								style={{
									'font-size': '0.85rem',
									color: props.isDark()
										? 'rgba(236, 72, 153, 0.9)'
										: 'rgba(219, 39, 119, 0.9)',
									'font-weight': '600',
									padding: '8px 12px',
									'border-radius': '6px',
									background: props.isDark()
										? 'rgba(236, 72, 153, 0.15)'
										: 'rgba(236, 72, 153, 0.1)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(236, 72, 153, 0.3)'
											: 'rgba(236, 72, 153, 0.25)'
									}`,
									'flex-shrink': '0',
									'white-space': 'nowrap'
								}}
							>
								💡 Main content area
							</div>
						</div>
					</Grid>
				</div>
			</App>
		</div>
	)
}
