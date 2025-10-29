var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/engines/tauri/tauri-engine.ts
var tauri_engine_exports = {};
__export(tauri_engine_exports, {
  TauriEngine: () => TauriEngine,
  tauriEngine: () => tauriEngine
});
var TauriEngine, tauriEngine;
var init_tauri_engine = __esm({
  "src/engines/tauri/tauri-engine.ts"() {
    "use strict";
    TauriEngine = class {
      constructor() {
        __publicField(this, "physicsObjectId", null);
        __publicField(this, "velocity", 0);
        __publicField(this, "acceleration", 0);
        __publicField(this, "zoomLevel", 1);
        __publicField(this, "isInitialized", false);
      }
      async createPhysicsObject(x, y) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          const id = await window.__TAURI__.invoke("create_physics_object", {
            x,
            y
          });
          this.physicsObjectId = id;
          return id;
        } catch (error) {
          console.error("Failed to create physics object:", error);
          throw error;
        }
      }
      async updatePhysicsObject(id, x, y) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          await window.__TAURI__.invoke("update_physics_object", { id, x, y });
        } catch (error) {
          console.error("Failed to update physics object:", error);
          throw error;
        }
      }
      async destroyPhysicsObject(id) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          await window.__TAURI__.invoke("destroy_physics_object", { id });
          if (this.physicsObjectId === id) {
            this.physicsObjectId = null;
          }
        } catch (error) {
          console.error("Failed to destroy physics object:", error);
          throw error;
        }
      }
      async updateZoomLevel(zoom) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          await window.__TAURI__.invoke("update_zoom_level", { zoom });
          this.zoomLevel = zoom;
        } catch (error) {
          console.error("Failed to update zoom level:", error);
          throw error;
        }
      }
      async screenToWorld(screenX, screenY) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          const result = await window.__TAURI__.invoke("screen_to_world", {
            screenX,
            screenY
          });
          return { x: result.x, y: result.y };
        } catch (error) {
          console.error("Failed to convert screen to world:", error);
          throw error;
        }
      }
      async worldToScreen(worldX, worldY) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          const result = await window.__TAURI__.invoke("world_to_screen", {
            worldX,
            worldY
          });
          return { x: result.x, y: result.y };
        } catch (error) {
          console.error("Failed to convert world to screen:", error);
          throw error;
        }
      }
      async getEngineState() {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          const state = await window.__TAURI__.invoke("get_engine_state");
          return {
            physicsObjectId: state.physicsObjectId,
            velocity: state.velocity || this.velocity,
            acceleration: state.acceleration || this.acceleration,
            zoomLevel: state.zoomLevel || this.zoomLevel,
            isInitialized: state.isInitialized || this.isInitialized
          };
        } catch (error) {
          console.error("Failed to get engine state:", error);
          return {
            physicsObjectId: this.physicsObjectId || void 0,
            velocity: this.velocity,
            acceleration: this.acceleration,
            zoomLevel: this.zoomLevel,
            isInitialized: this.isInitialized
          };
        }
      }
      async isAvailable() {
        const available = this.isTauriAvailable();
        if (available) {
          this.isInitialized = true;
        }
        return available;
      }
      // Physics Engine DLL methods
      async initPhysicsEngine() {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          await window.__TAURI__.invoke("init_physics_engine");
          this.isInitialized = true;
        } catch (error) {
          console.error("Failed to initialize physics engine:", error);
          throw error;
        }
      }
      async calculateScrollbarPhysics(config, currentState, targetPosition, deltaTime) {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          const result = await window.__TAURI__.invoke(
            "calculate_scrollbar_physics",
            {
              config,
              currentState,
              targetPosition,
              deltaTime
            }
          );
          return result;
        } catch (error) {
          console.error("Failed to calculate scrollbar physics:", error);
          throw error;
        }
      }
      async getPhysicsEngineInfo() {
        if (!this.isTauriAvailable()) {
          throw new Error("Tauri is not available");
        }
        try {
          const info = await window.__TAURI__.invoke("get_physics_engine_info");
          return info;
        } catch (error) {
          console.error("Failed to get physics engine info:", error);
          throw error;
        }
      }
      isTauriAvailable() {
        return typeof window !== "undefined" && window.__TAURI__ !== void 0 && typeof window.__TAURI__.invoke === "function";
      }
    };
    tauriEngine = new TauriEngine();
  }
});

