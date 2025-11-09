import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../components/common/code-highlight'
import { docsStyles } from '../../lib/docs.styles'
import { sidebarExamples } from './code-snippets/sidebar-snippets'

interface SidebarDocsProps {
	isDark: Accessor<boolean>
}

export const SidebarDocs: Component<SidebarDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Sidebar</h1>
			<p style={docsStyles.description(theme())}>
				A composable, themeable and customizable sidebar component. Supports
				overlay and shift modes, icons, separators, and can be controlled by any
				trigger.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight
					code={sidebarExamples.installation}
					isDark={props.isDark}
				/>
			</section>

			{/* Your First Sidebar */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Your First Sidebar</h2>
				<p style={docsStyles.description(theme())}>
					Let's start with a complete, self-contained sidebar example. This
					example demonstrates shift mode (sidebar shifts content), icons,
					separators, and custom trigger button.
				</p>
				<CodeHighlight
					code={sidebarExamples.yourFirstSidebar}
					isDark={props.isDark}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Customization</h2>
				<p style={docsStyles.description(theme())}>
					The sidebar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</p>
				<CodeHighlight
					code={sidebarExamples.customization}
					isDark={props.isDark}
				/>
				<p style={docsStyles.description(theme())}>
					The sidebar component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</p>
			</section>
		</article>
	)
}
