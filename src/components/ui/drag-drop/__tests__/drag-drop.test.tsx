import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import type { DragDropItem } from '../model/types'
import { DragDrop } from '../ui/drag-drop'

describe('DragDrop', () => {
	it('renders items correctly', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} />
		})
		expect(screen.getByText('Item 1')).toBeInTheDocument()
		expect(screen.getByText('Item 2')).toBeInTheDocument()
		expect(screen.getByText('Item 3')).toBeInTheDocument()
	})

	it('applies default orientation vertical', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} />
		})
		const container = screen.getByText('Item 1').closest('.drag-drop-container')
		expect(container).toHaveStyle({ 'flex-direction': 'column' })
	})

	it('applies horizontal orientation when specified', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} orientation='horizontal' />
		})
		const container = screen.getByText('Item 1').closest('.drag-drop-container')
		expect(container).toHaveStyle({ 'flex-direction': 'row' })
	})

	it('calls onDragStart when item is dragged', () => {
		const onDragStart = vi.fn()
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} onDragStart={onDragStart} />
		})
		const item = screen.getByText('Item 1').closest('.drag-drop-item')

		if (item) {
			fireEvent.dragStart(item)
			expect(onDragStart).toHaveBeenCalled()
		}
	})

	it('calls onDrop when item is dropped', () => {
		const onDrop = vi.fn()
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} onDrop={onDrop} />
		})
		const item1 = screen.getByText('Item 1').closest('.drag-drop-item')
		const item2 = screen.getByText('Item 2').closest('.drag-drop-item')

		if (item1 && item2) {
			fireEvent.dragStart(item1)
			fireEvent.dragOver(item2)
			fireEvent.drop(item2)
			expect(onDrop).toHaveBeenCalled()
		}
	})

	it('disables drag when disabled prop is true', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} disabled />
		})
		const item = screen.getByText('Item 1').closest('.drag-drop-item')
		expect(item).toHaveAttribute('draggable', 'false')
	})

	it('disables drag for disabled items', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div>, disabled: true },
				{ id: '2', content: <div>Item 2</div> }
			]
			return <DragDrop items={items} />
		})
		const item = screen.getByText('Item 1').closest('.drag-drop-item')
		expect(item).toHaveAttribute('draggable', 'false')
		expect(item).toHaveClass('disabled')
	})

	it('applies custom class names', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} class='custom-class' />
		})
		const container = screen.getByText('Item 1').closest('.drag-drop-container')
		expect(container).toHaveClass('custom-class')
	})

	it('applies custom gap', () => {
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} gap='16px' />
		})
		const container = screen.getByText('Item 1').closest('.drag-drop-container')
		expect(container).toHaveStyle({ gap: '16px' })
	})

	it('calls onDragEnd when drag ends', () => {
		const onDragEnd = vi.fn()
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} onDragEnd={onDragEnd} />
		})
		const item = screen.getByText('Item 1').closest('.drag-drop-item')

		if (item) {
			fireEvent.dragStart(item)
			fireEvent.dragEnd(item)
			expect(onDragEnd).toHaveBeenCalled()
		}
	})

	it('uses custom renderItem when provided', () => {
		const renderItem = vi.fn((item, index) => <div>Custom: {item.id}</div>)
		render(() => {
			const items: DragDropItem[] = [
				{ id: '1', content: <div>Item 1</div> },
				{ id: '2', content: <div>Item 2</div> },
				{ id: '3', content: <div>Item 3</div> }
			]
			return <DragDrop items={items} renderItem={renderItem} />
		})
		expect(renderItem).toHaveBeenCalled()
		expect(screen.getByText('Custom: 1')).toBeInTheDocument()
	})
})
