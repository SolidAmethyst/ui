import { Accessor, Component, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { NumberInput } from '../../../components/ui/number-input'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'
import { buttonExamples } from './code-snippets/button-snippets'

interface ButtonDocsProps {
	isDark: Accessor<boolean>
}

export const ButtonDocs: Component<ButtonDocsProps> = props => {
	const [columnsValue, setColumnsValue] = createSignal(3)
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Button</h1>
			<p style={docsStyles.description(theme())}>
				Displays a button component with various variants and states. Built with
				Material 3 design principles.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight
					code={buttonExamples.installation}
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
							<Button variant='primary'>Primary</Button>
							<Button variant='secondary'>Secondary</Button>
							<Button variant='danger'>Danger</Button>
							<Button variant='ghost'>Ghost</Button>
						</div>
					}
					code={buttonExamples.basicUsage}
				/>
			</section>

			{/* Control Buttons */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Control Buttons</h2>
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
							<Button icon='menu'>Menu</Button>
							<Button icon='settings'>Settings</Button>
							<Button icon='bug_report'>Debug</Button>
						</div>
					}
					code={buttonExamples.controlButtons}
				/>
			</section>

			{/* Small Buttons */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Small Buttons</h2>
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
							<Button
								variant='small'
								icon='settings'
								iconPosition='only'
								title='Settings'
							/>
							<Button
								variant='small'
								icon='bug_report'
								iconPosition='only'
								title='Debug'
							/>
							<Button
								variant='small'
								icon='push_pin'
								iconPosition='only'
								title='Pin'
							/>
						</div>
					}
					code={buttonExamples.smallButtons}
				/>
			</section>

			{/* Play/Pause */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Play/Pause Button</h2>
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
							<Button variant='play-pause' icon='play_arrow' title='Play' />
							<Button variant='play-pause' icon='pause' title='Pause' />
						</div>
					}
					code={buttonExamples.playPause}
				/>
			</section>

			{/* Window Controls */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Window Control Buttons</h2>
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
							<Button
								variant='minimize'
								icon='remove'
								iconPosition='only'
								title='Minimize'
							/>
							<Button
								variant='maximize'
								icon='crop_square'
								iconPosition='only'
								title='Maximize'
							/>
							<Button
								variant='close'
								icon='close'
								iconPosition='only'
								title='Close'
							/>
						</div>
					}
					code={buttonExamples.windowControls}
				/>
			</section>

			{/* Action Buttons */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Action Buttons</h2>
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
							<Button
								variant='back'
								icon='arrow_back'
								iconPosition='only'
								title='Back'
							/>
							<Button
								variant='save'
								icon='save'
								iconPosition='only'
								title='Save'
							/>
							<Button
								variant='delete'
								icon='delete'
								iconPosition='only'
								title='Delete'
							/>
							<Button
								variant='search'
								icon='search'
								iconPosition='only'
								title='Search'
							/>
							<Button
								variant='share'
								icon='share'
								iconPosition='only'
								title='Share'
							/>
						</div>
					}
					code={buttonExamples.actionButtons}
				/>
			</section>

			{/* Button States */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Button States</h2>
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
							<Button active>Active</Button>
							<Button pinned>Pinned</Button>
							<Button maximized>Maximized</Button>
							<Button loading>Loading</Button>
							<Button disabled>Disabled</Button>
						</div>
					}
					code={buttonExamples.buttonStates}
				/>
			</section>

			{/* Number Input Controls */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Number Input Controls</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								display: 'flex',
								'flex-direction': 'column',
								gap: '16px',
								'align-items': 'flex-start'
							}}
						>
							<div
								style={{
									display: 'flex',
									'align-items': 'center',
									gap: '8px'
								}}
							>
								<label
									style={{
										'font-size': '0.875rem',
										color: props.isDark()
											? 'rgba(246, 246, 246, 0.7)'
											: 'rgba(26, 26, 26, 0.7)'
									}}
								>
									Columns:
								</label>
								<NumberInput
									value={columnsValue()}
									onChange={val => {
										const num = typeof val === 'number' ? val : parseInt(String(val), 10)
										if (!isNaN(num) && num >= 1 && num <= 6) {
											setColumnsValue(num)
										}
									}}
									min={1}
									max={6}
									step={1}
									enableWheel={true}
									showArrows={true}
									themeAware={true}
								/>
							</div>
						</div>
					}
					code={buttonExamples.numberInputControls}
				/>
			</section>
		</article>
	)
}
