import { Accessor, Component } from "solid-js";
import { Scrollbar, ScrollbarProvider } from "../../../components/ui/scrollbar";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { scrollbarSnippets } from "./code-snippets/scrollbar-snippets";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

interface ScrollbarDocsProps {}

export const ScrollbarDocs: Component<ScrollbarDocsProps> = (props) => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Scrollbar</Typography>
      <Typography variant="body">
        Customizable scrollbar component with Material 3 styling and physics
        engine support.
      </Typography>
      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={scrollbarSnippets.imports} />
      </section>
      {/* Vertical Scrollbar */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Vertical Scrollbar
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <ScrollbarProvider>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    "box-sizing": "border-box",
                  }}
                >
                  <Scrollbar
                    direction="vertical"
                    showArrows={true}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        style={{
                          padding: "12px",
                          "border-bottom": `1px solid ${"hsl(var(--border))"}`,
                        }}
                      >
                        Item {i + 1}
                      </div>
                    ))}
                  </Scrollbar>
                </div>
              </ScrollbarProvider>
            </div>
          }
          code={scrollbarSnippets.usage.verticalScrollbar}
        />
      </section>
      {/* Horizontal Scrollbar */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Horizontal Scrollbar
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <ScrollbarProvider>
                <div
                  style={{
                    width: "100%",
                    height: "87px",
                    "box-sizing": "border-box",
                  }}
                >
                  <Scrollbar
                    direction="horizontal"
                    showArrows={true}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "14px",
                        "white-space": "nowrap",
                        padding: "0",
                        "box-sizing": "border-box",
                        "align-items": "center",
                      }}
                    >
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          style={{
                            padding: "8px 16px",
                            width: "129px",
                            display: "flex",
                            "align-items": "center",
                            "justify-content": "center",
                            height: "100%",
                            "flex-shrink": "0",
                            background: getThemeFromCSS()
                              ? "hsl(var(--foreground) / 5%)"
                              : "hsl(var(--muted) / 5%)",
                            border: `1px solid ${"hsl(var(--border))"}`,
                          }}
                        >
                          Card {i + 1}
                        </div>
                      ))}
                    </div>
                  </Scrollbar>
                </div>
              </ScrollbarProvider>
            </div>
          }
          code={scrollbarSnippets.usage.horizontalScrollbar}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The scrollbar component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={scrollbarSnippets.customization} />
        <Typography variant="body">
          The scrollbar component automatically uses these CSS variables. You
          can override them in your application to match your design system. All
          colors use HSL format without the `hsl()` wrapper, allowing for easy
          opacity adjustments.
        </Typography>
      </section>
    </article>
  );
};
