/**
 * Sidebar Component
 * Navigation sidebar component with support for overlay and shift modes
 * Overlay mode now uses Drawer for consistent behavior
 */

import type { JSX } from 'solid-js'
import { Component, For, Show } from 'solid-js'
import { Drawer } from '../../drawer'
import { sidebarStyles } from '../lib/sidebar.styles'
import type { SidebarItem, SidebarProps } from '../model/types'

// Render sidebar content
const SidebarContent = (props: {
	items: SidebarItem[]
	isDark: boolean
	onItemClick?: (item: SidebarItem) => void
}) => (
	<div style={sidebarStyles.innerContainer()}>
		<ul style={sidebarStyles.list()}>
			<For each={props.items}>
				{item => (
					<>
						<Show when={item.separator}>
							<li style={sidebarStyles.separator(props.isDark)} />
						</Show>
						<Show when={!item.separator}>
							<li>
								<button
									type='button'
									class='sidebar-item'
									onClick={() => {
										item.onClick?.()
										props.onItemClick?.(item)
									}}
									disabled={item.disabled}
									style={sidebarStyles.button(item.disabled ?? false, props.isDark)}
									onMouseEnter={e => {
										if (!item.disabled) {
											e.currentTarget.style.backgroundColor = props.isDark
												? 'hsla(240, 3.7%, 15.9%, 1)'
												: 'hsla(240, 4.8%, 95.9%, 1)'
										}
									}}
									onMouseLeave={e => {
										e.currentTarget.style.backgroundColor = 'transparent'
									}}
								>
									<Show when={item.icon}>
										<span
											class='material-symbols-rounded'
											style={sidebarStyles.icon()}
										>
											{item.icon}
										</span>
									</Show>
									<span style={sidebarStyles.label()}>{item.label}</span>
								</button>
							</li>
						</Show>
					</>
				)}
			</For>
		</ul>
	</div>
)

export const Sidebar: Component<SidebarProps> = props => {
	const overlayMode = () => props.overlayMode ?? false
	const open = () => props.open
	const isDark = () => props.isDark ?? true

	// Overlay mode: use Drawer
	if (overlayMode()) {
		return (
			<Drawer
				isOpen={open()}
				onClose={() => {
					// Close sidebar when backdrop is clicked
					props.onItemClick?.({} as SidebarItem)
				}}
				isDark={isDark()}
				position='left'
				size='250px'
				showBackdrop={true}
				closeOnBackdropClick={true}
				zIndex={1000}
				class={props.class}
				style={props.style}
			>
				<Show when={open()}>
					<SidebarContent
						items={props.items}
						isDark={isDark()}
						onItemClick={props.onItemClick}
					/>
				</Show>
			</Drawer>
		)
	}

	// Shift mode: keep original implementation for layout compatibility
	return (
		<aside
			class={`sidebar ${props.class || ''}`}
			style={{
				...sidebarStyles.container(open(), false, isDark()),
				...(props.style as JSX.CSSProperties)
			}}
		>
			<Show when={open()}>
				<SidebarContent
					items={props.items}
					isDark={isDark()}
					onItemClick={props.onItemClick}
				/>
			</Show>
		</aside>
	)
}
