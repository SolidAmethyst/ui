import { Accessor, Component } from "solid-js";
import { Scrollbar, ScrollbarProvider } from "../../../components/ui/scrollbar";
import { CodeHighlight } from "../../components/common/code-highlight";
import { Tabs } from "../../components/common/tabs";

interface ScrollbarDocsProps {
  isDark: Accessor<boolean>;
}

export const ScrollbarDocs: Component<ScrollbarDocsProps> = (props) => (
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
      Scrollbar
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
      Customizable scrollbar component with Material 3 styling and physics
      engine support.
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
        code={`import { Scrollbar, ScrollbarProvider } from '@sapphiresolid/ui'`}
        isDark={props.isDark}
      />
    </section>

    {/* Vertical Scrollbar */}
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
        Vertical Scrollbar
      </h2>
      <Tabs
        isDark={props.isDark}
        preview={
          <ScrollbarProvider>
            <div
              style={{
                width: "100%",
                height: "300px",
                padding: "12px",
                "box-sizing": "border-box",
              }}
            >
              <Scrollbar
                direction="vertical"
                showArrows={true}
                style={{ width: "100%", height: "100%" }}
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    style={{
                      padding: "12px",
                      "border-bottom": `1px solid ${
                        props.isDark()
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)"
                      }`,
                    }}
                  >
                    Item {i + 1}
                  </div>
                ))}
              </Scrollbar>
            </div>
          </ScrollbarProvider>
        }
        code={`<ScrollbarProvider>
  <Scrollbar direction="vertical" showArrows={true}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    {/* ... more items */}
  </Scrollbar>
</ScrollbarProvider>`}
      />
    </section>

    {/* Horizontal Scrollbar */}
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
        Horizontal Scrollbar
      </h2>
      <Tabs
        isDark={props.isDark}
        preview={
          <ScrollbarProvider>
            <div
              style={{
                width: "100%",
                height: "120px",
                padding: "12px",
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
                    gap: "16px",
                    "white-space": "nowrap",
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      style={{
                        padding: "12px 16px",
                        "min-width": "200px",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        height: "100%",
                        background: props.isDark()
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.05)",
                        border: `1px solid ${
                          props.isDark()
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.1)"
                        }`,
                      }}
                    >
                      Card {i + 1}
                    </div>
                  ))}
                </div>
              </Scrollbar>
            </div>
          </ScrollbarProvider>
        }
        code={`<ScrollbarProvider>
  <Scrollbar direction="horizontal" showArrows={true}>
    <div style={{ display: 'flex', gap: '16px' }}>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
      {/* ... more cards */}
    </div>
  </Scrollbar>
</ScrollbarProvider>`}
      />
    </section>
  </article>
);
