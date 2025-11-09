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
	const isDark = () => props.isDark ?? true

	return (
		<aside
			class={`sidebar ${props.class || ''}`}
			style={{
				...sidebarStyles.container(open(), overlayMode(), isDark()),
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
										<li style={sidebarStyles.separator(isDark())} />
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
												style={sidebarStyles.button(item.disabled ?? false, isDark())}
												onMouseEnter={e => {
													if (!item.disabled) {
														e.currentTarget.style.backgroundColor = isDark()
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
			</Show>
		</aside>
	)
}
