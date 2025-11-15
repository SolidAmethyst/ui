import { Component } from "solid-js";
import type { CheckboxTreeNode } from "../../../components/ui/checkbox-tree";
import { CheckboxTree } from "../../../components/ui/checkbox-tree";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { checkboxTreeSnippets } from "./code-snippets/checkbox-tree-snippets";

const mockTree: CheckboxTreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "File 1.txt" },
      { id: "1-2", label: "File 2.txt" },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [{ id: "2-1", label: "Photo.jpg" }],
  },
];

export const CheckboxTreeDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Checkbox Tree</Typography>
      <Typography variant="body">
        Hierarchical checkbox tree component with nested checkboxes and
        automatic parent-child state propagation.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={checkboxTreeSnippets.imports} />
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
                <div style={{ width: "auto", "flex-shrink": 0 }}>
                  <CheckboxTree nodes={mockTree} />
                </div>
              </div>
            </div>
          }
          code={checkboxTreeSnippets.usage.basicUsage}
        />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Material 3 Style
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
                <div style={{ width: "auto", "flex-shrink": 0 }}>
                  <CheckboxTree nodes={mockTree} material3={true} />
                </div>
              </div>
            </div>
          }
          code={checkboxTreeSnippets.usage.material3}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The CheckboxTree component uses CSS custom properties for theming.
          These variables are already defined in the library, but you can
          override them in your application's stylesheet to match your design
          system.
        </Typography>
        <CodeHighlight code={checkboxTreeSnippets.customization} />
        <Typography variant="body">
          The CheckboxTree component automatically uses these CSS variables. You
          can override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
