/**
 * Hardcoded Colors Detection Tests
 * Verifies that demo pages do not contain hardcoded rgba/rgb/hex colors
 * in inline styles for theme-sensitive properties
 */

import { render } from "@solidjs/testing-library";
import { describe, expect, it, beforeEach } from "vitest";
import { setTheme } from "../utils/theme-helpers";
import { findHardcodedColors } from "../utils/style-validators";
import * as DocsPages from "../../demo/pages/docs";

describe("Hardcoded Colors Detection", () => {
  beforeEach(() => {
    // Set dark theme for testing
    setTheme("dark");
  });

  // List of demo pages to test for hardcoded colors
  const docsPages = [
    { name: "GridDocs", Component: DocsPages.GridDocs },
    { name: "SearchDocs", Component: DocsPages.SearchDocs },
    { name: "TitleBarDocs", Component: DocsPages.TitleBarDocs },
    { name: "CommandDocs", Component: DocsPages.CommandDocs },
    { name: "TabsDocs", Component: DocsPages.TabsDocs },
    { name: "SplitPaneDocs", Component: DocsPages.SplitPaneDocs },
    { name: "SidebarDocs", Component: DocsPages.SidebarDocs },
    { name: "ScrollbarDocs", Component: DocsPages.ScrollbarDocs },
    { name: "FilterBarDocs", Component: DocsPages.FilterBarDocs },
    { name: "ButtonDocs", Component: DocsPages.ButtonDocs },
    { name: "AppDocs", Component: DocsPages.AppDocs },
    { name: "AccordionDocs", Component: DocsPages.AccordionDocs },
    { name: "AlertDocs", Component: DocsPages.AlertDocs },
    { name: "CheckboxTreeDocs", Component: DocsPages.CheckboxTreeDocs },
    { name: "CodeHighlightDocs", Component: DocsPages.CodeHighlightDocs },
    { name: "DragDropDocs", Component: DocsPages.DragDropDocs },
    { name: "DrawerDocs", Component: DocsPages.DrawerDocs },
    { name: "EmptyStateDocs", Component: DocsPages.EmptyStateDocs },
    { name: "FileManagerDocs", Component: DocsPages.FileManagerDocs },
    { name: "ModalDocs", Component: DocsPages.ModalDocs },
    { name: "NumberInputDocs", Component: DocsPages.NumberInputDocs },
    { name: "ProgressBarDocs", Component: DocsPages.ProgressBarDocs },
    { name: "SliderDocs", Component: DocsPages.SliderDocs },
    { name: "TableDocs", Component: DocsPages.TableDocs },
    { name: "TimelineDocs", Component: DocsPages.TimelineDocs },
    { name: "TechChipDocs", Component: DocsPages.TechChipDocs },
    { name: "ToastDocs", Component: DocsPages.ToastDocs },
    { name: "TooltipDocs", Component: DocsPages.TooltipDocs },
  ];

  docsPages.forEach(({ name, Component }) => {
    it(`${name} should not contain hardcoded colors in theme-sensitive properties`, () => {
      const { container } = render(() => <Component />);

      // Find all hardcoded colors in inline styles
      const hardcodedColors = findHardcodedColors(container);

      // Report findings if any
      if (hardcodedColors.length > 0) {
        const report = hardcodedColors
          .map(
            (item) => `  - ${item.element}: ${item.property} = ${item.value}`,
          )
          .join("\n");

        expect.fail(
          `Found ${hardcodedColors.length} hardcoded color(s) in ${name}:\n${report}\n\n` +
            `These should use CSS variables like 'hsl(var(--foreground))' or getThemeFromCSS() for dynamic theming.`,
        );
      }

      // Test passes if no hardcoded colors found
      expect(hardcodedColors).toHaveLength(0);
    });
  });

  it("should allow CSS variables in inline styles", () => {
    // This is a meta-test to verify CSS variables are not flagged as hardcoded
    const testDiv = document.createElement("div");
    testDiv.style.background = "hsl(var(--background))";
    testDiv.style.color = "hsl(var(--foreground))";

    const container = document.createElement("div");
    container.appendChild(testDiv);

    const hardcodedColors = findHardcodedColors(container);
    expect(hardcodedColors).toHaveLength(0);
  });

  it("should detect rgba colors in inline styles", () => {
    // This is a meta-test to verify rgba detection works
    const testDiv = document.createElement("div");
    testDiv.style.background = "rgba(255, 255, 255, 0.5)";
    testDiv.style.color = "rgb(0, 0, 0)";

    const container = document.createElement("div");
    container.appendChild(testDiv);

    const hardcodedColors = findHardcodedColors(container);
    expect(hardcodedColors.length).toBeGreaterThan(0);
  });

  it("should detect hex colors in inline styles", () => {
    // This is a meta-test to verify hex detection works
    const testDiv = document.createElement("div");
    testDiv.style.background = "#ffffff";
    testDiv.style.color = "#000";

    const container = document.createElement("div");
    container.appendChild(testDiv);

    const hardcodedColors = findHardcodedColors(container);
    expect(hardcodedColors.length).toBeGreaterThan(0);
  });
});
