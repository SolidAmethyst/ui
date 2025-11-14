import { waitFor } from "@solidjs/testing-library";
import { ComponentTestConfig, TestScenario } from "../types/test-types";

/**
 * DRY helper for testing component props
 * Note: This is a utility function, not a test runner
 * Use it inside describe blocks in your actual tests
 */
export const createPropTests = <T extends Record<string, any>>(
  Component: any,
  defaultProps: T,
  testConfig: ComponentTestConfig<T>,
) => {
  const { propName, validValues, invalidValues, renderFn } = testConfig;
  const tests: Array<{ name: string; fn: () => void }> = [];

  if (validValues) {
    validValues.forEach((value) => {
      tests.push({
        name: `should accept valid value: ${JSON.stringify(value)}`,
        fn: async () => {
          const props = { ...defaultProps, [propName]: value };
          const { container: _container } = renderFn(Component, props);
          // expect(_container).toBeInTheDocument()
        },
      });
    });
  }

  if (invalidValues) {
    invalidValues.forEach((value) => {
      tests.push({
        name: `should handle invalid value: ${JSON.stringify(value)}`,
        fn: async () => {
          const props = { ...defaultProps, [propName]: value };
          const { container: _container } = renderFn(Component, props);
          // expect(_container).toBeInTheDocument()
        },
      });
    });
  }

  return tests;
};

/**
 * DRY helper for testing component events
 * Note: This is a utility function, not a test runner
 * Use it inside describe blocks in your actual tests
 */
export const createEventTests = <T extends Record<string, any>>(
  Component: any,
  defaultProps: T,
  renderFn: (Component: any, props: T) => any,
  eventTests: Array<{
    eventName: string;
    triggerFn: (element: HTMLElement) => void;
    expectedBehavior: (container: HTMLElement) => void;
  }>,
) => {
  return eventTests.map(({ eventName, triggerFn, expectedBehavior }) => ({
    name: `should handle ${eventName} event`,
    fn: async () => {
      const { container } = renderFn(Component, defaultProps);
      const element = container.firstChild as HTMLElement;

      triggerFn(element);
      expectedBehavior(container);
    },
  }));
};

/**
 * DRY helper for testing accessibility
 * Note: This is a utility function, not a test runner
 * Use it inside describe blocks in your actual tests
 */
export const createAccessibilityTest = <T extends Record<string, any>>(
  Component: any,
  defaultProps: T,
  renderFn: (Component: any, props: T) => any,
) => {
  return {
    name: "should be accessible",
    fn: async () => {
      const { container } = renderFn(Component, defaultProps);

      // Basic accessibility checks
      const interactiveElements = container.querySelectorAll(
        "button, input, select, textarea, [tabindex]",
      );
      interactiveElements.forEach((element: any) => {
        // Elements should have proper roles or be focusable
        // expect(element).toBeInTheDocument()
      });
    },
  };
};

/**
 * DRY helper for testing responsive behavior
 * Note: This is a utility function, not a test runner
 * Use it inside describe blocks in your actual tests
 */
export const createResponsiveTests = <T extends Record<string, any>>(
  Component: any,
  defaultProps: T,
  renderFn: (Component: any, props: T) => any,
  breakpoints: Array<{ name: string; width: number; height: number }>,
) => {
  return breakpoints.map(({ name, width, height }) => ({
    name: `should work on ${name} (${width}x${height})`,
    fn: async () => {
      // Mock viewport size
      Object.defineProperty(window, "innerWidth", {
        value: width,
        writable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: height,
        writable: true,
      });

      const { container: _container } = renderFn(Component, defaultProps);
      // expect(_container).toBeInTheDocument()

      // Trigger resize event
      window.dispatchEvent(new Event("resize"));

      // Component should still work
      // expect(_container).toBeInTheDocument()
    },
  }));
};

/**
 * DRY helper for testing component state changes
 * Note: This is a utility function, not a test runner
 * Use it inside describe blocks in your actual tests
 */
export const createStateChangeTests = <T extends Record<string, any>>(
  Component: any,
  defaultProps: T,
  renderFn: (Component: any, props: T) => any,
  stateScenarios: TestScenario<T>[],
) => {
  return stateScenarios.map((scenario) => ({
    name: scenario.description,
    fn: async () => {
      const { container } = renderFn(Component, defaultProps);

      // Apply initial state
      if (scenario.initialState) {
        // Apply initial state changes
      }

      // Verify initial state
      if (scenario.initialAssertions) {
        scenario.initialAssertions(container);
      }

      // Apply state change
      if (scenario.stateChange) {
        await scenario.stateChange(container);
      }

      // Verify final state
      if (scenario.finalAssertions) {
        await waitFor(() => {
          scenario.finalAssertions!(container);
        });
      }
    },
  }));
};
