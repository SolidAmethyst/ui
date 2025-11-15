import { Accessor, Component, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Slider } from "../../../components/ui/slider";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { sliderSnippets } from "./code-snippets/slider-snippets";

interface SliderDocsProps {}

export const SliderDocs: Component<SliderDocsProps> = (props) => {
  const [basicValue, setBasicValue] = createSignal(50);
  const [minMaxValue, setMinMaxValue] = createSignal(25);
  const [controlledValue, setControlledValue] = createSignal(50);
  const [formattedValue, setFormattedValue] = createSignal(75);

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Slider</Typography>
      <Typography variant="body">
        Range input slider component for selecting numeric values. Supports
        custom formatting, labels, and theme-aware styling.
      </Typography>
      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={sliderSnippets.imports} />
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
                <Slider value={50} />
              </div>
            </div>
          }
          code={sliderSnippets.usage.basicUsage}
        />
      </section>
      {/* With Label */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          With Label
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
                <Slider
                  value={basicValue()}
                  label="Volume"
                  onChange={(val) => setBasicValue(val)}
                />
              </div>
            </div>
          }
          code={sliderSnippets.usage.withLabel}
        />
      </section>
      {/* Min/Max/Step */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Min, Max, and Step
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
                <Slider
                  value={minMaxValue()}
                  min={0}
                  max={100}
                  step={5}
                  label="Progress"
                  onChange={(val) => setMinMaxValue(val)}
                />
              </div>
            </div>
          }
          code={sliderSnippets.usage.withMinMax}
        />
      </section>
      {/* Custom Formatter */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Custom Value Formatter
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
                <Slider
                  value={formattedValue()}
                  label="Opacity"
                  formatValue={(val) => `${val}%`}
                  onChange={(val) => setFormattedValue(val)}
                />
              </div>
            </div>
          }
          code={sliderSnippets.usage.withFormatter}
        />
      </section>
      {/* Controlled */}
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
                <Slider
                  value={controlledValue()}
                  label="Volume"
                  onChange={(val) => setControlledValue(val)}
                />
                <Typography variant="small" style={{ "margin-top": "12px" }}>
                  Current value: {controlledValue()}
                </Typography>
              </div>
            </div>
          }
          code={sliderSnippets.usage.controlled}
        />
      </section>
      {/* Disabled */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Disabled State
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
                <Slider value={50} disabled={true} label="Volume" />
              </div>
            </div>
          }
          code={sliderSnippets.usage.disabled}
        />
      </section>
      {/* Hide Value */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Hide Value
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
                <Slider value={50} label="Volume" showValue={false} />
              </div>
            </div>
          }
          code={sliderSnippets.usage.hideValue}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The slider component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={sliderSnippets.customization} />
        <Typography variant="body">
          The slider component automatically uses these CSS variables. You can
          override them in your application to match your design system. The
          thumb color uses HSL format without the `hsl()` wrapper, allowing for
          easy color adjustments. Track colors use RGBA format for transparency
          control.
        </Typography>
      </section>
    </article>
  );
};
