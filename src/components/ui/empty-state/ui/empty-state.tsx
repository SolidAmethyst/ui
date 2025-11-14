/**
 * EmptyState Component
 * Empty state component for displaying empty content states
 */

import { Component, Show } from 'solid-js'
import { emptyStateStyles } from '../lib/empty-state.styles'
import type { EmptyStateProps } from '../model/types'

export const EmptyState: Component<EmptyStateProps> = props => {
	const isDark = () => props.isDark ?? true

	return (
		<div
			class={`empty-state ${props.class || ''}`}
			style={{
				...emptyStateStyles.container(),
				...props.style
			}}
		>
			<Show when={props.children} fallback={
				<>
					<Show when={props.icon}>
						<span
							class='material-symbols-rounded'
							style={emptyStateStyles.icon(isDark())}
						>
							{props.icon}
						</span>
					</Show>
					<Show when={props.title}>
						<h3 style={emptyStateStyles.title(isDark())}>{props.title}</h3>
					</Show>
					<Show when={props.description}>
						<p style={emptyStateStyles.description(isDark())}>
							{props.description}
						</p>
					</Show>
					<Show when={props.action}>
						<div style={emptyStateStyles.action()}>{props.action}</div>
					</Show>
				</>
			}>
				{props.children}
			</Show>
		</div>
	)
}

