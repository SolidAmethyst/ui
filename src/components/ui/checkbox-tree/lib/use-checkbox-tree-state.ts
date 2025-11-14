/**
 * CheckboxTree State Hook
 * Manages checkbox tree state and indeterminate logic
 */

import { createSignal, createEffect } from 'solid-js'
import type { CheckboxTreeNode } from '../model/types'

export interface TreeNodeState {
	id: string
	checked: boolean
	indeterminate: boolean
	children?: TreeNodeState[]
}

export function useCheckboxTreeState(
	nodes: () => CheckboxTreeNode[],
	onChange?: (nodeId: string, checked: boolean) => void,
	onTreeChange?: (checkedNodes: string[]) => void
) {
	const [nodeStates, setNodeStates] = createSignal<Map<string, TreeNodeState>>(
		new Map()
	)

	// Initialize states from nodes
	const initializeStates = (treeNodes: CheckboxTreeNode[]): Map<string, TreeNodeState> => {
		const states = new Map<string, TreeNodeState>()

		const processNode = (node: CheckboxTreeNode): TreeNodeState => {
			const hasChildren = node.children && node.children.length > 0
			const childrenStates = hasChildren
				? node.children!.map(child => processNode(child))
				: undefined

			// Calculate checked state
			let checked = node.checked ?? false
			if (hasChildren && childrenStates) {
				const allChecked = childrenStates.every(child => child.checked)
				checked = allChecked
			}

			// Calculate indeterminate state
			let indeterminate = false
			if (hasChildren && childrenStates) {
				const allChecked = childrenStates.every(child => child.checked)
				const someChecked = childrenStates.some(
					child => child.checked || child.indeterminate
				)
				indeterminate = someChecked && !allChecked
				void someChecked // Used in calculation
			}

			const state: TreeNodeState = {
				id: node.id,
				checked,
				indeterminate,
				children: childrenStates
			}

			states.set(node.id, state)
			return state
		}

		treeNodes.forEach(node => processNode(node))
		return states
	}

	// Update states when nodes change
	createEffect(() => {
		const newStates = initializeStates(nodes())
		setNodeStates(newStates)
	})

	// Update node and propagate to children
	const updateNode = (nodeId: string, checked: boolean) => {
		setNodeStates(prev => {
			const newStates = new Map(prev)
			const state = newStates.get(nodeId)
			if (!state) return prev

			// Update this node
			const updatedState: TreeNodeState = {
				...state,
				checked,
				indeterminate: false
			}

			// Update all children
			if (state.children) {
				updatedState.children = state.children.map(child => ({
					...child,
					checked,
					indeterminate: false
				}))
				updatedState.children.forEach(child => {
					newStates.set(child.id, {
						...child,
						checked,
						indeterminate: false
					})
				})
			}

			newStates.set(nodeId, updatedState)

			// Update parent nodes
			const updateParents = (currentNodeId: string, states: Map<string, TreeNodeState>) => {
				// Find parent
				const parentId = findParentId(nodes(), currentNodeId)
				if (!parentId) return states

				const parentState = states.get(parentId)
				if (!parentState || !parentState.children) return states

				const allChecked = parentState.children.every(child => {
					const childState = states.get(child.id)
					return childState?.checked ?? false
				})
				const someChecked = parentState.children.some(child => {
					const childState = states.get(child.id)
					return childState?.checked || childState?.indeterminate
				})

				const updatedParent: TreeNodeState = {
					...parentState,
					checked: allChecked,
					indeterminate: someChecked && !allChecked
				}

				states.set(parentId, updatedParent)
				return updateParents(parentId, states)
			}

			const finalStates = updateParents(nodeId, newStates)

			return finalStates
		})

		onChange?.(nodeId, checked)

		// Get all checked nodes
		const currentStates = nodeStates()
		const checkedNodes = Array.from(currentStates.values())
			.filter((state: TreeNodeState) => state.checked)
			.map((state: TreeNodeState) => state.id)
		onTreeChange?.(checkedNodes)
	}

	// Find parent ID for a node
	const findParentId = (
		treeNodes: CheckboxTreeNode[],
		targetId: string,
		parentId?: string
	): string | undefined => {
		for (const node of treeNodes) {
			if (node.id === targetId) {
				return parentId
			}
			if (node.children) {
				const found = findParentId(node.children, targetId, node.id)
				if (found !== undefined) return found
			}
		}
		return undefined
	}

	return {
		nodeStates,
		updateNode
	}
}
