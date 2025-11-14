import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Table } from '../ui/table'
import type { TableColumn } from '../model/types'

interface TestData {
	id: number
	name: string
	age: number
	email: string
}

const mockData: TestData[] = [
	{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
	{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
	{ id: 3, name: 'Charlie', age: 28, email: 'charlie@example.com' }
]

const mockColumns: TableColumn<TestData>[] = [
	{
		id: 'name',
		header: 'Name',
		accessor: row => row.name,
		sortable: true
	},
	{
		id: 'age',
		header: 'Age',
		accessor: row => row.age,
		sortable: true
	},
	{
		id: 'email',
		header: 'Email',
		accessor: row => row.email,
		sortable: false
	}
]

describe('Table', () => {
	it('renders table with data', () => {
		render(() => <Table data={mockData} columns={mockColumns} isDark={false} />)
		expect(screen.getByText('Alice')).toBeInTheDocument()
		expect(screen.getByText('Bob')).toBeInTheDocument()
		expect(screen.getByText('Charlie')).toBeInTheDocument()
	})

	it('renders column headers', () => {
		render(() => <Table data={mockData} columns={mockColumns} isDark={false} />)
		expect(screen.getByText('Name')).toBeInTheDocument()
		expect(screen.getByText('Age')).toBeInTheDocument()
		expect(screen.getByText('Email')).toBeInTheDocument()
	})

	it('sorts data when column header is clicked', () => {
		render(() => <Table data={mockData} columns={mockColumns} isDark={false} />)

		const nameHeader = screen.getByText('Name')
		fireEvent.click(nameHeader)

		// Data should be sorted (ascending by default)
		const rows = screen.getAllByRole('row')
		// First data row should be Alice (alphabetically first)
		expect(rows[1]).toHaveTextContent('Alice')
	})

	it('calls onSortChange when sorting', () => {
		const onSortChange = vi.fn()
		render(() => (
			<Table
				data={mockData}
				columns={mockColumns}
				onSortChange={onSortChange}
				isDark={false}
			/>
		))

		const nameHeader = screen.getByText('Name')
		fireEvent.click(nameHeader)

		expect(onSortChange).toHaveBeenCalledWith('name', 'asc')
	})

	it('shows pagination when paginated is true', () => {
		render(() => (
			<Table
				data={mockData}
				columns={mockColumns}
				paginated={true}
				pageSize={2}
				isDark={false}
			/>
		))

		expect(screen.getByText(/Showing/)).toBeInTheDocument()
		expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument()
	})

	it('navigates pages correctly', () => {
		render(() => (
			<Table
				data={mockData}
				columns={mockColumns}
				paginated={true}
				pageSize={2}
				isDark={false}
			/>
		))

		const nextButton = screen.getByLabelText('Next page')
		fireEvent.click(nextButton)

		expect(screen.getByText(/2 \/ 2/)).toBeInTheDocument()
	})

	it('calls onPageChange when page changes', () => {
		const onPageChange = vi.fn()
		render(() => (
			<Table
				data={mockData}
				columns={mockColumns}
				paginated={true}
				pageSize={2}
				onPageChange={onPageChange}
				isDark={false}
			/>
		))

		const nextButton = screen.getByLabelText('Next page')
		fireEvent.click(nextButton)

		expect(onPageChange).toHaveBeenCalledWith(2)
	})

	it('disables pagination buttons at boundaries', () => {
		render(() => (
			<Table
				data={mockData}
				columns={mockColumns}
				paginated={true}
				pageSize={2}
				isDark={false}
			/>
		))

		const prevButton = screen.getByLabelText('Previous page')
		expect(prevButton).toBeDisabled()

		const nextButton = screen.getByLabelText('Next page')
		fireEvent.click(nextButton)

		expect(nextButton).toBeDisabled()
	})

	it('applies custom class name', () => {
		render(() => (
			<Table
				data={mockData}
				columns={mockColumns}
				class="custom-table"
				isDark={false}
			/>
		))
		const container = screen.getByText('Alice').closest('.table-container')
		expect(container).toHaveClass('custom-table')
	})

	it('respects column alignment', () => {
		const columnsWithAlign: TableColumn<TestData>[] = [
			{
				id: 'name',
				header: 'Name',
				accessor: row => row.name,
				align: 'center'
			}
		]

		render(() => (
			<Table data={mockData} columns={columnsWithAlign} isDark={false} />
		))

		const header = screen.getByText('Name')
		expect(header).toHaveStyle({ 'text-align': 'center' })
	})
})
