import { Component, Show } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { Container } from '../../../components/ui/container'
import { Glass } from '../../../components/ui/glass'
import { TabsList, TabsRoot, TabsTrigger } from '../../../components/ui/tabs'

interface TopNavProps {
	isDark: () => boolean
	toggleTheme: () => void
	currentPage: 'docs' | 'blocks' | 'settings'
	onPageChange: (page: 'docs' | 'blocks' | 'settings') => void
	glassEnabled: boolean
	glassBlur: number
	glassOpacity: number
	glassDarkness: number
	glassSaturation: number
}

export const TopNav: Component<TopNavProps> = props => {
	return (
		<Show
			when={props.glassEnabled}
			fallback={
			<header
				style={{
					position: 'fixed',
					top: '0',
					left: '0',
					right: '0',
					height: 'var(--top-nav-height, 60px)',
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
								color: 'hsl(var(--foreground))',
								'font-size': '1.25rem',
								'font-weight': '700',
								'letter-spacing': '-0.02em',
								'line-height': '1',
								display: 'flex',
								'align-items': 'center',
								'padding-left': '16px'
							}}
						>
							Solid UI Toolkit
						</a>
					</div>

					{/* Navigation */}
					<nav
						ref={fixTabButtonStyles}
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
							defaultValue={props.currentPage}
							onValueChange={value =>
								props.onPageChange(value as 'docs' | 'blocks' | 'settings')
							}
							isDark={props.isDark()}
							style={{
								margin: '0',
								width: 'auto',
								height: 'var(--top-nav-height, 60px)'
							}}
						>
							<TabsList
								style={{
									'border-bottom': 'none',
									margin: '0',
									gap: 'var(--tabs-button-gap)',
									height: 'var(--top-nav-height, 60px)',
									'align-items': 'flex-end'
								}}
							>
								<TabsTrigger
									value='docs'
									padding='var(--top-nav-tab-padding, 8px 16px)'
									fontSize='var(--top-nav-tab-font-size, 14px)'
									fontWeight='var(--top-nav-tab-font-weight, 500)'
									display='flex'
									alignItems='center'
									justifyContent='center'
									style={{
										margin: '0',
										'margin-bottom': 'calc(-1 * var(--tabs-button-border-bottom-width))',
										height: '100%'
									}}
								>
									Docs
								</TabsTrigger>
								<TabsTrigger
									value='blocks'
									padding='var(--top-nav-tab-padding, 8px 16px)'
									fontSize='var(--top-nav-tab-font-size, 14px)'
									fontWeight='var(--top-nav-tab-font-weight, 500)'
									display='flex'
									alignItems='center'
									justifyContent='center'
									style={{
										margin: '0',
										'margin-bottom': 'calc(-1 * var(--tabs-button-border-bottom-width))',
										height: '100%'
									}}
								>
									Blocks
								</TabsTrigger>
								<TabsTrigger
									value='settings'
									padding='var(--top-nav-tab-padding, 8px 16px)'
									fontSize='var(--top-nav-tab-font-size, 14px)'
									fontWeight='var(--top-nav-tab-font-weight, 500)'
									display='flex'
									alignItems='center'
									justifyContent='center'
									style={{
										margin: '0',
										'margin-bottom': 'calc(-1 * var(--tabs-button-border-bottom-width))',
										height: '100%'
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
				height: 'var(--top-nav-height, 60px)',
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
								color: 'hsl(var(--foreground))',
								'font-size': '1.25rem',
								'font-weight': '700',
								'letter-spacing': '-0.02em',
								'line-height': '1',
								display: 'flex',
								'align-items': 'center',
								'padding-left': '16px'
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
							defaultValue={props.currentPage}
							onValueChange={value =>
								props.onPageChange(value as 'docs' | 'blocks' | 'settings')
							}
							isDark={props.isDark()}
							style={{
								margin: '0',
								width: 'auto',
								height: 'var(--top-nav-height, 60px)'
							}}
						>
							<TabsList
								style={{
									'border-bottom': 'none',
									margin: '0',
									gap: 'var(--tabs-button-gap)',
									height: 'var(--top-nav-height, 60px)',
									'align-items': 'flex-end'
								}}
							>
								<TabsTrigger
									value='docs'
									padding='var(--top-nav-tab-padding, 8px 16px)'
									fontSize='var(--top-nav-tab-font-size, 14px)'
									fontWeight='var(--top-nav-tab-font-weight, 500)'
									display='flex'
									alignItems='center'
									justifyContent='center'
									style={{
										margin: '0',
										'margin-bottom': 'calc(-1 * var(--tabs-button-border-bottom-width))',
										height: '100%'
									}}
								>
									Docs
								</TabsTrigger>
								<TabsTrigger
									value='blocks'
									padding='var(--top-nav-tab-padding, 8px 16px)'
									fontSize='var(--top-nav-tab-font-size, 14px)'
									fontWeight='var(--top-nav-tab-font-weight, 500)'
									display='flex'
									alignItems='center'
									justifyContent='center'
									style={{
										margin: '0',
										'margin-bottom': 'calc(-1 * var(--tabs-button-border-bottom-width))',
										height: '100%'
									}}
								>
									Blocks
								</TabsTrigger>
								<TabsTrigger
									value='settings'
									padding='var(--top-nav-tab-padding, 8px 16px)'
									fontSize='var(--top-nav-tab-font-size, 14px)'
									fontWeight='var(--top-nav-tab-font-weight, 500)'
									display='flex'
									alignItems='center'
									justifyContent='center'
									style={{
										margin: '0',
										'margin-bottom': 'calc(-1 * var(--tabs-button-border-bottom-width))',
										height: '100%'
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
					</div>
				</Container>
			</header>
		</Glass>
	</Show>
	)
}
