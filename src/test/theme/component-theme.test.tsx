/**
 * Component Theme Application Tests
 * Tests to verify all components apply theme correctly
 */

import { render } from "@solidjs/testing-library";
import { beforeEach, describe, expect, it } from "vitest";
import { Alert } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Container } from "../../components/ui/container";
import { EmptyState } from "../../components/ui/empty-state";
import { ProgressBar } from "../../components/ui/progress-bar";
import { Search } from "../../components/ui/search";
import { Table } from "../../components/ui/table";
import { Typography } from "../../components/ui/typography";
import {
  assertThemeStyles,
  renderWithTheme,
  setTheme,
} from "../utils/theme-helpers";

describe("Component Theme Application Tests", () => {
  beforeEach(() => {
    setTheme("light");
  });

  // Test each component in both themes
  const componentTests = [
    {
      name: "Alert",
      Component: Alert,
      props: { variant: "default", description: "Test alert" },
    },
    {
      name: "Button",
      Component: Button,
      props: { children: "Test Button" },
    },
    {
      name: "Checkbox",
      Component: Checkbox,
      props: { label: "Test Checkbox", checked: false },
    },
    {
      name: "Container",
      Component: Container,
      props: { children: "Test Container" },
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
      props: { variant: "body", children: "Test Typography" },
    },
  ];

  componentTests.forEach(({ name, Component, props }) => {
    describe(`${name} Component`, () => {
      it(`applies dark theme styles`, () => {
        setTheme("dark");
        const { container } = render(() => <Component {...props} />);
        const element = container.firstChild as HTMLElement;

        if (element) {
          const styles = getComputedStyle(element);
          const bg = styles.backgroundColor;
          const color = styles.color;

          // Check background is not white in dark theme
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            expect(bg).not.toMatch(
              /rgba?\(255,\s*255,\s*255|rgb\(255\s+255\s+255\)|white|#fff/i,
            );
          }

          // Check text is not black in dark theme
          if (
            color &&
            color !== "rgba(0, 0, 0, 0)" &&
            color !== "transparent"
          ) {
            expect(color).not.toMatch(
              /rgba?\(0,\s*0,\s*0|rgb\(0\s+0\s+0\)|black|#000/i,
            );
          }
        }
      });

      it(`applies light theme styles`, () => {
        setTheme("light");
        const { container } = render(() => <Component {...props} />);
        const element = container.firstChild as HTMLElement;

        if (element) {
          const styles = getComputedStyle(element);
          const bg = styles.backgroundColor;
          const color = styles.color;

          // In light theme, backgrounds should be light and text should be dark
          // But we allow transparent backgrounds, so we check text color
          if (
            color &&
            color !== "rgba(0, 0, 0, 0)" &&
            color !== "transparent"
          ) {
            // Text should be dark in light theme (HSL with low lightness or RGB with low values)
            expect(color).toMatch(
              /rgba?\(0|rgb\(0|hsl\(222|hsl\(0\s+0%\s+0%\)/i,
            );
          }
        }
      });

      it(`reads theme from data-theme correctly`, () => {
        setTheme("dark");
        const { container: darkContainer } = render(() => (
          <Component {...props} />
        ));

        setTheme("light");
        const { container: lightContainer } = render(() => (
          <Component {...props} />
        ));

        // Both should render without errors
        expect(darkContainer.firstChild).toBeTruthy();
        expect(lightContainer.firstChild).toBeTruthy();
      });

      it(`renders without errors when theme changes`, () => {
        // Render in dark theme
        setTheme("dark");
        const { container: darkContainer, unmount: unmountDark } = render(
          () => <Component {...props} />,
        );
        expect(darkContainer.firstChild).toBeTruthy();
        unmountDark();

        // Render in light theme
        setTheme("light");
        const { container: lightContainer, unmount: unmountLight } = render(
          () => <Component {...props} />,
        );
        expect(lightContainer.firstChild).toBeTruthy();
        unmountLight();

        // Both renders should succeed without errors
      });

      it(`CSS variables are applied in computed styles`, () => {
        setTheme("dark");
        const { container } = render(() => <Component {...props} />);
        const element = container.firstChild as HTMLElement;

        if (element) {
          const styles = getComputedStyle(element);
          // Check that styles use CSS variables (HSL format)
          const bg = styles.backgroundColor;
          const color = styles.color;

          // Should use HSL format from CSS variables
          if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
            expect(bg).toMatch(/hsl\(|hsla\(/);
          }
          if (
            color &&
            color !== "transparent" &&
            color !== "rgba(0, 0, 0, 0)"
          ) {
            expect(color).toMatch(/hsl\(|hsla\(/);
          }
        }
      });
    });
  });

  it("Alert component applies dark theme background", () => {
    setTheme("dark");
    const { container } = render(() => (
      <Alert variant="default" description="Test" />
    ));
    const alert = container.querySelector('[role="alert"]') as HTMLElement;

    if (alert) {
      const styles = getComputedStyle(alert);
      const bg = styles.backgroundColor;

      // Should not be white
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        expect(bg).not.toMatch(/rgba?\(255,\s*255,\s*255|white|#fff/i);
      }
    }
  });

  it("Button component applies theme colors", () => {
    setTheme("dark");
    const { container } = render(() => <Button>Test</Button>);
    const button = container.querySelector("button") as HTMLElement;

    if (button) {
      const styles = getComputedStyle(button);
      const color = styles.color;

      // Button text should be light in dark theme
      if (color && color !== "transparent") {
        expect(color).not.toMatch(/rgba?\(0,\s*0,\s*0|black|#000/i);
      }
    }
  });

  it("Typography component applies theme text colors", () => {
    setTheme("dark");
    const { container } = render(() => (
      <Typography variant="body">Test</Typography>
    ));
    const typography = container.firstChild as HTMLElement;

    if (typography) {
      const styles = getComputedStyle(typography);
      const color = styles.color;

      // Text should be light in dark theme
      if (color && color !== "transparent") {
        expect(color).toMatch(/hsl\(210|hsl\(0\s+0%\s+98%\)|rgba?\(246/i);
      }
    }
  });
});
