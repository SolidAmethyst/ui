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
	text: isDark ? '#f6f6f6' : '#1a1a1a',
	textMuted: isDark ? 'rgba(246, 246, 246, 0.7)' : 'rgba(26, 26, 26, 0.7)',
	background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
	border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
	borderFocus: isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)',
	inputBackground: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
	cardBackground: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
	cardBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
})
