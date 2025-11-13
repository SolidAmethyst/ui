/**
 * TechChip Component
 * Status indicator chip for technology stack display
 */

import { Component } from "solid-js";
import { techChipVariants } from "../lib/tech-chip-variants";
import type { TechChipProps } from "../model/types";

export const TechChip: Component<TechChipProps> = (props) => {
	const getChipClass = () => {
		return techChipVariants({
			variant: props.variant,
			status: props.status,
			clickable: !!props.onClick,
			class: props.class
		})
	}

	return (
		<span
			class={getChipClass()}
			onClick={() => props.onClick?.()}
    style={{
      display: "inline-flex",
      "align-items": "center",
      gap: "4px",
      height: "40px",
      padding: "0 8px",
      background: "transparent",
      color: "white",
      "font-size": "14px",
      "line-height": "1",
      "vertical-align": "middle",
      cursor: props.onClick ? "pointer" : "default",
    }}
    data-status={props.status}
    data-variant={props.variant}
    role="status"
    aria-label={`${props.label} status: ${props.status}`}
  >
    {/* Icon */}
    <span
      class="material-symbols-rounded"
      style={{
        color: "white",
        "font-size": "16px",
        "line-height": "1",
        width: "16px",
        height: "16px",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
      aria-hidden="true"
    >
      {props.icon}
    </span>

    {/* Label */}
    <span
      style={{
        color: "white",
        "font-size": "14px",
        "line-height": "1",
      }}
    >
      {props.label}
    </span>
		</span>
	)
}
