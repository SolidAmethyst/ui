/**
 * Settings Component
 * Universal settings panel component
 * Now uses Drawer internally for consistent behavior
 */

import { Component } from 'solid-js'
import { Drawer } from '../../../components/ui/drawer'
import type { SettingsProps } from '../model/types'
import { settingsStyles } from '../lib/settings.styles'

export const Settings: Component<SettingsProps> = props => {
	const isDark = () => props.isDark ?? true
	const width = () => props.width ?? '320px'
	const title = () => props.title ?? 'Settings'

	return (
		<Drawer
			isOpen={props.isOpen}
			onClose={props.onClose}
			isDark={isDark()}
			position='right'
			size={width()}
			showBackdrop={false}
			closeOnBackdropClick={false}
			zIndex={10000}
			class={props.class}
			style={props.style}
		>
			{/* Settings Header */}
			<div style={settingsStyles.header(isDark())}>
				<h3 style={settingsStyles.title(isDark())}>{title()}</h3>
				<button
					onClick={() => props.onClose()}
					style={settingsStyles.closeButton(isDark())}
					onMouseEnter={e => {
						e.currentTarget.style.backgroundColor = 'hsl(var(--muted) / 0.1)'
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
		</Drawer>
	)
}
