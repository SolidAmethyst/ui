import { Component, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";
import { Search } from "../../../components/ui/search";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { searchSnippets } from "./code-snippets/search-snippets";

interface SearchDocsProps {}

export const SearchDocs: Component<SearchDocsProps> = (props) => {
  const [searchValue, setSearchValue] = createSignal("");
  const [debouncedValue, setDebouncedValue] = createSignal("");

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Search</Typography>
      <Typography variant="body">
        Search input component with debounce, clear button, and Material 3
        design. Perfect for implementing search functionality in your
        applications.
      </Typography>
      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={searchSnippets.imports} />
      </section>
      {/* Basic Usage */}
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
                  "max-width": "400px",
                }}
              >
                <Search
                  placeholder="Search..."
                  onSearch={(value) => {
                    setDebouncedValue(value);
                  }}
                />
                {debouncedValue() && (
                  <Typography
                    variant="small"
                    style={{ "margin-top": "8px", opacity: 0.7 }}
                  >
                    Searching for: {debouncedValue()}
                  </Typography>
                )}
              </div>
            </div>
          }
          code={searchSnippets.basic}
        />
      </section>
      {/* Controlled Value */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Controlled Value
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                }}
              >
                <Search
                  value={searchValue()}
                  placeholder="Search users..."
                  onSearch={(value) => {
                    setSearchValue(value);
                  }}
                />
                {searchValue() && (
                  <Typography
                    variant="small"
                    style={{ "margin-top": "8px", opacity: 0.7 }}
                  >
                    Current value: {searchValue()}
                  </Typography>
                )}
              </div>
            </div>
          }
          code={searchSnippets.withValue}
        />
      </section>
      {/* Custom Debounce */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Custom Debounce Delay
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                }}
              >
                <Search
                  placeholder="Search (500ms debounce)..."
                  debounceMs={500}
                  onSearch={(value) => console.log("Search:", value)}
                />
              </div>
            </div>
          }
          code={searchSnippets.withDebounce}
        />
      </section>
      {/* Without Icon */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Without Icon
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                }}
              >
                <Search
                  placeholder="Search without icon..."
                  showIcon={false}
                  onSearch={(value) => console.log(value)}
                />
              </div>
            </div>
          }
          code={searchSnippets.withoutIcon}
        />
      </section>
      {/* Without Clear Button */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Without Clear Button
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                }}
              >
                <Search
                  placeholder="Search (no clear button)..."
                  showClear={false}
                  onSearch={(value) => console.log(value)}
                />
              </div>
            </div>
          }
          code={searchSnippets.withoutClear}
        />
      </section>
      {/* Disabled State */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Disabled State
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                }}
              >
                <Search placeholder="Search..." disabled />
              </div>
            </div>
          }
          code={searchSnippets.disabled}
        />
      </section>
      {/* Input and Search Callbacks */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Input and Search Callbacks
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                }}
              >
                <Search
                  placeholder="Type to see callbacks..."
                  onInput={(value) => console.log("Immediate:", value)}
                  onSearch={(value) => console.log("Debounced:", value)}
                />
              </div>
            </div>
          }
          code={searchSnippets.withInputCallback}
        />
      </section>
      {/* Props */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Props
        </Typography>
        <div
          style={{
            width: "100%",
            overflow: "auto",
            "margin-top": "16px",
            "border-radius": "8px",
            border: `1px solid ${"hsl(var(--border))"}`,
            background: getThemeFromCSS()
              ? "hsl(var(--foreground) / 2%)"
              : "hsl(var(--muted) / 2%)",
          }}
        >
          <table
            style={{
              width: "100%",
              "border-collapse": "collapse",
              "font-size": "0.875rem",
            }}
          >
            <thead>
              <tr
                style={{
                  background: getThemeFromCSS()
                    ? "hsl(var(--foreground) / 5%)"
                    : "hsl(var(--muted) / 5%)",
                  "border-bottom": `1px solid ${"hsl(var(--border))"}`,
                }}
              >
                <th
                  style={{
                    padding: "12px 16px",
                    "text-align": "left",
                    "font-weight": "600",
                    "font-size": "0.75rem",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.05em",
                    color: getThemeFromCSS()
                      ? "hsl(var(--foreground) / 80%)"
                      : "hsl(var(--muted) / 80%)",
                  }}
                >
                  Prop
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    "text-align": "left",
                    "font-weight": "600",
                    "font-size": "0.75rem",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.05em",
                    color: getThemeFromCSS()
                      ? "hsl(var(--foreground) / 80%)"
                      : "hsl(var(--muted) / 80%)",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    "text-align": "left",
                    "font-weight": "600",
                    "font-size": "0.75rem",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.05em",
                    color: getThemeFromCSS()
                      ? "hsl(var(--foreground) / 80%)"
                      : "hsl(var(--muted) / 80%)",
                  }}
                >
                  Default
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    "text-align": "left",
                    "font-weight": "600",
                    "font-size": "0.75rem",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.05em",
                    color: getThemeFromCSS()
                      ? "hsl(var(--foreground) / 80%)"
                      : "hsl(var(--muted) / 80%)",
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    value
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    string
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  -
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Current search value (controlled)
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    placeholder
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    string
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    &quot;Search...&quot;
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Placeholder text
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    disabled
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    boolean
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    false
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Whether the search is disabled
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    isDark
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    boolean | (() =&gt; boolean)
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    false
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Dark theme mode
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    debounceMs
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    number
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    300
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Debounce delay in milliseconds
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    onSearch
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    (value: string) =&gt; void
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  -
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Callback fired after debounce
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    onInput
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    (value: string) =&gt; void
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  -
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Callback fired immediately on input change
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    showIcon
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    boolean
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    true
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Show search icon
                </td>
              </tr>
              <tr
                style={{
                  "border-bottom": `1px solid hsl(var(--border))`,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    showClear
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    boolean
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    true
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Show clear button when value is present
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    autofocus
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      color: getThemeFromCSS()
                        ? "hsl(var(--muted-foreground) / 90%)"
                        : "hsl(var(--muted) / 90%)",
                    }}
                  >
                    boolean
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <code
                    style={{
                      "font-size": "0.8125rem",
                      "font-family": "monospace",
                      background: "hsl(var(--border))",
                      padding: "2px 6px",
                      "border-radius": "4px",
                    }}
                  >
                    false
                  </code>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Auto-focus the input on mount
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The search component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={searchSnippets.customization} />
        <Typography variant="body">
          The search component automatically uses these CSS variables. You can
          override them in your application to match your design system. All
          spacing values use standard CSS units (px, rem, em, %).
        </Typography>
      </section>
    </article>
  );
};
