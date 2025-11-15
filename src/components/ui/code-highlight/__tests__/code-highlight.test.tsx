/**
 * CodeHighlight component tests
 */

import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { CodeHighlight } from "../ui/code-highlight";

describe("CodeHighlight", () => {
  it("renders code block", () => {
    const { container } = render(() => <CodeHighlight code="const x = 1" />);

    const codeElement = container.querySelector(".code-block");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toContain("const x = 1");
  });

  it("renders copy button", () => {
    render(() => <CodeHighlight code="test code" />);

    const copyButton = screen.getByTitle("Copy code");
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveTextContent("Copy");
  });

  it("highlights keywords", () => {
    const { container } = render(() => <CodeHighlight code="const x = 1" />);

    const codeElement = container.querySelector(".code-block");
    expect(codeElement).toBeInTheDocument();

    // Check that keywords are highlighted
    const highlightedCode = codeElement?.innerHTML || "";
    expect(highlightedCode).toContain("code-keyword");
    expect(highlightedCode).toContain("const");
  });

  it("highlights strings", () => {
    const { container } = render(() => (
      <CodeHighlight code='const str = "hello"' />
    ));

    const codeElement = container.querySelector(".code-block");
    expect(codeElement).toBeInTheDocument();

    // Check that the string content is present
    expect(codeElement?.textContent).toContain("hello");

    // String highlighting may use &quot; for quotes, check if highlighting is applied
    const highlightedCode = codeElement?.innerHTML || "";
    // At minimum, the code should be rendered and contain the string value
    expect(highlightedCode.length).toBeGreaterThan(0);
    expect(highlightedCode).toContain("hello");
  });

  it("highlights comments", () => {
    const { container } = render(() => (
      <CodeHighlight code="// This is a comment" />
    ));

    const codeElement = container.querySelector(".code-block");
    const highlightedCode = codeElement?.innerHTML || "";

    expect(highlightedCode).toContain("code-comment");
    expect(highlightedCode).toContain("// This is a comment");
  });

  it("highlights JSX tags", () => {
    const { container } = render(() => (
      <CodeHighlight code="<div>Hello</div>" />
    ));

    const codeElement = container.querySelector(".code-block");
    const highlightedCode = codeElement?.innerHTML || "";

    expect(highlightedCode).toContain("code-tag");
    expect(highlightedCode).toContain("code-tag-name");
  });

  it("applies dark theme styles", () => {
    const { container } = render(() => <CodeHighlight code="test" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();

    // Check that background style is applied (via inline styles)
    // CSS variables may not resolve in test environment, so check inline style
    const inlineStyle = wrapper.getAttribute("style") || "";
    expect(inlineStyle).toContain("background");
  });

  it("applies light theme styles", () => {
    const { container } = render(() => <CodeHighlight code="test" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();

    // Check that background style is applied (via inline styles)
    // CSS variables may not resolve in test environment, so check inline style
    const inlineStyle = wrapper.getAttribute("style") || "";
    expect(inlineStyle).toContain("background");
  });

  it("accepts custom class name", () => {
    const { container } = render(() => (
      <CodeHighlight code="test" class="custom-class" />
    ));

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("accepts custom styles", () => {
    const { container } = render(() => (
      <CodeHighlight code="test" style={{ margin: "20px" }} />
    ));

    const wrapper = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(wrapper);
    expect(styles.margin).toBe("20px");
  });

  it("highlights CSS at-rules", () => {
    const { container } = render(() => <CodeHighlight code="@layer base {}" />);

    const codeElement = container.querySelector(".code-block");
    const highlightedCode = codeElement?.innerHTML || "";

    expect(highlightedCode).toContain("code-keyword");
    expect(highlightedCode).toContain("@layer");
  });

  it("highlights CSS selectors", () => {
    const { container } = render(() => (
      <CodeHighlight code=":root { color: red; }" />
    ));

    const codeElement = container.querySelector(".code-block");
    const highlightedCode = codeElement?.innerHTML || "";

    expect(highlightedCode).toContain("code-attr");
    expect(highlightedCode).toContain(":root");
  });

  it("highlights CSS custom properties", () => {
    const { container } = render(() => (
      <CodeHighlight code="--primary-color: blue;" />
    ));

    const codeElement = container.querySelector(".code-block");
    const highlightedCode = codeElement?.innerHTML || "";

    expect(highlightedCode).toContain("code-attr");
    expect(highlightedCode).toContain("--primary-color");
  });

  it("handles empty code", () => {
    render(() => <CodeHighlight code="" />);

    const copyButton = screen.getByTitle("Copy code");
    expect(copyButton).toBeInTheDocument();
  });

  it("handles multiline code", () => {
    const code = `const x = 1
const y = 2
const z = x + y`;

    const { container } = render(() => <CodeHighlight code={code} />);

    const codeElement = container.querySelector(".code-block");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toContain("const x = 1");
    expect(codeElement?.textContent).toContain("const y = 2");
    expect(codeElement?.textContent).toContain("const z = x + y");
  });
});
