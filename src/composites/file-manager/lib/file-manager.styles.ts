/**
 * FileManager Component Styles
 * Styles for file manager component using only CSS variables
 */

import type { JSX } from 'solid-js'

export const fileManagerStyles = {
	container: (): JSX.CSSProperties => ({
		display: 'flex',
		'flex-direction': 'column',
		width: '100%',
		height: '100%',
		background: 'hsl(var(--secondary))',
		'border-radius': 'var(--radius-lg)',
		border: `1px solid hsl(var(--border))`,
		overflow: 'hidden'
	}),

	header: (): JSX.CSSProperties => ({
		padding: `var(--spacing-sm) var(--spacing-md)`,
		'border-bottom': `1px solid hsl(var(--border))`,
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		'flex-shrink': '0',
		background: 'hsla(var(--background) / 0.02)'
	}),

	headerTitle: (): JSX.CSSProperties => ({
		'font-size': 'var(--font-size-sm)',
		'font-weight': '600',
		color: 'hsl(var(--foreground) / 0.9)'
	}),

	toolbar: (): JSX.CSSProperties => ({
		padding: `var(--spacing-sm) var(--spacing-md)`,
		'border-bottom': `1px solid hsl(var(--border))`,
		display: 'flex',
		'align-items': 'center',
		gap: 'var(--spacing-sm)',
		'flex-shrink': '0'
	}),

	driveButton: (): JSX.CSSProperties => ({
		padding: `var(--spacing-xs) var(--spacing-sm)`,
		'font-size': 'var(--font-size-sm)',
		'border-radius': 'var(--radius-sm)',
		border: `1px solid hsl(var(--border))`,
		background: 'transparent',
		color: 'hsl(var(--foreground) / 0.6)',
		cursor: 'pointer',
		transition: 'all var(--transition-base)'
	}),

	driveButtonHover: (): JSX.CSSProperties => ({
		background: 'hsl(var(--muted) / 0.5)',
		color: 'hsl(var(--foreground) / 0.9)'
	}),

	navigationButton: (): JSX.CSSProperties => ({
		padding: 'var(--spacing-sm)',
		'border-radius': 'var(--radius-sm)',
		border: `1px solid hsl(var(--border))`,
		background: 'transparent',
		color: 'hsl(var(--foreground) / 0.6)',
		cursor: 'pointer',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		transition: 'all var(--transition-base)'
	}),

	navigationButtonHover: (): JSX.CSSProperties => ({
		background: 'hsl(var(--muted) / 0.5)',
		color: 'hsl(var(--foreground) / 0.9)'
	}),

	breadcrumbs: (): JSX.CSSProperties => ({
		flex: '1',
		display: 'flex',
		'align-items': 'center',
		gap: 'var(--spacing-xs)',
		overflow: 'auto'
	}),

	breadcrumbButton: (): JSX.CSSProperties => ({
		padding: `var(--spacing-xs) var(--spacing-sm)`,
		'font-size': 'var(--font-size-sm)',
		'border-radius': 'var(--radius-sm)',
		border: 'none',
		background: 'transparent',
		color: 'hsl(var(--foreground) / 0.7)',
		cursor: 'pointer',
		'white-space': 'nowrap',
		transition: 'all var(--transition-base)'
	}),

	breadcrumbButtonHover: (): JSX.CSSProperties => ({
		background: 'hsl(var(--muted) / 0.5)',
		color: 'hsl(var(--foreground) / 0.9)'
	}),

	breadcrumbSeparator: (): JSX.CSSProperties => ({
		width: 'var(--spacing-md)',
		height: 'var(--spacing-md)',
		color: 'hsl(var(--muted-foreground))',
		'flex-shrink': '0'
	}),

	searchPanel: (): JSX.CSSProperties => ({
		padding: `var(--spacing-sm) var(--spacing-md)`,
		'border-bottom': `1px solid hsl(var(--border))`,
		'flex-shrink': '0',
		height: 'var(--spacing-2xl)',
		'box-sizing': 'border-box'
	}),

	searchInputContainer: (): JSX.CSSProperties => ({
		position: 'relative',
		width: '100%',
		height: '100%',
		'border-bottom': `1px solid hsl(var(--primary) / 0.3)`
	}),

	searchInput: (): JSX.CSSProperties => ({
		position: 'absolute',
		inset: '0',
		width: '100%',
		height: '100%',
		padding: `0 var(--spacing-2xl) 0 var(--spacing-sm)`,
		'font-size': 'var(--font-size-sm)',
		background: 'transparent',
		border: 'none',
		color: 'hsl(var(--foreground) / 0.9)',
		outline: 'none'
	}),

	searchControls: (): JSX.CSSProperties => ({
		position: 'absolute',
		right: 'var(--spacing-sm)',
		top: '50%',
		transform: 'translateY(-50%)',
		width: 'var(--spacing-lg)',
		height: 'var(--spacing-lg)',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center'
	}),

	searchClearButton: (visible: boolean): JSX.CSSProperties => ({
		width: 'var(--spacing-lg)',
		height: 'var(--spacing-lg)',
		'border-radius': '50%',
		border: 'none',
		background: 'transparent',
		color: 'hsl(var(--muted-foreground))',
		cursor: 'pointer',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		opacity: visible ? '1' : '0.3',
		transition: 'all var(--transition-base)'
	}),

	searchClearButtonHover: (): JSX.CSSProperties => ({
		background: 'hsl(var(--muted) / 0.5)'
	}),

	fileList: (): JSX.CSSProperties => ({
		flex: '1',
		overflow: 'auto',
		width: '100%',
		'min-width': '600px'
	}),

	table: (): JSX.CSSProperties => ({
		width: '100%',
		'font-size': 'var(--font-size-sm)',
		'border-collapse': 'collapse'
	}),

	thead: (): JSX.CSSProperties => ({
		position: 'sticky',
		top: '0',
		'z-index': '10',
		background: 'hsla(var(--background) / 0.8)',
		'backdrop-filter': 'blur(8px)',
		'border-bottom': `1px solid hsl(var(--border))`
	}),

	th: (): JSX.CSSProperties => ({
		padding: `var(--spacing-xs) var(--spacing-sm)`,
		'text-align': 'left',
		'font-weight': '500',
		color: 'hsl(var(--foreground) / 0.9)',
		'vertical-align': 'middle'
	}),

	sortButton: (active: boolean): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		gap: 'var(--spacing-xs)',
		'font-weight': '500',
		border: 'none',
		background: 'transparent',
		color: active ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.7)',
		cursor: 'pointer',
		transition: 'color var(--transition-base)'
	}),

	sortButtonHover: (): JSX.CSSProperties => ({
		color: 'hsl(var(--primary))'
	}),

	tbody: (): JSX.CSSProperties => ({}),

	tr: (selected: boolean): JSX.CSSProperties => ({
		'border-bottom': `1px solid hsl(var(--border) / 0.3)`,
		background: selected ? 'hsl(var(--primary) / 0.2)' : 'transparent',
		cursor: 'pointer',
		'user-select': 'none',
		transition: 'background var(--transition-base)'
	}),

	trHover: (selected: boolean): JSX.CSSProperties => ({
		background: selected
			? 'hsl(var(--primary) / 0.25)'
			: 'hsl(var(--muted) / 0.3)'
	}),

	td: (): JSX.CSSProperties => ({
		padding: `var(--spacing-xs) var(--spacing-sm)`,
		'vertical-align': 'middle',
		color: 'hsl(var(--foreground) / 0.6)'
	}),

	checkboxCell: (): JSX.CSSProperties => ({
		width: 'var(--spacing-2xl)',
		'min-width': 'var(--spacing-2xl)',
		'max-width': 'var(--spacing-2xl)',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center'
	}),

	fileIcon: (isFolder: boolean): JSX.CSSProperties => ({
		width: 'var(--spacing-md)',
		height: 'var(--spacing-md)',
		'flex-shrink': '0',
		color: isFolder ? 'hsl(var(--accent))' : 'hsl(var(--primary))'
	}),

	fileName: (): JSX.CSSProperties => ({
		overflow: 'hidden',
		'text-overflow': 'ellipsis',
		'white-space': 'nowrap',
		color: 'hsl(var(--foreground) / 0.9)'
	}),

	footer: (): JSX.CSSProperties => ({
		padding: `var(--spacing-sm) var(--spacing-md)`,
		'border-top': `1px solid hsl(var(--border))`,
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		background: 'hsla(var(--background) / 0.02)',
		'flex-shrink': '0'
	}),

	footerText: (): JSX.CSSProperties => ({
		'font-size': 'var(--font-size-sm)',
		color: 'hsl(var(--foreground) / 0.7)'
	}),

	loadingContainer: (): JSX.CSSProperties => ({
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		height: '100%'
	}),

	loadingSpinner: (): JSX.CSSProperties => ({
		width: 'var(--spacing-2xl)',
		height: 'var(--spacing-2xl)',
		border: `2px solid hsl(var(--border))`,
		'border-top-color': 'hsl(var(--primary))',
		'border-radius': '50%',
		animation: 'spin 0.6s linear infinite'
	})
} as const
