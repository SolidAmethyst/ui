import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Accordion } from '../ui/accordion'
import type { AccordionItem } from '../model/types'

const mockItems: AccordionItem[] = [
	{
		id: '1',
		header: 'Section 1',
		content: 'Content 1'
	},
	{
		id: '2',
		header: 'Section 2',
		content: 'Content 2'
	},
	{
		id: '3',
		header: 'Section 3',
		content: 'Content 3',
		disabled: true
	}
]

describe('Accordion', () => {
	it('renders accordion items', () => {
		render(() => <Accordion items={mockItems} isDark={false} />)
		expect(screen.getByText('Section 1')).toBeInTheDocument()
		expect(screen.getByText('Section 2')).toBeInTheDocument()
		expect(screen.getByText('Section 3')).toBeInTheDocument()
	})

	it('expands item on click', () => {
		render(() => <Accordion items={mockItems} isDark={false} />)

		const header1 = screen.getByText('Section 1')
		fireEvent.click(header1)

		expect(screen.getByText('Content 1')).toBeInTheDocument()
	})

	it('collapses item when clicked again', () => {
		render(() => <Accordion items={mockItems} isDark={false} />)

		const header1 = screen.getByText('Section 1')
		fireEvent.click(header1)
		expect(screen.getByText('Content 1')).toBeInTheDocument()

		fireEvent.click(header1)
		// Content should be hidden (opacity: 0, max-height: 0)
		const content = screen.getByText('Content 1')
		expect(content).toHaveStyle({ opacity: '0' })
	})

	it('closes other items when allowMultiple is false', () => {
		render(() => <Accordion items={mockItems} allowMultiple={false} isDark={false} />)

		const header1 = screen.getByText('Section 1')
		const header2 = screen.getByText('Section 2')

		fireEvent.click(header1)
		expect(screen.getByText('Content 1')).toBeInTheDocument()

		fireEvent.click(header2)
		// Section 1 should be closed
		const content1 = screen.getByText('Content 1')
		expect(content1).toHaveStyle({ opacity: '0' })
		// Section 2 should be open
		expect(screen.getByText('Content 2')).toBeInTheDocument()
	})

	it('allows multiple items open when allowMultiple is true', () => {
		render(() => <Accordion items={mockItems} allowMultiple={true} isDark={false} />)

		const header1 = screen.getByText('Section 1')
		const header2 = screen.getByText('Section 2')

		fireEvent.click(header1)
		fireEvent.click(header2)

		expect(screen.getByText('Content 1')).toBeInTheDocument()
		expect(screen.getByText('Content 2')).toBeInTheDocument()
	})

	it('does not expand disabled items', () => {
		render(() => <Accordion items={mockItems} isDark={false} />)

		const header3 = screen.getByText('Section 3')
		fireEvent.click(header3)

		// Content should not be visible
		const content3 = screen.getByText('Content 3')
		expect(content3).toHaveStyle({ opacity: '0' })
	})

	it('calls onChange when item is toggled', () => {
		const onChange = vi.fn()
		render(() => <Accordion items={mockItems} onChange={onChange} isDark={false} />)

		const header1 = screen.getByText('Section 1')
		fireEvent.click(header1)

		expect(onChange).toHaveBeenCalledWith('1', true)
	})

	it('expands items with defaultExpanded', () => {
		const itemsWithDefault: AccordionItem[] = [
			{
				id: '1',
				header: 'Section 1',
				content: 'Content 1',
				defaultExpanded: true
			},
			{
				id: '2',
				header: 'Section 2',
				content: 'Content 2'
			}
		]

		render(() => <Accordion items={itemsWithDefault} isDark={false} />)

		// Section 1 should be expanded by default
		const content1 = screen.getByText('Content 1')
		expect(content1).toHaveStyle({ opacity: '1' })
	})

	it('applies custom class name', () => {
		render(() => (
			<Accordion items={mockItems} class="custom-accordion" isDark={false} />
		))
		const container = screen.getByText('Section 1').closest('.accordion')
		expect(container).toHaveClass('custom-accordion')
	})

	it('supports JSX in header and content', () => {
		const itemsWithJSX: AccordionItem[] = [
			{
				id: '1',
				header: <strong>Bold Header</strong>,
				content: <div data-testid="jsx-content">JSX Content</div>
			}
		]

		render(() => <Accordion items={itemsWithJSX} isDark={false} />)

		expect(screen.getByText('Bold Header')).toBeInTheDocument()
		const header = screen.getByText('Bold Header')
		fireEvent.click(header)
		expect(screen.getByTestId('jsx-content')).toBeInTheDocument()
	})
})
