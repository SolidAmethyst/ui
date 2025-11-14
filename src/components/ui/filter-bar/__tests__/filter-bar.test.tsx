import { render, screen, fireEvent } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { FilterBar } from '../ui/filter-bar'
import type { FilterItem } from '../model/types'

describe('FilterBar', () => {
	const mockFilters: FilterItem[] = [
		{
			id: 'status',
			label: 'Status',
			type: 'select',
			options: [
				{ label: 'Active', value: 'active' },
				{ label: 'Inactive', value: 'inactive' }
			]
		},
		{
			id: 'tags',
			label: 'Tags',
			type: 'checkbox',
			options: [
				{ label: 'Tag 1', value: 'tag1' },
				{ label: 'Tag 2', value: 'tag2' }
			]
		}
	]

	it('renders filter bar with filters', () => {
		render(() => <FilterBar filters={mockFilters} isDark={false} />)
		expect(screen.getByText('Status')).toBeInTheDocument()
		expect(screen.getByText('Tags')).toBeInTheDocument()
	})

	it('renders select filter', () => {
		render(() => <FilterBar filters={mockFilters} isDark={false} />)
		const select = screen.getByLabelText('Status')
		expect(select).toBeInTheDocument()
		expect(select).toHaveTextContent('Select...')
	})

	it('renders checkbox filter', () => {
		render(() => <FilterBar filters={mockFilters} isDark={false} />)
		expect(screen.getByText('Tag 1')).toBeInTheDocument()
		expect(screen.getByText('Tag 2')).toBeInTheDocument()
	})

	it('calls onFilterChange when select value changes', () => {
		const onFilterChange = vi.fn()
		render(() => (
			<FilterBar
				filters={mockFilters}
				onFilterChange={onFilterChange}
				isDark={false}
			/>
		))
		const select = screen.getByLabelText('Status') as HTMLSelectElement
		fireEvent.change(select, { target: { value: 'active' } })
		expect(onFilterChange).toHaveBeenCalledWith('status', 'active')
	})

	it('calls onFilterChange when checkbox is clicked', () => {
		const onFilterChange = vi.fn()
		render(() => (
			<FilterBar
				filters={mockFilters}
				onFilterChange={onFilterChange}
				isDark={false}
			/>
		))
		const checkbox = screen.getByText('Tag 1').closest('label')
		if (checkbox) {
			fireEvent.click(checkbox)
			expect(onFilterChange).toHaveBeenCalledWith('tags', ['tag1'])
		}
	})

	it('calls onFiltersChange when any filter changes', () => {
		const onFiltersChange = vi.fn()
		render(() => (
			<FilterBar
				filters={mockFilters}
				onFiltersChange={onFiltersChange}
				isDark={false}
			/>
		))
		const select = screen.getByLabelText('Status') as HTMLSelectElement
		fireEvent.change(select, { target: { value: 'active' } })
		expect(onFiltersChange).toHaveBeenCalledWith(
			expect.objectContaining({ status: 'active' })
		)
	})

	it('shows clear all button by default', () => {
		render(() => <FilterBar filters={mockFilters} isDark={false} />)
		expect(screen.getByText('Clear All')).toBeInTheDocument()
	})

	it('hides clear all button when showClearAll is false', () => {
		render(() => (
			<FilterBar filters={mockFilters} showClearAll={false} isDark={false} />
		))
		expect(screen.queryByText('Clear All')).not.toBeInTheDocument()
	})

	it('clears all filters when clear all is clicked', () => {
		const onFiltersChange = vi.fn()
		render(() => (
			<FilterBar
				filters={mockFilters}
				onFiltersChange={onFiltersChange}
				isDark={false}
			/>
		))
		const clearButton = screen.getByText('Clear All')
		fireEvent.click(clearButton)
		expect(onFiltersChange).toHaveBeenCalledWith(
			expect.objectContaining({
				status: '',
				tags: []
			})
		)
	})

	it('renders text filter', () => {
		const textFilter: FilterItem[] = [
			{
				id: 'search',
				label: 'Search',
				type: 'text',
				placeholder: 'Enter text...'
			}
		]
		render(() => <FilterBar filters={textFilter} isDark={false} />)
		const input = screen.getByPlaceholderText('Enter text...')
		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('type', 'text')
	})

	it('renders date filter', () => {
		const dateFilter: FilterItem[] = [
			{
				id: 'date',
				label: 'Date',
				type: 'date'
			}
		]
		render(() => <FilterBar filters={dateFilter} isDark={false} />)
		const input = screen.getByLabelText('Date')
		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('type', 'date')
	})

	it('renders range filter', () => {
		const rangeFilter: FilterItem[] = [
			{
				id: 'range',
				label: 'Range',
				type: 'range',
				min: 0,
				max: 100,
				step: 1
			}
		]
		render(() => <FilterBar filters={rangeFilter} isDark={false} />)
		const input = screen.getByLabelText(/Range/)
		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('type', 'range')
	})

	it('applies custom class name', () => {
		render(() => (
			<FilterBar filters={mockFilters} class='custom-filter' isDark={false} />
		))
		const container = screen.getByText('Status').closest('.filter-bar')
		expect(container).toHaveClass('custom-filter')
	})
})

