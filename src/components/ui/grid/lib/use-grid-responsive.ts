/**
 * Grid Responsive Hook
 * Handles responsive breakpoints and resize observation
 */

import { createSignal, onCleanup, onMount, type Accessor } from 'solid-js'
import type { GridBreakpoint, GridProps, PreserveAreaConfig } from '../model/types'

export interface GridResponsiveState {
	columns: Accessor<string>
	rows: Accessor<string | undefined>
	gap: Accessor<string>
	preserveArea: Accessor<PreserveAreaConfig | undefined>
	setupResizeObserver: (element: HTMLElement) => void
}

/**
 * Calculate gap CSS value from gap prop
 */
const calculateGap = (
	gap?: string | { row?: string; column?: string }
): string => {
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
	// If autoFit is true, always use auto-fit with minmax (ignore columns count)
	if (autoFit) {
		const minWidth = minColumnWidth || '150px'
		const maxWidth = maxColumnWidth || '1fr'
		return `repeat(auto-fit, minmax(${minWidth}, ${maxWidth}))`
	}

	if (!columns) return 'none'

	// If it's a number, use repeat with auto-fill or fixed count
	if (typeof columns === 'number') {
		const minWidth = minColumnWidth || '1fr'
		const maxWidth = maxColumnWidth || '1fr'

		// If minColumnWidth/maxColumnWidth are provided, use auto-fill
		if (minColumnWidth || maxColumnWidth) {
			return `repeat(auto-fill, minmax(${minWidth}, ${maxWidth}))`
		}

		// Otherwise, use fixed repeat count
		return `repeat(${columns}, 1fr)`
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
	const [containerWidth, setContainerWidth] = createSignal<number | null>(null)
	const [currentBreakpoint, setCurrentBreakpoint] = createSignal<
		GridBreakpoint | undefined
	>()

	// Calculate initial breakpoint
	const calculateBreakpoint = () => {
		if (props.breakpoints && props.breakpoints.length > 0) {
			const width = containerWidth() ?? window.innerWidth
			const bp = findBreakpoint(props.breakpoints, width)
			setCurrentBreakpoint(bp)
		}
	}

	// Handle window resize (fallback)
	const handleResize = () => {
		if (!containerWidth()) {
			calculateBreakpoint()
		}
	}

	// Handle ResizeObserver (primary method - works with zoom)
	let resizeObserver: ResizeObserver | null = null
	let containerElement: HTMLElement | null = null

	const setupResizeObserver = (element: HTMLElement) => {
		// Always use ResizeObserver for accurate container width (works with zoom)
		containerElement = element

		// Set initial width
		const initialWidth = element.getBoundingClientRect().width
		setContainerWidth(initialWidth)
		calculateBreakpoint()

		resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				// Use getBoundingClientRect for accurate width including zoom
				const width = entry.target.getBoundingClientRect().width
				setContainerWidth(width)
				calculateBreakpoint()
			}
		})

		resizeObserver.observe(element)
	}

	onMount(() => {
		// Initial calculation with window width if container not yet observed
		if (!containerWidth()) {
			calculateBreakpoint()
		}
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

	// Calculate final preserveArea value
	const preserveArea = (): PreserveAreaConfig | undefined => {
		const bp = currentBreakpoint()
		return bp?.preserveArea ?? props.preserveArea
	}

	return {
		columns,
		rows,
		gap,
		preserveArea,
		setupResizeObserver: (element: HTMLElement) => {
			setupResizeObserver(element)
		}
	}
}
