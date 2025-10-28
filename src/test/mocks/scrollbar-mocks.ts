import { ScrollbarTestData } from "../types/test-types";

/**
 * DRY mock data for Scrollbar component tests
 */
export const createScrollbarTestData = (
  overrides: Partial<ScrollbarTestData> = {},
): ScrollbarTestData => ({
  content: "Test content",
  width: 400,
  height: 100,
  direction: "horizontal",
  showArrows: false,
  ...overrides,
});

/**
 * Mock content generators for different scenarios
 */
export const mockContentGenerators = {
  short: () => "Short content",

  long: () => Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`).join(" "),

  veryLong: () =>
    Array.from({ length: 100 }, (_, i) => `Very long item ${i + 1}`).join(" "),

  withImages: () =>
    Array.from(
      { length: 10 },
      (_, i) =>
        `<img src="test${i}.jpg" alt="Test ${i}" style="width: 100px; height: 80px;" />`,
    ).join(""),

  mixed: () =>
    Array.from(
      { length: 15 },
      (_, i) =>
        `<div style="min-width: 100px; height: 80px; background: #f0f0f0; margin: 5px; display: inline-block;">Item ${
          i + 1
        }</div>`,
    ).join(""),
};

/**
 * Mock event data
 */
export const mockEvents = {
  mouseDown: {
    clientX: 100,
    clientY: 50,
    button: 0,
  },

  mouseMove: {
    clientX: 150,
    clientY: 50,
    button: 0,
  },

  wheel: {
    deltaX: 0,
    deltaY: 100,
    deltaZ: 0,
  },

  click: {
    clientX: 200,
    clientY: 50,
    button: 0,
  },
};

/**
 * Mock DOM measurements
 */
export const mockMeasurements = {
  small: {
    containerWidth: 200,
    containerHeight: 100,
    contentWidth: 400,
    contentHeight: 200,
  },

  medium: {
    containerWidth: 400,
    containerHeight: 100,
    contentWidth: 800,
    contentHeight: 200,
  },

  large: {
    containerWidth: 800,
    containerHeight: 200,
    contentWidth: 1600,
    contentHeight: 400,
  },
};

/**
 * Mock scroll positions
 */
export const mockScrollPositions = {
  start: 0,
  middle: 0.5,
  end: 1,
  custom: (ratio: number) => ratio,
};
