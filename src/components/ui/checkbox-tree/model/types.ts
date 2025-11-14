/**
 * CheckboxTree Component Types
 * Hierarchical checkbox tree component
 */

import type { JSX } from 'solid-js'

export interface CheckboxTreeNode {
	/**
	 * Unique identifier for the node
	 */
	id: string

	/**
	 * Display label
	 */
	label: string

	/**
	 * Whether the node is checked
	 */
	checked?: boolean

	/**
	 * Whether the node is disabled
	 */
	disabled?: boolean

	/**
	 * Child nodes (nested checkboxes)
	 */
	children?: CheckboxTreeNode[]
}

export interface CheckboxTreeProps {
	/**
	 * Tree data
	 */
	nodes: CheckboxTreeNode[]

	/**
	 * Whether dark theme is active
	 */
	isDark?: boolean

	/**
	 * Callback when node state changes
	 */
	onChange?: (nodeId: string, checked: boolean) => void

	/**
	 * Callback when any node in the tree changes
	 */
	onTreeChange?: (checkedNodes: string[]) => void

	/**
	 * Additional CSS class names
	 */
	class?: string

	/**
	 * Inline CSS styles
	 */
	style?: JSX.CSSProperties
}

