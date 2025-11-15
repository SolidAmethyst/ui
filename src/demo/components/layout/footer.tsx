import { Accessor, Component } from "solid-js";

interface FooterProps {
  isDark: Accessor<boolean>;
}

export const Footer: Component<FooterProps> = (props) => (
  <footer
    style={{
      width: "100%",
      padding: "32px 32px",
      "box-sizing": "border-box",
      "border-top": props.isDark()
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.1)",
      "margin-top": "auto",
    }}
  >
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "20px",
        "align-items": "center",
        "text-align": "center",
        width: "100%",
        "box-sizing": "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "24px",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        <a
          href="#"
          style={{
            color: "hsl(var(--foreground))",
            "text-decoration": "none",
            "font-size": "14px",
            "font-weight": "500",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Documentation
        </a>
        <a
          href="#"
          style={{
            color: "hsl(var(--foreground))",
            "text-decoration": "none",
            "font-size": "14px",
            "font-weight": "500",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          GitHub
        </a>
        <a
          href="#"
          style={{
            color: "hsl(var(--foreground))",
            "text-decoration": "none",
            "font-size": "14px",
            "font-weight": "500",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          License
        </a>
      </div>
      <p
        style={{
          margin: "0",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.6)"
            : "rgba(26, 26, 26, 0.6)",
          "font-size": "13px",
        }}
      >
        © 2024 Solid UI Toolkit. Built with Solid.js
      </p>
    </div>
  </footer>
);
