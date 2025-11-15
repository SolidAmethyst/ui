// Scrollbar context provider
// Provides global configuration to all scrollbar components

import {
  Component,
  createContext,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { scrollbarConfig, type ScrollbarConfig } from "./scrollbar-config";

interface ScrollbarContextValue {
  config: ScrollbarConfig;
  setEngineEnabled: (enabled: boolean) => void;
  setTheme: (theme: ScrollbarConfig["theme"]) => void;
  updateConfig: (updates: Partial<ScrollbarConfig>) => void;
}

const ScrollbarContext = createContext<ScrollbarContextValue>();

interface ScrollbarProviderProps {
  children: JSX.Element;
  config?: Partial<ScrollbarConfig>;
}

export const ScrollbarProvider: Component<ScrollbarProviderProps> = (props) => {
  // Initialize with current config (SSR-safe)
  const [config, setConfig] = createSignal(scrollbarConfig.getConfig());

  // Apply initial config if provided and subscribe to changes (client-side only)
  if (typeof window !== "undefined") {
    onMount(() => {
      // Apply initial config if provided
      if (props.config) {
        scrollbarConfig.updateConfig(props.config);
        setConfig(scrollbarConfig.getConfig());
      }

      // Subscribe to config changes
      const unsubscribe = scrollbarConfig.subscribe(setConfig);
      onCleanup(unsubscribe);
    });
  }

  const contextValue: ScrollbarContextValue = {
    get config() {
      return config();
    },
    setEngineEnabled: (enabled: boolean) => {
      scrollbarConfig.setEngineEnabled(enabled);
    },
    setTheme: (theme: ScrollbarConfig["theme"]) => {
      scrollbarConfig.setTheme(theme);
    },
    updateConfig: (updates: Partial<ScrollbarConfig>) => {
      scrollbarConfig.updateConfig(updates);
    },
  };

  return (
    <ScrollbarContext.Provider value={contextValue}>
      {props.children}
    </ScrollbarContext.Provider>
  );
};

export const useScrollbarConfig = () => {
  const context = useContext(ScrollbarContext);
  if (!context) {
    throw new Error("useScrollbarConfig must be used within ScrollbarProvider");
  }
  return context;
};
