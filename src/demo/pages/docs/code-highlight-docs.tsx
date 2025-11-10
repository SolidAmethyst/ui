import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'

interface CodeHighlightDocsProps {
	isDark: Accessor<boolean>
}

const codeHighlightSnippets = {
	imports: `import { CodeHighlight } from '@sapphiresolid/ui'`,
	basicUsage: `<CodeHighlight code="const x = 1" isDark={isDark} />`,
	withCustomClass: `<CodeHighlight
  code="const x = 1"
  isDark={isDark}
  class="custom-code"
/>`,
	withCustomStyle: `<CodeHighlight
  code="const x = 1"
  isDark={isDark}
  style={{ 'margin-top': '20px' }}
/>`
}

export const CodeHighlightDocs: Component<CodeHighlightDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				CodeHighlight
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Syntax highlighting component for displaying code blocks with copy
				functionality.
			</Typography>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight
					code={codeHighlightSnippets.imports}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					preview={
						<CodeHighlight
							code='const greeting = "Hello, World!"'
							isDark={props.isDark}
						/>
					}
					code={codeHighlightSnippets.basicUsage}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Tabs
					preview={
						<div>
							<CodeHighlight
								code='const x = 1'
								isDark={props.isDark}
								class='custom-code'
							/>
							<CodeHighlight
								code='const y = 2'
								isDark={props.isDark}
								style={{ 'margin-top': '20px' }}
							/>
						</div>
					}
					code={`${codeHighlightSnippets.withCustomClass}\n\n${codeHighlightSnippets.withCustomStyle}`}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Features
				</Typography>
				<ul
					style={{
						'font-size': '0.85rem',
						'line-height': '1.7',
						color: theme().isDark
							? 'rgba(246, 246, 246, 0.9)'
							: 'rgba(26, 26, 26, 0.9)',
						'padding-left': '20px',
						margin: '0'
					}}
				>
					<li>Syntax highlighting for TypeScript/TSX/JavaScript/JSX/CSS</li>
					<li>Copy to clipboard functionality</li>
					<li>Dark and light theme support</li>
					<li>Customizable styles and classes</li>
					<li>Automatic HTML escaping</li>
				</ul>
			</section>
		</article>
	)
}
