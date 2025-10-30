/**
 * Button Component
 * Reusable button with multiple variants, sizes, and states
 */

import { Component, Show } from 'solid-js'
import { buttonStyles } from '../lib/button.styles'
import type { ButtonProps } from '../model/types'

export const Button: Component<ButtonProps> = props => {
	const isIconOnly = () =>
		props.iconPosition === 'only' || (props.icon && !props.children)
	const hasIcon = () => props.icon && props.iconPosition !== 'only'
	const showLeftIcon = () =>
		hasIcon() && (props.iconPosition === 'left' || !props.iconPosition)
	const showRightIcon = () => hasIcon() && props.iconPosition === 'right'

	return (
		<button
			type={props.type || 'button'}
			class={`
        ${buttonStyles.base}
        ${buttonStyles.variants[props.variant || 'primary']}
        ${
					isIconOnly()
						? buttonStyles.iconOnly[props.size || 'md']
						: buttonStyles.sizes[props.size || 'md']
				}
        ${
					hasIcon() && !isIconOnly()
						? buttonStyles.iconGap[props.size || 'md']
						: ''
				}
        ${props.class || ''}
      `.trim()}
			disabled={props.disabled || props.loading}
			onClick={() => props.onClick?.()}
			title={props.title}
		>
			<Show when={props.loading}>
				<svg
					class={`${buttonStyles.iconSizes[props.size || 'md']} ${
						buttonStyles.loading
					}`}
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						class='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						stroke-width='4'
					/>
					<path
						class='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					/>
				</svg>
			</Show>

			<Show when={!props.loading && (showLeftIcon() || isIconOnly())}>
				<span
					class={`material-symbols-rounded ${
						buttonStyles.iconSizes[props.size || 'md']
					}`}
					aria-hidden='true'
				>
					{props.icon}
				</span>
			</Show>

			<Show when={!isIconOnly()}>{props.children}</Show>

			<Show when={!props.loading && showRightIcon()}>
				<span
					class={`material-symbols-rounded ${
						buttonStyles.iconSizes[props.size || 'md']
					}`}
					aria-hidden='true'
				>
					{props.icon}
				</span>
			</Show>
		</button>
	)
}
