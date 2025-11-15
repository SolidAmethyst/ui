import { Component, For, createEffect, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import type { SidebarItem } from "../../../components/ui/sidebar";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { App } from "../../../composites/app";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";
import { docsStyles } from "../../lib/docs.styles";
import { appSnippets } from "./code-snippets/app-snippets";

export const AppDocs: Component = () => {
  const [basicUsageDark, setBasicUsageDark] = createSignal(false);
  const [adaptiveLayoutDark, setAdaptiveLayoutDark] = createSignal(false);
  const [overlayModeDark, setOverlayModeDark] = createSignal(false);
  const [basicUsageOverridden, setBasicUsageOverridden] = createSignal(false);
  const [adaptiveLayoutOverridden, setAdaptiveLayoutOverridden] =
    createSignal(false);
  const [overlayModeOverridden, setOverlayModeOverridden] = createSignal(false);

  // Track previous global theme value to detect changes
  const [previousGlobalTheme, setPreviousGlobalTheme] = createSignal<
    boolean | undefined
  >(undefined);

  // Reset all local theme overrides when global theme changes
  createEffect(() => {
    const currentGlobalTheme = getThemeFromCSS();
    const prevTheme = previousGlobalTheme();
    // Check if global theme actually changed (skip initial undefined)
    if (prevTheme !== undefined && prevTheme !== currentGlobalTheme) {
      // Reset all override flags
      setBasicUsageOverridden(false);
      setAdaptiveLayoutOverridden(false);
      setOverlayModeOverridden(false);
      // Set local themes to match global theme
      setBasicUsageDark(currentGlobalTheme);
      setAdaptiveLayoutDark(currentGlobalTheme);
      setOverlayModeDark(currentGlobalTheme);
    }
    // Update previous value
    setPreviousGlobalTheme(currentGlobalTheme);
  });

  // Sync with global theme if not overridden locally
  createEffect(() => {
    if (!basicUsageOverridden()) {
      setBasicUsageDark(getThemeFromCSS());
    }
    if (!adaptiveLayoutOverridden()) {
      setAdaptiveLayoutDark(getThemeFromCSS());
    }
    if (!overlayModeOverridden()) {
      setOverlayModeDark(getThemeFromCSS());
    }
  });

  const toggleBasicTheme = () => {
    setBasicUsageOverridden(true);
    setBasicUsageDark(!basicUsageDark());
  };

  const toggleAdaptiveLayoutTheme = () => {
    setAdaptiveLayoutOverridden(true);
    setAdaptiveLayoutDark(!adaptiveLayoutDark());
  };

  const toggleOverlayModeTheme = () => {
    setOverlayModeOverridden(true);
    setOverlayModeDark(!overlayModeDark());
  };

  const sidebarItems: SidebarItem[] = [
    { label: "Home", icon: "home", onClick: () => console.log("Home") },
    {
      label: "Dashboard",
      icon: "dashboard",
      onClick: () => console.log("Dashboard"),
    },
    {
      label: "Settings",
      icon: "settings",
      onClick: () => console.log("Settings"),
    },
    { separator: true },
    {
      label: "Documents",
      icon: "description",
      onClick: () => console.log("Documents"),
    },
    { label: "Images", icon: "image", onClick: () => console.log("Images") },
    {
      label: "Videos",
      icon: "video_library",
      onClick: () => console.log("Videos"),
    },
    { separator: true },
    { label: "Help", icon: "help", onClick: () => console.log("Help") },
    { label: "About", icon: "info", onClick: () => console.log("About") },
  ];

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">App</Typography>
      <Typography variant="body">
        Full-featured application composition with Window, TitleBar, and Sidebar
      </Typography>
      {/* Installation */}
      <section style={{ "margin-bottom": "32px" }}>
        <Typography variant="h4" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={appSnippets.imports} />
      </section>
      {/* Basic Usage */}
      <section style={{ "margin-bottom": "32px" }}>
        <Typography variant="h4" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div
              data-app-preview
              style={{
                width: "100%",
                height: "600px",
                "box-sizing": "border-box",
                border: "1px solid hsl(var(--border))",
                "border-radius": "0",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <App
                toggleTheme={toggleBasicTheme}
                sidebarItems={sidebarItems}
                title="My Application"
              >
                <div
                  style={{
                    flex: "1",
                    "min-height": "0",
                    width: "100%",
                    "max-width": "100%",
                    padding: "32px",
                    "box-sizing": "border-box",
                    background: basicUsageDark()
                      ? "hsl(240 20% 10%)"
                      : "hsl(var(--card))",
                    overflow: "auto",
                  }}
                />
              </App>
            </div>
          }
          code={appSnippets.usage.basicUsage}
        />
      </section>
      {/* Adaptive Layout */}
      <section style={{ "margin-bottom": "32px" }}>
        <Typography variant="h4" as="h2">
          Adaptive Layout
        </Typography>
        <Tabs
          preview={
            <div
              data-app-preview
              style={{
                width: "100%",
                height: "600px",
                "box-sizing": "border-box",
                border: "1px solid hsl(var(--border))",
                "border-radius": "0",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <App
                toggleTheme={toggleAdaptiveLayoutTheme}
                sidebarItems={sidebarItems}
                title="My Application"
              >
                <div
                  style={{
                    flex: "1",
                    "min-height": "0",
                    width: "100%",
                    "max-width": "100%",
                    padding: "32px",
                    "box-sizing": "border-box",
                    background: adaptiveLayoutDark()
                      ? "hsl(240 20% 10%)"
                      : "hsl(var(--card))",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      "max-width": "min(100%, 1200px)",
                      "min-width": "0",
                      margin: "0 auto",
                      "box-sizing": "border-box",
                    }}
                  >
                    <Typography variant="h2" style={{ margin: "0 0 16px 0" }}>
                      Welcome to My Application
                    </Typography>
                    <div
                      style={{
                        display: "grid",
                        "grid-template-columns":
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px",
                        margin: "24px 0",
                        width: "100%",
                        "max-width": "100%",
                        "min-width": "0",
                        "box-sizing": "border-box",
                      }}
                    >
                      <For each={Array.from({ length: 6 })}>
                        {(_, i) => (
                          <div
                            style={{
                              padding: "24px",
                              "border-radius": "0",
                              background: adaptiveLayoutDark()
                                ? "hsl(var(--muted-foreground) / 50%)"
                                : "hsl(var(--foreground) / 80%)",
                              border: `1px solid hsl(var(--border))`,
                              "box-shadow": adaptiveLayoutDark()
                                ? "hsl(var(--background) / 30%)"
                                : "hsl(var(--background) / 10%)",
                              width: "100%",
                              "max-width": "100%",
                              "min-width": "0",
                              "box-sizing": "border-box",
                              overflow: "hidden",
                              "word-wrap": "break-word",
                              "overflow-wrap": "break-word",
                            }}
                          >
                            <Typography
                              variant="h4"
                              as="h3"
                              style={{ margin: "0 0 8px 0" }}
                            >
                              Card {i() + 1}
                            </Typography>
                            <Typography variant="small" style={{ margin: "0" }}>
                              This is a sample card in the main content area.
                            </Typography>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </App>
            </div>
          }
          code={appSnippets.usage.adaptiveLayout}
        />
      </section>
      {/* Overlay Menu */}
      <section style={{ "margin-bottom": "32px" }}>
        <Typography variant="h4" as="h2">
          Overlay Menu
        </Typography>
        <Tabs
          preview={
            <div
              data-app-preview
              style={{
                width: "100%",
                height: "600px",
                "box-sizing": "border-box",
                border: "1px solid hsl(var(--border))",
                "border-radius": "0",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <App
                toggleTheme={toggleOverlayModeTheme}
                sidebarItems={sidebarItems}
                overlayMode={true}
                title="My Application"
              >
                <div
                  style={{
                    flex: "1",
                    "min-height": "0",
                    width: "100%",
                    "max-width": "100%",
                    padding: "32px",
                    "box-sizing": "border-box",
                    background: overlayModeDark()
                      ? "hsl(240 20% 10%)"
                      : "hsl(var(--card))",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      "max-width": "min(100%, 1200px)",
                      "min-width": "0",
                      margin: "0 auto",
                      "box-sizing": "border-box",
                    }}
                  >
                    <Typography variant="h2" style={{ margin: "0 0 16px 0" }}>
                      Welcome to My Application
                    </Typography>
                    <div
                      style={{
                        display: "grid",
                        "grid-template-columns":
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px",
                        margin: "24px 0",
                        width: "100%",
                        "max-width": "100%",
                        "min-width": "0",
                        "box-sizing": "border-box",
                      }}
                    >
                      <For each={Array.from({ length: 6 })}>
                        {(_, i) => (
                          <div
                            style={{
                              padding: "24px",
                              "border-radius": "0",
                              background: overlayModeDark()
                                ? "hsl(var(--muted-foreground) / 50%)"
                                : "hsl(var(--foreground) / 80%)",
                              border: `1px solid hsl(var(--border))`,
                              "box-shadow": overlayModeDark()
                                ? "hsl(var(--background) / 30%)"
                                : "hsl(var(--background) / 10%)",
                              width: "100%",
                              "max-width": "100%",
                              "min-width": "0",
                              "box-sizing": "border-box",
                              overflow: "hidden",
                              "word-wrap": "break-word",
                              "overflow-wrap": "break-word",
                            }}
                          >
                            <Typography
                              variant="h4"
                              as="h3"
                              style={{ margin: "0 0 8px 0" }}
                            >
                              Card {i() + 1}
                            </Typography>
                            <Typography variant="small" style={{ margin: "0" }}>
                              This is a sample card in the main content area.
                            </Typography>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </App>
            </div>
          }
          code={appSnippets.usage.overlayMode}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The App component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={appSnippets.customization} />
        <Typography variant="body">
          The App component automatically uses these CSS variables. You can
          override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
