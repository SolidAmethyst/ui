# Modal Component

Modal dialog component with overlay, focus trap, and keyboard navigation. Perfect for dialogs, confirmations, forms, and other modal content.

## Features

- ✅ Overlay backdrop with blur effect
- ✅ Focus trap (keeps focus within modal)
- ✅ Keyboard navigation (Escape to close, Tab cycling)
- ✅ Portal rendering (renders in document.body)
- ✅ Smooth animations
- ✅ Customizable sizes (sm, md, lg, xl, full, or custom)
- ✅ Dark/light theme support
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed

## Installation

```tsx
import { Modal } from '@sapphiresolid/ui'
```

## Usage

### Basic Usage

```tsx
import { createSignal } from 'solid-js'
import { Modal } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Modal Title</h2>
          <p>Modal content goes here.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </>
  )
}
```

## Props

| Prop                  | Type                      | Required | Default | Description                                    |
| --------------------- | ------------------------- | -------- | ------- | ---------------------------------------------- |
| `isOpen`              | `boolean`                 | ✅       | -       | Whether the modal is open                      |
| `onClose`             | `() => void`              | ✅       | -       | Callback when modal should be closed           |
| `isDark`              | `boolean`                 | ❌       | `true`  | Whether dark theme is active                   |
| `showBackdrop`        | `boolean`                 | ❌       | `true`  | Whether to show backdrop overlay               |
| `closeOnBackdropClick`| `boolean`                 | ❌       | `true`  | Whether to close on backdrop click             |
| `closeOnEscape`       | `boolean`                 | ❌       | `true`  | Whether to close on Escape key                 |
| `trapFocus`           | `boolean`                 | ❌       | `true`  | Whether to trap focus within modal             |
| `zIndex`              | `number`                  | ❌       | `10000` | Custom z-index for modal                       |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| string` | ❌ | `'md'` | Modal size |
| `class`               | `string`                  | ❌       | -       | Additional CSS class names                     |
| `style`               | `JSX.CSSProperties`        | ❌       | -       | Inline CSS styles                               |
| `children`            | `JSX.Element`             | ❌       | -       | Modal content                                  |

## Sizes

### Predefined Sizes

- `sm` - Small (max-width: 320px)
- `md` - Medium (max-width: 480px) - default
- `lg` - Large (max-width: 640px)
- `xl` - Extra Large (max-width: 960px)
- `full` - Full screen (100% width and height)

### Custom Size

You can also provide a custom size string:

```tsx
<Modal isOpen={isOpen()} onClose={onClose} size="600px">
  {/* content */}
</Modal>
```

## Examples

### Modal Without Backdrop

```tsx
<Modal
  isOpen={isOpen()}
  onClose={onClose}
  showBackdrop={false}
>
  {/* content */}
</Modal>
```

### Modal That Doesn't Close on Backdrop Click

```tsx
<Modal
  isOpen={isOpen()}
  onClose={onClose}
  closeOnBackdropClick={false}
>
  {/* content */}
</Modal>
```

### Large Modal

```tsx
<Modal
  isOpen={isOpen()}
  onClose={onClose}
  size="lg"
>
  {/* content */}
</Modal>
```

### Full Screen Modal

```tsx
<Modal
  isOpen={isOpen()}
  onClose={onClose}
  size="full"
>
  {/* content */}
</Modal>
```

### Modal Without Focus Trap

```tsx
<Modal
  isOpen={isOpen()}
  onClose={onClose}
  trapFocus={false}
>
  {/* content */}
</Modal>
```

## Focus Trap

The modal automatically traps focus within its content when `trapFocus` is `true` (default). This means:

- Focus cycles through focusable elements (buttons, inputs, links) using Tab
- Shift+Tab cycles backwards
- Focus cannot escape the modal to elements outside
- First focusable element receives focus when modal opens

## Keyboard Navigation

- **Escape** - Closes the modal (if `closeOnEscape` is `true`)
- **Tab** - Moves focus to next focusable element
- **Shift+Tab** - Moves focus to previous focusable element

## Accessibility

- Uses `role="dialog"` for screen readers
- Has `aria-modal="true"` attribute
- Focus trap ensures keyboard navigation stays within modal
- Escape key support for closing

## Styling

The modal uses CSS custom properties and can be customized:

```tsx
<Modal
  isOpen={isOpen()}
  onClose={onClose}
  class="my-custom-modal"
  style={{ 'border-radius': '16px' }}
>
  {/* content */}
</Modal>
```

## Portal Rendering

The modal renders in a portal to `document.body`, ensuring it appears above all other content and is properly positioned relative to the viewport.

## Design System

Follows Material 3 design principles:

- Glass morphism effect on backdrop
- Smooth scale and fade animations
- Backdrop blur effect
- Centered positioning
- Responsive sizing
