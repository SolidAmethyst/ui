import { Accessor, Component } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { EmptyState } from '../../../components/ui/empty-state'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { emptyStateSnippets } from './code-snippets/empty-state-snippets'

interface EmptyStateDocsProps {
	isDark: Accessor<boolean>
}

export const EmptyStateDocs: Component<EmptyStateDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				EmptyState
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Empty state component for displaying empty content states with icon, title,
				description, and optional action.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={emptyStateSnippets.imports} isDark={props.isDark} />
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
									display: 'flex',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<EmptyState
									icon='inbox'
									title='No items'
									description='There are no items to display'
									action={<Button size='sm'>Add Item</Button>}
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={emptyStateSnippets.usage.basicUsage}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The EmptyState component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override them in
					your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={emptyStateSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The EmptyState component automatically uses these CSS variables. You can
					override them in your application to match your design system.
				</Typography>
			</section>
		</article>
	)
}
