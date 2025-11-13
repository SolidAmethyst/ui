import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { codeHighlightSnippets } from './code-snippets/code-highlight-snippets'

interface CodeHighlightDocsProps {
	isDark: Accessor<boolean>
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
							code={codeHighlightSnippets.examples.typescript}
							isDark={props.isDark}
						/>
					}
					code={codeHighlightSnippets.basicUsage}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Different Languages
				</Typography>
				<Tabs
					preview={
						<CodeHighlight
							code={codeHighlightSnippets.examples.javascript}
							isDark={props.isDark}
						/>
					}
					code={`<CodeHighlight
  code="const x = 1"
  isDark={isDark}
/>`}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Tabs
					preview={
						<CodeHighlight
							code={codeHighlightSnippets.examples.typescript}
							isDark={props.isDark}
							class='custom-code'
						/>
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
						'padding-left': '20px',
						margin: '0',
						'list-style': 'disc'
					}}
				>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Syntax highlighting for TypeScript/TSX/JavaScript/JSX/CSS
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Copy to clipboard functionality
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Dark and light theme support
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Customizable styles and classes
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Automatic HTML escaping
						</Typography>
					</li>
				</ul>
			</section>
		</article>
	)
}
