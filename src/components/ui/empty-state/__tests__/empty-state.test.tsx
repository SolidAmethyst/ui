import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import { EmptyState } from '../ui/empty-state'
import { Button } from '../../button'

describe('EmptyState', () => {
	it('renders with icon, title and description', () => {
		render(() => (
			<EmptyState
				icon="inbox"
				title="No items"
				description="There are no items to display"
				isDark={false}
			/>
		))
		expect(screen.getByText('inbox')).toBeInTheDocument()
		expect(screen.getByText('No items')).toBeInTheDocument()
		expect(screen.getByText('There are no items to display')).toBeInTheDocument()
	})

	it('renders with only icon', () => {
		render(() => <EmptyState icon="folder" isDark={false} />)
		expect(screen.getByText('folder')).toBeInTheDocument()
	})

	it('renders with only title', () => {
		render(() => <EmptyState title="Empty" isDark={false} />)
		expect(screen.getByText('Empty')).toBeInTheDocument()
	})

	it('renders with action', () => {
		render(() => (
			<EmptyState
				title="No items"
				action={<Button>Add Item</Button>}
				isDark={false}
			/>
		))
		expect(screen.getByText('Add Item')).toBeInTheDocument()
	})

	it('renders custom children', () => {
		render(() => (
			<EmptyState isDark={false}>
				<div data-testid="custom-content">Custom content</div>
			</EmptyState>
		))
		expect(screen.getByTestId('custom-content')).toBeInTheDocument()
	})

	it('applies custom class name', () => {
		render(() => (
			<EmptyState class="custom-empty" title="Empty" isDark={false} />
		))
		const container = screen.getByText('Empty').closest('.empty-state')
		expect(container).toHaveClass('custom-empty')
	})
})

