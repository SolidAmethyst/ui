# Toast Component

Toast notification system with variants, positioning, and automatic dismissal. Perfect for showing success messages, errors, warnings, and informational notifications.

## Features

- ✅ Four variants: success, error, warning, info
- ✅ Multiple positioning options (top/bottom, left/center/right)
- ✅ Automatic dismissal with configurable duration
- ✅ Manual dismissal support
- ✅ Multiple toasts support
- ✅ Smooth animations
- ✅ Dark/light theme support
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed

## Installation

```tsx
import { ToastProvider, useToast } from '@sapphiresolid/ui'
```

## Usage

### Setup Provider

Wrap your application with `ToastProvider`:

```tsx
import { ToastProvider } from '@sapphiresolid/ui'

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  )
}
```

### Show Toast

Use the `useToast` hook to show toasts:

```tsx
import { useToast } from '@sapphiresolid/ui'

function MyComponent() {
  const toast = useToast()

  const handleSuccess = () => {
    toast.showToast({
      variant: 'success',
      title: 'Success!',
      description: 'Operation completed successfully.'
    })
  }

  return <button onClick={handleSuccess}>Show Success</button>
}
```

## API

### useToast Hook

Returns an object with the following methods:

- `showToast(toast: Omit<Toast, 'id'>): string` - Shows a toast and returns its ID
- `dismissToast(id: string): void` - Dismisses a specific toast
- `dismissAll(): void` - Dismisses all toasts
- `toasts(): Toast[]` - Returns current toasts array

### Toast Data

```tsx
interface Toast {
  title?: string           // Toast title
  description?: string    // Toast description
  variant: 'success' | 'error' | 'warning' | 'info'
  duration?: number        // Duration in milliseconds (0 = no auto-dismiss)
  onClose?: () => void     // Callback when toast is closed
}
```

## Variants

### Success

```tsx
toast.showToast({
  variant: 'success',
  title: 'Success!',
  description: 'Your changes have been saved.'
})
```

### Error

```tsx
toast.showToast({
  variant: 'error',
  title: 'Error',
  description: 'Something went wrong. Please try again.'
})
```

### Warning

```tsx
toast.showToast({
  variant: 'warning',
  title: 'Warning',
  description: 'This action cannot be undone.'
})
```

### Info

```tsx
toast.showToast({
  variant: 'info',
  title: 'Information',
  description: 'New features are available.'
})
```

## Positioning

Configure toast position via `ToastProvider`:

```tsx
<ToastProvider position="bottom-left">
  {/* Your app */}
</ToastProvider>
```

Available positions:
- `top-left`
- `top-center`
- `top-right` (default)
- `bottom-left`
- `bottom-center`
- `bottom-right`

## Examples

### Basic Usage

```tsx
import { ToastProvider, useToast } from '@sapphiresolid/ui'

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  )
}

function MyComponent() {
  const toast = useToast()

  return (
    <button
      onClick={() => {
        toast.showToast({
          variant: 'success',
          title: 'Done!',
          description: 'Task completed successfully.'
        })
      }}
    >
      Show Toast
    </button>
  )
}
```

### Custom Duration

```tsx
toast.showToast({
  variant: 'info',
  title: 'Processing...',
  duration: 10000 // 10 seconds
})
```

### No Auto-Dismiss

```tsx
toast.showToast({
  variant: 'error',
  title: 'Critical Error',
  description: 'Please contact support.',
  duration: 0 // No auto-dismiss
})
```

### With Callback

```tsx
toast.showToast({
  variant: 'success',
  title: 'File uploaded',
  onClose: () => {
    console.log('Toast was closed')
  }
})
```

### Dismiss Programmatically

```tsx
const toastId = toast.showToast({
  variant: 'info',
  title: 'Processing...'
})

// Later...
toast.dismissToast(toastId)
```

### Dismiss All

```tsx
toast.dismissAll()
```

## ToastProvider Props

| Prop      | Type            | Required | Default        | Description                    |
| --------- | --------------- | -------- | -------------- | ------------------------------ |
| `children` | `JSX.Element`   | ✅       | -              | App content                    |
| `position` | `ToastPosition` | ❌       | `'top-right'`  | Default position for toasts    |
| `duration` | `number`        | ❌       | `5000`         | Default duration in milliseconds |
| `isDark`   | `boolean`       | ❌       | `true`         | Whether dark theme is active    |

## Accessibility

- Uses semantic HTML
- Provides ARIA labels for close buttons
- Keyboard accessible
- Screen reader friendly

## Styling

Toasts use CSS custom properties and can be customized via theme variables. The component follows Material 3 design principles with glass morphism effects.

## Design System

Follows Material 3 design principles:

- Glass morphism backdrop
- Smooth slide-in animations
- Color-coded variants
- Responsive sizing
- Theme-aware colors
