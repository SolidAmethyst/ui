/**
 * Settings Component Types
 * Universal settings panel component
 */

import type { JSX } from "solid-js";

/**
 * Main category types
 */
export type MainCategory = "appearance" | "typography";

/**
 * Appearance subcategory types
 */
export type AppearanceSubcategory = "glass" | "theme" | "highlights";

/**
 * Glass effect settings
 */
export interface GlassSettings {
  enabled: boolean;
  blur: number;
  opacity: number;
  darkness: number;
  saturation: number;
}

/**
 * Syntax highlighting color profile
 */
export type HighlightProfile =
  | "default"
  | "monokai"
  | "dracula"
  | "github"
  | "vs-code"
  | "one-dark";

/**
 * Highlights settings
 */
export interface HighlightsSettings {
  profile: HighlightProfile;
}

/**
 * Font family options
 */
export type FontFamily =
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
  | "Bebas Neue";

/**
 * Font settings
 */
export interface FontSettings {
  family: FontFamily;
}

export interface SettingsProps {
  /**
   * Whether the settings panel is open
   */
  isOpen: boolean;

  /**
   * Callback when panel should be closed
   */
  onClose: () => void;

  /**
   * Panel width (default: 320px)
   */
  width?: string;

  /**
   * Panel title
   */
  title?: string;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Settings sections/content
   */
  children?: JSX.Element;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}

export interface SettingsCompositeProps {
  /**
   * Whether the settings panel is open
   */
  isOpen: boolean;

  /**
   * Callback when panel should be closed
   */
  onClose: () => void;

  /**
   * Callback when theme changes
   */
  onThemeChange?: (isDark: boolean) => void;

  /**
   * Glass effect settings
   */
  glassSettings: GlassSettings;

  /**
   * Callback when glass settings change
   */
  onGlassSettingsChange: (settings: GlassSettings) => void;

  /**
   * Highlights settings
   */
  highlightsSettings?: HighlightsSettings;

  /**
   * Callback when highlights settings change
   */
  onHighlightsSettingsChange?: (settings: HighlightsSettings) => void;

  /**
   * Font settings
   */
  fontSettings?: FontSettings;

  /**
   * Callback when font settings change
   */
  onFontSettingsChange?: (settings: FontSettings) => void;

  /**
   * Additional CSS class names
   */
  class?: string;

  /**
   * Inline CSS styles
   */
  style?: JSX.CSSProperties;
}
