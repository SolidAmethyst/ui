/**
 * Hook for preserving element area when grid container resizes
 *
 * Uses CSS custom properties for library compatibility:
 * - --grid-row-N-height: Height of Nth grid row (where N is row index)
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
	rowIndex: number // 1-based row index
}

interface RowData {
	index: number // 1-based
	originalValue: string // Original value from grid-template-rows
	currentHeight: number // Current height in pixels
	isPreserveArea: boolean // Is this the preserve area row
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

// Parse grid-row CSS value to get row index (1-based)
const getRowIndex = (element: HTMLElement): number => {
	const gridRow = window.getComputedStyle(element).gridRow
	// grid-row can be "1", "1 / 2", "1 / span 2", etc.
	// We need the start row
	const match = gridRow.match(/^(\d+)/)
	if (match) {
		return parseInt(match[1], 10)
	}
	// Fallback: try to determine from position
	return 1
}

// Parse grid-template-rows string into array of values
const parseGridTemplateRows = (rowsString: string): string[] => {
	if (!rowsString || rowsString.trim() === '') return []
	// Split by spaces, but handle values with spaces inside (like "minmax(100px, 1fr)")
	const values: string[] = []
	let current = ''
	let depth = 0

	for (let i = 0; i < rowsString.length; i++) {
		const char = rowsString[i]
		if (char === '(') depth++
		else if (char === ')') depth--

		if (char === ' ' && depth === 0) {
			if (current.trim()) {
				values.push(current.trim())
				current = ''
			}
		} else {
			current += char
		}
	}

	if (current.trim()) {
		values.push(current.trim())
	}

	return values
}

// Convert row value to pixels (if possible) or return null
const rowValueToPixels = (value: string, containerHeight: number, totalRows: number): number | null => {
	const trimmed = value.trim()

	// Already in pixels
	if (trimmed.endsWith('px')) {
		const px = parseFloat(trimmed)
		return isNaN(px) ? null : px
	}

	// Percentage
	if (trimmed.endsWith('%')) {
		const percent = parseFloat(trimmed)
		return isNaN(percent) ? null : (containerHeight * percent) / 100
	}

	// fr units - need to calculate based on available space
	if (trimmed.endsWith('fr')) {
		const fr = parseFloat(trimmed)
		if (isNaN(fr)) return null
		// For fr, we'll need to calculate later with total available space
		return null // Mark as flexible
	}

	// Try to parse as number (assumes px)
	const num = parseFloat(trimmed)
	return isNaN(num) ? null : num
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
			const computedStyle = window.getComputedStyle(container)

			// Get original grid-template-rows
			const originalRowsString = computedStyle.gridTemplateRows || ''
			const rowValues = parseGridTemplateRows(originalRowsString)

			if (rowValues.length === 0) return

			const preserveAreaRowIndex = data.rowIndex
			const totalRows = rowValues.length

			// Get minimums from CSS variables
			const minPreserveAreaVar = computedStyle.getPropertyValue('--grid-preserve-area-min-card-height').trim()
			const defaultMinPreserveArea = minPreserveAreaVar ? parseFloat(minPreserveAreaVar) || 200 : 200
			const defaultMinRow = parseFloat(
				computedStyle.getPropertyValue('--grid-preserve-area-min-row-height').trim() || '60'
			) || 60

			// Build row data array with current heights
			const rowsData: RowData[] = rowValues.map((value, index) => {
				const rowIndex = index + 1
				const isPreserveArea = rowIndex === preserveAreaRowIndex
				// Get actual current height from DOM
				const rowElement = Array.from(container.children).find((child, idx) => {
					const childRow = getRowIndex(child as HTMLElement)
					return childRow === rowIndex
				}) as HTMLElement | undefined
				const currentHeight = rowElement ? rowElement.getBoundingClientRect().height :
					(rowValueToPixels(value, containerHeight, totalRows) || 0)

				return {
					index: rowIndex,
					originalValue: value,
					currentHeight,
					isPreserveArea
				}
			})

			// Calculate minimums for each row from constraints
			const rowMinimums = new Map<number, number>()

			// Apply constraints from config
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
							constraintElements.forEach(element => {
								const elementRowIndex = getRowIndex(element)
								if (elementRowIndex !== preserveAreaRowIndex) {
									const currentMin = rowMinimums.get(elementRowIndex) || defaultMinRow
									rowMinimums.set(elementRowIndex, Math.max(currentMin, minHeight))
								}
							})
						}
					}
				})
			}

			// Calculate preserve area row height (preserve area)
			let preserveAreaHeight = data.baseArea / currentWidth

			if (config.minHeight) {
				const minHeightPx = parseFloat(config.minHeight)
				if (!isNaN(minHeightPx)) {
					preserveAreaHeight = Math.max(preserveAreaHeight, minHeightPx)
				}
			}

			if (config.maxHeight) {
				const maxHeightPx = parseFloat(config.maxHeight)
				if (!isNaN(maxHeightPx)) {
					preserveAreaHeight = Math.min(preserveAreaHeight, maxHeightPx)
				}
			}

			preserveAreaHeight = Math.max(preserveAreaHeight, defaultMinPreserveArea)

			// Calculate total gap space
			const totalGapSpace = gap * (totalRows - 1)

			// Calculate total minimum space needed for other rows
			let totalMinSpace = 0
			rowsData.forEach(row => {
				if (!row.isPreserveArea) {
					const min = rowMinimums.get(row.index) || defaultMinRow
					totalMinSpace += min
				}
			})

			// Ensure preserve area doesn't exceed container bounds
			const maxPreserveAreaHeight = containerHeight - totalMinSpace - totalGapSpace
			if (preserveAreaHeight > maxPreserveAreaHeight) {
				preserveAreaHeight = Math.max(maxPreserveAreaHeight, defaultMinPreserveArea)
			}

			// Calculate available space for other rows (they will shrink)
			const availableSpace = containerHeight - preserveAreaHeight - totalGapSpace

			// Calculate current total height of other rows
			let totalOtherRowsHeight = 0
			rowsData.forEach(row => {
				if (!row.isPreserveArea) {
					totalOtherRowsHeight += row.currentHeight
				}
			})

			// Build new grid-template-rows string
			const newRowValues: string[] = []

			rowsData.forEach(row => {
				if (row.isPreserveArea) {
					// Set preserve area height
					container.style.setProperty(`--grid-row-${row.index}-height`, `${preserveAreaHeight}px`)
					newRowValues.push(`var(--grid-row-${row.index}-height, ${preserveAreaHeight}px)`)
				} else {
					// Calculate height for other rows - shrink proportionally
					let newHeight: number

					if (totalOtherRowsHeight > 0) {
						// Shrink proportionally to available space
						const ratio = availableSpace / totalOtherRowsHeight
						newHeight = row.currentHeight * ratio
					} else {
						// Fallback: distribute evenly
						const otherRowsCount = totalRows - 1
						newHeight = availableSpace / otherRowsCount
					}

					// Apply minimum constraint
					const min = rowMinimums.get(row.index) || defaultMinRow
					newHeight = Math.max(newHeight, min)

					// Set CSS variable
					container.style.setProperty(`--grid-row-${row.index}-height`, `${newHeight}px`)
					newRowValues.push(`var(--grid-row-${row.index}-height, ${newHeight}px)`)
				}
			})

			// Update grid-template-rows
			container.style.gridTemplateRows = newRowValues.join(' ')
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
				// Reduce base height by 150px for lower initial height
				const baseHeight = Math.max(
					(config.baseHeight || rect.height) - 150,
					150
				)
				const baseArea = baseWidth * baseHeight
				const rowIndex = getRowIndex(element)

				elementsData.set(element, {
					element,
					baseWidth,
					baseHeight,
					baseArea,
					rowIndex
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
