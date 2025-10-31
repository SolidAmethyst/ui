import { Component, Accessor } from 'solid-js'
import { Scrollbar } from '../../../components/ui/scrollbar'
import { DemoSection } from '../common/demo-section'
import { ScrollbarGlowEffect } from '../effects'

interface ScrollbarSectionProps {
	isDark: Accessor<boolean>
}

export const ScrollbarSection: Component<ScrollbarSectionProps> = props => (
	<DemoSection
		title='Scrollbar Components'
		gradientColors={{ color1: '#f59e0b', color2: '#ec4899' }}
		isDark={props.isDark}
	>
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
						color: props.isDark() ? '#ffffff' : '#1a1a1a',
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
						'box-shadow': props.isDark()
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
										This is content for item {i + 1} to demonstrate vertical
										scrolling.
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
						color: props.isDark() ? '#ffffff' : '#1a1a1a',
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
						'box-shadow': props.isDark()
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
	</DemoSection>
)

