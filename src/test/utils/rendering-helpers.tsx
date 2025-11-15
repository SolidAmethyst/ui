/**
 * Rendering test utilities
 * Helpers for component rendering and page loading tests
 */

import { render as solidRender, waitFor } from "@solidjs/testing-library";
import type { Component, JSX } from "solid-js";

/**
 * Render component without isDark prop
 */
export function renderComponent<T extends Record<string, any>>(
  Component: Component<T>,
  props: T = {} as T,
) {
  return solidRender(() => <Component {...props} />);
}

/**
 * Wait for page to finish loading (no Loading... state)
 */
export async function waitForPageLoad(
  container: HTMLElement,
  timeout = 5000,
): Promise<void> {
  await waitFor(
    () => {
      // Check for Loading... text
      const loadingText = Array.from(container.querySelectorAll("*")).find(
        (el) => el.textContent?.includes("Loading..."),
      );
      expect(loadingText).toBeUndefined();
    },
    { timeout },
  );
}

/**
 * Assert that page is not stuck on Loading... state
 */
export function assertNoLoadingState(container: HTMLElement): void {
  const loadingElements = Array.from(container.querySelectorAll("*")).filter(
    (el) => el.textContent?.trim() === "Loading...",
  );
  expect(loadingElements.length).toBe(0);
}

/**
 * Wait for element to appear in DOM
 */
export async function waitForElement(
  container: HTMLElement,
  selector: string,
  timeout = 5000,
): Promise<HTMLElement> {
  let element: HTMLElement | null = null;
  await waitFor(
    () => {
      element = container.querySelector(selector) as HTMLElement;
      expect(element).toBeTruthy();
    },
    { timeout },
  );
  return element!;
}

/**
 * Wait for text content to appear
 */
export async function waitForText(
  container: HTMLElement,
  text: string,
  timeout = 5000,
): Promise<void> {
  await waitFor(
    () => {
      expect(container.textContent).toContain(text);
    },
    { timeout },
  );
}

/**
 * Check if component rendered successfully
 */
export function assertComponentRendered(
  container: HTMLElement,
  expectedContent?: string,
): void {
  expect(container.firstChild).toBeTruthy();
  if (expectedContent) {
    expect(container.textContent).toContain(expectedContent);
  }
}

/**
 * Render with theme context
 */
export function renderWithTheme(
  ui: () => JSX.Element,
  theme: "dark" | "light" = "light",
) {
  // Set theme before rendering
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
  return solidRender(ui);
}
