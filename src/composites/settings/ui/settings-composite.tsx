/**
 * Settings Composite Component
 * Full-featured settings panel with sections for Glass, Fonts, and more
 */

import { Component, createMemo, createSignal, For, Show } from "solid-js";
import { getThemeFromCSS } from "../../../components/ui/glass/lib/theme-utils";
import { Scrollbar } from "../../../components/ui/scrollbar";
import { Select } from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { settingsCompositeStyles } from "../lib/settings-composite.styles";
import type {
  AppearanceSubcategory,
  FontFamily,
  FontSettings,
  GlassSettings,
  HighlightProfile,
  HighlightsSettings,
  MainCategory,
  SettingsCompositeProps,
} from "../model/types";
import { Settings } from "./settings";

export const SettingsComposite: Component<SettingsCompositeProps> = (props) => {
  const [activeMainCategory, setActiveMainCategory] =
    createSignal<MainCategory>("appearance");
  const [activeSubcategory, setActiveSubcategory] =
    createSignal<AppearanceSubcategory>("glass");

  const isDark = () => getThemeFromCSS();

  const glassSettings = createMemo<GlassSettings>(() => ({
    enabled: props.glassSettings?.enabled ?? false,
    blur: props.glassSettings?.blur ?? 15,
    opacity: props.glassSettings?.opacity ?? 0.9,
    darkness: props.glassSettings?.darkness ?? 1.0,
    saturation: props.glassSettings?.saturation ?? 1.0,
  }));

  const highlightsSettings = createMemo<HighlightsSettings>(() => ({
    profile: props.highlightsSettings?.profile ?? "default",
  }));

  const fontSettings = createMemo<FontSettings>(() => ({
    family: props.fontSettings?.family ?? "Inter",
  }));

  const handleGlassChange = (
    key: keyof GlassSettings,
    value: boolean | number,
  ) => {
    if (props.onGlassSettingsChange) {
      props.onGlassSettingsChange({
        ...glassSettings(),
        [key]: value,
      });
    }
  };

  const handleHighlightsChange = (profile: HighlightProfile) => {
    if (props.onHighlightsSettingsChange) {
      props.onHighlightsSettingsChange({
        profile,
      });
    }
  };

  const handleFontChange = (family: FontFamily) => {
    if (props.onFontSettingsChange) {
      props.onFontSettingsChange({
        family,
      });
      // Apply font immediately via CSS variable
      const fontFamilyMap: Record<FontFamily, string> = {
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
        "Work Sans":
          "'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        "Bebas Neue": "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
      };
      document.documentElement.style.setProperty(
        "--font-family",
        fontFamilyMap[family],
      );
    }
  };

  const highlightProfiles: Array<{
    id: HighlightProfile;
    label: string;
    description: string;
  }> = [
    {
      id: "default",
      label: "Default",
      description: "Standard syntax highlighting",
    },
    {
      id: "monokai",
      label: "Monokai",
      description: "Popular dark theme colors",
    },
    { id: "dracula", label: "Dracula", description: "Dark purple theme" },
    { id: "github", label: "GitHub", description: "GitHub-style highlighting" },
    {
      id: "vs-code",
      label: "VS Code",
      description: "Visual Studio Code theme",
    },
    { id: "one-dark", label: "One Dark", description: "Atom One Dark theme" },
  ];

  const mainCategories: Array<{
    id: MainCategory;
    label: string;
    icon: string;
  }> = [
    { id: "appearance", label: "Appearance", icon: "palette" },
    { id: "typography", label: "Typography", icon: "text_fields" },
  ];

  const appearanceSubcategories: Array<{
    id: AppearanceSubcategory;
    label: string;
    icon: string;
  }> = [
    { id: "glass", label: "Glass", icon: "blur" },
    { id: "theme", label: "Theme", icon: "dark_mode" },
    { id: "highlights", label: "Highlights", icon: "palette" },
  ];

  return (
    <Settings
      isOpen={props.isOpen}
      onClose={props.onClose}
      width="600px"
      class={props.class}
      style={props.style}
    >
      <div style={settingsCompositeStyles.container()}>
        {/* Categories Sidebar */}
        <aside style={settingsCompositeStyles.sidebar()}>
          <Scrollbar
            direction="vertical"
            style={{ width: "100%", height: "100%" }}
          >
            <For each={mainCategories}>
              {(category) => (
                <button
                  type="button"
                  onClick={() => {
                    setActiveMainCategory(category.id);
                    if (category.id === "appearance") {
                      setActiveSubcategory("glass");
                    }
                  }}
                  style={settingsCompositeStyles.categoryButton(
                    activeMainCategory() === category.id,
                  )}
                  onMouseEnter={(e) => {
                    if (activeMainCategory() !== category.id) {
                      e.currentTarget.style.backgroundColor =
                        "hsl(var(--muted) / 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeMainCategory() !== category.id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span
                    class="material-symbols-rounded"
                    style={settingsCompositeStyles.categoryIcon()}
                  >
                    {category.icon}
                  </span>
                  <span>{category.label}</span>
                </button>
              )}
            </For>
          </Scrollbar>
        </aside>

        {/* Content Area */}
        <Scrollbar
          direction="vertical"
          style={{
            ...settingsCompositeStyles.content(),
            width: "100%",
            height: "100%",
          }}
        >
          <div style={settingsCompositeStyles.contentArea()}>
            {/* Tabs for Appearance subcategories */}
            <Show when={activeMainCategory() === "appearance"}>
              <div style={settingsCompositeStyles.tabsContainer()}>
                <For each={appearanceSubcategories}>
                  {(subcategory) => (
                    <button
                      type="button"
                      onClick={() => setActiveSubcategory(subcategory.id)}
                      style={settingsCompositeStyles.tabButton(
                        activeSubcategory() === subcategory.id,
                      )}
                      onMouseEnter={(e) => {
                        const isActive = activeSubcategory() === subcategory.id;
                        if (isActive) {
                          Object.assign(
                            e.currentTarget.style,
                            settingsCompositeStyles.tabButtonHover(isActive),
                          );
                        } else {
                          e.currentTarget.style.color =
                            "hsl(var(--muted-foreground))";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const isActive = activeSubcategory() === subcategory.id;
                        Object.assign(
                          e.currentTarget.style,
                          settingsCompositeStyles.tabButton(isActive),
                        );
                      }}
                    >
                      {subcategory.label}
                    </button>
                  )}
                </For>
              </div>
            </Show>

            {/* Content for selected subcategory */}
            <div style={settingsCompositeStyles.contentArea()}>
              <Show
                when={
                  activeMainCategory() === "appearance" &&
                  activeSubcategory() === "glass"
                }
              >
                <section style={settingsCompositeStyles.section()}>
                  <h4 style={settingsCompositeStyles.sectionTitle()}>
                    Glass Effect
                  </h4>
                  <p style={settingsCompositeStyles.sectionDescription()}>
                    Customize the glass effect appearance and intensity.
                  </p>

                  {/* Enable/Disable Checkbox */}
                  <div style={settingsCompositeStyles.checkboxContainer()}>
                    <input
                      type="checkbox"
                      id="glass-enabled"
                      checked={glassSettings().enabled}
                      onChange={(e) =>
                        handleGlassChange("enabled", e.currentTarget.checked)
                      }
                      style={settingsCompositeStyles.checkbox()}
                    />
                    <label
                      for="glass-enabled"
                      style={settingsCompositeStyles.checkboxLabel()}
                    >
                      Enable Glass Effect
                    </label>
                  </div>

                  {/* Opacity Slider - First, always enabled */}
                  <div style={settingsCompositeStyles.controlContainer()}>
                    <Slider
                      value={glassSettings().opacity * 100}
                      min={0}
                      max={100}
                      step={1}
                      label="Opacity"
                      formatValue={(val) => `${val}%`}
                      onChange={(val) =>
                        handleGlassChange("opacity", val / 100)
                      }
                    />
                  </div>

                  {/* Blur Slider - Disabled when opacity is 0 */}
                  <div style={settingsCompositeStyles.controlContainer()}>
                    <Slider
                      value={glassSettings().blur}
                      min={0}
                      max={50}
                      step={1}
                      label="Blur"
                      formatValue={(val) => `${val}px`}
                      disabled={glassSettings().opacity === 0}
                      onChange={(val) => handleGlassChange("blur", val)}
                    />
                  </div>

                  {/* Saturation Slider - Disabled when opacity is 0 */}
                  <div style={settingsCompositeStyles.controlContainer()}>
                    <Slider
                      value={glassSettings().saturation * 100}
                      min={0}
                      max={200}
                      step={1}
                      label="Saturation"
                      formatValue={(val) => `${val}%`}
                      disabled={glassSettings().opacity === 0}
                      onChange={(val) =>
                        handleGlassChange("saturation", val / 100)
                      }
                    />
                  </div>

                  {/* Darkness Slider - Disabled when opacity is 0 */}
                  <div style={settingsCompositeStyles.controlContainer(true)}>
                    <Slider
                      value={glassSettings().darkness * 100}
                      min={0}
                      max={100}
                      step={1}
                      label="Darkness"
                      formatValue={(val) => `${val}%`}
                      disabled={glassSettings().opacity === 0}
                      onChange={(val) =>
                        handleGlassChange("darkness", val / 100)
                      }
                    />
                  </div>
                </section>
              </Show>

              <Show
                when={
                  activeMainCategory() === "appearance" &&
                  activeSubcategory() === "theme"
                }
              >
                <section style={settingsCompositeStyles.section()}>
                  <h4 style={settingsCompositeStyles.sectionTitle()}>Theme</h4>
                  <p style={settingsCompositeStyles.sectionDescription()}>
                    Choose the application theme.
                  </p>

                  <div
                    style={{
                      "margin-top": "24px",
                    }}
                  >
                    <Select
                      options={[
                        {
                          value: "light",
                          label: "Light",
                          description: "Light theme with bright colors",
                        },
                        {
                          value: "dark",
                          label: "Dark",
                          description: "Dark theme with dark colors",
                        },
                      ]}
                      value={isDark() ? "dark" : "light"}
                      onChange={(value) => {
                        if (props.onThemeChange) {
                          props.onThemeChange(value === "dark");
                        }
                      }}
                    />
                  </div>
                </section>
              </Show>

              <Show
                when={
                  activeMainCategory() === "appearance" &&
                  activeSubcategory() === "highlights"
                }
              >
                <section style={settingsCompositeStyles.section()}>
                  <h4 style={settingsCompositeStyles.sectionTitle()}>
                    Syntax Highlighting
                  </h4>
                  <p style={settingsCompositeStyles.sectionDescription()}>
                    Choose a color profile for code syntax highlighting.
                  </p>

                  <div
                    style={{
                      "margin-top": "24px",
                    }}
                  >
                    <Select
                      options={highlightProfiles.map((profile) => ({
                        value: profile.id,
                        label: profile.label,
                        description: profile.description,
                      }))}
                      value={highlightsSettings().profile}
                      onChange={(value) => handleHighlightsChange(value)}
                    />
                  </div>
                </section>
              </Show>

              <Show when={activeMainCategory() === "typography"}>
                <section style={settingsCompositeStyles.section()}>
                  <h4 style={settingsCompositeStyles.sectionTitle()}>
                    Font Family
                  </h4>
                  <p style={settingsCompositeStyles.sectionDescription()}>
                    Choose the font family for the entire application.
                  </p>

                  <div
                    style={{
                      "margin-top": "24px",
                    }}
                  >
                    <Select
                      options={[
                        {
                          value: "Inter",
                          label: "Inter",
                          description: "Modern, clean sans-serif (default)",
                        },
                        {
                          value: "Geist Sans",
                          label: "Geist Sans",
                          description: "Vercel's premium font",
                        },
                        {
                          value: "Plus Jakarta Sans",
                          label: "Plus Jakarta Sans",
                          description: "Geometric, modern sans-serif",
                        },
                        {
                          value: "Sora",
                          label: "Sora",
                          description: "Futuristic, tech-inspired",
                        },
                        {
                          value: "Outfit",
                          label: "Outfit",
                          description: "Geometric, minimal design",
                        },
                        {
                          value: "Space Grotesk",
                          label: "Space Grotesk",
                          description: "Unique, tech-style font",
                        },
                        {
                          value: "Manrope",
                          label: "Manrope",
                          description: "Rounded, friendly sans-serif",
                        },
                        {
                          value: "Poppins",
                          label: "Poppins",
                          description: "Geometric, versatile font",
                        },
                        {
                          value: "DM Sans",
                          label: "DM Sans",
                          description: "Clean, professional sans-serif",
                        },
                        {
                          value: "Work Sans",
                          label: "Work Sans",
                          description: "Optimized for screens",
                        },
                        {
                          value: "Bebas Neue",
                          label: "Bebas Neue",
                          description: "Bold, condensed display font",
                        },
                      ]}
                      value={fontSettings().family}
                      onChange={(value) =>
                        handleFontChange(value as FontFamily)
                      }
                    />
                  </div>
                </section>
              </Show>

              <Show
                when={
                  activeMainCategory() === "appearance" &&
                  activeSubcategory() === "typography"
                }
              >
                <section style={settingsCompositeStyles.section()}>
                  <h4 style={settingsCompositeStyles.sectionTitle()}>
                    Font Family
                  </h4>
                  <p style={settingsCompositeStyles.sectionDescription()}>
                    Choose the font family for the entire application.
                  </p>

                  <div
                    style={{
                      "margin-top": "24px",
                    }}
                  >
                    <Select
                      options={[
                        {
                          value: "Inter",
                          label: "Inter",
                          description: "Modern, clean sans-serif (default)",
                        },
                        {
                          value: "Geist Sans",
                          label: "Geist Sans",
                          description: "Vercel's premium font",
                        },
                        {
                          value: "Plus Jakarta Sans",
                          label: "Plus Jakarta Sans",
                          description: "Geometric, modern sans-serif",
                        },
                        {
                          value: "Sora",
                          label: "Sora",
                          description: "Futuristic, tech-inspired",
                        },
                        {
                          value: "Outfit",
                          label: "Outfit",
                          description: "Geometric, minimal design",
                        },
                        {
                          value: "Space Grotesk",
                          label: "Space Grotesk",
                          description: "Unique, tech-style font",
                        },
                        {
                          value: "Manrope",
                          label: "Manrope",
                          description: "Rounded, friendly sans-serif",
                        },
                        {
                          value: "Poppins",
                          label: "Poppins",
                          description: "Geometric, versatile font",
                        },
                        {
                          value: "DM Sans",
                          label: "DM Sans",
                          description: "Clean, professional sans-serif",
                        },
                        {
                          value: "Work Sans",
                          label: "Work Sans",
                          description: "Optimized for screens",
                        },
                        {
                          value: "Bebas Neue",
                          label: "Bebas Neue",
                          description: "Bold, condensed display font",
                        },
                      ]}
                      value={fontSettings().family}
                      onChange={(value) =>
                        handleFontChange(value as FontFamily)
                      }
                    />
                  </div>
                </section>
              </Show>
            </div>
          </div>
        </Scrollbar>
      </div>
    </Settings>
  );
};
