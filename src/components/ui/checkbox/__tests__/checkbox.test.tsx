import { render, screen } from "@solidjs/testing-library";
import { Checkbox } from "../ui/checkbox";
import { describe, expect, it, vi } from "vitest";

describe("Checkbox", () => {
  it("renders with default props", () => {
    render(() => <Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it("renders with label", () => {
    render(() => <Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept terms");
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("renders checked state", () => {
    render(() => <Checkbox checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("renders disabled state", () => {
    render(() => <Checkbox disabled={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("handles change events", () => {
    const onChange = vi.fn();
    render(() => <Checkbox onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox");
    checkbox.click();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(() => <Checkbox disabled={true} onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox");
    checkbox.click();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with label on left", () => {
    render(() => <Checkbox label="Label" labelPosition="left" />);
    const label = screen.getByText("Label");
    const checkbox = screen.getByRole("checkbox");
    expect(label).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    // Label should be before checkbox in DOM
    const container = label.closest("label");
    expect(container).toBeInTheDocument();
  });

  it("renders with label on right (default)", () => {
    render(() => <Checkbox label="Label" />);
    const label = screen.getByText("Label");
    const checkbox = screen.getByRole("checkbox");
    expect(label).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  it("supports name and value attributes", () => {
    render(() => <Checkbox name="agree" value="yes" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "agree");
    expect(checkbox).toHaveAttribute("value", "yes");
  });

  it("supports id attribute", () => {
    render(() => <Checkbox id="checkbox-1" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "checkbox-1");
  });

  it("applies custom class", () => {
    render(() => <Checkbox class="custom-checkbox" />);
    const container = screen.getByRole("checkbox").closest("label");
    expect(container).toHaveClass("custom-checkbox");
  });
});
