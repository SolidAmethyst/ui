// DOM setup for tests
// This file sets up the testing environment with necessary mocks

import { vi } from "vitest";

// Mock getComputedStyle for consistent test results
Object.defineProperty(window, "getComputedStyle", {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => "1"),
  })),
  writable: true,
  configurable: true,
});
