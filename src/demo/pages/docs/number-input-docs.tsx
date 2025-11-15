import { Component, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { NumberInput } from "../../../components/ui/number-input";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { numberInputSnippets } from "./code-snippets/number-input-snippets";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

export const NumberInputDocs: Component = () => {
  const [basicValue, setBasicValue] = createSignal(3);
  const [controlledValue, setControlledValue] = createSignal(3);

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Number Input</Typography>
      <Typography variant="body">
        Numeric input component with arrow controls and wheel support. Supports
        min/max values, step increments, and theme-aware styling.
      </Typography>

      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={numberInputSnippets.imports} />
      </section>

      {/* Basic Usage */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                  display: "flex",
                  "justify-content": "center",
                }}
              >
                <NumberInput
                  value={basicValue()}
                  step={1}
                  enableWheel={true}
                  onChange={(val) =>
                    setBasicValue(
                      typeof val === "number" ? val : parseInt(String(val), 10),
                    )
                  }
                />
              </div>
            </div>
          }
          code={numberInputSnippets.usage.basicUsage}
        />
      </section>

      {/* Controlled Component */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Controlled Component
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                  display: "flex",
                  "justify-content": "center",
                }}
              >
                <NumberInput
                  value={controlledValue()}
                  onChange={(val) => {
                    const num =
                      typeof val === "number" ? val : parseInt(String(val), 10);
                    if (!isNaN(num) && num >= 1 && num <= 6) {
                      setControlledValue(num);
                    }
                  }}
                  min={1}
                  max={6}
                  step={1}
                  enableWheel={true}
                  showArrows={true}
                  themeAware={true}
                />
              </div>
            </div>
          }
          code={numberInputSnippets.usage.controlled}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The NumberInput component uses CSS custom properties for theming.
          These variables are already defined in the library, but you can
          override them in your application's stylesheet to match your design
          system.
        </Typography>
        <CodeHighlight code={numberInputSnippets.customization} />
        <Typography variant="body">
          The NumberInput component automatically uses these CSS variables. You
          can override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
