import { Accessor, Component } from "solid-js";

interface IntroductionDocsProps {
  isDark: Accessor<boolean>;
}

export const IntroductionDocs: Component<IntroductionDocsProps> = (props) => (
  <article
    style={{
      width: "100%",
      "max-width": "700px",
      "box-sizing": "border-box",
      margin: "0 auto",
      padding: "32px 0",
      color: props.isDark() ? "#f6f6f6" : "#1a1a1a",
      overflow: "hidden",
      "overflow-x": "hidden",
    }}
  >
    <h1
      style={{
        "font-size": "2rem",
        "font-weight": "700",
        "margin-bottom": "12px",
        "line-height": "1.2",
      }}
    >
      Introduction
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
      Beautiful Solid.js components built with Material 3 design principles.
    </p>

    <section style={{ "margin-bottom": "48px" }}>
      <p
        style={{
          "line-height": "1.7",
          margin: "12px 0",
          "font-size": "0.95rem",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.9)"
            : "rgba(26, 26, 26, 0.9)",
        }}
      >
        This is <strong>NOT</strong> a component library. It's a collection of
        re-usable components that you can copy and paste into your apps.
      </p>
      <p
        style={{
          "line-height": "1.7",
          margin: "12px 0",
          "font-size": "0.95rem",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.9)"
            : "rgba(26, 26, 26, 0.9)",
        }}
      >
        Pick the components you need. Copy and paste the code into your project
        and customize to your needs. The code is yours.
      </p>
    </section>
  </article>
);
