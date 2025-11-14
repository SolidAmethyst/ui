import { Accessor, Component } from 'solid-js'
import { CheckboxTree } from '../../../components/ui/checkbox-tree'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { checkboxTreeSnippets } from './code-snippets/checkbox-tree-snippets'
import type { CheckboxTreeNode } from '../../../components/ui/checkbox-tree'

interface CheckboxTreeDocsProps {
	isDark: Accessor<boolean>
}

const mockTree: CheckboxTreeNode[] = [
	{
		id: '1',
		label: 'Documents',
		children: [
			{ id: '1-1', label: 'File 1.txt' },
			{ id: '1-2', label: 'File 2.txt' }
		]
	},
	{
		id: '2',
		label: 'Images',
		children: [{ id: '2-1', label: 'Photo.jpg' }]
	}
]

export const CheckboxTreeDocs: Component<CheckboxTreeDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				CheckboxTree
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Hierarchical checkbox tree component with nested checkboxes and automatic
				parent-child state propagation.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={checkboxTreeSnippets.imports} isDark={props.isDark} />
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', 'max-width': '400px' }}>
								<CheckboxTree nodes={mockTree} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={checkboxTreeSnippets.usage.basicUsage}
				/>
			</section>
		</article>
	)
}
