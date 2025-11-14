import { Accessor, Component, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { ProgressBar } from '../../../components/ui/progress-bar'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { progressBarSnippets } from './code-snippets/progress-bar-snippets'

interface ProgressBarDocsProps {
	isDark: Accessor<boolean>
}

export const ProgressBarDocs: Component<ProgressBarDocsProps> = props => {
	const [progress, setProgress] = createSignal(25)
	const [isIndeterminate, setIsIndeterminate] = createSignal(false)
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				ProgressBar
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Progress bar component with determinate and indeterminate states.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={progressBarSnippets.imports} isDark={props.isDark} />
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
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<ProgressBar value={progress()} isDark={props.isDark()} />
								<div
									style={{
										display: 'flex',
										gap: '8px',
										'margin-top': '16px',
										'justify-content': 'center'
									}}
								>
									<Button
										size='sm'
										onClick={() => setProgress(p => Math.max(0, p - 10))}
									>
										Decrease
									</Button>
									<Button
										size='sm'
										onClick={() => setProgress(p => Math.min(100, p + 10))}
									>
										Increase
									</Button>
								</div>
							</div>
						</div>
					}
					code={progressBarSnippets.usage.basicUsage}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Indeterminate
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', 'max-width': '400px' }}>
								<ProgressBar
									variant={isIndeterminate() ? 'indeterminate' : 'determinate'}
									value={isIndeterminate() ? undefined : 50}
									isDark={props.isDark()}
								/>
								<Button
									size='sm'
									onClick={() => setIsIndeterminate(!isIndeterminate())}
									style={{ 'margin-top': '16px' }}
								>
									Toggle Indeterminate
								</Button>
							</div>
						</div>
					}
					code={progressBarSnippets.usage.indeterminate}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The ProgressBar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override them in
					your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={progressBarSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The ProgressBar component automatically uses these CSS variables. You can
					override them in your application to match your design system.
				</Typography>
			</section>
		</article>
	)
}
