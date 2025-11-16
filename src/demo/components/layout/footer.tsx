import { Component } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FooterProps {}

export const Footer: Component<FooterProps> = () => (
  <footer
    style={{
      width: "100%",
      padding: "32px 32px",
      "box-sizing": "border-box",
      "border-top": "1px solid hsl(var(--border))",
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
          color: "hsl(var(--muted-foreground) / 0.6)",
          "font-size": "13px",
        }}
      >
        © 2024 Solid UI Toolkit. Built with Solid.js
      </p>
    </div>
  </footer>
);
