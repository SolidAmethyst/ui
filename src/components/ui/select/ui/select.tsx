/**
 * Select Component
 * Dropdown select component for choosing from a list of options
 */

import {
	Component,
	createSignal,
	For,
	onCleanup,
	Show,
	splitProps
} from 'solid-js'
import { Scrollbar } from '../../scrollbar'
import { selectStyles } from '../lib/select.styles'
import type { SelectProps } from '../model/types'

export const Select = <T extends string = string>(
	props: SelectProps<T>
): ReturnType<Component<SelectProps<T>>> => {
	const [local, others] = splitProps(props, [
		'options',
		'value',
		'onChange',
		'placeholder',
		'isDark',
		'disabled',
		'class',
		'style'
	])

	const [isOpen, setIsOpen] = createSignal(false)
	let triggerRef: HTMLButtonElement | undefined
	let dropdownRef: HTMLDivElement | undefined

	const isDark = () => {
		const dark = local.isDark
		return typeof dark === 'function' ? dark() : (dark ?? false)
	}

	const selectedOption = () => {
		return local.options.find(opt => opt.value === local.value)
	}

	const handleToggle = () => {
		if (!local.disabled) {
			setIsOpen(!isOpen())
		}
	}

	const handleSelect = (value: T) => {
		local.onChange(value)
		setIsOpen(false)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			isOpen() &&
			triggerRef &&
			!triggerRef.contains(event.target as Node) &&
			dropdownRef &&
			!dropdownRef.contains(event.target as Node)
		) {
			setIsOpen(false)
		}
	}

	if (typeof document !== 'undefined') {
		document.addEventListener('click', handleClickOutside)
		onCleanup(() => {
			document.removeEventListener('click', handleClickOutside)
		})
	}

	return (
		<div
			class={local.class}
			style={{
				...selectStyles.container(),
				...local.style
			}}
			{...others}
		>
			<button
				ref={triggerRef}
				type='button'
				onClick={handleToggle}
				disabled={local.disabled}
				style={{
					...selectStyles.trigger({
						isDark: isDark(),
						isOpen: isOpen(),
						isDisabled: local.disabled ?? false
					}),
					...(isOpen()
						? selectStyles.triggerOpen({
								isDark: isDark(),
								isOpen: isOpen(),
								isDisabled: local.disabled ?? false
							})
						: {})
				}}
				onMouseEnter={e => {
					if (!local.disabled) {
						if (isOpen()) {
							Object.assign(
								e.currentTarget.style,
								selectStyles.triggerOpenHover({
									isDark: isDark(),
									isOpen: isOpen(),
									isDisabled: local.disabled ?? false
								})
							)
						} else {
							Object.assign(
								e.currentTarget.style,
								selectStyles.triggerHover({
									isDark: isDark(),
									isOpen: isOpen(),
									isDisabled: local.disabled ?? false
								})
							)
						}
					}
				}}
				onMouseLeave={e => {
					if (!local.disabled) {
						if (isOpen()) {
							Object.assign(
								e.currentTarget.style,
								selectStyles.triggerOpen({
									isDark: isDark(),
									isOpen: isOpen(),
									isDisabled: local.disabled ?? false
								})
							)
						} else {
							e.currentTarget.style.background = isDark()
								? 'rgba(255, 255, 255, 0.05)'
								: '#ffffff'
							e.currentTarget.style.borderColor = isDark()
								? 'rgba(255, 255, 255, 0.1)'
								: 'rgba(0, 0, 0, 0.1)'
						}
					}
				}}
			>
				<span style={{ flex: '1', 'text-align': 'left' }}>
					{selectedOption()?.label ?? local.placeholder ?? 'Select...'}
				</span>
				<span
					class='material-symbols-rounded'
					style={selectStyles.icon({
						isDark: isDark(),
						isOpen: isOpen(),
						isDisabled: local.disabled ?? false
					})}
				>
					expand_more
				</span>
			</button>

			<Show when={isOpen()}>
				<div
					ref={dropdownRef}
					style={selectStyles.dropdown({
						isDark: isDark(),
						isOpen: isOpen(),
						isDisabled: local.disabled ?? false
					})}
				>
					<Scrollbar
						direction='vertical'
						style={{
							width: '100%',
							height: '100%',
							flex: '1',
							'min-height': '0'
						}}
					>
						<For each={local.options}>
							{option => {
								const isSelected = () => option.value === local.value
								const isDisabled = () => option.disabled ?? false

								return (
									<div
										onClick={() => {
											if (!isDisabled()) {
												handleSelect(option.value)
											}
										}}
										style={{
											...selectStyles.option({
												isDark: isDark(),
												isOpen: isOpen(),
												isDisabled: isDisabled()
											}),
											...(isSelected()
												? selectStyles.optionSelected({
														isDark: isDark(),
														isOpen: isOpen(),
														isDisabled: isDisabled()
													})
												: {}),
											...(isDisabled() ? selectStyles.optionDisabled() : {})
										}}
										onMouseEnter={e => {
											if (!isDisabled()) {
												if (isSelected()) {
													Object.assign(
														e.currentTarget.style,
														selectStyles.optionSelectedHover({
															isDark: isDark(),
															isOpen: isOpen(),
															isDisabled: isDisabled()
														})
													)
												} else {
													Object.assign(
														e.currentTarget.style,
														selectStyles.optionHover({
															isDark: isDark(),
															isOpen: isOpen(),
															isDisabled: isDisabled()
														})
													)
												}
											}
										}}
										onMouseLeave={e => {
											if (!isDisabled()) {
												if (isSelected()) {
													Object.assign(
														e.currentTarget.style,
														selectStyles.optionSelected({
															isDark: isDark(),
															isOpen: isOpen(),
															isDisabled: isDisabled()
														})
													)
												} else {
													e.currentTarget.style.background = 'transparent'
												}
											}
										}}
									>
										<span style={selectStyles.optionLabel()}>
											{option.label}
										</span>
										<Show when={option.description}>
											<span
												style={selectStyles.optionDescription({
													isDark: isDark(),
													isOpen: isOpen(),
													isDisabled: isDisabled()
												})}
											>
												{option.description}
											</span>
										</Show>
									</div>
								)
							}}
						</For>
					</Scrollbar>
				</div>
			</Show>
		</div>
	)
}
