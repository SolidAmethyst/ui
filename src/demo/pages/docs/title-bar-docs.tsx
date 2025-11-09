import { Accessor, Component, createSignal, createEffect } from 'solid-js'
import { TitleBar } from '../../../composites/title-bar'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'
import { titleBarSnippets } from './code-snippets/title-bar-snippets'

interface TitleBarDocsProps {
	isDark: Accessor<boolean>
}

export const TitleBarDocs: Component<TitleBarDocsProps> = props => {
	const [maximized, setMaximized] = createSignal(false)
	const [pinned, setPinned] = createSignal(false)
	const [basicUsageDark, setBasicUsageDark] = createSignal(props.isDark())
	const [minimalExampleDark, setMinimalExampleDark] = createSignal(props.isDark())
	const [windowControlsDark, setWindowControlsDark] = createSignal(props.isDark())
	const [basicUsageOverridden, setBasicUsageOverridden] = createSignal(false)
	const [minimalExampleOverridden, setMinimalExampleOverridden] = createSignal(false)
	const [windowControlsOverridden, setWindowControlsOverridden] = createSignal(false)

	// Синхронизация с глобальной темой, если не переопределено локально
	createEffect(() => {
		if (!basicUsageOverridden()) {
			setBasicUsageDark(props.isDark())
		}
		if (!minimalExampleOverridden()) {
			setMinimalExampleDark(props.isDark())
		}
		if (!windowControlsOverridden()) {
			setWindowControlsDark(props.isDark())
		}
	})

	const toggleBasicTheme = () => {
		setBasicUsageOverridden(true)
		setBasicUsageDark(!basicUsageDark())
	}

	const toggleMinimalTheme = () => {
		setMinimalExampleOverridden(true)
		setMinimalExampleDark(!minimalExampleDark())
	}

	const toggleWindowControlsTheme = () => {
		setWindowControlsOverridden(true)
		setWindowControlsDark(!windowControlsDark())
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
				<CodeHighlight code={titleBarSnippets.imports} isDark={props.isDark} />
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
								onThemeToggle={toggleBasicTheme}
								onDebugClick={() => console.log('Debug clicked')}
								onPinClick={handlePin}
								onSettingsClick={() => console.log('Settings clicked')}
								onMinimizeClick={handleMinimize}
								onMaximizeClick={handleMaximize}
								onCloseClick={handleClose}
								isDark={basicUsageDark()}
								maximized={maximized()}
								pinned={pinned()}
							/>
						</div>
					}
					code={titleBarSnippets.usage.basicUsage}
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
							<TitleBar
								title='My Application'
								isDark={minimalExampleDark()}
								onThemeToggle={toggleMinimalTheme}
							/>
						</div>
					}
					code={titleBarSnippets.usage.minimalExample}
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
								onThemeToggle={toggleWindowControlsTheme}
								isDark={windowControlsDark()}
								maximized={maximized()}
							/>
						</div>
					}
					code={titleBarSnippets.usage.windowControls}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Customization</h2>
				<p style={docsStyles.description(theme())}>
					The TitleBar component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</p>
				<CodeHighlight
					code={`@layer base {
  :root {
    --title-bar-background: 0 0% 100%;
    --title-bar-foreground: 222.2 84% 4.9%;
    --title-bar-accent: 210 40% 96%;
    --title-bar-separator: 214.3 31.8% 91.4%;
    --title-bar-close-hover: 0 84.2% 60.2%;
  }

  .dark,
  [data-theme="dark"] {
    --title-bar-background: 222.2 84% 4.9%;
    --title-bar-foreground: 210 40% 98%;
    --title-bar-accent: 217.2 32.6% 17.5%;
    --title-bar-separator: 217.2 32.6% 17.5%;
    --title-bar-close-hover: 0 62.8% 30.6%;
  }
}`}
					isDark={props.isDark}
				/>
				<p style={docsStyles.description(theme())}>
					The TitleBar component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</p>
			</section>
		</article>
	)
}
