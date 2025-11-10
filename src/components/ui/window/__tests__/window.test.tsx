import { render, screen } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Window } from '../ui/window'

// Mock ResizeObserver for Grid component
global.ResizeObserver = class ResizeObserver {
	observe = vi.fn()
	unobserve = vi.fn()
	disconnect = vi.fn()
	constructor(_callback: (entries: ResizeObserverEntry[]) => void) {
		;(this as any)._callback = _callback
	}
} as any

describe('Window', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1920
		})
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders with default props', () => {
		render(() => <Window>Test content</Window>)
		const content = screen.getByText('Test content')
		expect(content).toBeInTheDocument()
	})

	it('renders children in main content area', () => {
		render(() => (
			<Window>
				<div>Main Content</div>
			</Window>
		))
		const mainContent = screen.getByText('Main Content')
		expect(mainContent).toBeInTheDocument()
		const main = mainContent.closest('main')
		expect(main).toBeInTheDocument()
	})

	it('renders titleBar when provided', () => {
		render(() => <Window titleBar={<div>Title Bar</div>}>Content</Window>)
		const titleBar = screen.getByText('Title Bar')
		expect(titleBar).toBeInTheDocument()
	})

	it('does not render titleBar when not provided', () => {
		render(() => <Window>Content</Window>)
		expect(screen.queryByText('Title Bar')).not.toBeInTheDocument()
	})

	it('renders sidebar when provided', () => {
		render(() => <Window sidebar={<div>Sidebar</div>}>Content</Window>)
		const sidebar = screen.getByText('Sidebar')
		expect(sidebar).toBeInTheDocument()
		const aside = sidebar.closest('aside')
		expect(aside).toBeInTheDocument()
	})

	it('does not render sidebar when not provided', () => {
		render(() => <Window>Content</Window>)
		expect(screen.queryByText('Sidebar')).not.toBeInTheDocument()
	})

	it('renders both titleBar and sidebar together', () => {
		render(() => (
			<Window titleBar={<div>Title Bar</div>} sidebar={<div>Sidebar</div>}>
				Content
			</Window>
		))
		expect(screen.getByText('Title Bar')).toBeInTheDocument()
		expect(screen.getByText('Sidebar')).toBeInTheDocument()
		expect(screen.getByText('Content')).toBeInTheDocument()
	})

	it('applies custom class names', () => {
		const { container } = render(() => (
			<Window class='custom-window'>Content</Window>
		))
		const windowElement = container.querySelector('.window')
		expect(windowElement).toHaveClass('window', 'custom-window')
	})

	it('applies custom inline styles', () => {
		const { container } = render(() => (
			<Window style={{ 'background-color': 'red' }}>Content</Window>
		))
		const windowElement = container.querySelector('.window') as HTMLElement
		expect(windowElement?.style.backgroundColor).toBe('red')
	})

	it('has correct grid structure with rows 32px 1fr', () => {
		const { container } = render(() => <Window>Content</Window>)
		const windowElement = container.querySelector('.window') as HTMLElement
		expect(windowElement?.style.gridTemplateRows).toBe('32px 1fr')
	})

	it('has correct grid structure with columns 1fr', () => {
		const { container } = render(() => <Window>Content</Window>)
		const windowElement = container.querySelector('.window') as HTMLElement
		expect(windowElement?.style.gridTemplateColumns).toBe('1fr')
	})

	it('has full width and height styles', () => {
		const { container } = render(() => <Window>Content</Window>)
		const windowElement = container.querySelector('.window') as HTMLElement
		expect(windowElement?.style.width).toBe('100%')
		expect(windowElement?.style.height).toBe('100vh')
	})

	it('has overflow hidden', () => {
		const { container } = render(() => <Window>Content</Window>)
		const windowElement = container.querySelector('.window') as HTMLElement
		expect(windowElement?.style.overflow).toBe('hidden')
	})

	it('adjusts grid columns when sidebar is present', () => {
		const { container } = render(() => (
			<Window sidebar={<div>Sidebar</div>}>Content</Window>
		))
		// Find the inner Grid (content area)
		const grids = container.querySelectorAll('.grid')
		expect(grids.length).toBeGreaterThan(0)
		// The inner grid should have columns for sidebar
		const innerGrid = Array.from(grids).find(
			grid => grid !== container.querySelector('.window')
		) as HTMLElement
		if (innerGrid) {
			expect(innerGrid.style.gridTemplateColumns).toContain('minmax(0, auto)')
		}
	})

	it('uses single column when sidebar is not present', () => {
		const { container } = render(() => <Window>Content</Window>)
		// Find the inner Grid (content area)
		const grids = container.querySelectorAll('.grid')
		const innerGrid = Array.from(grids).find(
			grid => grid !== container.querySelector('.window')
		) as HTMLElement
		if (innerGrid) {
			expect(innerGrid.style.gridTemplateColumns).toBe('1fr')
		}
	})

	it('renders multiple children correctly', () => {
		render(() => (
			<Window>
				<div>Child 1</div>
				<div>Child 2</div>
				<div>Child 3</div>
			</Window>
		))
		expect(screen.getByText('Child 1')).toBeInTheDocument()
		expect(screen.getByText('Child 2')).toBeInTheDocument()
		expect(screen.getByText('Child 3')).toBeInTheDocument()
	})
})
