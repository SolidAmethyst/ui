/**
 * FilterPanel Component Types
 * Filter panel component for advanced filtering in modal format
 */

import type { JSX } from 'solid-js'

export interface FilterPanelSection {
	id: string
	title: string
	type: 'file-types' | 'visibility' | 'size' | 'custom'
}

export interface FileTypeFilter {
	id: string
	label: string
	extension: string
	checked: boolean
}

export interface FilterPanelProps {
	/**
	 * Whether the panel is open
	 */
	isOpen: boolean

	/**
	 * Callback when panel should be closed
	 */
	onClose: () => void

	/**
	 * File type filters
	 */
	fileTypes?: FileTypeFilter[]

	/**
	 * Callback when file types change
	 */
	onFileTypesChange?: (fileTypes: FileTypeFilter[]) => void

	/**
	 * Show hidden files
	 */
	showHiddenFiles?: boolean

	/**
	 * Callback when show hidden files changes
	 */
	onShowHiddenFilesChange?: (show: boolean) => void

	/**
	 * Minimum file size (KB)
	 */
	minFileSize?: number

	/**
	 * Maximum file size (KB)
	 */
	maxFileSize?: number

	/**
	 * Callback when file size range changes
	 */
	onFileSizeChange?: (min: number, max: number) => void

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Modal size ('sm' | 'md' | 'lg' | 'xl' | 'full' | string)
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string

	/**
	 * Panel title
	 */
	title?: string

	/**
	 * Reset button label
	 */
	resetLabel?: string

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}
