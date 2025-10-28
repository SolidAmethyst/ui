import { createSignal, JSX, onCleanup, onMount } from 'solid-js'
import { clamp } from './scrollbar-calculations'

interface ScrollbarProps {
	children: JSX.Element
	class?: string
	style?: any
	horizontal?: boolean
}

export const Scrollbar = (props: ScrollbarProps) => {
	let containerRef: HTMLDivElement | undefined
	let contentRef: HTMLDivElement | undefined
	let thumbRef: HTMLDivElement | undefined
	let trackRef: HTMLDivElement | undefined

	const [thumbSize, setThumbSize] = createSignal(50)
	const [thumbPosition, setThumbPosition] = createSignal(0)
	const [showScrollbar, setShowScrollbar] = createSignal(false)
	const [isDragging, setIsDragging] = createSignal(false)
	const [dragOffset, setDragOffset] = createSignal(0)

	// Engine state for physics-based scrolling
	const [engineState, setEngineState] = createSignal<any>(null)
	const [scrollVelocity, setScrollVelocity] = createSignal(0)

	const updateScrollbar = () => {
		if (!containerRef || !contentRef) return

		const containerSize = props.horizontal
			? containerRef.clientWidth
			: containerRef.clientHeight
		const contentSize = props.horizontal
			? contentRef.scrollWidth
			: contentRef.scrollHeight

		// Простая логика БЕЗ ScrollContext
		if (contentSize <= containerSize) {
			setShowScrollbar(false)
			return
		}

		setShowScrollbar(true)

		// Размер ползунка пропорционально
		const ratio = containerSize / contentSize
		const size = Math.max(50, containerSize * ratio)
		setThumbSize(size)

		// Позиция ползунка
		const scrollPosition = props.horizontal
			? contentRef.scrollLeft
			: contentRef.scrollTop
		const maxScroll = contentSize - containerSize
		const maxThumbPos = containerSize - size
		const pos = (scrollPosition / maxScroll) * maxThumbPos
		setThumbPosition(pos)
	}

	const handleScroll = () => {
		if (isDragging()) return
		updateScrollbar()
	}

	const handleThumbMouseDown = async (e: MouseEvent) => {
		if (!thumbRef || !contentRef || !trackRef) return
		e.preventDefault()
		e.stopPropagation()

		setIsDragging(true)

		// ТОЧНАЯ ЛОГИКА КУБИКА: offset от мыши до ЦЕНТРА ползунка
		const trackRect = trackRef.getBoundingClientRect()
		// УЧИТЫВАЕМ ЗУМ - делим на zoom level
		const zoomLevel = parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue(
				'--zoom-level'
			) || '1'
		)
		const mousePos = props.horizontal
			? (e.clientX - trackRect.left) / zoomLevel
			: (e.clientY - trackRect.top) / zoomLevel

		// Offset от мыши до ЦЕНТРА ползунка (как у кубика с -25)
		const thumbCenter = thumbPosition() + thumbSize() / 2
		const offset = mousePos - thumbCenter
		setDragOffset(offset)

		// Physics integration removed for web version

		document.body.style.userSelect = 'none'
	}

	const handleMouseMove = async (e: MouseEvent) => {
		if (!isDragging() || !trackRef || !contentRef) return
		e.preventDefault()

		// ТОЧНАЯ ЛОГИКА КУБИКА: позиция = мышь - offset
		const trackRect = trackRef.getBoundingClientRect()
		// УЧИТЫВАЕМ ЗУМ - делим на zoom level
		const zoomLevel = parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue(
				'--zoom-level'
			) || '1'
		)
		const mousePos = props.horizontal
			? (e.clientX - trackRect.left) / zoomLevel
			: (e.clientY - trackRect.top) / zoomLevel

		// Позиция ЦЕНТРА ползунка = позиция мыши - offset (как у кубика)
		const thumbCenterPos = mousePos - dragOffset()
		const newThumbPos = thumbCenterPos - thumbSize() / 2
		const maxThumbPos =
			(props.horizontal ? trackRef.clientWidth : trackRef.clientHeight) -
			thumbSize()
		const clampedPos = clamp(newThumbPos, 0, maxThumbPos)

		setThumbPosition(clampedPos)

		// Physics integration removed for web version

		// Скроллим контент (простая логика)
		const containerSize = props.horizontal
			? trackRef.clientWidth
			: trackRef.clientHeight
		const contentSize = props.horizontal
			? contentRef.scrollWidth
			: contentRef.scrollHeight
		const maxScroll = contentSize - containerSize
		const scrollRatio = clampedPos / maxThumbPos
		const scrollPos = scrollRatio * maxScroll

		if (props.horizontal) {
			contentRef.scrollLeft = scrollPos
		} else {
			contentRef.scrollTop = scrollPos
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
		document.body.style.userSelect = ''
	}

	const handleTrackClick = (e: MouseEvent) => {
		if (!trackRef || !contentRef || !thumbRef) return
		if (e.target === thumbRef) return

		const trackRect = trackRef.getBoundingClientRect()
		// УЧИТЫВАЕМ ЗУМ - делим на zoom level
		const zoomLevel = parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue(
				'--zoom-level'
			) || '1'
		)
		const clickPosition = props.horizontal
			? (e.clientX - trackRect.left) / zoomLevel
			: (e.clientY - trackRect.top) / zoomLevel

		const newThumbPos = clickPosition - thumbSize() / 2
		const maxThumbPos =
			(props.horizontal ? trackRef.clientWidth : trackRef.clientHeight) -
			thumbSize()
		const clampedThumbPos = clamp(newThumbPos, 0, maxThumbPos)

		setThumbPosition(clampedThumbPos)

		// Скроллим контент (простая логика)
		const containerSize = props.horizontal
			? trackRef.clientWidth
			: trackRef.clientHeight
		const contentSize = props.horizontal
			? contentRef.scrollWidth
			: contentRef.scrollHeight
		const maxScroll = contentSize - containerSize
		const scrollRatio = clampedThumbPos / maxThumbPos
		const scrollPos = scrollRatio * maxScroll

		if (props.horizontal) {
			contentRef.scrollLeft = scrollPos
		} else {
			contentRef.scrollTop = scrollPos
		}
	}

	onMount(() => {
		updateScrollbar()
		setTimeout(updateScrollbar, 0)
		setTimeout(updateScrollbar, 50)
		setTimeout(updateScrollbar, 100)
		setTimeout(updateScrollbar, 250)
		setTimeout(updateScrollbar, 500)
		setTimeout(updateScrollbar, 1000)

		const resizeObserver = new ResizeObserver(updateScrollbar)
		const mutationObserver = new MutationObserver(updateScrollbar)

		if (contentRef) {
			resizeObserver.observe(contentRef)
			mutationObserver.observe(contentRef, {
				childList: true,
				subtree: true,
				characterData: true
			})
			contentRef.addEventListener('scroll', handleScroll)
		}

		if (containerRef) {
			resizeObserver.observe(containerRef)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)

		onCleanup(() => {
			resizeObserver.disconnect()
			mutationObserver.disconnect()
			if (contentRef) {
				contentRef.removeEventListener('scroll', handleScroll)
			}
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		})
	})

	return (
		<>
			<style>{`
				.custom-scrollbar-container {
					position: relative;
					overflow: hidden;
				}
				.custom-scrollbar-content {
					height: 100%;
					width: 100%;
					overflow-y: auto;
					overflow-x: auto;
					scrollbar-width: none !important;
					-ms-overflow-style: none !important;
				}
				.custom-scrollbar-content::-webkit-scrollbar {
					display: none !important;
					width: 0 !important;
					height: 0 !important;
				}
				.custom-scrollbar-track {
					position: absolute;
					z-index: 999;
					background: transparent;
				}
				.custom-scrollbar-track-vertical {
					top: 0;
					right: 0;
					width: 10px;
					height: 100%;
				}
				.custom-scrollbar-track-horizontal {
					bottom: 0;
					left: 0;
					width: 100%;
					height: 12px;
				}
				.custom-scrollbar-thumb {
					position: absolute;
					background: rgba(59, 130, 246, 0.6);
					border-radius: 2px;
					cursor: grab;
					transition: background 150ms;
					z-index: 99999;
				}
				.custom-scrollbar-thumb:hover {
					background: rgba(59, 130, 246, 0.8);
				}
				.custom-scrollbar-thumb:active,
				.custom-scrollbar-thumb.dragging {
					background: rgba(59, 130, 246, 1);
					cursor: grabbing;
				}
			`}</style>
			<div
				ref={containerRef}
				class={`custom-scrollbar-container ${props.class || ''}`}
				style={props.style}
			>
				<div
					ref={contentRef}
					class='custom-scrollbar-content'
					style={{
						'overflow-y': props.horizontal ? 'hidden' : 'auto',
						'overflow-x': props.horizontal ? 'auto' : 'hidden'
					}}
				>
					{props.children}
				</div>

				{showScrollbar() && (
					<div
						ref={trackRef}
						class={`custom-scrollbar-track ${
							props.horizontal
								? 'custom-scrollbar-track-horizontal'
								: 'custom-scrollbar-track-vertical'
						}`}
						onClick={handleTrackClick}
					>
						<div
							ref={thumbRef}
							class={`custom-scrollbar-thumb ${isDragging() ? 'dragging' : ''}`}
							style={{
								width: props.horizontal ? `${thumbSize()}px` : '4px',
								height: props.horizontal ? '4px' : `${thumbSize()}px`,
								left: props.horizontal ? `${thumbPosition()}px` : 'auto',
								top: props.horizontal ? '4px' : `${thumbPosition()}px`,
								right: props.horizontal ? 'auto' : '2px'
							}}
							onMouseDown={handleThumbMouseDown}
						/>
					</div>
				)}
			</div>
		</>
	)
}
