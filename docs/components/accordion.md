# Accordion Component

Accordion component with collapsible sections. Perfect for organizing content into expandable/collapsible panels, FAQs, and nested information.

## Features

- ✅ Multiple collapsible sections
- ✅ Single or multiple open items
- ✅ Smooth expand/collapse animations
- ✅ Disabled item support
- ✅ Default expanded items
- ✅ Dark/light theme support
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed

## Installation

```tsx
import { Accordion } from '@sapphiresolid/ui'
```

## Usage

### Basic Accordion

```tsx
import { Accordion } from '@sapphiresolid/ui'

const items = [
  {
    id: '1',
    header: 'Section 1',
    content: 'This is the content of section 1'
  },
  {
    id: '2',
    header: 'Section 2',
    content: 'This is the content of section 2'
  }
]

function MyComponent() {
  return <Accordion items={items} />
}
```

### Allow Multiple Open

```tsx
<Accordion items={items} allowMultiple={true} />
```

### With Default Expanded

```tsx
const items = [
  {
    id: '1',
    header: 'Section 1',
    content: 'Content 1',
    defaultExpanded: true
  },
  {
    id: '2',
    header: 'Section 2',
    content: 'Content 2'
  }
]

<Accordion items={items} />
```

## Props

| Prop          | Type                        | Required | Default | Description                    |
| ------------- | --------------------------- | -------- | ------- | ------------------------------ |
| `items`       | `AccordionItem[]`           | ✅       | -       | Accordion items                |
| `allowMultiple` | `boolean`                 | ❌       | `false` | Allow multiple items open      |
| `isDark`      | `boolean`                   | ❌       | `true`  | Whether dark theme is active  |
| `onChange`    | `(itemId: string, expanded: boolean) => void` | ❌ | - | Callback when item toggles |
| `class`       | `string`                    | ❌       | -       | Additional CSS class names   |
| `style`       | `JSX.CSSProperties`         | ❌       | -       | Inline CSS styles              |

## AccordionItem

```tsx
interface AccordionItem {
  id: string                    // Unique identifier
  header: string | JSX.Element // Header content
  content: string | JSX.Element // Content when expanded
  defaultExpanded?: boolean     // Initially expanded
  disabled?: boolean           // Whether item is disabled
}
```

## Examples

### FAQ Accordion

```tsx
const faqItems = [
  {
    id: 'q1',
    header: 'What is this?',
    content: 'This is a frequently asked question with a detailed answer.'
  },
  {
    id: 'q2',
    header: 'How does it work?',
    content: 'Here is an explanation of how it works.'
  },
  {
    id: 'q3',
    header: 'Is it free?',
    content: 'Yes, it is completely free to use.'
  }
]

<Accordion items={faqItems} />
```

### With JSX Content

```tsx
const items = [
  {
    id: '1',
    header: <strong>Bold Header</strong>,
    content: (
      <div>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </div>
    )
  }
]

<Accordion items={items} />
```

### With Disabled Items

```tsx
const items = [
  {
    id: '1',
    header: 'Enabled Section',
    content: 'This section can be expanded'
  },
  {
    id: '2',
    header: 'Disabled Section',
    content: 'This section cannot be expanded',
    disabled: true
  }
]

<Accordion items={items} />
```

### Single Open (Default)

```tsx
<Accordion items={items} allowMultiple={false} />
```

### Multiple Open

```tsx
<Accordion items={items} allowMultiple={true} />
```

### With Callback

```tsx
<Accordion
  items={items}
  onChange={(itemId, expanded) => {
    console.log(`Item ${itemId} is now ${expanded ? 'expanded' : 'collapsed'}`)
  }}
/>
```

## Accessibility

- Uses `role="button"` for headers
- Uses `role="region"` for content
- Provides `aria-expanded` attribute
- Provides `aria-disabled` for disabled items
- Keyboard accessible (Tab, Enter, Space)
- Screen reader friendly

## Styling

The accordion uses CSS custom properties and can be customized:

```tsx
<Accordion
  items={items}
  class="my-custom-accordion"
  style={{ 'border-radius': '12px' }}
/>
```

## Design System

Follows Material 3 design principles:

- Smooth expand/collapse animations
- Icon rotation on expand
- Hover effects
- Theme-aware colors
- Clean borders
