import type { Accessor, Setter } from 'solid-js'
import type { ScrollbarState } from '../model/types'

export function useScrollbarLogic(
	state: Accessor<ScrollbarState>,
	setState: Setter<ScrollbarState>,
	direction: () => string,
	containerRef: () => HTMLDivElement | undefined,
	contentRef: () => HTMLDivElement | undefined,
	trackRef: () => HTMLDivElement | undefined,
	minThumbSize: () => number
) {
	const updateScrollbar = () => {
		if (!containerRef() || !contentRef()) return

		const containerSize =
			direction() === 'horizontal'
				? containerRef()!.clientWidth
				: containerRef()!.clientHeight
		const contentSize =
			direction() === 'horizontal'
				? contentRef()!.scrollWidth
				: contentRef()!.scrollHeight

		const needsScrollbar = contentSize > containerSize
		if (!needsScrollbar) {
			setState(prev => ({ ...prev, isVisible: false }))
			return
		}

		const scrollPosition =
			direction() === 'horizontal'
				? contentRef()!.scrollLeft
				: contentRef()!.scrollTop
		const maxScroll = contentSize - containerSize
		const trackSize =
			direction() === 'horizontal'
				? trackRef()?.clientWidth ?? 0
				: trackRef()?.clientHeight ?? 0

		const arrowSpace = state().showArrows ? 12 : 0
		const availableTrackSize = trackSize - arrowSpace * 2

		// ПРАВИЛЬНЫЙ расчет размера слайдера - пропорционально контенту
		const thumbSize = Math.max(
			minThumbSize(),
			(availableTrackSize * containerSize) / contentSize
		)

		// ПРАВИЛЬНЫЙ расчет позиции - только если НЕ перетаскиваем
		const thumbPosition = state().isDragging
			? state().thumbPosition // Сохраняем при перетаскивании
			: Math.max(
					arrowSpace,
					Math.min(
						arrowSpace +
							(scrollPosition / maxScroll) * (availableTrackSize - thumbSize),
						availableTrackSize - thumbSize + arrowSpace
					)
			  )

		setState(prev => ({
			...prev,
			isVisible: true,
			thumbSize,
			thumbPosition,
			canScrollUp: scrollPosition > 0,
			canScrollDown: scrollPosition < maxScroll
		}))
	}

	const handleScroll = () => {
		// Не обновляем при перетаскивании - это вызывает конфликт
		if (state().isDragging) return
		updateScrollbar()
	}

	return {
		updateScrollbar,
		handleScroll
	}
}
