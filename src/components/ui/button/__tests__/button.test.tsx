import { render, screen } from "@solidjs/testing-library";
import { Button } from "../ui/button";
import { describe, expect, it, vi } from "vitest";

describe("Button", () => {
  it("renders with default props", () => {
    render(() => <Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("control-btn");
  });

  it("renders control button variant", () => {
    render(() => <Button variant="control">Control</Button>);
    const button = screen.getByRole("button", { name: /control/i });
    expect(button).toHaveClass("control-btn");
  });

  it("renders play-pause button variant", () => {
    render(() => <Button variant="play-pause">Play</Button>);
    const button = screen.getByRole("button", { name: /play/i });
    expect(button).toHaveClass("play-pause-btn");
  });

  it("renders small button variant", () => {
    render(() => (
      <Button
        variant="small"
        icon="settings"
        iconPosition="only"
        title="Settings"
      />
    ));
    const button = screen.getByRole("button", { name: /settings/i });
    expect(button).toHaveClass("control-btn", "small-btn");
  });

  it("renders close button variant", () => {
    render(() => (
      <Button variant="close" icon="close" iconPosition="only" title="Close" />
    ));
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toHaveClass("control-btn", "close-btn");
  });

  it("handles click events", () => {
    const onClick = vi.fn();
    render(() => <Button onClick={onClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(() => <Button disabled>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("shows loading state", () => {
    render(() => <Button loading>Loading</Button>);
    const button = screen.getByRole("button", { name: /loading/i });
    expect(
      button.querySelector(".material-symbols-rounded"),
    ).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("renders with icon on left", () => {
    render(() => (
      <Button icon="add" iconPosition="left">
        Add Item
      </Button>
    ));
    const button = screen.getByRole("button", { name: /add item/i });
    expect(
      button.querySelector(".material-symbols-rounded"),
    ).toBeInTheDocument();
  });

  it("renders with icon on right", () => {
    render(() => (
      <Button icon="arrow_forward" iconPosition="right">
        Next
      </Button>
    ));
    const button = screen.getByRole("button", { name: /next/i });
    expect(
      button.querySelector(".material-symbols-rounded"),
    ).toBeInTheDocument();
  });

  it("renders icon-only button", () => {
    render(() => <Button icon="close" iconPosition="only" title="Close" />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button.querySelector(".material-symbols-rounded")).toBeTruthy();
  });

  it("applies custom class names", () => {
    render(() => <Button class="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button", { name: /custom button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("renders with different button types", () => {
    render(() => <Button type="submit">Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("shows tooltip when title is provided", () => {
    render(() => <Button title="Tooltip Text">Hover Me</Button>);
    const button = screen.getByRole("button", { name: /hover me/i });
    expect(button).toHaveAttribute("title", "Tooltip Text");
  });

  it("shows active state", () => {
    render(() => <Button active>Active Button</Button>);
    const button = screen.getByRole("button", { name: /active button/i });
    expect(button).toHaveClass("active");
  });

  it("shows pinned state", () => {
    render(() => <Button pinned>Pinned Button</Button>);
    const button = screen.getByRole("button", { name: /pinned button/i });
    expect(button).toHaveClass("pinned");
  });

  it("shows maximized state", () => {
    render(() => <Button maximized>Maximized Button</Button>);
    const button = screen.getByRole("button", { name: /maximized button/i });
    expect(button).toHaveClass("maximized");
  });

  it("renders as anchor element when as='a'", () => {
    render(() => (
      <Button as="a" href="/login">
        Login
      </Button>
    ));
    const link = screen.getByRole("link", { name: /login/i });
    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe("a");
    expect(link).toHaveAttribute("href", "/login");
  });

  it("renders anchor with target and rel", () => {
    render(() => (
      <Button as="a" href="https://example.com" target="_blank" rel="noopener">
        External Link
      </Button>
    ));
    const link = screen.getByRole("link", { name: /external link/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("applies button classes when rendered as anchor", () => {
    render(() => (
      <Button as="a" href="/test" variant="primary">
        Link Button
      </Button>
    ));
    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toHaveClass("control-btn");
  });
});
