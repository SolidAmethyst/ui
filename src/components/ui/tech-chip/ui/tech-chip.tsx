/**
 * TechChip Component
 * Status indicator chip for technology stack display
 */

import { Component } from 'solid-js'
import { techChipStyles } from '../lib/tech-chip.styles'
import type { TechChipProps } from '../model/types'

export const TechChip: Component<TechChipProps> = props => (
	<span
		class={
			props.class
				? `${techChipStyles.base} ${techChipStyles.variants[props.variant]} ${
						techChipStyles.hover
				  } ${props.class}`
				: `${techChipStyles.base} ${techChipStyles.variants[props.variant]} ${
						techChipStyles.hover
				  }`
		}
		onClick={() => (props.onClick ? props.onClick() : undefined)}
		data-status={props.status}
		data-variant={props.variant}
		role='status'
		aria-label={`${props.label} status: ${props.status}`}
	>
		{/* Status Indicator */}
		<span
			class={`${techChipStyles.indicator} ${
				techChipStyles.status[props.status]
			}`.trim()}
			aria-hidden='true'
		/>

		{/* Icon */}
		<span
			class={`material-symbols-rounded ${techChipStyles.icon}`}
			aria-hidden='true'
		>
			{props.icon}
		</span>

		{/* Label */}
		<span>{props.label}</span>
	</span>
)
