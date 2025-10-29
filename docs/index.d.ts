import { Accessor } from 'solid-js';
import { ClassValue } from 'clsx';
import { Component } from 'solid-js';
import { JSX } from 'solid-js';
import { Setter } from 'solid-js';

export declare interface BaseComponentProps {
    class?: string;
    style?: any;
    children?: any;
}

export declare function cn(...inputs: ClassValue[]): string;

export declare interface EngineConfig {
    enabled: boolean;
    autoDetect: boolean;
    fallbackToJS: boolean;
    physicsEnabled: boolean;
    zoomEnabled: boolean;
}

export declare class EngineManager {
    private currentEngine;
    private config;
    private isInitialized;
    constructor(config: EngineConfig);
    initialize(): Promise<void>;
    getEngine(): Promise<UIEngine>;
    private detectTauriEngine;
    private loadTauriEngine;
    updateConfig(newConfig: Partial<EngineConfig>): void;
    getConfig(): EngineConfig;
}

export declare interface EngineState {
    physicsObjectId?: number;
    velocity: number;
    acceleration: number;
    zoomLevel: number;
    isInitialized: boolean;
}

export declare function getCurrentEngine(): Promise<UIEngine>;

export declare function getEngineManager(config?: EngineConfig): EngineManager;

export { JSX }

export declare class MockEngine implements UIEngine {
    private physicsObjectId;
    private velocity;
    private acceleration;
    private zoomLevel;
    private isInitialized;
    createPhysicsObject(_x: number, _y: number): Promise<number>;
    updatePhysicsObject(id: number, _x: number, _y: number): Promise<void>;
    destroyPhysicsObject(id: number): Promise<void>;
    updateZoomLevel(zoom: number): Promise<void>;
    screenToWorld(screenX: number, screenY: number): Promise<{
        x: number;
        y: number;
    }>;
    worldToScreen(worldX: number, worldY: number): Promise<{
        x: number;
        y: number;
    }>;
    getEngineState(): Promise<EngineState>;
    isAvailable(): Promise<boolean>;
}

export declare const mockEngine: MockEngine;

export declare const Scrollbar: (props: ScrollbarProps) => JSX.Element;

export declare const ScrollbarArrows: Component<ScrollbarArrowsProps>;

declare interface ScrollbarArrowsProps {
    direction: "horizontal" | "vertical";
    canScrollUp: boolean;
    canScrollDown: boolean;
    onScrollBy: (amount: number) => void;
}

