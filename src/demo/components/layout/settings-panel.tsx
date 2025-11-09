/**
 * Settings Panel
 * General settings panel with sections for different components (Glass, etc.)
 */

import { Component } from 'solid-js'

interface SettingsPanelProps {
	isDark: () => boolean
	isOpen: boolean
	onClose: () => void
	// Glass parameters
	enabled: boolean
	onEnabledChange: (enabled: boolean) => void
	blur: number
	onBlurChange: (blur: number) => void
	opacity: number
	onOpacityChange: (opacity: number) => void
	darkness: number
	onDarknessChange: (darkness: number) => void
	saturation: number
	onSaturationChange: (saturation: number) => void
}

export const SettingsPanel: Component<SettingsPanelProps> = props => {
	const panelStyles = () => ({
		position: 'fixed' as const,
		top: '60px',
		right: props.isOpen ? '0' : '-320px',
		width: '320px',
		height: 'calc(100vh - 60px)',
		'z-index': '1000',
		background: props.isDark()
			? 'hsla(240, 5.9%, 10%, 0.95)'
			: 'hsla(0, 0%, 98%, 0.95)',
		'backdrop-filter': 'blur(20px) saturate(180%)',
		'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
		border: 'none',
		'box-sizing': 'border-box' as const,
		overflow: 'auto' as const,
		transition: 'right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
		'box-shadow': props.isDark()
			? '0 4px 16px rgba(0, 0, 0, 0.3), -2px 0 8px rgba(0, 0, 0, 0.2)'
			: '0 4px 16px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.05)'
	})

	const sliderContainerStyles = () => ({
		padding: '16px 20px',
		'border-bottom': `1px solid ${
			props.isDark() ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`
	})

	const labelStyles = () => ({
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center',
		'margin-bottom': '8px',
		'font-size': '14px',
		color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
		'font-weight': '500'
	})

	const valueStyles = () => ({
		'font-size': '12px',
		color: props.isDark()
			? 'rgba(246, 246, 246, 0.6)'
			: 'rgba(26, 26, 26, 0.6)',
		'font-weight': '400',
		'min-width': '40px',
		'text-align': 'right' as const
	})

	const sliderStyles = () => ({
		width: '100%',
		height: '6px',
		'border-radius': '3px',
		background: props.isDark()
			? 'rgba(255, 255, 255, 0.1)'
			: 'rgba(0, 0, 0, 0.1)',
		outline: 'none',
		appearance: 'none' as const,
		cursor: 'pointer',
		'&::-webkit-slider-thumb': {
			appearance: 'none' as const,
			width: '16px',
			height: '16px',
			'border-radius': '50%',
			background: props.isDark() ? '#3b82f6' : '#2563eb',
			cursor: 'pointer',
			'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.2)'
		},
		'&::-moz-range-thumb': {
			width: '16px',
			height: '16px',
			'border-radius': '50%',
			background: props.isDark() ? '#3b82f6' : '#2563eb',
			cursor: 'pointer',
			border: 'none',
			'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.2)'
		}
	})

	const checkboxContainerStyles = () => ({
		display: 'flex',
		'align-items': 'center',
		gap: '12px',
		padding: '16px 20px',
		'border-bottom': `1px solid ${
			props.isDark() ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`
	})

	const checkboxStyles = () => ({
		width: '18px',
		height: '18px',
		cursor: 'pointer',
		accentColor: props.isDark() ? '#3b82f6' : '#2563eb'
	})

	const headerStyles = () => ({
		padding: '20px',
		'border-bottom': `1px solid ${
			props.isDark() ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`,
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center'
	})

	const titleStyles = () => ({
		'font-size': '18px',
		'font-weight': '600',
		color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
		margin: '0'
	})

	return (
		<>
			{/* Backdrop */}
			<div
				onClick={() => props.onClose()}
				style={{
					position: 'fixed',
					top: '60px',
					left: '0',
					right: '0',
					bottom: '0',
					background: 'rgba(0, 0, 0, 0.3)',
					'backdrop-filter': 'blur(2px)',
					'z-index': '999',
					opacity: props.isOpen ? '1' : '0',
					visibility: props.isOpen ? 'visible' : 'hidden',
					transition:
						'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), visibility 300ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 300ms cubic-bezier(0.4, 0, 0.2, 1)',
					'pointer-events': props.isOpen ? 'auto' : 'none'
				}}
			/>

			{/* Settings Panel */}
			<aside style={panelStyles()}>
				<div style={headerStyles()}>
					<h3 style={titleStyles()}>Settings</h3>
					<button
						onClick={() => props.onClose()}
						style={{
							background: 'transparent',
							border: 'none',
							color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
							cursor: 'pointer',
							padding: '4px',
							display: 'flex',
							'align-items': 'center',
							'justify-content': 'center',
							'border-radius': '4px',
							transition: 'background-color 0.2s ease'
						}}
						onMouseEnter={e => {
							e.currentTarget.style.backgroundColor = props.isDark()
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

				{/* Glass Section */}
				<div
					style={{
						padding: '16px 20px',
						'border-bottom': `1px solid ${
							props.isDark()
								? 'hsla(240, 3.7%, 15.9%, 1)'
								: 'hsla(220, 13%, 91%, 1)'
						}`
					}}
				>
					<h4
						style={{
							'font-size': '16px',
							'font-weight': '600',
							color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
							margin: '0 0 16px 0'
						}}
					>
						Glass Effect
					</h4>

					{/* Enable/Disable Checkbox */}
					<div style={checkboxContainerStyles()}>
						<input
							type='checkbox'
							id='glass-enabled'
							checked={props.enabled}
							onChange={e => props.onEnabledChange(e.currentTarget.checked)}
							style={checkboxStyles()}
						/>
						<label
							for='glass-enabled'
							style={{
								'font-size': '14px',
								'font-weight': '500',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								cursor: 'pointer',
								'user-select': 'none'
							}}
						>
							Enable Glass Effect
						</label>
					</div>

					{/* Blur Slider */}
					<div style={sliderContainerStyles()}>
						<div style={labelStyles()}>
							<span>Blur</span>
							<span style={valueStyles()}>{props.blur}px</span>
						</div>
						<input
							type='range'
							min='0'
							max='50'
							step='1'
							value={props.blur}
							onInput={e =>
								props.onBlurChange(parseInt(e.currentTarget.value, 10))
							}
							style={sliderStyles()}
						/>
					</div>

					{/* Opacity Slider */}
					<div style={sliderContainerStyles()}>
						<div style={labelStyles()}>
							<span>Opacity</span>
							<span style={valueStyles()}>
								{Math.round(props.opacity * 100)}%
							</span>
						</div>
						<input
							type='range'
							min='0'
							max='100'
							step='1'
							value={props.opacity * 100}
							onInput={e =>
								props.onOpacityChange(parseInt(e.currentTarget.value, 10) / 100)
							}
							style={sliderStyles()}
						/>
					</div>

					{/* Darkness Slider */}
					<div style={sliderContainerStyles()}>
						<div style={labelStyles()}>
							<span>Darkness</span>
							<span style={valueStyles()}>
								{Math.round(props.darkness * 100)}%
							</span>
						</div>
						<input
							type='range'
							min='0'
							max='100'
							step='1'
							value={props.darkness * 100}
							onInput={e =>
								props.onDarknessChange(
									parseInt(e.currentTarget.value, 10) / 100
								)
							}
							style={sliderStyles()}
						/>
					</div>

					{/* Saturation Slider */}
					<div style={sliderContainerStyles()}>
						<div style={labelStyles()}>
							<span>Saturation</span>
							<span style={valueStyles()}>
								{Math.round(props.saturation * 100)}%
							</span>
						</div>
						<input
							type='range'
							min='0'
							max='200'
							step='1'
							value={props.saturation * 100}
							onInput={e =>
								props.onSaturationChange(
									parseInt(e.currentTarget.value, 10) / 100
								)
							}
							style={sliderStyles()}
						/>
					</div>
				</div>
			</aside>
		</>
	)
}
