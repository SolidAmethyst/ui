/**
 * Code examples for Menu component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const menuExamples = {
	installation: `import { Menu } from '@sapphiresolid/ui'
import type { MenuItem } from '@sapphiresolid/ui'`,

	basicUsage: `const [menuOpen, setMenuOpen] = createSignal(false)
let anchorRef: HTMLDivElement | undefined

const menuItems: MenuItem[] = [
	{ label: 'With Icons and Separators', icon: 'list', onClick: () => {} },
	{ label: 'With Disabled Items', icon: 'block', onClick: () => {} },
	{ separator: true },
	{ label: 'Without Icons', icon: 'format_list_bulleted', onClick: () => {} }
]

<div ref={anchorRef} style={{ position: 'relative' }}>
	<TitleBar
		title="Menu Demo"
		onBurgerClick={() => setMenuOpen(!menuOpen())}
	/>
</div>
<Menu
	open={menuOpen()}
	onClose={() => setMenuOpen(false)}
	items={menuItems}
	anchorRef={anchorRef}
	position="bottom-left"
/>`,

	overlayMenu: `// Sidebar with overlay and backdrop
const [sidebarOpen, setSidebarOpen] = createSignal(false)

<Window titleBar={<TitleBar onBurgerClick={() => setSidebarOpen(!sidebarOpen())} />}>
	{/* Backdrop overlay */}
	<Show when={sidebarOpen()}>
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
				'z-index': '999'
			}}
		/>
	</Show>

	{/* Sidebar overlay */}
	<aside
		style={{
			position: 'absolute',
			top: '32px',
			left: sidebarOpen() ? '0' : '-250px',
			width: '250px',
			height: 'calc(100% - 32px)',
			'z-index': '1000',
			transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
		}}
	>
		{/* Menu items */}
	</aside>

	{/* Main content - doesn't shift */}
	<div>{/* Your content */}</div>
</Window>`
} as const
