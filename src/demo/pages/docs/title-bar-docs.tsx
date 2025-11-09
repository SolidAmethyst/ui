import { Accessor, Component, createSignal } from 'solid-js'
import { TitleBar } from '../../../components/ui/title-bar'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { titleBarExamples } from './code-snippets/title-bar-snippets'
import { docsStyles } from '../../lib/docs.styles'

interface TitleBarDocsProps {
	isDark: Accessor<boolean>
}

export const TitleBarDocs: Component<TitleBarDocsProps> = props => {
	const [maximized, setMaximized] = createSignal(false)
	const [pinned, setPinned] = createSignal(false)

	const toggleTheme = () => {
		// This is handled by parent component
	}

	const handleMinimize = () => {
		console.log('Minimize clicked')
	}

	const handleMaximize = () => {
		setMaximized(!maximized())
	}

	const handleClose = () => {
		console.log('Close clicked')
	}

	const handlePin = () => {
		setPinned(!pinned())
	}

	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>TitleBar</h1>
			<p style={docsStyles.description(theme())}>
				Composite component for application title bar with controls, burger
				menu, and window management buttons.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight
					code={titleBarExamples.installation}
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
								width: '100%',
								'box-sizing': 'border-box',
								background: props.isDark()
									? 'rgba(0, 0, 0, 0.3)'
									: 'rgba(255, 255, 255, 0.3)',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden'
							}}
						>
							<TitleBar
								title='Physics Engine Demo'
								onBurgerClick={() => console.log('Burger clicked')}
								onThemeToggle={toggleTheme}
								onDebugClick={() => console.log('Debug clicked')}
								onPinClick={handlePin}
								onSettingsClick={() => console.log('Settings clicked')}
								onMinimizeClick={handleMinimize}
								onMaximizeClick={handleMaximize}
								onCloseClick={handleClose}
								isDark={props.isDark()}
								maximized={maximized()}
								pinned={pinned()}
							/>
						</div>
					}
					code={titleBarExamples.basicUsage}
				/>
			</section>

			{/* Minimal Example */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Minimal Example</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'box-sizing': 'border-box',
								background: props.isDark()
									? 'rgba(0, 0, 0, 0.3)'
									: 'rgba(255, 255, 255, 0.3)',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden'
							}}
						>
							<TitleBar title='My Application' />
						</div>
					}
					code={titleBarExamples.minimalExample}
				/>
			</section>

			{/* With Window Controls Only */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>With Window Controls</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'box-sizing': 'border-box',
								background: props.isDark()
									? 'rgba(0, 0, 0, 0.3)'
									: 'rgba(255, 255, 255, 0.3)',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden'
							}}
						>
							<TitleBar
								title='Window Title'
								onMinimizeClick={handleMinimize}
								onMaximizeClick={handleMaximize}
								onCloseClick={handleClose}
								maximized={maximized()}
							/>
						</div>
					}
					code={titleBarExamples.windowControls}
				/>
			</section>
		</article>
	)
}
