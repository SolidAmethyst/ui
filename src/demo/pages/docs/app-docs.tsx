import type { Accessor } from 'solid-js'
import { Component } from 'solid-js'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { AppDemo } from '../app-demo'

interface AppDocsProps {
	isDark: Accessor<boolean>
}

export const AppDocs: Component<AppDocsProps> = props => {
	return (
		<article
			style={{
				width: '100%',
				'max-width': '700px'
			}}
		>
			<h1
				style={{
					'font-size': '2rem',
					'font-weight': '700',
					margin: '0 0 8px 0',
					color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
				}}
			>
				App
			</h1>
			<p
				style={{
					'font-size': '1rem',
					'line-height': '1.6',
					color: props.isDark()
						? 'rgba(246, 246, 246, 0.7)'
						: 'rgba(26, 26, 26, 0.7)',
					margin: '0 0 32px 0'
				}}
			>
				Full-featured application composition with Window, TitleBar, and Sidebar
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
					code={`import { App } from '@sapphiresolid/ui'`}
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
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<AppDemo isDark={props.isDark} toggleTheme={() => {}} showContent={false} />
						</div>
					}
					code={`<App isDark={isDark} toggleTheme={toggleTheme}>
  {/* Your content here */}
</App>`}
				/>
			</section>

			{/* Adaptive Layout */}
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
					Adaptive Layout
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<AppDemo isDark={props.isDark} toggleTheme={() => {}} />
						</div>
					}
					code={`<App isDark={isDark} toggleTheme={toggleTheme}>
  <div style={{ padding: '24px', overflow: 'auto' }}>
    <h1>Welcome to My Application</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {/* Your cards here */}
    </div>
  </div>
</App>`}
				/>
			</section>

			{/* Overlay Menu */}
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
					Overlay Menu
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								height: '600px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '8px',
								overflow: 'hidden',
								position: 'relative'
							}}
						>
							<AppDemo
								isDark={props.isDark}
								toggleTheme={() => {}}
								overlayMode={true}
							/>
						</div>
					}
					code={`<App isDark={isDark} toggleTheme={toggleTheme} overlayMode={true}>
  <div style={{ padding: '24px', overflow: 'auto' }}>
    <h1>Welcome to My Application</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {/* Your cards here */}
    </div>
  </div>
</App>`}
				/>
			</section>
		</article>
	)
}
