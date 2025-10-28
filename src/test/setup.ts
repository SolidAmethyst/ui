import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock webidl-conversions
vi.mock('webidl-conversions', () => ({
  get: () => ({}),
  set: () => ({}),
  has: () => false,
  delete: () => false,
  entries: () => [],
  keys: () => [],
  values: () => [],
  forEach: () => {},
  size: 0
}))
