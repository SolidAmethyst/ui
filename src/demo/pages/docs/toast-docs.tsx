import { Component } from "solid-js";
import { Button } from "../../../components/ui/button";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { ToastProvider, useToast } from "../../../components/ui/toast";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { toastSnippets } from "./code-snippets/toast-snippets";

const ToastDemo: Component = () => {
  const toast = useToast();

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        "flex-wrap": "wrap",
        "justify-content": "center",
        "align-items": "center",
        width: "100%",
      }}
    >
      <Button
        size="sm"
        onClick={() =>
          toast.showToast({
            title: "Success!",
            description: "Operation completed successfully.",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.showToast({
            title: "Error!",
            description: "Something went wrong.",
            variant: "error",
          })
        }
      >
        Error
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.showToast({
            title: "Warning!",
            description: "Please be careful.",
            variant: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.showToast({
            title: "Info",
            description: "Here is some information.",
            variant: "info",
          })
        }
      >
        Info
      </Button>
    </div>
  );
};

export const ToastDocs: Component = () => {
  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Toast</Typography>
      <Typography variant="body">
        Toast notification system with success, error, warning, and info
        variants.
      </Typography>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={toastSnippets.imports} />
      </section>

      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <ToastProvider position="top-center">
                <ToastDemo />
              </ToastProvider>
            </div>
          }
          code={toastSnippets.usage.basicUsage}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The Toast component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={toastSnippets.customization} />
        <Typography variant="body">
          The Toast component automatically uses these CSS variables. You can
          override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
