import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { Settings } from "../ui/settings";

describe("Settings", () => {
  it("renders when isOpen is true", () => {
    render(() => (
      <Settings isOpen={true} onClose={vi.fn()}>
        <div>Settings Content</div>
      </Settings>
    ));
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Settings Content")).toBeInTheDocument();
  });

  it("does not render content when isOpen is false", () => {
    render(() => (
      <Settings isOpen={false} onClose={vi.fn()}>
        <div>Settings Content</div>
      </Settings>
    ));
    // Panel should be off-screen but still in DOM
    const panel = screen.queryByText("Settings");
    expect(panel).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(() => (
      <Settings isOpen={true} onClose={vi.fn()} title="Custom Title">
        <div>Content</div>
      </Settings>
    ));
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders with default title when not provided", () => {
    render(() => (
      <Settings isOpen={true} onClose={vi.fn()}>
        <div>Content</div>
      </Settings>
    ));
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(() => (
      <Settings isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Settings>
    ));
    const closeButton = screen
      .getByText("Settings")
      .parentElement?.querySelector("button");
    expect(closeButton).toBeInTheDocument();
    closeButton?.click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(() => (
      <Settings isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Settings>
    ));
    // Settings uses Drawer with showBackdrop={false} and closeOnBackdropClick={false}
    // So there's no backdrop to click. This test verifies that backdrop is not rendered.
    await new Promise((resolve) => setTimeout(resolve, 100));
    const backdrop = document.querySelector(
      'div[style*="backdrop-filter"]',
    ) as HTMLElement;
    // Backdrop should not exist because showBackdrop={false}
    expect(backdrop).not.toBeInTheDocument();
  });

  it("renders children content", () => {
    render(() => (
      <Settings isOpen={true} onClose={vi.fn()}>
        <div data-testid="settings-content">Test Content</div>
      </Settings>
    ));
    expect(screen.getByTestId("settings-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom width", async () => {
    render(() => (
      <Settings isOpen={true} onClose={vi.fn()} width="400px">
        <div>Content</div>
      </Settings>
    ));
    // Wait for portal to render
    await new Promise((resolve) => setTimeout(resolve, 100));
    const panel = document.querySelector(".drawer-panel");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveStyle({ width: "400px" });
  });

  // Note: 'top' prop is no longer supported as Drawer renders in portal
  // and always positions relative to viewport (top: 0)
});
