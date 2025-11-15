import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import solid from 'eslint-plugin-solid'
import customRules from './tooling/eslint/index.js'

export default [
	js.configs.recommended,
	{
		ignores: ['**/__mocks__/**/*.js']
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				// Browser APIs
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				// DOM types
				HTMLElement: 'readonly',
				HTMLDivElement: 'readonly',
				MouseEvent: 'readonly',
				WheelEvent: 'readonly',
				Event: 'readonly',
				// Observers
				ResizeObserver: 'readonly',
				MutationObserver: 'readonly',
				// Other
				getComputedStyle: 'readonly',
				NodeJS: 'readonly',
				global: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': typescript,
			solid: solid,
			'custom': customRules
		},
		rules: {
			...typescript.configs.recommended.rules,
			...solid.configs.recommended.rules,
			// Override to ignore unused function parameters (needed for library API compatibility)
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'none', // Ignore all unused function parameters
					varsIgnorePattern: '^_', // Still warn about unused variables unless prefixed with _
					caughtErrors: 'none',
					ignoreRestSiblings: true
				}
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'solid/reactivity': 'warn',
			'solid/no-destructure': 'warn',
			'solid/no-innerhtml': 'warn',
			'solid/style-prop': 'warn',
			'no-undef': 'off', // TypeScript handles this
			'custom/no-hardcoded-theme-colors': 'error' // Custom rule for theme colors
		}
	},
	{
		files: ['**/*.{mjs,js}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				// Node.js globals
				URL: 'readonly',
				URLSearchParams: 'readonly',
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				global: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly'
			}
		},
		rules: {
			'no-undef': 'error'
		}
	},
	{
		files: ['**/demo/**/*.{ts,tsx}'],
		rules: {
			'custom/no-hardcoded-theme-colors': 'off' // Allow decorative colors in demo files
		}
	},
	{
		files: [
			'**/*.test.{ts,tsx}',
			'**/__tests__/**/*.{ts,tsx}',
			'**/test/**/*.{ts,tsx}'
		],
		languageOptions: {
			globals: {
				// Test globals
				expect: 'readonly',
				describe: 'readonly',
				it: 'readonly',
				test: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
				vi: 'readonly',
				// Browser APIs
				window: 'readonly',
				document: 'readonly',
				global: 'readonly'
			}
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'solid/reactivity': 'off',
			'solid/no-destructure': 'off',
			'solid/no-innerhtml': 'off',
			'solid/style-prop': 'off'
		}
	}
]
