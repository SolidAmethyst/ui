import { Component, Accessor } from "solid-js";
import { Button } from "../../../components/ui/button";
import { DemoSection } from "../common/demo-section";
import { SubsectionTitle } from "../common/subsection-title";

interface ButtonsSectionProps {
  isDark: Accessor<boolean>;
  toggleTheme: () => void;
}

export const ButtonsSection: Component<ButtonsSectionProps> = (props) => (
  <DemoSection
    title="Button Components"
    gradientColors={{ color1: "#3b82f6", color2: "#8b5cf6" }}
    isDark={props.isDark}
  >
    {/* Control Buttons */}
    <div style={{ "margin-bottom": "12px", width: "100%" }}>
      <SubsectionTitle title="Control buttons" isDark={props.isDark} />
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "8px",
          "justify-content": "center",
          "align-items": "center",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Button icon="menu">Menu</Button>
        <Button icon="settings">Settings</Button>
        <Button icon="bug_report">Debug</Button>
      </div>
    </div>

    {/* Small Buttons */}
    <div style={{ "margin-bottom": "12px", width: "100%" }}>
      <SubsectionTitle
        title="Small buttons (Title bar)"
        isDark={props.isDark}
      />
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "8px",
          "justify-content": "center",
          "align-items": "center",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Button
          variant="small"
          icon={props.isDark() ? "dark_mode" : "light_mode"}
          iconFilled={false}
          iconPosition="only"
          title="Theme"
          onClick={props.toggleTheme}
        />
        <Button
          variant="small"
          icon="bug_report"
          iconPosition="only"
          title="Debug"
        />
        <Button
          variant="small"
          icon="push_pin"
          iconPosition="only"
          title="Pin"
        />
        <Button
          variant="small"
          icon="settings"
          iconPosition="only"
          title="Settings"
        />
      </div>
    </div>

    {/* Play/Pause Button */}
    <div style={{ "margin-bottom": "12px", width: "100%" }}>
      <SubsectionTitle title="Play/Pause button" isDark={props.isDark} />
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "8px",
          "justify-content": "center",
          "align-items": "center",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Button variant="play-pause" icon="play_arrow" title="Play" />
        <Button variant="play-pause" icon="pause" title="Pause" />
      </div>
    </div>

    {/* Window Control Buttons */}
    <div style={{ "margin-bottom": "12px", width: "100%" }}>
      <SubsectionTitle title="Window control buttons" isDark={props.isDark} />
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "8px",
          "justify-content": "center",
          "align-items": "center",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Button
          variant="minimize"
          icon="remove"
          iconPosition="only"
          title="Minimize"
        />
        <Button
          variant="maximize"
          icon="crop_square"
          iconPosition="only"
          title="Maximize"
        />
        <Button
          variant="close"
          icon="close"
          iconPosition="only"
          title="Close"
        />
      </div>
    </div>

    {/* Button States */}
    <div style={{ "margin-bottom": "12px", width: "100%" }}>
      <h3
        style={{
          "margin-bottom": "12px",
          "font-size": "18px",
          "font-weight": "700",
          "letter-spacing": "0.5px",
          "text-align": "center",
          position: "relative",
          "padding-bottom": "8px",
        }}
      >
        <span
          style={{
            color: "hsl(var(--foreground))",
          }}
        >
          Button states
        </span>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "1px",
            background: "hsl(var(--foreground))",
            "border-radius": "1px",
            "box-shadow": "0 1px 1px rgba(0, 0, 0, 0.3)",
          }}
        />
      </h3>
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "8px",
          "justify-content": "center",
          "align-items": "center",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Button active>Active</Button>
        <Button pinned>Pinned</Button>
        <Button maximized>Maximized</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  </DemoSection>
);
