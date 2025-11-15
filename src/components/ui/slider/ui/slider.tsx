/**
 * Slider Component
 * Range input slider component with theme support
 */

import { Component } from 'solid-js'
import type { SliderProps } from '../model/types'
import { sliderStyles } from '../lib/slider.styles'

export const Slider: Component<SliderProps> = props => {
	const isDark = () => props.isDark ?? true
	const min = () => props.min ?? 0
	const max = () => props.max ?? 100
	const step = () => props.step ?? 1
	const showValue = () => props.showValue ?? true

	const formatValue = (value: number): string => {
		if (props.formatValue) {
			return props.formatValue(value)
		}
		return value.toString()
	}

	const handleInput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement
		const value = parseFloat(target.value)
		props.onInput?.(value)
		props.onChange?.(value)
	}

	const handleChange = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement
		const value = parseFloat(target.value)
		props.onChange?.(value)
	}

	return (
		<div
			class={`slider-container ${props.class || ''}`}
			style={sliderStyles.container()}
		>
			{props.label && (
				<div style={sliderStyles.labelContainer(isDark())}>
					<span>{props.label}</span>
					{showValue() && (
						<span style={sliderStyles.value(isDark())}>
							{formatValue(props.value)}
						</span>
					)}
				</div>
			)}
			<input
				type='range'
				min={min()}
				max={max()}
				step={step()}
				value={props.value}
				disabled={props.disabled}
				onInput={handleInput}
				onChange={handleChange}
				class='slider-input'
				style={{
					...sliderStyles.slider(isDark(), props.disabled ?? false),
					'--slider-fill-percent': `${((props.value - min()) / (max() - min())) * 100}%`,
					...props.style
				}}
			/>
		</div>
	)
}
