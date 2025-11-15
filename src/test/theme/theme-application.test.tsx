/**
 * Theme Application Tests
 * Verifies that themes are correctly applied and colors change when switching themes
 */

import { render, cleanup } from "@solidjs/testing-library";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { setTheme } from "../utils/theme-helpers";
import { extractInlineStyles } from "../utils/style-validators";
import * as DocsPages from "../../demo/pages/docs";

describe("Theme Application", () => {
  afterEach(() => {
    cleanup();
  });

  // Key pages with complex styling to test
  const keyPages = [
    { name: "GridDocs", Component: DocsPages.GridDocs },
    { name: "SearchDocs", Component: DocsPages.SearchDocs },
    { name: "AppDocs", Component: DocsPages.AppDocs },
  ];

  keyPages.forEach(({ name, Component }) => {
    describe(`${name}`, () => {
      it("should have different inline styles between dark and light themes", () => {
        // Render in dark theme
        setTheme("dark");
        const { container: darkContainer } = render(() => <Component />);
        const darkStyles = extractInlineStyles(darkContainer);

        // Cleanup and render in light theme
        cleanup();
        setTheme("light");
        const { container: lightContainer } = render(() => <Component />);
        const lightStyles = extractInlineStyles(lightContainer);

        // At least one element should have different styles between themes
        let hasDifference = false;
        const differences: string[] = [];

        darkStyles.forEach((darkStyle, key) => {
          const lightStyle = lightStyles.get(key);
          if (lightStyle) {
            // Check theme-sensitive properties
            const props = [
              "background",
              "background-color",
              "color",
              "border-color",
            ];
            props.forEach((prop) => {
              const darkValue = darkStyle.getPropertyValue(prop);
              const lightValue = lightStyle.getPropertyValue(prop);
              if (darkValue && lightValue && darkValue !== lightValue) {
                hasDifference = true;
                differences.push(
                  `${key}.${prop}: dark="${darkValue}" vs light="${lightValue}"`,
                );
              }
            });
          }
        });

        if (!hasDifference) {
          expect.fail(
            `${name} should have different inline styles between dark and light themes.\n` +
              `This indicates that the theme is not being applied dynamically.\n` +
              `Ensure components use getThemeFromCSS() or CSS variables for theme-sensitive properties.`,
          );
        }

        expect(hasDifference).toBe(true);
      });

      it("should render without errors in dark theme", () => {
        setTheme("dark");
        const { container } = render(() => <Component />);
        expect(container.firstChild).toBeTruthy();
      });

      it("should render without errors in light theme", () => {
        setTheme("light");
        const { container } = render(() => <Component />);
        expect(container.firstChild).toBeTruthy();
      });
    });
  });

  // Test all docs pages for basic theme compatibility
  const allDocsPages = [
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
    { name: "ModalDocs", Component: DocsPages.ModalDocs },
    { name: "NumberInputDocs", Component: DocsPages.NumberInputDocs },
    { name: "ProgressBarDocs", Component: DocsPages.ProgressBarDocs },
    { name: "ScrollbarDocs", Component: DocsPages.ScrollbarDocs },
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
  ];

  describe("All Docs Pages Theme Compatibility", () => {
    allDocsPages.forEach(({ name, Component }) => {
      it(`${name} renders in both themes without errors`, () => {
        // Test dark theme
        setTheme("dark");
        const { container: darkContainer } = render(() => <Component />);
        expect(darkContainer.firstChild).toBeTruthy();

        cleanup();

        // Test light theme
        setTheme("light");
        const { container: lightContainer } = render(() => <Component />);
        expect(lightContainer.firstChild).toBeTruthy();
      });
    });
  });

  describe("Theme Detection Function", () => {
    it("should detect dark theme correctly", () => {
      setTheme("dark");
      const themeAttr = document.documentElement.getAttribute("data-theme");
      expect(themeAttr).toBe("dark");
    });

    it("should detect light theme correctly", () => {
      setTheme("light");
      const themeAttr = document.documentElement.getAttribute("data-theme");
      expect(themeAttr).toBe("light");
    });

    it("should have CSS variables set for dark theme", () => {
      setTheme("dark");
      const rootStyle = document.documentElement.style;

      // Check that key CSS variables are set
      const bgVar = rootStyle.getPropertyValue("--background");
      expect(bgVar).toBeTruthy();
      expect(bgVar).not.toBe("");
    });

    it("should have CSS variables set for light theme", () => {
      setTheme("light");
      const rootStyle = document.documentElement.style;

      // Check that key CSS variables are set
      const bgVar = rootStyle.getPropertyValue("--background");
      expect(bgVar).toBeTruthy();
      expect(bgVar).not.toBe("");
    });
  });

  describe("CSS Variables Usage", () => {
    it("should prefer CSS variables over hardcoded colors", () => {
      setTheme("dark");
      const { container } = render(() => <DocsPages.GridDocs />);

      const elementsWithInlineStyles = container.querySelectorAll("[style]");
      let hasProperCSSVarUsage = false;

      elementsWithInlineStyles.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const styleText = htmlElement.getAttribute("style") || "";

        // Check if uses CSS variables or dynamic theming
        if (styleText.includes("var(--") || styleText.includes("hsl(var(--")) {
          hasProperCSSVarUsage = true;
        }
      });

      // At least some elements should use CSS variables
      // (We can't enforce all because some might be dynamic)
      expect(hasProperCSSVarUsage).toBe(true);
    });
  });
});
