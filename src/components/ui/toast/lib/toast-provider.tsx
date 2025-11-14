/**
 * Toast Provider
 * Context provider for toast notifications
 */

import {
	Component,
	createContext,
	createSignal,
	useContext
} from 'solid-js'
import { ToastContainer } from './toast-container'
import type {
	Toast,
	ToastContextValue,
	ToastProviderProps
} from '../model/types'

const ToastContext = createContext<ToastContextValue>()

let toastIdCounter = 0

export const ToastProvider: Component<ToastProviderProps> = props => {
	const [toasts, setToasts] = createSignal<Toast[]>([])
	const position = () => props.position ?? 'top-right'
	const duration = () => props.duration ?? 5000
	const isDark = () => props.isDark ?? true

	const showToast = (toastData: Omit<Toast, 'id'>): string => {
		const id = `toast-${++toastIdCounter}`
		const toast: Toast = {
			...toastData,
			id,
			duration: toastData.duration ?? duration()
		}

		setToasts(prev => [...prev, toast])

		// Auto-dismiss after duration
		if (toast.duration && toast.duration > 0) {
			setTimeout(() => {
				dismissToast(id)
			}, toast.duration)
		}

		return id
	}

	const dismissToast = (id: string) => {
		setToasts(prev => {
			const toast = prev.find(t => t.id === id)
			if (toast?.onClose) {
				toast.onClose()
			}
			return prev.filter(t => t.id !== id)
		})
	}

	const dismissAll = () => {
		toasts().forEach(toast => {
			if (toast.onClose) {
				toast.onClose()
			}
		})
		setToasts([])
	}

	const contextValue: ToastContextValue = {
		toasts,
		showToast,
		dismissToast,
		dismissAll
	}

	return (
		<ToastContext.Provider value={contextValue}>
			{props.children}
			<ToastContainer
				toasts={toasts()}
				position={position()}
				isDark={isDark()}
				onClose={dismissToast}
			/>
		</ToastContext.Provider>
	)
}

export const useToast = (): ToastContextValue => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within ToastProvider')
	}
	return context
}
