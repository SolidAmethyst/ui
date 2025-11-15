import { Component } from "solid-js";
import { Button } from "../../../components/ui/button";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tooltip } from "../../../components/ui/tooltip";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { tooltipSnippets } from "./code-snippets/tooltip-snippets";

export const TooltipDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Tooltip</Typography>
      <Typography variant="body">
        Tooltip component for displaying contextual information on hover or
        focus.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={tooltipSnippets.imports} />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Positions
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  "flex-wrap": "wrap",
                  "justify-content": "center",
                  padding: "40px",
                }}
              >
                <Tooltip content="Top Tooltip" position="top">
                  <Button>Top</Button>
                </Tooltip>
                <Tooltip content="Bottom Tooltip" position="bottom">
                  <Button>Bottom</Button>
                </Tooltip>
                <Tooltip content="Left Tooltip" position="left">
                  <Button>Left</Button>
                </Tooltip>
                <Tooltip content="Right Tooltip" position="right">
                  <Button>Right</Button>
                </Tooltip>
              </div>
            </div>
          }
          code={tooltipSnippets.usage.basicUsage}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The Tooltip component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={tooltipSnippets.customization} />
        <Typography variant="body">
          The Tooltip component automatically uses these CSS variables. You can
          override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
