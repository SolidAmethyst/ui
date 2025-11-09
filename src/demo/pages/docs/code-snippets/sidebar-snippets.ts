/**
 * Code examples for Sidebar component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const sidebarSnippets = {
	imports: `import { Sidebar } from '@sapphiresolid/ui'
import type { SidebarItem } from '@sapphiresolid/ui'`,

	usage: {
		yourFirstSidebarComplete: `import { createSignal } from 'solid-js'
import { Sidebar } from '@sapphiresolid/ui'
import type { SidebarItem } from '@sapphiresolid/ui'
import { Button } from '@sapphiresolid/ui'

export function App() {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)

	const sidebarItems: SidebarItem[] = [
		{ label: 'Home', icon: 'home', onClick: () => {} },
		{ label: 'Dashboard', icon: 'dashboard', onClick: () => {} },
		{ label: 'Settings', icon: 'settings', onClick: () => {} },
		{ separator: true },
		{ label: 'Documents', icon: 'description', onClick: () => {} },
		{ label: 'Images', icon: 'image', onClick: () => {} },
		{ label: 'Videos', icon: 'video_library', onClick: () => {} },
		{ separator: true },
		{ label: 'Help', icon: 'help', onClick: () => {} },
		{ label: 'About', icon: 'info', onClick: () => {} }
	]

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Sidebar
				open={sidebarOpen()}
				items={sidebarItems}
				isDark={isDark}
				overlayMode={false}
				onItemClick={() => setSidebarOpen(false)}
			/>
			<div style={{ flex: '1', display: 'flex', 'flex-direction': 'column' }}>
				<div style={{ padding: '16px', 'border-bottom': '1px solid rgba(0,0,0,0.1)' }}>
					<Button icon="menu" onClick={() => setSidebarOpen(!sidebarOpen())}>
						Menu
					</Button>
				</div>
				<div style={{ flex: '1', padding: '24px', overflow: 'auto' }}>
					{/* Your content */}
				</div>
			</div>
		</div>
	)
}`,

		yourFirstSidebar: `export function App() {
	const [sidebarOpen, setSidebarOpen] = createSignal(false)

	const sidebarItems: SidebarItem[] = [
		{ label: 'Home', icon: 'home', onClick: () => {} },
		{ label: 'Dashboard', icon: 'dashboard', onClick: () => {} },
		{ label: 'Settings', icon: 'settings', onClick: () => {} },
		{ separator: true },
		{ label: 'Documents', icon: 'description', onClick: () => {} },
		{ label: 'Images', icon: 'image', onClick: () => {} },
		{ label: 'Videos', icon: 'video_library', onClick: () => {} },
		{ separator: true },
		{ label: 'Help', icon: 'help', onClick: () => {} },
		{ label: 'About', icon: 'info', onClick: () => {} }
	]

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Sidebar
				open={sidebarOpen()}
				items={sidebarItems}
				isDark={isDark}
				overlayMode={false}
				onItemClick={() => setSidebarOpen(false)}
			/>
			<div style={{ flex: '1', display: 'flex', 'flex-direction': 'column' }}>
				<div style={{ padding: '16px', 'border-bottom': '1px solid rgba(0,0,0,0.1)' }}>
					<Button icon="menu" onClick={() => setSidebarOpen(!sidebarOpen())}>
						Menu
					</Button>
				</div>
				<div style={{ flex: '1', padding: '24px', overflow: 'auto' }}>
					{/* Your content */}
				</div>
			</div>
		</div>
	)
}`,

		customization: `@layer base {
  :root {
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
  }

  .dark,
  [data-theme="dark"] {
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
  }
}`
	}
} as const
