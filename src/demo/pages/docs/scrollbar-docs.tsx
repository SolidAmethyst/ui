import { Accessor, Component } from 'solid-js'
import { Scrollbar, ScrollbarProvider } from '../../../components/ui/scrollbar'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'
import { scrollbarExamples } from './code-snippets/scrollbar-snippets'

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
				<CodeHighlight
					code={scrollbarExamples.installation}
					isDark={props.isDark}
				/>
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
					code={scrollbarExamples.verticalScrollbar}
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
					code={scrollbarExamples.horizontalScrollbar}
				/>
			</section>
		</article>
	)
}
