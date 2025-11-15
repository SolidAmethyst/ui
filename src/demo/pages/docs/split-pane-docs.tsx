import { Accessor, Component, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { SplitPane } from "../../../components/ui/split-pane";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { splitPaneSnippets } from "./code-snippets/split-pane-snippets";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

interface SplitPaneDocsProps {}

export const SplitPaneDocs: Component<SplitPaneDocsProps> = (props) => {
  const [split, setSplit] = createSignal(50);

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Split Pane</Typography>
      <Typography variant="body">
        Split pane component for resizable panels. Supports both horizontal and
        vertical orientations with customizable split positions and constraints.
      </Typography>
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={splitPaneSnippets.imports} />
      </section>
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "600px",
                  margin: "0 auto",
                  height: "300px",
                }}
              >
                <SplitPane
                  first={
                    <div
                      style={{
                        padding: "16px",
                        background: getThemeFromCSS()
                          ? "hsl(var(--foreground) / 5%)"
                          : "hsl(var(--muted) / 5%)",
                        height: "100%",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                      }}
                    >
                      <Typography variant="body">Left Panel</Typography>
                    </div>
                  }
                  second={
                    <div
                      style={{
                        padding: "16px",
                        background: getThemeFromCSS()
                          ? "hsl(var(--foreground) / 5%)"
                          : "hsl(var(--muted) / 5%)",
                        height: "100%",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                      }}
                    >
                      <Typography variant="body">Right Panel</Typography>
                    </div>
                  }
                />
              </div>
            </div>
          }
          code={splitPaneSnippets.usage.basicUsage}
        />
      </section>
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Vertical Orientation
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "600px",
                  margin: "0 auto",
                  height: "300px",
                }}
              >
                <SplitPane
                  first={
                    <div
                      style={{
                        padding: "16px",
                        background: getThemeFromCSS()
                          ? "hsl(var(--foreground) / 5%)"
                          : "hsl(var(--muted) / 5%)",
                        height: "100%",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                      }}
                    >
                      <Typography variant="body">Top Panel</Typography>
                    </div>
                  }
                  second={
                    <div
                      style={{
                        padding: "16px",
                        background: getThemeFromCSS()
                          ? "hsl(var(--foreground) / 5%)"
                          : "hsl(var(--muted) / 5%)",
                        height: "100%",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                      }}
                    >
                      <Typography variant="body">Bottom Panel</Typography>
                    </div>
                  }
                  direction="vertical"
                />
              </div>
            </div>
          }
          code={splitPaneSnippets.usage.vertical}
        />
      </section>
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Controlled Split
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "600px",
                  margin: "0 auto",
                  height: "300px",
                }}
              >
                <SplitPane
                  first={
                    <div
                      style={{
                        padding: "16px",
                        background: getThemeFromCSS()
                          ? "hsl(var(--foreground) / 5%)"
                          : "hsl(var(--muted) / 5%)",
                        height: "100%",
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "center",
                        "justify-content": "center",
                        gap: "8px",
                      }}
                    >
                      <Typography variant="body">
                        Left Panel ({Math.round(split() * 10) / 10}%)
                      </Typography>
                    </div>
                  }
                  second={
                    <div
                      style={{
                        padding: "16px",
                        background: getThemeFromCSS()
                          ? "hsl(var(--foreground) / 5%)"
                          : "hsl(var(--muted) / 5%)",
                        height: "100%",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                      }}
                    >
                      <Typography variant="body">
                        Right Panel ({Math.round((100 - split()) * 10) / 10}%)
                      </Typography>
                    </div>
                  }
                  split={split()}
                  onSplitChange={setSplit}
                />
              </div>
            </div>
          }
          code={splitPaneSnippets.usage.controlled}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The SplitPane component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={splitPaneSnippets.customization} />
        <Typography variant="body">
          The SplitPane component automatically uses these CSS variables. You
          can override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
