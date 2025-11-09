import { Accessor, Component } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'

interface ButtonDocsProps {
	isDark: Accessor<boolean>
}

export const ButtonDocs: Component<ButtonDocsProps> = props => (
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
			Button
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
			Displays a button component with various variants and states. Built with
			Material 3 design principles.
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
				code={`import { Button } from '@sapphiresolid/ui'`}
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
				code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>`}
			/>
		</section>

		{/* Control Buttons */}
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
				Control Buttons
			</h2>
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
				code={`<Button icon="menu">Menu</Button>
<Button icon="settings">Settings</Button>
<Button icon="bug_report">Debug</Button>`}
			/>
		</section>

		{/* Small Buttons */}
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
				Small Buttons
			</h2>
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
				code={`<Button
  variant="small"
  icon="settings"
  iconPosition="only"
  title="Settings"
/>`}
			/>
		</section>

		{/* Play/Pause */}
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
				Play/Pause Button
			</h2>
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
				code={`<Button variant="play-pause" icon="play_arrow" title="Play" />
<Button variant="play-pause" icon="pause" title="Pause" />`}
			/>
		</section>

		{/* Window Controls */}
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
				Window Control Buttons
			</h2>
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
				code={`<Button
  variant="minimize"
  icon="remove"
  iconPosition="only"
  title="Minimize"
/>
<Button
  variant="maximize"
  icon="crop_square"
  iconPosition="only"
  title="Maximize"
/>
<Button
  variant="close"
  icon="close"
  iconPosition="only"
  title="Close"
/>`}
			/>
		</section>

		{/* Action Buttons */}
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
				Action Buttons
			</h2>
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
				code={`<Button variant="back" iconPosition="only" title="Back" />
<Button variant="save" iconPosition="only" title="Save" />
<Button variant="delete" iconPosition="only" title="Delete" />
<Button variant="search" iconPosition="only" title="Search" />
<Button variant="share" iconPosition="only" title="Share" />`}
			/>
		</section>

		{/* Button States */}
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
				Button States
			</h2>
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
				code={`<Button active>Active</Button>
<Button pinned>Pinned</Button>
<Button maximized>Maximized</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
			/>
		</section>

		{/* Number Input Controls */}
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
				Number Input Controls
			</h2>
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
							<div
								style={{
									position: 'relative',
									display: 'inline-flex',
									'align-items': 'center'
								}}
							>
								<input
									type='number'
									value='3'
									min='1'
									max='6'
									style={{
										width: '60px',
										padding: '4px 20px 4px 8px',
										'border-radius': '4px',
										border: `1px solid ${
											props.isDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)'
										}`,
										background: props.isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.02)',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
										'font-size': '0.875rem',
										'box-sizing': 'border-box',
										outline: 'none'
									}}
									readOnly
								/>
								<div
									style={{
										position: 'absolute',
										right: '4px',
										display: 'flex',
										'flex-direction': 'column',
										gap: '2px',
										height: '100%',
										'justify-content': 'center',
										'pointer-events': 'none'
									}}
								>
									<Button
										variant='ghost'
										icon='arrow_drop_up'
										iconPosition='only'
										title='Increase'
										style={{
											width: '12px',
											height: '10px',
											padding: '0',
											'min-width': '12px',
											'min-height': '10px',
											'pointer-events': 'auto'
										}}
									/>
									<Button
										variant='ghost'
										icon='arrow_drop_down'
										iconPosition='only'
										title='Decrease'
										style={{
											width: '12px',
											height: '10px',
											padding: '0',
											'min-width': '12px',
											'min-height': '10px',
											'pointer-events': 'auto'
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				}
				code={`<div style={{ position: "relative", display: "inline-flex" }}>
  <input
    type="number"
    value={value}
    min={1}
    max={6}
    style={{ paddingRight: "20px" }}
  />
  <div style={{ position: "absolute", right: "4px" }}>
    <Button
      variant="ghost"
      icon="arrow_drop_up"
      iconPosition="only"
      onClick={() => setValue(v => Math.min(v + 1, 6))}
    />
    <Button
      variant="ghost"
      icon="arrow_drop_down"
      iconPosition="only"
      onClick={() => setValue(v => Math.max(v - 1, 1))}
    />
  </div>
</div>`}
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
				You can customize button colors by overriding CSS variables in your
				application's stylesheet.
			</p>
			<CodeHighlight
				code={`@layer base {
  :root {
    --button-hover: 217.2 91.2% 59.8%;
    --button-close-hover: 0 84.2% 60.2%;
    --button-close-active: 0 72% 50%;
  }

  .dark,
  [data-theme="dark"] {
    --button-hover: 217.2 91.2% 59.8%;
    --button-close-hover: 0 84.2% 60.2%;
    --button-close-active: 0 72% 50%;
  }
}`}
				isDark={props.isDark}
			/>
		</section>
	</article>
)
