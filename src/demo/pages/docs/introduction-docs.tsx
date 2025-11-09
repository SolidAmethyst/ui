import { Accessor, Component } from 'solid-js'
import { docsStyles } from '../../lib/docs.styles'

interface IntroductionDocsProps {
  isDark: Accessor<boolean>;
}

export const IntroductionDocs: Component<IntroductionDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Introduction</h1>
			<p style={docsStyles.description(theme())}>
				Beautiful Solid.js components built with Material 3 design principles.
			</p>

			<section style={{ 'margin-bottom': '48px' }}>
				<p
					style={{
						'line-height': '1.7',
						margin: '12px 0',
						'font-size': '0.95rem',
						color: theme().isDark
							? 'rgba(246, 246, 246, 0.9)'
							: 'rgba(26, 26, 26, 0.9)'
					}}
				>
					This is <strong>NOT</strong> a component library. It's a collection of
					re-usable components that you can copy and paste into your apps.
				</p>
				<p
					style={{
						'line-height': '1.7',
						margin: '12px 0',
						'font-size': '0.95rem',
						color: theme().isDark
							? 'rgba(246, 246, 246, 0.9)'
							: 'rgba(26, 26, 26, 0.9)'
					}}
				>
					Pick the components you need. Copy and paste the code into your project
					and customize to your needs. The code is yours.
				</p>
			</section>
		</article>
	)
}
