import { Accessor, Component, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { FilterPanel } from "../../../composites/filter";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { filterBarSnippets } from "./code-snippets/filter-bar-snippets";
import type { FileTypeFilter } from "../../../composites/filter";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

interface FilterBarDocsProps {}

export const FilterBarDocs: Component<FilterBarDocsProps> = (props) => {
  const [filterPanelOpen, setFilterPanelOpen] = createSignal(false);
  const [fileTypes, setFileTypes] = createSignal<FileTypeFilter[]>([
    { id: "sql", label: ".sql", extension: "sql", checked: true },
    { id: "bat", label: ".bat", extension: "bat", checked: true },
    { id: "sh", label: ".sh", extension: "sh", checked: true },
    { id: "conf", label: ".conf", extension: "conf", checked: true },
    { id: "txt", label: ".txt", extension: "txt", checked: true },
    { id: "xml", label: ".xml", extension: "xml", checked: true },
    { id: "js", label: ".js", extension: "js", checked: true },
    { id: "ts", label: ".ts", extension: "ts", checked: true },
    { id: "tsx", label: ".tsx", extension: "tsx", checked: true },
    { id: "json", label: ".json", extension: "json", checked: true },
    { id: "md", label: ".md", extension: "md", checked: true },
    { id: "css", label: ".css", extension: "css", checked: true },
    { id: "html", label: ".html", extension: "html", checked: true },
    { id: "py", label: ".py", extension: "py", checked: true },
    { id: "java", label: ".java", extension: "java", checked: true },
    { id: "cpp", label: ".cpp", extension: "cpp", checked: true },
    { id: "go", label: ".go", extension: "go", checked: true },
    { id: "rs", label: ".rs", extension: "rs", checked: true },
    { id: "rb", label: ".rb", extension: "rb", checked: true },
    { id: "php", label: ".php", extension: "php", checked: true },
  ]);
  const [showHiddenFiles, setShowHiddenFiles] = createSignal(false);
  const [minFileSize, setMinFileSize] = createSignal(0);
  const [maxFileSize, setMaxFileSize] = createSignal(0);

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">FilterBar</Typography>
      <Typography variant="body">
        FilterPanel is a modal-based filter component with sections for file
        types, visibility, and size filtering. It provides a structured approach
        to filtering with clear sections and a reset button.
      </Typography>
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={filterBarSnippets.imports} />
      </section>
      {/* Filter Panel */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Filter Panel
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "600px",
                  margin: "0 auto",
                  display: "flex",
                  "flex-direction": "column",
                  gap: "16px",
                  "align-items": "stretch",
                }}
              >
                <button
                  type="button"
                  onClick={() => setFilterPanelOpen(true)}
                  style={{
                    padding: "8px 16px",
                    "font-size": "14px",
                    "font-weight": "500",
                    "border-radius": "6px",
                    border: `1px solid ${"hsl(var(--border))"}`,
                    background: false
                      ? "hsla(var(--muted) / 0.3)"
                      : "hsla(var(--muted) / 0.2)",
                    color: "hsl(var(--foreground))",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = false
                      ? "hsla(var(--muted) / 0.5)"
                      : "hsla(var(--muted) / 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = false
                      ? "hsla(var(--muted) / 0.3)"
                      : "hsla(var(--muted) / 0.2)";
                  }}
                >
                  Open Filters
                </button>
                <FilterPanel
                  isOpen={filterPanelOpen()}
                  onClose={() => setFilterPanelOpen(false)}
                  fileTypes={fileTypes()}
                  onFileTypesChange={setFileTypes}
                  showHiddenFiles={showHiddenFiles()}
                  onShowHiddenFilesChange={setShowHiddenFiles}
                  minFileSize={minFileSize()}
                  maxFileSize={maxFileSize()}
                  onFileSizeChange={(min, max) => {
                    setMinFileSize(min);
                    setMaxFileSize(max);
                  }}
                  size="md"
                />
              </div>
            </div>
          }
          code={filterBarSnippets.usage.filterPanel}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The FilterBar component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={filterBarSnippets.customization} />
        <Typography variant="body">
          The FilterBar component automatically uses these CSS variables. You
          can override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
