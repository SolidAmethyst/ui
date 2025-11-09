import { Accessor, Component } from 'solid-js'
import { TechChip } from '../../../components/ui/tech-chip'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { techchipExamples } from './code-snippets/techchip-snippets'
import { docsStyles } from '../../lib/docs.styles'

interface TechChipDocsProps {
	isDark: Accessor<boolean>
}

export const TechChipDocs: Component<TechChipDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>TechChip</h1>
			<p style={docsStyles.description(theme())}>
				Status indicator chip for displaying technology stack with real-time
				status updates. Built with Material 3 design principles.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
			<CodeHighlight
				code={techchipExamples.installation}
				isDark={props.isDark}
			/>
		</section>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Basic Usage</h2>
			<Tabs
				isDark={props.isDark}
				preview={
					<div
						style={{
							display: 'flex',
							'flex-wrap': 'wrap',
							gap: '12px',
							'align-items': 'center'
						}}
					>
						<TechChip
							label='TypeScript'
							icon='code'
							status='ready'
							variant='frontend'
						/>
						<TechChip
							label='Solid.js'
							icon='javascript'
							status='ready'
							variant='frontend'
						/>
						<TechChip
							label='Rust'
							icon='memory'
							status='ready'
							variant='backend'
						/>
						<TechChip
							label='Tauri'
							icon='desktop_windows'
							status='ready'
							variant='backend'
						/>
						<TechChip
							label='Physics Engine'
							icon='science'
							status='ready'
							variant='engine'
						/>
						<TechChip
							label='WebGL'
							icon='web'
							status='ready'
							variant='engine'
						/>
					</div>
				}
				code={techchipExamples.basicUsage}
			/>
		</section>

			{/* Status States */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Status States</h2>
			<Tabs
				isDark={props.isDark}
				preview={
					<div
						style={{
							display: 'flex',
							'flex-wrap': 'wrap',
							gap: '12px',
							'align-items': 'center'
						}}
					>
						<TechChip
							label='Loading'
							icon='hourglass_empty'
							status='loading'
							variant='frontend'
						/>
						<TechChip
							label='Ready'
							icon='check_circle'
							status='ready'
							variant='backend'
						/>
						<TechChip
							label='Error'
							icon='error'
							status='error'
							variant='engine'
						/>
					</div>
				}
				code={techchipExamples.statusStates}
			/>
			</section>
		</article>
	)
}
