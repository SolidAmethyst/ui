# ProgressBar Component

Progress bar component with determinate and indeterminate variants. Perfect for showing loading states, installation progress, file uploads, and other progress indicators.

## Features

- ✅ Determinate variant (with specific progress value)
- ✅ Indeterminate variant (animated, no specific value)
- ✅ Customizable height
- ✅ Optional label with percentage or custom text
- ✅ Dark/light theme support
- ✅ Smooth animations
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed

## Installation

```tsx
import { ProgressBar } from '@sapphiresolid/ui'
```

## Usage

### Basic Determinate Progress Bar

```tsx
import { ProgressBar } from '@sapphiresolid/ui'

function MyComponent() {
  return <ProgressBar value={50} />
}
```

### Indeterminate Progress Bar

```tsx
import { ProgressBar } from '@sapphiresolid/ui'

function MyComponent() {
  return <ProgressBar variant="indeterminate" />
}
```

### With Label

```tsx
import { ProgressBar } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <ProgressBar
      value={75}
      showLabel={true}
    />
  )
}
```

### Custom Label

```tsx
import { ProgressBar } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <ProgressBar
      value={50}
      showLabel={true}
      label="Loading files..."
    />
  )
}
```

## Props

| Prop      | Type                        | Required | Default          | Description                                    |
| --------- | --------------------------- | -------- | ---------------- | ---------------------------------------------- |
| `value`   | `number`                    | ❌       | `0`              | Progress value (0-100) for determinate variant |
| `variant` | `'determinate' \| 'indeterminate'` | ❌ | `'determinate'` | Variant type                                   |
| `isDark`  | `boolean`                   | ❌       | `true`           | Whether dark theme is active                   |
| `showLabel` | `boolean`                 | ❌       | `false`          | Show label with percentage                     |
| `label`   | `string`                    | ❌       | -                | Custom label text (overrides default percentage) |
| `height`  | `string`                    | ❌       | `'8px'`          | Height of progress bar                         |
| `class`   | `string`                    | ❌       | -                | Additional CSS class names                     |
| `style`   | `JSX.CSSProperties`         | ❌       | -                | Inline CSS styles                               |

## Variants

### Determinate

Shows a specific progress value (0-100). The progress bar fills from left to right based on the value.

```tsx
<ProgressBar value={75} />
```

### Indeterminate

Animated progress bar that continuously moves, indicating that progress is happening but the exact value is unknown.

```tsx
<ProgressBar variant="indeterminate" />
```

## Examples

### Installation Progress

```tsx
import { createSignal } from 'solid-js'
import { ProgressBar } from '@sapphiresolid/ui'

function InstallationProgress() {
  const [progress, setProgress] = createSignal(0)

  // Simulate installation
  const install = async () => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setProgress(i)
    }
  }

  return (
    <div>
      <ProgressBar
        value={progress()}
        showLabel={true}
        label={`Installing... ${progress()}%`}
      />
    </div>
  )
}
```

### File Upload

```tsx
import { createSignal } from 'solid-js'
import { ProgressBar } from '@sapphiresolid/ui'

function FileUpload() {
  const [uploadProgress, setUploadProgress] = createSignal(0)
  const [isUploading, setIsUploading] = createSignal(false)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    // Simulate upload
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploadProgress(i)
    }
    setIsUploading(false)
  }

  return (
    <div>
      {isUploading() ? (
        <ProgressBar
          value={uploadProgress()}
          showLabel={true}
          label={`Uploading... ${uploadProgress()}%`}
        />
      ) : (
        <ProgressBar variant="indeterminate" />
      )}
    </div>
  )
}
```

### Custom Height

```tsx
<ProgressBar
  value={60}
  height="16px"
/>
```

### Dark/Light Theme

```tsx
<ProgressBar
  value={50}
  isDark={false}
/>
```

## Accessibility

- Uses `role="progressbar"` for screen readers
- Provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate variant
- Provides `aria-label` for description
- Indeterminate variant doesn't expose value attributes (as per ARIA spec)

## Styling

The progress bar uses CSS custom properties and can be customized:

```tsx
<ProgressBar
  value={50}
  class="my-custom-progress"
  style={{ 'border-radius': '8px' }}
/>
```

## Design System

Follows Material 3 design principles:

- Smooth gradient fill
- Subtle glow effect
- Smooth animations
- Theme-aware colors
- Responsive sizing

