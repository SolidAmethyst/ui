/**
 * App Component
 * Full-featured application composition with Window, TitleBar, and Sidebar
 */

import { Component, createSignal, Show } from 'solid-js'
import { Sidebar } from '../../../components/ui/sidebar'
import { Window } from '../../../components/ui/window'
import { TitleBar } from '../../title-bar'
import type { AppProps } from '../model/types'

export const App: Component<AppProps> = props => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)
	const [maximized, setMaximized] = createSignal(false)
	const [pinned, setPinned] = createSignal(false)

	const isDark = () => {
		const dark =
			typeof props.isDark === 'function' ? props.isDark() : props.isDark
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
					burgerActive={sidebarOpen()}
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
			{/* Overlay mode: Sidebar now uses Drawer internally with its own backdrop */}
			<Show when={props.overlayMode}>
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
