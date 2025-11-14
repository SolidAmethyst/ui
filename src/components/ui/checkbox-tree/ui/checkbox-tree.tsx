/**
 * CheckboxTree Component
 * Hierarchical checkbox tree component
 */

import { Component, For, Show, createMemo } from 'solid-js'
import { Checkbox } from '../../checkbox'
import { checkboxTreeStyles } from '../lib/checkbox-tree.styles'
import { useCheckboxTreeState } from '../lib/use-checkbox-tree-state'
import type { CheckboxTreeProps, CheckboxTreeNode } from '../model/types'

interface TreeNodeProps {
	node: CheckboxTreeNode
	level: number
	isDark: boolean
	checked: boolean
	indeterminate: boolean
	disabled: boolean
	onChange: (nodeId: string, checked: boolean) => void
}

const TreeNode: Component<TreeNodeProps> = props => {
	const hasChildren = () => props.node.children && props.node.children.length > 0

	return (
		<div style={checkboxTreeStyles.node(props.isDark, props.level)}>
			<div
				style={checkboxTreeStyles.nodeContent(props.isDark)}
				onMouseEnter={e => {
					if (!props.disabled) {
						Object.assign(
							e.currentTarget.style,
							checkboxTreeStyles.nodeContentHover(props.isDark)
						)
					}
				}}
				onMouseLeave={e => {
					e.currentTarget.style.background = ''
				}}
			>
				<Checkbox
					checked={props.checked}
					indeterminate={props.indeterminate}
					disabled={props.disabled}
					isDark={props.isDark}
					onChange={checked => props.onChange(props.node.id, checked)}
				/>
				<span style={checkboxTreeStyles.label(props.isDark, props.disabled)}>
					{props.node.label}
				</span>
			</div>
			<Show when={hasChildren()}>
				<For each={props.node.children}>
					{child => {
						const childState = createMemo(() => {
							// This will be provided by parent component
							return { checked: false, indeterminate: false }
						})
						return (
							<TreeNode
								node={child}
								level={props.level + 1}
								isDark={props.isDark}
								checked={childState().checked}
								indeterminate={childState().indeterminate}
								disabled={child.disabled ?? false}
								onChange={props.onChange}
							/>
						)
					}}
				</For>
			</Show>
		</div>
	)
}

export const CheckboxTree: Component<CheckboxTreeProps> = props => {
	const isDark = () => props.isDark ?? true

	const { nodeStates, updateNode } = useCheckboxTreeState(
		() => props.nodes,
		props.onChange,
		props.onTreeChange
	)

	const getNodeState = (nodeId: string) => {
		return nodeStates().get(nodeId) ?? { checked: false, indeterminate: false }
	}

	// Recursive render function
	const renderNode = (node: CheckboxTreeNode, level: number) => {
		const state = getNodeState(node.id)
		const hasChildren = node.children && node.children.length > 0

		return (
			<div style={checkboxTreeStyles.node(isDark(), level)}>
				<div
					style={checkboxTreeStyles.nodeContent(isDark())}
					onMouseEnter={e => {
						if (!(node.disabled ?? false)) {
							Object.assign(
								e.currentTarget.style,
								checkboxTreeStyles.nodeContentHover(isDark())
							)
						}
					}}
					onMouseLeave={e => {
						e.currentTarget.style.background = ''
					}}
				>
					<Checkbox
						checked={state.checked}
						indeterminate={state.indeterminate}
						disabled={node.disabled ?? false}
						isDark={isDark()}
						onChange={checked => updateNode(node.id, checked)}
					/>
					<span
						style={checkboxTreeStyles.label(
							isDark(),
							node.disabled ?? false
						)}
					>
						{node.label}
					</span>
				</div>
				<Show when={hasChildren}>
					<For each={node.children}>
						{child => renderNode(child, level + 1)}
					</For>
				</Show>
			</div>
		)
	}

	return (
		<div
			class={`checkbox-tree ${props.class || ''}`}
			style={{
				...checkboxTreeStyles.container(),
				...props.style
			}}
		>
			<For each={props.nodes}>{node => renderNode(node, 0)}</For>
		</div>
	)
}
