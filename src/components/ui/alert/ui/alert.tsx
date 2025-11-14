/**
 * Alert Component
 * Alert component for displaying inline messages
 */

import { Component, Show } from 'solid-js'
import { alertStyles } from '../lib/alert.styles'
import type { AlertProps } from '../model/types'

export const Alert: Component<AlertProps> = props => {
	const isDark = () => props.isDark ?? true
	const variant = () => props.variant ?? 'info'
	const showClose = () => props.showClose ?? false

	const getIcon = () => {
		const icons: Record<ReturnType<typeof variant>, string> = {
			success: 'check_circle',
			error: 'error',
			warning: 'warning',
			info: 'info'
		}
		return icons[variant()]
	}

	return (
		<div
			class={`alert alert-${variant()} ${props.class || ''}`}
			style={{
				...alertStyles.container(variant(), isDark()),
				...props.style
			}}
			role='alert'
		>
			<span
				class='material-symbols-rounded'
				style={alertStyles.icon(variant())}
			>
				{getIcon()}
			</span>
			<div style={alertStyles.content()}>
				<Show when={props.title}>
					<div style={alertStyles.title(isDark())}>{props.title}</div>
				</Show>
				<Show when={props.description}>
					<div style={alertStyles.description(isDark())}>
						{props.description}
					</div>
				</Show>
				<Show when={props.children && !props.description}>
					<div style={alertStyles.description(isDark())}>
						{props.children}
					</div>
				</Show>
			</div>
			<Show when={showClose() && props.onClose}>
				<button
					type='button'
					onClick={() => props.onClose?.()}
					style={alertStyles.closeButton(isDark())}
					aria-label='Close alert'
				>
					<span class='material-symbols-rounded' style={{ 'font-size': '16px' }}>
						close
					</span>
				</button>
			</Show>
		</div>
	)
}
