/**
 * Component Functionality Tests
 * Tests to verify all components work without isDark prop
 */

import { fireEvent, render, screen, waitFor } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Alert } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { EmptyState } from "../../components/ui/empty-state";
import { ProgressBar } from "../../components/ui/progress-bar";
import { Search } from "../../components/ui/search";
import { Table } from "../../components/ui/table";
import { Typography } from "../../components/ui/typography";
import { renderComponent } from "../utils/rendering-helpers";
import { setTheme } from "../utils/theme-helpers";

// Helper to ensure CSS variables are set
function ensureCSSVariables() {
  if (typeof document !== "undefined") {
    // Set light theme variables if not already set
    if (!document.documentElement.style.getPropertyValue("--background")) {
      document.documentElement.style.setProperty("--background", "0 0% 100%");
      document.documentElement.style.setProperty(
        "--foreground",
        "222.2 84% 4.9%",
      );
      document.documentElement.style.setProperty("--card", "0 0% 100%");
      document.documentElement.style.setProperty(
        "--card-foreground",
        "222.2 84% 4.9%",
      );
      document.documentElement.style.setProperty("--primary", "271 81% 53%");
      document.documentElement.style.setProperty("--muted", "240 14% 96%");
      document.documentElement.style.setProperty(
        "--muted-foreground",
        "215.4 16.3% 46.9%",
      );
      document.documentElement.style.setProperty("--border", "240 14% 92%");
    }
    // Ensure theme is set
    if (!document.documentElement.getAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
}

describe("Component Functionality Tests", () => {
  beforeEach(() => {
    setTheme("light");
    ensureCSSVariables();
  });
  it("Alert renders without isDark prop", () => {
    const { container } = render(() => (
      <Alert variant="default" description="Test alert" />
    ));
    expect(container.textContent).toContain("Test alert");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Alert accepts props correctly without isDark", () => {
    const { container } = render(() => (
      <Alert
        variant="success"
        title="Success"
        description="Operation successful"
      />
    ));
    expect(container.textContent).toContain("Success");
    expect(container.textContent).toContain("Operation successful");
  });

  it("Button click handler works without isDark prop", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Button onClick={handleClick}>Click me</Button>
    ));
    const button = container.querySelector("button");
    fireEvent.click(button!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("Button renders without isDark prop", () => {
    const { container } = render(() => <Button>Test Button</Button>);
    expect(container.textContent).toContain("Test Button");
  });

  it("Checkbox toggles without isDark prop", () => {
    const { container } = render(() => (
      <Checkbox label="Test Checkbox" checked={false} />
    ));
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("EmptyState renders without isDark prop", () => {
    const { container } = render(() => (
      <EmptyState title="Empty" description="No items found" />
    ));
    expect(container.textContent).toContain("Empty");
    expect(container.textContent).toContain("No items found");
  });

  it("ProgressBar renders without isDark prop", () => {
    const { container } = render(() => (
      <ProgressBar value={50} label="Progress" />
    ));
    expect(container.textContent).toContain("Progress");
  });

  it("Search handles input without isDark prop", () => {
    const handleInput = vi.fn();
    const { container } = render(() => (
      <Search value="" onInput={handleInput} />
    ));
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();

    fireEvent.input(input!, { target: { value: "test" } });
    expect(handleInput).toHaveBeenCalled();
  });

  it("Table renders without isDark prop", () => {
    const { container } = render(() => (
      <Table
        columns={[{ header: "Name", accessor: "name" }]}
        data={[{ name: "Test" }]}
      />
    ));
    expect(container.textContent).toContain("Name");
    expect(container.textContent).toContain("Test");
  });

  it("Typography renders without isDark prop", () => {
    const { container } = render(() => (
      <Typography variant="body">Test Typography</Typography>
    ));
    expect(container.textContent).toContain("Test Typography");
  });

  it("All components accept props correctly without isDark", () => {
    const componentTests = [
      {
        name: "Alert",
        Component: Alert,
        props: { variant: "default", description: "Test" },
      },
      {
        name: "Button",
        Component: Button,
        props: { children: "Test" },
      },
      {
        name: "Checkbox",
        Component: Checkbox,
        props: { label: "Test", checked: false },
      },
      {
        name: "EmptyState",
        Component: EmptyState,
        props: { title: "Test", description: "Test description" },
      },
      {
        name: "ProgressBar",
        Component: ProgressBar,
        props: { value: 50, label: "Test" },
      },
      {
        name: "Search",
        Component: Search,
        props: { value: "", onInput: () => {} },
      },
      {
        name: "Table",
        Component: Table,
        props: {
          columns: [{ header: "Test", accessor: "test" }],
          data: [{ test: "Test" }],
        },
      },
      {
        name: "Typography",
        Component: Typography,
        props: { variant: "body", children: "Test" },
      },
    ];

    componentTests.forEach(({ name, Component, props }) => {
      expect(() => {
        const { container } = renderComponent(Component, props);
        expect(container.firstChild).toBeTruthy();
      }).not.toThrow();
    });
  });

  it("Components handle user interactions without isDark prop", () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Button onClick={handleClick}>Click</Button>
    ));
    const button = container.querySelector("button");
    fireEvent.click(button!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("Components handle state changes without isDark prop", async () => {
    // Use signals for reactive updates in Solid.js
    const [variant, setVariant] = createSignal<"default" | "success">(
      "default",
    );
    const [description, setDescription] = createSignal("Initial");

    const { container } = render(() => (
      <Alert variant={variant()} description={description()} />
    ));
    expect(container.textContent).toContain("Initial");

    setVariant("success");
    setDescription("Updated");
    // Wait for reactive update
    await waitFor(() => {
      expect(container.textContent).toContain("Updated");
    });
  });

  it("Components fire events correctly without isDark prop", () => {
    const handleInput = vi.fn();
    const { container } = render(() => (
      <Search value="" onInput={handleInput} />
    ));
    const input = container.querySelector("input");

    fireEvent.input(input!, { target: { value: "test" } });
    expect(handleInput).toHaveBeenCalled();
  });

  it("Components render children correctly without isDark prop", () => {
    const { container } = render(() => (
      <Button>
        <span>Child content</span>
      </Button>
    ));
    expect(container.textContent).toContain("Child content");
  });

  it("Components handle variant changes without isDark prop", async () => {
    // Use signals for reactive updates in Solid.js
    const [variant, setVariant] = createSignal<"default" | "success">(
      "default",
    );

    const { container } = render(() => (
      <Alert variant={variant()} description="Test" />
    ));
    expect(container.querySelector(".alert-default")).toBeInTheDocument();

    setVariant("success");
    // Wait for reactive update
    await waitFor(() => {
      expect(container.querySelector(".alert-success")).toBeInTheDocument();
    });
  });
});
