import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { installationExamples } from './code-snippets/installation-snippets'

interface InstallationDocsProps {
	isDark: Accessor<boolean>
}

export const InstallationDocs: Component<InstallationDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Installation
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Get started with Solid UI Toolkit in your project.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Install from GitHub
				</Typography>
				<CodeHighlight
					code={installationExamples.install}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Include Styles
				</Typography>
				<Typography
					variant='body'
					isDark={props.isDark()}
					style={{ 'margin-bottom': '12px' }}
				>
					Import the global styles in your main entry file:
				</Typography>
				<CodeHighlight
					code={installationExamples.includeStyles}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Import Components
				</Typography>
				<Typography
					variant='body'
					isDark={props.isDark()}
					style={{ 'margin-bottom': '12px' }}
				>
					Import components as needed in your files:
				</Typography>
				<CodeHighlight
					code={installationExamples.importComponents}
					isDark={props.isDark}
				/>
			</section>
		</article>
	)
}
