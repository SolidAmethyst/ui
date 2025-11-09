/**
 * App Component
 * Full-featured application composition with Window, TitleBar, and Sidebar
 */

import type { JSX } from 'solid-js'
import { Component, createSignal, Show } from 'solid-js'
import { Sidebar } from '../../../components/ui/sidebar'
import { TitleBar } from '../../title-bar'
import { Window } from '../../../components/ui/window'
import type { AppProps } from '../model/types'

export const App: Component<AppProps> = props => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)
	const [maximized, setMaximized] = createSignal(false)
	const [pinned, setPinned] = createSignal(false)

	const isDark = () => {
		const dark = typeof props.isDark === 'function' ? props.isDark() : props.isDark
		return dark ?? true
	}

	const sidebarItems = props.sidebarItems ?? []

	const handleMinimize = () => {
		console.log('Minimize clicked')
		props.titleBarProps?.onMinimizeClick?.()
	}

	const handleMaximize = () => {
		setMaximized(!maximized())
		props.titleBarProps?.onMaximizeClick?.()
	}

	const handleClose = () => {
		console.log('Close clicked')
		props.titleBarProps?.onCloseClick?.()
	}

	const handlePin = () => {
		setPinned(!pinned())
		props.titleBarProps?.onPinClick?.()
	}

	const handleDebug = () => {
		console.log('Debug clicked')
		props.titleBarProps?.onDebugClick?.()
	}

	const handleSettings = () => {
		console.log('Settings clicked')
		props.titleBarProps?.onSettingsClick?.()
	}

	return (
		<Window
			class={props.class}
			style={props.style}
			titleBar={
				<TitleBar
					title={props.title ?? 'My Application'}
					isDark={isDark()}
					onBurgerClick={() => setSidebarOpen(!sidebarOpen())}
					onThemeToggle={props.toggleTheme}
					onDebugClick={handleDebug}
					onPinClick={handlePin}
					onSettingsClick={handleSettings}
					onMinimizeClick={handleMinimize}
					onMaximizeClick={handleMaximize}
					onCloseClick={handleClose}
					maximized={maximized()}
					pinned={pinned()}
					{...props.titleBarProps}
				/>
			}
			sidebar={
				props.overlayMode ? undefined : (
					<Sidebar
						open={sidebarOpen()}
						items={sidebarItems}
						isDark={isDark()}
						overlayMode={false}
						onItemClick={() => setSidebarOpen(false)}
					/>
				)
			}
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
						background: isDark()
							? 'rgba(0, 0, 0, 0.5)'
							: 'rgba(0, 0, 0, 0.3)',
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
					isDark={isDark()}
					overlayMode={true}
					onItemClick={() => setSidebarOpen(false)}
				/>
			</Show>
			{props.children}
		</Window>
	)
}
