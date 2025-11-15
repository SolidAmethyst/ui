import { Accessor, Component, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { buttonSnippets } from './code-snippets/button-snippets'

// Trigger Button Demo Component
const TriggerButtonDemo: Component = () => {
	const [isOpen, setIsOpen] = createSignal(false)

	return (
		<div
			class='button-demo-large-icons'
			style={{
				display: 'flex',
				'flex-wrap': 'wrap',
				gap: '12px',
				'align-items': 'center',
				'justify-content': 'center'
			}}
		>
			<Button
				variant='trigger'
				iconPosition='only'
				title={isOpen() ? 'Close Sidebar' : 'Open Sidebar'}
				active={isOpen()}
				onClick={() => setIsOpen(!isOpen())}
			/>
		</div>
	)
}

interface ButtonDocsProps {
	isDark: Accessor<boolean>
}

export const ButtonDocs: Component<ButtonDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Button
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Displays a button component with various variants and states. Built with
				Material 3 design principles.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={buttonSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Text Buttons */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Text Buttons
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<Button variant='primary'>Primary</Button>
								<Button variant='secondary'>Secondary</Button>
								<Button variant='danger'>Danger</Button>
								<Button variant='ghost'>Ghost</Button>
							</div>
						</div>
					}
					code={buttonSnippets.usage.basicUsage}
				/>
			</section>

			{/* Icon + Text Buttons */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Icon + Text Buttons
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<Button icon='menu'>Menu</Button>
								<Button icon='settings'>Settings</Button>
								<Button icon='bug_report'>Debug</Button>
							</div>
						</div>
					}
					code={buttonSnippets.usage.controlButtons}
				/>
			</section>

			{/* Small Buttons */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Small Buttons
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								class='button-demo-large-icons'
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
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
							</div>
						</div>
					}
					code={buttonSnippets.usage.smallButtons}
				/>
			</section>

			{/* Trigger Button */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Trigger Button
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<TriggerButtonDemo />
							</div>
						</div>
					}
					code={buttonSnippets.usage.triggerButton}
				/>
			</section>

			{/* Play/Pause */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Play/Pause Button
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								class='button-demo-large-icons'
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<Button variant='play-pause' icon='play_arrow' title='Play' />
								<Button variant='play-pause' icon='pause' title='Pause' />
								<Button variant='play-pause' icon='stop' title='Stop' />
							</div>
						</div>
					}
					code={buttonSnippets.usage.playPause}
				/>
			</section>

			{/* Window Controls */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Window Control Buttons
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								class='button-demo-large-icons'
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<Button
									variant='small'
									icon='push_pin'
									iconPosition='only'
									title='Pin'
								/>
								<div
									style={{
										width: '1px',
										height: '24px',
										background: props.isDark()
											? 'rgba(255, 255, 255, 0.2)'
											: 'rgba(0, 0, 0, 0.2)',
										'flex-shrink': '0'
									}}
								/>
								<Button
									variant='minimize'
									icon='remove'
									iconPosition='only'
									title='Minimize'
								/>
								<Button
									variant='maximize'
									iconPosition='only'
									title='Maximize / Restore Down'
								/>
								<Button
									variant='close'
									icon='close'
									iconPosition='only'
									title='Close'
								/>
							</div>
						</div>
					}
					code={buttonSnippets.usage.windowControls}
				/>
			</section>

			{/* Action Buttons */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Action Buttons
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								class='button-demo-large-icons'
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
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
								<Button
									variant='small'
									icon='restart_alt'
									iconPosition='only'
									title='Reset'
								/>
							</div>
						</div>
					}
					code={buttonSnippets.usage.actionButtons}
				/>
			</section>

			{/* Button States */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Button States
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									display: 'flex',
									'flex-wrap': 'wrap',
									gap: '12px',
									'align-items': 'center',
									'justify-content': 'center',
									width: '100%'
								}}
							>
								<Button active>Active</Button>
								<Button pinned>Pinned</Button>
								<Button maximized>Maximized</Button>
								<Button loading>Loading</Button>
								<Button disabled>Disabled</Button>
							</div>
						</div>
					}
					code={buttonSnippets.usage.buttonStates}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The button component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={buttonSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The button component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</Typography>
			</section>
		</article>
	)
}
