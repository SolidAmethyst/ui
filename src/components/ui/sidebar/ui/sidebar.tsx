/**
 * Sidebar Component
 * Navigation sidebar component with support for overlay and shift modes
 */

import type { JSX } from 'solid-js'
import { Component, For, Show } from 'solid-js'
import { sidebarStyles } from '../lib/sidebar.styles'
import type { SidebarProps } from '../model/types'

export const Sidebar: Component<SidebarProps> = props => {
	const isDark = () => props.isDark ?? false
	const overlayMode = () => props.overlayMode ?? false
	const open = () => props.open

	return (
		<aside
			class={props.class}
			style={{
				...sidebarStyles.container({
					isDark: isDark(),
					overlayMode: overlayMode(),
					open: open()
				}),
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
												onClick={() => {
													item.onClick?.()
													props.onItemClick?.(item)
												}}
												disabled={item.disabled}
												style={sidebarStyles.button(isDark(), item.disabled ?? false)}
												onMouseEnter={e => {
													if (!item.disabled) {
														e.currentTarget.style.backgroundColor = isDark()
															? 'rgba(255, 255, 255, 0.1)'
															: 'rgba(0, 0, 0, 0.05)'
													}
												}}
												onMouseLeave={e => {
													e.currentTarget.style.backgroundColor = 'transparent'
												}}
											>
												<Show when={item.icon}>
													<span class='material-symbols-rounded' style={sidebarStyles.icon()}>
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
