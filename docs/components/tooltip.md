# Tooltip Component

Tooltip component for displaying contextual information on hover or focus. Perfect for providing additional details, help text, or descriptions for UI elements.

## Features

- ✅ Four positioning options: top, bottom, left, right
- ✅ Automatic viewport boundary detection
- ✅ Hover and focus support
- ✅ Configurable delay
- ✅ Portal rendering
- ✅ Dark/light theme support
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed

## Installation

```tsx
import { Tooltip } from '@sapphiresolid/ui'
```

## Usage

### Basic Tooltip

```tsx
import { Tooltip } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <Tooltip content="This is a tooltip">
      <button>Hover me</button>
    </Tooltip>
  )
}
```

### With Position

```tsx
<Tooltip content="Tooltip text" position="bottom">
  <button>Hover me</button>
</Tooltip>
```

### With Custom Delay

```tsx
<Tooltip content="Tooltip text" delay={500}>
  <button>Hover me</button>
</Tooltip>
```

## Props

| Prop          | Type                      | Required | Default | Description                    |
| ------------- | ------------------------- | -------- | ------- | ------------------------------ |
| `content`     | `string \| JSX.Element`   | ✅       | -       | Tooltip content                |
| `position`    | `'top' \| 'bottom' \| 'left' \| 'right'` | ❌ | `'top'` | Tooltip position               |
| `isDark`      | `boolean`                 | ❌       | `true`  | Whether dark theme is active  |
| `delay`       | `number`                  | ❌       | `300`   | Delay before showing (ms)     |
| `showOnFocus` | `boolean`                 | ❌       | `true`  | Whether to show on focus      |
| `class`       | `string`                  | ❌       | -       | Additional CSS class names   |
| `style`       | `JSX.CSSProperties`       | ❌       | -       | Inline CSS styles              |
| `children`    | `JSX.Element`             | ✅       | -       | Element that triggers tooltip  |

## Positioning

### Top

```tsx
<Tooltip content="Tooltip text" position="top">
  <button>Hover me</button>
</Tooltip>
```

### Bottom

```tsx
<Tooltip content="Tooltip text" position="bottom">
  <button>Hover me</button>
</Tooltip>
```

### Left

```tsx
<Tooltip content="Tooltip text" position="left">
  <button>Hover me</button>
</Tooltip>
```

### Right

```tsx
<Tooltip content="Tooltip text" position="right">
  <button>Hover me</button>
</Tooltip>
```

The tooltip automatically adjusts its position if it would go off-screen.

## Examples

### With Icon

```tsx
<Tooltip content="Delete item">
  <button>
    <span class="material-symbols-rounded">delete</span>
  </button>
</Tooltip>
```

### With JSX Content

```tsx
<Tooltip
  content={
    <div>
      <strong>Custom Tooltip</strong>
      <p>With HTML content</p>
    </div>
  }
>
  <button>Hover me</button>
</Tooltip>
```

### Disable Focus

```tsx
<Tooltip content="Tooltip text" showOnFocus={false}>
  <button>Hover only</button>
</Tooltip>
```

### Custom Delay

```tsx
<Tooltip content="Tooltip text" delay={1000}>
  <button>Hover me (1s delay)</button>
</Tooltip>
```

## Accessibility

- Uses `role="tooltip"` for screen readers
- Supports keyboard focus
- Automatically positions to stay within viewport
- Screen reader friendly

## Styling

The tooltip uses CSS custom properties and can be customized:

```tsx
<Tooltip
  content="Custom styled tooltip"
  class="my-custom-tooltip"
  style={{ 'border-radius': '8px' }}
>
  <button>Hover me</button>
</Tooltip>
```

## Design System

Follows Material 3 design principles:

- Glass morphism backdrop
- Smooth fade-in animations
- Arrow indicator
- Theme-aware colors
- Responsive positioning