// src/components/ui/scrollbar/scrollbar.tsx
import { createSignal, onCleanup, onMount } from "solid-js";

// src/components/ui/scrollbar/scrollbar-calculations.ts
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// src/components/ui/scrollbar/scrollbar.tsx
var Scrollbar = (props) => {
  let containerRef;
  let contentRef;
  let thumbRef;
  let trackRef;
  const [thumbSize, setThumbSize] = createSignal(50);
  const [thumbPosition, setThumbPosition] = createSignal(0);
  const [showScrollbar, setShowScrollbar] = createSignal(false);
  const [isDragging, setIsDragging] = createSignal(false);
  const [dragOffset, setDragOffset] = createSignal(0);
  const [_engineState, _setEngineState] = createSignal(null);
  const [_scrollVelocity, _setScrollVelocity] = createSignal(0);
  const updateScrollbar = () => {
    if (!containerRef || !contentRef) return;
    const containerSize = props.horizontal ? containerRef.clientWidth : containerRef.clientHeight;
    const contentSize = props.horizontal ? contentRef.scrollWidth : contentRef.scrollHeight;
    if (contentSize <= containerSize) {
      setShowScrollbar(false);
      return;
    }
    setShowScrollbar(true);
    const ratio = containerSize / contentSize;
    const size = Math.max(50, containerSize * ratio);
    setThumbSize(size);
    const scrollPosition = props.horizontal ? contentRef.scrollLeft : contentRef.scrollTop;
    const maxScroll = contentSize - containerSize;
    const maxThumbPos = containerSize - size;
    const pos = scrollPosition / maxScroll * maxThumbPos;
    setThumbPosition(pos);
  };
  const handleScroll = () => {
    if (isDragging()) return;
    updateScrollbar();
  };
  const handleThumbMouseDown = async (e) => {
    if (!thumbRef || !contentRef || !trackRef) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const trackRect = trackRef.getBoundingClientRect();
    const zoomLevel = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--zoom-level"
      ) || "1"
    );
    const mousePos = props.horizontal ? (e.clientX - trackRect.left) / zoomLevel : (e.clientY - trackRect.top) / zoomLevel;
    const thumbCenter = thumbPosition() + thumbSize() / 2;
    const offset = mousePos - thumbCenter;
    setDragOffset(offset);
    document.body.style.userSelect = "none";
  };
  const handleMouseMove = async (e) => {
    if (!isDragging() || !trackRef || !contentRef) return;
    e.preventDefault();
    const trackRect = trackRef.getBoundingClientRect();
    const zoomLevel = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--zoom-level"
      ) || "1"
    );
    const mousePos = props.horizontal ? (e.clientX - trackRect.left) / zoomLevel : (e.clientY - trackRect.top) / zoomLevel;
    const thumbCenterPos = mousePos - dragOffset();
    const newThumbPos = thumbCenterPos - thumbSize() / 2;
    const maxThumbPos = (props.horizontal ? trackRef.clientWidth : trackRef.clientHeight) - thumbSize();
    const clampedPos = clamp(newThumbPos, 0, maxThumbPos);
    setThumbPosition(clampedPos);
    const containerSize = props.horizontal ? trackRef.clientWidth : trackRef.clientHeight;
    const contentSize = props.horizontal ? contentRef.scrollWidth : contentRef.scrollHeight;
    const maxScroll = contentSize - containerSize;
    const scrollRatio = clampedPos / maxThumbPos;
    const scrollPos = scrollRatio * maxScroll;
    if (props.horizontal) {
      contentRef.scrollLeft = scrollPos;
    } else {
      contentRef.scrollTop = scrollPos;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };
  const handleTrackClick = (e) => {
    if (!trackRef || !contentRef || !thumbRef) return;
    if (e.target === thumbRef) return;
    const trackRect = trackRef.getBoundingClientRect();
    const zoomLevel = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--zoom-level"
      ) || "1"
    );
    const clickPosition = props.horizontal ? (e.clientX - trackRect.left) / zoomLevel : (e.clientY - trackRect.top) / zoomLevel;
    const newThumbPos = clickPosition - thumbSize() / 2;
    const maxThumbPos = (props.horizontal ? trackRef.clientWidth : trackRef.clientHeight) - thumbSize();
    const clampedThumbPos = clamp(newThumbPos, 0, maxThumbPos);
    setThumbPosition(clampedThumbPos);
    const containerSize = props.horizontal ? trackRef.clientWidth : trackRef.clientHeight;
    const contentSize = props.horizontal ? contentRef.scrollWidth : contentRef.scrollHeight;
    const maxScroll = contentSize - containerSize;
    const scrollRatio = clampedThumbPos / maxThumbPos;
    const scrollPos = scrollRatio * maxScroll;
    if (props.horizontal) {
      contentRef.scrollLeft = scrollPos;
    } else {
      contentRef.scrollTop = scrollPos;
    }
  };
  onMount(() => {
    updateScrollbar();
    setTimeout(updateScrollbar, 0);
    setTimeout(updateScrollbar, 50);
    setTimeout(updateScrollbar, 100);
    setTimeout(updateScrollbar, 250);
    setTimeout(updateScrollbar, 500);
    setTimeout(updateScrollbar, 1e3);
    const resizeObserver = new ResizeObserver(updateScrollbar);
    const mutationObserver = new MutationObserver(updateScrollbar);
    if (contentRef) {
      resizeObserver.observe(contentRef);
      mutationObserver.observe(contentRef, {
        childList: true,
        subtree: true,
        characterData: true
      });
      contentRef.addEventListener("scroll", handleScroll);
    }
    if (containerRef) {
      resizeObserver.observe(containerRef);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    onCleanup(() => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (contentRef) {
        contentRef.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    });
  });
  return <>
      <style>{`
				.custom-scrollbar-container {
					position: relative;
					overflow: hidden;
				}
				.custom-scrollbar-content {
					height: 100%;
					width: 100%;
					overflow-y: auto;
					overflow-x: auto;
					scrollbar-width: none !important;
					-ms-overflow-style: none !important;
				}
				.custom-scrollbar-content::-webkit-scrollbar {
					display: none !important;
					width: 0 !important;
					height: 0 !important;
				}
				.custom-scrollbar-track {
					position: absolute;
					z-index: 999;
					background: transparent;
				}
				.custom-scrollbar-track-vertical {
					top: 0;
					right: 0;
					width: 10px;
					height: 100%;
				}
				.custom-scrollbar-track-horizontal {
					bottom: 0;
					left: 0;
					width: 100%;
					height: 12px;
				}
				.custom-scrollbar-thumb {
					position: absolute;
					background: rgba(59, 130, 246, 0.6);
					border-radius: 2px;
					cursor: grab;
					transition: background 150ms;
					z-index: 99999;
				}
				.custom-scrollbar-thumb:hover {
					background: rgba(59, 130, 246, 0.8);
				}
				.custom-scrollbar-thumb:active,
				.custom-scrollbar-thumb.dragging {
					background: rgba(59, 130, 246, 1);
					cursor: grabbing;
				}
			`}</style>
      <div
    ref={containerRef}
    class={`custom-scrollbar-container ${props.class || ""}`}
    style={props.style}
  >
        <div
    ref={contentRef}
    class="custom-scrollbar-content"
    style={{
      "overflow-y": props.horizontal ? "hidden" : "auto",
      "overflow-x": props.horizontal ? "auto" : "hidden"
    }}
  >
          {props.children}
        </div>

        {showScrollbar() && <div
    ref={trackRef}
    class={`custom-scrollbar-track ${props.horizontal ? "custom-scrollbar-track-horizontal" : "custom-scrollbar-track-vertical"}`}
    onClick={handleTrackClick}
  >
            <div
    ref={thumbRef}
    class={`custom-scrollbar-thumb ${isDragging() ? "dragging" : ""}`}
    style={{
      width: props.horizontal ? `${thumbSize()}px` : "4px",
      height: props.horizontal ? "4px" : `${thumbSize()}px`,
      left: props.horizontal ? `${thumbPosition()}px` : "auto",
      top: props.horizontal ? "4px" : `${thumbPosition()}px`,
      right: props.horizontal ? "auto" : "2px"
    }}
    onMouseDown={handleThumbMouseDown}
  />
          </div>}
      </div>
    </>;
};

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/engines/mock/mock-engine.ts
var MockEngine = class {
  constructor() {
    __publicField(this, "physicsObjectId", null);
    __publicField(this, "velocity", 0);
    __publicField(this, "acceleration", 0);
    __publicField(this, "zoomLevel", 1);
    __publicField(this, "isInitialized", false);
  }
  async createPhysicsObject(_x, _y) {
    const id = Math.random() * 1e3;
    this.physicsObjectId = id;
    return id;
  }
  async updatePhysicsObject(id, _x, _y) {
    if (this.physicsObjectId === id) {
      this.velocity = Math.random() * 0.1;
    }
  }
  async destroyPhysicsObject(id) {
    if (this.physicsObjectId === id) {
      this.physicsObjectId = null;
    }
  }
  async updateZoomLevel(zoom) {
    this.zoomLevel = zoom;
  }
  async screenToWorld(screenX, screenY) {
    return { x: screenX, y: screenY };
  }
  async worldToScreen(worldX, worldY) {
    return { x: worldX, y: worldY };
  }
  async getEngineState() {
    return {
      physicsObjectId: this.physicsObjectId || void 0,
      velocity: this.velocity,
      acceleration: this.acceleration,
      zoomLevel: this.zoomLevel,
      isInitialized: this.isInitialized
    };
  }
  async isAvailable() {
    this.isInitialized = true;
    return true;
  }
};
var mockEngine = new MockEngine();

