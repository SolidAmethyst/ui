import { Accessor, Component } from 'solid-js'
import { Accordion } from '../../../components/ui/accordion'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import type { AccordionItem } from '../../../components/ui/accordion'

interface AccordionDocsProps {
	isDark: Accessor<boolean>
}

const mockItems: AccordionItem[] = [
	{
		id: '1',
		header: 'Section 1',
		content: 'This is the content of section 1.'
	},
	{
		id: '2',
		header: 'Section 2',
		content: 'This is the content of section 2.'
	},
	{
		id: '3',
		header: 'Section 3',
		content: 'This is the content of section 3.'
	}
]

export const AccordionDocs: Component<AccordionDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Accordion
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Accordion component with collapsible sections. Perfect for organizing content
				into expandable/collapsible panels.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight
					code={`import { Accordion } from '@sapphiresolid/ui'`}
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
								<Accordion items={mockItems} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={`const items = [
  {
    id: '1',
    header: 'Section 1',
    content: 'Content of section 1'
  },
  {
    id: '2',
    header: 'Section 2',
    content: 'Content of section 2'
  }
]

<Accordion items={items} />`}
				/>
			</section>
		</article>
	)
}

