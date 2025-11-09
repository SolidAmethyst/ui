/**
 * Grid Component
 * Full-featured responsive CSS Grid container component
 */

import type { JSX } from 'solid-js'
import { Component, onMount } from 'solid-js'
import { useGridResponsive } from '../lib/use-grid-responsive'
import type { GridProps } from '../model/types'

export const Grid: Component<GridProps> = props => {
	const responsive = useGridResponsive(props)

	let containerRef: HTMLDivElement | undefined

	onMount(() => {
		if (containerRef && responsive.setupResizeObserver) {
			responsive.setupResizeObserver(containerRef)
		}
	})

	const gridStyle = (): JSX.CSSProperties => {
		const baseStyle: JSX.CSSProperties = {
			display: 'grid',
			'box-sizing': 'border-box'
		}

		const columnsValue = responsive.columns()
		if (columnsValue && columnsValue !== 'none') {
			baseStyle['grid-template-columns'] = columnsValue
		}

		const rowsValue = responsive.rows()
		if (rowsValue) {
			baseStyle['grid-template-rows'] = rowsValue
		}

		const gapValue = responsive.gap()
		if (gapValue && gapValue !== '0') {
			baseStyle.gap = gapValue
		}

		return {
			...baseStyle,
			...(props.style as JSX.CSSProperties)
		}
	}

	return (
		<div
			ref={containerRef}
			class={`grid ${props.class || ''}`}
			style={gridStyle()}
		>
			{props.children}
		</div>
	)
}
