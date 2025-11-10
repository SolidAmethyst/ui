import type { JSX } from "solid-js";
import { Component, createSignal, Show } from "solid-js";
import { CodeHighlight } from '../../../components/ui/code-highlight'

interface TabsProps {
  preview: JSX.Element;
  code: string;
  isDark: () => boolean;
}

export const Tabs: Component<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<"preview" | "code">("preview");

  return (
    <div
      style={{
        width: "100%",
        "max-width": "100%",
        "box-sizing": "border-box",
        margin: "24px 0",
      }}
    >
      {/* Tab buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          "border-bottom": `1px solid ${
            props.isDark() ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
          margin: "0 0 20px 0",
        }}
      >
        <button
          onClick={() => setActiveTab("preview")}
          style={{
            padding: "10px 20px",
            "font-size": "14px",
            "font-weight": "500",
            border: "none",
            background: "transparent",
            color:
              activeTab() === "preview"
                ? props.isDark()
                  ? "#f6f6f6"
                  : "#1a1a1a"
                : props.isDark()
                  ? "rgba(246, 246, 246, 0.5)"
                  : "rgba(26, 26, 26, 0.5)",
            cursor: "pointer",
            "border-bottom": `2px solid ${
              activeTab() === "preview" ? "#3b82f6" : "transparent"
            }`,
            transition: "all 0.2s ease",
            margin: "0 0 -1px 0",
          }}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          style={{
            padding: "10px 20px",
            "font-size": "14px",
            "font-weight": "500",
            border: "none",
            background: "transparent",
            color:
              activeTab() === "code"
                ? props.isDark()
                  ? "#f6f6f6"
                  : "#1a1a1a"
                : props.isDark()
                  ? "rgba(246, 246, 246, 0.5)"
                  : "rgba(26, 26, 26, 0.5)",
            cursor: "pointer",
            "border-bottom": `2px solid ${
              activeTab() === "code" ? "#3b82f6" : "transparent"
            }`,
            transition: "all 0.2s ease",
            margin: "0 0 -1px 0",
          }}
        >
          Code
        </button>
      </div>

      {/* Tab content */}
      <div>
        <Show when={activeTab() === "preview"}>
          <div
            style={{
              background: props.isDark()
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(0, 0, 0, 0.03)",
              border: `1px solid ${
                props.isDark()
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              padding: "8px 12px",
              "box-sizing": "border-box",
              width: "100%",
              "max-width": "100%",
              display: "flex",
              "align-items": "flex-start",
              "justify-content": "center",
              "flex-wrap": "wrap",
              gap: "12px",
            }}
          >
            {props.preview}
          </div>
        </Show>
        <Show when={activeTab() === "code"}>
          <CodeHighlight code={props.code} isDark={props.isDark} />
        </Show>
      </div>
    </div>
  );
};
