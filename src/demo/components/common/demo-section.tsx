import { getThemeFromCSS } from "../../components/ui/glass/lib/theme-utils";
import { Component, JSX } from "solid-js";
import { GlowEffect } from "../effects";

interface DemoSectionProps {
  children: JSX.Element;
  title: string;
  gradientColors: { color1: string; color2: string };
}

export const DemoSection: Component<DemoSectionProps> = (props) => (
  <div
    style={{
      background: getThemeFromCSS()
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(255, 255, 255, 0.8)",
      "backdrop-filter": "blur(20px) saturate(180%)",
      "-webkit-backdrop-filter": "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "16px",
      "border-radius": "0px",
      "box-shadow": getThemeFromCSS()
        ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        : "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
      width: "100%",
      "max-width": "1200px",
      margin: "0 auto",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <GlowEffect />
    <h2
      style={{
        "margin-bottom": "5px",
        "font-size": "2rem",
        "font-weight": "700",
        "letter-spacing": "-0.02em",
        "text-align": "center",
        position: "relative",
        "padding-bottom": "10px",
        "z-index": "1",
      }}
    >
      <span
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          "text-shadow": "0 1px 1px rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(30px) saturate(220%)",
          "-webkit-backdrop-filter": "blur(30px) saturate(220%)",
          padding: "8px 16px",
          "padding-bottom": "12px",
          "border-radius": "0px",
          "box-shadow": getThemeFromCSS()
            ? "0 8px 32px rgba(0, 0, 0, 0.4), " +
              "0 0 0 1px rgba(255, 255, 255, 0.1), " +
              "inset 0 1px 0 rgba(255, 255, 255, 0.15), " +
              "inset 0 -1px 0 rgba(0, 0, 0, 0.2)"
            : "0 4px 16px rgba(0, 0, 0, 0.1), " +
              "0 0 0 1px rgba(0, 0, 0, 0.1), " +
              "inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          background: getThemeFromCSS()
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.3)",
          position: "relative",
          display: "inline-block",
          "user-select": "none",
        }}
      >
        {props.title}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "2px",
            background: `linear-gradient(90deg, ${props.gradientColors.color1} 0%, ${props.gradientColors.color2} 50%, ${props.gradientColors.color1} 100%)`,
            "background-size": "200% 100%",
            animation: "gradient-slide 3s ease infinite",
          }}
        />
      </span>
    </h2>
    {props.children}
  </div>
);
