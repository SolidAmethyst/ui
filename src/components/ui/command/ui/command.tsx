/**
 * Command Component
 * Command palette component based on cmdk-solid
 */

import { Command as CmdkCommand } from 'cmdk-solid'
import type { Component } from 'solid-js'
import { splitProps } from 'solid-js'
import type {
	CommandDialogProps,
	CommandEmptyProps,
	CommandGroupProps,
	CommandInputProps,
	CommandItemProps,
	CommandListProps,
	CommandLoadingProps,
	CommandProps,
	CommandSeparatorProps,
	CommandShortcutProps
} from '../model/types'

// Type for Command with sub-components
type CommandComponent = Component<CommandProps> & {
	Dialog: Component<CommandDialogProps>
	Input: Component<CommandInputProps>
	List: Component<CommandListProps>
	Item: Component<CommandItemProps>
	Group: Component<CommandGroupProps>
	Separator: Component<CommandSeparatorProps>
	Empty: Component<CommandEmptyProps>
	Loading: Component<CommandLoadingProps>
	Shortcut: Component<CommandShortcutProps>
}

// Main Command component
export const Command: CommandComponent = (props => {
	const [local] = splitProps(props, [
		'loop',
		'shouldFilter',
		'filter',
		'label',
		'class',
		'style',
		'children',
		'onKeyDown'
	])

	return (
		<CmdkCommand
			loop={local.loop}
			shouldFilter={local.shouldFilter}
			filter={local.filter}
			label={local.label}
			class={local.class}
			style={local.style}
			onKeyDown={local.onKeyDown}
		>
			{local.children}
		</CmdkCommand>
	)
}) as CommandComponent

// Command Dialog
export const CommandDialog: Component<CommandDialogProps> = props => {
	const [local, others] = splitProps(props, [
		'open',
		'onOpenChange',
		'container',
		'class',
		'style',
		'children'
	])

	const handleOpenChange = (open: boolean) => {
		if (local.onOpenChange) {
			local.onOpenChange(open)
		}
	}

	return (
		<CmdkCommand.Dialog
			open={local.open}
			onOpenChange={handleOpenChange}
			container={local.container}
			class={local.class}
			style={local.style}
			{...others}
		>
			{local.children}
		</CmdkCommand.Dialog>
	)
}

// Command Input
export const CommandInput: Component<CommandInputProps> = props => {
	const [local, others] = splitProps(props, [
		'value',
		'onValueChange',
		'placeholder',
		'class',
		'style'
	])

	return (
		<CmdkCommand.Input
			value={local.value}
			onValueChange={local.onValueChange}
			placeholder={local.placeholder}
			class={local.class}
			style={local.style}
			{...others}
		/>
	)
}

// Command List
export const CommandList: Component<CommandListProps> = props => {
	const [local, others] = splitProps(props, ['class', 'style', 'children'])

	return (
		<CmdkCommand.List class={local.class} style={local.style} {...others}>
			{local.children}
		</CmdkCommand.List>
	)
}

// Command Item
export const CommandItem: Component<CommandItemProps> = props => {
	const [local, others] = splitProps(props, [
		'value',
		'keywords',
		'disabled',
		'forceMount',
		'onSelect',
		'class',
		'style',
		'children'
	])

	return (
		<CmdkCommand.Item
			value={local.value}
			keywords={local.keywords}
			disabled={local.disabled}
			forceMount={local.forceMount}
			onSelect={local.onSelect}
			class={local.class}
			style={local.style}
			{...others}
		>
			{local.children}
		</CmdkCommand.Item>
	)
}

// Command Group
export const CommandGroup: Component<CommandGroupProps> = props => {
	const [local, others] = splitProps(props, [
		'heading',
		'forceMount',
		'class',
		'style',
		'children'
	])

	return (
		<CmdkCommand.Group
			heading={local.heading}
			forceMount={local.forceMount}
			class={local.class}
			style={local.style}
			{...others}
		>
			{local.children}
		</CmdkCommand.Group>
	)
}

// Command Separator
export const CommandSeparator: Component<CommandSeparatorProps> = props => {
	const [local, others] = splitProps(props, ['alwaysRender', 'class', 'style'])

	return (
		<CmdkCommand.Separator
			alwaysRender={local.alwaysRender}
			class={local.class}
			style={local.style}
			{...others}
		/>
	)
}

// Command Empty
export const CommandEmpty: Component<CommandEmptyProps> = props => {
	const [local, others] = splitProps(props, ['class', 'style', 'children'])

	return (
		<CmdkCommand.Empty class={local.class} style={local.style} {...others}>
			{local.children}
		</CmdkCommand.Empty>
	)
}

// Command Loading
export const CommandLoading: Component<CommandLoadingProps> = props => {
	const [local, others] = splitProps(props, [
		'progress',
		'class',
		'style',
		'children'
	])

	return (
		<CmdkCommand.Loading
			progress={local.progress}
			class={local.class}
			style={local.style}
			{...others}
		>
			{local.children}
		</CmdkCommand.Loading>
	)
}

// Command Shortcut
export const CommandShortcut: Component<CommandShortcutProps> = props => {
	const [local, others] = splitProps(props, ['class', 'style', 'children'])

	return (
		<span
			class={local.class}
			style={{
				'font-size': '12px',
				'letter-spacing': '0.05em',
				'margin-left': '48px',
				opacity: 0.5,
				...(local.style as JSX.CSSProperties)
			}}
			{...others}
		>
			{local.children}
		</span>
	)
}

// Attach sub-components to main Command
Command.Dialog = CommandDialog
Command.Input = CommandInput
Command.List = CommandList
Command.Item = CommandItem
Command.Group = CommandGroup
Command.Separator = CommandSeparator
Command.Empty = CommandEmpty
Command.Loading = CommandLoading
Command.Shortcut = CommandShortcut
