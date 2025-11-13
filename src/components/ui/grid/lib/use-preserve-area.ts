/**
 * Preserve Area Hook
 * Maintains element area when grid container width changes
 * Works with breakpoints - config can change reactively
 */

import { createEffect, onCleanup, type Accessor } from 'solid-js'
import type { PreserveAreaConfig } from '../model/types'

/**
 * Hook to preserve element area when container width changes
 * @param containerRef - Accessor for grid container element
 * @param config - Accessor for preserve area configuration (reactive, from breakpoint)
 */
export const usePreserveArea = (
	containerRef: Accessor<HTMLDivElement | undefined>,
	config: Accessor<PreserveAreaConfig | undefined>
) => {
	let resizeObserver: ResizeObserver | null = null
	let baseArea = 0
	let initialized = false
	let currentConfig: PreserveAreaConfig | undefined = undefined

	// Cleanup function
	const cleanup = () => {
		if (resizeObserver) {
			resizeObserver.disconnect()
			resizeObserver = null
		}
		baseArea = 0
		initialized = false
		currentConfig = undefined
	}

	// Calculate and apply preserve area
	const updatePreserveArea = () => {
		const container = containerRef()
		const activeConfig = config()

		if (!container || !activeConfig) return

		const selector = activeConfig.selector || '[data-preserve-area]'
		const element = container.querySelector<HTMLElement>(selector)

		if (!element) return

		// Initialize base measurements on first run or config change
		if (!initialized || currentConfig !== activeConfig) {
			const rect = element.getBoundingClientRect()
			const containerRect = container.getBoundingClientRect()

			// Calculate base area from CURRENT element width (which should be full width at init)
			// and its current height - this establishes the reference area
			const elementWidth = rect.width
			const elementHeight = rect.height
			baseArea = elementWidth * elementHeight

			console.log('[PA Init]', {
				elementWidth,
				elementHeight,
				baseArea,
				containerWidth: containerRect.width
			})

			initialized = true
			currentConfig = activeConfig
		}

		// Get current width
		const containerRect = container.getBoundingClientRect()
		const elementRect = element.getBoundingClientRect()
		const currentWidth = elementRect.width

		// Calculate new height to maintain area
		let newHeight = baseArea / currentWidth

		console.log('[PA Update]', {
			currentWidth,
			baseArea,
			newHeight,
			oldHeight: elementRect.height
		})

		// Apply constraints (parse string values like '200px' to numbers)
		if (activeConfig.minHeight) {
			const minHeightNum =
				typeof activeConfig.minHeight === 'string'
					? parseFloat(activeConfig.minHeight)
					: activeConfig.minHeight
			newHeight = Math.max(newHeight, minHeightNum)
		}
		if (activeConfig.maxHeight) {
			const maxHeightNum =
				typeof activeConfig.maxHeight === 'string'
					? parseFloat(activeConfig.maxHeight)
					: activeConfig.maxHeight
			newHeight = Math.min(newHeight, maxHeightNum)
		}

		// Get current grid-template-rows
		const computedStyle = window.getComputedStyle(container)
		const currentRows = computedStyle.gridTemplateRows

		if (currentRows && currentRows !== 'none') {
			const rowValues = currentRows.split(' ')

			// Find which row the element is in
			const gridRow = window.getComputedStyle(element).gridRow
			const rowMatch = gridRow.match(/^(\d+)/)

			if (rowMatch) {
				const rowIndex = parseInt(rowMatch[1], 10) - 1 // 0-based

				if (rowIndex >= 0 && rowIndex < rowValues.length) {
					// Update this row's height
					rowValues[rowIndex] = `${newHeight}px`

					// Calculate remaining space for ALL other rows
					const containerHeight = containerRect.height
					const gap = parseFloat(computedStyle.gap) || 0
					const totalGaps = (rowValues.length - 1) * gap
					const remainingHeight = containerHeight - newHeight - totalGaps

					// Find all other rows (not the preserve area row)
					const otherRowIndices: number[] = []
					for (let i = 0; i < rowValues.length; i++) {
						if (i !== rowIndex) {
							otherRowIndices.push(i)
						}
					}

					// Distribute remaining height among other rows
					if (otherRowIndices.length > 0) {
						const heightPerRow = remainingHeight / otherRowIndices.length

						// Get minHeight from constraints if specified
						let minHeight = 0
						if (activeConfig.constraints && activeConfig.constraints[0]) {
							minHeight = activeConfig.constraints[0].minHeight || 0
						}

						const finalHeight = Math.max(heightPerRow, minHeight)
						otherRowIndices.forEach(idx => {
							rowValues[idx] = `${finalHeight}px`
						})
					}

					// Apply new grid-template-rows
					const newGridTemplateRows = rowValues.join(' ')
					container.style.gridTemplateRows = newGridTemplateRows

					console.log('[PA Applied]', {
						rowIndex,
						newGridTemplateRows,
						currentRows,
						remainingHeight,
						containerHeight,
						otherRowsCount: otherRowIndices.length
					})
				}
			}
		}
	}

	// Setup effect to watch config changes
	createEffect(() => {
		const container = containerRef()
		const activeConfig = config()

		// Cleanup if no config
		if (!activeConfig || !container) {
			cleanup()
			return
		}

		// Reset if config changed
		if (currentConfig !== activeConfig) {
			cleanup()
		}

		// Setup ResizeObserver
		if (!resizeObserver) {
			resizeObserver = new ResizeObserver(() => {
				updatePreserveArea()
			})

			resizeObserver.observe(container)
		}

		// Initial calculation
		updatePreserveArea()
	})

	onCleanup(() => {
		cleanup()
	})
}
