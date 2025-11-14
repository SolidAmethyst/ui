import { Accessor, Component, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { FilterBar } from '../../../components/ui/filter-bar'
import { Search } from '../../../components/ui/search'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { filterBarSnippets } from './code-snippets/filter-bar-snippets'
import type { FilterItem } from '../../../components/ui/filter-bar'

interface FilterBarDocsProps {
	isDark: Accessor<boolean>
}

const mockFilters: FilterItem[] = [
	{
		id: 'status',
		label: 'Status',
		type: 'select',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
			{ label: 'Pending', value: 'pending' }
		]
	},
	{
		id: 'tags',
		label: 'Tags',
		type: 'checkbox',
		options: [
			{ label: 'Important', value: 'important' },
			{ label: 'Urgent', value: 'urgent' },
			{ label: 'Review', value: 'review' }
		]
	},
	{
		id: 'search',
		label: 'Search',
		type: 'text',
		placeholder: 'Enter text...'
	}
]

const allTypesFilters: FilterItem[] = [
	{
		id: 'status',
		label: 'Status',
		type: 'select',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' }
		]
	},
	{
		id: 'tags',
		label: 'Tags',
		type: 'checkbox',
		options: [
			{ label: 'Tag 1', value: 'tag1' },
			{ label: 'Tag 2', value: 'tag2' }
		]
	},
	{
		id: 'search',
		label: 'Search',
		type: 'text',
		placeholder: 'Enter text...'
	},
	{
		id: 'date',
		label: 'Date',
		type: 'date'
	},
	{
		id: 'range',
		label: 'Range',
		type: 'range',
		min: 0,
		max: 100,
		step: 1
	}
]

export const FilterBarDocs: Component<FilterBarDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })
	const [searchValue, setSearchValue] = createSignal('')

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				FilterBar
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Filter bar component for advanced filtering options. Complements the Search
				component with multiple filter types including select, checkbox, text, date,
				and range.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={filterBarSnippets.imports} isDark={props.isDark} />
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
									'max-width': '600px',
									margin: '0 auto',
									display: 'flex',
									'flex-direction': 'column',
									gap: '16px'
								}}
							>
								<Search
									value={searchValue()}
									onInput={setSearchValue}
									isDark={props.isDark()}
								/>
								<FilterBar filters={mockFilters} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={filterBarSnippets.usage.basicUsage}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					All Filter Types
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '800px',
									margin: '0 auto'
								}}
							>
								<FilterBar filters={allTypesFilters} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={filterBarSnippets.usage.allTypes}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The FilterBar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override them in
					your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={filterBarSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The FilterBar component automatically uses these CSS variables. You can
					override them in your application to match your design system.
				</Typography>
			</section>
		</article>
	)
}

