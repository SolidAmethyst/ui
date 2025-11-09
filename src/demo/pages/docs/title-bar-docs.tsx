import { Accessor, Component, createSignal } from 'solid-js'
import { TitleBar } from '../../../components/ui/title-bar'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'

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

	return (
		<article
			style={{
				width: '100%',
				'max-width': '700px',
				'box-sizing': 'border-box',
				margin: '0 auto',
				padding: '24px 0',
				color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
				overflow: 'hidden',
				'overflow-x': 'hidden'
			}}
		>
			<h1
				style={{
					'font-size': '1.75rem',
					'font-weight': '700',
					'margin-bottom': '12px',
					'line-height': '1.2'
				}}
			>
				TitleBar
			</h1>
			<p
				style={{
					'font-size': '0.95rem',
					color: props.isDark()
						? 'rgba(246, 246, 246, 0.7)'
						: 'rgba(26, 26, 26, 0.7)',
					'margin-bottom': '24px',
					'line-height': '1.6'
				}}
			>
				Composite component for application title bar with controls, burger
				menu, and window management buttons.
			</p>

			{/* Installation */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Installation
				</h2>
				<CodeHighlight
					code={`import { TitleBar } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			{/* Basic Usage */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Basic Usage
				</h2>
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
					code={`<TitleBar
  title="Physics Engine Demo"
  onBurgerClick={() => console.log('Menu')}
  onThemeToggle={() => toggleTheme()}
  onDebugClick={() => console.log('Debug')}
  onPinClick={() => setPinned(!pinned)}
  onSettingsClick={() => console.log('Settings')}
  onMinimizeClick={() => console.log('Minimize')}
  onMaximizeClick={() => setMaximized(!maximized)}
  onCloseClick={() => console.log('Close')}
  isDark={isDark}
  maximized={maximized}
  pinned={pinned}
/>`}
				/>
			</section>

			{/* Minimal Example */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Minimal Example
				</h2>
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
					code={`<TitleBar title="My Application" />`}
				/>
			</section>

			{/* With Window Controls Only */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					With Window Controls
				</h2>
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
					code={`<TitleBar
  title="Window Title"
  onMinimizeClick={() => handleMinimize()}
  onMaximizeClick={() => handleMaximize()}
  onCloseClick={() => handleClose()}
  maximized={maximized}
/>`}
				/>
			</section>

			{/* Customization */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Customization
				</h2>
				<p
					style={{
						'font-size': '0.9rem',
						color: props.isDark()
							? 'rgba(246, 246, 246, 0.7)'
							: 'rgba(26, 26, 26, 0.7)',
						'margin-bottom': '16px',
						'line-height': '1.6'
					}}
				>
					You can customize titlebar colors by overriding CSS variables in your
					application's stylesheet.
				</p>
				<CodeHighlight
					code={`@layer base {
  :root {
    --titlebar-background: 0 0% 98%;
    --titlebar-foreground: 240 5.3% 26.1%;
    --titlebar-accent: 240 4.8% 95.9%;
    --titlebar-separator: 220 13% 91%;
    --titlebar-close-hover: 0 84.2% 60.2%;
  }

  .dark,
  [data-theme="dark"] {
    --titlebar-background: 240 5.9% 10%;
    --titlebar-foreground: 240 4.8% 95.9%;
    --titlebar-accent: 240 3.7% 15.9%;
    --titlebar-separator: 240 3.7% 15.9%;
    --titlebar-close-hover: 0 84.2% 60.2%;
  }
}`}
					isDark={props.isDark}
				/>
			</section>
		</article>
	)
}
