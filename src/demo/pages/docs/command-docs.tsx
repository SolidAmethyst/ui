import { Accessor, Component } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Command } from '../../../components/ui/command'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { commandSnippets } from './code-snippets/command-snippets'

// SVG Icons
const SearchIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<circle cx='11' cy='11' r='8' />
		<path d='m21 21-4.35-4.35' />
	</svg>
)

const CalendarIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
		<line x1='16' x2='16' y1='2' y2='6' />
		<line x1='8' x2='8' y1='2' y2='6' />
		<line x1='3' x2='21' y1='10' y2='10' />
	</svg>
)

const SmileIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<circle cx='12' cy='12' r='10' />
		<path d='M8 14s1.5 2 4 2 4-2 4-2' />
		<line x1='9' x2='9.01' y1='9' y2='9' />
		<line x1='15' x2='15.01' y1='9' y2='9' />
	</svg>
)

const RocketIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<path d='M4.5 16.5c-1.5 1.9-3 4.2-3 5.5s1.5 2.5 3 2.5c1.5 0 3-1.5 3-3s-1.5-3-3-5z' />
		<path d='M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' />
		<path d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0' />
		<path d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' />
	</svg>
)

const UserIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
		<circle cx='12' cy='7' r='4' />
	</svg>
)

const MailIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<rect width='20' height='16' x='2' y='4' rx='2' />
		<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
	</svg>
)

const SettingsIcon: Component = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'
		style={{ 'flex-shrink': '0' }}
	>
		<path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
		<circle cx='12' cy='12' r='3' />
	</svg>
)

interface CommandDocsProps {
	isDark: Accessor<boolean>
}

