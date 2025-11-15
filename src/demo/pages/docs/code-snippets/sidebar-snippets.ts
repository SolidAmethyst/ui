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
				overlayMode={false}
				onItemClick={() => setSidebarOpen(false)}
			/>
			<div style={{ flex: '1', display: 'flex', 'flex-direction': 'column' }}>
				<div style={{ padding: '16px', 'border-bottom': '1px solid rgba(0,0,0,0.1)', display: 'flex', 'align-items': 'center', gap: '12px' }}>
					<Button
						variant="trigger"
						iconPosition="only"
						title={sidebarOpen() ? 'Close Sidebar' : 'Open Sidebar'}
						active={sidebarOpen()}
						onClick={() => setSidebarOpen(!sidebarOpen())}
						style={{ width: '28px', height: '28px' }}
					/>
					<h2 style={{ 'font-size': '1.25rem', 'font-weight': '600', margin: '0' }}>
						Application
					</h2>
				</div>
				<div style={{ flex: '1', padding: '24px', overflow: 'auto' }}>
					{/* Your content */}
				</div>
			</div>
		</div>
	)
}`,

    yourFirstSidebar: `import { createSignal } from 'solid-js'
import { Sidebar, Button } from '@sapphiresolid/ui'
import type { SidebarItem } from '@sapphiresolid/ui'

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
				overlayMode={false}
				onItemClick={() => setSidebarOpen(false)}
			/>
			<div style={{ flex: '1', display: 'flex', 'flex-direction': 'column' }}>
				<div style={{ padding: '16px', 'border-bottom': '1px solid rgba(0,0,0,0.1)', display: 'flex', 'align-items': 'center', gap: '12px' }}>
					<Button
						variant="trigger"
						iconPosition="only"
						title={sidebarOpen() ? 'Close Sidebar' : 'Open Sidebar'}
						active={sidebarOpen()}
						onClick={() => setSidebarOpen(!sidebarOpen())}
						style={{ width: '28px', height: '28px' }}
					/>
					<h2 style={{ 'font-size': '1.25rem', 'font-weight': '600', margin: '0' }}>
						Application
					</h2>
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
    /* Sidebar component uses theme colors */
    --sidebar-accent: var(--card);
  }

  [data-theme="dark"] {
    /* Sidebar accent uses theme colors in dark mode too */
    --sidebar-accent: var(--card);
  }
}`,
  },
} as const;
