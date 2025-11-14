import { Accessor, Component } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tooltip } from '../../../components/ui/tooltip'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'

interface TooltipDocsProps {
	isDark: Accessor<boolean>
}

export const TooltipDocs: Component<TooltipDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Tooltip
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Tooltip component for displaying contextual information on hover or focus.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight
					code={`import { Tooltip } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Positions
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									display: 'flex',
									gap: '20px',
									'flex-wrap': 'wrap',
									'justify-content': 'center',
									padding: '40px'
								}}
							>
								<Tooltip content='Top Tooltip' position='top' isDark={props.isDark()}>
									<Button>Top</Button>
								</Tooltip>
								<Tooltip
									content='Bottom Tooltip'
									position='bottom'
									isDark={props.isDark()}
								>
									<Button>Bottom</Button>
								</Tooltip>
								<Tooltip content='Left Tooltip' position='left' isDark={props.isDark()}>
									<Button>Left</Button>
								</Tooltip>
								<Tooltip
									content='Right Tooltip'
									position='right'
									isDark={props.isDark()}
								>
									<Button>Right</Button>
								</Tooltip>
							</div>
						</div>
					}
					code={`<Tooltip content="Tooltip text" position="top">
  <button>Hover me</button>
</Tooltip>`}
				/>
			</section>
		</article>
	)
}

