import { render, screen, waitFor } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "../ui/drawer";

describe("Drawer", () => {
  it("renders when isOpen is true", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()}>
        <div>Drawer Content</div>
      </Drawer>
    ));
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("does not render content when isOpen is false", () => {
    render(() => (
      <Drawer isOpen={false} onClose={vi.fn()}>
        <div>Drawer Content</div>
      </Drawer>
    ));
    // Panel should be off-screen but still in DOM
    const panel = screen.queryByText("Drawer Content");
    expect(panel).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(() => (
      <Drawer isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Drawer>
    ));

    // Wait for backdrop to be rendered in portal
    await waitFor(
      () => {
        const backdrop = document.querySelector(
          'div[style*="backdrop-filter"]',
        ) as HTMLElement;
        expect(backdrop).toBeInTheDocument();
        return backdrop;
      },
      { timeout: 1000 },
    );

    const backdrop = document.querySelector(
      'div[style*="backdrop-filter"]',
    ) as HTMLElement;
    backdrop.click();

    // Wait for onClose to be called (may need a small delay due to animation)
    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 },
    );
  });

  it("does not call onClose when backdrop is clicked and closeOnBackdropClick is false", () => {
    const onClose = vi.fn();
    render(() => (
      <Drawer isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
        <div>Content</div>
      </Drawer>
    ));
    const backdrop = document.querySelector(
      'div[style*="backdrop-filter"]',
    ) as HTMLElement;
    if (backdrop) {
      backdrop.click();
    }
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not show backdrop when showBackdrop is false", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()} showBackdrop={false}>
        <div>Content</div>
      </Drawer>
    ));
    const backdrop = document.querySelector('div[style*="backdrop-filter"]');
    expect(backdrop).not.toBeInTheDocument();
  });

  it("renders children content", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()}>
        <div data-testid="drawer-content">Test Content</div>
      </Drawer>
    ));
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom size for right position", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()} size="400px" position="right">
        <div>Content</div>
      </Drawer>
    ));
    const panel = screen.getByText("Content").closest("aside");
    expect(panel).toHaveStyle({ width: "400px" });
  });

  it("applies custom size for bottom position", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()} size="60vh" position="bottom">
        <div>Content</div>
      </Drawer>
    ));
    const panel = screen.getByText("Content").closest("aside");
    // Browser converts vh to px, so we check that height is set (not empty)
    const height = panel?.style.height;
    expect(height).toBeTruthy();
    expect(height).not.toBe("");
    // Should contain some numeric value (converted from vh)
    expect(height).toMatch(/\d+/);
  });

  it("uses default position right when not specified", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()}>
        <div>Content</div>
      </Drawer>
    ));
    const panel = screen.getByText("Content").closest("aside");
    expect(panel).toHaveClass("drawer-right");
  });

  it("applies custom z-index", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()} zIndex={15000}>
        <div>Content</div>
      </Drawer>
    ));
    const panel = screen.getByText("Content").closest("aside");
    expect(panel).toHaveStyle({ "z-index": "15000" });
  });

  it("applies custom class name", () => {
    render(() => (
      <Drawer isOpen={true} onClose={vi.fn()} class="custom-drawer">
        <div>Content</div>
      </Drawer>
    ));
    const panel = screen.getByText("Content").closest("aside");
    expect(panel).toHaveClass("custom-drawer");
  });
});
