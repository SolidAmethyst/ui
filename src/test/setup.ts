import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock webidl-conversions
vi.mock('webidl-conversions', () => ({
	default: new Map()
}))
