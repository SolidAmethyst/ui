/**
 * Sidebar Component
 * Navigation sidebar component with support for overlay and shift modes
 */

import type { JSX } from 'solid-js'
import { Component, For, Show } from 'solid-js'
import { sidebarStyles } from '../lib/sidebar.styles'
import type { SidebarProps } from '../model/types'

export const Sidebar: Component<SidebarProps> = props => {
	const overlayMode = () => props.overlayMode ?? false
	const open = () => props.open

	return (
		<aside
			class={`sidebar ${props.class || ''}`}
			style={{
				...sidebarStyles.container(open(), overlayMode()),
				...(props.style as JSX.CSSProperties)
			}}
		>
			<Show when={open()}>
				<div style={sidebarStyles.innerContainer()}>
					<ul style={sidebarStyles.list()}>
						<For each={props.items}>
							{item => (
								<>
									<Show when={item.separator}>
										<li style={sidebarStyles.separator()} />
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
												style={sidebarStyles.button(item.disabled ?? false)}
												onMouseEnter={e => {
													if (!item.disabled) {
														e.currentTarget.style.backgroundColor =
															'hsl(var(--sidebar-accent))'
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
			</Show>
		</aside>
	)
}
