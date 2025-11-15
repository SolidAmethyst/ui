import { getThemeFromCSS } from "../../components/ui/glass/lib/theme-utils";
import { Accessor, Component } from "solid-js";
import { Scrollbar } from "../../../components/ui/scrollbar";
import { DemoSection } from "../common/demo-section";
import { ScrollbarGlowEffect } from "../effects";

interface ScrollbarSectionProps {}

export const ScrollbarSection: Component<ScrollbarSectionProps> = (props) => (
  <DemoSection
    title="Scrollbar Components"
    gradientColors={{ color1: "#f59e0b", color2: "#ec4899" }}
  >
    <div
      style={{
        display: "flex",
        gap: "20px",
        "justify-content": "center",
        "align-items": "flex-start",
        "margin-bottom": "12px",
      }}
    >
      {/* Vertical Scrollbar */}
      <div style={{ position: "relative" }}>
        <ScrollbarGlowEffect />
        <h3
          style={{
            "margin-bottom": "12px",
            color: "hsl(var(--foreground))",
            "font-size": "18px",
            "font-weight": "700",
            "letter-spacing": "0.5px",
            "text-align": "center",
            "text-shadow": "0 1px 1px rgba(0, 0, 0, 0.3)",
          }}
        >
          Vertical Scrollbar
        </h3>
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "border-radius": "0px",
            width: "500px",
            height: "400px",
            background: "rgba(0, 0, 0, 0.4)",
            "backdrop-filter": "blur(10px) saturate(150%)",
            "-webkit-backdrop-filter": "blur(10px) saturate(150%)",
            "box-shadow": getThemeFromCSS()
              ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Scrollbar
            direction="vertical"
            showArrows={true}
            autoHide={false}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              style={{
                padding: "15px",
                color: "hsl(var(--foreground))",
              }}
            >
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  style={{
                    padding: "10px",
                    "border-bottom": "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "hsl(var(--foreground))",
                      margin: "0 0 5px 0",
                    }}
                  >
                    Item {i + 1}
                  </h3>
                  <p
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      margin: "0",
                    }}
                  >
                    This is content for item {i + 1} to demonstrate vertical
                    scrolling.
                  </p>
                </div>
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>

      {/* Horizontal Scrollbar */}
      <div style={{ position: "relative" }}>
        <ScrollbarGlowEffect />
        <h3
          style={{
            "margin-bottom": "12px",
            color: "hsl(var(--foreground))",
            "font-size": "18px",
            "font-weight": "700",
            "letter-spacing": "0.5px",
            "text-align": "center",
            "text-shadow": "0 1px 1px rgba(0, 0, 0, 0.3)",
          }}
        >
          Horizontal Scrollbar
        </h3>
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "border-radius": "0px",
            width: "500px",
            height: "400px",
            background: "rgba(0, 0, 0, 0.4)",
            "backdrop-filter": "blur(10px) saturate(150%)",
            "-webkit-backdrop-filter": "blur(10px) saturate(150%)",
            "box-shadow": getThemeFromCSS()
              ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Scrollbar
            direction="horizontal"
            showArrows={true}
            autoHide={false}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              style={{
                padding: "0 16px",
                color: "hsl(var(--foreground))",
                "white-space": "nowrap",
                "min-width": "100%",
                height: "100%",
                "box-sizing": "border-box",
                display: "flex",
                gap: "16px",
                "align-items": "center",
              }}
            >
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  style={{
                    padding: "12px 16px",
                    width: "144px",
                    display: "flex",
                    "flex-direction": "column",
                    "justify-content": "center",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "flex-shrink": "0",
                  }}
                >
                  <h3
                    style={{
                      color: "hsl(var(--foreground))",
                      margin: "0 0 5px 0",
                      "font-size": "16px",
                    }}
                  >
                    Item {i + 1}
                  </h3>
                  <p
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      margin: "0",
                      "font-size": "14px",
                    }}
                  >
                    Horizontal scroll content {i + 1}
                  </p>
                </div>
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  </DemoSection>
);
