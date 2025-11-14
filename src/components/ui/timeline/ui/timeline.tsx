/**
 * Timeline Component
 * Timeline component for displaying events in chronological order
 */

import { Component, For, Show } from 'solid-js'
import { timelineStyles } from '../lib/timeline.styles'
import type { TimelineEvent, TimelineProps } from '../model/types'

export const Timeline: Component<TimelineProps> = props => {
	const isDark = () => props.isDark ?? true
	const orientation = () => props.orientation ?? 'vertical'
	const showLine = () => props.showLine ?? true
	const showDate = () => props.showDate ?? true

	const getDefaultIcon = (variant?: TimelineEvent['variant']): string => {
		switch (variant) {
			case 'success':
				return 'check_circle'
			case 'error':
				return 'error'
			case 'warning':
				return 'warning'
			case 'info':
				return 'info'
			default:
				return 'circle'
		}
	}

	return (
		<div
			class={`timeline timeline-${orientation()} ${props.class || ''}`}
			style={{
				...timelineStyles.container(orientation(), isDark()),
				...props.style
			}}
		>
			<For each={props.events}>
				{(event, index) => {
					const isLast = () => index() === props.events.length - 1
					const icon = () => event.icon ?? getDefaultIcon(event.variant)

					return (
						<div
							style={timelineStyles.event(
								orientation(),
								isDark(),
								showLine()
							)}
						>
							<Show when={showLine()}>
								<div
									style={timelineStyles.line(
										orientation(),
										isDark(),
										isLast()
									)}
								/>
							</Show>
							<div
								style={timelineStyles.iconContainer(
									event.variant,
									isDark(),
									event.disabled ?? false
								)}
							>
								<span class='material-symbols-rounded' style={{ 'font-size': 'inherit' }}>
									{icon()}
								</span>
							</div>
							<div style={timelineStyles.content(orientation())}>
								<Show when={event.title}>
									<h3 style={timelineStyles.title(isDark(), event.disabled ?? false)}>
										{event.title}
									</h3>
								</Show>
								<Show when={event.description}>
									<div
										style={timelineStyles.description(
											isDark(),
											event.disabled ?? false
										)}
									>
										{event.description}
									</div>
								</Show>
								<Show when={showDate() && event.date}>
									<div
										style={timelineStyles.date(isDark(), event.disabled ?? false)}
									>
										{event.date}
									</div>
								</Show>
								<Show when={event.content}>{event.content}</Show>
							</div>
						</div>
					)
				}}
			</For>
		</div>
	)
}

