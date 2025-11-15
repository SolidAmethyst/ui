/**
 * Accordion Component
 * Accordion component with collapsible sections
 */

import { Component, For, createSignal, createEffect } from 'solid-js'
import { accordionStyles } from '../lib/accordion.styles'
import type { AccordionProps } from '../model/types'

export const Accordion: Component<AccordionProps> = props => {
	const isDark = () => props.isDark ?? true
	const allowMultiple = () => props.allowMultiple ?? false

	// Track expanded items
	const [expandedItems, setExpandedItems] = createSignal<Set<string>>(new Set())

	// Initialize with defaultExpanded items
	createEffect(() => {
		const initialExpanded = new Set<string>()
		props.items.forEach(item => {
			if (item.defaultExpanded) {
				initialExpanded.add(item.id)
			}
		})
		setExpandedItems(initialExpanded)
	})

	const isExpanded = (itemId: string) => expandedItems().has(itemId)

	const toggleItem = (itemId: string) => {
		const item = props.items.find(i => i.id === itemId)
		if (item?.disabled) return

		setExpandedItems(prev => {
			const newSet = new Set(prev)
			const isCurrentlyExpanded = newSet.has(itemId)

			if (isCurrentlyExpanded) {
				newSet.delete(itemId)
			} else {
				if (!allowMultiple()) {
					// Close all other items if only one can be open
					newSet.clear()
				}
				newSet.add(itemId)
			}

			props.onChange?.(itemId, !isCurrentlyExpanded)
			return newSet
		})
	}

	return (
		<div
			class={`accordion ${props.class || ''}`}
			style={{
				...accordionStyles.container(),
				...props.style
			}}
		>
			<For each={props.items}>
				{item => {
					const expanded = () => isExpanded(item.id)

					return (
						<div style={accordionStyles.item(isDark())}>
							<div
								style={accordionStyles.header(
									isDark(),
									item.disabled ?? false,
									expanded()
								)}
								onClick={() => toggleItem(item.id)}
								onMouseEnter={e => {
									if (!(item.disabled ?? false)) {
										const hoverStyles = accordionStyles.headerHover(isDark(), item.disabled ?? false)
										e.currentTarget.style.background = hoverStyles.background as string
									}
								}}
								onMouseLeave={e => {
									e.currentTarget.style.background = expanded()
										? isDark()
											? 'rgba(255, 255, 255, 0.05)'
											: 'rgba(0, 0, 0, 0.05)'
										: 'transparent'
								}}
								role='button'
								tabindex={item.disabled ? undefined : 0}
								aria-expanded={expanded()}
								aria-disabled={item.disabled ?? false}
							>
								<div style={accordionStyles.headerContent()}>
									{item.header}
								</div>
								<span
									class='material-symbols-rounded'
									style={accordionStyles.icon(isDark(), expanded())}
								>
									expand_more
								</span>
							</div>
							<div
								style={accordionStyles.content(isDark(), expanded())}
								role='region'
								aria-labelledby={`accordion-header-${item.id}`}
							>
								{item.content}
							</div>
						</div>
					)
				}}
			</For>
		</div>
	)
}
