import { createSignal, onCleanup, onMount } from 'solid-js'
import { ScrollbarProvider } from '../lib/scrollbar-provider'
import { scrollbarStyles } from '../lib/scrollbar.styles'
import { useScrollbarHandlers } from '../lib/use-scrollbar-handlers'
import { useScrollbarLogic } from '../lib/use-scrollbar-logic'
import { useScrollbarObservers } from '../lib/use-scrollbar-observers'
import { useScrollbarState } from '../lib/use-scrollbar-state'
import type { ScrollbarProps } from '../model/types'
import { ScrollbarArrows } from './scrollbar-arrows'
import { ScrollbarThumb } from './scrollbar-thumb'

const ScrollbarComponent = (props: ScrollbarProps) => {
	// Refs
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>()
	const [contentRef, setContentRef] = createSignal<HTMLDivElement>()
	const [trackRef, setTrackRef] = createSignal<HTMLDivElement>()
	const [thumbRef, setThumbRef] = createSignal<HTMLDivElement>()

	// State hook
	const {
		state,
		setState,
		isHovered,
		direction,
		theme,
		autoHide,
		minThumbSize,
		engineIntegration,
		handleMouseEnter,
		handleMouseLeave
	} = useScrollbarState(props)

	// Logic hook
	const { updateScrollbar, handleScroll } = useScrollbarLogic(
		state,
		setState,
		direction,
		containerRef,
		contentRef,
		trackRef,
		minThumbSize
	)

	// Handlers hook
	const {
		scrollBy,
		handleWheel,
		handleThumbMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleTrackClick
	} = useScrollbarHandlers(
		state,
		setState,
		direction,
		containerRef,
		contentRef,
		trackRef,
		thumbRef,
		engineIntegration,
		updateScrollbar
	)

	// Observers hook
	const { setupObservers } = useScrollbarObservers(
		containerRef,
		contentRef,
		updateScrollbar
	)

	const shouldShowScrollbar = () => {
		return (
			state().isVisible && (isHovered() || !autoHide() || state().isDragging)
		)
	}

	onMount(() => {
		// Ждем полной загрузки контента - больше попыток
		const initScrollbar = () => {
			updateScrollbar()
		}

		// Множественные попытки для полной загрузки контента
		initScrollbar()
		setTimeout(initScrollbar, 0)
		setTimeout(initScrollbar, 50)
		setTimeout(initScrollbar, 100)
		setTimeout(initScrollbar, 200)
		setTimeout(initScrollbar, 500)
		setTimeout(initScrollbar, 1000)
		setTimeout(initScrollbar, 2000)

		// Setup scroll listener
		if (contentRef()) {
			contentRef()!.addEventListener('scroll', handleScroll)
		}

		// Setup observers
		const cleanupObservers = setupObservers()

		// Global mouse events
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)

		onCleanup(() => {
			cleanupObservers?.()
			if (contentRef()) {
				contentRef()!.removeEventListener('scroll', handleScroll)
			}
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		})
	})

	return (
		<>
			<style>{scrollbarStyles}</style>
			<div
				ref={setContainerRef}
				class={`scrollbar-container ${props.class || ''}`}
				style={props.style}
				onMouseEnter={() => {
					handleMouseEnter()
					updateScrollbar() // Проверяем нужен ли скроллбар при наведении
				}}
				onMouseLeave={handleMouseLeave}
				onWheel={handleWheel}
			>
				<div
					ref={setContentRef}
					class='scrollbar-content'
					style={{
						'overflow-y': 'hidden',
						'overflow-x': 'hidden'
					}}
				>
					{props.children}
				</div>

				{shouldShowScrollbar() && (
					<div
						ref={setTrackRef}
						class={`scrollbar-track ${
							direction() === 'horizontal'
								? 'scrollbar-track-horizontal'
								: 'scrollbar-track-vertical'
						} visible`}
						onClick={handleTrackClick}
					>
						{/* Arrow buttons */}
						{state().showArrows && (
							<ScrollbarArrows
								direction={direction()}
								canScrollUp={state().canScrollUp}
								canScrollDown={state().canScrollDown}
								onScrollBy={scrollBy}
							/>
						)}

						{/* Thumb */}
						<ScrollbarThumb
							direction={direction()}
							thumbSize={state().thumbSize}
							thumbPosition={state().thumbPosition}
							isDragging={state().isDragging}
							onMouseDown={handleThumbMouseDown}
						/>
					</div>
				)}
			</div>
		</>
	)
}

export const Scrollbar = (props: ScrollbarProps) => {
	return (
		<ScrollbarProvider>
			<ScrollbarComponent {...props} />
		</ScrollbarProvider>
	)
}
