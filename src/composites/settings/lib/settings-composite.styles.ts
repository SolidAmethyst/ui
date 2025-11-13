/**
 * Settings Composite Styles
 */

export const settingsCompositeStyles = {
	container: () => ({
		display: 'flex',
		height: '100%',
		width: '100%',
		overflow: 'hidden',
		'box-sizing': 'border-box' as const,
		flex: '1'
	}),

	sidebar: (isDark: boolean) => ({
		width: '220px',
		'min-width': '220px',
		'flex-shrink': '0',
		'border-right': `1px solid ${
			isDark ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`,
		background: isDark ? 'hsla(240, 5.9%, 8%, 0.95)' : 'hsla(0, 0%, 98%, 0.95)',
		overflow: 'hidden' as const,
		'box-sizing': 'border-box' as const,
		display: 'flex',
		'flex-direction': 'column' as const
	}),

	categoryButton: (isDark: boolean, isActive: boolean) => ({
		width: '100%',
		display: 'flex',
		'align-items': 'center',
		gap: '12px',
		padding: '12px 16px',
		'border-radius': '0',
		cursor: 'pointer',
		'font-size': 'var(--settings-label-font-size)',
		color: isActive
			? isDark
				? '#f6f6f6'
				: '#1a1a1a'
			: isDark
			? 'rgba(246, 246, 246, 0.7)'
			: 'rgba(26, 26, 26, 0.7)',
		transition:
			'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		'background-color': isActive
			? isDark
				? 'hsla(240, 3.7%, 15.9%, 1)'
				: 'hsla(220, 13%, 91%, 1)'
			: 'transparent',
		border: 'none',
		'text-align': 'left' as const,
		'box-sizing': 'border-box' as const,
		'font-weight': isActive ? '500' : '400',
		'white-space': 'nowrap' as const,
		overflow: 'hidden' as const,
		'text-overflow': 'ellipsis' as const
	}),

	categoryIcon: () => ({
		'font-size': '20px',
		width: '20px',
		height: '20px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		'flex-shrink': '0'
	}),

	subcategoryContainer: (isDark: boolean) => ({
		padding: '4px 0',
		'border-top': `1px solid ${
			isDark ? 'hsla(240, 3.7%, 15.9%, 0.3)' : 'hsla(220, 13%, 91%, 0.3)'
		}`,
		'margin-top': '4px'
	}),

	subcategoryButton: (isDark: boolean, isActive: boolean) => ({
		width: '100%',
		display: 'flex',
		'align-items': 'center',
		gap: '10px',
		padding: '8px 16px 8px 44px', // Indent subcategories
		'border-radius': '0',
		cursor: 'pointer',
		'font-size': 'var(--settings-description-font-size)',
		color: isActive
			? isDark
				? '#f6f6f6'
				: '#1a1a1a'
			: isDark
			? 'rgba(246, 246, 246, 0.6)'
			: 'rgba(26, 26, 26, 0.6)',
		transition:
			'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		'background-color': isActive
			? isDark
				? 'hsla(240, 3.7%, 15.9%, 0.6)'
				: 'hsla(220, 13%, 91%, 0.6)'
			: 'transparent',
		border: 'none',
		'text-align': 'left' as const,
		'box-sizing': 'border-box' as const,
		'font-weight': isActive ? '500' : '400',
		'white-space': 'nowrap' as const,
		overflow: 'hidden' as const,
		'text-overflow': 'ellipsis' as const
	}),

	subcategoryIcon: () => ({
		'font-size': '18px',
		width: '18px',
		height: '18px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		'flex-shrink': '0'
	}),

	content: (isDark: boolean) => ({
		flex: '1',
		overflow: 'hidden' as const,
		background: isDark
			? 'hsla(240, 5.9%, 10%, 0.95)'
			: 'hsla(0, 0%, 98%, 0.95)',
		'box-sizing': 'border-box' as const,
		display: 'flex' as const,
		'flex-direction': 'column' as const
	}),

	tabsContainer: (isDark: boolean) => ({
		display: 'flex',
		gap: '0',
		'border-bottom': `1px solid ${
			isDark ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`,
		padding: '0 20px',
		background: isDark ? 'hsla(240, 5.9%, 10%, 0.95)' : 'hsla(0, 0%, 98%, 0.95)'
	}),

	tabButton: (isDark: boolean, isActive: boolean) => ({
		padding: '12px 20px',
		'font-size': 'var(--settings-label-font-size)',
		'font-weight': isActive ? '500' : '400',
		color: isActive
			? isDark
				? '#f6f6f6'
				: '#1a1a1a'
			: isDark
			? 'rgba(246, 246, 246, 0.7)'
			: 'rgba(26, 26, 26, 0.7)',
		background: 'transparent',
		border: 'none',
		cursor: 'pointer',
		'border-bottom': isActive
			? `2px solid hsl(var(--primary))`
			: '2px solid transparent',
		transition:
			'color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), text-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		'box-sizing': 'border-box' as const,
		'margin-bottom': '-1px'
	}),
	tabButtonHover: (isDark: boolean, isActive: boolean) => ({
		color: isActive
			? 'hsl(var(--hover-color))'
			: isDark
			? '#f6f6f6'
			: '#1a1a1a',
		'border-bottom': isActive
			? `2px solid color-mix(in hsl, hsl(var(--primary-hover)) var(--hover-color-mix-primary), white var(--hover-color-mix-white))`
			: '2px solid transparent',
		'text-shadow': isActive
			? `0 0 var(--hover-text-shadow-blur) hsla(var(--primary-hover) / var(--hover-text-shadow-opacity))`
			: 'none'
	}),

	contentArea: () => ({
		flex: '1',
		overflow: 'visible' as const,
		width: '100%'
	}),
	section: (isDark: boolean) => ({
		padding: '24px 20px',
		'border-bottom': `1px solid ${
			isDark ? 'hsla(240, 3.7%, 15.9%, 1)' : 'hsla(220, 13%, 91%, 1)'
		}`,
		'&:last-child': {
			'border-bottom': 'none'
		}
	}),

	sectionTitle: (isDark: boolean) => ({
		'font-size': '16px',
		'font-weight': '600',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		margin: '0 0 8px 0',
		'letter-spacing': '-0.01em'
	}),

	sectionDescription: (isDark: boolean) => ({
		'font-size': 'var(--settings-description-font-size)',
		color: isDark ? 'rgba(246, 246, 246, 0.7)' : 'rgba(26, 26, 26, 0.7)',
		'margin-bottom': '20px',
		'line-height': '1.5'
	}),

	controlContainer: (isDark: boolean, isLast: boolean = false) => ({
		padding: isLast ? '16px 0 0 0' : '16px 0',
		'border-bottom': isLast
			? 'none'
			: `1px solid ${
					isDark ? 'hsla(240, 3.7%, 15.9%, 0.5)' : 'hsla(220, 13%, 91%, 0.5)'
			  }`
	}),

	controlLabel: (isDark: boolean) => ({
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center',
		'margin-bottom': '8px',
		'font-size': 'var(--settings-label-font-size)',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		'font-weight': '500'
	}),

	controlValue: (isDark: boolean) => ({
		'font-size': '12px',
		color: isDark ? 'rgba(246, 246, 246, 0.6)' : 'rgba(26, 26, 26, 0.6)',
		'font-weight': '400',
		'min-width': '40px',
		'text-align': 'right' as const
	}),

	checkboxContainer: (isDark: boolean) => ({
		display: 'flex',
		'align-items': 'center',
		gap: '12px',
		padding: '16px 0',
		'margin-bottom': '8px',
		'border-bottom': `1px solid ${
			isDark ? 'hsla(240, 3.7%, 15.9%, 0.5)' : 'hsla(220, 13%, 91%, 0.5)'
		}`
	}),

	checkbox: (isDark: boolean) => ({
		width: '18px',
		height: '18px',
		cursor: 'pointer',
		accentColor: 'hsl(var(--primary))'
	}),

	checkboxLabel: (isDark: boolean) => ({
		'font-size': 'var(--settings-label-font-size)',
		color: isDark ? '#f6f6f6' : '#1a1a1a',
		cursor: 'pointer',
		'user-select': 'none' as const
	}),

	placeholder: (isDark: boolean) => ({
		padding: '20px',
		'text-align': 'center' as const,
		color: isDark ? 'rgba(246, 246, 246, 0.5)' : 'rgba(26, 26, 26, 0.5)',
		'font-size': 'var(--settings-label-font-size)',
		'font-style': 'italic'
	})
} as const
