# Table Component

Table component with sorting and pagination support. Perfect for displaying structured data in a tabular format with interactive features.

## Features

- ✅ Column-based data display
- ✅ Sortable columns
- ✅ Custom sort functions
- ✅ Pagination support
- ✅ Column alignment
- ✅ Row hover effects
- ✅ Dark/light theme support
- ✅ Fully accessible (ARIA attributes)
- ✅ TypeScript typed with generics

## Installation

```tsx
import { Table } from '@sapphiresolid/ui'
```

## Usage

### Basic Table

```tsx
import { Table } from '@sapphiresolid/ui'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 28 }
]

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row: User) => row.name,
    sortable: true
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row: User) => row.email
  },
  {
    id: 'age',
    header: 'Age',
    accessor: (row: User) => row.age,
    sortable: true
  }
]

function MyComponent() {
  return <Table data={data} columns={columns} />
}
```

### With Pagination

```tsx
<Table
  data={data}
  columns={columns}
  paginated={true}
  pageSize={10}
/>
```

### With Sorting Callback

```tsx
<Table
  data={data}
  columns={columns}
  onSortChange={(columnId, direction) => {
    console.log(`Sorting by ${columnId} in ${direction} direction`)
  }}
/>
```

## Props

| Prop                  | Type                        | Required | Default | Description                    |
| --------------------- | --------------------------- | -------- | ------- | ------------------------------ |
| `data`                | `T[]`                       | ✅       | -       | Table data (rows)              |
| `columns`             | `TableColumn<T>[]`          | ✅       | -       | Column definitions             |
| `isDark`              | `boolean`                   | ❌       | `true`  | Whether dark theme is active  |
| `sortable`            | `boolean`                   | ❌       | `true`  | Whether sorting is enabled     |
| `defaultSortColumn`   | `string`                    | ❌       | -       | Initial sort column ID         |
| `defaultSortDirection` | `'asc' \| 'desc' \| null` | ❌ | - | Initial sort direction      |
| `onSortChange`        | `(columnId: string, direction: SortDirection) => void` | ❌ | - | Callback when sort changes |
| `paginated`           | `boolean`                   | ❌       | `false` | Whether pagination is enabled  |
| `pageSize`            | `number`                    | ❌       | `10`    | Items per page                 |
| `page`                | `number`                    | ❌       | -       | Current page (controlled)     |
| `onPageChange`        | `(page: number) => void`    | ❌       | -       | Callback when page changes     |
| `class`               | `string`                    | ❌       | -       | Additional CSS class names   |
| `style`               | `JSX.CSSProperties`         | ❌       | -       | Inline CSS styles              |

## TableColumn

```tsx
interface TableColumn<T> {
  id: string                           // Unique identifier
  header: string | JSX.Element         // Column header
  accessor: (row: T) => string | number | JSX.Element  // Cell value accessor
  sortable?: boolean                   // Whether column is sortable
  sortFn?: (a: T, b: T) => number      // Custom sort function
  width?: string                       // Column width
  align?: 'left' | 'center' | 'right'  // Column alignment
}
```

## Examples

### Basic Data Table

```tsx
const users = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
]

const columns = [
  { id: 'name', header: 'Name', accessor: (u) => u.name },
  { id: 'role', header: 'Role', accessor: (u) => u.role }
]

<Table data={users} columns={columns} />
```

### With Custom Sort

```tsx
const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true,
    sortFn: (a, b) => {
      // Custom sort: case-insensitive
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    }
  }
]

<Table data={data} columns={columns} />
```

### With JSX in Cells

```tsx
const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => (
      <div>
        <strong>{row.name}</strong>
        <span style={{ color: 'gray' }}> ({row.email})</span>
      </div>
    )
  }
]

<Table data={data} columns={columns} />
```

### With Column Alignment

```tsx
const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    align: 'left'
  },
  {
    id: 'age',
    header: 'Age',
    accessor: (row) => row.age,
    align: 'center'
  },
  {
    id: 'price',
    header: 'Price',
    accessor: (row) => `$${row.price}`,
    align: 'right'
  }
]

<Table data={data} columns={columns} />
```

### Controlled Pagination

```tsx
import { createSignal } from 'solid-js'

function MyComponent() {
  const [page, setPage] = createSignal(1)

  return (
    <Table
      data={data}
      columns={columns}
      paginated={true}
      pageSize={5}
      page={page()}
      onPageChange={setPage}
    />
  )
}
```

### Default Sort

```tsx
<Table
  data={data}
  columns={columns}
  defaultSortColumn="name"
  defaultSortDirection="asc"
/>
```

## Sorting

- Click column header to sort ascending
- Click again to sort descending
- Click third time to remove sort
- Only sortable columns can be sorted
- Custom sort functions are supported

## Pagination

- Automatically calculates total pages
- Shows current page and total pages
- Previous/Next buttons
- Displays range of items (e.g., "Showing 1 to 10 of 50 entries")
- Buttons disabled at boundaries

## Accessibility

- Uses semantic HTML (`<table>`, `<thead>`, `<tbody>`)
- Provides `aria-sort` for sortable columns
- Keyboard accessible
- Screen reader friendly
- Proper table structure

## Styling

The table uses CSS custom properties and can be customized:

```tsx
<Table
  data={data}
  columns={columns}
  class="my-custom-table"
  style={{ 'border-radius': '12px' }}
/>
```

## Design System

Follows Material 3 design principles:

- Clean borders
- Alternating row colors
- Hover effects
- Sort indicators
- Theme-aware colors
- Responsive layout

