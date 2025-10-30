/**
 * Button Component Styles
 * Tailwind CSS classes for button variants and states
 */

export const buttonStyles = {
	base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

	variants: {
		primary:
			'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
		secondary:
			'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:active:bg-gray-500',
		ghost:
			'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700',
		danger:
			'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
		success:
			'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
		warning:
			'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800'
	},

	sizes: {
		sm: 'px-2 py-1 text-xs rounded-md',
		md: 'px-3 py-2 text-sm rounded-md',
		lg: 'px-4 py-3 text-base rounded-lg'
	},

	iconSizes: {
		sm: 'w-3 h-3',
		md: 'w-4 h-4',
		lg: 'w-5 h-5'
	},

	iconOnly: {
		sm: 'p-1',
		md: 'p-2',
		lg: 'p-3'
	},

	loading: 'animate-spin',

	iconGap: {
		sm: 'gap-1',
		md: 'gap-1.5',
		lg: 'gap-2'
	}
}
