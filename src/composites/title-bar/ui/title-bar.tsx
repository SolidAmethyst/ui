/**
 * TitleBar Component
 * Composite component for application title bar with controls
 */

import { Component, Show } from "solid-js";
import { Button } from "../../../components/ui/button";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";
import { titleBarStyles } from "../lib/title-bar.styles";
import type { TitleBarProps } from "../model/types";

export const TitleBar: Component<TitleBarProps> = (props) => {
  const isDark = () => getThemeFromCSS();

  return (
    <div
      class={`title-bar ${props.class || ""}`}
      style={{
        ...titleBarStyles.container(),
        "-webkit-app-region": props.draggable !== false ? "drag" : "no-drag",
      }}
    >
      {/* Left Section: Burger Menu */}
      <div style={titleBarStyles.leftSection}>
        <Show when={props.onBurgerClick}>
          <Button
            variant="trigger"
            iconPosition="only"
            title="Toggle Sidebar"
            active={props.burgerActive ?? false}
            onClick={() => {
              props.onBurgerClick?.();
            }}
            style={{
              width: "28px",
              height: "28px",
            }}
          />
        </Show>
      </div>

      {/* Center Section: Title (Draggable Area) */}
      <div
        style={{
          ...titleBarStyles.titleArea(),
          "-webkit-app-region": props.draggable !== false ? "drag" : "no-drag",
        }}
      >
        <Show when={props.children} fallback={props.title}>
          {props.children}
        </Show>
      </div>

      {/* Right Section: Controls */}
      <div style={titleBarStyles.rightSection}>
        {/* Functional Controls Group */}
        <div style={titleBarStyles.controlsGroup}>
          <Show when={props.onThemeToggle}>
            <Button
              variant="small"
              icon={isDark() ? "light_mode" : "dark_mode"}
              iconPosition="only"
              onClick={() => props.onThemeToggle?.()}
              title={isDark() ? "Light mode" : "Dark mode"}
              class="title-bar-control-btn"
            />
          </Show>

          <Show when={props.onDebugClick}>
            <Button
              variant="small"
              icon="bug_report"
              iconPosition="only"
              onClick={() => props.onDebugClick?.()}
              title="Debug"
              class="title-bar-control-btn"
            />
          </Show>

          <Show when={props.onPinClick}>
            <Button
              variant="small"
              icon="push_pin"
              iconPosition="only"
              onClick={() => props.onPinClick?.()}
              title="Pin"
              pinned={props.pinned}
              class="title-bar-control-btn"
            />
          </Show>

          <Show when={props.onSettingsClick}>
            <Button
              variant="small"
              icon="settings"
              iconPosition="only"
              onClick={() => props.onSettingsClick?.()}
              title="Settings"
              class="title-bar-control-btn"
            />
          </Show>
        </div>

        {/* Separator */}
        <Show
          when={
            (props.onThemeToggle ||
              props.onDebugClick ||
              props.onPinClick ||
              props.onSettingsClick) &&
            (props.onMinimizeClick ||
              props.onMaximizeClick ||
              props.onCloseClick)
          }
        >
          <div style={titleBarStyles.separator()} />
        </Show>

        {/* Window Controls Group */}
        <div style={titleBarStyles.controlsGroup}>
          <Show when={props.onMinimizeClick}>
            <Button
              variant="minimize"
              icon="remove"
              iconPosition="only"
              onClick={() => props.onMinimizeClick?.()}
              title="Minimize"
              class="title-bar-control-btn"
            />
          </Show>

          <Show when={props.onMaximizeClick}>
            <Button
              variant="maximize"
              icon={props.maximized ? "filter_none" : "crop_free"}
              maximized={props.maximized}
              iconPosition="only"
              onClick={() => props.onMaximizeClick?.()}
              title={props.maximized ? "Restore" : "Maximize"}
              class="title-bar-control-btn"
            />
          </Show>

          <Show when={props.onCloseClick}>
            <Button
              variant="close"
              icon="close"
              iconPosition="only"
              onClick={() => props.onCloseClick?.()}
              title="Close"
              class="title-bar-control-btn"
            />
          </Show>
        </div>
      </div>
    </div>
  );
};
