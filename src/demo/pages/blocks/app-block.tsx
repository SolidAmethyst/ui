/**
 * App Block
 * Application window with sidebar
 */

import { Component, createSignal } from 'solid-js'
import type { MenuItem } from '../../../components/ui/menu'
import { App } from '../../../composites/app'

interface AppBlockProps {
	isDark: boolean
}

export const AppBlock: Component<AppBlockProps> = props => {
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
		}
	]

	return (
		<App
			title='My Application'
			isDark={props.isDark}
			sidebarItems={sidebarItems}
			overlayMode={false}
			titleBarProps={{
				onMinimizeClick: () => console.log('Minimize'),
				onMaximizeClick: () => setMaximized(!maximized()),
				onCloseClick: () => console.log('Close'),
				onPinClick: () => setPinned(!pinned()),
				maximized: maximized(),
				pinned: pinned()
			}}
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			<div
				style={{
					flex: '1',
					'min-height': '0',
					width: '100%',
					'max-width': '100%',
					padding: '32px',
					'box-sizing': 'border-box',
					background: props.isDark
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
							color: 'hsl(var(--foreground))'
						}}
					>
						Welcome to My Application
					</h1>
					<p
						style={{
							'font-size': '16px',
							'line-height': '1.6',
							color: props.isDark
								? 'rgba(246, 246, 246, 0.7)'
								: 'rgba(26, 26, 26, 0.7)',
							margin: '0 0 24px 0'
						}}
					>
						This is a complete application window with sidebar navigation and
						title bar.
					</p>
				</div>
			</div>
		</App>
	)
}
