import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import { Button } from './components/ui/button'
import { Scrollbar, ScrollbarProvider } from './components/ui/scrollbar'
import { TechChip } from './components/ui/tech-chip'
import './styles/globals.css'

function App() {
	const [isDark, setIsDark] = createSignal(true)

	const toggleTheme = () => {
		setIsDark(!isDark())
	}

	// Reusable glow effect component for titles
	const GlowEffect = () => (
		<div
			style={{
				position: 'absolute',
				top: '10px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '300px',
				height: '60px',
				background:
					'linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(139, 92, 246, 0.6) 50%, rgba(236, 72, 153, 0.6) 100%)',
				'background-size': '200% 200%',
				animation: 'gradient-shift 4s ease infinite',
				filter: 'blur(40px)',
				opacity: '0.9',
				'z-index': '0',
				'pointer-events': 'none'
			}}
		/>
	)

	// Glow effect for scrollbar containers
	const ScrollbarGlowEffect = () => (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '500px',
				height: '400px',
				background:
					'linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(139, 92, 246, 0.6) 50%, rgba(236, 72, 153, 0.6) 100%)',
				'background-size': '200% 200%',
				animation: 'gradient-shift 4s ease infinite',
				filter: 'blur(40px)',
				opacity: '0.9',
				'z-index': '0',
				'pointer-events': 'none'
			}}
		/>
	)

	// Animated gradient line component
	const AnimatedGradientLine = (props: { color1: string; color2: string }) => (
		<div
			style={{
				position: 'absolute',
				bottom: '0',
				left: '0',
				width: '100%',
				height: '2px',
				background: `linear-gradient(90deg, ${props.color1} 0%, ${props.color2} 50%, ${props.color1} 100%)`,
				'background-size': '200% 100%',
				animation: 'gradient-slide 3s ease infinite',
				'border-radius': '1px'
			}}
		/>
	)

	return (
		<ScrollbarProvider>
			<div
				data-theme={isDark() ? 'dark' : 'light'}
				style={
					{
						padding: '20px',
						'font-family': 'Arial, sans-serif',
						'min-height': '100vh',
						display: 'flex',
						'flex-direction': 'column',
						gap: '15px',
						width: '100%',
						margin: '0',
						background: isDark() ? 'hsl(240 20% 8%)' : '#ffffff',
						color: isDark() ? '#f6f6f6' : '#1a1a1a',
						transition: 'background 0.3s ease, color 0.3s ease',
						'--text-color': isDark() ? '#ffffff' : '#1a1a1a',
						'--icon-color': isDark() ? '#ffffff' : '#1a1a1a'
					} as any
				}
			>
				<div
					style={{
						'text-align': 'center',
						padding: '10px 0'
					}}
				>
					<h1
						style={{
							margin: '0 0 10px 0',
							color: isDark() ? '#f6f6f6' : '#1a1a1a',
							'font-size': '2.5rem',
							'font-weight': '700',
							'letter-spacing': '-0.02em',
							'text-shadow': isDark()
								? '0 2px 4px rgba(0,0,0,0.3)'
								: '0 2px 4px rgba(255,255,255,0.3)'
						}}
					>
						Solid UI Toolkit
					</h1>
					<p
						style={{
							margin: '0',
							color: isDark()
								? 'rgba(246, 246, 246, 0.7)'
								: 'rgba(26, 26, 26, 0.7)',
							'font-size': '1.1rem',
							'font-weight': '400',
							'letter-spacing': '0.5px'
						}}
					>
						Beautiful components built with Solid.js & Tailwind CSS
					</p>
				</div>

				{/* Button Demo */}
				<div
					style={{
						background: isDark()
							? 'rgba(0, 0, 0, 0.3)'
							: 'rgba(255, 255, 255, 0.8)',
						'backdrop-filter': 'blur(20px) saturate(180%)',
						'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						padding: '10px',
						'border-radius': '0px',
						'box-shadow': isDark()
							? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
							: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
						width: '100%',
						'max-width': '1200px',
						margin: '0 auto',
						overflow: 'hidden',
						position: 'relative'
					}}
				>
					<GlowEffect />
					<h2
						style={{
							'margin-bottom': '5px',
							'font-size': '2rem',
							'font-weight': '700',
							'letter-spacing': '-0.02em',
							'text-align': 'center',
							position: 'relative',
							'padding-bottom': '10px',
							'z-index': '1'
						}}
					>
						<span
							style={{
								color: 'rgba(0, 0, 0, 0.6)',
								'text-shadow': '0 1px 1px rgba(255, 255, 255, 0.1)',
								'backdrop-filter': 'blur(30px) saturate(220%)',
								'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
								padding: '8px 16px',
								'padding-bottom': '12px',
								'border-radius': '0px',
								'box-shadow': isDark()
									? '0 8px 32px rgba(0, 0, 0, 0.4), ' +
									  '0 0 0 1px rgba(255, 255, 255, 0.1), ' +
									  'inset 0 1px 0 rgba(255, 255, 255, 0.15), ' +
									  'inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
									: '0 4px 16px rgba(0, 0, 0, 0.1), ' +
									  '0 0 0 1px rgba(0, 0, 0, 0.1), ' +
									  'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
								background: isDark()
									? 'rgba(255, 255, 255, 0.05)'
									: 'rgba(255, 255, 255, 0.3)',
								position: 'relative',
								display: 'inline-block',
								'user-select': 'none'
							}}
						>
							Button Components
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '0',
									width: '100%',
									height: '2px',
									background:
										'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)',
									'background-size': '200% 100%',
									animation: 'gradient-slide 3s ease infinite'
								}}
							/>
						</span>
					</h2>

					{/* Control Buttons */}
					<div style={{ 'margin-bottom': '12px', width: '100%' }}>
						<h3
							style={{
								'margin-bottom': '12px',
								'font-size': '18px',
								'font-weight': '700',
								'letter-spacing': '0.5px',
								'text-align': 'center',
								position: 'relative',
								'padding-bottom': '8px'
							}}
						>
							<span
								style={{
									color: isDark() ? '#ffffff' : '#1a1a1a',
									'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							>
								Control buttons
							</span>
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '50%',
									transform: 'translateX(-50%)',
									width: '40px',
									height: '1px',
									background: isDark() ? '#ffffff' : '#1a1a1a',
									'border-radius': '1px',
									'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							/>
						</h3>
						<div
							style={{
								display: 'flex',
								'flex-wrap': 'wrap',
								gap: '8px',
								'justify-content': 'center',
								'align-items': 'center',
								width: '100%',
								padding: '10px 0'
							}}
						>
							<Button icon='menu'>Menu</Button>
							<Button icon='settings'>Settings</Button>
							<Button icon='bug_report'>Debug</Button>
						</div>
					</div>

					{/* Small Buttons */}
					<div style={{ 'margin-bottom': '12px', width: '100%' }}>
						<h3
							style={{
								'margin-bottom': '12px',
								'font-size': '18px',
								'font-weight': '700',
								'letter-spacing': '0.5px',
								'text-align': 'center',
								position: 'relative',
								'padding-bottom': '8px'
							}}
						>
							<span
								style={{
									color: isDark() ? '#ffffff' : '#1a1a1a',
									'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							>
								Small buttons (Title bar)
							</span>
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '50%',
									transform: 'translateX(-50%)',
									width: '40px',
									height: '1px',
									background: isDark() ? '#ffffff' : '#1a1a1a',
									'border-radius': '1px',
									'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							/>
						</h3>
						<div
							style={{
								display: 'flex',
								'flex-wrap': 'wrap',
								gap: '8px',
								'justify-content': 'center',
								'align-items': 'center',
								width: '100%',
								padding: '10px 0'
							}}
						>
							<Button
								variant='small'
								icon={isDark() ? 'dark_mode' : 'light_mode'}
								iconFilled={false}
								iconPosition='only'
								title='Theme'
								onClick={toggleTheme}
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
							<Button
								variant='small'
								icon='settings'
								iconPosition='only'
								title='Settings'
							/>
						</div>
					</div>

					{/* Play/Pause Button */}
					<div style={{ 'margin-bottom': '12px', width: '100%' }}>
						<h3
							style={{
								'margin-bottom': '12px',
								'font-size': '18px',
								'font-weight': '700',
								'letter-spacing': '0.5px',
								'text-align': 'center',
								position: 'relative',
								'padding-bottom': '8px'
							}}
						>
							<span
								style={{
									color: isDark() ? '#ffffff' : '#1a1a1a',
									'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							>
								Play/Pause button
							</span>
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '50%',
									transform: 'translateX(-50%)',
									width: '40px',
									height: '1px',
									background: isDark() ? '#ffffff' : '#1a1a1a',
									'border-radius': '1px',
									'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							/>
						</h3>
						<div
							style={{
								display: 'flex',
								'flex-wrap': 'wrap',
								gap: '8px',
								'justify-content': 'center',
								'align-items': 'center',
								width: '100%',
								padding: '10px 0'
							}}
						>
							<Button variant='play-pause' icon='play_arrow' title='Play' />
							<Button variant='play-pause' icon='pause' title='Pause' />
						</div>
					</div>

					{/* Window Control Buttons */}
					<div style={{ 'margin-bottom': '12px', width: '100%' }}>
						<h3
							style={{
								'margin-bottom': '12px',
								'font-size': '18px',
								'font-weight': '700',
								'letter-spacing': '0.5px',
								'text-align': 'center',
								position: 'relative',
								'padding-bottom': '8px'
							}}
						>
							<span
								style={{
									color: isDark() ? '#ffffff' : '#1a1a1a',
									'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							>
								Window control buttons
							</span>
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '50%',
									transform: 'translateX(-50%)',
									width: '40px',
									height: '1px',
									background: isDark() ? '#ffffff' : '#1a1a1a',
									'border-radius': '1px',
									'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							/>
						</h3>
						<div
							style={{
								display: 'flex',
								'flex-wrap': 'wrap',
								gap: '8px',
								'justify-content': 'center',
								'align-items': 'center',
								width: '100%',
								padding: '10px 0'
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
					</div>

					{/* Button States */}
					<div style={{ 'margin-bottom': '12px', width: '100%' }}>
						<h3
							style={{
								'margin-bottom': '12px',
								'font-size': '18px',
								'font-weight': '700',
								'letter-spacing': '0.5px',
								'text-align': 'center',
								position: 'relative',
								'padding-bottom': '8px'
							}}
						>
							<span
								style={{
									color: isDark() ? '#ffffff' : '#1a1a1a'
								}}
							>
								Button states
							</span>
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '50%',
									transform: 'translateX(-50%)',
									width: '40px',
									height: '1px',
									background: isDark() ? '#ffffff' : '#1a1a1a',
									'border-radius': '1px',
									'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							/>
						</h3>
						<div
							style={{
								display: 'flex',
								'flex-wrap': 'wrap',
								gap: '8px',
								'justify-content': 'center',
								'align-items': 'center',
								width: '100%',
								padding: '10px 0'
							}}
						>
							<Button active>Active</Button>
							<Button pinned>Pinned</Button>
							<Button maximized>Maximized</Button>
							<Button loading>Loading</Button>
							<Button disabled>Disabled</Button>
						</div>
					</div>
				</div>

				{/* Material 3 Divider */}
				<div
					style={{
						height: '1px',
						background:
							'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
						width: '100%',
						'max-width': '1200px',
						margin: '30px auto'
					}}
				/>

				{/* TechChip Demo */}
				<div
					style={{
						background: isDark()
							? 'rgba(0, 0, 0, 0.3)'
							: 'rgba(255, 255, 255, 0.8)',
						'backdrop-filter': 'blur(20px) saturate(180%)',
						'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						padding: '10px',
						'border-radius': '0px',
						'box-shadow': isDark()
							? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
							: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
						width: '100%',
						'max-width': '1200px',
						margin: '0 auto',
						overflow: 'hidden',
						position: 'relative'
					}}
				>
					<GlowEffect />
					<h2
						style={{
							'margin-bottom': '10px',
							'font-size': '2rem',
							'font-weight': '700',
							'letter-spacing': '-0.02em',
							'text-align': 'center',
							position: 'relative',
							'padding-bottom': '10px',
							'z-index': '1'
						}}
					>
						<span
							style={{
								color: 'rgba(0, 0, 0, 0.6)',
								'text-shadow': '0 1px 1px rgba(255, 255, 255, 0.1)',
								'backdrop-filter': 'blur(30px) saturate(220%)',
								'-webkit-backdrop-filter': 'blur(30px) saturate(220%)',
								padding: '8px 16px',
								'padding-bottom': '12px',
								'border-radius': '0px',
								'box-shadow': isDark()
									? '0 8px 32px rgba(0, 0, 0, 0.4), ' +
									  '0 0 0 1px rgba(255, 255, 255, 0.1), ' +
									  'inset 0 1px 0 rgba(255, 255, 255, 0.15), ' +
									  'inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
									: '0 4px 16px rgba(0, 0, 0, 0.1), ' +
									  '0 0 0 1px rgba(0, 0, 0, 0.1), ' +
									  'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
								background: isDark()
									? 'rgba(255, 255, 255, 0.05)'
									: 'rgba(255, 255, 255, 0.3)',
								position: 'relative',
								display: 'inline-block',
								'user-select': 'none'
							}}
						>
							TechChip Components
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '0',
									width: '100%',
									height: '2px',
									background:
										'linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #10b981 100%)',
									'background-size': '200% 100%',
									animation: 'gradient-slide 3s ease infinite'
								}}
							/>
						</span>
					</h2>
					<div
						style={{
							display: 'flex',
							'flex-wrap': 'wrap',
							gap: '8px',
							'justify-content': 'center',
							'align-items': 'center',
							width: '100%',
							padding: '20px 0'
						}}
					>
						<TechChip
							label='TypeScript'
							icon='code'
							status='ready'
							variant='frontend'
						/>
						<TechChip
							label='Solid.js'
							icon='javascript'
							status='ready'
							variant='frontend'
						/>
						<TechChip
							label='Rust'
							icon='memory'
							status='ready'
							variant='backend'
						/>
						<TechChip
							label='Tauri'
							icon='desktop_windows'
							status='ready'
							variant='backend'
						/>
						<TechChip
							label='Physics Engine'
							icon='science'
							status='ready'
							variant='engine'
						/>
						<TechChip
							label='WebGL'
							icon='web'
							status='ready'
							variant='engine'
						/>
					</div>
				</div>

				{/* Material 3 Divider */}
				<div
					style={{
						height: '1px',
						background:
							'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
						width: '100%',
						'max-width': '1200px',
						margin: '30px auto'
					}}
				/>

				{/* Scrollbar Demo */}
				<div
					style={{
						background: isDark()
							? 'rgba(0, 0, 0, 0.3)'
							: 'rgba(255, 255, 255, 0.8)',
						'backdrop-filter': 'blur(20px) saturate(180%)',
						'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						padding: '10px',
						'border-radius': '0px',
						'box-shadow': isDark()
							? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
							: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
						width: '100%',
						'max-width': '1200px',
						margin: '0 auto',
						display: 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						overflow: 'hidden',
						position: 'relative'
					}}
				>
					<GlowEffect />
					<h2
						style={{
							'margin-bottom': '5px',
							'font-size': '2rem',
							'font-weight': '700',
							'letter-spacing': '-0.02em',
							'text-align': 'center',
							position: 'relative',
							'padding-bottom': '10px',
							'z-index': '1'
						}}
					>
						<span
							style={{
								color: 'rgba(0, 0, 0, 0.6)',
								'text-shadow': '0 1px 1px rgba(255, 255, 255, 0.1)',
								'backdrop-filter': 'blur(30px) saturate(220%)',
								'-webkit-backdrop-filter': 'blur(30px) saturate(220%)',
								padding: '8px 16px',
								'padding-bottom': '12px',
								'border-radius': '0px',
								'box-shadow': isDark()
									? '0 8px 32px rgba(0, 0, 0, 0.4), ' +
									  '0 0 0 1px rgba(255, 255, 255, 0.1), ' +
									  'inset 0 1px 0 rgba(255, 255, 255, 0.15), ' +
									  'inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
									: '0 4px 16px rgba(0, 0, 0, 0.1), ' +
									  '0 0 0 1px rgba(0, 0, 0, 0.1), ' +
									  'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
								background: isDark()
									? 'rgba(255, 255, 255, 0.05)'
									: 'rgba(255, 255, 255, 0.3)',
								position: 'relative',
								display: 'inline-block',
								'user-select': 'none'
							}}
						>
							Scrollbar Components
							<div
								style={{
									position: 'absolute',
									bottom: '0',
									left: '0',
									width: '100%',
									height: '2px',
									background:
										'linear-gradient(90deg, #f59e0b 0%, #ec4899 50%, #f59e0b 100%)',
									'background-size': '200% 100%',
									animation: 'gradient-slide 3s ease infinite'
								}}
							/>
						</span>
					</h2>

					{/* Scrollbars */}
					<div
						style={{
							display: 'flex',
							gap: '40px',
							'justify-content': 'center',
							'align-items': 'flex-start',
							'margin-bottom': '20px'
						}}
					>
						{/* Vertical Scrollbar */}
						<div style={{ position: 'relative' }}>
							<ScrollbarGlowEffect />
							<h3
								style={{
									'margin-bottom': '12px',
									color: isDark() ? '#ffffff' : '#1a1a1a',
									'font-size': '18px',
									'font-weight': '700',
									'letter-spacing': '0.5px',
									'text-align': 'center',
									'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							>
								Vertical Scrollbar
							</h3>
							<div
								style={{
									border: '1px solid rgba(255, 255, 255, 0.2)',
									'border-radius': '0px',
									width: '500px',
									height: '400px',
									background: 'rgba(0, 0, 0, 0.4)',
									'backdrop-filter': 'blur(10px) saturate(150%)',
									'-webkit-backdrop-filter': 'blur(10px) saturate(150%)',
									'box-shadow': isDark()
										? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
										: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
								}}
							>
								<Scrollbar
									direction='vertical'
									showArrows={true}
									autoHide={false}
									style={{ width: '100%', height: '100%' }}
								>
									<div
										style={{
											padding: '15px',
											color: '#f6f6f6'
										}}
									>
										{Array.from({ length: 20 }, (_, i) => (
											<div
												style={{
													padding: '10px',
													'border-bottom': '1px solid rgba(255, 255, 255, 0.1)'
												}}
											>
												<h3 style={{ color: '#f6f6f6', margin: '0 0 5px 0' }}>
													Item {i + 1}
												</h3>
												<p
													style={{
														color: 'rgba(246, 246, 246, 0.7)',
														margin: '0'
													}}
												>
													This is content for item {i + 1} to demonstrate
													vertical scrolling.
												</p>
											</div>
										))}
									</div>
								</Scrollbar>
							</div>
						</div>

						{/* Horizontal Scrollbar */}
						<div style={{ position: 'relative' }}>
							<ScrollbarGlowEffect />
							<h3
								style={{
									'margin-bottom': '12px',
									color: isDark() ? '#ffffff' : '#1a1a1a',
									'font-size': '18px',
									'font-weight': '700',
									'letter-spacing': '0.5px',
									'text-align': 'center',
									'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
								}}
							>
								Horizontal Scrollbar
							</h3>
							<div
								style={{
									border: '1px solid rgba(255, 255, 255, 0.2)',
									'border-radius': '0px',
									width: '500px',
									height: '400px',
									background: 'rgba(0, 0, 0, 0.4)',
									'backdrop-filter': 'blur(10px) saturate(150%)',
									'-webkit-backdrop-filter': 'blur(10px) saturate(150%)',
									'box-shadow': isDark()
										? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
										: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
								}}
							>
								<Scrollbar
									direction='horizontal'
									showArrows={true}
									autoHide={false}
									style={{ width: '100%', height: '100%' }}
								>
									<div
										style={{
											padding: '15px',
											color: '#f6f6f6',
											'white-space': 'nowrap',
											'min-width': '100%',
											height: '100%',
											'box-sizing': 'border-box'
										}}
									>
										{Array.from({ length: 20 }, (_, i) => (
											<div
												style={{
													padding: '12px 15px',
													'border-bottom': '1px solid rgba(255, 255, 255, 0.1)',
													display: 'inline-block',
													'min-width': '300px',
													'vertical-align': 'top'
												}}
											>
												<h3
													style={{
														color: '#f6f6f6',
														margin: '0 0 5px 0',
														'font-size': '16px'
													}}
												>
													Item {i + 1}
												</h3>
												<p
													style={{
														color: 'rgba(246, 246, 246, 0.7)',
														margin: '0',
														'font-size': '14px'
													}}
												>
													Horizontal scroll content {i + 1}
												</p>
											</div>
										))}
									</div>
								</Scrollbar>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ScrollbarProvider>
	)
}

render(() => <App />, document.getElementById('app')!)
