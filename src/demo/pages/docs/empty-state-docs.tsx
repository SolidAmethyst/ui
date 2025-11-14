import { Accessor, Component } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { EmptyState } from '../../../components/ui/empty-state'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'

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
				<CodeHighlight
					code={`import { EmptyState } from '@sapphiresolid/ui'`}
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
							<div style={{ width: '100%', 'max-width': '500px' }}>
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
					code={`<EmptyState
  icon="inbox"
  title="No items"
  description="There are no items to display"
  action={<Button>Add Item</Button>}
/>`}
				/>
			</section>
		</article>
	)
}

