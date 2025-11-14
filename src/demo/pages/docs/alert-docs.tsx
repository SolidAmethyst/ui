import { Accessor, Component } from 'solid-js'
import { Alert } from '../../../components/ui/alert'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'

interface AlertDocsProps {
	isDark: Accessor<boolean>
}

export const AlertDocs: Component<AlertDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Alert
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Alert component for displaying important messages or warnings inline.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight
					code={`import { Alert } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Variants
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									display: 'flex',
									'flex-direction': 'column',
									gap: '16px',
									width: '100%',
									'max-width': '500px'
								}}
							>
								<Alert
									variant='success'
									title='Success!'
									description='Operation completed successfully.'
									isDark={props.isDark()}
								/>
								<Alert
									variant='error'
									title='Error!'
									description='Something went wrong.'
									isDark={props.isDark()}
								/>
								<Alert
									variant='warning'
									title='Warning!'
									description='Please be careful.'
									isDark={props.isDark()}
								/>
								<Alert
									variant='info'
									title='Info'
									description='Here is some information.'
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={`<Alert
  variant="success"
  title="Success!"
  description="Operation completed successfully."
/>

<Alert
  variant="error"
  title="Error!"
  description="Something went wrong."
/>`}
				/>
			</section>
		</article>
	)
}

