/**
 * Page Loading and Rendering Tests
 * Tests to identify why docs pages are stuck on "Loading..."
 */

import { render, waitFor } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import {
  assertNoLoadingState,
  waitForPageLoad,
} from "../utils/rendering-helpers";
import * as DocsPages from "../../demo/pages/docs";

describe("Page Loading Tests", () => {
  // List of all docs pages to test
  const docsPages = [
    { name: "IntroductionDocs", Component: DocsPages.IntroductionDocs },
    { name: "InstallationDocs", Component: DocsPages.InstallationDocs },
    { name: "AccordionDocs", Component: DocsPages.AccordionDocs },
    { name: "AlertDocs", Component: DocsPages.AlertDocs },
    { name: "ButtonDocs", Component: DocsPages.ButtonDocs },
    { name: "CheckboxTreeDocs", Component: DocsPages.CheckboxTreeDocs },
    { name: "CodeHighlightDocs", Component: DocsPages.CodeHighlightDocs },
    { name: "CommandDocs", Component: DocsPages.CommandDocs },
    { name: "DragDropDocs", Component: DocsPages.DragDropDocs },
    { name: "DrawerDocs", Component: DocsPages.DrawerDocs },
    { name: "EmptyStateDocs", Component: DocsPages.EmptyStateDocs },
    { name: "FileManagerDocs", Component: DocsPages.FileManagerDocs },
    { name: "FilterBarDocs", Component: DocsPages.FilterBarDocs },
    { name: "GridDocs", Component: DocsPages.GridDocs },
    { name: "ModalDocs", Component: DocsPages.ModalDocs },
    { name: "NumberInputDocs", Component: DocsPages.NumberInputDocs },
    { name: "ProgressBarDocs", Component: DocsPages.ProgressBarDocs },
    { name: "ScrollbarDocs", Component: DocsPages.ScrollbarDocs },
    { name: "SearchDocs", Component: DocsPages.SearchDocs },
    { name: "SidebarDocs", Component: DocsPages.SidebarDocs },
    { name: "SliderDocs", Component: DocsPages.SliderDocs },
    { name: "SplitPaneDocs", Component: DocsPages.SplitPaneDocs },
    { name: "TableDocs", Component: DocsPages.TableDocs },
    { name: "TabsDocs", Component: DocsPages.TabsDocs },
    { name: "TimelineDocs", Component: DocsPages.TimelineDocs },
    { name: "TechChipDocs", Component: DocsPages.TechChipDocs },
    { name: "TitleBarDocs", Component: DocsPages.TitleBarDocs },
    { name: "ToastDocs", Component: DocsPages.ToastDocs },
    { name: "TooltipDocs", Component: DocsPages.TooltipDocs },
    { name: "AppDocs", Component: DocsPages.AppDocs },
  ];

  // Test each docs page loads without isDark prop
  docsPages.forEach(({ name, Component }) => {
    it(`${name} loads without isDark prop`, async () => {
      const { container } = render(() => <Component />);

      // Wait for component to render (not stuck on Loading...)
      await waitFor(
        () => {
          assertNoLoadingState(container);
          // Check that article or main content is rendered
          const article = container.querySelector("article");
          expect(article || container.firstChild).toBeTruthy();
        },
        { timeout: 5000 },
      );
    });

    it(`${name} does not require isDark prop`, () => {
      // This test verifies the component can be rendered without isDark
      expect(() => {
        const { container } = render(() => <Component />);
        expect(container).toBeTruthy();
      }).not.toThrow();
    });

    it(`${name} renders content without errors`, async () => {
      const { container } = render(() => <Component />);

      await waitFor(
        () => {
          // Component should render something
          expect(container.firstChild).toBeTruthy();
          // Should not be stuck on Loading...
          const loadingText = Array.from(container.querySelectorAll("*")).find(
            (el) => el.textContent?.trim() === "Loading...",
          );
          expect(loadingText).toBeUndefined();
        },
        { timeout: 5000 },
      );
    });
  });

  it("All docs pages export correctly from index.ts", () => {
    // Verify all exports exist
    expect(DocsPages.IntroductionDocs).toBeDefined();
    expect(DocsPages.InstallationDocs).toBeDefined();
    expect(DocsPages.AccordionDocs).toBeDefined();
    expect(DocsPages.AlertDocs).toBeDefined();
    expect(DocsPages.ButtonDocs).toBeDefined();
    expect(DocsPages.CheckboxTreeDocs).toBeDefined();
    expect(DocsPages.CodeHighlightDocs).toBeDefined();
    expect(DocsPages.CommandDocs).toBeDefined();
    expect(DocsPages.DragDropDocs).toBeDefined();
    expect(DocsPages.DrawerDocs).toBeDefined();
    expect(DocsPages.EmptyStateDocs).toBeDefined();
    expect(DocsPages.FileManagerDocs).toBeDefined();
    expect(DocsPages.FilterBarDocs).toBeDefined();
    expect(DocsPages.GridDocs).toBeDefined();
    expect(DocsPages.ModalDocs).toBeDefined();
    expect(DocsPages.NumberInputDocs).toBeDefined();
    expect(DocsPages.ProgressBarDocs).toBeDefined();
    expect(DocsPages.ScrollbarDocs).toBeDefined();
    expect(DocsPages.SearchDocs).toBeDefined();
    expect(DocsPages.SidebarDocs).toBeDefined();
    expect(DocsPages.SliderDocs).toBeDefined();
    expect(DocsPages.SplitPaneDocs).toBeDefined();
    expect(DocsPages.TableDocs).toBeDefined();
    expect(DocsPages.TabsDocs).toBeDefined();
    expect(DocsPages.TimelineDocs).toBeDefined();
    expect(DocsPages.TechChipDocs).toBeDefined();
    expect(DocsPages.TitleBarDocs).toBeDefined();
    expect(DocsPages.ToastDocs).toBeDefined();
    expect(DocsPages.TooltipDocs).toBeDefined();
    expect(DocsPages.AppDocs).toBeDefined();
  });

  it("IntroductionDocs renders without isDark prop", async () => {
    const { container } = render(() => <DocsPages.IntroductionDocs />);

    await waitFor(
      () => {
        const article = container.querySelector("article");
        expect(article).toBeTruthy();
        // Should have content
        expect(container.textContent).toContain("Introduction");
      },
      { timeout: 5000 },
    );
  });

  it("No page should be stuck on Loading... state", async () => {
    // Test a few key pages
    const keyPages = [
      DocsPages.IntroductionDocs,
      DocsPages.InstallationDocs,
      DocsPages.AlertDocs,
      DocsPages.ButtonDocs,
    ];

    for (const PageComponent of keyPages) {
      const { container } = render(() => <PageComponent />);

      await waitForPageLoad(container, 5000);

      // Verify no Loading... text
      assertNoLoadingState(container);
    }
  });
});
