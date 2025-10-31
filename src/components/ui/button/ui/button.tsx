/**
 * Button Component
 * Based on Tauri project button implementation
 */

import { Component, Show } from "solid-js";
import type { ButtonProps } from "../model/types";

export const Button: Component<ButtonProps> = (props) => {
  const getButtonClass = () => {
    let baseClass = "control-btn";

    if (props.variant === "play-pause") {
      baseClass = "play-pause-btn";
    } else if (props.variant === "small") {
      baseClass = "control-btn small-btn";
    } else if (props.variant === "close") {
      baseClass = "control-btn close-btn";
    } else if (props.variant === "minimize") {
      baseClass = "control-btn minimize-btn";
    } else if (props.variant === "maximize") {
      baseClass = "control-btn maximize-btn";
    }

    if (props.active) {
      baseClass += " active";
    }

    if (props.pinned) {
      baseClass += " pinned";
    }

    if (props.maximized) {
      baseClass += " maximized";
    }

    return `${baseClass} ${props.class || ""}`;
  };

  const getIconSize = () => {
    if (props.variant === "small") return "12px";
    if (props.variant === "play-pause") return "20px";
    return "14px";
  };

  const isIconOnly = () =>
    props.iconPosition === "only" || (props.icon && !props.children);
  const hasIcon = () => props.icon && props.iconPosition !== "only";
  const showLeftIcon = () =>
    hasIcon() && (props.iconPosition === "left" || !props.iconPosition);
  const showRightIcon = () => hasIcon() && props.iconPosition === "right";

  return (
    <button
      type={props.type || "button"}
      class={getButtonClass()}
      disabled={props.disabled || props.loading}
      onClick={() => props.onClick?.()}
      title={props.title}
    >
      <Show when={props.loading}>
        <span
          class="material-symbols-rounded"
          style={{
            animation: "spin 1s linear infinite",
            "font-size": getIconSize(),
          }}
        >
          refresh
        </span>
      </Show>

      <Show when={!props.loading && (showLeftIcon() || isIconOnly())}>
        <span
          class={`material-symbols-rounded ${props.iconFilled ? "filled" : ""}`}
          aria-hidden="true"
          style={{ "font-size": getIconSize() }}
        >
          {props.icon}
        </span>
      </Show>

      <Show when={!isIconOnly()}>{props.children}</Show>

      <Show when={!props.loading && showRightIcon()}>
        <span
          class={`material-symbols-rounded ${props.iconFilled ? "filled" : ""}`}
          aria-hidden="true"
          style={{ "font-size": getIconSize() }}
        >
          {props.icon}
        </span>
      </Show>
    </button>
  );
};
