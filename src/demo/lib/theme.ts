/**
 * Theme utilities for demo application
 * Centralized theme color management
 */

export interface ThemeColors {
	text: string
	textMuted: string
	background: string
	border: string
	borderFocus: string
	inputBackground: string
	cardBackground: string
	cardBorder: string
}

export const getThemeColors = (isDark: boolean): ThemeColors => ({
	text: 'hsl(var(--foreground))',
	textMuted: 'hsl(var(--muted-foreground))',
	background: 'hsl(var(--muted) / 0.5)',
	border: 'hsl(var(--border))',
	borderFocus: 'hsl(var(--accent) / 0.5)',
	inputBackground: 'hsl(var(--input))',
	cardBackground: 'hsl(var(--card))',
	cardBorder: 'hsl(var(--border))'
})
