/**
 * NumberInput Component
 * Input with spinner arrows and mouse wheel support
 */

import type { JSX } from "solid-js";
import { Component, Show } from "solid-js";
import { Button } from "../../button";
import { numberInputStyles } from "../lib/number-input.styles";
import type { NumberInputProps } from "../model/types";

export const NumberInput: Component<NumberInputProps> = (props) => {
  // Parse value to number (handles both number and string like "12px")
  const parseValue = (value: number | string): number => {
    if (typeof value === "number") return value;
    const match = String(value).match(/^-?(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Format number back to original format (preserves units if string was provided)
  const formatValue = (num: number): number | string => {
    if (props.type === "text" && typeof props.value === "string") {
      const unit = props.value.replace(/^-?\d+/, "") || props.defaultUnit || "";
      return `${num}${unit}`;
    }
    return num;
  };

  // Validate and format string value with units (for onBlur)
  const validateAndFormat = (value: string): string | null => {
    if (!value.trim()) return null;

    const trimmed = value.trim();
    const unitPattern = props.unitPattern ?? /^-?\d+px$/;

    // Check if it matches the unit pattern (e.g., "12px", "-5px")
    if (unitPattern.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      const minValue = props.min !== undefined ? props.min : 0;
      // Extract unit from pattern or use defaultUnit
      const unit = props.defaultUnit || trimmed.replace(/^-?\d+/, "") || "";
      return `${Math.max(minValue, num)}${unit}`;
    }
    // Check if it's just a number
    if (/^-?\d+$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      const minValue = props.min !== undefined ? props.min : 0;
      const unit = props.defaultUnit || "";
      return `${Math.max(minValue, num)}${unit}`;
    }

    return null;
  };

  // Modify value by delta
  const modifyValue = (delta: number) => {
    const current = parseValue(props.value);
    const step = props.step || 1;
    const newValue = current + delta * step;

    // Apply min/max constraints
    // Default min is 0 if not specified (prevent negative values)
    const minValue = props.min !== undefined ? props.min : 0;
    let constrainedValue = Math.max(newValue, minValue);

    if (props.max !== undefined) {
      constrainedValue = Math.min(constrainedValue, props.max);
    }

    props.onChange(formatValue(constrainedValue));
  };

  // Handle wheel event
  const handleWheel = (e: WheelEvent) => {
    if (!props.enableWheel || props.disabled) return;

    e.preventDefault();
    // Normalize wheel delta to always change by 1 step
    // deltaY can be large (e.g., 100+), but we want to change by exactly 1 step per wheel event
    const delta = e.deltaY > 0 ? -1 : 1;
    modifyValue(delta);
  };

  // Check if value is at min/max
  const isAtMin = () => {
    const minValue = props.min !== undefined ? props.min : 0;
    return parseValue(props.value) <= minValue;
  };

  const isAtMax = () => {
    if (props.max === undefined) return false;
    return parseValue(props.value) >= props.max;
  };

  return (
    <div
      class={`number-input-wrapper ${props.class || ""}`}
      style={numberInputStyles.wrapper}
    >
      <input
        id={props.id}
        name={props.name}
        class="number-input"
        type={props.type || "number"}
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step || 1}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onInput={(e) => {
          if (props.onInput) props.onInput(e);
        }}
        onWheel={handleWheel}
        onFocus={(e) => {
          const target = e.currentTarget;
          // Apply focus styles only if custom border is not provided
          const customBorder = (props.style as JSX.CSSProperties)?.border;
          if (!customBorder) {
            if (props.themeAware) {
              target.style.borderColor =
                "var(--number-input-border-focus, hsla(var(--primary) / 0.5))";
            } else {
              target.style.borderColor = "hsla(var(--primary) / 0.5)";
            }
          }
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          const target = e.currentTarget;
          // Reset border color only if custom border is not provided
          const customBorder = (props.style as JSX.CSSProperties)?.border;
          if (!customBorder) {
            if (props.themeAware) {
              target.style.borderColor =
                "var(--number-input-border, hsl(var(--border)))";
            } else {
              target.style.borderColor = "hsl(var(--border))";
            }
          }

          // Auto-validate if enabled (for string values with units)
          if (
            props.autoValidate !== false &&
            props.type === "text" &&
            typeof props.value === "string"
          ) {
            const validated = validateAndFormat(target.value);
            if (validated !== null) {
              props.onChange(validated);
            }
          }

          if (props.onBlur) props.onBlur(e);
        }}
        style={{
          ...numberInputStyles.input(props.themeAware),
          ...(props.style as JSX.CSSProperties),
        }}
      />
      <Show when={props.showArrows !== false}>
        <div
          class="number-input-arrows"
          style={numberInputStyles.arrowsContainer}
        >
          <Button
            variant="ghost"
            icon="arrow_drop_up"
            iconPosition="only"
            disabled={props.disabled || isAtMax()}
            onClick={() => modifyValue(1)}
            title={props.increaseButtonTitle ?? "Increase"}
            class="number-input-arrow"
            style={numberInputStyles.arrowButton}
          />
          <Button
            variant="ghost"
            icon="arrow_drop_down"
            iconPosition="only"
            disabled={props.disabled || isAtMin()}
            onClick={() => modifyValue(-1)}
            title={props.decreaseButtonTitle ?? "Decrease"}
            class="number-input-arrow"
            style={numberInputStyles.arrowButton}
          />
        </div>
      </Show>
    </div>
  );
};
