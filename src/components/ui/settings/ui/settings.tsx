/**
 * Settings Component
 * Universal settings panel component
 */

import { Component } from 'solid-js'
import type { SettingsProps } from '../model/types'
import { settingsStyles } from '../lib/settings.styles'

export const Settings: Component<SettingsProps> = props => {
	const isDark = () => props.isDark ?? true
	const width = () => props.width ?? '320px'
	const top = () => props.top ?? '0'
	const title = () => props.title ?? 'Settings'

	return (
		<>
			{/* Backdrop */}
			<div
				onClick={() => props.onClose()}
				style={settingsStyles.backdrop(props.isOpen, width())}
			/>

			{/* Settings Panel */}
			<aside
				class={`settings-panel ${props.class || ''}`}
				style={{
					...settingsStyles.panel(props.isOpen, isDark(), width(), top()),
					...props.style
				}}
			>
				<div style={settingsStyles.header(isDark())}>
					<h3 style={settingsStyles.title(isDark())}>{title()}</h3>
					<button
						onClick={() => props.onClose()}
						style={settingsStyles.closeButton(isDark())}
						onMouseEnter={e => {
							e.currentTarget.style.backgroundColor = isDark()
								? 'rgba(255, 255, 255, 0.1)'
								: 'rgba(0, 0, 0, 0.05)'
						}}
						onMouseLeave={e => {
							e.currentTarget.style.backgroundColor = 'transparent'
						}}
					>
						<span
							class='material-symbols-rounded'
							style={{ 'font-size': '20px' }}
						>
							close
						</span>
					</button>
				</div>

				{/* Settings Content */}
				<div style={{ flex: '1', overflow: 'hidden', display: 'flex', 'flex-direction': 'column' }}>
					{props.children}
				</div>
			</aside>
		</>
	)
}
