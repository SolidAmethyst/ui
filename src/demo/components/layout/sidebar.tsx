import { Component, For } from 'solid-js'

interface SidebarProps {
	isDark: () => boolean
	currentComponent: string | null
	onComponentSelect: (component: string | null) => void
}

interface ComponentGroup {
	title: string
	items: { name: string; id: string }[]
}

const componentGroups: ComponentGroup[] = [
	{
		title: 'Getting Started',
		items: [
			{ name: 'Introduction', id: 'introduction' },
			{ name: 'Installation', id: 'installation' }
		]
	},
	{
		title: 'Components',
		items: [
			{ name: 'Button', id: 'button' },
			{ name: 'Grid', id: 'grid' },
			{ name: 'Menu', id: 'menu' },
			{ name: 'TechChip', id: 'techchip' },
			{ name: 'Scrollbar', id: 'scrollbar' },
			{ name: 'TitleBar', id: 'titlebar' }
		]
	}
]

export const Sidebar: Component<SidebarProps> = props => (
	<aside
		data-sidebar
		style={{
			width: '220px',
			'min-width': '220px',
			'max-width': '220px',
			position: 'sticky',
			top: '56px',
			'align-self': 'flex-start',
			'max-height': 'calc(100vh - 56px)',
			overflow: 'auto',
			'overflow-x': 'hidden',
			'flex-shrink': '0',
			'box-sizing': 'border-box',
			background: 'transparent',
			'border-right': props.isDark()
				? '1px solid rgba(255, 255, 255, 0.1)'
				: '1px solid rgba(0, 0, 0, 0.1)'
		}}
	>
		<div
			style={{ padding: '16px 0', height: '100%', 'box-sizing': 'border-box' }}
		>
			<For each={componentGroups}>
				{group => (
					<div style={{ 'margin-bottom': '16px' }}>
						<h4
							style={{
								padding: '0 0 8px 16px',
								margin: '0',
								'font-size': '11px',
								'font-weight': '600',
								'letter-spacing': '0.08em',
								'text-transform': 'uppercase',
								color: props.isDark()
									? 'rgba(246, 246, 246, 0.5)'
									: 'rgba(26, 26, 26, 0.5)'
							}}
						>
							{group.title}
						</h4>
						<For each={group.items}>
							{item => (
								<button
									onClick={() => props.onComponentSelect(item.id)}
									style={{
										width: '100%',
										padding:
											props.currentComponent === item.id
												? '6px 0 6px 16px'
												: '6px 0 6px 19px',
										'text-align': 'left',
										border: 'none',
										background: 'transparent',
										color:
											props.currentComponent === item.id
												? props.isDark()
													? '#f6f6f6'
													: '#1a1a1a'
												: props.isDark()
												? 'rgba(246, 246, 246, 0.6)'
												: 'rgba(26, 26, 26, 0.6)',
										cursor: 'pointer',
										'font-size': '13px',
										'font-weight':
											props.currentComponent === item.id ? '500' : '400',
										transition: 'all 0.15s ease',
										'border-left': `3px solid ${
											props.currentComponent === item.id
												? '#3b82f6'
												: 'transparent'
										}`,
										'box-sizing': 'border-box'
									}}
									onMouseEnter={e => {
										if (props.currentComponent !== item.id) {
											e.currentTarget.style.color = props.isDark()
												? '#f6f6f6'
												: '#1a1a1a'
										}
									}}
									onMouseLeave={e => {
										if (props.currentComponent !== item.id) {
											e.currentTarget.style.color = props.isDark()
												? 'rgba(246, 246, 246, 0.6)'
												: 'rgba(26, 26, 26, 0.6)'
										}
									}}
								>
									{item.name}
								</button>
							)}
						</For>
					</div>
				)}
			</For>
		</div>
	</aside>
)
