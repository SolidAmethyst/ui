import { Component, Accessor } from "solid-js";
import { DemoDivider } from "../components/common/demo-divider";
import {
  ButtonsSection,
  ScrollbarSection,
  TechChipSection,
} from "../components/sections";

interface DemoPageProps {
  isDark: Accessor<boolean>;
  toggleTheme: () => void;
}

export const DemoPage: Component<DemoPageProps> = (props) => (
  <div
    style={{
      padding: "20px 32px",
      width: "100%",
      "max-width": "1400px",
      "box-sizing": "border-box",
      display: "flex",
      "flex-direction": "column",
      gap: "20px",
      "margin-left": "auto",
      "margin-right": "auto",
    }}
  >
    {/* Header */}
    <div
      style={{
        "text-align": "center",
        padding: "10px 0",
      }}
    >
      <h1
        style={{
          margin: "0 0 10px 0",
          color: props.isDark() ? "#f6f6f6" : "#1a1a1a",
          "font-size": "2.5rem",
          "font-weight": "700",
          "letter-spacing": "-0.02em",
          "text-shadow": props.isDark()
            ? "0 2px 4px rgba(0,0,0,0.3)"
            : "0 2px 4px rgba(255,255,255,0.3)",
        }}
      >
        Solid UI Toolkit
      </h1>
      <p
        style={{
          margin: "0",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.7)"
            : "rgba(26, 26, 26, 0.7)",
          "font-size": "1.1rem",
          "font-weight": "400",
          "letter-spacing": "0.5px",
        }}
      >
        Beautiful components built with Solid.js & Tailwind CSS
      </p>
    </div>

    {/* Demo Sections */}
    <ButtonsSection isDark={props.isDark} toggleTheme={props.toggleTheme} />

    <DemoDivider />

    <TechChipSection isDark={props.isDark} />

    <DemoDivider />

    <ScrollbarSection isDark={props.isDark} />
  </div>
);
