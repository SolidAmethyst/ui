/**
 * ESLint Rule: no-hardcoded-theme-colors
 * Prevents hardcoded rgba/rgb/hex colors in theme-sensitive inline styles
 * and enforces use of getThemeFromCSS() or CSS variables
 */

export default {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow hardcoded colors in theme-sensitive properties; use CSS variables or getThemeFromCSS() instead',
			category: 'Best Practices',
			recommended: true
		},
		fixable: null,
		schema: [],
		messages: {
			hardcodedColor:
				'Avoid hardcoded color "{{color}}" in {{property}}. Use CSS variables like "hsl(var(--foreground))" or getThemeFromCSS() instead.',
			hardcodedBoolean:
				'Avoid hardcoded boolean "{{value}}" in theme ternary. Use getThemeFromCSS() instead.',
			hardcodedThemeObject:
				'Avoid hardcoded theme object with isDark: {{value}}. Use getThemeFromCSS() or CSS variables instead.'
		}
	},

	create(context) {
		// Theme-sensitive CSS properties that should use CSS variables
		const themeSensitiveProps = [
			'background',
			'backgroundColor',
			'background-color',
			'color',
			'borderColor',
			'border-color',
			'boxShadow',
			'box-shadow',
			'textShadow',
			'text-shadow'
		]

		// Regex patterns for detecting hardcoded colors
		const colorPatterns = {
			rgba: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/i,
			hex: /#[0-9a-fA-F]{3,6}/
		}

		/**
		 * Check if a string contains hardcoded color values
		 */
		function hasHardcodedColor(value) {
			if (typeof value !== 'string') return false
			return colorPatterns.rgba.test(value) || colorPatterns.hex.test(value)
		}

		/**
		 * Check if a string uses CSS variables
		 */
		function usesCSSVariables(value) {
			if (typeof value !== 'string') return false
			return value.includes('var(--') || value.includes('hsl(var(--')
		}

		/**
		 * Extract color value from string
		 */
		function extractColor(value) {
			const rgbaMatch = value.match(colorPatterns.rgba)
			if (rgbaMatch) return rgbaMatch[0]
			const hexMatch = value.match(colorPatterns.hex)
			if (hexMatch) return hexMatch[0]
			return value
		}

		/**
		 * Check if property name is theme-sensitive
		 */
		function isThemeSensitiveProperty(propName) {
			return themeSensitiveProps.some((prop) => {
				// Handle both camelCase and kebab-case
				return (
					propName === prop ||
					propName.toLowerCase() === prop.toLowerCase() ||
					propName.replace(/-/g, '') === prop.replace(/-/g, '')
				)
			})
		}

		/**
		 * Report hardcoded color in JSX style attribute
		 */
		function checkJSXStyleAttribute(node) {
			// Check JSXAttribute with name "style"
			if (
				node.type === 'JSXAttribute' &&
				node.name.name === 'style' &&
				node.value &&
				node.value.type === 'JSXExpressionContainer'
			) {
				const expression = node.value.expression

				// Check ObjectExpression (style={{ color: 'red' }})
				if (expression.type === 'ObjectExpression') {
					expression.properties.forEach((prop) => {
						if (prop.type === 'Property' && prop.key && prop.value) {
							const propName =
								prop.key.type === 'Identifier' ? prop.key.name : prop.key.value

							// Only check theme-sensitive properties
							if (isThemeSensitiveProperty(propName)) {
								// Check string literals
								if (prop.value.type === 'Literal' && typeof prop.value.value === 'string') {
									const value = prop.value.value
									if (hasHardcodedColor(value) && !usesCSSVariables(value)) {
										context.report({
											node: prop.value,
											messageId: 'hardcodedColor',
											data: {
												color: extractColor(value),
												property: propName
											}
										})
									}
								}

								// Check template literals
								if (prop.value.type === 'TemplateLiteral') {
									prop.value.quasis.forEach((quasi) => {
										const value = quasi.value.cooked
										if (value && hasHardcodedColor(value) && !usesCSSVariables(value)) {
											context.report({
												node: quasi,
												messageId: 'hardcodedColor',
												data: {
													color: extractColor(value),
													property: propName
												}
											})
										}
									})
								}

								// Check ternary with hardcoded booleans (false ? 'rgba(...)' : 'rgba(...)')
								if (prop.value.type === 'ConditionalExpression') {
									const test = prop.value.test
									if (
										test.type === 'Literal' &&
										(test.value === true || test.value === false)
									) {
										context.report({
											node: test,
											messageId: 'hardcodedBoolean',
											data: {
												value: String(test.value)
											}
										})
									}

									// Check if ternary branches have hardcoded colors
									;[prop.value.consequent, prop.value.alternate].forEach((branch) => {
										if (branch.type === 'Literal' && typeof branch.value === 'string') {
											const value = branch.value
											if (hasHardcodedColor(value) && !usesCSSVariables(value)) {
												context.report({
													node: branch,
													messageId: 'hardcodedColor',
													data: {
														color: extractColor(value),
														property: propName
													}
												})
											}
										}
									})
								}
							}
						}
					})
				}
			}
		}

		/**
		 * Check for hardcoded theme objects like: const theme = () => ({ isDark: false })
		 */
		function checkThemeObject(node) {
			// Check variable declarations
			if (
				node.type === 'VariableDeclarator' &&
				node.id.name === 'theme' &&
				node.init
			) {
				// Arrow function returning object
				if (
					node.init.type === 'ArrowFunctionExpression' &&
					node.init.body.type === 'ObjectExpression'
				) {
					node.init.body.properties.forEach((prop) => {
						if (
							prop.type === 'Property' &&
							prop.key.name === 'isDark' &&
							prop.value.type === 'Literal'
						) {
							context.report({
								node: prop.value,
								messageId: 'hardcodedThemeObject',
								data: {
									value: String(prop.value.value)
								}
							})
						}
					})
				}

				// Function expression returning object
				if (
					node.init.type === 'FunctionExpression' &&
					node.init.body.type === 'BlockStatement'
				) {
					node.init.body.body.forEach((statement) => {
						if (
							statement.type === 'ReturnStatement' &&
							statement.argument &&
							statement.argument.type === 'ObjectExpression'
						) {
							statement.argument.properties.forEach((prop) => {
								if (
									prop.type === 'Property' &&
									prop.key.name === 'isDark' &&
									prop.value.type === 'Literal'
								) {
									context.report({
										node: prop.value,
										messageId: 'hardcodedThemeObject',
										data: {
											value: String(prop.value.value)
										}
									})
								}
							})
						}
					})
				}

				// Call expression that returns createSignal with hardcoded value
				if (node.init.type === 'CallExpression') {
					const callee = node.init.callee
					if (
						callee.type === 'Identifier' &&
						callee.name === 'createSignal' &&
						node.init.arguments.length > 0
					) {
						const arg = node.init.arguments[0]
						if (arg.type === 'ObjectExpression') {
							arg.properties.forEach((prop) => {
								if (
									prop.type === 'Property' &&
									prop.key.name === 'isDark' &&
									prop.value.type === 'Literal'
								) {
									context.report({
										node: prop.value,
										messageId: 'hardcodedThemeObject',
										data: {
											value: String(prop.value.value)
										}
									})
								}
							})
						}
					}
				}
			}
		}

		return {
			JSXAttribute: checkJSXStyleAttribute,
			VariableDeclarator: checkThemeObject
		}
	}
}
