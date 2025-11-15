import { Component } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { installationExamples } from "./code-snippets/installation-snippets";

export const InstallationDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Installation</Typography>
      <Typography variant="body">
        Get started with Solid UI Toolkit in your project.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Install from GitHub
        </Typography>
        <CodeHighlight code={installationExamples.install} />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Include Styles
        </Typography>
        <Typography variant="body" style={{ "margin-bottom": "12px" }}>
          Import the global styles in your main entry file:
        </Typography>
        <CodeHighlight code={installationExamples.includeStyles} />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Import Components
        </Typography>
        <Typography variant="body" style={{ "margin-bottom": "12px" }}>
          Import components as needed in your files:
        </Typography>
        <CodeHighlight code={installationExamples.importComponents} />
      </section>
    </article>
  );
};
