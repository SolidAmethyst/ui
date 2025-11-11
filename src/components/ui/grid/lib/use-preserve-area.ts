/**
 * Hook for preserving element area when grid container resizes
 *
 * Uses CSS custom properties for library compatibility:
 * - --grid-row-1-height: Height of first grid row
 * - --grid-row-2-height: Height of second grid row (priority element)
 *
 * Users can override these properties in their CSS if needed
 */

import { createEffect, onCleanup } from 'solid-js'
import type { GridElementConstraint, PreserveAreaConfig } from '../model/types'

interface ElementData {
	element: HTMLElement
	baseWidth: number
	baseHeight: number
	baseArea: number
}

// Parse constraint value (supports "100px", "20%", or number)
const parseConstraintValue = (
	value: string | number | undefined,
	containerSize: number
): number | undefined => {
	if (value === undefined) return undefined
	if (typeof value === 'number') return value

	const strValue = String(value).trim()
	if (strValue.endsWith('%')) {
		const percent = parseFloat(strValue)
		if (!isNaN(percent)) {
			return (containerSize * percent) / 100
		}
	}
	const pxValue = parseFloat(strValue)
	return isNaN(pxValue) ? undefined : pxValue
}

export const usePreserveArea = (
	containerRef: () => HTMLElement | undefined,
	config: PreserveAreaConfig | undefined
) => {
	if (!config) return

	let resizeObserver: ResizeObserver | null = null
	const elementsData = new Map<HTMLElement, ElementData>()
	let initialized = false
	let rafId: number | null = null
	let isAnimating = false
	let lastWidth = 0

	const updateGridDimensions = () => {
		elementsData.forEach(data => {
			const container = data.element.parentElement
			if (!container) return

			const currentWidth = data.element.getBoundingClientRect().width
			const containerHeight = container.getBoundingClientRect().height
			const gap = parseFloat(window.getComputedStyle(container).rowGap) || 0

			// Calculate Card 4 height to preserve area
			let card4Height = data.baseArea / currentWidth

			if (config.minHeight) {
				const minHeightPx = parseFloat(config.minHeight)
				if (!isNaN(minHeightPx)) {
					card4Height = Math.max(card4Height, minHeightPx)
				}
			}

			if (config.maxHeight) {
				const maxHeightPx = parseFloat(config.maxHeight)
				if (!isNaN(maxHeightPx)) {
					card4Height = Math.min(card4Height, maxHeightPx)
				}
			}

			// Calculate row 1 height: shrink it to make room for Card 4
			let row1Height = containerHeight - card4Height - gap

			// Default minimums - can be overridden via CSS variables
			const computedStyle = window.getComputedStyle(container)
			const minRow1Var = computedStyle.getPropertyValue('--grid-preserve-area-min-row-height').trim()
			const minCard4Var = computedStyle.getPropertyValue('--grid-preserve-area-min-card-height').trim()

			const defaultMinRow1 = minRow1Var ? parseFloat(minRow1Var) || 60 : 60
			const defaultMinCard4 = minCard4Var ? parseFloat(minCard4Var) || 200 : 200

			let minRow1 = defaultMinRow1
			let minCard4 = defaultMinCard4

			// Apply constraints from config (soft limits - only if needed)
			if (config.constraints) {
				config.constraints.forEach((constraint: GridElementConstraint) => {
					const constraintElements = Array.from(
						container.querySelectorAll<HTMLElement>(constraint.selector)
					)

					if (constraintElements.length > 0 && constraint.minHeight) {
						const minHeight = parseConstraintValue(
							constraint.minHeight,
							containerHeight
						)

						if (minHeight !== undefined) {
							// Check which row each element is in
							constraintElements.forEach(element => {
								const gridRow = window.getComputedStyle(element).gridRow
								// Check if element is in row 1 (top cards)
								if (gridRow.includes('1') || gridRow === '1') {
									minRow1 = Math.max(minRow1, minHeight)
								}
							})
						}
					}
				})
			}

			// Apply constraints ONLY if row1Height would go below minimum (soft constraint)
			if (row1Height < minRow1) {
				row1Height = minRow1
				card4Height = containerHeight - row1Height - gap
			}

			// Ensure Card 4 doesn't exceed container
			if (card4Height > containerHeight - minRow1 - gap) {
				card4Height = containerHeight - minRow1 - gap
				row1Height = containerHeight - card4Height - gap
			}

			// Final safety check
			if (card4Height < minCard4) card4Height = minCard4
			if (row1Height < minRow1) row1Height = minRow1

			// Set CSS custom properties for external override
			container.style.setProperty('--grid-row-1-height', `${row1Height}px`)
			container.style.setProperty('--grid-row-2-height', `${card4Height}px`)

			// Update Grid rows
			container.style.gridTemplateRows = `var(--grid-row-1-height, ${row1Height}px) var(--grid-row-2-height, ${card4Height}px)`
		})
	}

	const setupPreserveArea = () => {
		const container = containerRef()
		if (!container) return

		const selector = config.selector || '[data-preserve-area]'
		const elements = container.querySelectorAll<HTMLElement>(selector)

		if (elements.length === 0) return

		if (!initialized) {
			elements.forEach(element => {
				const rect = element.getBoundingClientRect()
				const baseWidth = config.baseWidth || rect.width
				// Reduce base height by 150px for lower initial Card 4
				const baseHeight = Math.max(
					(config.baseHeight || rect.height) - 150,
					150
				)
				const baseArea = baseWidth * baseHeight

				elementsData.set(element, {
					element,
					baseWidth,
					baseHeight,
					baseArea
				})
			})
			initialized = true

			// Initial calculation
			updateGridDimensions()

			// Store initial width
			elementsData.forEach(data => {
				lastWidth = data.element.getBoundingClientRect().width
			})
		}

		// Continuous animation loop
		const animate = () => {
			const currentWidth =
				Array.from(elementsData.values())[0]?.element.getBoundingClientRect()
					.width || 0

			// Check if width is changing
			if (Math.abs(currentWidth - lastWidth) > 0.5) {
				isAnimating = true
				updateGridDimensions()
				lastWidth = currentWidth
			} else if (isAnimating) {
				// Width stabilized, do final update
				updateGridDimensions()
				isAnimating = false
			}

			rafId = requestAnimationFrame(animate)
		}

		// Start animation loop
		rafId = requestAnimationFrame(animate)

		resizeObserver = new ResizeObserver(() => {
			if (!container) return
			// Trigger immediate update
			updateGridDimensions()
		})

		resizeObserver.observe(container)
	}

	createEffect(() => {
		const container = containerRef()
		if (!container) return
		// Setup immediately without animation frame delay
		setupPreserveArea()
	})

	onCleanup(() => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId)
			rafId = null
		}
		if (resizeObserver) {
			resizeObserver.disconnect()
			resizeObserver = null
		}
		const container = containerRef()
		if (container) {
			container.style.gridTemplateRows = ''
		}
		elementsData.clear()
		initialized = false
	})
}
