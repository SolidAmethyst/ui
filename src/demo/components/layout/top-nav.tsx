import { Component, Show } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { Glass } from '../../../components/ui/glass'

interface TopNavProps {
	isDark: () => boolean
	toggleTheme: () => void
	currentPage: 'demo' | 'docs'
	onPageChange: (page: 'demo' | 'docs') => void
	onSettingsClick: () => void
	glassEnabled: boolean
	glassBlur: number
	glassOpacity: number
	glassDarkness: number
	glassSaturation: number
}

export const TopNav: Component<TopNavProps> = props => (
	<Show
		when={props.glassEnabled}
		fallback={
			<header
				style={{
					position: 'fixed',
					top: '0',
					left: '0',
					right: '0',
					height: '60px',
					'z-index': '100',
					background: props.isDark()
						? 'rgba(0, 0, 0, 0.8)'
						: 'rgba(255, 255, 255, 0.8)',
					padding: '0',
					display: 'flex',
					'align-items': 'center',
					'justify-content': 'center',
					width: '100%',
					'box-shadow': props.isDark()
						? '0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 16px rgba(0, 0, 0, 0.3)'
						: '0 1px 0 rgba(0, 0, 0, 0.03), 0 4px 16px rgba(0, 0, 0, 0.1)'
				}}
			>
				<div
					style={{
						width: '100%',
						'max-width': '1400px',
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'space-between',
						padding: '0 32px',
						margin: '0 auto',
						'box-sizing': 'border-box',
						position: 'relative'
					}}
				>
					{/* Logo */}
					<div
						style={{ display: 'flex', 'align-items': 'center', gap: '12px' }}
					>
						<a
							href='/'
							style={{
								'text-decoration': 'none',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								'font-size': '1.25rem',
								'font-weight': '700',
								'letter-spacing': '-0.02em'
							}}
						>
							Solid UI Toolkit
						</a>
					</div>

					{/* Navigation */}
					<nav
						style={{
							display: 'flex',
							gap: '8px',
							'align-items': 'center',
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)'
						}}
					>
						<button
							onClick={() => props.onPageChange('demo')}
							style={{
								padding: '8px 16px',
								'font-size': '14px',
								'font-weight': '500',
								border: 'none',
								background:
									props.currentPage === 'demo'
										? props.isDark()
											? 'rgba(255, 255, 255, 0.1)'
											: 'rgba(0, 0, 0, 0.05)'
										: 'transparent',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								cursor: 'pointer',
								'border-radius': '6px',
								transition: 'all 0.2s ease'
							}}
						>
							Demo
						</button>
						<button
							onClick={() => props.onPageChange('docs')}
							style={{
								padding: '8px 16px',
								'font-size': '14px',
								'font-weight': '500',
								border: 'none',
								background:
									props.currentPage === 'docs'
										? props.isDark()
											? 'rgba(255, 255, 255, 0.1)'
											: 'rgba(0, 0, 0, 0.05)'
										: 'transparent',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								cursor: 'pointer',
								'border-radius': '6px',
								transition: 'all 0.2s ease'
							}}
						>
							Docs
						</button>
					</nav>

					{/* Right controls */}
					<div style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}>
						<Button
							variant='small'
							icon={props.isDark() ? 'dark_mode' : 'light_mode'}
							iconFilled={false}
							iconPosition='only'
							title='Toggle theme'
							onClick={props.toggleTheme}
						/>
						<Button
							variant='small'
							icon='tune'
							iconFilled={false}
							iconPosition='only'
							title='Glass settings'
							onClick={props.onSettingsClick}
						/>
					</div>
				</div>
			</header>
		}
	>
		<Glass
			variant='matte'
			blur={props.glassBlur}
			opacity={props.glassOpacity}
			darkness={props.glassDarkness}
			saturation={props.glassSaturation}
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				right: '0',
				height: '60px',
				'z-index': '100',
				padding: '0',
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center',
				width: '100%',
				'box-shadow': props.isDark()
					? '0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 16px rgba(0, 0, 0, 0.3)'
					: '0 1px 0 rgba(0, 0, 0, 0.03), 0 4px 16px rgba(0, 0, 0, 0.1)'
			}}
		>
			<header
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					'align-items': 'center',
					'justify-content': 'center'
				}}
			>
				<div
					style={{
						width: '100%',
						'max-width': '1400px',
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'space-between',
						padding: '0 32px',
						margin: '0 auto',
						'box-sizing': 'border-box',
						position: 'relative'
					}}
				>
					{/* Logo */}
					<div
						style={{ display: 'flex', 'align-items': 'center', gap: '12px' }}
					>
						<a
							href='/'
							style={{
								'text-decoration': 'none',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								'font-size': '1.25rem',
								'font-weight': '700',
								'letter-spacing': '-0.02em'
							}}
						>
							Solid UI Toolkit
						</a>
					</div>

					{/* Navigation */}
					<nav
						style={{
							display: 'flex',
							gap: '8px',
							'align-items': 'center',
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)'
						}}
					>
						<button
							onClick={() => props.onPageChange('demo')}
							style={{
								padding: '8px 16px',
								'font-size': '14px',
								'font-weight': '500',
								border: 'none',
								background:
									props.currentPage === 'demo'
										? props.isDark()
											? 'rgba(255, 255, 255, 0.1)'
											: 'rgba(0, 0, 0, 0.05)'
										: 'transparent',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								cursor: 'pointer',
								'border-radius': '6px',
								transition: 'all 0.2s ease'
							}}
						>
							Demo
						</button>
						<button
							onClick={() => props.onPageChange('docs')}
							style={{
								padding: '8px 16px',
								'font-size': '14px',
								'font-weight': '500',
								border: 'none',
								background:
									props.currentPage === 'docs'
										? props.isDark()
											? 'rgba(255, 255, 255, 0.1)'
											: 'rgba(0, 0, 0, 0.05)'
										: 'transparent',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								cursor: 'pointer',
								'border-radius': '6px',
								transition: 'all 0.2s ease'
							}}
						>
							Docs
						</button>
					</nav>

					{/* Right controls */}
					<div style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}>
						<Button
							variant='small'
							icon={props.isDark() ? 'dark_mode' : 'light_mode'}
							iconFilled={false}
							iconPosition='only'
							title='Toggle theme'
							onClick={props.toggleTheme}
						/>
						<Button
							variant='small'
							icon='tune'
							iconFilled={false}
							iconPosition='only'
							title='Glass settings'
							onClick={props.onSettingsClick}
						/>
					</div>
				</div>
			</header>
		</Glass>
	</Show>
)