// src/engines/engine-manager.ts
var EngineManager = class {
  constructor(config) {
    __publicField(this, "currentEngine", null);
    __publicField(this, "config");
    __publicField(this, "isInitialized", false);
    this.config = config;
  }
  async initialize() {
    if (this.isInitialized) return;
    try {
      if (this.config.enabled && this.config.autoDetect) {
        const tauriAvailable = await this.detectTauriEngine();
        if (tauriAvailable) {
          this.currentEngine = await this.loadTauriEngine();
        }
      }
      if (!this.currentEngine) {
        this.currentEngine = mockEngine;
      }
      this.isInitialized = true;
    } catch (error) {
      console.warn("Failed to initialize engine, falling back to mock:", error);
      this.currentEngine = mockEngine;
      this.isInitialized = true;
    }
  }
  async getEngine() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.currentEngine;
  }
  async detectTauriEngine() {
    if (typeof window === "undefined") return false;
    if (!window.__TAURI__) return false;
    if (typeof window.__TAURI__.invoke !== "function") return false;
    try {
      const tauriEngine2 = await this.loadTauriEngine();
      return await tauriEngine2.isAvailable();
    } catch {
      return false;
    }
  }
  async loadTauriEngine() {
    try {
      const { tauriEngine: tauriEngine2 } = await Promise.resolve().then(() => (init_tauri_engine(), tauri_engine_exports));
      if (this.config.physicsEnabled) {
        try {
          const engineWithDLL = tauriEngine2;
          if (engineWithDLL.initPhysicsEngine) {
            await engineWithDLL.initPhysicsEngine();
            console.log("Physics engine DLL initialized successfully");
          }
        } catch (error) {
          console.warn("Failed to initialize physics engine DLL:", error);
        }
      }
      return tauriEngine2;
    } catch (error) {
      console.warn("Failed to load Tauri engine:", error);
      throw error;
    }
  }
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.isInitialized = false;
  }
  getConfig() {
    return { ...this.config };
  }
};
var globalEngineManager = null;
function getEngineManager(config) {
  if (!globalEngineManager) {
    globalEngineManager = new EngineManager(
      config || {
        enabled: true,
        autoDetect: true,
        fallbackToJS: true,
        physicsEnabled: true,
        zoomEnabled: true
      }
    );
  }
  return globalEngineManager;
}
async function getCurrentEngine() {
  const manager = getEngineManager();
  return await manager.getEngine();
}

// src/engines/index.ts
init_tauri_engine();
export {
  EngineManager,
  MockEngine,
  Scrollbar,
  TauriEngine,
  cn,
  getCurrentEngine,
  getEngineManager,
  mockEngine,
  tauriEngine
};
//# sourceMappingURL=index.js.map