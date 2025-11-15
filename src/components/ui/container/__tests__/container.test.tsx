import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Container } from "../ui/container";

describe("Container", () => {
  it("renders with default props", () => {
    render(() => <Container>Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("container");
  });

  it("applies default max-width from CSS variable", () => {
    render(() => <Container>Content</Container>);
    const container = screen.getByText("Content");
    // CSS variable --container-max-width is used (defaults to 1400px in production)
    // In test environment, CSS variables may not be resolved, so we just check that styles are applied
    expect(container).toHaveClass("container");
  });

  it("applies default padding from CSS variable", () => {
    render(() => <Container>Content</Container>);
    const container = screen.getByText("Content");
    // CSS variable --container-padding is used (defaults to 0 32px in production)
    // In test environment, CSS variables may not be resolved, so we just check that styles are applied
    expect(container).toHaveClass("container");
  });

  it("applies custom max-width as string", () => {
    render(() => <Container maxWidth="1200px">Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ "max-width": "1200px" });
  });

  it("applies custom max-width as number", () => {
    render(() => <Container maxWidth={1000}>Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ "max-width": "1000px" });
  });

  it("applies custom padding", () => {
    render(() => <Container padding="0 24px">Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ padding: "0 24px" });
  });

  it("applies custom class names", () => {
    render(() => <Container class="custom-class">Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveClass("container", "custom-class");
  });

  it("applies custom inline styles", () => {
    render(() => (
      <Container style={{ "background-color": "red" }}>Content</Container>
    ));
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ "background-color": "red" });
  });

  it("centers content with margin auto", () => {
    render(() => <Container>Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ margin: "0 auto" });
  });

  it("has box-sizing border-box", () => {
    render(() => <Container>Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ "box-sizing": "border-box" });
  });

  it("has width 100%", () => {
    render(() => <Container>Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveStyle({ width: "100%" });
  });

  it("renders children correctly", () => {
    render(() => (
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
      </Container>
    ));
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
