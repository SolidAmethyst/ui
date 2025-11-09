/**
 * NumberInput Component
 * Input with spinner arrows and mouse wheel support
 */

import type { JSX } from 'solid-js'
import { Component, Show } from 'solid-js'
import { Button } from '../../button'
import { numberInputStyles } from '../lib/number-input.styles'
import type { NumberInputProps } from '../model/types'

export const NumberInput: Component<NumberInputProps> = props => {
	// Parse value to number (handles both number and string like "12px")
	const parseValue = (value: number | string): number => {
		if (typeof value === 'number') return value
		const match = String(value).match(/^(\d+)/)
		return match ? parseInt(match[1], 10) : 0
	}

	// Format number back to original format (preserves units if string was provided)
	const formatValue = (num: number): number | string => {
		if (props.type === 'text' && typeof props.value === 'string') {
			const unit = props.value.replace(/^\d+/, '')
			return `${num}${unit}`
		}
		return num
	}

	// Modify value by delta
	const modifyValue = (delta: number) => {
		const current = parseValue(props.value)
		const step = props.step || 1
		const newValue = current + delta * step

		// Apply min/max constraints
		let constrainedValue = newValue
		if (props.min !== undefined) {
			constrainedValue = Math.max(constrainedValue, props.min)
		}
		if (props.max !== undefined) {
			constrainedValue = Math.min(constrainedValue, props.max)
		}

		props.onChange(formatValue(constrainedValue))
	}

	// Handle wheel event
	const handleWheel = (e: WheelEvent) => {
		if (!props.enableWheel || props.disabled) return

		e.preventDefault()
		const delta = e.deltaY > 0 ? -1 : 1
		modifyValue(delta)
	}

	// Check if value is at min/max
	const isAtMin = () => {
		if (props.min === undefined) return false
		return parseValue(props.value) <= props.min
	}

	const isAtMax = () => {
		if (props.max === undefined) return false
		return parseValue(props.value) >= props.max
	}

	return (
		<div
			class={`number-input-wrapper ${props.class || ''}`}
			style={numberInputStyles.wrapper}
		>
			<input
				id={props.id}
				name={props.name}
				class='number-input'
				type={props.type || 'number'}
				value={props.value}
				min={props.min}
				max={props.max}
				step={props.step || 1}
				placeholder={props.placeholder}
				disabled={props.disabled}
				onInput={props.onInput}
				onWheel={handleWheel}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				style={{
					...numberInputStyles.input,
					...(props.style as JSX.CSSProperties)
				}}
			/>
			<Show when={props.showArrows !== false}>
				<div
					class='number-input-arrows'
					style={numberInputStyles.arrowsContainer}
				>
					<Button
						variant='ghost'
						icon='arrow_drop_up'
						iconPosition='only'
						disabled={props.disabled || isAtMax()}
						onClick={() => modifyValue(1)}
						title='Increase'
						class='number-input-arrow'
						style={numberInputStyles.arrowButton}
					/>
					<Button
						variant='ghost'
						icon='arrow_drop_down'
						iconPosition='only'
						disabled={props.disabled || isAtMin()}
						onClick={() => modifyValue(-1)}
						title='Decrease'
						class='number-input-arrow'
						style={numberInputStyles.arrowButton}
					/>
				</div>
			</Show>
		</div>
	)
}
