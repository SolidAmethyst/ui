import { Component } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { codeHighlightSnippets } from "./code-snippets/code-highlight-snippets";

export const CodeHighlightDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">CodeHighlight</Typography>
      <Typography variant="body">
        Syntax highlighting component for displaying code blocks with copy
        functionality.
      </Typography>

      <section style={{ "margin-bottom": "48px" }}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={codeHighlightSnippets.imports} />
      </section>

      <section style={{ "margin-bottom": "48px" }}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <CodeHighlight code={codeHighlightSnippets.examples.typescript} />
          }
          code={codeHighlightSnippets.basicUsage}
        />
      </section>

      <section style={{ "margin-bottom": "48px" }}>
        <Typography variant="h3" as="h2">
          Different Languages
        </Typography>
        <Tabs
          preview={
            <CodeHighlight code={codeHighlightSnippets.examples.javascript} />
          }
          code={`<CodeHighlight code="const x = 1" />`}
        />
      </section>

      <section style={{ "margin-bottom": "48px" }}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Tabs
          preview={
            <CodeHighlight
              code={codeHighlightSnippets.examples.typescript}
              class="custom-code"
            />
          }
          code={`${codeHighlightSnippets.withCustomClass}\n\n${codeHighlightSnippets.withCustomStyle}`}
        />
      </section>

      <section style={{ "margin-bottom": "48px" }}>
        <Typography variant="h3" as="h2">
          Features
        </Typography>
        <ul
          style={{
            "padding-left": "20px",
            margin: "0",
            "list-style": "disc",
          }}
        >
          <li>
            <Typography variant="body">
              Syntax highlighting for TypeScript/TSX/JavaScript/JSX/CSS
            </Typography>
          </li>
          <li>
            <Typography variant="body">
              Copy to clipboard functionality
            </Typography>
          </li>
          <li>
            <Typography variant="body">Dark and light theme support</Typography>
          </li>
          <li>
            <Typography variant="body">
              Customizable styles and classes
            </Typography>
          </li>
          <li>
            <Typography variant="body">Automatic HTML escaping</Typography>
          </li>
        </ul>
      </section>
    </article>
  );
};
