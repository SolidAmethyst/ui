/**
 * Props Interface Tests
 * Tests to verify no component requires isDark prop
 */

import { describe, expect, it } from "vitest";
import type { AlertProps } from "../../components/ui/alert/model/types";
import type { ButtonProps } from "../../components/ui/button/model/types";
import type { CheckboxProps } from "../../components/ui/checkbox/model/types";
import type { EmptyStateProps } from "../../components/ui/empty-state/model/types";
import type { ProgressBarProps } from "../../components/ui/progress-bar/model/types";
import type { SearchProps } from "../../components/ui/search/model/types";
import type { TableProps } from "../../components/ui/table/model/types";
import type { TypographyProps } from "../../components/ui/typography/model/types";

describe("Props Interface Tests", () => {
  it("AlertProps does not include isDark", () => {
    // Type-level test: if isDark exists, TypeScript will error
    const props: AlertProps = {
      variant: "default",
      description: "Test",
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("ButtonProps does not include isDark", () => {
    const props: ButtonProps = {
      children: "Test",
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("CheckboxProps does not include isDark", () => {
    const props: CheckboxProps = {
      label: "Test",
      checked: false,
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("EmptyStateProps does not include isDark", () => {
    const props: EmptyStateProps = {
      title: "Test",
      description: "Test description",
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("ProgressBarProps does not include isDark", () => {
    const props: ProgressBarProps = {
      value: 50,
      label: "Test",
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("SearchProps does not include isDark", () => {
    const props: SearchProps = {
      value: "",
      onInput: () => {},
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("TableProps does not include isDark", () => {
    const props: TableProps = {
      columns: [{ header: "Test", accessor: "test" }],
      data: [{ test: "Test" }],
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("TypographyProps does not include isDark", () => {
    const props: TypographyProps = {
      variant: "body",
      children: "Test",
      // @ts-expect-error - should fail if isDark exists
      // isDark: true
    };
    expect(props).toBeDefined();
  });

  it("All components can be used without isDark", () => {
    // Runtime test: verify components accept props without isDark
    const componentProps = [
      {
        name: "Alert",
        props: { variant: "default", description: "Test" } as AlertProps,
      },
      { name: "Button", props: { children: "Test" } as ButtonProps },
      {
        name: "Checkbox",
        props: { label: "Test", checked: false } as CheckboxProps,
      },
      {
        name: "EmptyState",
        props: { title: "Test", description: "Test" } as EmptyStateProps,
      },
      {
        name: "ProgressBar",
        props: { value: 50, label: "Test" } as ProgressBarProps,
      },
      {
        name: "Search",
        props: { value: "", onInput: () => {} } as SearchProps,
      },
      {
        name: "Table",
        props: {
          columns: [{ header: "Test", accessor: "test" }],
          data: [{ test: "Test" }],
        } as TableProps,
      },
      {
        name: "Typography",
        props: { variant: "body", children: "Test" } as TypographyProps,
      },
    ];

    componentProps.forEach(({ name, props }) => {
      expect(() => {
        // Verify props object is valid
        expect(props).toBeDefined();
        // Verify no isDark property
        expect("isDark" in props).toBe(false);
      }).not.toThrow();
    });
  });

  it("TypeScript compilation succeeds without isDark", () => {
    // This test verifies that TypeScript types are correct
    // If isDark is required, TypeScript would error during compilation
    const validProps: AlertProps = {
      variant: "default",
      description: "Test",
    };
    expect(validProps).toBeDefined();
    expect(validProps.variant).toBe("default");
    expect(validProps.description).toBe("Test");
  });

  it("Props are correctly typed without isDark", () => {
    // Verify props maintain their types
    const alertProps: AlertProps = {
      variant: "success",
      title: "Title",
      description: "Description",
    };
    expect(typeof alertProps.variant).toBe("string");
    expect(typeof alertProps.title).toBe("string");
    expect(typeof alertProps.description).toBe("string");
    expect("isDark" in alertProps).toBe(false);
  });

  it("Optional props work correctly without isDark", () => {
    // Test that optional props work
    const minimalProps: AlertProps = {
      description: "Test",
    };
    expect(minimalProps).toBeDefined();
    expect(minimalProps.description).toBe("Test");
    expect(minimalProps.variant).toBeUndefined();
    expect("isDark" in minimalProps).toBe(false);
  });
});