export const CommandDocs: Component<CommandDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Command
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Fast, composable, unstyled command menu.
			</Typography>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative',
								display: 'flex',
								padding: '24px',
								background: props.isDark() ? 'hsl(240 20% 7%)' : '#fafafa'
							}}
						>
							<Command
								style={{
									width: '100%',
									'box-sizing': 'border-box',
									'background-color': props.isDark() ? '#242424' : '#ffffff',
									'border-radius': '8px',
									'box-shadow': props.isDark()
										? '0 8px 32px rgba(0, 0, 0, 0.6)'
										: '0 8px 32px rgba(0, 0, 0, 0.15)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(255, 255, 255, 0.1)'
											: 'rgba(0, 0, 0, 0.1)'
									}`,
									display: 'flex',
									'flex-direction': 'column'
								}}
							>
								<div
									style={{
										position: 'relative',
										display: 'flex',
										'align-items': 'center',
										padding: '0 12px',
										'border-bottom': `1px solid ${
											props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)'
										}`
									}}
								>
									<div
										style={{
											display: 'flex',
											'align-items': 'center',
											'justify-content': 'center',
											width: '16px',
											height: '16px',
											color: props.isDark() ? '#ffffff' : '#1a1a1a',
											opacity: 0.5,
											'flex-shrink': '0'
										}}
									>
										<SearchIcon />
									</div>
									<Command.Input
										placeholder='Type a command or search...'
										style={{
											padding: '12px 0 12px 0',
											'font-size': '14px',
											border: 'none',
											outline: 'none',
											background: 'transparent',
											color: props.isDark() ? '#ffffff' : '#1a1a1a',
											width: '100%',
											flex: '1',
											'margin-left': '4px'
										}}
									/>
								</div>
								<Command.List
									style={{
										padding: '0 12px 16px 12px',
										overflow: 'visible',
										'box-sizing': 'border-box'
									}}
								>
									<Command.Empty>No results found.</Command.Empty>
									<Command.Group heading='Suggestions'>
										<Command.Item
											style={{
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'space-between',
												padding: '2px 0',
												height: '28px',
												'font-size': '14px',
												color: props.isDark() ? '#ffffff' : '#1a1a1a',
												'border-radius': '4px',
												'box-sizing': 'border-box',
												width: '100%',
												gap: '12px'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													flex: '1',
													'min-width': '0',
													overflow: 'hidden'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													'justify-content': 'center',
													width: '16px',
													height: '16px',
													color: props.isDark() ? '#ffffff' : '#1a1a1a',
													'flex-shrink': '0'
												}}
											>
												<CalendarIcon />
											</div>
											<span style={{ 'margin-left': '8px' }}>Calendar</span>
											</div>
											<Command.Shortcut
												style={{
													'margin-left': '0',
													'flex-shrink': '0',
													opacity: 0.5
												}}
											>
												⌘C
											</Command.Shortcut>
										</Command.Item>
										<Command.Item
											style={{
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'space-between',
												padding: '2px 0',
												height: '28px',
												'font-size': '14px',
												color: props.isDark() ? '#ffffff' : '#1a1a1a',
												'border-radius': '4px',
												'box-sizing': 'border-box',
												width: '100%',
												gap: '12px'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													flex: '1',
													'min-width': '0',
													overflow: 'hidden'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													'justify-content': 'center',
													width: '16px',
													height: '16px',
													color: props.isDark() ? '#ffffff' : '#1a1a1a',
													'flex-shrink': '0'
												}}
											>
												<SmileIcon />
											</div>
												<span style={{ 'margin-left': '8px' }}>
													Search Emoji
												</span>
											</div>
											<Command.Shortcut
												style={{
													'margin-left': '0',
													'flex-shrink': '0',
													opacity: 0.5
												}}
											>
												⌘E
											</Command.Shortcut>
										</Command.Item>
										<Command.Item
											style={{
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'space-between',
												padding: '2px 0',
												height: '28px',
												'font-size': '14px',
												color: props.isDark() ? '#ffffff' : '#1a1a1a',
												'border-radius': '4px',
												'box-sizing': 'border-box',
												width: '100%',
												gap: '12px'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													flex: '1',
													'min-width': '0',
													overflow: 'hidden'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													'justify-content': 'center',
													width: '16px',
													height: '16px',
													color: props.isDark() ? '#ffffff' : '#1a1a1a',
													'flex-shrink': '0'
												}}
											>
												<RocketIcon />
											</div>
											<span style={{ 'margin-left': '8px' }}>Launch</span>
											</div>
											<Command.Shortcut
												style={{
													'margin-left': '0',
													'flex-shrink': '0',
													opacity: 0.5
												}}
											>
												⌘L
											</Command.Shortcut>
										</Command.Item>
									</Command.Group>
									<Command.Separator />
									<Command.Group heading='Settings'>
										<Command.Item
											style={{
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'space-between',
												padding: '2px 0',
												height: '28px',
												'font-size': '14px',
												color: props.isDark() ? '#ffffff' : '#1a1a1a',
												'border-radius': '4px',
												'box-sizing': 'border-box',
												width: '100%',
												gap: '12px'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													flex: '1',
													'min-width': '0',
													overflow: 'hidden'
												}}
											>
												<div
													style={{
														display: 'flex',
														'align-items': 'center',
														'justify-content': 'center',
														width: '16px',
														height: '16px',
														color: props.isDark() ? '#ffffff' : '#1a1a1a',
														'flex-shrink': '0'
													}}
												>
													<UserIcon />
												</div>
												<span style={{ 'margin-left': '8px' }}>Profile</span>
											</div>
											<Command.Shortcut
												style={{
													'margin-left': '0',
													'flex-shrink': '0',
													opacity: 0.5
												}}
											>
												⌘P
											</Command.Shortcut>
										</Command.Item>
										<Command.Item
											style={{
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'space-between',
												padding: '2px 0',
												height: '28px',
												'font-size': '14px',
												color: props.isDark() ? '#ffffff' : '#1a1a1a',
												'border-radius': '4px',
												'box-sizing': 'border-box',
												width: '100%',
												gap: '12px'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													flex: '1',
													'min-width': '0',
													overflow: 'hidden'
												}}
											>
												<div
													style={{
														display: 'flex',
														'align-items': 'center',
														'justify-content': 'center',
														width: '16px',
														height: '16px',
														color: props.isDark() ? '#ffffff' : '#1a1a1a',
														'flex-shrink': '0'
													}}
												>
													<MailIcon />
												</div>
												<span style={{ 'margin-left': '8px' }}>Mail</span>
											</div>
											<Command.Shortcut
												style={{
													'margin-left': '0',
													'flex-shrink': '0',
													opacity: 0.5
												}}
											>
												⌘B
											</Command.Shortcut>
										</Command.Item>
										<Command.Item
											style={{
												display: 'flex',
												'align-items': 'center',
												'justify-content': 'space-between',
												padding: '2px 0',
												height: '28px',
												'font-size': '14px',
												color: props.isDark() ? '#ffffff' : '#1a1a1a',
												'border-radius': '4px',
												'box-sizing': 'border-box',
												width: '100%',
												gap: '12px'
											}}
										>
											<div
												style={{
													display: 'flex',
													'align-items': 'center',
													flex: '1',
													'min-width': '0',
													overflow: 'hidden'
												}}
											>
												<div
													style={{
														display: 'flex',
														'align-items': 'center',
														'justify-content': 'center',
														width: '16px',
														height: '16px',
														color: props.isDark() ? '#ffffff' : '#1a1a1a',
														'flex-shrink': '0'
													}}
												>
													<SettingsIcon />
												</div>
												<span style={{ 'margin-left': '8px' }}>Settings</span>
											</div>
											<Command.Shortcut
												style={{
													'margin-left': '0',
													'flex-shrink': '0',
													opacity: 0.5
												}}
											>
												⌘S
											</Command.Shortcut>
										</Command.Item>
									</Command.Group>
								</Command.List>
							</Command>
						</div>
					}
					code={commandSnippets.preview}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The command component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={commandSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The command component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</Typography>
			</section>
		</article>
	)
}
