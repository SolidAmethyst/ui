import { Accessor, Component, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { SplitPane } from '../../../components/ui/split-pane'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { splitPaneSnippets } from './code-snippets/split-pane-snippets'

interface SplitPaneDocsProps {
	isDark: Accessor<boolean>
}

export const SplitPaneDocs: Component<SplitPaneDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })
	const [split, setSplit] = createSignal(50)

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				SplitPane
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Split pane component for resizable panels. Supports both horizontal and
				vertical orientations with customizable split positions and constraints.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={splitPaneSnippets.imports} isDark={props.isDark} />
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '600px',
									margin: '0 auto',
									height: '300px'
								}}
							>
								<SplitPane
									first={
										<div
											style={{
												padding: '16px',
												background: props.isDark()
													? 'rgba(255, 255, 255, 0.05)'
													: 'rgba(0, 0, 0, 0.05)',
												height: '100%',
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'center'
											}}
										>
											<Typography variant='body' isDark={props.isDark()}>
												Left Panel
											</Typography>
										</div>
									}
									second={
										<div
											style={{
												padding: '16px',
												background: props.isDark()
													? 'rgba(255, 255, 255, 0.05)'
													: 'rgba(0, 0, 0, 0.05)',
												height: '100%',
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'center'
											}}
										>
											<Typography variant='body' isDark={props.isDark()}>
												Right Panel
											</Typography>
										</div>
									}
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={splitPaneSnippets.usage.basicUsage}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Vertical Orientation
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '600px',
									margin: '0 auto',
									height: '300px'
								}}
							>
								<SplitPane
									first={
										<div
											style={{
												padding: '16px',
												background: props.isDark()
													? 'rgba(255, 255, 255, 0.05)'
													: 'rgba(0, 0, 0, 0.05)',
												height: '100%',
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'center'
											}}
										>
											<Typography variant='body' isDark={props.isDark()}>
												Top Panel
											</Typography>
										</div>
									}
									second={
										<div
											style={{
												padding: '16px',
												background: props.isDark()
													? 'rgba(255, 255, 255, 0.05)'
													: 'rgba(0, 0, 0, 0.05)',
												height: '100%',
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'center'
											}}
										>
											<Typography variant='body' isDark={props.isDark()}>
												Bottom Panel
											</Typography>
										</div>
									}
									direction='vertical'
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={splitPaneSnippets.usage.vertical}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Controlled Split
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '600px',
									margin: '0 auto',
									height: '300px'
								}}
							>
								<SplitPane
									first={
										<div
											style={{
												padding: '16px',
												background: props.isDark()
													? 'rgba(255, 255, 255, 0.05)'
													: 'rgba(0, 0, 0, 0.05)',
												height: '100%',
												display: 'flex',
												'flex-direction': 'column',
												'align-items': 'center',
												'justify-content': 'center',
												gap: '8px'
											}}
										>
											<Typography variant='body' isDark={props.isDark()}>
												Left Panel ({split()}%)
											</Typography>
										</div>
									}
									second={
										<div
											style={{
												padding: '16px',
												background: props.isDark()
													? 'rgba(255, 255, 255, 0.05)'
													: 'rgba(0, 0, 0, 0.05)',
												height: '100%',
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'center'
											}}
										>
											<Typography variant='body' isDark={props.isDark()}>
												Right Panel ({100 - split()}%)
											</Typography>
										</div>
									}
									split={split()}
									onSplitChange={setSplit}
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={splitPaneSnippets.usage.controlled}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The SplitPane component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override them in
					your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={splitPaneSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The SplitPane component automatically uses these CSS variables. You can
					override them in your application to match your design system.
				</Typography>
			</section>
		</article>
	)
}
