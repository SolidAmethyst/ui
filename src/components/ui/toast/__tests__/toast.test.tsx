import { render, screen, waitFor } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { ToastProvider, useToast } from '../lib/toast-provider'

// Test component that uses toast
const TestComponent = () => {
	const toast = useToast()

	return (
		<div>
			<button
				data-testid="show-success"
				onClick={() => toast.showToast({ variant: 'success', title: 'Success!' })}
			>
				Show Success
			</button>
			<button
				data-testid="show-error"
				onClick={() => toast.showToast({ variant: 'error', title: 'Error!' })}
			>
				Show Error
			</button>
			<button
				data-testid="dismiss-all"
				onClick={() => toast.dismissAll()}
			>
				Dismiss All
			</button>
		</div>
	)
}

describe('Toast System', () => {
	it('renders toast provider', () => {
		render(() => (
			<ToastProvider>
				<div>Test</div>
			</ToastProvider>
		))
		expect(screen.getByText('Test')).toBeInTheDocument()
	})

	it('shows toast when showToast is called', async () => {
		render(() => (
			<ToastProvider>
				<TestComponent />
			</ToastProvider>
		))

		const button = screen.getByTestId('show-success')
		button.click()

		await waitFor(
			() => {
				expect(screen.getByText('Success!')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('shows multiple toasts', async () => {
		render(() => (
			<ToastProvider>
				<TestComponent />
			</ToastProvider>
		))

		const successButton = screen.getByTestId('show-success')
		const errorButton = screen.getByTestId('show-error')

		successButton.click()
		errorButton.click()

		await waitFor(
			() => {
				expect(screen.getByText('Success!')).toBeInTheDocument()
				expect(screen.getByText('Error!')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('dismisses all toasts', async () => {
		render(() => (
			<ToastProvider>
				<TestComponent />
			</ToastProvider>
		))

		const successButton = screen.getByTestId('show-success')
		const errorButton = screen.getByTestId('show-error')
		const dismissButton = screen.getByTestId('dismiss-all')

		successButton.click()
		errorButton.click()

		await waitFor(
			() => {
				expect(screen.getByText('Success!')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)

		dismissButton.click()

		await waitFor(
			() => {
				expect(screen.queryByText('Success!')).not.toBeInTheDocument()
				expect(screen.queryByText('Error!')).not.toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('throws error when useToast is used outside provider', () => {
		// Suppress console.error for this test
		const consoleError = console.error
		console.error = vi.fn()

		expect(() => {
			render(() => {
				useToast()
				return <div>Test</div>
			})
		}).toThrow('useToast must be used within ToastProvider')

		console.error = consoleError
	})
})

