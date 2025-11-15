/**
 * Tabs Component
 * Convenience wrapper for documentation (preview/code tabs)
 * Uses original tabs.styles for documentation appearance
 */

import { Component, createSignal, Show } from "solid-js";
import { CodeHighlight } from "../../code-highlight";
import { tabsStyles } from "../lib/tabs.styles";
import type { TabsProps } from "../model/types";

export const Tabs: Component<TabsProps> = (props) => {
  const previewValue = () => props.previewValue ?? "preview";
  const codeValue = () => props.codeValue ?? "code";
  const previewLabel = () => props.previewLabel ?? "Preview";
  const codeLabel = () => props.codeLabel ?? "Code";
  const defaultValue = () => props.defaultValue ?? previewValue();

  const [activeTab, setActiveTab] = createSignal<string>(defaultValue());

  const isActive = (value: string) => activeTab() === value;

  let previewButtonRef: HTMLButtonElement | undefined;
  let codeButtonRef: HTMLButtonElement | undefined;

  const resetAllTabStyles = (newActiveTab: string) => {
    // Reset styles for all tabs to remove any lingering hover effects
    if (previewButtonRef) {
      Object.assign(
        previewButtonRef.style,
        tabsStyles.tabButton({
          isActive: newActiveTab === previewValue(),
        }),
      );
      // Explicitly reset text-shadow and border-bottom
      previewButtonRef.style.textShadow =
        newActiveTab === previewValue() ? "" : "none";
    }
    if (codeButtonRef) {
      Object.assign(
        codeButtonRef.style,
        tabsStyles.tabButton({
          isActive: newActiveTab === codeValue(),
        }),
      );
      // Explicitly reset text-shadow and border-bottom
      codeButtonRef.style.textShadow =
        newActiveTab === codeValue() ? "" : "none";
    }
  };

  return (
    <div
      class={props.class}
      style={{ ...tabsStyles.container(), ...props.style }}
    >
      {/* Tab buttons */}
      <div
        style={{
          ...tabsStyles.tabButtons({ isActive: false }),
          ...(props.center
            ? {
                "justify-content": "center",
                "align-items": "center",
              }
            : {}),
          ...(props.gap ? { gap: props.gap } : {}),
          ...(props.borderColor
            ? {
                "border-bottom": `1px solid ${props.borderColor}`,
              }
            : {}),
          ...props.style,
        }}
      >
        <button
          ref={previewButtonRef}
          onClick={(e) => {
            resetAllTabStyles(previewValue());
            setActiveTab(previewValue());
            // Immediately apply hover styles to the newly active tab
            Object.assign(
              e.currentTarget.style,
              tabsStyles.tabButtonHover({
                isActive: true,
              }),
            );
          }}
          style={tabsStyles.tabButton({
            isActive: isActive(previewValue()),
          })}
          onMouseEnter={(e) => {
            if (isActive(previewValue())) {
              Object.assign(
                e.currentTarget.style,
                tabsStyles.tabButtonHover({
                  isActive: true,
                }),
              );
            }
          }}
          onMouseLeave={(e) => {
            Object.assign(
              e.currentTarget.style,
              tabsStyles.tabButton({
                isActive: isActive(previewValue()),
              }),
            );
          }}
        >
          {previewLabel()}
        </button>
        <button
          ref={codeButtonRef}
          onClick={(e) => {
            resetAllTabStyles(codeValue());
            setActiveTab(codeValue());
            // Immediately apply hover styles to the newly active tab
            Object.assign(
              e.currentTarget.style,
              tabsStyles.tabButtonHover({
                isActive: true,
              }),
            );
          }}
          style={tabsStyles.tabButton({
            isActive: isActive(codeValue()),
          })}
          onMouseEnter={(e) => {
            if (isActive(codeValue())) {
              Object.assign(
                e.currentTarget.style,
                tabsStyles.tabButtonHover({
                  isActive: true,
                }),
              );
            }
          }}
          onMouseLeave={(e) => {
            Object.assign(
              e.currentTarget.style,
              tabsStyles.tabButton({
                isActive: isActive(codeValue()),
              }),
            );
          }}
        >
          {codeLabel()}
        </button>
      </div>

      {/* Tab content */}
      <div>
        <Show when={activeTab() === previewValue()}>{props.preview}</Show>
        <Show when={activeTab() === codeValue()}>
          <CodeHighlight code={props.code} />
        </Show>
      </div>
    </div>
  );
};
