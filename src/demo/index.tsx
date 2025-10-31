import type { JSX } from "solid-js";
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { ScrollbarProvider } from "../components/ui/scrollbar";
import "../styles/globals.css";
import { DemoDivider } from "./components/common/demo-divider";
import {
  ButtonsSection,
  ScrollbarSection,
  TechChipSection,
} from "./components/sections";

function App() {
  const [isDark, setIsDark] = createSignal(true);

  const toggleTheme = () => {
    setIsDark(!isDark());
  };

  return (
    <ScrollbarProvider>
      <div
        data-theme={isDark() ? "dark" : "light"}
        style={
          {
            padding: "20px",
            "font-family": "Arial, sans-serif",
            "min-height": "100vh",
            display: "flex",
            "flex-direction": "column",
            gap: "15px",
            width: "100%",
            margin: "0",
            background: isDark() ? "hsl(240 20% 8%)" : "#ffffff",
            color: isDark() ? "#f6f6f6" : "#1a1a1a",
            transition: "background 0.3s ease, color 0.3s ease",
            "--text-color": isDark() ? "#ffffff" : "#1a1a1a",
            "--icon-color": isDark() ? "#ffffff" : "#1a1a1a",
          } as JSX.CSSProperties & Record<`--${string}`, string>
        }
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
              color: isDark() ? "#f6f6f6" : "#1a1a1a",
              "font-size": "2.5rem",
              "font-weight": "700",
              "letter-spacing": "-0.02em",
              "text-shadow": isDark()
                ? "0 2px 4px rgba(0,0,0,0.3)"
                : "0 2px 4px rgba(255,255,255,0.3)",
            }}
          >
            Solid UI Toolkit
          </h1>
          <p
            style={{
              margin: "0",
              color: isDark()
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
        <ButtonsSection isDark={isDark} toggleTheme={toggleTheme} />

        <DemoDivider />

        <TechChipSection isDark={isDark} />

        <DemoDivider />

        <ScrollbarSection isDark={isDark} />
      </div>
    </ScrollbarProvider>
  );
}

render(() => <App />, document.getElementById("app")!);
