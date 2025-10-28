import { createSignal, onCleanup } from 'solid-js'
import { useScrollbarConfig } from './scrollbar-provider'
import type { ScrollbarState } from '../model/types'

export function useScrollbarState(props: any) {
	const config = useScrollbarConfig()
	
	const [state, setState] = createSignal<ScrollbarState>({
		thumbSize: 20,
		thumbPosition: 0,
		isVisible: false,
		isDragging: false,
		dragOffset: 0,
		showArrows: props.showArrows ?? true,
		canScrollUp: false,
		canScrollDown: false
	})

	const [isHovered, setIsHovered] = createSignal(false)
	const [hideTimeout, setHideTimeout] = createSignal<NodeJS.Timeout | null>(null)

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
		// НЕ устанавливаем isVisible здесь - это делает updateScrollbar
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		if (autoHide()) {
			// Плавное исчезновение с задержкой
			const timeout = setTimeout(() => {
				setState(prev => ({ ...prev, isVisible: false }))
			}, 800) // Увеличил задержку для плавности
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
		handleMouseEnter,
		handleMouseLeave
	}
}
