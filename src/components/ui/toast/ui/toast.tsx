/**
 * Toast Component
 * Individual toast notification item
 */

import { Component, Show, createSignal, onMount } from 'solid-js'
import { toastStyles } from '../lib/toast.styles'
import type { ToastProps } from '../model/types'

export const Toast: Component<ToastProps> = props => {
	const isDark = () => props.isDark ?? true
	const [isVisible, setIsVisible] = createSignal(false)

	onMount(() => {
		// Trigger animation
		requestAnimationFrame(() => {
			setIsVisible(true)
		})
	})

	const handleClose = () => {
		setIsVisible(false)
		setTimeout(() => {
			props.onClose(props.toast.id)
		}, 200)
	}

	const getIcon = () => {
		const icons: Record<typeof props.toast.variant, string> = {
			success: 'check_circle',
			error: 'error',
			warning: 'warning',
			info: 'info'
		}
		return icons[props.toast.variant]
	}

	return (
		<div
			class={`toast-item ${props.toast.variant}`}
			style={toastStyles.toast(props.toast.variant, isDark(), isVisible())}
		>
			<span
				class='material-symbols-rounded'
				style={toastStyles.icon(props.toast.variant, isDark())}
			>
				{getIcon()}
			</span>
			<div style={toastStyles.content()}>
				<Show when={props.toast.title}>
					<div style={toastStyles.title(isDark())}>{props.toast.title}</div>
				</Show>
				<Show when={props.toast.description}>
					<div style={toastStyles.description(isDark())}>
						{props.toast.description}
					</div>
				</Show>
			</div>
			<button
				type='button'
				onClick={handleClose}
				style={toastStyles.closeButton(isDark())}
				aria-label='Close toast'
			>
				<span class='material-symbols-rounded' style={{ 'font-size': '16px' }}>
					close
				</span>
			</button>
		</div>
	)
}

