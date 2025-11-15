/**
 * ProgressBar Component
 * Progress bar component with determinate and indeterminate variants
 */

import { Component, Show } from "solid-js";
import { progressBarStyles } from "../lib/progress-bar.styles";
import type { ProgressBarProps } from "../model/types";

export const ProgressBar: Component<ProgressBarProps> = (props) => {
  const variant = () => props.variant ?? "determinate";
  // Show label if showLabel is explicitly true, or if label prop is provided
  const showLabel = () => props.showLabel ?? props.label !== undefined;
  const height = () => props.height ?? "8px";
  const value = () => {
    if (variant() === "indeterminate") return 0;
    return Math.min(Math.max(props.value ?? 0, 0), 100);
  };

  const formatValue = (): string => {
    if (props.label) return props.label;
    return `${Math.round(value())}%`;
  };

  return (
    <div
      class={`progress-bar-container ${props.class || ""}`}
      style={{
        ...progressBarStyles.container(height()),
        ...props.style,
      }}
      role="progressbar"
      aria-valuenow={variant() === "determinate" ? value() : undefined}
      aria-valuemin={variant() === "determinate" ? 0 : undefined}
      aria-valuemax={variant() === "determinate" ? 100 : undefined}
      aria-label={props.label || "Progress"}
    >
      <div
        class="progress-bar-track"
        style={progressBarStyles.track(variant(), value())}
      />
      <Show when={showLabel()}>
        <div style={progressBarStyles.label()}>{formatValue()}</div>
      </Show>
    </div>
  );
};
