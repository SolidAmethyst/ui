/**
 * Grid Responsive Hook
 * Handles responsive breakpoints and resize observation
 */

import { createSignal, onMount, onCleanup, type Accessor } from 'solid-js'
import type { GridBreakpoint, GridProps } from '../model/types'

export interface GridResponsiveState {
	columns: Accessor<string>
	rows: Accessor<string | undefined>
	gap: Accessor<string>
	setupResizeObserver: (element: HTMLElement) => void
}

/**
 * Calculate gap CSS value from gap prop
 */
const calculateGap = (gap?: string | { row?: string; column?: string }): string => {
	if (!gap) return '0'
	if (typeof gap === 'string') return gap
	const row = gap.row || '0'
	const column = gap.column || '0'
	return `${row} ${column}`
}

/**
 * Calculate columns CSS value from columns prop
 */
const calculateColumns = (
	columns?: number | string,
	minColumnWidth?: string,
	maxColumnWidth?: string,
	autoFit?: boolean
): string => {
	if (!columns) return 'none'

	// If it's a number, use repeat with auto-fit/auto-fill
	if (typeof columns === 'number') {
		const minWidth = minColumnWidth || '1fr'
		const maxWidth = maxColumnWidth || '1fr'
		const fitType = autoFit ? 'auto-fit' : 'auto-fill'
		return `repeat(${fitType}, minmax(${minWidth}, ${maxWidth}))`
	}

	// If it's already a CSS value, return as-is
	return columns
}

/**
 * Find matching breakpoint for current viewport width
 */
const findBreakpoint = (
	breakpoints: GridBreakpoint[],
	width: number
): GridBreakpoint | undefined => {
	return breakpoints.find(bp => {
		const minMatch = !bp.minWidth || width >= bp.minWidth
		const maxMatch = !bp.maxWidth || width <= bp.maxWidth
		return minMatch && maxMatch
	})
}

/**
 * Hook for responsive grid behavior
 */
export const useGridResponsive = (props: GridProps): GridResponsiveState => {
	const [viewportWidth, setViewportWidth] = createSignal(window.innerWidth)
	const [currentBreakpoint, setCurrentBreakpoint] = createSignal<GridBreakpoint | undefined>()

	// Calculate initial breakpoint
	const calculateBreakpoint = () => {
		if (props.breakpoints && props.breakpoints.length > 0) {
			const width = viewportWidth()
			const bp = findBreakpoint(props.breakpoints, width)
			setCurrentBreakpoint(bp)
		}
	}

	// Handle window resize
	const handleResize = () => {
		setViewportWidth(window.innerWidth)
		calculateBreakpoint()
	}

	// Handle ResizeObserver (if enabled)
	let resizeObserver: ResizeObserver | null = null
	let containerElement: HTMLElement | null = null

	const setupResizeObserver = (element: HTMLElement) => {
		if (!props.observeResize) return

		containerElement = element
		resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				const width = entry.contentRect.width
				setViewportWidth(width)
				calculateBreakpoint()
			}
		})

		resizeObserver.observe(element)
	}

	onMount(() => {
		calculateBreakpoint()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (resizeObserver && containerElement) {
				resizeObserver.unobserve(containerElement)
				resizeObserver.disconnect()
			}
		}
	})

	onCleanup(() => {
		window.removeEventListener('resize', handleResize)
		if (resizeObserver && containerElement) {
			resizeObserver.unobserve(containerElement)
			resizeObserver.disconnect()
		}
	})

	// Calculate final columns value
	const columns = (): string => {
		const bp = currentBreakpoint()
		const bpColumns = bp?.columns ?? props.columns
		const bpMinWidth = bp?.minColumnWidth ?? props.minColumnWidth
		const bpMaxWidth = bp?.maxColumnWidth ?? props.maxColumnWidth
		const bpAutoFit = bp?.autoFit ?? props.autoFit

		return calculateColumns(bpColumns, bpMinWidth, bpMaxWidth, bpAutoFit)
	}

	// Calculate final rows value
	const rows = (): string | undefined => {
		const bp = currentBreakpoint()
		return bp?.rows ?? props.rows
	}

	// Calculate final gap value
	const gap = (): string => {
		const bp = currentBreakpoint()
		const bpGap = bp?.gap ?? props.gap
		return calculateGap(bpGap)
	}

	return {
		columns,
		rows,
		gap,
		setupResizeObserver: (element: HTMLElement) => {
			setupResizeObserver(element)
		}
	}
}
