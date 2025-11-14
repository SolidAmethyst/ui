# Alert Component

Alert component for displaying inline messages and warnings. Perfect for form validation, error messages, success notifications, and informational alerts.

## Features

- ✅ Four variants: success, error, warning, info
- ✅ Title and description support
- ✅ Optional close button
- ✅ Children content support
- ✅ Dark/light theme support
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed

## Installation

```tsx
import { Alert } from '@sapphiresolid/ui'
```

## Usage

### Basic Alert

```tsx
import { Alert } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <Alert
      variant="info"
      description="This is an informational alert."
    />
  )
}
```

### With Title

```tsx
<Alert
  variant="success"
  title="Success!"
  description="Your changes have been saved."
/>
```

### With Close Button

```tsx
import { createSignal } from 'solid-js'
import { Alert } from '@sapphiresolid/ui'

function MyComponent() {
  const [showAlert, setShowAlert] = createSignal(true)

  return (
    <Show when={showAlert()}>
      <Alert
        variant="warning"
        title="Warning"
        description="This action cannot be undone."
        showClose={true}
        onClose={() => setShowAlert(false)}
      />
    </Show>
  )
}
```

## Props

| Prop          | Type                      | Required | Default | Description                    |
| ------------- | ------------------------- | -------- | ------- | ------------------------------ |
| `variant`     | `'success' \| 'error' \| 'warning' \| 'info'` | ❌ | `'info'` | Alert variant                  |
| `title`       | `string`                  | ❌       | -       | Alert title                    |
| `description` | `string`                  | ❌       | -       | Alert description              |
| `isDark`      | `boolean`                 | ❌       | `true`  | Whether dark theme is active  |
| `showClose`   | `boolean`                 | ❌       | `false` | Whether to show close button   |
| `onClose`     | `() => void`              | ❌       | -       | Callback when alert is closed  |
| `class`       | `string`                  | ❌       | -       | Additional CSS class names     |
| `style`       | `JSX.CSSProperties`       | ❌       | -       | Inline CSS styles              |
| `children`    | `JSX.Element`             | ❌       | -       | Alert content (alternative to description) |

## Variants

### Success

```tsx
<Alert
  variant="success"
  title="Success!"
  description="Operation completed successfully."
/>
```

### Error

```tsx
<Alert
  variant="error"
  title="Error"
  description="Something went wrong. Please try again."
/>
```

### Warning

```tsx
<Alert
  variant="warning"
  title="Warning"
  description="This action cannot be undone."
/>
```

### Info

```tsx
<Alert
  variant="info"
  title="Information"
  description="New features are available."
/>
```

## Examples

### Form Validation Error

```tsx
import { Alert } from '@sapphiresolid/ui'

function LoginForm() {
  const [error, setError] = createSignal<string | null>(null)

  return (
    <form>
      {error() && (
        <Alert
          variant="error"
          description={error()}
          showClose={true}
          onClose={() => setError(null)}
        />
      )}
      {/* Form fields */}
    </form>
  )
}
```

### Success Message

```tsx
<Alert
  variant="success"
  title="Changes Saved"
  description="Your profile has been updated successfully."
/>
```

### Dismissible Warning

```tsx
import { createSignal, Show } from 'solid-js'
import { Alert } from '@sapphiresolid/ui'

function MyComponent() {
  const [showWarning, setShowWarning] = createSignal(true)

  return (
    <Show when={showWarning()}>
      <Alert
        variant="warning"
        title="Beta Feature"
        description="This feature is in beta and may have issues."
        showClose={true}
        onClose={() => setShowWarning(false)}
      />
    </Show>
  )
}
```

### With Children

```tsx
<Alert variant="info">
  <div>
    <strong>Note:</strong> This is a custom alert with HTML content.
  </div>
</Alert>
```

## Accessibility

- Uses `role="alert"` for screen readers
- Provides ARIA labels for close buttons
- Keyboard accessible
- Screen reader friendly

## Styling

The alert uses CSS custom properties and can be customized:

```tsx
<Alert
  variant="info"
  description="Custom styled alert"
  class="my-custom-alert"
  style={{ 'border-radius': '12px' }}
/>
```

## Design System

Follows Material 3 design principles:

- Color-coded variants
- Subtle borders and backgrounds
- Icon indicators
- Theme-aware colors
- Responsive sizing

