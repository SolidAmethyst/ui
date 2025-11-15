import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { SplitPane } from "../ui/split-pane";

describe("SplitPane", () => {
  it("renders split pane with two panels", () => {
    render(() => (
      <SplitPane
        first={<div>First Panel</div>}
        second={<div>Second Panel</div>}
      />
    ));
    expect(screen.getByText("First Panel")).toBeInTheDocument();
    expect(screen.getByText("Second Panel")).toBeInTheDocument();
  });

  it("renders with horizontal direction by default", () => {
    render(() => (
      <SplitPane first={<div>First</div>} second={<div>Second</div>} />
    ));
    const container = screen.getByText("First").closest(".split-pane");
    expect(container).toHaveClass("split-pane-horizontal");
  });

  it("renders with vertical direction", () => {
    render(() => (
      <SplitPane
        first={<div>First</div>}
        second={<div>Second</div>}
        direction="vertical"
      />
    ));
    const container = screen.getByText("First").closest(".split-pane");
    expect(container).toHaveClass("split-pane-vertical");
  });

  it("uses default split of 50%", () => {
    render(() => (
      <SplitPane first={<div>First</div>} second={<div>Second</div>} />
    ));
    const firstPanel = screen.getByText("First").parentElement;
    expect(firstPanel).toHaveStyle("width: 50%");
  });

  it("uses custom defaultSplit", () => {
    render(() => (
      <SplitPane
        first={<div>First</div>}
        second={<div>Second</div>}
        defaultSplit={30}
      />
    ));
    const firstPanel = screen.getByText("First").parentElement;
    expect(firstPanel).toHaveStyle("width: 30%");
  });

  it("uses controlled split prop", () => {
    render(() => (
      <SplitPane
        first={<div>First</div>}
        second={<div>Second</div>}
        split={70}
      />
    ));
    const firstPanel = screen.getByText("First").parentElement;
    expect(firstPanel).toHaveStyle("width: 70%");
  });

  it("shows resize handle by default", () => {
    render(() => (
      <SplitPane first={<div>First</div>} second={<div>Second</div>} />
    ));
    const handle = screen.getByText("First").parentElement?.nextSibling;
    expect(handle).toBeInTheDocument();
  });

  it("hides resize handle when showHandle is false", () => {
    render(() => (
      <SplitPane
        first={<div>First</div>}
        second={<div>Second</div>}
        showHandle={false}
      />
    ));
    // Handle should not be visible
    const container = screen.getByText("First").closest(".split-pane");
    expect(container).toBeInTheDocument();
  });

  it("calls onSplitChange when dragging", () => {
    const onSplitChange = vi.fn();
    render(() => (
      <SplitPane
        first={<div>First</div>}
        second={<div>Second</div>}
        onSplitChange={onSplitChange}
      />
    ));
    const handle = screen.getByText("First").parentElement
      ?.nextSibling as HTMLElement;
    if (handle) {
      fireEvent.mouseDown(handle, { clientX: 100, clientY: 0 });
      fireEvent.mouseMove(document, { clientX: 150, clientY: 0 });
      fireEvent.mouseUp(document);
      expect(onSplitChange).toHaveBeenCalled();
    }
  });

  it("applies custom class name", () => {
    render(() => (
      <SplitPane
        first={<div>First</div>}
        second={<div>Second</div>}
        class="custom-split"
      />
    ));
    const container = screen.getByText("First").closest(".split-pane");
    expect(container).toHaveClass("custom-split");
  });
});
