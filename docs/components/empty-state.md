# EmptyState Component

Empty state component for displaying empty content states. Perfect for showing when lists are empty, no search results, or when content is loading.

## Features

- ✅ Icon support (Material Symbols)
- ✅ Title and description
- ✅ Action button/link support
- ✅ Custom content support
- ✅ Dark/light theme support
- ✅ TypeScript typed

## Installation

```tsx
import { EmptyState } from '@sapphiresolid/ui'
```

## Usage

### Basic Empty State

```tsx
import { EmptyState } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <EmptyState
      icon="inbox"
      title="No items"
      description="There are no items to display"
    />
  )
}
```

### With Action Button

```tsx
import { EmptyState, Button } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <EmptyState
      icon="folder"
      title="No files"
      description="Upload your first file to get started"
      action={<Button>Upload File</Button>}
    />
  )
}
```

## Props

| Prop          | Type            | Required | Default | Description                    |
| ------------- | --------------- | -------- | ------- | ------------------------------ |
| `icon`        | `string`        | ❌       | -       | Material Symbols icon name     |
| `title`       | `string`        | ❌       | -       | Title text                     |
| `description` | `string`        | ❌       | -       | Description text               |
| `action`      | `JSX.Element`   | ❌       | -       | Action button/link             |
| `isDark`      | `boolean`       | ❌       | `true`  | Whether dark theme is active   |
| `class`       | `string`        | ❌       | -       | Additional CSS class names   |
| `style`       | `JSX.CSSProperties` | ❌    | -       | Inline CSS styles              |
| `children`    | `JSX.Element`   | ❌       | -       | Custom content (overrides icon/title/description) |

## Examples

### Empty List

```tsx
<EmptyState
  icon="list"
  title="No items yet"
  description="Start by adding your first item"
  action={<Button onClick={handleAdd}>Add Item</Button>}
/>
```

### No Search Results

```tsx
<EmptyState
  icon="search_off"
  title="No results found"
  description="Try adjusting your search terms"
/>
```

### Empty Folder

```tsx
<EmptyState
  icon="folder_open"
  title="This folder is empty"
  description="Drag and drop files here or click to upload"
  action={<Button>Upload Files</Button>}
/>
```

### Custom Content

```tsx
<EmptyState>
  <div>
    <img src="/empty-illustration.svg" alt="Empty" />
    <h2>Custom Empty State</h2>
    <p>With custom HTML content</p>
  </div>
</EmptyState>
```

### Minimal (Icon Only)

```tsx
<EmptyState icon="inbox" />
```

### Title Only

```tsx
<EmptyState title="Nothing here" />
```

## Common Use Cases

### Empty Table/List

```tsx
<Show when={items.length === 0}>
  <EmptyState
    icon="table_chart"
    title="No data"
    description="There is no data to display"
  />
</Show>
```

### No Search Results

```tsx
<Show when={searchQuery && results.length === 0}>
  <EmptyState
    icon="search_off"
    title="No results"
    description={`No results found for "${searchQuery}"`}
  />
</Show>
```

### Loading State Alternative

```tsx
<Show when={!loading && items.length === 0}>
  <EmptyState
    icon="hourglass_empty"
    title="Loading..."
    description="Please wait while we fetch your data"
  />
</Show>
```

## Accessibility

- Uses semantic HTML
- Proper heading hierarchy (h3 for title)
- Screen reader friendly
- Descriptive text

## Styling

The empty state uses CSS custom properties and can be customized:

```tsx
<EmptyState
  icon="inbox"
  title="Empty"
  class="my-custom-empty"
  style={{ padding: '64px' }}
/>
```

## Design System

Follows Material 3 design principles:

- Large, muted icon
- Clear typography hierarchy
- Centered layout
- Theme-aware colors
- Spacious padding
