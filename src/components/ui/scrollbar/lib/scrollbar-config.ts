// Centralized scrollbar configuration
// Global engine settings and theme management

export interface ScrollbarConfig {
  engine: {
    enabled: boolean;
    autoDetect: boolean;
    fallbackToJS: boolean;
  };
  theme: {
    name: "default" | "minimal" | "modern" | "custom";
    customStyles?: Record<string, string>;
  };
  performance: {
    useRequestAnimationFrame: boolean;
    debounceMs: number;
    throttleMs: number;
  };
  accessibility: {
    keyboardNavigation: boolean;
    screenReaderSupport: boolean;
    highContrast: boolean;
  };
}

// Default configuration
export const defaultScrollbarConfig: ScrollbarConfig = {
  engine: {
    enabled: true,
    autoDetect: true,
    fallbackToJS: true,
  },
  theme: {
    name: "default",
  },
  performance: {
    useRequestAnimationFrame: true,
    debounceMs: 16,
    throttleMs: 8,
  },
  accessibility: {
    keyboardNavigation: true,
    screenReaderSupport: true,
    highContrast: false,
  },
};

// Global configuration store
class ScrollbarConfigManager {
  private config: ScrollbarConfig = defaultScrollbarConfig;
  private listeners: Set<(config: ScrollbarConfig) => void> = new Set();

  getConfig(): ScrollbarConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<ScrollbarConfig>): void {
    this.config = { ...this.config, ...updates };
    this.notifyListeners();
  }

  setEngineEnabled(enabled: boolean): void {
    this.updateConfig({
      engine: { ...this.config.engine, enabled },
    });
  }

  setTheme(theme: ScrollbarConfig["theme"]): void {
    this.updateConfig({ theme });
  }

  subscribe(listener: (config: ScrollbarConfig) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.config));
  }

  // Auto-detect engine availability - simplified for Solid UI Toolkit
  async detectEngineAvailability(): Promise<boolean> {
    // For Solid UI Toolkit, always return false (no engine available)
    return false;
  }

  // Smart engine detection
  async initialize(): Promise<void> {
    if (this.config.engine.autoDetect) {
      const engineAvailable = await this.detectEngineAvailability();
      this.setEngineEnabled(engineAvailable);
    }
  }
}

// Global instance
export const scrollbarConfig = new ScrollbarConfigManager();

// Initialize on import
scrollbarConfig.initialize();
