import { render, screen, fireEvent } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Select } from '../ui/select'

describe('Select', () => {
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	]

	it('renders with default value', () => {
		render(() => (
			<Select
				options={options}
				value='option1'
				onChange={() => {}}
				isDark={false}
			/>
		))
		expect(screen.getByText('Option 1')).toBeInTheDocument()
	})

	it('shows placeholder when no value selected', () => {
		render(() => (
			<Select
				options={options}
				value=''
				onChange={() => {}}
				placeholder='Choose...'
				isDark={false}
			/>
		))
		expect(screen.getByText('Choose...')).toBeInTheDocument()
	})

	it('opens dropdown on click', () => {
		render(() => (
			<Select
				options={options}
				value='option1'
				onChange={() => {}}
				isDark={false}
			/>
		))
		const trigger = screen.getByText('Option 1').closest('button')
		expect(trigger).toBeInTheDocument()
		fireEvent.click(trigger!)
		expect(screen.getByText('Option 2')).toBeInTheDocument()
		expect(screen.getByText('Option 3')).toBeInTheDocument()
	})

	it('calls onChange when option is selected', () => {
		const onChange = vi.fn()
		render(() => (
			<Select
				options={options}
				value='option1'
				onChange={onChange}
				isDark={false}
			/>
		))
		const trigger = screen.getByText('Option 1').closest('button')
		fireEvent.click(trigger!)
		const option2 = screen.getByText('Option 2')
		fireEvent.click(option2)
		expect(onChange).toHaveBeenCalledWith('option2')
	})

	it('closes dropdown after selection', () => {
		render(() => (
			<Select
				options={options}
				value='option1'
				onChange={() => {}}
				isDark={false}
			/>
		))
		const trigger = screen.getByText('Option 1').closest('button')
		fireEvent.click(trigger!)
		const option2 = screen.getByText('Option 2')
		fireEvent.click(option2)
		// Dropdown should be closed (options not in DOM)
		expect(screen.queryByText('Option 2')).toBeNull()
	})

	it('renders with description', () => {
		const optionsWithDesc = [
			{ value: 'opt1', label: 'Option 1', description: 'Description 1' }
		]
		render(() => (
			<Select
				options={optionsWithDesc}
				value='opt1'
				onChange={() => {}}
				isDark={false}
			/>
		))
		const trigger = screen.getByText('Option 1').closest('button')
		fireEvent.click(trigger!)
		expect(screen.getByText('Description 1')).toBeInTheDocument()
	})

	it('handles disabled state', () => {
		render(() => (
			<Select
				options={options}
				value='option1'
				onChange={() => {}}
				disabled={true}
				isDark={false}
			/>
		))
		const trigger = screen.getByText('Option 1').closest('button')
		expect(trigger).toBeDisabled()
	})

	it('handles disabled option', () => {
		const optionsWithDisabled = [
			{ value: 'opt1', label: 'Option 1' },
			{ value: 'opt2', label: 'Option 2', disabled: true }
		]
		const onChange = vi.fn()
		render(() => (
			<Select
				options={optionsWithDisabled}
				value='opt1'
				onChange={onChange}
				isDark={false}
			/>
		))
		const trigger = screen.getByText('Option 1').closest('button')
		fireEvent.click(trigger!)
		const disabledOption = screen.getByText('Option 2')
		fireEvent.click(disabledOption)
		expect(onChange).not.toHaveBeenCalled()
	})
})
