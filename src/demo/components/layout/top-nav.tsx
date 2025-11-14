import { Component, Show } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { Container } from '../../../components/ui/container'
import { Glass } from '../../../components/ui/glass'
import { TabsRoot, TabsList, TabsTrigger } from '../../../components/ui/tabs'

interface TopNavProps {
	isDark: () => boolean
	toggleTheme: () => void
	currentPage: 'docs' | 'blocks' | 'settings'
	onPageChange: (page: 'docs' | 'blocks' | 'settings') => void
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
				<Container
					style={{
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'space-between',
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
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
							height: '100%',
							display: 'flex',
							'align-items': 'center'
						}}
					>
						<TabsRoot
							value={props.currentPage}
							onValueChange={value => props.onPageChange(value as 'docs' | 'blocks' | 'settings')}
							isDark={props.isDark()}
							style={{
								margin: '0',
								width: 'auto'
							}}
						>
							<TabsList
								style={{
									'border-bottom': 'none',
									margin: '0',
									gap: '8px'
								}}
							>
								<TabsTrigger
									value='docs'
									padding='8px 16px'
									fontSize='14px'
									fontWeight='500'
									style={{
										'margin-bottom': '-2px'
									}}
								>
									Docs
								</TabsTrigger>
								<TabsTrigger
									value='blocks'
									padding='8px 16px'
									fontSize='14px'
									fontWeight='500'
									style={{
										'margin-bottom': '-2px'
									}}
								>
									Blocks
								</TabsTrigger>
								<TabsTrigger
									value='settings'
									padding='8px 16px'
									fontSize='14px'
									fontWeight='500'
									style={{
										'margin-bottom': '-2px'
									}}
								>
									Settings
								</TabsTrigger>
							</TabsList>
						</TabsRoot>
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
				</Container>
			</header>
		}
	>
		<Glass
			variant='matte'
			blur={props.glassBlur}
			opacity={props.glassOpacity}
			darkness={props.glassDarkness}
			saturation={props.glassSaturation}
			isDark={props.isDark()}
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
				<Container
					style={{
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'space-between',
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
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
							height: '100%',
							display: 'flex',
							'align-items': 'center'
						}}
					>
						<TabsRoot
							value={props.currentPage}
							onValueChange={value => props.onPageChange(value as 'docs' | 'blocks' | 'settings')}
							isDark={props.isDark()}
							style={{
								margin: '0',
								width: 'auto'
							}}
						>
							<TabsList
								style={{
									'border-bottom': 'none',
									margin: '0',
									gap: '8px'
								}}
							>
								<TabsTrigger
									value='docs'
									padding='8px 16px'
									fontSize='14px'
									fontWeight='500'
									style={{
										'margin-bottom': '-2px'
									}}
								>
									Docs
								</TabsTrigger>
								<TabsTrigger
									value='blocks'
									padding='8px 16px'
									fontSize='14px'
									fontWeight='500'
									style={{
										'margin-bottom': '-2px'
									}}
								>
									Blocks
								</TabsTrigger>
								<TabsTrigger
									value='settings'
									padding='8px 16px'
									fontSize='14px'
									fontWeight='500'
									style={{
										'margin-bottom': '-2px'
									}}
								>
									Settings
								</TabsTrigger>
							</TabsList>
						</TabsRoot>
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
				</Container>
			</header>
		</Glass>
	</Show>
)
