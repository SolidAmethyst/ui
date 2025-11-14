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
/>`
	},

	customization: `@layer base {
  :root {
    --table-border-color-dark: rgba(255, 255, 255, 0.1);
    --table-border-color-light: rgba(0, 0, 0, 0.1);
    --table-header-background-dark: rgba(255, 255, 255, 0.05);
    --table-header-background-light: rgba(0, 0, 0, 0.05);
    --table-row-hover-dark: rgba(255, 255, 255, 0.05);
    --table-row-hover-light: rgba(0, 0, 0, 0.05);
    --table-cell-padding: 12px 16px;
    --table-border-radius: 8px;
  }

  .dark,
  [data-theme="dark"] {
    --table-border-color-dark: rgba(255, 255, 255, 0.1);
    --table-border-color-light: rgba(0, 0, 0, 0.1);
    --table-header-background-dark: rgba(255, 255, 255, 0.05);
    --table-header-background-light: rgba(0, 0, 0, 0.05);
    --table-row-hover-dark: rgba(255, 255, 255, 0.05);
    --table-row-hover-light: rgba(0, 0, 0, 0.05);
    --table-cell-padding: 12px 16px;
    --table-border-radius: 8px;
  }
}`
} as const
