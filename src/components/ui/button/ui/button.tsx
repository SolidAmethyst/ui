/**
 * Button Component
 * Based on Tauri project button implementation
 */

import type { JSX } from "solid-js";
import { Component, Show, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { buttonVariants } from "../lib/button-variants";
import { DrawerIcon } from "./drawer-icon";
import type { ButtonProps } from "../model/types";

export const Button: Component<ButtonProps> = (props) => {
  // Internal state for maximize button if not controlled
  const [internalMaximized, setInternalMaximized] = createSignal(false);

  // Use controlled maximized prop if provided, otherwise use internal state
  const isMaximized = () => props.maximized ?? internalMaximized();

  // Get CSS variable value as number for DrawerIcon
  const getIconSizeNumber = () => {
    if (
      typeof window !== "undefined" &&
      typeof getComputedStyle !== "undefined"
    ) {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--small-icon-size")
        .trim();
      if (value) {
        const num = parseFloat(value);
        if (!isNaN(num)) return num;
      }
    }
    return 16; // fallback
  };

  const getButtonClass = () => {
    return buttonVariants({
      variant: props.variant,
      size: props.size,
      disabled: props.disabled,
      loading: props.loading,
      active: props.active,
      pinned: props.pinned,
      maximized: isMaximized(),
      class: props.class,
    });
  };

  const getIconSize = () => {
    // Use CSS variable for all icon sizes to allow global customization
    return "var(--small-icon-size)";
  };

  const getDefaultIcon = () => {
    if (props.variant === "pin" && !props.icon) return "push_pin";
    if (props.variant === "expand" && !props.icon) return "open_in_full";
    if (props.variant === "copy" && !props.icon) return "content_copy";
    if (props.variant === "attach" && !props.icon) return "attach_file";
    if (props.variant === "trigger" && !props.icon) return "menu_open";
    if (props.variant === "maximize" && !props.icon) {
      return isMaximized() ? "fullscreen_exit" : "fullscreen";
    }
    return props.icon;
  };

  const isIconOnly = () => {
    if (props.iconPosition === "only") return true;
    const defaultIcon = getDefaultIcon();
    const hasIconContent = defaultIcon || props.icon;
    const isIconVariant =
      props.variant === "pin" ||
      props.variant === "expand" ||
      props.variant === "copy" ||
      props.variant === "attach" ||
      props.variant === "trigger" ||
      props.variant === "close" ||
      props.variant === "minimize" ||
      props.variant === "maximize" ||
      props.variant === "play-pause";
    return (
      (hasIconContent && !props.children) || (isIconVariant && !props.children)
    );
  };
  const hasIcon = () => {
    const defaultIcon = getDefaultIcon();
    return (defaultIcon || props.icon) && props.iconPosition !== "only";
  };
  const showLeftIcon = () =>
    hasIcon() && (props.iconPosition === "left" || !props.iconPosition);
  const showRightIcon = () => hasIcon() && props.iconPosition === "right";

  // Determine the element/component to render
  const getComponent = () => {
    if (props.as) {
      return props.as;
    }
    return "button";
  };

  // Handle click - auto-toggle maximize if not controlled
  const handleClick = () => {
    // If maximize button and not controlled, toggle internal state
    if (props.variant === "maximize" && props.maximized === undefined) {
      setInternalMaximized(!internalMaximized());
    }
    // Call user's onClick if provided
    props.onClick?.();
  };

  // Prepare common props
  const commonProps = (): JSX.ButtonHTMLAttributes<HTMLButtonElement> &
    JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
      class?: string;
      style?: JSX.CSSProperties;
      onClick?: () => void;
    } => ({
    class: getButtonClass(),
    style: props.style,
    onClick: handleClick,
    title: props.title,
  });

  // Button-specific props
  const buttonProps = () => ({
    ...commonProps(),
    type: (props.type || "button") as "button" | "submit" | "reset",
    disabled: props.disabled || props.loading,
  });

  // Anchor-specific props (when as="a")
  const anchorProps = (): JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
    class?: string;
    style?: JSX.CSSProperties;
    onClick?: () => void;
  } => ({
    ...commonProps(),
    href: (props as unknown as { href?: string }).href,
    target: (props as unknown as { target?: string }).target,
    rel: (props as unknown as { rel?: string }).rel,
  });

  // Get props based on component type
  const getProps = (): Record<string, unknown> => {
    const component = getComponent();
    if (
      component === "a" ||
      (typeof component === "string" && component === "a")
    ) {
      return anchorProps() as Record<string, unknown>;
    }
    if (typeof component === "string" && component === "button") {
      return buttonProps() as Record<string, unknown>;
    }
    // For custom components, pass all props
    return {
      ...commonProps(),
      ...props,
    } as Record<string, unknown>;
  };

  const buttonContent = () => (
    <>
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
        {props.variant === "trigger" && !props.icon ? (
          <DrawerIcon
            isOpen={props.active ?? false}
            size={getIconSizeNumber()}
            color={props.style?.color as string}
          />
        ) : (
          <span
            class={`material-symbols-rounded ${
              props.iconFilled ? "filled" : ""
            }`}
            aria-hidden="true"
            data-icon={getDefaultIcon()}
            style={{
              "font-size": getIconSize(),
              color: props.style?.color || "inherit",
            }}
          >
            {getDefaultIcon()}
          </span>
        )}
      </Show>

      <Show when={!isIconOnly()}>{props.children}</Show>

      <Show when={!props.loading && showRightIcon()}>
        <span
          class={`material-symbols-rounded ${props.iconFilled ? "filled" : ""}`}
          aria-hidden="true"
          data-icon={getDefaultIcon()}
          style={{
            "font-size": getIconSize(),
            color: props.style?.color || "inherit",
          }}
        >
          {getDefaultIcon()}
        </span>
      </Show>
    </>
  );

  return (
    <Dynamic component={getComponent()} {...getProps()}>
      {buttonContent()}
    </Dynamic>
  );
};
