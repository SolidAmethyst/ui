import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../components/common/code-highlight'
import { docsStyles } from '../../lib/docs.styles'
import { installationExamples } from './code-snippets/installation-snippets'

interface InstallationDocsProps {
	isDark: Accessor<boolean>
}

export const InstallationDocs: Component<InstallationDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Installation</h1>
			<p style={docsStyles.description(theme())}>
				Get started with Solid UI Toolkit in your project.
			</p>

			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Install from GitHub</h2>
				<CodeHighlight
					code={installationExamples.install}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Include Styles</h2>
				<p
					style={{
						'margin-bottom': '12px',
						'font-size': '0.9rem',
						'line-height': '1.6',
						color: theme().isDark
							? 'rgba(246, 246, 246, 0.7)'
							: 'rgba(26, 26, 26, 0.7)'
					}}
				>
					Import the global styles in your main entry file:
				</p>
				<CodeHighlight
					code={installationExamples.includeStyles}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Import Components</h2>
				<p
					style={{
						'margin-bottom': '12px',
						'font-size': '0.9rem',
						'line-height': '1.6',
						color: theme().isDark
							? 'rgba(246, 246, 246, 0.7)'
							: 'rgba(26, 26, 26, 0.7)'
					}}
				>
					Import components as needed in your files:
				</p>
				<CodeHighlight
					code={installationExamples.importComponents}
					isDark={props.isDark}
				/>
			</section>
		</article>
	)
}
