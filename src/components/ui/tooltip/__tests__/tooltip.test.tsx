import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { Tooltip } from '../ui/tooltip'

describe('Tooltip', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('renders trigger element', () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={0} isDark={false}>
				<button>Hover me</button>
			</Tooltip>
		))
		expect(screen.getByText('Hover me')).toBeInTheDocument()
	})

	it('shows tooltip on hover', async () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={0} isDark={false}>
				<button>Hover me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Hover me').closest('span')
		if (trigger) {
			fireEvent.mouseEnter(trigger)
			vi.advanceTimersByTime(100)
		}

		await waitFor(
			() => {
				expect(screen.getByText('Tooltip text')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('hides tooltip on mouse leave', async () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={0} isDark={false}>
				<button>Hover me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Hover me').closest('span')
		if (trigger) {
			fireEvent.mouseEnter(trigger)
			vi.advanceTimersByTime(100)
		}

		await waitFor(
			() => {
				expect(screen.getByText('Tooltip text')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)

		if (trigger) {
			fireEvent.mouseLeave(trigger)
			vi.advanceTimersByTime(200)
		}

		await waitFor(
			() => {
				expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('shows tooltip on focus when showOnFocus is true', async () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={0} showOnFocus={true} isDark={false}>
				<button>Focus me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Focus me').closest('span')
		if (trigger) {
			fireEvent.focus(trigger)
			vi.advanceTimersByTime(100)
		}

		await waitFor(
			() => {
				expect(screen.getByText('Tooltip text')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('does not show tooltip on focus when showOnFocus is false', async () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={0} showOnFocus={false} isDark={false}>
				<button>Focus me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Focus me').closest('span')
		if (trigger) {
			fireEvent.focus(trigger)
			vi.advanceTimersByTime(500)
		}

		expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
	})

	it('applies custom delay', async () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={500} isDark={false}>
				<button>Hover me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Hover me').closest('span')
		if (trigger) {
			fireEvent.mouseEnter(trigger)
			vi.advanceTimersByTime(200)
		}

		// Should not appear immediately
		expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()

		// Advance more time
		if (trigger) {
			vi.advanceTimersByTime(400)
		}

		await waitFor(
			() => {
				expect(screen.getByText('Tooltip text')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('renders tooltip with role="tooltip"', async () => {
		render(() => (
			<Tooltip content="Tooltip text" delay={0} isDark={false}>
				<button>Hover me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Hover me').closest('span')
		if (trigger) {
			fireEvent.mouseEnter(trigger)
			vi.advanceTimersByTime(100)
		}

		await waitFor(
			() => {
				const tooltip = screen.getByRole('tooltip')
				expect(tooltip).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})

	it('supports JSX content', async () => {
		render(() => (
			<Tooltip
				content={<div data-testid="custom-content">Custom JSX</div>}
				delay={0}
				isDark={false}
			>
				<button>Hover me</button>
			</Tooltip>
		))

		const trigger = screen.getByText('Hover me').closest('span')
		if (trigger) {
			fireEvent.mouseEnter(trigger)
			vi.advanceTimersByTime(100)
		}

		await waitFor(
			() => {
				expect(screen.getByTestId('custom-content')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
	})
})
