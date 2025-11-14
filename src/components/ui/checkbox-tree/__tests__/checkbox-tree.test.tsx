import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { CheckboxTree } from '../ui/checkbox-tree'
import type { CheckboxTreeNode } from '../model/types'

const mockTree: CheckboxTreeNode[] = [
	{
		id: '1',
		label: 'Parent 1',
		children: [
			{ id: '1-1', label: 'Child 1-1' },
			{ id: '1-2', label: 'Child 1-2' }
		]
	},
	{
		id: '2',
		label: 'Parent 2',
		children: [
			{ id: '2-1', label: 'Child 2-1' },
			{
				id: '2-2',
				label: 'Child 2-2',
				children: [{ id: '2-2-1', label: 'Grandchild 2-2-1' }]
			}
		]
	}
]

describe('CheckboxTree', () => {
	it('renders tree nodes', () => {
		render(() => <CheckboxTree nodes={mockTree} isDark={false} />)
		expect(screen.getByText('Parent 1')).toBeInTheDocument()
		expect(screen.getByText('Child 1-1')).toBeInTheDocument()
		expect(screen.getByText('Parent 2')).toBeInTheDocument()
	})

	it('renders nested children', () => {
		render(() => <CheckboxTree nodes={mockTree} isDark={false} />)
		expect(screen.getByText('Grandchild 2-2-1')).toBeInTheDocument()
	})

	it('calls onChange when node is clicked', () => {
		const onChange = vi.fn()
		render(() => <CheckboxTree nodes={mockTree} onChange={onChange} isDark={false} />)

		const parent1Checkbox = screen
			.getByText('Parent 1')
			.closest('div')
			?.querySelector('input[type="checkbox"]') as HTMLInputElement

		if (parent1Checkbox) {
			fireEvent.change(parent1Checkbox, { target: { checked: true } })
			expect(onChange).toHaveBeenCalledWith('1', true)
		}
	})

	it('calls onTreeChange when any node changes', () => {
		const onTreeChange = vi.fn()
		render(() => (
			<CheckboxTree nodes={mockTree} onTreeChange={onTreeChange} isDark={false} />
		))

		const childCheckbox = screen
			.getByText('Child 1-1')
			.closest('div')
			?.querySelector('input[type="checkbox"]') as HTMLInputElement

		if (childCheckbox) {
			fireEvent.change(childCheckbox, { target: { checked: true } })
			expect(onTreeChange).toHaveBeenCalled()
		}
	})

	it('handles disabled nodes', () => {
		const disabledTree: CheckboxTreeNode[] = [
			{
				id: '1',
				label: 'Disabled Parent',
				disabled: true,
				children: [{ id: '1-1', label: 'Child', disabled: true }]
			}
		]

		render(() => <CheckboxTree nodes={disabledTree} isDark={false} />)

		const checkbox = screen
			.getByText('Disabled Parent')
			.closest('div')
			?.querySelector('input[type="checkbox"]') as HTMLInputElement

		expect(checkbox).toBeDisabled()
	})

	it('applies custom class name', () => {
		render(() => (
			<CheckboxTree nodes={mockTree} class="custom-tree" isDark={false} />
		))
		const container = screen.getByText('Parent 1').closest('.checkbox-tree')
		expect(container).toHaveClass('custom-tree')
	})
})

