/**
 * FilterBar Component
 * Filter bar component for advanced filtering options
 */

import { Component, For, Show, createSignal, createEffect } from 'solid-js'
import { Checkbox } from '../../checkbox'
import { filterBarStyles } from '../lib/filter-bar.styles'
import type { FilterBarProps, FilterItem } from '../model/types'

export const FilterBar: Component<FilterBarProps> = props => {
	const isDark = () => props.isDark ?? true
	const showClearAll = () => props.showClearAll ?? true

	const [filterValues, setFilterValues] = createSignal<
		Record<string, string | number | string[] | number[]>
	>({})

	// Initialize filter values from props
	createEffect(() => {
		const values: Record<string, string | number | string[] | number[]> = {}
		props.filters.forEach(filter => {
			if (filter.value !== undefined) {
				values[filter.id] = filter.value
			}
		})
		setFilterValues(values)
	})

	const handleFilterChange = (
		filterId: string,
		value: string | number | string[] | number[]
	) => {
		setFilterValues(prev => ({ ...prev, [filterId]: value }))
		props.onFilterChange?.(filterId, value)

		// Call onFiltersChange with all current values
		const newValues = { ...filterValues(), [filterId]: value }
		props.onFiltersChange?.(newValues)
	}

	const handleClearAll = () => {
		const clearedValues: Record<string, string | number | string[] | number[]> =
			{}
		props.filters.forEach(filter => {
			if (filter.type === 'checkbox') {
				clearedValues[filter.id] = []
			} else {
				clearedValues[filter.id] = ''
			}
		})
		setFilterValues(clearedValues)
		props.onFiltersChange?.(clearedValues)
	}

	const renderFilter = (filter: FilterItem) => {
		const currentValue = () => filterValues()[filter.id] ?? filter.value ?? ''

		switch (filter.type) {
			case 'checkbox':
				return (
					<div style={filterBarStyles.filterItem(isDark())}>
						<Show when={filter.label}>
							<label style={filterBarStyles.filterLabel(isDark())}>
								{filter.label}
							</label>
						</Show>
						<div style={filterBarStyles.checkboxGroup()}>
							<For each={filter.options}>
								{option => {
									const checked = () => {
										const val = currentValue() as string[]
										return Array.isArray(val) && val.includes(String(option.value))
									}
									return (
										<Checkbox
											checked={checked()}
											label={option.label}
											disabled={filter.disabled || option.disabled}
											isDark={isDark()}
											onChange={checked => {
												const val = (currentValue() as string[]) || []
												const newVal = checked
													? [...val, String(option.value)]
													: val.filter(v => v !== String(option.value))
												handleFilterChange(filter.id, newVal)
											}}
										/>
									)
								}}
							</For>
						</div>
					</div>
				)

			case 'select':
				return (
					<div style={filterBarStyles.filterItem(isDark())}>
						<Show when={filter.label}>
							<label style={filterBarStyles.filterLabel(isDark())}>
								{filter.label}
							</label>
						</Show>
						<select
							value={String(currentValue())}
							disabled={filter.disabled}
							onChange={e => {
								handleFilterChange(filter.id, e.currentTarget.value)
							}}
							style={filterBarStyles.filterInput(
								isDark(),
								filter.disabled ?? false
							)}
						>
							<option value=''>{filter.placeholder ?? 'Select...'}</option>
							<For each={filter.options}>
								{option => (
									<option
										value={String(option.value)}
										disabled={option.disabled}
									>
										{option.label}
									</option>
								)}
							</For>
						</select>
					</div>
				)

			case 'text':
				return (
					<div style={filterBarStyles.filterItem(isDark())}>
						<Show when={filter.label}>
							<label style={filterBarStyles.filterLabel(isDark())}>
								{filter.label}
							</label>
						</Show>
						<input
							type='text'
							value={String(currentValue())}
							placeholder={filter.placeholder}
							disabled={filter.disabled}
							onInput={e => {
								handleFilterChange(filter.id, e.currentTarget.value)
							}}
							style={filterBarStyles.filterInput(
								isDark(),
								filter.disabled ?? false
							)}
						/>
					</div>
				)

			case 'date':
				return (
					<div style={filterBarStyles.filterItem(isDark())}>
						<Show when={filter.label}>
							<label style={filterBarStyles.filterLabel(isDark())}>
								{filter.label}
							</label>
						</Show>
						<input
							type='date'
							value={String(currentValue())}
							disabled={filter.disabled}
							onChange={e => {
								handleFilterChange(filter.id, e.currentTarget.value)
							}}
							style={filterBarStyles.filterInput(
								isDark(),
								filter.disabled ?? false
							)}
						/>
					</div>
				)

			case 'range':
				return (
					<div style={filterBarStyles.filterItem(isDark())}>
						<Show when={filter.label}>
							<label style={filterBarStyles.filterLabel(isDark())}>
								{filter.label}: {String(currentValue())}
							</label>
						</Show>
						<input
							type='range'
							min={filter.min ?? 0}
							max={filter.max ?? 100}
							step={filter.step ?? 1}
							value={Number(currentValue()) || filter.min || 0}
							disabled={filter.disabled}
							onInput={e => {
								handleFilterChange(filter.id, Number(e.currentTarget.value))
							}}
							style={filterBarStyles.filterInput(
								isDark(),
								filter.disabled ?? false
							)}
						/>
					</div>
				)

			default:
				return null
		}
	}

	return (
		<div
			class={`filter-bar ${props.class || ''}`}
			style={{
				...filterBarStyles.container(isDark()),
				...props.style
			}}
		>
			<For each={props.filters}>{filter => renderFilter(filter)}</For>
			<Show when={showClearAll()}>
				<button
					type='button'
					onClick={handleClearAll}
					style={filterBarStyles.clearButton(isDark())}
					onMouseEnter={e => {
						Object.assign(
							e.currentTarget.style,
							filterBarStyles.clearButtonHover(isDark())
						)
					}}
					onMouseLeave={e => {
						e.currentTarget.style.background = ''
						e.currentTarget.style.border = ''
					}}
				>
					{props.clearAllLabel ?? 'Clear All'}
				</button>
			</Show>
		</div>
	)
}

