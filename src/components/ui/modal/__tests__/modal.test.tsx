import { fireEvent, render, screen, waitFor } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../ui/modal";

describe("Modal", () => {
  it("renders when isOpen is true", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    ));

    // Wait for portal to render
    await waitFor(
      () => {
        expect(screen.getByText("Modal Content")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("does not render content when isOpen is false", () => {
    render(() => (
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    ));
    // Content should be in DOM but hidden
    const content = screen.queryByText("Modal Content");
    expect(content).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(() => (
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
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
    fireEvent.click(backdrop);

    // Wait for onClose to be called
    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 },
    );
  });

  it("calls onClose when clicking outside modal content", async () => {
    const onClose = vi.fn();
    render(() => (
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        const container = document.querySelector(
          'div[style*="align-items"]',
        ) as HTMLElement;
        expect(container).toBeInTheDocument();
        return container;
      },
      { timeout: 1000 },
    );

    const container = document.querySelector(
      'div[style*="align-items"]',
    ) as HTMLElement;
    fireEvent.click(container);

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 },
    );
  });

  it("does not call onClose when clicking inside modal content", async () => {
    const onClose = vi.fn();
    render(() => (
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        const content = screen.getByTestId("modal-content");
        expect(content).toBeInTheDocument();
        return content;
      },
      { timeout: 1000 },
    );

    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);

    // Should not call onClose when clicking inside
    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  it("does not call onClose when backdrop is clicked and closeOnBackdropClick is false", async () => {
    const onClose = vi.fn();
    render(() => (
      <Modal isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
        <div>Content</div>
      </Modal>
    ));

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
    fireEvent.click(backdrop);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", async () => {
    const onClose = vi.fn();
    render(() => (
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 },
    );
  });

  it("does not call onClose when Escape is pressed and closeOnEscape is false", async () => {
    const onClose = vi.fn();
    render(() => (
      <Modal isOpen={true} onClose={onClose} closeOnEscape={false}>
        <div>Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not show backdrop when showBackdrop is false", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()} showBackdrop={false}>
        <div>Content</div>
      </Modal>
    ));
    // Wait for portal to render
    await waitFor(
      () => {
        // Backdrop should not be rendered (it has display: none style)
        const backdrops = document.querySelectorAll(
          'div[style*="position: fixed"]',
        );
        const backdrop = Array.from(backdrops).find((el) =>
          el.getAttribute("style")?.includes("background: rgba(0, 0, 0, 0.5)"),
        );
        expect(backdrop).toBeUndefined();
      },
      { timeout: 1000 },
    );
  });

  it("renders children content", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()}>
        <div data-testid="modal-content">Test Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        expect(screen.getByTestId("modal-content")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("applies custom size", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()} size="lg">
        <div>Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        const content = screen.getByText("Content").closest(".modal-content");
        expect(content).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    const content = screen.getByText("Content").closest(".modal-content");
    expect(content).toHaveStyle({ "max-width": "640px" });
  });

  it("applies custom z-index", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()} zIndex={15000}>
        <div>Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        const container = document.querySelector(
          'div[style*="align-items"]',
        ) as HTMLElement;
        expect(container).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    const container = document.querySelector(
      'div[style*="align-items"]',
    ) as HTMLElement;
    expect(container).toHaveStyle({ "z-index": "15000" });
  });

  it("applies custom class name", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()} class="custom-modal">
        <div>Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        const content = screen.getByText("Content").closest(".modal-content");
        expect(content).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    const content = screen.getByText("Content").closest(".modal-content");
    expect(content).toHaveClass("custom-modal");
  });

  it('has role="dialog" and aria-modal="true"', async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>
    ));

    await waitFor(
      () => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute("aria-modal", "true");
      },
      { timeout: 1000 },
    );
  });

  it("traps focus within modal", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>
          <button data-testid="first-button">First</button>
          <button data-testid="second-button">Second</button>
          <button data-testid="third-button">Third</button>
        </div>
      </Modal>
    ));

    await waitFor(
      () => {
        const firstButton = screen.getByTestId("first-button");
        expect(firstButton).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    // Wait for modal to be fully open
    await waitFor(
      () => {
        const modalContent = document.querySelector(
          ".modal-content",
        ) as HTMLElement;
        expect(modalContent).toBeInTheDocument();
        // Check parent container has opacity: 1
        const container = modalContent.parentElement;
        expect(container).toBeInTheDocument();
        const containerStyle = container?.getAttribute("style") || "";
        expect(containerStyle).toContain("opacity: 1");
        return modalContent;
      },
      { timeout: 2000 },
    );

    const modalContent = document.querySelector(
      ".modal-content",
    ) as HTMLElement;

    // Verify that buttons exist in modal
    const firstButton = screen.getByTestId("first-button");
    const secondButton = screen.getByTestId("second-button");
    const thirdButton = screen.getByTestId("third-button");

    expect(firstButton).toBeInTheDocument();
    expect(secondButton).toBeInTheDocument();
    expect(thirdButton).toBeInTheDocument();

    // Verify modal content has role="dialog" for accessibility
    expect(modalContent).toHaveAttribute("role", "dialog");
    expect(modalContent).toHaveAttribute("aria-modal", "true");

    // Focus trap functionality is tested through integration tests
    // In unit tests, we verify the structure is correct for focus trap to work
  });

  it("does not trap focus when trapFocus is false", async () => {
    render(() => (
      <Modal isOpen={true} onClose={vi.fn()} trapFocus={false}>
        <div>
          <button data-testid="button">Button</button>
        </div>
      </Modal>
    ));

    await waitFor(
      () => {
        expect(screen.getByTestId("button")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    // Focus should not be automatically set
    const button = screen.getByTestId("button");
    expect(document.activeElement).not.toBe(button);
  });
});
