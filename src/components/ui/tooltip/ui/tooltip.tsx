/**
 * Tooltip Component
 * Tooltip component with positioning and hover/focus support
 */

import {
	Component,
	Show,
	createSignal,
	onCleanup,
	onMount
} from 'solid-js'
import { render } from 'solid-js/web'
import { tooltipStyles } from '../lib/tooltip.styles'
import { useTooltipPosition } from '../lib/use-tooltip-position'
import type { TooltipProps } from '../model/types'

export const Tooltip: Component<TooltipProps> = props => {
	const isDark = () => props.isDark ?? true
	const position = () => props.position ?? 'top'
	const delay = () => props.delay ?? 300
	const showOnFocus = () => props.showOnFocus ?? true

	const [isVisible, setIsVisible] = createSignal(false)
	const [isHovered, setIsHovered] = createSignal(false)
	const [isFocused, setIsFocused] = createSignal(false)

	let triggerRef: HTMLElement | undefined
	let tooltipRef: HTMLElement | undefined
	let portalContainer: HTMLDivElement | null = null
	let dispose: (() => void) | null = null
	let showTimeout: number | null = null
	let hideTimeout: number | null = null

	const showTooltip = () => {
		if (showTimeout) {
			clearTimeout(showTimeout)
			showTimeout = null
		}
		if (hideTimeout) {
			clearTimeout(hideTimeout)
			hideTimeout = null
		}

		showTimeout = window.setTimeout(() => {
			if (isHovered() || isFocused()) {
				setIsVisible(true)
			}
		}, delay())
	}

	const hideTooltip = () => {
		if (showTimeout) {
			clearTimeout(showTimeout)
			showTimeout = null
		}
		if (hideTimeout) {
			clearTimeout(hideTimeout)
			hideTimeout = null
		}

		hideTimeout = window.setTimeout(() => {
			if (!isHovered() && !isFocused()) {
				setIsVisible(false)
			}
		}, 100)
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
		showTooltip()
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		hideTooltip()
	}

	const handleFocus = () => {
		if (showOnFocus()) {
			setIsFocused(true)
			showTooltip()
		}
	}

	const handleBlur = () => {
		setIsFocused(false)
		hideTooltip()
	}

	// Setup position calculation
	useTooltipPosition(
		() => tooltipRef,
		() => triggerRef,
		position,
		isVisible
	)

	onMount(() => {
		// Create portal container
		portalContainer = document.createElement('div')
		document.body.appendChild(portalContainer)

		// Render portal - always render, Show controls visibility
		dispose = render(
			() => (
				<Show when={isVisible()}>
					<div
						ref={el => {
							if (el) {
								tooltipRef = el
							}
						}}
						class={`tooltip tooltip-${position()} ${props.class || ''}`}
						style={{
							...tooltipStyles.tooltip(position(), isDark(), isVisible()),
							...props.style
						}}
						role='tooltip'
					>
						{props.content}
						<div
							style={tooltipStyles.arrow(position(), isDark())}
							aria-hidden='true'
						/>
					</div>
				</Show>
			),
			portalContainer!
		)
	})

	onCleanup(() => {
		if (showTimeout) clearTimeout(showTimeout)
		if (hideTimeout) clearTimeout(hideTimeout)

		if (dispose) {
			dispose()
		}
		if (portalContainer && portalContainer.parentNode) {
			portalContainer.parentNode.removeChild(portalContainer)
		}
	})

	// Wrap children in a span to attach event listeners
	return (
		<span
			ref={el => {
				if (el) {
					triggerRef = el
				}
			}}
			style={{ display: 'inline-block', position: 'relative' }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			tabindex={showOnFocus() ? 0 : undefined}
		>
			{props.children}
		</span>
	)
}

