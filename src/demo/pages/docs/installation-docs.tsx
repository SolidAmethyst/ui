import { Accessor, Component } from "solid-js";
import { CodeHighlight } from "../../components/common/code-highlight";

interface InstallationDocsProps {
  isDark: Accessor<boolean>;
}

export const InstallationDocs: Component<InstallationDocsProps> = (props) => (
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
      Installation
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
      Get started with Solid UI Toolkit in your project.
    </p>

    <section style={{ "margin-bottom": "32px" }}>
      <h2
        style={{
          "font-size": "1.25rem",
          "font-weight": "600",
          "margin-bottom": "12px",
          "line-height": "1.3",
        }}
      >
        Install from GitHub
      </h2>
      <CodeHighlight
        code={`npm install @sapphiresolid/ui`}
        isDark={props.isDark}
      />
    </section>

    <section style={{ "margin-bottom": "32px" }}>
      <h2
        style={{
          "font-size": "1.25rem",
          "font-weight": "600",
          "margin-bottom": "12px",
          "line-height": "1.3",
        }}
      >
        Include Styles
      </h2>
      <p
        style={{
          "margin-bottom": "12px",
          "font-size": "0.9rem",
          "line-height": "1.6",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.7)"
            : "rgba(26, 26, 26, 0.7)",
        }}
      >
        Import the global styles in your main entry file:
      </p>
      <CodeHighlight
        code={`import '@sapphiresolid/ui/styles/globals.css'`}
        isDark={props.isDark}
      />
    </section>

    <section style={{ "margin-bottom": "32px" }}>
      <h2
        style={{
          "font-size": "1.25rem",
          "font-weight": "600",
          "margin-bottom": "12px",
          "line-height": "1.3",
        }}
      >
        Import Components
      </h2>
      <p
        style={{
          "margin-bottom": "12px",
          "font-size": "0.9rem",
          "line-height": "1.6",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.7)"
            : "rgba(26, 26, 26, 0.7)",
        }}
      >
        Import components as needed in your files:
      </p>
      <CodeHighlight
        code={`import { Button } from '@sapphiresolid/ui'
import { TechChip } from '@sapphiresolid/ui'
import { Scrollbar, ScrollbarProvider } from '@sapphiresolid/ui'`}
        isDark={props.isDark}
      />
    </section>
  </article>
);
