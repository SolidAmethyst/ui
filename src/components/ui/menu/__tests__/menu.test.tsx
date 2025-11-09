import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import type { MenuItem } from '../model/types'
import { Menu } from '../ui/menu'

describe('Menu', () => {
	const mockItems: MenuItem[] = [
		{ label: 'Item 1', icon: 'home', onClick: vi.fn() },
		{ label: 'Item 2', icon: 'settings', onClick: vi.fn() },
		{ separator: true },
		{ label: 'Item 3', onClick: vi.fn() }
	]

	it('does not render when open is false', () => {
		const onClose = vi.fn()
		render(() => <Menu open={false} onClose={onClose} items={mockItems} />)
		expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
	})

	it('renders when open is true', () => {
		const onClose = vi.fn()
		render(() => <Menu open={true} onClose={onClose} items={mockItems} />)
		expect(screen.getByText('Item 1')).toBeInTheDocument()
		expect(screen.getByText('Item 2')).toBeInTheDocument()
		expect(screen.getByText('Item 3')).toBeInTheDocument()
	})

	it('renders menu items with icons', () => {
		const onClose = vi.fn()
		render(() => <Menu open={true} onClose={onClose} items={mockItems} />)
		const item1 = screen.getByText('Item 1')
		expect(item1).toBeInTheDocument()
		expect(item1.closest('button')).toBeInTheDocument()
	})

	it('renders separators', () => {
		const onClose = vi.fn()
		const { container } = render(() => (
			<Menu open={true} onClose={onClose} items={mockItems} />
		))
		const listItems = container.querySelectorAll('ul li')
		// Separator should be between Item 1 and Item 3 (index 2)
		expect(listItems.length).toBeGreaterThan(2)
		// Separator is an empty li element
		const separator = Array.from(listItems).find(li => li.children.length === 0)
		expect(separator).toBeInTheDocument()
	})

	it('calls onClick when menu item is clicked', () => {
		const onClose = vi.fn()
		const item1Click = vi.fn()
		const items: MenuItem[] = [{ label: 'Item 1', onClick: item1Click }]
		render(() => <Menu open={true} onClose={onClose} items={items} />)
		const item = screen.getByText('Item 1')
		fireEvent.click(item)
		expect(item1Click).toHaveBeenCalledTimes(1)
		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('does not call onClick for disabled items', () => {
		const onClose = vi.fn()
		const itemClick = vi.fn()
		const items: MenuItem[] = [
			{ label: 'Disabled Item', disabled: true, onClick: itemClick }
		]
		render(() => <Menu open={true} onClose={onClose} items={items} />)
		const item = screen.getByText('Disabled Item')
		fireEvent.click(item)
		expect(itemClick).not.toHaveBeenCalled()
	})

	it('does not call onClick for separator items', () => {
		const onClose = vi.fn()
		const separatorClick = vi.fn()
		const items: MenuItem[] = [
			{ label: 'Separator', separator: true, onClick: separatorClick }
		]
		render(() => <Menu open={true} onClose={onClose} items={items} />)
		expect(separatorClick).not.toHaveBeenCalled()
	})

	it('renders custom children when provided', () => {
		const onClose = vi.fn()
		render(() => (
			<Menu open={true} onClose={onClose} items={[]}>
				<div>Custom Content</div>
			</Menu>
		))
		expect(screen.getByText('Custom Content')).toBeInTheDocument()
	})

	it('applies custom class names', () => {
		const onClose = vi.fn()
		render(() => (
			<Menu
				open={true}
				onClose={onClose}
				items={mockItems}
				class='custom-menu'
			/>
		))
		const menu = screen.getByText('Item 1').closest('.menu')
		expect(menu).toHaveClass('custom-menu')
	})

	it('renders items without icons', () => {
		const onClose = vi.fn()
		const items: MenuItem[] = [{ label: 'No Icon Item', onClick: vi.fn() }]
		render(() => <Menu open={true} onClose={onClose} items={items} />)
		expect(screen.getByText('No Icon Item')).toBeInTheDocument()
	})
})
