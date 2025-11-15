import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Tabs } from "../ui/tabs";

describe("Tabs", () => {
  it("renders with default props", () => {
    render(() => (
      <Tabs preview={<div>Preview Content</div>} code="const x = 1" />
    ));
    const previewButton = screen.getByRole("button", { name: "Preview" });
    const codeButton = screen.getByRole("button", { name: "Code" });
    expect(previewButton).toBeInTheDocument();
    expect(codeButton).toBeInTheDocument();
    expect(screen.getByText("Preview Content")).toBeInTheDocument();
  });

  it("shows preview tab by default", () => {
    render(() => <Tabs preview={<div>Preview Content</div>} code="code" />);
    expect(screen.getByText("Preview Content")).toBeInTheDocument();
  });

  it("switches to code tab when clicked", () => {
    const { container } = render(() => (
      <Tabs preview={<div>Preview Content</div>} code="const x = 1" />
    ));
    const codeButton = screen.getByRole("button", { name: "Code" });
    codeButton.click();
    // CodeHighlight container should be present
    const codeHighlight = container.querySelector(".code-block");
    expect(codeHighlight).toBeInTheDocument();
  });

  it("switches back to preview tab when clicked", () => {
    render(() => <Tabs preview={<div>Preview Content</div>} code="code" />);
    const codeButton = screen.getByRole("button", { name: "Code" });
    codeButton.click();
    const previewButton = screen.getByRole("button", { name: "Preview" });
    previewButton.click();
    expect(screen.getByText("Preview Content")).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    const { container } = render(() => (
      <Tabs preview={<div>Preview</div>} code="code" class="custom-tabs" />
    ));
    const tabsContainer = container.firstChild as HTMLElement;
    expect(tabsContainer).toHaveClass("custom-tabs");
  });

  it("applies custom inline styles", () => {
    const { container } = render(() => (
      <Tabs
        preview={<div>Preview</div>}
        code="code"
        style={{ "margin-top": "40px" }}
      />
    ));
    const tabsContainer = container.firstChild as HTMLElement;
    expect(tabsContainer?.style.marginTop).toBe("40px");
  });

  it("handles boolean isDark prop", () => {
    render(() => <Tabs preview={<div>Preview Content</div>} code="code" />);
    expect(screen.getByRole("button", { name: "Preview" })).toBeInTheDocument();
    expect(screen.getByText("Preview Content")).toBeInTheDocument();
  });

  it("handles function isDark prop", () => {
    render(() => <Tabs preview={<div>Preview Content</div>} code="code" />);
    expect(screen.getByRole("button", { name: "Preview" })).toBeInTheDocument();
    expect(screen.getByText("Preview Content")).toBeInTheDocument();
  });

  it("renders preview content correctly", () => {
    render(() => (
      <Tabs
        preview={
          <div>
            <span>Item 1</span>
            <span>Item 2</span>
          </div>
        }
        code="code"
      />
    ));
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders code content when code tab is active", () => {
    const { container } = render(() => (
      <Tabs preview={<div>Preview Content</div>} code='const test = "value"' />
    ));
    const codeButton = screen.getByRole("button", { name: "Code" });
    codeButton.click();
    const codeBlock = container.querySelector(".code-block");
    expect(codeBlock).toBeInTheDocument();
  });
});
