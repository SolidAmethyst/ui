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
		setIsDragging(true)

		const startPos = direction() === 'horizontal' ? e.clientX : e.clientY
		const container = containerRef
		if (!container) return

		const containerSize =
			direction() === 'horizontal'
				? container.offsetWidth
				: container.offsetHeight

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const currentPos =
				direction() === 'horizontal' ? moveEvent.clientX : moveEvent.clientY
			const delta = currentPos - startPos
			const deltaPercent = (delta / containerSize) * 100
			const newSplit = Math.max(
				minFirst(),
				Math.min(maxFirst(), getSplit() + deltaPercent)
			)

			setLocalSplit(newSplit)
			props.onSplitChange?.(newSplit)
		}

		const handleMouseUp = () => {
			setIsDragging(false)
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
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
							Object.assign(
								e.currentTarget.style,
								splitPaneStyles.handleHover(direction(), isDark())
							)
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

