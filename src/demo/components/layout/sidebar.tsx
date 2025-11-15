import { Component, For } from 'solid-js'
import { Scrollbar } from '../../../components/ui/scrollbar'

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
			{ name: 'Accordion', id: 'accordion' },
			{ name: 'Alert', id: 'alert' },
			{ name: 'Button', id: 'button' },
			{ name: 'Checkbox Tree', id: 'checkbox-tree' },
			{ name: 'Code Highlight', id: 'code-highlight' },
			{ name: 'Command', id: 'command' },
			{ name: 'Drag Drop', id: 'drag-drop' },
			{ name: 'Drawer', id: 'drawer' },
			{ name: 'Empty State', id: 'empty-state' },
			{ name: 'Grid', id: 'grid' },
			{ name: 'Modal', id: 'modal' },
			{ name: 'Number Input', id: 'number-input' },
			{ name: 'Progress Bar', id: 'progress-bar' },
			{ name: 'Scrollbar', id: 'scrollbar' },
			{ name: 'Search', id: 'search' },
			{ name: 'Sidebar', id: 'sidebar' },
			{ name: 'Slider', id: 'slider' },
			{ name: 'Split Pane', id: 'split-pane' },
			{ name: 'Table', id: 'table' },
			{ name: 'Tabs', id: 'tabs' },
			{ name: 'Timeline', id: 'timeline' },
			{ name: 'Tech Chip', id: 'techchip' },
			{ name: 'Toast', id: 'toast' },
			{ name: 'Tooltip', id: 'tooltip' }
		]
	},
	{
		title: 'Composites',
		items: [
			{ name: 'App', id: 'app' },
			{ name: 'File Manager', id: 'file-manager' },
			{ name: 'Filter', id: 'filter-bar' },
			{ name: 'Title Bar', id: 'titlebar' }
		]
	},
	{
		title: 'Testing',
		items: [{ name: 'Test', id: 'test' }]
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
			top: '0',
			'align-self': 'flex-start',
			height: 'calc(100vh - 60px)',
			'max-height': 'calc(100vh - 60px)',
			overflow: 'hidden',
			'flex-shrink': '0',
			'box-sizing': 'border-box',
			background: 'transparent',
			'border-right': props.isDark()
				? '1px solid rgba(255, 255, 255, 0.15)'
				: '1px solid rgba(0, 0, 0, 0.15)',
			margin: '0',
			padding: '0',
			'padding-right': '24px',
			'margin-right': '24px',
			display: 'flex',
			'flex-direction': 'column',
			'min-height': '0'
		}}
	>
		<Scrollbar
			direction='vertical'
			style={{
				width: '100%',
				height: '100%',
				flex: '1',
				'min-height': '0'
			}}
		>
			<div
				style={{
					padding: '8px 0 0 0',
					'box-sizing': 'border-box',
					margin: '0'
				}}
			>
				<For each={componentGroups}>
					{(group, index) => (
						<div
							style={{
								'margin-bottom': '16px',
								'margin-top': '0',
								'padding-top': '0'
							}}
						>
							<h4
								style={{
									padding: '0 0 8px 16px',
									margin: '0',
									'margin-top': index() === 0 ? '0.1rem' : '0',
									'padding-top': '0',
									'font-size': '13px',
									'font-weight': '600',
									'letter-spacing': '0.08em',
									'text-transform': 'uppercase',
									'line-height': '1',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.5)'
										: 'rgba(26, 26, 26, 0.5)'
								}}
							>
								{group.title}
							</h4>
							<For each={group.items}>
								{(item, itemIndex) => (
									<button
										type='button'
										onClick={e => {
											e.preventDefault()
											e.stopPropagation()
											props.onComponentSelect(item.id)
										}}
										style={{
											width: '100%',
											padding:
												props.currentComponent === item.id
													? itemIndex() === 0
														? '0 0 8px 16px'
														: '8px 0 8px 16px'
													: itemIndex() === 0
														? '0 0 8px 19px'
														: '8px 0 8px 19px',
											'text-align': 'left',
											border: 'none',
											background: 'transparent',
											color:
												props.currentComponent === item.id
													? 'hsl(var(--foreground))'
													: 'hsl(var(--foreground) / 0.6)',
											cursor: 'pointer',
											'font-size': '13px',
											'font-weight':
												props.currentComponent === item.id ? '500' : '400',
											'line-height': '1.6',
											transition: 'all 0.15s ease',
											'border-left': `3px solid ${
												props.currentComponent === item.id
													? 'hsl(var(--accent))'
													: 'transparent'
											}`,
											'box-sizing': 'border-box'
										}}
										onMouseEnter={e => {
											if (props.currentComponent !== item.id) {
												e.currentTarget.style.color = 'hsl(var(--foreground))'
											}
										}}
										onMouseLeave={e => {
											if (props.currentComponent !== item.id) {
												e.currentTarget.style.color = 'hsl(var(--foreground) / 0.6)'
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
		</Scrollbar>
	</aside>
)
