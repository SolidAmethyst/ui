import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock webidl-conversions before any imports
const mockWebIDLConversions = {
  get: () => ({}),
  set: () => ({}),
  has: () => false,
  delete: () => false,
  entries: () => [],
  keys: () => [],
  values: () => [],
  forEach: () => {},
  size: 0,
};

// Mock webidl-conversions
vi.mock("webidl-conversions", () => mockWebIDLConversions);
