import { Component } from 'solid-js'

interface SubsectionTitleProps {
	title: string
	isDark: () => boolean
}

export const SubsectionTitle: Component<SubsectionTitleProps> = props => (
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
				color: props.isDark() ? '#ffffff' : '#1a1a1a',
				'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
			}}
		>
			{props.title}
		</span>
		<div
			style={{
				position: 'absolute',
				bottom: '0',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '40px',
				height: '1px',
				background: props.isDark() ? '#ffffff' : '#1a1a1a',
				'border-radius': '1px',
				'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.3)'
			}}
		/>
	</h3>
)
