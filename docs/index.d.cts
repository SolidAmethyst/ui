import * as solid_js from 'solid-js';
import { JSX, Component } from 'solid-js';
export { JSX } from 'solid-js';
import { ClassValue } from 'clsx';

type ScrollbarDirection$1 = "vertical" | "horizontal";
type ScrollbarTheme$1 = "default" | "minimal" | "modern";
interface ScrollbarProps {
    children: JSX.Element;
    direction?: ScrollbarDirection$1;
    theme?: ScrollbarTheme$1;
    class?: string;
    style?: any;
    showArrows?: boolean;
    autoHide?: boolean;
    minThumbSize?: number;
    engineIntegration?: boolean;
}
interface ScrollbarState {
    thumbSize: number;
    thumbPosition: number;
    isVisible: boolean;
    isDragging: boolean;
    dragOffset: number;
    showArrows: boolean;
    canScrollUp: boolean;
    canScrollDown: boolean;
}

declare const Scrollbar: (props: ScrollbarProps) => solid_js.JSX.Element;

interface ScrollbarArrowsProps {
    direction: "horizontal" | "vertical";
    canScrollUp: boolean;
    canScrollDown: boolean;
    onScrollBy: (amount: number) => void;
}
declare const ScrollbarArrows: Component<ScrollbarArrowsProps>;

interface ScrollbarThumbProps {
    direction: "horizontal" | "vertical";
    thumbSize: number;
    thumbPosition: number;
    isDragging: boolean;
    onMouseDown: (e: MouseEvent) => void;
}
declare const ScrollbarThumb: Component<ScrollbarThumbProps>;

declare function useScrollbarHandlers(state: any, setState: any, direction: () => string, _containerRef: () => HTMLDivElement | undefined, contentRef: () => HTMLDivElement | undefined, trackRef: () => HTMLDivElement | undefined, thumbRef: () => HTMLDivElement | undefined, engineIntegration: () => boolean, updateScrollbar?: () => void): {
    scrollBy: (amount: number) => void;
    handleWheel: (e: WheelEvent) => void;
    handleThumbMouseDown: (e: MouseEvent) => Promise<void>;
    handleMouseMove: (e: MouseEvent) => Promise<void>;
    handleMouseUp: () => void;
    handleTrackClick: (e: MouseEvent) => void;
};

declare function useScrollbarLogic(state: any, setState: any, direction: () => string, containerRef: () => HTMLDivElement | undefined, contentRef: () => HTMLDivElement | undefined, trackRef: () => HTMLDivElement | undefined, _minThumbSize: () => number): {
    updateScrollbar: () => void;
    handleScroll: () => void;
};

declare function useScrollbarObservers(containerRef: () => HTMLDivElement | undefined, contentRef: () => HTMLDivElement | undefined, updateCallback: () => void): {
    setupObservers: () => (() => void) | undefined;
};

declare function useScrollbarState(props: any): {
    state: solid_js.Accessor<ScrollbarState>;
    setState: solid_js.Setter<ScrollbarState>;
    isHovered: solid_js.Accessor<boolean>;
    setIsHovered: solid_js.Setter<boolean>;
    hideTimeout: solid_js.Accessor<NodeJS.Timeout | null>;
    setHideTimeout: solid_js.Setter<NodeJS.Timeout | null>;
    direction: () => any;
    theme: () => any;
    autoHide: () => any;
    minThumbSize: () => any;
    engineIntegration: () => any;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
};

interface ScrollbarConfig {
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
declare class ScrollbarConfigManager {
    private config;
    private listeners;
    getConfig(): ScrollbarConfig;
    updateConfig(updates: Partial<ScrollbarConfig>): void;
    setEngineEnabled(enabled: boolean): void;
    setTheme(theme: ScrollbarConfig["theme"]): void;
    subscribe(listener: (config: ScrollbarConfig) => void): () => void;
    private notifyListeners;
    detectEngineAvailability(): Promise<boolean>;
    initialize(): Promise<void>;
}
declare const scrollbarConfig: ScrollbarConfigManager;

declare const ScrollbarControls: (props: {
    class?: string;
}) => solid_js.JSX.Element;

interface ScrollbarContextValue {
    config: ScrollbarConfig;
    setEngineEnabled: (enabled: boolean) => void;
    setTheme: (theme: ScrollbarConfig["theme"]) => void;
    updateConfig: (updates: Partial<ScrollbarConfig>) => void;
}
declare const ScrollbarProvider: (props: {
    children: JSX.Element;
    config?: Partial<ScrollbarConfig>;
}) => JSX.Element;
declare const useScrollbarConfig: () => ScrollbarContextValue;

declare const scrollbarStyles = "\n.scrollbar-container {\n  position: relative;\n  overflow: hidden;\n}\n.scrollbar-content {\n  height: 100%;\n  width: 100%;\n  overflow-y: auto;\n  overflow-x: auto;\n  scrollbar-width: none !important;\n  -ms-overflow-style: none !important;\n}\n.scrollbar-content::-webkit-scrollbar {\n  display: none !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n.scrollbar-track {\n  position: absolute;\n  z-index: 999;\n  background: transparent;\n  opacity: 0;\n  transition: opacity 300ms ease-in-out;\n}\n.scrollbar-track.visible {\n  opacity: 1;\n}\n.scrollbar-track-vertical {\n  top: 0;\n  right: 0;\n  width: 12px;\n  height: 100%;\n}\n.scrollbar-track-horizontal {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 12px;\n}\n.scrollbar-thumb {\n  position: absolute;\n  background: rgba(59, 130, 246, 0.8);\n  border-radius: 2px;\n  cursor: grab;\n  transition: background 100ms ease;\n  z-index: 99999;\n  min-width: 1px;\n  min-height: 1px;\n}\n.scrollbar-thumb:hover {\n  background: rgba(59, 130, 246, 0.8);\n}\n.scrollbar-thumb:active,\n.scrollbar-thumb.dragging {\n  background: rgba(59, 130, 246, 1);\n  cursor: grabbing;\n}\n.scrollbar-arrow {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: bold;\n  color: #6b7280;\n  transition: color 150ms ease;\n  z-index: 1000;\n  padding: 0;\n  margin: 0;\n}\n.scrollbar-arrow:hover {\n  color: #3b82f6;\n}\n.scrollbar-arrow:active {\n  color: #1d4ed8;\n}\n.scrollbar-arrow:disabled {\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.scrollbar-arrow-up {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n  padding: 0;\n  margin: 0;\n}\n.scrollbar-arrow-down {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n  padding: 0;\n  margin: 0;\n}\n.scrollbar-arrow-left {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 12px;\n  height: 12px;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n}\n.scrollbar-arrow-right {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  width: 12px;\n  height: 12px;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n}\n";

declare function cn(...inputs: ClassValue[]): string;

interface BaseComponentProps {
    class?: string;
    style?: any;
    children?: any;
}
type ScrollbarDirection = "vertical" | "horizontal";
type ScrollbarTheme = "default" | "minimal" | "modern";

export { type BaseComponentProps, Scrollbar, ScrollbarArrows, type ScrollbarConfig, ScrollbarControls, type ScrollbarDirection, type ScrollbarProps, ScrollbarProvider, type ScrollbarTheme, ScrollbarThumb, cn, scrollbarConfig, scrollbarStyles, useScrollbarConfig, useScrollbarHandlers, useScrollbarLogic, useScrollbarObservers, useScrollbarState };
