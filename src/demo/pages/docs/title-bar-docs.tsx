import { Component, createEffect, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { TitleBar } from "../../../composites/title-bar";
import { docsStyles } from "../../lib/docs.styles";
import { titleBarSnippets } from "./code-snippets/title-bar-snippets";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";

export const TitleBarDocs: Component = () => {
  const [maximized, setMaximized] = createSignal(false);
  const [pinned, setPinned] = createSignal(false);
  const [basicUsageDark, setBasicUsageDark] = createSignal(false);
  const [minimalExampleDark, setMinimalExampleDark] = createSignal(false);
  const [windowControlsDark, setWindowControlsDark] = createSignal(false);
  const [basicUsageOverridden, setBasicUsageOverridden] = createSignal(false);
  const [minimalExampleOverridden, setMinimalExampleOverridden] =
    createSignal(false);
  const [windowControlsOverridden, setWindowControlsOverridden] =
    createSignal(false);

  // Track previous global theme value to detect changes
  const [previousGlobalTheme, setPreviousGlobalTheme] = createSignal<
    boolean | undefined
  >(undefined);

  // Get global theme
  const globalIsDark = () => getThemeFromCSS();

  // Reset all local theme overrides when global theme changes
  createEffect(() => {
    const currentGlobalTheme = globalIsDark();
    const prevTheme = previousGlobalTheme();
    // Check if global theme actually changed (skip initial undefined)
    if (prevTheme !== undefined && prevTheme !== currentGlobalTheme) {
      // Reset all override flags
      setBasicUsageOverridden(false);
      setMinimalExampleOverridden(false);
      setWindowControlsOverridden(false);
      // Set local themes to match global theme
      setBasicUsageDark(currentGlobalTheme);
      setMinimalExampleDark(currentGlobalTheme);
      setWindowControlsDark(currentGlobalTheme);
    }
    // Update previous value
    setPreviousGlobalTheme(currentGlobalTheme);
  });

  // Sync with global theme if not overridden locally
  createEffect(() => {
    if (!basicUsageOverridden()) {
      setBasicUsageDark(globalIsDark());
    }
    if (!minimalExampleOverridden()) {
      setMinimalExampleDark(globalIsDark());
    }
    if (!windowControlsOverridden()) {
      setWindowControlsDark(globalIsDark());
    }
  });

  const toggleBasicTheme = () => {
    setBasicUsageOverridden(true);
    setBasicUsageDark(!basicUsageDark());
  };

  const toggleMinimalTheme = () => {
    setMinimalExampleOverridden(true);
    setMinimalExampleDark(!minimalExampleDark());
  };

  const toggleWindowControlsTheme = () => {
    setWindowControlsOverridden(true);
    setWindowControlsDark(!windowControlsDark());
  };

  const handleMinimize = () => {
    console.log("Minimize clicked");
  };

  const handleMaximize = () => {
    setMaximized(!maximized());
  };

  const handleClose = () => {
    console.log("Close clicked");
  };

  const handlePin = () => {
    setPinned(!pinned());
  };

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">TitleBar</Typography>
      <Typography variant="body">
        Composite component for application title bar with controls, burger
        menu, and window management buttons.
      </Typography>
      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={titleBarSnippets.imports} />
      </section>
      {/* Basic Usage */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div
              style={{
                width: "100%",
                "box-sizing": "border-box",
                background: globalIsDark()
                  ? "hsl(var(--background) / 30%)"
                  : "hsl(var(--foreground) / 30%)",
                border: `1px solid hsl(var(--border))`,
                "border-radius": "8px",
                overflow: "hidden",
              }}
            >
              <TitleBar
                title="Physics Engine Demo"
                onBurgerClick={() => console.log("Burger clicked")}
                onThemeToggle={toggleBasicTheme}
                onDebugClick={() => console.log("Debug clicked")}
                onPinClick={handlePin}
                onSettingsClick={() => console.log("Settings clicked")}
                onMinimizeClick={handleMinimize}
                onMaximizeClick={handleMaximize}
                onCloseClick={handleClose}
                maximized={maximized()}
                pinned={pinned()}
              />
            </div>
          }
          code={titleBarSnippets.usage.basicUsage}
        />
      </section>
      {/* Minimal Example */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Minimal Example
        </Typography>
        <Tabs
          preview={
            <div
              style={{
                width: "100%",
                "box-sizing": "border-box",
                background: globalIsDark()
                  ? "hsl(var(--background) / 30%)"
                  : "hsl(var(--foreground) / 30%)",
                border: `1px solid hsl(var(--border))`,
                "border-radius": "8px",
                overflow: "hidden",
              }}
            >
              <TitleBar
                title="My Application"
                onThemeToggle={toggleMinimalTheme}
              />
            </div>
          }
          code={titleBarSnippets.usage.minimalExample}
        />
      </section>
      {/* With Window Controls Only */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          With Window Controls
        </Typography>
        <Tabs
          preview={
            <div
              style={{
                width: "100%",
                "box-sizing": "border-box",
                background: globalIsDark()
                  ? "hsl(var(--background) / 30%)"
                  : "hsl(var(--foreground) / 30%)",
                border: `1px solid hsl(var(--border))`,
                "border-radius": "8px",
                overflow: "hidden",
              }}
            >
              <TitleBar
                title="Window Title"
                onMinimizeClick={handleMinimize}
                onMaximizeClick={handleMaximize}
                onCloseClick={handleClose}
                onThemeToggle={toggleWindowControlsTheme}
                maximized={maximized()}
              />
            </div>
          }
          code={titleBarSnippets.usage.windowControls}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The TitleBar component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight
          code={`@layer base {
  :root {
    --title-bar-background: 0 0% 100%;
    --title-bar-foreground: 222.2 84% 4.9%;
    --title-bar-accent: 210 40% 96%;
    --title-bar-separator: 214.3 31.8% 91.4%;
    --title-bar-close-hover: 0 84.2% 60.2%;
  }

  .dark,
  [data-theme="dark"] {
    --title-bar-background: 222.2 84% 4.9%;
    --title-bar-foreground: 210 40% 98%;
    --title-bar-accent: 217.2 32.6% 17.5%;
    --title-bar-separator: 217.2 32.6% 17.5%;
    --title-bar-close-hover: 0 62.8% 30.6%;
  }
}`}
        />
        <Typography variant="body">
          The TitleBar component automatically uses these CSS variables. You can
          override them in your application to match your design system. All
          colors use HSL format without the `hsl()` wrapper, allowing for easy
          opacity adjustments.
        </Typography>
      </section>
    </article>
  );
};
