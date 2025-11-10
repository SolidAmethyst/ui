import { Accessor, Component } from 'solid-js'
import { Scrollbar, ScrollbarProvider } from '../../../components/ui/scrollbar'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'
import { scrollbarSnippets } from './code-snippets/scrollbar-snippets'

interface ScrollbarDocsProps {
	isDark: Accessor<boolean>
}

export const ScrollbarDocs: Component<ScrollbarDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Scrollbar</h1>
			<p style={docsStyles.description(theme())}>
				Customizable scrollbar component with Material 3 styling and physics
				engine support.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight code={scrollbarSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Vertical Scrollbar */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Vertical Scrollbar</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<ScrollbarProvider>
							<div
								style={{
									width: '100%',
									height: '300px',
									padding: '12px',
									'box-sizing': 'border-box'
								}}
							>
								<Scrollbar
									direction='vertical'
									showArrows={true}
									style={{ width: '100%', height: '100%' }}
								>
									{Array.from({ length: 30 }, (_, i) => (
										<div
											style={{
												padding: '12px',
												'border-bottom': `1px solid ${
													props.isDark()
														? 'rgba(255, 255, 255, 0.1)'
														: 'rgba(0, 0, 0, 0.1)'
												}`
											}}
										>
											Item {i + 1}
										</div>
									))}
								</Scrollbar>
							</div>
						</ScrollbarProvider>
					}
					code={scrollbarSnippets.usage.verticalScrollbar}
				/>
			</section>

			{/* Horizontal Scrollbar */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Horizontal Scrollbar</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<ScrollbarProvider>
							<div
								style={{
									width: '100%',
									height: '87px',
									padding: '12px 14px',
									'box-sizing': 'border-box'
								}}
							>
								<Scrollbar
									direction='horizontal'
									showArrows={true}
									style={{ width: '100%', height: '100%' }}
								>
									<div
										style={{
											display: 'flex',
											gap: '14px',
											'white-space': 'nowrap',
											padding: '0',
											'box-sizing': 'border-box',
											'align-items': 'center'
										}}
									>
										{Array.from({ length: 30 }, (_, i) => (
											<div
												style={{
													padding: '8px 16px',
													width: '129px',
													display: 'flex',
													'align-items': 'center',
													'justify-content': 'center',
													height: '100%',
													'flex-shrink': '0',
													background: props.isDark()
														? 'rgba(255, 255, 255, 0.05)'
														: 'rgba(0, 0, 0, 0.05)',
													border: `1px solid ${
														props.isDark()
															? 'rgba(255, 255, 255, 0.1)'
															: 'rgba(0, 0, 0, 0.1)'
													}`
												}}
											>
												Card {i + 1}
											</div>
										))}
									</div>
								</Scrollbar>
							</div>
						</ScrollbarProvider>
					}
					code={scrollbarSnippets.usage.horizontalScrollbar}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Customization</h2>
				<p style={docsStyles.description(theme())}>
					The scrollbar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</p>
				<CodeHighlight
					code={`@layer base {
  :root {
    --scrollbar-thumb: 0 0% 100% / 0.3;
    --scrollbar-thumb-hover: 0 0% 100% / 0.5;
    --scrollbar-thumb-active: 0 0% 100% / 0.7;
    --scrollbar-arrow: 0 0% 100%;
    --scrollbar-arrow-hover: 221.2 83.2% 53.3%;
    --scrollbar-arrow-active: 221.2 83.2% 53.3%;
    --scrollbar-arrow-disabled: 0 0% 100% / 0.3;
  }

  .dark,
  [data-theme="dark"] {
    --scrollbar-thumb: 0 0% 100% / 0.3;
    --scrollbar-thumb-hover: 0 0% 100% / 0.5;
    --scrollbar-thumb-active: 0 0% 100% / 0.7;
    --scrollbar-arrow: 0 0% 100%;
    --scrollbar-arrow-hover: 217.2 91.2% 59.8%;
    --scrollbar-arrow-active: 217.2 91.2% 59.8%;
    --scrollbar-arrow-disabled: 0 0% 100% / 0.3;
  }
}`}
					isDark={props.isDark}
				/>
				<p style={docsStyles.description(theme())}>
					The scrollbar component automatically uses these CSS variables. You
					can override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</p>
			</section>
		</article>
	)
}
