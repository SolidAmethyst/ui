import { Component } from "solid-js";
import { Accordion } from "../../../components/ui/accordion";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { accordionSnippets } from "./code-snippets/accordion-snippets";
import type { AccordionItem } from "../../../components/ui/accordion";

const mockItems: AccordionItem[] = [
  {
    id: "1",
    header: "Section 1",
    content: "This is the content of section 1.",
  },
  {
    id: "2",
    header: "Section 2",
    content: "This is the content of section 2.",
  },
  {
    id: "3",
    header: "Section 3",
    content: "This is the content of section 3.",
  },
];

export const AccordionDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Accordion</Typography>
      <Typography variant="body">
        Accordion component with collapsible sections. Perfect for organizing
        content into expandable/collapsible panels.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={accordionSnippets.imports} />
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
                  width: "100%",
                  "max-width": "500px",
                  margin: "0 auto",
                }}
              >
                <Accordion items={mockItems} />
              </div>
            </div>
          }
          code={accordionSnippets.usage.basicUsage}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The Accordion component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={accordionSnippets.customization} />
        <Typography variant="body">
          The Accordion component automatically uses these CSS variables. You
          can override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
