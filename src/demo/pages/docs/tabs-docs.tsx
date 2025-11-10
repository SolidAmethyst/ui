import { Accessor, Component, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { docsStyles } from '../../lib/docs.styles'

interface TabsDocsProps {
	isDark: Accessor<boolean>
}

const tabsSnippets = {
	imports: `import { Tabs } from '@sapphiresolid/ui'`,
	basicUsage: `<Tabs 
  preview={<div>Preview Content</div>}
  code="const x = 1"
  isDark={isDark}
/>`,
	withCustomClass: `<Tabs 
  preview={<div>Preview</div>}
  code="code"
  isDark={isDark}
  class="custom-tabs"
/>`
}

export const TabsDocs: Component<TabsDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })
	const [count, setCount] = createSignal(0)

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Tabs</h1>
			<p style={docsStyles.description(theme())}>
				Tabbed interface component for switching between preview and code views.
			</p>

			<section style={{ 'margin-bottom': '48px' }}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight code={tabsSnippets.imports} isDark={props.isDark} />
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<h2 style={docsStyles.sectionTitle(theme())}>Basic Usage</h2>
				<Tabs
					preview={
						<div>
							<Button onClick={() => setCount(count() + 1)}>
								Count: {count()}
							</Button>
						</div>
					}
					code={tabsSnippets.basicUsage}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<h2 style={docsStyles.sectionTitle(theme())}>Customization</h2>
				<Tabs
					preview={
						<Tabs
							preview={<div>Nested Preview</div>}
							code='const nested = true'
							isDark={props.isDark}
							class='custom-tabs'
						/>
					}
					code={tabsSnippets.withCustomClass}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<h2 style={docsStyles.sectionTitle(theme())}>Features</h2>
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
					<li>Switch between preview and code tabs</li>
					<li>Integrated with CodeHighlight component</li>
					<li>Dark and light theme support</li>
					<li>Customizable styles and classes</li>
					<li>Smooth transitions</li>
				</ul>
			</section>
		</article>
	)
}

