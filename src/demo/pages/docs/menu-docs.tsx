import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { AppDemo } from '../app-demo'

interface MenuDocsProps {
	isDark: Accessor<boolean>
}

export const MenuDocs: Component<MenuDocsProps> = props => {
	return (
		<article
			style={{
				width: '100%',
				'max-width': '700px',
				'box-sizing': 'border-box',
				margin: '0 auto',
				padding: '24px 0',
				color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
				overflow: 'hidden',
				'overflow-x': 'hidden'
			}}
		>
			<h1
				style={{
					'font-size': '1.75rem',
					'font-weight': '700',
					'margin-bottom': '12px',
					'line-height': '1.2'
				}}
			>
				Menu
			</h1>
			<p
				style={{
					'font-size': '0.95rem',
					color: props.isDark()
						? 'rgba(246, 246, 246, 0.7)'
						: 'rgba(26, 26, 26, 0.7)',
					'margin-bottom': '24px',
					'line-height': '1.6'
				}}
			>
				Dropdown menu component for navigation and actions. Supports icons,
				separators, disabled items, and custom positioning.
			</p>

			{/* Installation */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Installation
				</h2>
				<CodeHighlight
					code={`import { Menu } from '@sapphiresolid/ui'
import type { MenuItem } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			{/* Basic Usage */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Basic Usage
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<AppDemo isDark={props.isDark} toggleTheme={() => {}} />
						</div>
					}
					code={`const [menuOpen, setMenuOpen] = createSignal(false)
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
/>`}
				/>
			</section>
		</article>
	)
}
