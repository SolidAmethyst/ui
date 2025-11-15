/**
 * Table Component Code Snippets
 */

export const tableSnippets = {
  imports: `import { Table } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 }
]

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row) => row.email
  }
]

<Table data={data} columns={columns} />`,

    pagination: `const data = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  // ... more items
]

<Table
  data={data}
  columns={columns}
  paginated={true}
  pageSize={10}
/>`,
  },

  customization: `@layer base {
  :root {
    /* Table component styling */
    --table-cell-padding: 12px 16px;
    --table-border-radius: 8px;
  }

  [data-theme="dark"] {
    /* Table uses same sizing in dark theme */
    --table-cell-padding: 12px 16px;
  }
}`,
} as const;
