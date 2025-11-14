# CheckboxTree Component

Hierarchical checkbox tree component with support for nested checkboxes, indeterminate states, and automatic parent-child state propagation.

## Features

- ✅ Hierarchical/nested structure
- ✅ Automatic indeterminate state calculation
- ✅ Parent-child state propagation
- ✅ Disabled node support
- ✅ Customizable styling
- ✅ Dark/light theme support
- ✅ TypeScript typed

## Installation

```tsx
import { CheckboxTree } from '@sapphiresolid/ui'
```

## Usage

### Basic Tree

```tsx
import { CheckboxTree } from '@sapphiresolid/ui'

const treeData = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'File 1.txt' },
      { id: '1-2', label: 'File 2.txt' }
    ]
  },
  {
    id: '2',
    label: 'Images',
    children: [
      { id: '2-1', label: 'Photo.jpg' }
    ]
  }
]

function MyComponent() {
  return <CheckboxTree nodes={treeData} />
}
```

### With Callbacks

```tsx
<CheckboxTree
  nodes={treeData}
  onChange={(nodeId, checked) => {
    console.log(`Node ${nodeId} is now ${checked ? 'checked' : 'unchecked'}`)
  }}
  onTreeChange={(checkedNodes) => {
    console.log('Checked nodes:', checkedNodes)
  }}
/>
```

## Props

| Prop          | Type                        | Required | Default | Description                    |
| ------------- | --------------------------- | -------- | ------- | ------------------------------ |
| `nodes`       | `CheckboxTreeNode[]`        | ✅       | -       | Tree data                      |
| `isDark`      | `boolean`                   | ❌       | `true`  | Whether dark theme is active  |
| `onChange`    | `(nodeId: string, checked: boolean) => void` | ❌ | - | Callback when node changes |
| `onTreeChange` | `(checkedNodes: string[]) => void` | ❌ | - | Callback when any node changes |
| `class`       | `string`                    | ❌       | -       | Additional CSS class names   |
| `style`       | `JSX.CSSProperties`         | ❌       | -       | Inline CSS styles              |

## CheckboxTreeNode

```tsx
interface CheckboxTreeNode {
  id: string                    // Unique identifier
  label: string                 // Display label
  checked?: boolean             // Initial checked state
  disabled?: boolean            // Whether node is disabled
  children?: CheckboxTreeNode[]  // Child nodes
}
```

## Examples

### File System Tree

```tsx
const fileTree = [
  {
    id: 'root',
    label: 'Project',
    children: [
      {
        id: 'src',
        label: 'src',
        children: [
          { id: 'src-index', label: 'index.ts' },
          { id: 'src-app', label: 'App.tsx' }
        ]
      },
      {
        id: 'public',
        label: 'public',
        children: [
          { id: 'public-favicon', label: 'favicon.ico' }
        ]
      }
    ]
  }
]

<CheckboxTree nodes={fileTree} />
```

### With Initial State

```tsx
const tree = [
  {
    id: '1',
    label: 'Parent',
    checked: true,
    children: [
      { id: '1-1', label: 'Child 1', checked: true },
      { id: '1-2', label: 'Child 2', checked: false }
    ]
  }
]

<CheckboxTree nodes={tree} />
```

### With Disabled Nodes

```tsx
const tree = [
  {
    id: '1',
    label: 'Parent',
    disabled: true,
    children: [
      { id: '1-1', label: 'Child 1' },
      { id: '1-2', label: 'Child 2', disabled: true }
    ]
  }
]

<CheckboxTree nodes={tree} />
```

### Deep Nesting

```tsx
const deepTree = [
  {
    id: '1',
    label: 'Level 1',
    children: [
      {
        id: '1-1',
        label: 'Level 2',
        children: [
          {
            id: '1-1-1',
            label: 'Level 3',
            children: [
              { id: '1-1-1-1', label: 'Level 4' }
            ]
          }
        ]
      }
    ]
  }
]

<CheckboxTree nodes={deepTree} />
```

## State Management

The component automatically manages:

- **Checked State**: When a parent is checked, all children are checked. When all children are checked, parent becomes checked.
- **Indeterminate State**: When some (but not all) children are checked, parent shows indeterminate state.
- **Propagation**: Changes propagate both up (to parents) and down (to children).

## Accessibility

- Uses semantic HTML
- Keyboard accessible
- Screen reader friendly
- Proper ARIA attributes via Checkbox component

## Styling

The tree uses CSS custom properties and can be customized:

```tsx
<CheckboxTree
  nodes={treeData}
  class="my-custom-tree"
  style={{ padding: '16px' }}
/>
```

## Design System

Follows Material 3 design principles:

- Indented nested levels
- Hover effects
- Theme-aware colors
- Smooth transitions
