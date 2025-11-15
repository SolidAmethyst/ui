import { Component } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Timeline } from "../../../components/ui/timeline";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { timelineSnippets } from "./code-snippets/timeline-snippets";
import type { TimelineEvent } from "../../../components/ui/timeline";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Project Started",
    description: "Initial project setup and configuration",
    date: "2024-01-01",
    variant: "default",
  },
  {
    id: "2",
    title: "First Release",
    description: "Version 1.0.0 released to production",
    date: "2024-02-15",
    variant: "success",
  },
  {
    id: "3",
    title: "Bug Fix",
    description: "Critical bug fixed in authentication",
    date: "2024-03-01",
    variant: "warning",
  },
];

const variantEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Success Event",
    description: "Operation completed successfully",
    variant: "success",
  },
  {
    id: "2",
    title: "Error Event",
    description: "Something went wrong",
    variant: "error",
  },
  {
    id: "3",
    title: "Warning Event",
    description: "Please be careful",
    variant: "warning",
  },
  {
    id: "4",
    title: "Info Event",
    description: "Here is some information",
    variant: "info",
  },
];

const horizontalEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Step 1",
    description: "First step completed",
    date: "2024-01-01",
  },
  {
    id: "2",
    title: "Step 2",
    description: "Second step completed",
    date: "2024-01-02",
  },
  {
    id: "3",
    title: "Step 3",
    description: "Third step completed",
    date: "2024-01-03",
  },
];

export const TimelineDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Timeline</Typography>
      <Typography variant="body">
        Timeline component for displaying events in chronological order.
        Supports vertical and horizontal orientations with customizable variants
        and icons.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={timelineSnippets.imports} />
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
                <Timeline events={mockEvents} />
              </div>
            </div>
          }
          code={timelineSnippets.usage.basicUsage}
        />
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
                  width: "100%",
                  "max-width": "500px",
                  margin: "0 auto",
                }}
              >
                <Timeline events={variantEvents} />
              </div>
            </div>
          }
          code={timelineSnippets.usage.variants}
        />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Horizontal Orientation
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "700px",
                  margin: "0 auto",
                  overflow: "auto",
                }}
              >
                <Timeline events={horizontalEvents} orientation="horizontal" />
              </div>
            </div>
          }
          code={timelineSnippets.usage.horizontal}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The Timeline component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={timelineSnippets.customization} />
        <Typography variant="body">
          The Timeline component automatically uses these CSS variables. You can
          override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
