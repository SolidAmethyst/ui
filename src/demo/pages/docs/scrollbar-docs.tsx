import { Accessor, Component } from 'solid-js'
import { Scrollbar, ScrollbarProvider } from '../../../components/ui/scrollbar'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { scrollbarSnippets } from './code-snippets/scrollbar-snippets'

interface ScrollbarDocsProps {
	isDark: Accessor<boolean>
}

export const ScrollbarDocs: Component<ScrollbarDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Scrollbar
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Customizable scrollbar component with Material 3 styling and physics
				engine support.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={scrollbarSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Vertical Scrollbar */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Vertical Scrollbar
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<ScrollbarProvider>
								<div
									style={{
										width: '100%',
										height: '200px',
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
						</div>
					}
					code={scrollbarSnippets.usage.verticalScrollbar}
				/>
			</section>

			{/* Horizontal Scrollbar */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Horizontal Scrollbar
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<ScrollbarProvider>
								<div
									style={{
										width: '100%',
										height: '87px',
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
						</div>
					}
					code={scrollbarSnippets.usage.horizontalScrollbar}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The scrollbar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={scrollbarSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The scrollbar component automatically uses these CSS variables. You
					can override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</Typography>
			</section>
		</article>
	)
}
