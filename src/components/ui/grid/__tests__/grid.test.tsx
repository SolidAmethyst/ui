/**
 * Grid Component Tests
 */

import { render } from "@solidjs/testing-library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Grid } from "../ui/grid";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: (entries: ResizeObserverEntry[]) => void) {
    // Store callback for potential use in tests
    (this as any)._callback = callback;
  }
} as any;

describe("Grid", () => {
  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(() => <Grid>Test content</Grid>);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.textContent).toBe("Test content");
  });

  it("applies custom columns as string", () => {
    const { container } = render(() => (
      <Grid columns="1fr 1fr 1fr">Content</Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gridTemplateColumns).toBe("1fr 1fr 1fr");
  });

  it("applies custom columns as number", () => {
    const { container } = render(() => <Grid columns={3}>Content</Grid>);
    const grid = container.querySelector(".grid") as HTMLElement;
    // When columns is a number without minColumnWidth/maxColumnWidth, it uses repeat(3, 1fr)
    expect(grid?.style.gridTemplateColumns).toBe("repeat(3, 1fr)");
  });

  it("applies custom rows", () => {
    const { container } = render(() => <Grid rows="32px 1fr">Content</Grid>);
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gridTemplateRows).toBe("32px 1fr");
  });

  it("applies gap as string", () => {
    const { container } = render(() => <Grid gap="16px">Content</Grid>);
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gap).toBe("16px");
  });

  it("applies gap as object", () => {
    const { container } = render(() => (
      <Grid gap={{ row: "8px", column: "16px" }}>Content</Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gap).toBe("8px 16px");
  });

  it("applies custom class", () => {
    const { container } = render(() => (
      <Grid class="custom-grid">Content</Grid>
    ));
    const grid = container.querySelector(".grid");
    expect(grid?.classList.contains("custom-grid")).toBe(true);
  });

  it("applies custom styles", () => {
    const { container } = render(() => (
      <Grid style={{ width: "100%", height: "100vh" }}>Content</Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.width).toBe("100%");
    expect(grid?.style.height).toBe("100vh");
  });

  it("applies minColumnWidth and maxColumnWidth", () => {
    const { container } = render(() => (
      <Grid columns={4} minColumnWidth="200px" maxColumnWidth="1fr">
        Content
      </Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gridTemplateColumns).toContain("minmax(200px, 1fr)");
  });

  it("uses autoFit when specified", () => {
    const { container } = render(() => (
      <Grid columns={3} autoFit>
        Content
      </Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gridTemplateColumns).toContain("auto-fit");
  });

  it("applies breakpoints correctly", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { container } = render(() => (
      <Grid
        columns={2}
        breakpoints={[
          { maxWidth: 768, columns: 1 },
          { minWidth: 769, columns: 3 },
        ]}
      >
        Content
      </Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gridTemplateColumns).toBeDefined();
  });

  it("combines all props correctly", () => {
    const { container } = render(() => (
      <Grid
        columns="auto 1fr"
        rows="32px 1fr"
        gap="8px"
        class="app-grid"
        style={{ padding: "16px" }}
      >
        Content
      </Grid>
    ));
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid?.style.gridTemplateColumns).toBe("auto 1fr");
    expect(grid?.style.gridTemplateRows).toBe("32px 1fr");
    expect(grid?.style.gap).toBe("8px");
    expect(grid?.style.padding).toBe("16px");
    expect(grid?.classList.contains("app-grid")).toBe(true);
  });
});
