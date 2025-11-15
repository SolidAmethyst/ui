import { Component } from "solid-js";
import { Button } from "../../../components/ui/button";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { EmptyState } from "../../../components/ui/empty-state";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { emptyStateSnippets } from "./code-snippets/empty-state-snippets";

export const EmptyStateDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">EmptyState</Typography>
      <Typography variant="body">
        Empty state component for displaying empty content states with icon,
        title, description, and optional action.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={emptyStateSnippets.imports} />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  display: "flex",
                  "justify-content": "center",
                  width: "100%",
                }}
              >
                <EmptyState
                  icon="inbox"
                  title="No items"
                  description="There are no items to display"
                  action={<Button size="sm">Add Item</Button>}
                />
              </div>
            </div>
          }
          code={emptyStateSnippets.usage.basicUsage}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The EmptyState component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={emptyStateSnippets.customization} />
        <Typography variant="body">
          The EmptyState component automatically uses these CSS variables. You
          can override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
