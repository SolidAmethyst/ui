/**
 * Custom ESLint Rules
 * Collection of custom ESLint rules for code quality and consistency
 */

import noHardcodedThemeColors from './rules/no-hardcoded-theme-colors.js'

export default {
	rules: {
		'no-hardcoded-theme-colors': noHardcodedThemeColors
	}
}
