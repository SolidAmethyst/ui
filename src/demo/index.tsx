import type { JSX } from "solid-js"
import { createEffect, createSignal, lazy, Show, Suspense } from "solid-js"
import { HighlightContext } from "../components/ui/code-highlight/lib/highlight-context"
import { Container } from "../components/ui/container"
import { ScrollbarProvider } from "../components/ui/scrollbar"
import { useScrollBoundary } from "../components/ui/scroll-boundary"
import type {
  FontSettings,
  GlassSettings,
  HighlightsSettings,
} from "../composites/settings"
import { SettingsComposite } from "../composites/settings"
import "../styles/globals.css"
import { Footer, Sidebar, TopNav } from "./components/layout"
import { BlocksPage } from "./pages/blocks-page"
import "./styles.css"

// Lazy load all docs components to reduce initial bundle size
const AccordionDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.AccordionDocs })),
);
const AlertDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.AlertDocs })),
);
const AppDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.AppDocs })),
);
const ButtonDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.ButtonDocs })),
);
const CheckboxTreeDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.CheckboxTreeDocs })),
);
const CodeHighlightDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.CodeHighlightDocs })),
);
const CommandDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.CommandDocs })),
);
const DragDropDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.DragDropDocs })),
);
const DrawerDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.DrawerDocs })),
);
const EmptyStateDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.EmptyStateDocs })),
);
const FileManagerDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.FileManagerDocs })),
);
const FilterBarDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.FilterBarDocs })),
);
const GridDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.GridDocs })),
);
const InstallationDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.InstallationDocs })),
);
const IntroductionDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.IntroductionDocs })),
);
const ModalDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.ModalDocs })),
);
const NumberInputDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.NumberInputDocs })),
);
const ProgressBarDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.ProgressBarDocs })),
);
const ScrollbarDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.ScrollbarDocs })),
);
const SearchDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.SearchDocs })),
);
const SidebarDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.SidebarDocs })),
);
const SliderDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.SliderDocs })),
);
const SplitPaneDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.SplitPaneDocs })),
);
const TableDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.TableDocs })),
);
const TabsDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.TabsDocs })),
);
const TechChipDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.TechChipDocs })),
);
const TimelineDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.TimelineDocs })),
);
const TitleBarDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.TitleBarDocs })),
);
const ToastDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.ToastDocs })),
);
const TooltipDocs = lazy(() =>
  import("./pages/docs").then((m) => ({ default: m.TooltipDocs })),
);

