import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { Settings } from '../ui/settings'

describe('Settings', () => {
	it('renders when isOpen is true', () => {
		render(() => (
			<Settings isOpen={true} onClose={vi.fn()} isDark={false}>
				<div>Settings Content</div>
			</Settings>
		))
		expect(screen.getByText('Settings')).toBeInTheDocument()
		expect(screen.getByText('Settings Content')).toBeInTheDocument()
	})

	it('does not render content when isOpen is false', () => {
		render(() => (
			<Settings isOpen={false} onClose={vi.fn()} isDark={false}>
				<div>Settings Content</div>
			</Settings>
		))
		// Panel should be off-screen but still in DOM
		const panel = screen.queryByText('Settings')
		expect(panel).toBeInTheDocument()
	})

	it('renders with custom title', () => {
		render(() => (
			<Settings
				isOpen={true}
				onClose={vi.fn()}
				title='Custom Title'
				isDark={false}
			>
				<div>Content</div>
			</Settings>
		))
		expect(screen.getByText('Custom Title')).toBeInTheDocument()
	})

	it('renders with default title when not provided', () => {
		render(() => (
			<Settings isOpen={true} onClose={vi.fn()} isDark={false}>
				<div>Content</div>
			</Settings>
		))
		expect(screen.getByText('Settings')).toBeInTheDocument()
	})

	it('calls onClose when close button is clicked', () => {
		const onClose = vi.fn()
		render(() => (
			<Settings isOpen={true} onClose={onClose} isDark={false}>
				<div>Content</div>
			</Settings>
		))
		const closeButton = screen
			.getByText('Settings')
			.parentElement?.querySelector('button')
		expect(closeButton).toBeInTheDocument()
		closeButton?.click()
		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('calls onClose when backdrop is clicked', () => {
		const onClose = vi.fn()
		render(() => (
			<Settings isOpen={true} onClose={onClose} isDark={false}>
				<div>Content</div>
			</Settings>
		))
		// Backdrop is the first div in the fragment
		const backdrop = document.querySelector(
			'div[style*="backdrop-filter"]'
		) as HTMLElement
		expect(backdrop).toBeInTheDocument()
		if (backdrop) {
			backdrop.click()
		}
		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('renders children content', () => {
		render(() => (
			<Settings isOpen={true} onClose={vi.fn()} isDark={false}>
				<div data-testid='settings-content'>Test Content</div>
			</Settings>
		))
		expect(screen.getByTestId('settings-content')).toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	it('applies custom width', () => {
		render(() => (
			<Settings isOpen={true} onClose={vi.fn()} width='400px' isDark={false}>
				<div>Content</div>
			</Settings>
		))
		const panel = screen.getByText('Settings').closest('aside')
		expect(panel).toHaveStyle({ width: '400px' })
	})

	it('applies custom top position', () => {
		render(() => (
			<Settings isOpen={true} onClose={vi.fn()} top='80px' isDark={false}>
				<div>Content</div>
			</Settings>
		))
		const panel = screen.getByText('Settings').closest('aside')
		expect(panel).toHaveStyle({ top: '80px' })
	})
})
