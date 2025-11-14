import { fireEvent, render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from '../ui/alert'

describe('Alert', () => {
	it('renders alert with default variant', () => {
		render(() => <Alert description="Test alert" isDark={false} />)
		const alert = screen.getByRole('alert')
		expect(alert).toBeInTheDocument()
		expect(alert).toHaveClass('alert-info')
	})

	it('renders alert with success variant', () => {
		render(() => <Alert variant="success" description="Success!" isDark={false} />)
		const alert = screen.getByRole('alert')
		expect(alert).toBeInTheDocument()
		expect(alert).toHaveClass('alert-success')
	})

	it('renders alert with error variant', () => {
		render(() => <Alert variant="error" description="Error!" isDark={false} />)
		const alert = screen.getByRole('alert')
		expect(alert).toBeInTheDocument()
		expect(alert).toHaveClass('alert-error')
	})

	it('renders alert with warning variant', () => {
		render(() => <Alert variant="warning" description="Warning!" isDark={false} />)
		const alert = screen.getByRole('alert')
		expect(alert).toBeInTheDocument()
		expect(alert).toHaveClass('alert-warning')
	})

	it('renders title when provided', () => {
		render(() => (
			<Alert title="Alert Title" description="Description" isDark={false} />
		))
		expect(screen.getByText('Alert Title')).toBeInTheDocument()
		expect(screen.getByText('Description')).toBeInTheDocument()
	})

	it('renders description when provided', () => {
		render(() => <Alert description="Test description" isDark={false} />)
		expect(screen.getByText('Test description')).toBeInTheDocument()
	})

	it('renders children when provided', () => {
		render(() => (
			<Alert isDark={false}>
				<div>Custom content</div>
			</Alert>
		))
		expect(screen.getByText('Custom content')).toBeInTheDocument()
	})

	it('shows close button when showClose is true', () => {
		render(() => (
			<Alert showClose={true} onClose={vi.fn()} description="Test" isDark={false} />
		))
		const closeButton = screen.getByLabelText('Close alert')
		expect(closeButton).toBeInTheDocument()
	})

	it('calls onClose when close button is clicked', () => {
		const onClose = vi.fn()
		render(() => (
			<Alert
				showClose={true}
				onClose={onClose}
				description="Test"
				isDark={false}
			/>
		))
		const closeButton = screen.getByLabelText('Close alert')
		fireEvent.click(closeButton)
		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('does not show close button by default', () => {
		render(() => <Alert description="Test" isDark={false} />)
		expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument()
	})

	it('applies custom class name', () => {
		render(() => <Alert class="custom-alert" description="Test" isDark={false} />)
		const alert = screen.getByRole('alert')
		expect(alert).toHaveClass('custom-alert')
	})

	it('renders correct icon for each variant', () => {
		const { unmount } = render(() => (
			<Alert variant="success" description="Test" isDark={false} />
		))
		expect(screen.getByText('check_circle')).toBeInTheDocument()
		unmount()

		render(() => <Alert variant="error" description="Test" isDark={false} />)
		expect(screen.getByText('error')).toBeInTheDocument()

		const { unmount: unmount2 } = render(() => (
			<Alert variant="warning" description="Test" isDark={false} />
		))
		expect(screen.getByText('warning')).toBeInTheDocument()
		unmount2()

		render(() => <Alert variant="info" description="Test" isDark={false} />)
		expect(screen.getByText('info')).toBeInTheDocument()
	})
})
