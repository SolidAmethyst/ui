# Testing Infrastructure

This directory contains the testing infrastructure for the Solid UI Toolkit, designed with DRY principles for easy component testing.

## 📁 Structure

```
src/test/
├── setup.ts                    # Global test setup
├── utils/
│   ├── test-utils.tsx          # Custom render utilities
│   ├── component-test-helpers.ts # DRY test helpers
│   └── __tests__/              # Tests for utilities
├── mocks/
│   ├── scrollbar-mocks.ts      # Mock data for Scrollbar
│   └── __tests__/              # Tests for mocks
├── types/
│   └── test-types.ts           # TypeScript types for tests
└── README.md                   # This file
```

## 🧪 Test Helpers

### `testComponentProps`

Tests component prop validation with valid/invalid values.

```typescript
testComponentProps(Component, defaultProps, {
  propName: "direction",
  validValues: ["horizontal", "vertical"],
  invalidValues: ["invalid", null],
  renderFn: renderComponent,
});
```

### `testComponentEvents`

Tests component event handling.

```typescript
testComponentEvents(Component, defaultProps, [
  {
    eventName: "click",
    triggerFn: (element) => element.click(),
    expectedBehavior: (container) => expect(container).toBeInTheDocument(),
  },
]);
```

### `testAccessibility`

Tests basic accessibility requirements.

```typescript
testAccessibility(Component, defaultProps, renderFn);
```

### `testResponsiveBehavior`

Tests component behavior across different screen sizes.

```typescript
testResponsiveBehavior(Component, defaultProps, renderFn, [
  { name: "mobile", width: 375, height: 667 },
  { name: "desktop", width: 1920, height: 1080 },
]);
```

### `testStateChanges`

Tests component state transitions.

```typescript
testStateChanges(Component, defaultProps, renderFn, [
  {
    description: "State change test",
    initialAssertions: (container) => {
      /* ... */
    },
    stateChange: (container) => {
      /* ... */
    },
    finalAssertions: (container) => {
      /* ... */
    },
  },
]);
```

## 🎭 Mock Data

### `createScrollbarTestData`

Creates test data for Scrollbar component with overrides.

```typescript
const data = createScrollbarTestData({
  width: 800,
  direction: "vertical",
  showArrows: true,
});
```

### `mockContentGenerators`

Pre-built content generators for different scenarios.

```typescript
const shortContent = mockContentGenerators.short();
const longContent = mockContentGenerators.long();
const mixedContent = mockContentGenerators.mixed();
```

### `mockEvents`

Pre-built event objects for testing.

```typescript
fireEvent.mouseDown(element, mockEvents.mouseDown);
fireEvent.click(element, mockEvents.click);
```

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests once
npm run test:run
```

## 📝 Writing Tests for New Components

1. **Create component test file:**

   ```
   src/components/ui/your-component/__tests__/your-component.test.tsx
   ```

2. **Use test helpers:**

   ```typescript
   import {
     testComponentProps,
     testAccessibility,
   } from "../../../test/utils/component-test-helpers";
   ```

3. **Create mock data:**

   ```
   src/test/mocks/your-component-mocks.ts
   ```

4. **Follow the pattern:**
   - Rendering tests
   - Props validation
   - Event handling
   - Accessibility
   - Responsive behavior
   - Edge cases

## 🎯 Best Practices

- **DRY**: Use test helpers for common patterns
- **Descriptive**: Write clear test descriptions
- **Isolated**: Each test should be independent
- **Fast**: Keep tests fast and focused
- **Coverage**: Aim for high test coverage
- **Maintainable**: Keep tests simple and readable

## 🔧 Configuration

Tests are configured in `vitest.config.ts` with:

- jsdom environment for DOM testing
- Global test utilities
- Path aliases for imports
- Setup files for common configuration
