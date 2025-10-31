/**
 * Button Component Tests
 * Comprehensive test suite for Button component
 */

import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../ui/button'

describe('Button', () => {
	it('renders with default props', () => {
		render(() => <Button>Click me</Button>)

		const button = screen.getByRole('button', { name: /click me/i })
		expect(button).toBeInTheDocument()
		expect(button).toHaveAttribute('type', 'button')
	})

	it('renders with custom variant', () => {
		render(() => <Button variant='danger'>Delete</Button>)

		const button = screen.getByRole('button', { name: /delete/i })
		expect(button).toHaveClass('bg-red-600')
	})

	it('renders with custom size', () => {
		render(() => <Button size='lg'>Large Button</Button>)

		const button = screen.getByRole('button', { name: /large button/i })
		expect(button).toHaveClass('px-4', 'py-3', 'text-base')
	})

	it('handles click events', () => {
		const handleClick = vi.fn()
		render(() => <Button onClick={handleClick}>Click me</Button>)

		const button = screen.getByRole('button', { name: /click me/i })
		fireEvent.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('disables button when disabled prop is true', () => {
		render(() => <Button disabled>Disabled Button</Button>)

		const button = screen.getByRole('button', { name: /disabled button/i })
		expect(button).toBeDisabled()
		expect(button).toHaveClass('disabled:opacity-50')
	})

	it('shows loading state', () => {
		render(() => <Button loading>Loading Button</Button>)

		const button = screen.getByRole('button', { name: /loading button/i })
		expect(button).toBeDisabled()
		expect(button.querySelector('svg')).toBeInTheDocument()
	})

	it('renders with icon on left', () => {
		render(() => (
			<Button icon='add' iconPosition='left'>
				Add Item
			</Button>
		))

		const button = screen.getByRole('button', { name: /add item/i })
		const icon = button.querySelector('.material-symbols-rounded')
		expect(icon).toBeInTheDocument()
		expect(icon).toHaveTextContent('add')
	})

	it('renders with icon on right', () => {
		render(() => (
			<Button icon='arrow_forward' iconPosition='right'>
				Next
			</Button>
		))

		const button = screen.getByRole('button', { name: /next/i })
		const icon = button.querySelector('.material-symbols-rounded')
		expect(icon).toBeInTheDocument()
		expect(icon).toHaveTextContent('arrow_forward')
	})

	it('renders icon-only button', () => {
		render(() => <Button icon='close' iconPosition='only' title='Close' />)

		const button = screen.getByRole('button', { name: /close/i })
		expect(button).toHaveClass('p-2') // icon-only padding
		expect(button.querySelector('.material-symbols-rounded')).toBeTruthy()
	})

	it('applies custom class names', () => {
		render(() => <Button class='custom-class'>Custom Button</Button>)

		const button = screen.getByRole('button', { name: /custom button/i })
		expect(button).toHaveClass('custom-class')
	})

	it('renders with different button types', () => {
		render(() => <Button type='submit'>Submit</Button>)

		const button = screen.getByRole('button', { name: /submit/i })
		expect(button).toHaveAttribute('type', 'submit')
	})

	it('shows tooltip when title is provided', () => {
		render(() => <Button title='Tooltip text'>Button</Button>)

		const button = screen.getByRole('button', { name: /button/i })
		expect(button).toHaveAttribute('title', 'Tooltip text')
	})
})