function App() {
  const [currentPage, setCurrentPage] = createSignal<
    "docs" | "blocks" | "settings"
  >("docs");
  const [currentComponent, setCurrentComponent] = createSignal<string | null>(
    "introduction",
  );

  // Use scroll boundary hook for smooth footer reveal
  const mainRef = useScrollBoundary({
    behavior: 'smooth',
    threshold: 10,
    enabled: true,
  });

  // Glass settings state
  const [glassEnabled, setGlassEnabled] = createSignal(true);
  const [glassBlur, setGlassBlur] = createSignal(0);
  const [glassOpacity, setGlassOpacity] = createSignal(0);
  const [glassDarkness, setGlassDarkness] = createSignal(0);
  const [glassSaturation, setGlassSaturation] = createSignal(0);

  // Highlights settings state
  const [highlightsProfile, setHighlightsProfile] = createSignal<
    "default" | "monokai" | "dracula" | "github" | "vs-code" | "one-dark"
  >("default");

  // Font settings state
  const [fontFamily, setFontFamily] = createSignal<
    | "Inter"
    | "Geist Sans"
    | "Plus Jakarta Sans"
    | "Sora"
    | "Outfit"
    | "Space Grotesk"
    | "Manrope"
    | "Poppins"
    | "DM Sans"
    | "Work Sans"
    | "Bebas Neue"
  >("Inter");

  // Initialize theme - always default to dark
  const getInitialTheme = (): "dark" | "light" => {
    if (typeof window === "undefined") return "dark";
    // Always default to dark theme
    const defaultTheme = "dark";
    // Set attribute SYNCHRONOUSLY before render
    document.documentElement.setAttribute("data-theme", defaultTheme);
    document.body.setAttribute("data-theme", defaultTheme);
    return defaultTheme;
  };

  const [theme, setTheme] = createSignal<"dark" | "light">(getInitialTheme());

  // Apply theme changes to document
  createEffect(() => {
    const currentTheme = theme();
    document.documentElement.setAttribute("data-theme", currentTheme);
    document.body.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  });

  const toggleTheme = () => {
    // Disable transitions before theme change
    document.documentElement.classList.add('disable-transitions');

    // Change theme
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    // Re-enable transitions after DOM updates (2 animation frames to ensure CSS vars applied)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('disable-transitions');
      });
    });
  };

  const handlePageChange = (page: "docs" | "blocks" | "settings") => {
    setCurrentPage(page);
    if (page === "docs") {
      setCurrentComponent("introduction");
    }
  };

  // Apply font on mount and when font changes
  createEffect(() => {
    const family = fontFamily();
    const fontFamilyMap: Record<string, string> = {
      Inter:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "Geist Sans":
        "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      "Plus Jakarta Sans":
        "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      Sora: "'Sora', -apple-system, BlinkMacSystemFont, sans-serif",
      Outfit: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      "Space Grotesk":
        "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
      Manrope: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      Poppins: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      "DM Sans": "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      "Work Sans": "'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      "Bebas Neue": "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
    };
    document.documentElement.style.setProperty(
      "--font-family",
      fontFamilyMap[family] || fontFamilyMap["Inter"],
    );
  });

  return (
    <ScrollbarProvider>
      <HighlightContext.Provider value={{ profile: highlightsProfile }}>
        <div
          data-theme={theme()}
          style={
            {
              "font-family":
                'var(--font-family, "Inter", -apple-system, BlinkMacSystemFont, sans-serif)',
              "min-height": "100vh",
              width: "100%",
              margin: "0",
              padding: "0",
              "box-sizing": "border-box",
              "overflow-x": "hidden",
              background: "hsl(var(--page-background))",
              color: "hsl(var(--foreground))",
              transition: "background 0.3s ease, color 0.3s ease",
              "--text-color": "hsl(var(--foreground))",
              "--icon-color": "hsl(var(--foreground))",
            } as JSX.CSSProperties & Record<`--${string}`, string>
          }
        >
          <TopNav
            toggleTheme={toggleTheme}
            currentPage={currentPage()}
            onPageChange={handlePageChange}
            glassEnabled={glassEnabled()}
            glassBlur={glassBlur()}
            glassOpacity={glassOpacity()}
            glassDarkness={glassDarkness()}
            glassSaturation={glassSaturation()}
          />

          <SettingsComposite
            isOpen={currentPage() === "settings"}
            onClose={() => setCurrentPage("docs")}
            onThemeChange={(isDark) => setTheme(isDark ? "dark" : "light")}
            glassSettings={{
              enabled: glassEnabled(),
              blur: glassBlur(),
              opacity: glassOpacity(),
              darkness: glassDarkness(),
              saturation: glassSaturation(),
            }}
            onGlassSettingsChange={(settings: GlassSettings) => {
              setGlassEnabled(settings.enabled);
              setGlassBlur(settings.blur);
              setGlassOpacity(settings.opacity);
              setGlassDarkness(settings.darkness);
              setGlassSaturation(settings.saturation);
            }}
            highlightsSettings={{
              profile: highlightsProfile(),
            }}
            onHighlightsSettingsChange={(settings: HighlightsSettings) => {
              setHighlightsProfile(settings.profile);
            }}
            fontSettings={{
              family: fontFamily(),
            }}
            onFontSettingsChange={(settings: FontSettings) => {
              setFontFamily(settings.family);
            }}
          />

          <div
            style={{
              filter: currentPage() === "settings" ? "blur(4px)" : "none",
              transition: "filter 300ms ease",
            }}
          >
            <Show when={currentPage() === "blocks"}>
              <BlocksPage />
            </Show>

            <Show
              when={currentPage() === "docs" || currentPage() === "settings"}
            >
              <div
                style={{
                  "padding-top": "60px",
                  width: "100%",
                  "box-sizing": "border-box",
                  position: "relative",
                  display: "flex",
                  "flex-direction": "column",
                }}
              >
                <Container
                  padding="0"
                  style={{
                    "min-height": "calc(100vh - 60px)",
                    display: "flex",
                    "flex-direction": "column",
                  }}
                >
                    <div
                      data-docs-container
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "calc(100vh - 60px)",
                        "box-sizing": "border-box",
                        gap: "0",
                        position: "relative",
                        padding: "24px 32px 0 32px",
                        "align-items": "stretch",
                      }}
                    >
                    {/* Debug line to check alignment */}
                    {/* <div
									style={{
										position: 'absolute',
										top: '24px',
										left: '32px',
										right: '32px',
										height: '2px',
										background: 'red',
										'z-index': '9999',
										'pointer-events': 'none'
									}}
								/> */}
                    <Sidebar
                      currentComponent={currentComponent()}
                      onComponentSelect={setCurrentComponent}
                    />
                    <main
                      ref={mainRef}
                      style={{
                        flex: "1",
                        "min-width": "0",
                        width: "100%",
                        height: "100%",
                        "box-sizing": "border-box",
                        padding: "0",
                        position: "relative",
                        margin: "0",
                        "overflow-y": "auto",
                        "overflow-x": "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          "max-width": "100%",
                          "box-sizing": "border-box",
                          padding: "0",
                        }}
                      >
                        <Suspense
                          fallback={
                            <div style={{ padding: "20px" }}>Loading...</div>
                          }
                        >
                          <Show when={currentComponent() === "introduction"}>
                            <IntroductionDocs />
                          </Show>
                          <Show when={currentComponent() === "installation"}>
                            <InstallationDocs />
                          </Show>
                          <Show when={currentComponent() === "accordion"}>
                            <AccordionDocs />
                          </Show>
                          <Show when={currentComponent() === "alert"}>
                            <AlertDocs />
                          </Show>
                          <Show when={currentComponent() === "button"}>
                            <ButtonDocs />
                          </Show>
                          <Show when={currentComponent() === "checkbox-tree"}>
                            <CheckboxTreeDocs />
                          </Show>
                          <Show when={currentComponent() === "code-highlight"}>
                            <CodeHighlightDocs />
                          </Show>
                          <Show when={currentComponent() === "command"}>
                            <CommandDocs />
                          </Show>
                          <Show when={currentComponent() === "drawer"}>
                            <DrawerDocs />
                          </Show>
                          <Show when={currentComponent() === "drag-drop"}>
                            <DragDropDocs />
                          </Show>
                          <Show when={currentComponent() === "empty-state"}>
                            <EmptyStateDocs />
                          </Show>
                          <Show when={currentComponent() === "file-manager"}>
                            <FileManagerDocs />
                          </Show>
                          <Show when={currentComponent() === "filter-bar"}>
                            <FilterBarDocs />
                          </Show>
                          <Show when={currentComponent() === "grid"}>
                            <GridDocs />
                          </Show>
                          <Show when={currentComponent() === "modal"}>
                            <ModalDocs />
                          </Show>
                          <Show when={currentComponent() === "number-input"}>
                            <NumberInputDocs />
                          </Show>
                          <Show when={currentComponent() === "progress-bar"}>
                            <ProgressBarDocs />
                          </Show>
                          <Show when={currentComponent() === "scrollbar"}>
                            <ScrollbarDocs />
                          </Show>
                          <Show when={currentComponent() === "search"}>
                            <SearchDocs />
                          </Show>
                          <Show when={currentComponent() === "sidebar"}>
                            <SidebarDocs />
                          </Show>
                          <Show when={currentComponent() === "slider"}>
                            <SliderDocs />
                          </Show>
                          <Show when={currentComponent() === "split-pane"}>
                            <SplitPaneDocs />
                          </Show>
                          <Show when={currentComponent() === "table"}>
                            <TableDocs />
                          </Show>
                          <Show when={currentComponent() === "tabs"}>
                            <TabsDocs />
                          </Show>
                          <Show when={currentComponent() === "timeline"}>
                            <TimelineDocs />
                          </Show>
                          <Show when={currentComponent() === "techchip"}>
                            <TechChipDocs />
                          </Show>
                          <Show when={currentComponent() === "toast"}>
                            <ToastDocs />
                          </Show>
                          <Show when={currentComponent() === "tooltip"}>
                            <TooltipDocs />
                          </Show>
                          <Show when={currentComponent() === "titlebar"}>
                            <TitleBarDocs />
                          </Show>
                          <Show when={currentComponent() === "app"}>
                            <AppDocs />
                          </Show>
                        </Suspense>
                      </div>
                    </main>
                    {/* Invisible spacer for symmetry with sidebar */}
                    <div
                      style={{
                        width: "220px",
                        "min-width": "220px",
                        "max-width": "220px",
                        height: "100%",
                        "flex-shrink": "0",
                        visibility: "hidden",
                        "pointer-events": "none",
                      }}
                    />
                    </div>
                    <Footer />
                  </Container>
              </div>
            </Show>
          </div>
        </div>
      </HighlightContext.Provider>
    </ScrollbarProvider>
  );
}

// Export for use in Astro
export default App;

// For Vite/standalone usage
if (typeof window !== "undefined") {
  // Ensure React is defined before rendering (for compatibility)
  if (!(window as any).React) {
    (window as any).React = {
      createElement: function () {
        return null;
      },
      Fragment: "Fragment",
      Component: class {},
      PureComponent: class {},
      createContext: function () {
        return {};
      },
      forwardRef: function (fn: any) {
        return fn;
      },
      memo: function (fn: any) {
        return fn;
      },
    };
  }

  // Wait for DOM to be ready
  const initApp = () => {
    const appElement = document.getElementById("app");
    if (appElement) {
      import("solid-js/web")
        .then(({ render }) => {
          render(() => <App />, appElement);
        })
        .catch((error) => {
          console.error("[App] Error loading solid-js/web:", error);
        });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
}
