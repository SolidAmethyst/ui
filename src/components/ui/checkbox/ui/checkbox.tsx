/**
 * Checkbox Component
 * Styled checkbox component with label support and theme awareness
 */

import type { JSX } from "solid-js";
import { Component, Show, createEffect, splitProps } from "solid-js";
import { checkboxStyles } from "../lib/checkbox.styles";
import type { CheckboxProps } from "../model/types";

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, others] = splitProps(props, [
    "checked",
    "disabled",
    "indeterminate",
    "label",
    "labelPosition",
    "onChange",
    "class",
    "style",
    "name",
    "value",
    "id",
    "material3",
  ]);

  const checked = () => local.checked ?? false;
  const disabled = () => local.disabled ?? false;
  const indeterminate = () => local.indeterminate ?? false;
  const labelPosition = () => local.labelPosition ?? "right";

  let inputRef: HTMLInputElement | undefined;

  // Set indeterminate state on input element
  createEffect(() => {
    if (inputRef) {
      inputRef.indeterminate = indeterminate();
    }
  });

  const handleChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    if (!disabled()) {
      local.onChange?.(target.checked);
    }
  };

  const getBaseBorderColor = (): string => {
    return "hsl(var(--checkbox-border))";
  };

  const handleMouseEnter = () => {
    if (!disabled() && inputRef) {
      const hoverStyles = checkboxStyles.inputHover({
        disabled: disabled(),
        checked: checked(),
        indeterminate: indeterminate(),
      });
      if (hoverStyles["border-color"]) {
        inputRef.style.borderColor = hoverStyles["border-color"] as string;
      }
    }
  };

  const handleMouseLeave = () => {
    if (inputRef) {
      // Restore base border color
      inputRef.style.borderColor = getBaseBorderColor();
    }
  };

  const handleFocus = () => {
    if (!disabled() && inputRef) {
      const focusStyles = checkboxStyles.inputFocus({
        disabled: disabled(),
        checked: checked(),
        indeterminate: indeterminate(),
      });
      if (focusStyles["box-shadow"]) {
        inputRef.style.boxShadow = focusStyles["box-shadow"] as string;
      }
    }
  };

  const handleBlur = () => {
    if (inputRef) {
      inputRef.style.boxShadow = "none";
    }
  };

  const containerStyle = (): JSX.CSSProperties => ({
    ...checkboxStyles.container(),
    ...(disabled() ? checkboxStyles.containerDisabled() : {}),
    ...(local.style as JSX.CSSProperties),
  });

  const inputStyle = (): JSX.CSSProperties =>
    checkboxStyles.input({
      disabled: disabled(),
      checked: checked(),
      indeterminate: indeterminate(),
      material3: local.material3 ?? false,
    });

  const labelStyle = (): JSX.CSSProperties =>
    checkboxStyles.label({
      disabled: disabled(),
    });

  return (
    <label
      class={`checkbox-container ${local.class || ""}`}
      style={containerStyle()}
    >
      <Show when={labelPosition() === "left" && local.label}>
        <span style={labelStyle()}>{local.label}</span>
      </Show>
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          "align-items": "center",
          "justify-content": "center",
        }}
      >
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked()}
          disabled={disabled()}
          onChange={handleChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={local.name}
          value={local.value}
          id={local.id}
          class="checkbox-input"
          style={inputStyle()}
          {...others}
        />
        <Show when={!indeterminate() && (local.material3 || checked())}>
          <svg
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "12px",
              height: "12px",
              "pointer-events": "none",
              opacity: local.material3 && !checked() ? "0.5" : "1",
            }}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6L5 9L10 2"
              stroke={
                checked()
                  ? "hsl(var(--primary))"
                  : "hsl(var(--disabled))"
              }
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Show>
        <Show when={indeterminate()}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "8px",
              height: "2px",
              background: "hsl(var(--primary))",
              "border-radius": "1px",
              "pointer-events": "none",
            }}
          />
        </Show>
      </div>
      <Show when={labelPosition() === "right" && local.label}>
        <span style={labelStyle()}>{local.label}</span>
      </Show>
    </label>
  );
};
