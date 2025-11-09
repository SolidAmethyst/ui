/**
 * TitleBar Component Styles
 */

export const titleBarStyles = {
	container: {
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		width: '100%',
		height: '32px',
		'background-color': 'hsl(var(--titlebar-background))',
		'user-select': 'none',
		'-webkit-app-region': 'drag' as const,
		'box-sizing': 'border-box',
		padding: '0',
		margin: '0',
		position: 'relative' as const,
		'z-index': '1000',
		border: 'none'
	},
	leftSection: {
		display: 'flex',
		'align-items': 'center',
		height: '100%',
		'flex-shrink': '0'
	},
	burgerButton: {
		'-webkit-app-region': 'no-drag' as const,
		width: '32px',
		height: '32px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
		padding: '0',
		margin: '0',
		color: 'hsl(var(--titlebar-foreground) / 0.9)',
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
	},
	titleArea: {
		display: 'flex',
		'align-items': 'center',
		flex: '1',
		height: '100%',
		padding: '0 12px',
		overflow: 'hidden',
		'text-overflow': 'ellipsis',
		'white-space': 'nowrap',
		color: 'hsl(var(--titlebar-foreground) / 0.9)',
		'font-size': '13px',
		'font-weight': '400',
		'letter-spacing': '0.01em'
	},
	rightSection: {
		display: 'flex',
		'align-items': 'center',
		height: '100%',
		'flex-shrink': '0',
		'-webkit-app-region': 'no-drag' as const
	},
	controlsGroup: {
		display: 'flex',
		'align-items': 'center',
		height: '100%',
		gap: '0'
	},
	separator: {
		width: '1px',
		height: '20px',
		'background-color': 'hsl(var(--titlebar-separator))',
		margin: '0 4px'
	},
	controlButton: {
		width: '32px',
		height: '32px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
		padding: '0',
		margin: '0',
		color: 'hsl(var(--titlebar-foreground) / 0.8)',
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
	},
	controlButtonHover: {
		'background-color': 'hsl(var(--titlebar-accent))'
	},
	closeButtonHover: {
		'background-color': 'hsl(var(--titlebar-close-hover) / 0.2)'
	}
}
