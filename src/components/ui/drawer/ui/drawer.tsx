/**
 * Drawer Component
 * Universal sliding panel component
 * Renders in a portal to body to ensure proper positioning relative to viewport
 */

import {
	Component,
	Show,
	createEffect,
	createSignal,
	onCleanup,
	onMount
} from 'solid-js'
import { render } from 'solid-js/web'
import { drawerStyles } from '../lib/drawer.styles'
import type { DrawerProps } from '../model/types'

export const Drawer: Component<DrawerProps> = props => {
	const isDark = () => props.isDark ?? true
	const position = () => props.position ?? 'right'
	const showBackdrop = () => props.showBackdrop ?? true
	const closeOnBackdropClick = () => props.closeOnBackdropClick ?? true
	const zIndex = () => props.zIndex ?? 10000

	// Local state for smooth animation - always starts closed
	const [localIsOpen, setLocalIsOpen] = createSignal(false)

	// Calculate default size based on position
	const defaultSize = (): string => {
		const pos = position()
		if (pos === 'left' || pos === 'right') {
			return '320px'
		}
		return '50vh'
	}

	const size = () => props.size ?? defaultSize()

	const handleBackdropClick = () => {
		if (closeOnBackdropClick() && props.isOpen) {
			props.onClose()
		}
	}

	// Create portal container in body
	let portalContainer: HTMLDivElement | null = null
	let dispose: (() => void) | null = null
	let clickOutsideTimeout: number | null = null

	// Handle click outside drawer when backdrop is disabled
	const handleClickOutside = (e: MouseEvent) => {
		if (!localIsOpen() || showBackdrop() || !portalContainer) return

		const target = e.target as HTMLElement
		const drawerPanel = portalContainer.querySelector(
			'.drawer-panel'
		) as HTMLElement

		// Check if click is on a button or inside a button (to prevent closing when clicking toggle button)
		const isButton = target.closest('button') !== null
		if (isButton) return

		// Close if click is outside drawer panel
		if (drawerPanel && !drawerPanel.contains(target)) {
			props.onClose()
		}
	}

	// Sync local state with props for smooth animation
	createEffect(() => {
		const shouldBeOpen = props.isOpen

		// Use requestAnimationFrame to ensure smooth transition
		if (shouldBeOpen) {
			// Opening: render closed first, then open
			if (!localIsOpen()) {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setLocalIsOpen(true)
					})
				})
			}
		} else {
			// Closing: update immediately
			setLocalIsOpen(false)
		}
	})

	// Render portal once and update styles reactively
	const renderPortal = () => {
		if (!portalContainer) return

		dispose = render(
			() => (
				<>
					{/* Backdrop */}
					<Show when={showBackdrop()}>
						<div
							onClick={handleBackdropClick}
							style={drawerStyles.backdrop(
								localIsOpen(),
								showBackdrop(),
								position(),
								size()
							)}
						/>
					</Show>

					{/* Drawer Panel */}
					<aside
						class={`drawer-panel drawer-${position()} ${props.class || ''}`}
						style={{
							...drawerStyles.panel(
								localIsOpen(),
								isDark(),
								position(),
								size(),
								zIndex()
							),
							...props.style
						}}
					>
						{props.children}
					</aside>
				</>
			),
			portalContainer!
		)
	}

	onMount(() => {
		// Create container in body for portal
		portalContainer = document.createElement('div')
		document.body.appendChild(portalContainer)

		// Render once - Solid.js will handle reactive updates
		renderPortal()

		// Add click outside handler when backdrop is disabled
		createEffect(() => {
			const shouldShowBackdrop = showBackdrop()
			const isOpen = localIsOpen()

			// Clear any pending timeout
			if (clickOutsideTimeout !== null) {
				clearTimeout(clickOutsideTimeout)
				clickOutsideTimeout = null
			}

			// Remove handler if backdrop is enabled or drawer is closed
			if (shouldShowBackdrop || !isOpen) {
				document.removeEventListener('mousedown', handleClickOutside, true)
				return
			}

			// Add handler when backdrop is disabled and drawer is open
			// Use setTimeout to ensure drawer is rendered and avoid immediate close on open
			clickOutsideTimeout = window.setTimeout(() => {
				document.addEventListener('mousedown', handleClickOutside, true)
			}, 100)
		})
	})

	onCleanup(() => {
		// Clear timeout and remove click outside handler
		if (clickOutsideTimeout !== null) {
			clearTimeout(clickOutsideTimeout)
		}
		document.removeEventListener('mousedown', handleClickOutside, true)

		if (dispose) {
			dispose()
		}
		if (portalContainer && portalContainer.parentNode) {
			portalContainer.parentNode.removeChild(portalContainer)
		}
	})

	// Return empty fragment - content is rendered in portal
	return <></>
}
