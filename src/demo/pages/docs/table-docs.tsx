import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Table } from '../../../components/ui/table'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { tableSnippets } from './code-snippets/table-snippets'
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
				<CodeHighlight code={tableSnippets.imports} isDark={props.isDark} />
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									overflow: 'auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
								<Table data={mockData} columns={columns} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={tableSnippets.usage.basicUsage}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The Table component uses CSS custom properties for theming. These variables
					are already defined in the library, but you can override them in your
					application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight code={tableSnippets.customization} isDark={props.isDark} />
				<Typography variant='body' isDark={props.isDark()}>
					The Table component automatically uses these CSS variables. You can override
					them in your application to match your design system.
				</Typography>
			</section>
		</article>
	)
}
