/**
 * Menu Component
 * Dropdown menu component for navigation and actions
 */

import type { JSX } from 'solid-js'
import {
	Component,
	For,
	Show,
	createEffect,
	onCleanup,
	onMount
} from 'solid-js'
import { menuStyles } from '../lib/menu.styles'
import type { MenuItem, MenuProps } from '../model/types'

export const Menu: Component<MenuProps> = props => {
	let menuRef: HTMLDivElement | undefined
	let overlayRef: HTMLDivElement | undefined

	const handleClickOutside = (event: MouseEvent) => {
		if (!props.open || !menuRef || !overlayRef) return

		const target = event.target as Node
		const clickedInMenu = menuRef.contains(target)
		const clickedInAnchor = props.anchorRef?.contains(target) ?? false

		// Don't close if clicked inside menu or anchor
		if (clickedInMenu || clickedInAnchor) {
			return
		}

		// Close menu if clicked outside both menu and anchor
		console.log('Closing menu due to outside click')
		props.onClose()
	}

	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && props.open) {
			props.onClose()
		}
	}

	const calculatePosition = () => {
		if (!menuRef) return

		// If no anchorRef, position relative to parent container
		if (!props.anchorRef) {
			menuRef.style.position = 'relative'
			menuRef.style.top = '0'
			menuRef.style.left = '0'
			return
		}

		// Try to find burger button inside anchorRef for precise positioning
		// First try to find by title, then by position in leftSection
		let burgerButton = props.anchorRef.querySelector(
			'button[title="Menu"]'
		) as HTMLElement

		if (!burgerButton) {
			// Try to find leftSection and get first button from there
			const leftSection = props.anchorRef.querySelector(
				'[style*="leftSection"], .title-bar > div:first-child'
			) as HTMLElement
			if (leftSection) {
				burgerButton = leftSection.querySelector('button') as HTMLElement
			}
		}

		if (!burgerButton) {
			// Fallback to any button in title-bar
			burgerButton = props.anchorRef.querySelector(
				'.title-bar button, button'
			) as HTMLElement
		}

		// Use burger button if found, otherwise use anchorRef
		const anchorElement = (burgerButton as HTMLElement) || props.anchorRef
		const anchorRect = anchorElement.getBoundingClientRect()
		const menuRect = menuRef.getBoundingClientRect()
		const position = props.position || 'bottom-left'

		console.log('calculatePosition:', {
			burgerButton: burgerButton,
			anchorElement: anchorElement,
			anchorRect: {
				top: anchorRect.top,
				left: anchorRect.left,
				bottom: anchorRect.bottom,
				right: anchorRect.right
			},
			position: position
		})

		let top = 0
		let left = 0

		switch (position) {
			case 'bottom-left':
				top = anchorRect.bottom + 12
				left = anchorRect.left
				break
			case 'bottom-right':
				top = anchorRect.bottom + 12
				left = anchorRect.right - menuRect.width
				break
			case 'top-left':
				top = anchorRect.top - menuRect.height - 12
				left = anchorRect.left
				break
			case 'top-right':
				top = anchorRect.top - menuRect.height - 12
				left = anchorRect.right - menuRect.width
				break
		}

		// Ensure menu stays within viewport
		const viewportWidth = window.innerWidth
		const viewportHeight = window.innerHeight

		if (left + menuRect.width > viewportWidth) {
			left = viewportWidth - menuRect.width - 8
		}
		if (left < 8) {
			left = 8
		}

		if (top + menuRect.height > viewportHeight) {
			top = anchorRect.top - menuRect.height - 4
		}
		if (top < 8) {
			top = 8
		}

		menuRef.style.top = `${top}px`
		menuRef.style.left = `${left}px`

		console.log('Menu positioned at:', { top, left })
	}

	onMount(() => {
		if (props.open) {
			calculatePosition()
		}
	})

	createEffect(() => {
		if (props.open) {
			calculatePosition()
			// Delay adding listeners to prevent the click that opened the menu from closing it
			// Use requestAnimationFrame to ensure menu is rendered before adding listeners
			let rafId1: number | undefined
			let rafId2: number | undefined

			rafId1 = requestAnimationFrame(() => {
				rafId2 = requestAnimationFrame(() => {
					document.addEventListener('mousedown', handleClickOutside)
					document.addEventListener('keydown', handleEscape)
				})
			})

			onCleanup(() => {
				if (rafId1 !== undefined) cancelAnimationFrame(rafId1)
				if (rafId2 !== undefined) cancelAnimationFrame(rafId2)
				document.removeEventListener('mousedown', handleClickOutside)
				document.removeEventListener('keydown', handleEscape)
			})
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	})

	onCleanup(() => {
		document.removeEventListener('mousedown', handleClickOutside)
		document.removeEventListener('keydown', handleEscape)
	})

	const handleItemClick = (item: MenuItem) => {
		if (item.disabled || item.separator) return
		item.onClick?.()
		props.onClose()
	}

	return (
		<Show when={props.open}>
			<Show
				when={props.anchorRef}
				fallback={
					<div
						ref={menuRef}
						class={`menu ${props.class || ''}`}
						style={{
							...(menuStyles.container as JSX.CSSProperties),
							position: 'relative' as const
						}}
					>
						<Show
							when={props.children}
							fallback={
								<ul style={menuStyles.list}>
									<For each={props.items}>
										{item => (
											<>
												<Show when={item.separator}>
													<li style={menuStyles.separator} />
												</Show>
												<Show when={!item.separator}>
													<li>
														<button
															type='button'
															onClick={() => handleItemClick(item)}
															disabled={item.disabled}
															style={{
																...(menuStyles.item as JSX.CSSProperties),
																...(item.disabled
																	? (menuStyles.itemDisabled as JSX.CSSProperties)
																	: {})
															}}
															onMouseEnter={e => {
																if (!item.disabled) {
																	e.currentTarget.style.backgroundColor =
																		'rgba(255, 255, 255, 0.1)'
																}
															}}
															onMouseLeave={e => {
																e.currentTarget.style.backgroundColor =
																	'transparent'
															}}
														>
															<Show when={item.icon}>
																<span
																	class='material-symbols-rounded'
																	style={menuStyles.itemIcon}
																>
																	{item.icon}
																</span>
															</Show>
															<span style={menuStyles.itemLabel}>
																{item.label}
															</span>
														</button>
													</li>
												</Show>
											</>
										)}
									</For>
								</ul>
							}
						>
							{props.children}
						</Show>
					</div>
				}
			>
				<div
					ref={overlayRef}
					style={menuStyles.overlay}
					onClick={e => {
						if (e.target === overlayRef) {
							props.onClose()
						}
					}}
				>
					<div
						ref={menuRef}
						class={`menu ${props.class || ''}`}
						style={{
							...(menuStyles.container as JSX.CSSProperties)
						}}
						onClick={e => e.stopPropagation()}
					>
						<Show
							when={props.children}
							fallback={
								<ul style={menuStyles.list}>
									<For each={props.items}>
										{item => (
											<>
												<Show when={item.separator}>
													<li style={menuStyles.separator} />
												</Show>
												<Show when={!item.separator}>
													<li>
														<button
															type='button'
															onClick={() => handleItemClick(item)}
															disabled={item.disabled}
															style={{
																...(menuStyles.item as JSX.CSSProperties),
																...(item.disabled
																	? (menuStyles.itemDisabled as JSX.CSSProperties)
																	: {})
															}}
															onMouseEnter={e => {
																if (!item.disabled) {
																	e.currentTarget.style.backgroundColor =
																		'rgba(255, 255, 255, 0.1)'
																}
															}}
															onMouseLeave={e => {
																e.currentTarget.style.backgroundColor =
																	'transparent'
															}}
														>
															<Show when={item.icon}>
																<span
																	class='material-symbols-rounded'
																	style={menuStyles.itemIcon}
																>
																	{item.icon}
																</span>
															</Show>
															<span style={menuStyles.itemLabel}>
																{item.label}
															</span>
														</button>
													</li>
												</Show>
											</>
										)}
									</For>
								</ul>
							}
						>
							{props.children}
						</Show>
					</div>
				</div>
			</Show>
		</Show>
	)
}
