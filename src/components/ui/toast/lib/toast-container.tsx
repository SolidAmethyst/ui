/**
 * Toast Container
 * Container for rendering toast notifications
 */

import { Component, For } from 'solid-js'
import { toastStyles } from './toast.styles'
import { Toast as ToastItem } from '../ui/toast'
import type { Toast as ToastType, ToastPosition } from '../model/types'

interface ToastContainerProps {
	toasts: ToastType[]
	position: ToastPosition
	isDark: boolean
	onClose: (id: string) => void
}

export const ToastContainer: Component<ToastContainerProps> = props => {
	return (
		<div style={toastStyles.container(props.position)}>
			<For each={props.toasts}>
				{toast => (
					<ToastItem
						toast={toast}
						isDark={props.isDark}
						onClose={props.onClose}
					/>
				)}
			</For>
		</div>
	)
}

