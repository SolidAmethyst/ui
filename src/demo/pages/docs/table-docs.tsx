import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Table } from '../../../components/ui/table'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import type { TableColumn } from '../../../components/ui/table'

interface TableDocsProps {
	isDark: Accessor<boolean>
}

interface User {
	id: number
	name: string
	email: string
	age: number
}

const mockData: User[] = [
	{ id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
	{ id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
	{ id: 3, name: 'Charlie', email: 'charlie@example.com', age: 28 }
]

const columns: TableColumn<User>[] = [
	{
		id: 'name',
		header: 'Name',
		accessor: row => row.name,
		sortable: true
	},
	{
		id: 'email',
		header: 'Email',
		accessor: row => row.email
	},
	{
		id: 'age',
		header: 'Age',
		accessor: row => row.age,
		sortable: true
	}
]

export const TableDocs: Component<TableDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Table
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Table component with sorting and pagination support for displaying structured
				data.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight
					code={`import { Table } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', overflow: 'auto' }}>
								<Table data={mockData} columns={columns} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={`const data = [
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

<Table data={data} columns={columns} />`}
				/>
			</section>
		</article>
	)
}