export declare interface ScrollbarConfig {
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

export declare const scrollbarConfig: ScrollbarConfigManager;

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

declare interface ScrollbarContextValue {
    config: ScrollbarConfig;
    setEngineEnabled: (enabled: boolean) => void;
    setTheme: (theme: ScrollbarConfig["theme"]) => void;
    updateConfig: (updates: Partial<ScrollbarConfig>) => void;
}

export declare const ScrollbarControls: (props: {
    class?: string;
}) => JSX.Element;

export declare type ScrollbarDirection = "vertical" | "horizontal";

declare type ScrollbarDirection_2 = "vertical" | "horizontal";

declare interface ScrollbarPhysicsConfig {
    damping: number;
    stiffness: number;
    mass: number;
    max_velocity: number;
}

declare interface ScrollbarPhysicsState {
    position: number;
    velocity: number;
    acceleration: number;
}

export declare interface ScrollbarProps {
    children: JSX.Element;
    direction?: ScrollbarDirection_2;
    theme?: ScrollbarTheme_2;
    class?: string;
    style?: any;
    showArrows?: boolean;
    autoHide?: boolean;
    minThumbSize?: number;
    engineIntegration?: boolean;
}

export declare const ScrollbarProvider: (props: {
    children: JSX.Element;
    config?: Partial<ScrollbarConfig>;
}) => JSX.Element;

declare interface ScrollbarState {
    thumbSize: number;
    thumbPosition: number;
    isVisible: boolean;
    isDragging: boolean;
    dragOffset: number;
    showArrows: boolean;
    canScrollUp: boolean;
    canScrollDown: boolean;
}

export declare const scrollbarStyles = "\n.scrollbar-container {\n  position: relative;\n  overflow: hidden;\n}\n.scrollbar-content {\n  height: 100%;\n  width: 100%;\n  overflow-y: auto;\n  overflow-x: auto;\n  scrollbar-width: none !important;\n  -ms-overflow-style: none !important;\n}\n.scrollbar-content::-webkit-scrollbar {\n  display: none !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n.scrollbar-track {\n  position: absolute;\n  z-index: 999;\n  background: transparent;\n  opacity: 0;\n  transition: opacity 300ms ease-in-out;\n}\n.scrollbar-track.visible {\n  opacity: 1;\n}\n.scrollbar-track-vertical {\n  top: 0;\n  right: 0;\n  width: 12px;\n  height: 100%;\n}\n.scrollbar-track-horizontal {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 12px;\n}\n.scrollbar-thumb {\n  position: absolute;\n  background: rgba(59, 130, 246, 0.8);\n  border-radius: 2px;\n  cursor: grab;\n  transition: background 100ms ease;\n  z-index: 99999;\n  min-width: 1px;\n  min-height: 1px;\n}\n.scrollbar-thumb:hover {\n  background: rgba(59, 130, 246, 0.8);\n}\n.scrollbar-thumb:active,\n.scrollbar-thumb.dragging {\n  background: rgba(59, 130, 246, 1);\n  cursor: grabbing;\n}\n.scrollbar-arrow {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: bold;\n  color: #6b7280;\n  transition: color 150ms ease;\n  z-index: 1000;\n  padding: 0;\n  margin: 0;\n}\n.scrollbar-arrow:hover {\n  color: #3b82f6;\n}\n.scrollbar-arrow:active {\n  color: #1d4ed8;\n}\n.scrollbar-arrow:disabled {\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.scrollbar-arrow-up {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n  padding: 0;\n  margin: 0;\n}\n.scrollbar-arrow-down {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n  padding: 0;\n  margin: 0;\n}\n.scrollbar-arrow-left {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 12px;\n  height: 12px;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n}\n.scrollbar-arrow-right {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  width: 12px;\n  height: 12px;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1001;\n}\n";

export declare type ScrollbarTheme = "default" | "minimal" | "modern";

declare type ScrollbarTheme_2 = "default" | "minimal" | "modern";

export declare const ScrollbarThumb: Component<ScrollbarThumbProps>;

declare interface ScrollbarThumbProps {
    direction: "horizontal" | "vertical";
    thumbSize: number;
    thumbPosition: number;
    isDragging: boolean;
    onMouseDown: (e: MouseEvent) => void;
}

export declare class TauriEngine implements UIEngine {
    private physicsObjectId;
    private velocity;
    private acceleration;
    private zoomLevel;
    private isInitialized;
    createPhysicsObject(x: number, y: number): Promise<number>;
    updatePhysicsObject(id: number, x: number, y: number): Promise<void>;
    destroyPhysicsObject(id: number): Promise<void>;
    updateZoomLevel(zoom: number): Promise<void>;
    screenToWorld(screenX: number, screenY: number): Promise<{
        x: number;
        y: number;
    }>;
    worldToScreen(worldX: number, worldY: number): Promise<{
        x: number;
        y: number;
    }>;
    getEngineState(): Promise<EngineState>;
    isAvailable(): Promise<boolean>;
    initPhysicsEngine(): Promise<void>;
    calculateScrollbarPhysics(config: ScrollbarPhysicsConfig, currentState: ScrollbarPhysicsState, targetPosition: number, deltaTime: number): Promise<ScrollbarPhysicsState>;
    getPhysicsEngineInfo(): Promise<string>;
    private isTauriAvailable;
}

export declare const tauriEngine: TauriEngine;

export declare interface UIEngine {
    createPhysicsObject(x: number, y: number): Promise<number>;
    updatePhysicsObject(id: number, x: number, y: number): Promise<void>;
    destroyPhysicsObject(id: number): Promise<void>;
    updateZoomLevel(zoom: number): Promise<void>;
    screenToWorld(screenX: number, screenY: number): Promise<{
        x: number;
        y: number;
    }>;
    worldToScreen(worldX: number, worldY: number): Promise<{
        x: number;
        y: number;
    }>;
    getEngineState(): Promise<EngineState>;
    isAvailable(): Promise<boolean>;
}

export declare const useScrollbarConfig: () => ScrollbarContextValue;

export declare function useScrollbarHandlers(state: any, setState: any, direction: () => string, _containerRef: () => HTMLDivElement | undefined, contentRef: () => HTMLDivElement | undefined, trackRef: () => HTMLDivElement | undefined, thumbRef: () => HTMLDivElement | undefined, engineIntegration: () => boolean, updateScrollbar?: () => void): {
    scrollBy: (amount: number) => void;
    handleWheel: (e: WheelEvent) => void;
    handleThumbMouseDown: (e: MouseEvent) => Promise<void>;
    handleMouseMove: (e: MouseEvent) => Promise<void>;
    handleMouseUp: () => void;
    handleTrackClick: (e: MouseEvent) => void;
};

export declare function useScrollbarLogic(state: any, setState: any, direction: () => string, containerRef: () => HTMLDivElement | undefined, contentRef: () => HTMLDivElement | undefined, trackRef: () => HTMLDivElement | undefined, _minThumbSize: () => number): {
    updateScrollbar: () => void;
    handleScroll: () => void;
};

export declare function useScrollbarObservers(containerRef: () => HTMLDivElement | undefined, contentRef: () => HTMLDivElement | undefined, updateCallback: () => void): {
    setupObservers: () => (() => void) | undefined;
};

export declare function useScrollbarState(props: any): {
    state: Accessor<ScrollbarState>;
    setState: Setter<ScrollbarState>;
    isHovered: Accessor<boolean>;
    setIsHovered: Setter<boolean>;
    hideTimeout: Accessor<NodeJS.Timeout | null>;
    setHideTimeout: Setter<NodeJS.Timeout | null>;
    direction: () => any;
    theme: () => any;
    autoHide: () => any;
    minThumbSize: () => any;
    engineIntegration: () => any;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
};

export { }
