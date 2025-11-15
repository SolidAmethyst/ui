/**
 * SplitPane Component
 * Split pane component for resizable panels
 */

import {
	Component,
	Show,
	createSignal,
	createEffect
} from 'solid-js'
import { splitPaneStyles } from '../lib/split-pane.styles'
import type { SplitPaneProps } from '../model/types'

export const SplitPane: Component<SplitPaneProps> = props => {
	const isDark = () => props.isDark ?? true
	const direction = () => props.direction ?? 'horizontal'
	const showHandle = () => props.showHandle ?? true
	const minFirst = () => props.minFirst ?? 10
	const maxFirst = () => props.maxFirst ?? 90

	const [localSplit, setLocalSplit] = createSignal(
		props.split ?? props.defaultSplit ?? 50
	)
	const [isDragging, setIsDragging] = createSignal(false)
	let containerRef: HTMLDivElement | undefined
	let handleRef: HTMLDivElement | undefined

	// Sync with controlled split prop
	createEffect(() => {
		if (props.split !== undefined) {
			setLocalSplit(props.split)
		}
	})

	const getSplit = () => props.split ?? localSplit()

	const handleMouseDown = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)

		const container = containerRef
		if (!container) return

		const containerRect = container.getBoundingClientRect()
		const containerStart =
			direction() === 'horizontal' ? containerRect.left : containerRect.top
		const containerSize =
			direction() === 'horizontal'
				? containerRect.width
				: containerRect.height

		const handleMouseMove = (moveEvent: MouseEvent) => {
			moveEvent.preventDefault()
			moveEvent.stopPropagation()

			const currentPos =
				direction() === 'horizontal' ? moveEvent.clientX : moveEvent.clientY
			const relativePos = currentPos - containerStart
			const newSplitPercent = (relativePos / containerSize) * 100

			const newSplit = Math.max(
				minFirst(),
				Math.min(maxFirst(), newSplitPercent)
			)

			setLocalSplit(newSplit)
			props.onSplitChange?.(newSplit)
		}

		const handleMouseUp = () => {
			setIsDragging(false)
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
			document.body.style.cursor = ''
			document.body.style.userSelect = ''
		}

		// Prevent text selection and set cursor
		document.body.style.cursor =
			direction() === 'horizontal' ? 'col-resize' : 'row-resize'
		document.body.style.userSelect = 'none'

		document.addEventListener('mousemove', handleMouseMove, { passive: false })
		document.addEventListener('mouseup', handleMouseUp)
	}

	const firstSize = () => getSplit()
	const secondSize = () => 100 - getSplit()

	return (
		<div
			ref={containerRef}
			class={`split-pane split-pane-${direction()} ${props.class || ''}`}
			style={{
				...splitPaneStyles.container(direction(), isDark()),
				...props.style
			}}
		>
			<div
				style={splitPaneStyles.panel(direction(), firstSize(), isDark())}
			>
				{props.first}
			</div>
			<Show when={showHandle()}>
				<div
					ref={handleRef}
					onMouseDown={handleMouseDown}
					style={{
						...splitPaneStyles.handle(direction(), isDark(), isDragging()),
						...(isDragging()
							? splitPaneStyles.handleDragging(direction(), isDark())
							: {})
					}}
					onMouseEnter={e => {
						if (!isDragging()) {
							const hoverStyles = splitPaneStyles.handleHover(direction(), isDark())
							e.currentTarget.style.background = hoverStyles.background as string
						}
					}}
					onMouseLeave={e => {
						if (!isDragging()) {
							e.currentTarget.style.background = ''
						}
					}}
				/>
			</Show>
			<div
				style={splitPaneStyles.panel(direction(), secondSize(), isDark())}
			>
				{props.second}
			</div>
		</div>
	)
}
