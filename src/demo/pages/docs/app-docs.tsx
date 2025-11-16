import { Component, For, createEffect, createSignal, onMount, onCleanup } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import type { SidebarItem } from "../../../components/ui/sidebar";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { App } from "../../../composites/app";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";
import { docsStyles } from "../../lib/docs.styles";
import { appSnippets } from "./code-snippets/app-snippets";

export const AppDocs: Component = () => {
  const [basicUsageDark, setBasicUsageDark] = createSignal(getThemeFromCSS());
  const [adaptiveLayoutDark, setAdaptiveLayoutDark] = createSignal(getThemeFromCSS());
  const [overlayModeDark, setOverlayModeDark] = createSignal(getThemeFromCSS());
  const [basicUsageOverridden, setBasicUsageOverridden] = createSignal(false);
  const [adaptiveLayoutOverridden, setAdaptiveLayoutOverridden] =
    createSignal(false);
  const [overlayModeOverridden, setOverlayModeOverridden] = createSignal(false);

  // Track global theme as a signal for reactivity
  const [globalTheme, setGlobalTheme] = createSignal(getThemeFromCSS());
  const [previousGlobalTheme, setPreviousGlobalTheme] = createSignal<boolean | undefined>(undefined);

  // Sync with global theme if not overridden locally
  onMount(() => {
    // Initial sync
    const initialGlobalTheme = getThemeFromCSS();
    setGlobalTheme(initialGlobalTheme);
    setPreviousGlobalTheme(initialGlobalTheme);
    if (!basicUsageOverridden()) {
      setBasicUsageDark(initialGlobalTheme);
    }
    if (!adaptiveLayoutOverridden()) {
      setAdaptiveLayoutDark(initialGlobalTheme);
    }
    if (!overlayModeOverridden()) {
      setOverlayModeDark(initialGlobalTheme);
    }

    // Watch for changes to global theme on document.documentElement
    const observer = new MutationObserver(() => {
      const currentGlobalTheme = getThemeFromCSS();
      const prevTheme = previousGlobalTheme();

      // Check if global theme actually changed
      if (prevTheme !== undefined && prevTheme !== currentGlobalTheme) {
        // Global theme was changed - reset all overrides and sync all local themes
        setBasicUsageOverridden(false);
        setAdaptiveLayoutOverridden(false);
        setOverlayModeOverridden(false);
        setBasicUsageDark(currentGlobalTheme);
        setAdaptiveLayoutDark(currentGlobalTheme);
        setOverlayModeDark(currentGlobalTheme);
      } else {
        // Just update the signal, but don't force sync if not changed
        if (!basicUsageOverridden()) {
          setBasicUsageDark(currentGlobalTheme);
        }
        if (!adaptiveLayoutOverridden()) {
          setAdaptiveLayoutDark(currentGlobalTheme);
        }
        if (!overlayModeOverridden()) {
          setOverlayModeDark(currentGlobalTheme);
        }
      }

      setGlobalTheme(currentGlobalTheme);
      setPreviousGlobalTheme(currentGlobalTheme);
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme", "class"],
      });
    }

    onCleanup(() => {
      observer.disconnect();
    });
  });

  // Sync reactively when global theme changes (but only if not overridden)
  createEffect(() => {
    const currentGlobalTheme = globalTheme();
    const prevTheme = previousGlobalTheme();

    // If global theme changed, reset overrides and force sync
    if (prevTheme !== undefined && prevTheme !== currentGlobalTheme) {
      setBasicUsageOverridden(false);
      setAdaptiveLayoutOverridden(false);
      setOverlayModeOverridden(false);
      setBasicUsageDark(currentGlobalTheme);
      setAdaptiveLayoutDark(currentGlobalTheme);
      setOverlayModeDark(currentGlobalTheme);
      setPreviousGlobalTheme(currentGlobalTheme);
    } else {
      // Only sync if not overridden locally
      if (!basicUsageOverridden()) {
        setBasicUsageDark(currentGlobalTheme);
      }
      if (!adaptiveLayoutOverridden()) {
        setAdaptiveLayoutDark(currentGlobalTheme);
      }
      if (!overlayModeOverridden()) {
        setOverlayModeDark(currentGlobalTheme);
      }
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
              data-theme={basicUsageDark() ? "dark" : "light"}
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
                    background: "hsl(var(--background))",
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
              data-theme={adaptiveLayoutDark() ? "dark" : "light"}
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
                    background: "hsl(var(--background))",
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
                              background: "hsl(var(--card))",
                              border: `1px solid hsl(var(--border))`,
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
                              style={{
                                margin: "0 0 8px 0",
                                color: "hsl(var(--card-foreground))",
                              }}
                            >
                              Card {i() + 1}
                            </Typography>
                            <Typography
                              variant="small"
                              style={{
                                margin: "0",
                                color: "hsl(var(--card-foreground))",
                              }}
                            >
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
              data-theme={overlayModeDark() ? "dark" : "light"}
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
                    background: "hsl(var(--background))",
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
                              background: "hsl(var(--card))",
                              border: `1px solid hsl(var(--border))`,
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
                              style={{
                                margin: "0 0 8px 0",
                                color: "hsl(var(--card-foreground))",
                              }}
                            >
                              Card {i() + 1}
                            </Typography>
                            <Typography
                              variant="small"
                              style={{
                                margin: "0",
                                color: "hsl(var(--card-foreground))",
                              }}
                            >
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
