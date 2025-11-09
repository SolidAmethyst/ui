/**
 * Button Component
 * Based on Tauri project button implementation
 */

import { Component, Show } from 'solid-js'
import { DrawerIcon } from '../lib/drawer-icon'
import type { ButtonProps } from '../model/types'

export const Button: Component<ButtonProps> = props => {
	const getButtonClass = () => {
		let baseClass = 'control-btn'

		if (props.variant === 'play-pause') {
			baseClass = 'play-pause-btn'
		} else if (props.variant === 'small') {
			baseClass = 'control-btn small-btn'
		} else if (props.variant === 'close') {
			baseClass = 'control-btn close-btn'
		} else if (props.variant === 'minimize') {
			baseClass = 'control-btn minimize-btn'
		} else if (props.variant === 'maximize') {
			baseClass = 'control-btn maximize-btn'
		} else if (props.variant === 'pin') {
			baseClass = 'control-btn pin-btn'
		} else if (props.variant === 'expand') {
			baseClass = 'control-btn expand-btn'
		} else if (props.variant === 'copy') {
			baseClass = 'control-btn copy-btn'
		} else if (props.variant === 'attach') {
			baseClass = 'control-btn attach-btn'
		} else if (props.variant === 'trigger') {
			baseClass = 'control-btn trigger-btn'
		}

		if (props.active) {
			baseClass += ' active'
		}

		if (props.pinned) {
			baseClass += ' pinned'
		}

		if (props.maximized) {
			baseClass += ' maximized'
		}

		return `${baseClass} ${props.class || ''}`
	}

	const getIconSize = () => {
		if (props.variant === 'small') return '12px'
		if (props.variant === 'play-pause') return '20px'
		if (
			props.variant === 'expand' ||
			props.variant === 'copy' ||
			props.variant === 'attach' ||
			props.variant === 'trigger'
		)
			return '16px'
		return '14px'
	}

	const getDefaultIcon = () => {
		if (props.variant === 'pin' && !props.icon) return 'push_pin'
		if (props.variant === 'expand' && !props.icon) return 'open_in_full'
		if (props.variant === 'copy' && !props.icon) return 'content_copy'
		if (props.variant === 'attach' && !props.icon) return 'attach_file'
		if (props.variant === 'trigger' && !props.icon) return 'menu_open'
		return props.icon
	}

	const isIconOnly = () => {
		if (props.iconPosition === 'only') return true
		const defaultIcon = getDefaultIcon()
		const hasIconContent = defaultIcon || props.icon
		const isIconVariant =
			props.variant === 'pin' ||
			props.variant === 'expand' ||
			props.variant === 'copy' ||
			props.variant === 'attach' ||
			props.variant === 'trigger' ||
			props.variant === 'close' ||
			props.variant === 'minimize' ||
			props.variant === 'maximize' ||
			props.variant === 'play-pause'
		return (
			(hasIconContent && !props.children) || (isIconVariant && !props.children)
		)
	}
	const hasIcon = () => {
		const defaultIcon = getDefaultIcon()
		return (defaultIcon || props.icon) && props.iconPosition !== 'only'
	}
	const showLeftIcon = () =>
		hasIcon() && (props.iconPosition === 'left' || !props.iconPosition)
	const showRightIcon = () => hasIcon() && props.iconPosition === 'right'

	return (
		<button
			type={props.type || 'button'}
			class={getButtonClass()}
			disabled={props.disabled || props.loading}
			onClick={() => props.onClick?.()}
			title={props.title}
			style={props.style}
		>
			<Show when={props.loading}>
				<span
					class='material-symbols-rounded'
					style={{
						animation: 'spin 1s linear infinite',
						'font-size': getIconSize()
					}}
				>
					refresh
				</span>
			</Show>

			<Show when={!props.loading && (showLeftIcon() || isIconOnly())}>
				{props.variant === 'trigger' && !props.icon ? (
					<DrawerIcon
						isOpen={props.active ?? false}
						size={parseInt(getIconSize().replace('px', '')) || 16}
						color={props.style?.color as string}
					/>
				) : (
					<span
						class={`material-symbols-rounded ${
							props.iconFilled ? 'filled' : ''
						}`}
						aria-hidden='true'
						style={{
							'font-size': getIconSize(),
							color: props.style?.color || 'inherit'
						}}
					>
						{getDefaultIcon()}
					</span>
				)}
			</Show>

			<Show when={!isIconOnly()}>{props.children}</Show>

			<Show when={!props.loading && showRightIcon()}>
				<span
					class={`material-symbols-rounded ${props.iconFilled ? 'filled' : ''}`}
					aria-hidden='true'
					style={{
						'font-size': getIconSize(),
						color: props.style?.color || 'inherit'
					}}
				>
					{getDefaultIcon()}
				</span>
			</Show>
		</button>
	)
}
