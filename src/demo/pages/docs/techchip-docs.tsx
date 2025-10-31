import { Accessor, Component } from "solid-js";
import { TechChip } from "../../../components/ui/tech-chip";
import { CodeHighlight } from "../../components/common/code-highlight";
import { Tabs } from "../../components/common/tabs";

interface TechChipDocsProps {
  isDark: Accessor<boolean>;
}

export const TechChipDocs: Component<TechChipDocsProps> = (props) => (
  <article
    style={{
      width: "100%",
      "max-width": "700px",
      "box-sizing": "border-box",
      margin: "0 auto",
      padding: "24px 0",
      color: props.isDark() ? "#f6f6f6" : "#1a1a1a",
      overflow: "hidden",
      "overflow-x": "hidden",
    }}
  >
    <h1
      style={{
        "font-size": "1.75rem",
        "font-weight": "700",
        "margin-bottom": "12px",
        "line-height": "1.2",
      }}
    >
      TechChip
    </h1>
    <p
      style={{
        "font-size": "0.95rem",
        color: props.isDark()
          ? "rgba(246, 246, 246, 0.7)"
          : "rgba(26, 26, 26, 0.7)",
        "margin-bottom": "24px",
        "line-height": "1.6",
      }}
    >
      Status indicator chip for displaying technology stack with real-time
      status updates. Built with Material 3 design principles.
    </p>

    {/* Installation */}
    <section style={{ "margin-bottom": "32px" }}>
      <h2
        style={{
          "font-size": "1.25rem",
          "font-weight": "600",
          "margin-bottom": "12px",
          "line-height": "1.3",
          color: props.isDark() ? "#f6f6f6" : "#1a1a1a",
        }}
      >
        Installation
      </h2>
      <CodeHighlight
        code={`import { TechChip } from '@sapphiresolid/ui'`}
        isDark={props.isDark}
      />
    </section>

    {/* Basic Usage */}
    <section style={{ "margin-bottom": "32px" }}>
      <h2
        style={{
          "font-size": "1.25rem",
          "font-weight": "600",
          "margin-bottom": "12px",
          "line-height": "1.3",
          color: props.isDark() ? "#f6f6f6" : "#1a1a1a",
        }}
      >
        Basic Usage
      </h2>
      <Tabs
        isDark={props.isDark}
        preview={
          <div
            style={{
              display: "flex",
              "flex-wrap": "wrap",
              gap: "12px",
              "align-items": "center",
            }}
          >
            <TechChip
              label="TypeScript"
              icon="code"
              status="ready"
              variant="frontend"
            />
            <TechChip
              label="Solid.js"
              icon="javascript"
              status="ready"
              variant="frontend"
            />
            <TechChip
              label="Rust"
              icon="memory"
              status="ready"
              variant="backend"
            />
            <TechChip
              label="Tauri"
              icon="desktop_windows"
              status="ready"
              variant="backend"
            />
            <TechChip
              label="Physics Engine"
              icon="science"
              status="ready"
              variant="engine"
            />
            <TechChip
              label="WebGL"
              icon="web"
              status="ready"
              variant="engine"
            />
          </div>
        }
        code={`<TechChip
  label="TypeScript"
  icon="code"
  status="ready"
  variant="frontend"
/>

<TechChip
  label="Solid.js"
  icon="javascript"
  status="ready"
  variant="frontend"
/>

<TechChip
  label="Rust"
  icon="memory"
  status="ready"
  variant="backend"
/>

<TechChip
  label="Tauri"
  icon="desktop_windows"
  status="ready"
  variant="backend"
/>

<TechChip
  label="Physics Engine"
  icon="science"
  status="ready"
  variant="engine"
/>

<TechChip
  label="WebGL"
  icon="web"
  status="ready"
  variant="engine"
/>`}
      />
    </section>

    {/* Status States */}
    <section style={{ "margin-bottom": "32px" }}>
      <h2
        style={{
          "font-size": "1.25rem",
          "font-weight": "600",
          "margin-bottom": "12px",
          "line-height": "1.3",
          color: props.isDark() ? "#f6f6f6" : "#1a1a1a",
        }}
      >
        Status States
      </h2>
      <Tabs
        isDark={props.isDark}
        preview={
          <div
            style={{
              display: "flex",
              "flex-wrap": "wrap",
              gap: "12px",
              "align-items": "center",
            }}
          >
            <TechChip
              label="Loading"
              icon="hourglass_empty"
              status="loading"
              variant="frontend"
            />
            <TechChip
              label="Ready"
              icon="check_circle"
              status="ready"
              variant="backend"
            />
            <TechChip
              label="Error"
              icon="error"
              status="error"
              variant="engine"
            />
          </div>
        }
        code={`<TechChip
  label="Loading"
  icon="hourglass_empty"
  status="loading"
  variant="frontend"
/>

<TechChip
  label="Ready"
  icon="check_circle"
  status="ready"
  variant="backend"
/>

<TechChip
  label="Error"
  icon="error"
  status="error"
  variant="engine"
/>`}
      />
    </section>
  </article>
);
