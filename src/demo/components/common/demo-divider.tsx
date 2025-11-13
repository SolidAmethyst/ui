// Material 3 Divider component
import type { Accessor } from 'solid-js'

interface DemoDividerProps {
	isDark?: Accessor<boolean> | boolean
}

export const DemoDivider = (props?: DemoDividerProps) => {
	const isDark = () => {
		if (!props?.isDark) {
			// Try to detect theme from data-theme attribute
			if (typeof document !== 'undefined') {
				return document.documentElement.getAttribute('data-theme') === 'dark'
			}
			return false
		}
		return typeof props.isDark === 'function' ? props.isDark() : props.isDark
	}

	const dividerColor = () => {
		const dark = isDark()
		return dark
			? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)'
			: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)'
	}

	return (
		<div
			style={{
				height: '1px',
				background: dividerColor(),
				width: '100%',
				'max-width': '1200px',
				margin: '16px 0'
			}}
		/>
	)
}
