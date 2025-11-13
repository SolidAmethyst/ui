import { Accessor, Component, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Search } from '../../../components/ui/search'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { searchSnippets } from './code-snippets/search-snippets'

interface SearchDocsProps {
	isDark: Accessor<boolean>
}

export const SearchDocs: Component<SearchDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })
	const [searchValue, setSearchValue] = createSignal('')
	const [debouncedValue, setDebouncedValue] = createSignal('')

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Search
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Search input component with debounce, clear button, and Material 3
				design. Perfect for implementing search functionality in your
				applications.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={searchSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
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
									'max-width': '400px'
								}}
							>
								<Search
									placeholder='Search...'
									isDark={props.isDark}
									onSearch={value => {
										setDebouncedValue(value)
									}}
								/>
								{debouncedValue() && (
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ 'margin-top': '8px', opacity: 0.7 }}
									>
										Searching for: {debouncedValue()}
									</Typography>
								)}
							</div>
						</div>
					}
					code={searchSnippets.basic}
				/>
			</section>

			{/* Controlled Value */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Controlled Value
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px'
								}}
							>
								<Search
									value={searchValue()}
									placeholder='Search users...'
									isDark={props.isDark}
									onSearch={value => {
										setSearchValue(value)
									}}
								/>
								{searchValue() && (
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ 'margin-top': '8px', opacity: 0.7 }}
									>
										Current value: {searchValue()}
									</Typography>
								)}
							</div>
						</div>
					}
					code={searchSnippets.withValue}
				/>
			</section>

			{/* Custom Debounce */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Custom Debounce Delay
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px'
								}}
							>
								<Search
									placeholder='Search (500ms debounce)...'
									debounceMs={500}
									isDark={props.isDark}
									onSearch={value => console.log('Search:', value)}
								/>
							</div>
						</div>
					}
					code={searchSnippets.withDebounce}
				/>
			</section>

			{/* Without Icon */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Without Icon
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px'
								}}
							>
								<Search
									placeholder='Search without icon...'
									showIcon={false}
									isDark={props.isDark}
									onSearch={value => console.log(value)}
								/>
							</div>
						</div>
					}
					code={searchSnippets.withoutIcon}
				/>
			</section>

			{/* Without Clear Button */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Without Clear Button
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px'
								}}
							>
								<Search
									placeholder='Search (no clear button)...'
									showClear={false}
									isDark={props.isDark}
									onSearch={value => console.log(value)}
								/>
							</div>
						</div>
					}
					code={searchSnippets.withoutClear}
				/>
			</section>

			{/* Disabled State */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Disabled State
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px'
								}}
							>
								<Search
									placeholder='Search...'
									disabled
									isDark={props.isDark}
								/>
							</div>
						</div>
					}
					code={searchSnippets.disabled}
				/>
			</section>

			{/* Input and Search Callbacks */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Input and Search Callbacks
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px'
								}}
							>
								<Search
									placeholder='Type to see callbacks...'
									isDark={props.isDark}
									onInput={value => console.log('Immediate:', value)}
									onSearch={value => console.log('Debounced:', value)}
								/>
							</div>
						</div>
					}
					code={searchSnippets.withInputCallback}
				/>
			</section>

			{/* Props */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Props
				</Typography>
				<div
					style={{
						width: '100%',
						overflow: 'auto',
						'margin-top': '16px',
						'border-radius': '8px',
						border: `1px solid ${
							props.isDark() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
						}`,
						background: props.isDark()
							? 'rgba(255, 255, 255, 0.02)'
							: 'rgba(0, 0, 0, 0.02)'
					}}
				>
					<table
						style={{
							width: '100%',
							'border-collapse': 'collapse',
							'font-size': '0.875rem'
						}}
					>
						<thead>
							<tr
								style={{
									background: props.isDark()
										? 'rgba(255, 255, 255, 0.05)'
										: 'rgba(0, 0, 0, 0.05)',
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.1)'
											: 'rgba(0, 0, 0, 0.1)'
									}`
								}}
							>
								<th
									style={{
										padding: '12px 16px',
										'text-align': 'left',
										'font-weight': '600',
										'font-size': '0.75rem',
										'text-transform': 'uppercase',
										'letter-spacing': '0.05em',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.8)'
											: 'rgba(26, 26, 26, 0.8)'
									}}
								>
									Prop
								</th>
								<th
									style={{
										padding: '12px 16px',
										'text-align': 'left',
										'font-weight': '600',
										'font-size': '0.75rem',
										'text-transform': 'uppercase',
										'letter-spacing': '0.05em',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.8)'
											: 'rgba(26, 26, 26, 0.8)'
									}}
								>
									Type
								</th>
								<th
									style={{
										padding: '12px 16px',
										'text-align': 'left',
										'font-weight': '600',
										'font-size': '0.75rem',
										'text-transform': 'uppercase',
										'letter-spacing': '0.05em',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.8)'
											: 'rgba(26, 26, 26, 0.8)'
									}}
								>
									Default
								</th>
								<th
									style={{
										padding: '12px 16px',
										'text-align': 'left',
										'font-weight': '600',
										'font-size': '0.75rem',
										'text-transform': 'uppercase',
										'letter-spacing': '0.05em',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.8)'
											: 'rgba(26, 26, 26, 0.8)'
									}}
								>
									Description
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										value
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										string
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.6)'
											: 'rgba(26, 26, 26, 0.6)'
									}}
								>
									-
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Current search value (controlled)
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										placeholder
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										string
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										&quot;Search...&quot;
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Placeholder text
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										disabled
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										boolean
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										false
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Whether the search is disabled
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										isDark
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										boolean | (() =&gt; boolean)
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										false
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Dark theme mode
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										debounceMs
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										number
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										300
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Debounce delay in milliseconds
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										onSearch
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										(value: string) =&gt; void
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.6)'
											: 'rgba(26, 26, 26, 0.6)'
									}}
								>
									-
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Callback fired after debounce
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										onInput
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										(value: string) =&gt; void
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.6)'
											: 'rgba(26, 26, 26, 0.6)'
									}}
								>
									-
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Callback fired immediately on input change
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										showIcon
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										boolean
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										true
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Show search icon
								</td>
							</tr>
							<tr
								style={{
									'border-bottom': `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
									}`
								}}
							>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										showClear
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										boolean
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										true
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Show clear button when value is present
								</td>
							</tr>
							<tr>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										autofocus
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											color: props.isDark()
												? 'rgba(96, 165, 250, 0.9)'
												: 'rgba(37, 99, 235, 0.9)'
										}}
									>
										boolean
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									<code
										style={{
											'font-size': '0.8125rem',
											'font-family': 'monospace',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)',
											padding: '2px 6px',
											'border-radius': '4px'
										}}
									>
										false
									</code>
								</td>
								<td
									style={{
										padding: '12px 16px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
									}}
								>
									Auto-focus the input on mount
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The search component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={searchSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The search component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					spacing values use standard CSS units (px, rem, em, %).
				</Typography>
			</section>
		</article>
	)
}
