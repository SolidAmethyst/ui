import { Component, Accessor } from 'solid-js'
import { TechChip } from '../../../components/ui/tech-chip'
import { DemoSection } from '../common/demo-section'

interface TechChipSectionProps {
	isDark: Accessor<boolean>
}

export const TechChipSection: Component<TechChipSectionProps> = props => (
	<DemoSection
		title='TechChip Components'
		gradientColors={{ color1: '#10b981', color2: '#06b6d4' }}
		isDark={props.isDark}
	>
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
			<TechChip label='WebGL' icon='web' status='ready' variant='engine' />
		</div>
	</DemoSection>
)

