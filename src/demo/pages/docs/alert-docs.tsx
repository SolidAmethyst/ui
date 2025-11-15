import { Component } from "solid-js";
import { Alert } from "../../../components/ui/alert";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { alertSnippets } from "./code-snippets/alert-snippets";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

export const AlertDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Alert</Typography>
      <Typography variant="body">
        Alert component for displaying important messages or warnings inline.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={alertSnippets.imports} />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Variants
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  gap: "16px",
                  width: "100%",
                  "max-width": "500px",
                  margin: "0 auto",
                }}
              >
                <Alert
                  variant="success"
                  title="Success!"
                  description="Operation completed successfully."
                />
                <Alert
                  variant="error"
                  title="Error!"
                  description="Something went wrong."
                />
                <Alert
                  variant="warning"
                  title="Warning!"
                  description="Please be careful."
                />
                <Alert
                  variant="info"
                  title="Info"
                  description="Here is some information."
                />
              </div>
            </div>
          }
          code={alertSnippets.usage.variants}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The Alert component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={alertSnippets.customization} />
        <Typography variant="body">
          The Alert component automatically uses these CSS variables. You can
          override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
