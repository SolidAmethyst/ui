import { createEffect, createSignal, onCleanup, type Accessor } from 'solid-js'
import type { ScrollbarProps, ScrollbarState } from '../model/types'
import { useScrollbarConfig } from './scrollbar-provider'

export function useScrollbarState(props: ScrollbarProps) {
	const config = useScrollbarConfig()

	const showArrows: Accessor<boolean> = () => props.showArrows ?? true

	const [state, setState] = createSignal<ScrollbarState>({
		thumbSize: 20,
		thumbPosition: 0,
		isVisible: false,
		isDragging: false,
		dragOffset: 0,
		showArrows: showArrows(),
		canScrollUp: false,
		canScrollDown: false
	})

	// Update showArrows when props change
	createEffect(() => {
		setState(prev => ({ ...prev, showArrows: showArrows() }))
	})

	const [isHovered, setIsHovered] = createSignal(false)
	const [hideTimeout, setHideTimeout] = createSignal<NodeJS.Timeout | null>(
		null
	)

	const direction = () => props.direction ?? 'vertical'
	const theme = () => props.theme ?? config.config.theme.name
	const autoHide = () => props.autoHide ?? true
	const minThumbSize = () => props.minThumbSize ?? 4
	const engineIntegration = () => {
		if (props.engineIntegration !== undefined) {
			return props.engineIntegration && config.config.engine.enabled
		}
		return config.config.engine.enabled
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
		const timeout = hideTimeout()
		if (timeout) {
			clearTimeout(timeout)
			setHideTimeout(null)
		}
		// Don't set isVisible here - updateScrollbar does that
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		if (autoHide()) {
			// Smooth fade-out with delay
			const timeout = setTimeout(() => {
				setState(prev => ({ ...prev, isVisible: false }))
			}, 800) // Increased delay for smoothness
			setHideTimeout(timeout)
		}
	}

	onCleanup(() => {
		const timeout = hideTimeout()
		if (timeout) {
			clearTimeout(timeout)
		}
	})

	return {
		state,
		setState,
		isHovered,
		setIsHovered,
		hideTimeout,
		setHideTimeout,
		direction,
		theme,
		autoHide,
		minThumbSize,
		engineIntegration,
		showArrows,
		handleMouseEnter,
		handleMouseLeave
	}
}
