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

<Table data={data} columns={columns} />`
	}
} as const

