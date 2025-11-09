import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import type { SidebarItem } from '../model/types'
import { Sidebar } from '../ui/sidebar'

describe('Sidebar', () => {
	const mockItems: SidebarItem[] = [
		{ label: 'Home', icon: 'home', onClick: vi.fn() },
		{ label: 'Dashboard', icon: 'dashboard', onClick: vi.fn() },
		{ separator: true },
		{ label: 'Settings', icon: 'settings', onClick: vi.fn() }
	]

	it('does not render content when open is false', () => {
		render(() => <Sidebar open={false} items={mockItems} isDark={false} />)
		expect(screen.queryByText('Home')).not.toBeInTheDocument()
	})

	it('renders when open is true', () => {
		render(() => <Sidebar open={true} items={mockItems} isDark={false} />)
		expect(screen.getByText('Home')).toBeInTheDocument()
		expect(screen.getByText('Dashboard')).toBeInTheDocument()
		expect(screen.getByText('Settings')).toBeInTheDocument()
	})

	it('renders sidebar items with icons', () => {
		render(() => <Sidebar open={true} items={mockItems} isDark={false} />)
		const homeButton = screen.getByText('Home').closest('button')
		expect(homeButton).toBeInTheDocument()
	})

	it('renders separators', () => {
		render(() => <Sidebar open={true} items={mockItems} isDark={false} />)
		const listItems = screen.getByRole('list').querySelectorAll('li')
		// Should have 4 items: Home, Dashboard, separator, Settings
		expect(listItems.length).toBeGreaterThanOrEqual(3)
	})

	it('calls onClick when item is clicked', () => {
		const onClick = vi.fn()
		const items: SidebarItem[] = [{ label: 'Test', onClick }]
		render(() => <Sidebar open={true} items={items} isDark={false} />)

		const button = screen.getByText('Test')
		button.click()

		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it('calls onItemClick callback when provided', () => {
		const onItemClick = vi.fn()
		const items: SidebarItem[] = [{ label: 'Test', onClick: vi.fn() }]
		render(() => (
			<Sidebar
				open={true}
				items={items}
				isDark={false}
				onItemClick={onItemClick}
			/>
		))

		const button = screen.getByText('Test')
		button.click()

		expect(onItemClick).toHaveBeenCalledTimes(1)
	})

	it('handles disabled items', () => {
		const items: SidebarItem[] = [{ label: 'Disabled', disabled: true }]
		render(() => <Sidebar open={true} items={items} isDark={false} />)

		const button = screen.getByText('Disabled').closest('button')
		expect(button).toBeDisabled()
	})

	it('applies overlay mode styles', () => {
		const { container } = render(() => (
			<Sidebar
				open={true}
				items={mockItems}
				isDark={false}
				overlayMode={true}
			/>
		))

		const sidebar = container.querySelector('aside')
		expect(sidebar).toHaveStyle({ position: 'absolute' })
	})

	it('applies shift mode styles when overlayMode is false', () => {
		const { container } = render(() => (
			<Sidebar
				open={true}
				items={mockItems}
				isDark={false}
				overlayMode={false}
			/>
		))

		const sidebar = container.querySelector('aside')
		expect(sidebar).toHaveStyle({ position: 'relative' })
	})
})
