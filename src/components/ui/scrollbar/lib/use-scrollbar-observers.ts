export function useScrollbarObservers(
	containerRef: () => HTMLDivElement | undefined,
	contentRef: () => HTMLDivElement | undefined,
	updateCallback: () => void
) {
	const setupObservers = () => {
		if (!containerRef() || !contentRef()) return

		// ResizeObserver для обновления при изменении размера
		const resizeObserver = new ResizeObserver(() => {
			updateCallback()
		})
		resizeObserver.observe(contentRef()!)
		resizeObserver.observe(containerRef()!)

		// MutationObserver для отслеживания изменений в содержимом
		const mutationObserver = new MutationObserver(() => {
			updateCallback()
			// Дополнительное обновление для полной загрузки
			setTimeout(updateCallback, 10)
		})
		mutationObserver.observe(contentRef()!, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['style', 'class']
		})

		return () => {
			resizeObserver.disconnect()
			mutationObserver.disconnect()
		}
	}

	return { setupObservers }
}
