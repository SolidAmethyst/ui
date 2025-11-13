import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Slider } from '../ui/slider'

describe('Slider', () => {
	it('renders with default props', () => {
		render(() => <Slider value={50} />)
		const slider = screen.getByRole('slider')
		expect(slider).toBeInTheDocument()
		expect(slider).toHaveValue('50')
	})

	it('renders with label', () => {
		render(() => <Slider value={50} label='Volume' />)
		expect(screen.getByText('Volume')).toBeInTheDocument()
	})

	it('renders value when showValue is true', () => {
		render(() => <Slider value={50} label='Volume' showValue={true} />)
		expect(screen.getByText('50')).toBeInTheDocument()
	})

	it('does not render value when showValue is false', () => {
		render(() => <Slider value={50} label='Volume' showValue={false} />)
		expect(screen.queryByText('50')).not.toBeInTheDocument()
	})

	it('uses custom formatter for value', () => {
		render(() => (
			<Slider value={50} label='Volume' formatValue={val => `${val}%`} />
		))
		expect(screen.getByText('50%')).toBeInTheDocument()
	})

	it('applies min and max values', () => {
		render(() => <Slider value={25} min={0} max={100} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		expect(slider.min).toBe('0')
		expect(slider.max).toBe('100')
	})

	it('applies step value', () => {
		render(() => <Slider value={25} step={5} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		expect(slider.step).toBe('5')
	})

	it('calls onChange when value changes', () => {
		const onChange = vi.fn()
		render(() => <Slider value={50} onChange={onChange} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		fireEvent.change(slider, { target: { value: '75' } })
		expect(onChange).toHaveBeenCalledWith(75)
	})

	it('calls onInput when value changes', () => {
		const onInput = vi.fn()
		render(() => <Slider value={50} onInput={onInput} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		fireEvent.input(slider, { target: { value: '75' } })
		expect(onInput).toHaveBeenCalledWith(75)
	})

	it('is disabled when disabled prop is true', () => {
		render(() => <Slider value={50} disabled={true} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		expect(slider.disabled).toBe(true)
	})

	it('has default min of 0', () => {
		render(() => <Slider value={50} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		expect(slider.min).toBe('0')
	})

	it('has default max of 100', () => {
		render(() => <Slider value={50} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		expect(slider.max).toBe('100')
	})

	it('has default step of 1', () => {
		render(() => <Slider value={50} />)
		const slider = screen.getByRole('slider') as HTMLInputElement
		expect(slider.step).toBe('1')
	})
})
