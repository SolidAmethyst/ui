import { Component } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { TechChip } from "../../../components/ui/tech-chip";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { techchipSnippets } from "./code-snippets/techchip-snippets";

export const TechChipDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">TechChip</Typography>
      <Typography variant="body">
        Status indicator chip for displaying technology stack with real-time
        status updates. Built with Material 3 design principles.
      </Typography>

      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={techchipSnippets.imports} />
      </section>

      {/* Basic Usage */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  display: "flex",
                  "flex-wrap": "wrap",
                  gap: "12px",
                  "align-items": "center",
                  width: "100%",
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
            </div>
          }
          code={techchipSnippets.usage.basicUsage}
        />
      </section>

      {/* Status States */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Status States
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  display: "flex",
                  "flex-wrap": "wrap",
                  gap: "12px",
                  "align-items": "center",
                  width: "100%",
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
            </div>
          }
          code={techchipSnippets.usage.statusStates}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The TechChip component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight
          code={`@layer base {
  :root {
    --techchip-foreground: 222.2 84% 4.9%;
    --techchip-loading: 217.2 91.2% 59.8%;
    --techchip-ready: 142.1 76.2% 36.3%;
    --techchip-error: 0 84.2% 60.2%;
  }

  .dark,
  [data-theme="dark"] {
    --techchip-foreground: 210 40% 98%;
    --techchip-loading: 217.2 91.2% 59.8%;
    --techchip-ready: 142.1 76.2% 36.3%;
    --techchip-error: 0 62.8% 30.6%;
  }
}`}
        />
        <Typography variant="body">
          The TechChip component automatically uses these CSS variables. You can
          override them in your application to match your design system. All
          colors use HSL format without the `hsl()` wrapper, allowing for easy
          opacity adjustments.
        </Typography>
      </section>
    </article>
  );
};
