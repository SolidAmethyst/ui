/**
 * TechChip Component Tests
 */

import { render } from "@solidjs/testing-library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TechChip } from "../ui/tech-chip";

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
global.ResizeObserver = mockResizeObserver.mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock MutationObserver
const mockMutationObserver = vi.fn();
global.MutationObserver = mockMutationObserver.mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => "1"),
  })),
});

describe("TechChip", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders with label and icon", () => {
    const { container } = render(() => (
      <TechChip
        label="TypeScript"
        icon="code"
        status="ready"
        variant="frontend"
      />
    ));

    expect(container.textContent).toContain("TypeScript");
    expect(container.textContent).toContain("code");
  });

  it("applies correct variant data attribute", () => {
    const { container } = render(() => (
      <TechChip label="Rust" icon="memory" status="ready" variant="backend" />
    ));

    const chip = container.querySelector('[data-variant="backend"]');
    expect(chip).toBeInTheDocument();
  });

  it("displays correct status data attribute", () => {
    const { container } = render(() => (
      <TechChip
        label="Engine"
        icon="precision_manufacturing"
        status="loading"
        variant="engine"
      />
    ));

    const chip = container.querySelector('[data-status="loading"]');
    expect(chip).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();

    const { container } = render(() => (
      <TechChip
        label="TypeScript"
        icon="code"
        status="ready"
        variant="frontend"
        onClick={handleClick}
      />
    ));

    const chip = container.querySelector('[role="status"]');
    expect(chip).toBeInTheDocument();
    chip?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders all status states", () => {
    const statuses: Array<"loading" | "ready" | "error"> = [
      "loading",
      "ready",
      "error",
    ];

    for (const status of statuses) {
      const { container } = render(() => (
        <TechChip label="Test" icon="code" status={status} variant="frontend" />
      ));

      const chip = container.querySelector(`[data-status="${status}"]`);
      expect(chip).toBeInTheDocument();
    }
  });

  it("renders all variants", () => {
    const variants: Array<"frontend" | "backend" | "engine"> = [
      "frontend",
      "backend",
      "engine",
    ];

    for (const variant of variants) {
      const { container } = render(() => (
        <TechChip label="Test" icon="code" status="ready" variant={variant} />
      ));

      const chip = container.querySelector(`[data-variant="${variant}"]`);
      expect(chip).toBeInTheDocument();
    }
  });

  it("applies custom className", () => {
    const { container } = render(() => (
      <TechChip
        label="TypeScript"
        icon="code"
        status="ready"
        variant="frontend"
        class="custom-class"
      />
    ));

    const chip = container.querySelector(".custom-class");
    expect(chip).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    const { container } = render(() => (
      <TechChip
        label="TypeScript"
        icon="code"
        status="ready"
        variant="frontend"
      />
    ));

    const chip = container.querySelector('[role="status"]');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAttribute("aria-label", "TypeScript status: ready");
  });

  it("renders without onClick handler", () => {
    const { container } = render(() => (
      <TechChip
        label="TypeScript"
        icon="code"
        status="ready"
        variant="frontend"
      />
    ));

    const chip = container.querySelector('[role="status"]');
    expect(chip).toBeInTheDocument();

    // Should not throw when clicked without onClick
    chip?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Verify component still exists after click
    expect(chip).toBeInTheDocument();
  });

  it("renders without custom class", () => {
    const { container } = render(() => (
      <TechChip
        label="TypeScript"
        icon="code"
        status="ready"
        variant="frontend"
      />
    ));

    const chip = container.querySelector('[role="status"]');
    expect(chip).toBeInTheDocument();
    expect(chip?.className).not.toContain("undefined");
  });
});
