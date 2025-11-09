/**
 * Menu Component Styles
 */

export const menuStyles = {
	overlay: {
		position: 'fixed' as const,
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		'z-index': '9999',
		background: 'transparent',
		cursor: 'default'
	},
	container: {
		position: 'absolute' as const,
		'min-width': '200px',
		'background-color': 'hsl(var(--menu-background) / 0.95)',
		'backdrop-filter': 'blur(20px) saturate(180%)',
		'-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
		'border-radius': '8px',
		'box-shadow':
			'0 4px 16px hsl(var(--menu-shadow) / 0.4), 0 1px 0 hsl(var(--menu-foreground) / 0.05) inset',
		border: '1px solid hsl(var(--menu-border))',
		'box-sizing': 'border-box',
		padding: '4px',
		'z-index': '10000',
		overflow: 'hidden',
		'user-select': 'none'
	},
	list: {
		display: 'flex',
		'flex-direction': 'column' as const,
		gap: '2px',
		margin: '0',
		padding: '0',
		'list-style': 'none'
	},
	item: {
		display: 'flex',
		'align-items': 'center',
		gap: '12px',
		padding: '8px 12px',
		'border-radius': '6px',
		cursor: 'pointer',
		'font-size': '13px',
		color: 'hsl(var(--menu-foreground) / 0.9)',
		transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		'background-color': 'transparent',
		border: 'none',
		width: '100%',
		'text-align': 'left' as const,
		'box-sizing': 'border-box'
	},
	itemHover: {
		'background-color': 'hsl(var(--menu-accent))'
	},
	itemDisabled: {
		opacity: '0.5',
		cursor: 'not-allowed'
	},
	itemIcon: {
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		width: '20px',
		height: '20px',
		'font-size': '18px',
		color: 'hsl(var(--menu-foreground) / 0.8)',
		'flex-shrink': '0'
	},
	itemLabel: {
		flex: '1',
		'white-space': 'nowrap' as const,
		overflow: 'hidden',
		'text-overflow': 'ellipsis'
	},
	separator: {
		height: '1px',
		'background-color': 'hsl(var(--menu-border))',
		margin: '4px 0',
		'flex-shrink': '0'
	}
}
