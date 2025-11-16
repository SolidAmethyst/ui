/**
 * Sidebar Component
 * Navigation sidebar component with support for overlay and shift modes
 * Overlay mode renders inside container (not via portal) for proper positioning within Window
 */

import type { JSX } from "solid-js";
import { Component, For, Show } from "solid-js";
import { Scrollbar } from "../../scrollbar";
import { sidebarStyles } from "../lib/sidebar.styles";
import type { SidebarItem, SidebarProps } from "../model/types";

// Render sidebar content
const SidebarContent = (props: {
  items: SidebarItem[];
  onItemClick?: (item: SidebarItem) => void;
}) => (
  <Scrollbar
    direction="vertical"
    style={{
      ...sidebarStyles.innerContainer(),
      width: "100%",
      height: "100%",
    }}
  >
    <ul style={sidebarStyles.list()}>
      <For each={props.items}>
        {(item) => (
          <>
            <Show when={item.separator}>
              <li style={sidebarStyles.separator()} />
            </Show>
            <Show when={!item.separator}>
              <li>
                <button
                  type="button"
                  class="sidebar-item"
                  onClick={() => {
                    item.onClick?.();
                    props.onItemClick?.(item);
                  }}
                  disabled={item.disabled}
                  style={sidebarStyles.button(item.disabled ?? false)}
                >
                  <Show when={item.icon}>
                    <span
                      class="material-symbols-rounded"
                      style={sidebarStyles.icon()}
                    >
                      {item.icon}
                    </span>
                  </Show>
                  <span style={sidebarStyles.label()}>{item.label}</span>
                </button>
              </li>
            </Show>
          </>
        )}
      </For>
    </ul>
  </Scrollbar>
);

export const Sidebar: Component<SidebarProps> = (props) => {
  const overlayMode = () => props.overlayMode ?? false;
  const open = () => props.open;

  return (
    <>
      {/* Backdrop for overlay mode */}
      <Show when={overlayMode() && open()}>
        <div
          onClick={() => props.onItemClick?.({} as SidebarItem)}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "hsl(var(--background) / 30%)",
            "backdrop-filter": "blur(2px)",
            "-webkit-backdrop-filter": "blur(2px)",
            "z-index": "999",
            cursor: "pointer",
          }}
        />
      </Show>

      {/* Sidebar panel */}
      <aside
        class={`sidebar ${props.class || ""}`}
        style={{
          ...sidebarStyles.container(open(), overlayMode()),
          ...(props.style as JSX.CSSProperties),
        }}
      >
        <Show when={open()}>
          <SidebarContent items={props.items} onItemClick={props.onItemClick} />
        </Show>
      </aside>
    </>
  );
};
