/**
 * Drag Drop Component
 * Drag and drop functionality for reorderable lists
 */

import {
	Component,
	For,
	Show,
	createSignal,
	onCleanup,
	onMount
} from 'solid-js'
import { dragDropStyles } from '../lib/drag-drop.styles'
import type { DragDropItem, DragDropProps } from '../model/types'

export const DragDrop: Component<DragDropProps> = props => {
	const isDark = () => props.isDark ?? true
	const orientation = () => props.orientation ?? 'vertical'
	const gap = () => props.gap ?? '8px'
	const disabled = () => props.disabled ?? false

	const [draggedItem, setDraggedItem] = createSignal<{
		item: DragDropItem
		index: number
	} | null>(null)
	const [draggedOverIndex, setDraggedOverIndex] = createSignal<number | null>(
		null
	)
	const [items, setItems] = createSignal<DragDropItem[]>(props.items)

	// Update items when props.items changes
	onMount(() => {
		setItems(props.items)
	})

	// Sync items with props
	const syncItems = () => {
		if (props.items !== items()) {
			setItems(props.items)
		}
	}
	syncItems()

	const handleDragStart = (e: DragEvent, item: DragDropItem, index: number) => {
		if (disabled() || item.disabled) {
			e.preventDefault()
			return
		}

		setDraggedItem({ item, index })
		props.onDragStart?.(item, index)

		// Set drag data
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.setData('text/plain', String(item.id))
		}

		// Add dragging class to body for global styles
		document.body.classList.add('drag-drop-active')
	}

	const handleDragOver = (e: DragEvent, index: number) => {
		if (disabled() || !draggedItem()) {
			return
		}

		e.preventDefault()
		e.stopPropagation()

		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move'
		}

		const currentItem = items()[index]
		if (currentItem?.disabled) {
			return
		}

		setDraggedOverIndex(index)
		props.onDragOver?.(items()[index], index)
	}

	const handleDragLeave = () => {
		setDraggedOverIndex(null)
	}

	const handleDrop = (e: DragEvent, index: number) => {
		if (disabled() || !draggedItem()) {
			return
		}

		e.preventDefault()
		e.stopPropagation()

		const dragged = draggedItem()
		if (!dragged) return

		const currentItem = items()[index]
		if (currentItem?.disabled) {
			return
		}

		// Don't do anything if dropped on itself
		if (dragged.index === index) {
			setDraggedItem(null)
			setDraggedOverIndex(null)
			document.body.classList.remove('drag-drop-active')
			return
		}

		// Reorder items
		const newItems = [...items()]
		const [removed] = newItems.splice(dragged.index, 1)
		newItems.splice(index, 0, removed)

		setItems(newItems)
		props.onDrop?.(dragged.item, dragged.index, index)

		setDraggedItem(null)
		setDraggedOverIndex(null)
		document.body.classList.remove('drag-drop-active')
	}

	const handleDragEnd = () => {
		const dragged = draggedItem()
		if (dragged) {
			props.onDragEnd?.(dragged.item, dragged.index)
		}

		setDraggedItem(null)
		setDraggedOverIndex(null)
		document.body.classList.remove('drag-drop-active')
	}

	// Cleanup on unmount
	onCleanup(() => {
		document.body.classList.remove('drag-drop-active')
	})

	const isItemDragging = (index: number) => {
		return draggedItem()?.index === index
	}

	const isItemOver = (index: number) => {
		return draggedOverIndex() === index && draggedItem()?.index !== index
	}

	const renderItemContent = (item: DragDropItem, index: number) => {
		if (props.renderItem) {
			return props.renderItem(item, index, isItemDragging(index))
		}
		return item.content
	}

	return (
		<div
			class={`drag-drop-container ${props.class || ''}`}
			style={{
				...dragDropStyles.container(orientation()),
				gap: gap(),
				...(props.style as Record<string, unknown>)
			}}
		>
			<For each={items()}>
				{(item, index) => (
					<div
						draggable={!disabled() && !item.disabled}
						onDragStart={e => handleDragStart(e, item, index())}
						onDragOver={e => handleDragOver(e, index())}
						onDragLeave={handleDragLeave}
						onDrop={e => handleDrop(e, index())}
						onDragEnd={handleDragEnd}
						class={`drag-drop-item ${item.disabled ? 'disabled' : ''}`}
						style={dragDropStyles.item(
							isDark(),
							isItemDragging(index()),
							isItemOver(index()),
							item.disabled ?? false,
							index() === items().length - 1 ? '0' : gap()
						)}
					>
						<Show when={!disabled() && !item.disabled}>
							<div style={dragDropStyles.dragHandle(isDark())}>
								<span
									class='material-symbols-rounded'
									style={{
										'font-size': '16px',
										'pointer-events': 'none'
									}}
								>
									{props.dragHandleIcon ?? 'drag_handle'}
								</span>
							</div>
						</Show>
						<Show when={isItemOver(index())}>
							<div
								style={dragDropStyles.dropIndicator(
									isDark(),
									orientation()
								)}
							/>
						</Show>
						<div style={dragDropStyles.itemContent()}>
							{renderItemContent(item, index())}
						</div>
					</div>
				)}
			</For>
		</div>
	)
}
