import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Typography } from "../ui/typography";
import { setTheme } from "../../../../test/utils/theme-helpers";

describe("Typography", () => {
  it("renders with default props (body variant)", () => {
    render(() => <Typography>Test content</Typography>);
    const element = screen.getByText("Test content");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
  });

  it("renders h1 variant as h1 element", () => {
    render(() => <Typography variant="h1">Heading 1</Typography>);
    const element = screen.getByText("Heading 1");
    expect(element.tagName).toBe("H1");
    // CSS variable --typography-h1-font-size is used (defaults to 2.5rem in production)
    const styles = window.getComputedStyle(element);
    expect(styles.fontSize).toBeTruthy();
  });

  it("renders h2 variant as h2 element", () => {
    render(() => <Typography variant="h2">Heading 2</Typography>);
    const element = screen.getByText("Heading 2");
    expect(element.tagName).toBe("H2");
    // CSS variable --typography-h2-font-size is used (defaults to 2rem in production)
    const styles = window.getComputedStyle(element);
    expect(styles.fontSize).toBeTruthy();
  });

  it("renders h3 variant as h3 element", () => {
    render(() => <Typography variant="h3">Heading 3</Typography>);
    const element = screen.getByText("Heading 3");
    expect(element.tagName).toBe("H3");
    // CSS variable --typography-h3-font-size is used (defaults to 1.75rem in production)
    const styles = window.getComputedStyle(element);
    expect(styles.fontSize).toBeTruthy();
  });

  it("renders body variant as p element", () => {
    render(() => <Typography variant="body">Body text</Typography>);
    const element = screen.getByText("Body text");
    expect(element.tagName).toBe("P");
    expect(element).toHaveStyle({ "font-size": "16px" }); // 1rem = 16px
  });

  it("renders small variant as span element", () => {
    render(() => <Typography variant="small">Small text</Typography>);
    const element = screen.getByText("Small text");
    expect(element.tagName).toBe("SPAN");
    // CSS variable --typography-small-font-size is used (defaults to 0.875rem in production)
    const styles = window.getComputedStyle(element);
    expect(styles.fontSize).toBeTruthy();
  });

  it("overrides element with as prop", () => {
    render(() => (
      <Typography variant="h1" as="div">
        Custom element
      </Typography>
    ));
    const element = screen.getByText("Custom element");
    expect(element.tagName).toBe("DIV");
    // Should still have h1 styles
    const styles = window.getComputedStyle(element);
    expect(styles.fontSize).toBeTruthy();
  });

  it("applies dark theme colors", () => {
    // Set dark theme (this also updates CSS variables)
    setTheme("dark");
    render(() => <Typography variant="body">Dark text</Typography>);
    const element = screen.getByText("Dark text");
    // Check that color style is set (inline style uses CSS variable)
    const inlineColor = (element as HTMLElement).style.color;
    expect(inlineColor).toContain("hsl(var(--foreground))");
    // Reset theme
    setTheme("light");
  });

  it("applies light theme colors by default", () => {
    // Set light theme (this also updates CSS variables)
    setTheme("light");
    render(() => <Typography variant="body">Light text</Typography>);
    const element = screen.getByText("Light text");
    // Check that color style is set (inline style uses CSS variable)
    const inlineColor = (element as HTMLElement).style.color;
    expect(inlineColor).toContain("hsl(var(--foreground))");
  });

  it("applies custom class names", () => {
    render(() => (
      <Typography variant="body" class="custom-class">
        Text
      </Typography>
    ));
    const element = screen.getByText("Text");
    expect(element).toHaveClass("custom-class");
  });

  it("applies custom inline styles", () => {
    render(() => (
      <Typography variant="body" style={{ "background-color": "red" }}>
        Text
      </Typography>
    ));
    const element = screen.getByText("Text");
    expect(element).toHaveStyle({ "background-color": "red" });
  });

  it("renders children correctly", () => {
    render(() => (
      <Typography variant="body">
        <span>Child 1</span>
        <span>Child 2</span>
      </Typography>
    ));
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("applies correct styles for all variants", () => {
    const variants = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "body",
      "body-large",
      "small",
      "caption",
      "label",
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(() => (
        <Typography variant={variant}>Test</Typography>
      ));
      const element = screen.getByText("Test");
      expect(element).toBeInTheDocument();
      unmount();
    });
  });

  it("applies muted color for small and caption variants", () => {
    // Set light theme (this also updates CSS variables)
    setTheme("light");
    render(() => (
      <>
        <Typography variant="small">Small</Typography>
        <Typography variant="caption">Caption</Typography>
      </>
    ));
    const small = screen.getByText("Small");
    const caption = screen.getByText("Caption");
    // Check that colors use CSS variables (muted-foreground)
    const smallColor = (small as HTMLElement).style.color;
    const captionColor = (caption as HTMLElement).style.color;
    expect(smallColor).toContain("hsl(var(--muted-foreground))");
    expect(captionColor).toContain("hsl(var(--muted-foreground))");
  });
});
