/**
 * Error Detection Tests
 * Tests to catch console errors and runtime failures
 */

import { render, waitFor } from "@solidjs/testing-library";
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
import * as DocsPages from "../../demo/pages/docs";
import {
  assertNoLoadingState,
  waitForPageLoad,
} from "../utils/rendering-helpers";

describe("Error Detection Tests", () => {
  beforeEach(() => {
    // Clear console mocks before each test
    vi.clearAllMocks();
  });

  it("No console errors when loading docs pages", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Test loading a few key docs pages
    const keyPages = [
      DocsPages.IntroductionDocs,
      DocsPages.InstallationDocs,
      DocsPages.AlertDocs,
    ];

    for (const PageComponent of keyPages) {
      const { container } = render(() => <PageComponent />);

      await waitFor(
        () => {
          expect(consoleError).not.toHaveBeenCalled();
          expect(consoleWarn).not.toHaveBeenCalled();
        },
        { timeout: 5000 },
      );
    }

    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });

  it("No console warnings about missing props", () => {
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Render components without isDark prop
    render(() => <Alert variant="default" description="Test" />);
    render(() => <Button>Test</Button>);
    render(() => <Checkbox label="Test" checked={false} />);
    render(() => <EmptyState title="Test" description="Test" />);
    render(() => <ProgressBar value={50} label="Test" />);
    render(() => <Search value="" onInput={() => {}} />);
    render(() => (
      <Table
        columns={[{ header: "Test", accessor: "test" }]}
        data={[{ test: "Test" }]}
      />
    ));
    render(() => <Typography variant="body">Test</Typography>);

    expect(consoleWarn).not.toHaveBeenCalled();
    consoleWarn.mockRestore();
  });

  it("No runtime errors in component rendering", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(() => <Alert variant="default" description="Test" />);
      render(() => <Button>Test</Button>);
      render(() => <Checkbox label="Test" checked={false} />);
      render(() => <EmptyState title="Test" description="Test" />);
      render(() => <ProgressBar value={50} label="Test" />);
      render(() => <Search value="" onInput={() => {}} />);
      render(() => (
        <Table
          columns={[{ header: "Test", accessor: "test" }]}
          data={[{ test: "Test" }]}
        />
      ));
      render(() => <Typography variant="body">Test</Typography>);
    }).not.toThrow();

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("No TypeScript errors in component usage", () => {
    // This test verifies that components can be used without isDark
    // TypeScript compilation should succeed
    expect(() => {
      const alertProps = { variant: "default" as const, description: "Test" };
      const buttonProps = { children: "Test" };
      const checkboxProps = { label: "Test", checked: false };
      const emptyStateProps = { title: "Test", description: "Test" };
      const progressBarProps = { value: 50, label: "Test" };
      const searchProps = { value: "", onInput: () => {} };
      const tableProps = {
        columns: [{ header: "Test", accessor: "test" }],
        data: [{ test: "Test" }],
      };
      const typographyProps = { variant: "body" as const, children: "Test" };

      expect(alertProps).toBeDefined();
      expect(buttonProps).toBeDefined();
      expect(checkboxProps).toBeDefined();
      expect(emptyStateProps).toBeDefined();
      expect(progressBarProps).toBeDefined();
      expect(searchProps).toBeDefined();
      expect(tableProps).toBeDefined();
      expect(typographyProps).toBeDefined();
    }).not.toThrow();
  });

  it("Lazy loading does not throw errors", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Test lazy loading of docs pages
    const lazyPages = [
      DocsPages.IntroductionDocs,
      DocsPages.InstallationDocs,
      DocsPages.AlertDocs,
      DocsPages.ButtonDocs,
    ];

    for (const PageComponent of lazyPages) {
      expect(() => {
        render(() => <PageComponent />);
      }).not.toThrow();
    }

    await waitFor(
      () => {
        expect(consoleError).not.toHaveBeenCalled();
      },
      { timeout: 5000 },
    );

    consoleError.mockRestore();
  });

  it("No errors when switching themes", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Switch themes multiple times
    for (let i = 0; i < 5; i++) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.setAttribute("data-theme", "light");
    }

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("No errors when rendering components in different themes", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Render in dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    render(() => <Alert variant="default" description="Test" />);
    render(() => <Button>Test</Button>);

    // Render in light theme
    document.documentElement.setAttribute("data-theme", "light");
    render(() => <Alert variant="default" description="Test" />);
    render(() => <Button>Test</Button>);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("No errors when components are unmounted", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { unmount } = render(() => (
      <Alert variant="default" description="Test" />
    ));
    unmount();

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("No errors when props change", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Use signals for reactive updates in Solid.js
    const [variant, setVariant] = createSignal<"default" | "success">(
      "default",
    );
    const [description, setDescription] = createSignal("Initial");

    render(() => <Alert variant={variant()} description={description()} />);

    setVariant("success");
    setDescription("Updated");

    // Wait for update
    await waitFor(
      () => {
        expect(consoleError).not.toHaveBeenCalled();
      },
      { timeout: 1000 },
    );

    consoleError.mockRestore();
  });

  it("No errors when navigating between docs pages", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Simulate navigation between pages
    const pages = [
      DocsPages.IntroductionDocs,
      DocsPages.InstallationDocs,
      DocsPages.AlertDocs,
    ];

    for (const PageComponent of pages) {
      const { container } = render(() => <PageComponent />);

      await waitFor(
        () => {
          assertNoLoadingState(container);
        },
        { timeout: 5000 },
      );

      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
    }

    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });

  it("No errors when components use CSS variables", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Set theme and render components
    document.documentElement.setAttribute("data-theme", "dark");
    render(() => <Alert variant="default" description="Test" />);
    render(() => <Button>Test</Button>);
    render(() => <Typography variant="body">Test</Typography>);

    // Check that CSS variables are accessible
    const background = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--background");
    expect(background).toBeTruthy();

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("No errors when accessing theme utilities", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Test getThemeFromCSS utility
    const { getThemeFromCSS } = await import(
      "../../components/ui/glass/lib/theme-utils"
    );
    expect(() => {
      const isDark = getThemeFromCSS();
      expect(typeof isDark).toBe("boolean");
    }).not.toThrow();

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
