import { Component } from "solid-js"
import type { CheckboxTreeNode } from "../../../components/ui/checkbox-tree"
import { CheckboxTree } from "../../../components/ui/checkbox-tree"
import { CodeHighlight } from "../../../components/ui/code-highlight"
import { Tabs } from "../../../components/ui/tabs"
import { Typography } from "../../../components/ui/typography"
import { docsStyles } from "../../lib/docs.styles"
import { checkboxTreeSnippets } from "./code-snippets/checkbox-tree-snippets"

const mockTree: CheckboxTreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "Important_Report_Q4_2024_Final_Version.pdf" },
      { id: "1-2", label: "Budget_Analysis_2025_Comprehensive_Review.xlsx" },
      { id: "1-3", label: "Project_Proposal_Marketing_Initiative_Draft.docx" },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [
      { id: "2-1", label: "Product_Photography_Studio_Session_May_2024.jpg" },
      { id: "2-2", label: "Marketing_Campaign_Visual_Assets_High_Res.png" },
    ],
  },
  {
    id: "3",
    label: "Archive",
    children: [
      { id: "3-1", label: "Old_Projects_2023_Backup_Collection.zip" },
      { id: "3-2", label: "Legacy_Code_Repository_Historical_Records.tar.gz" },
    ],
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
          Usage
        </Typography>
        <Tabs
          preview={
            <div style={{ ...docsStyles.previewContainer(), "justify-content": "flex-start" }}>
              <CheckboxTree nodes={mockTree} material3={true} />
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
