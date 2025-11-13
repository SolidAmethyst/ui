// Tauri engine implementation for Solid UI Toolkit with DLL integration
import type {
  EngineState,
  UIEngine,
  GlassEffectConfig,
} from "../types/engine-interface";

// Tauri API types (will be available when @tauri-apps/api is installed)
declare global {
  interface Window {
    __TAURI__?: {
      invoke: <T = unknown>(
        command: string,
        args?: Record<string, unknown>,
      ) => Promise<T>;
    };
  }
}

// Physics Engine DLL types
interface ScrollbarPhysicsConfig {
  damping: number;
  stiffness: number;
  mass: number;
  max_velocity: number;
}

interface ScrollbarPhysicsState {
  position: number;
  velocity: number;
  acceleration: number;
}

export class TauriEngine implements UIEngine {
  private physicsObjectId: number | null = null;
  private velocity = 0;
  private acceleration = 0;
  private zoomLevel = 1;
  private isInitialized = false;

  async createPhysicsObject(x: number, y: number): Promise<number> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      const id = (await window.__TAURI__!.invoke<number>(
        "create_physics_object",
        {
          x,
          y,
        },
      )) as number;
      this.physicsObjectId = id;
      return id;
    } catch (error) {
      console.error("Failed to create physics object:", error);
      throw error;
    }
  }

  async updatePhysicsObject(id: number, x: number, y: number): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      await window.__TAURI__!.invoke("update_physics_object", { id, x, y });
    } catch (error) {
      console.error("Failed to update physics object:", error);
      throw error;
    }
  }

  async destroyPhysicsObject(id: number): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      await window.__TAURI__!.invoke("destroy_physics_object", { id });
      if (this.physicsObjectId === id) {
        this.physicsObjectId = null;
      }
    } catch (error) {
      console.error("Failed to destroy physics object:", error);
      throw error;
    }
  }

  async updateZoomLevel(zoom: number): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      await window.__TAURI__!.invoke("update_zoom_level", { zoom });
      this.zoomLevel = zoom;
    } catch (error) {
      console.error("Failed to update zoom level:", error);
      throw error;
    }
  }

  async screenToWorld(
    screenX: number,
    screenY: number,
  ): Promise<{ x: number; y: number }> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      const result = (await window.__TAURI__!.invoke<{
        x: number;
        y: number;
      }>("screen_to_world", {
        screenX,
        screenY,
      })) as { x: number; y: number };
      return { x: result.x, y: result.y };
    } catch (error) {
      console.error("Failed to convert screen to world:", error);
      throw error;
    }
  }

  async worldToScreen(
    worldX: number,
    worldY: number,
  ): Promise<{ x: number; y: number }> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      const result = (await window.__TAURI__!.invoke<{
        x: number;
        y: number;
      }>("world_to_screen", {
        worldX,
        worldY,
      })) as { x: number; y: number };
      return { x: result.x, y: result.y };
    } catch (error) {
      console.error("Failed to convert world to screen:", error);
      throw error;
    }
  }

  async getEngineState(): Promise<EngineState> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      const state = (await window.__TAURI__!.invoke<EngineState>(
        "get_engine_state",
      )) as EngineState;
      return {
        physicsObjectId: state.physicsObjectId,
        velocity: state.velocity || this.velocity,
        acceleration: state.acceleration || this.acceleration,
        zoomLevel: state.zoomLevel || this.zoomLevel,
        isInitialized: state.isInitialized || this.isInitialized,
      };
    } catch (error) {
      console.error("Failed to get engine state:", error);
      return {
        physicsObjectId: this.physicsObjectId || undefined,
        velocity: this.velocity,
        acceleration: this.acceleration,
        zoomLevel: this.zoomLevel,
        isInitialized: this.isInitialized,
      };
    }
  }

  async isAvailable(): Promise<boolean> {
    const available = this.isTauriAvailable();
    if (available) {
      this.isInitialized = true;
    }
    return available;
  }

  // Glass effects
  async applyGlassEffect(config: GlassEffectConfig): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      switch (config.type) {
        case "mica":
          await window.__TAURI__!.invoke("apply_mica_effect", {
            tintColor: config.tintColor,
            tintOpacity: config.tintOpacity ?? 0.8,
          });
          break;
        case "acrylic":
          await window.__TAURI__!.invoke("apply_acrylic_effect", {
            blur: config.blur ?? 20,
            tintColor: config.tintColor,
            tintOpacity: config.tintOpacity ?? 0.6,
          });
          break;
        case "blur":
          await window.__TAURI__!.invoke("set_blur_intensity", {
            intensity: config.blur ?? 10,
          });
          break;
        case "matte":
          await window.__TAURI__!.invoke("apply_matte_glass", {
            blur: config.blur ?? 15,
            opacity: config.opacity ?? 0.9,
            tintColor: config.tintColor,
            tintOpacity: config.tintOpacity ?? 0.7,
            saturation: config.saturation ?? 1.0,
            darkness: config.darkness ?? 0.5,
          });
          break;
      }
    } catch (error) {
      console.error("Failed to apply glass effect:", error);
      throw error;
    }
  }

  async updateGlassEffect(config: Partial<GlassEffectConfig>): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      if (config.blur !== undefined) {
        await window.__TAURI__!.invoke("set_blur_intensity", {
          intensity: config.blur,
        });
      }
      if (config.tintColor !== undefined || config.tintOpacity !== undefined) {
        await window.__TAURI__!.invoke("apply_tint_color", {
          color: config.tintColor,
          opacity: config.tintOpacity,
        });
      }
      if (config.opacity !== undefined) {
        await window.__TAURI__!.invoke("set_window_transparency", {
          opacity: config.opacity,
        });
      }
    } catch (error) {
      console.error("Failed to update glass effect:", error);
      throw error;
    }
  }

  async removeGlassEffect(): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      await window.__TAURI__!.invoke("remove_window_blur");
    } catch (error) {
      console.error("Failed to remove glass effect:", error);
      throw error;
    }
  }

  // Physics Engine DLL methods
  async initPhysicsEngine(): Promise<void> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      await window.__TAURI__!.invoke("init_physics_engine");
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize physics engine:", error);
      throw error;
    }
  }

  async calculateScrollbarPhysics(
    config: ScrollbarPhysicsConfig,
    currentState: ScrollbarPhysicsState,
    targetPosition: number,
    deltaTime: number,
  ): Promise<ScrollbarPhysicsState> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      const result = (await window.__TAURI__!.invoke<ScrollbarPhysicsState>(
        "calculate_scrollbar_physics",
        {
          config,
          currentState,
          targetPosition,
          deltaTime,
        },
      )) as ScrollbarPhysicsState;
      return result;
    } catch (error) {
      console.error("Failed to calculate scrollbar physics:", error);
      throw error;
    }
  }

  async getPhysicsEngineInfo(): Promise<string> {
    if (!this.isTauriAvailable()) {
      throw new Error("Tauri is not available");
    }

    try {
      const info = (await window.__TAURI__!.invoke<string>(
        "get_physics_engine_info",
      )) as string;
      return info;
    } catch (error) {
      console.error("Failed to get physics engine info:", error);
      throw error;
    }
  }

  private isTauriAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      window.__TAURI__ !== undefined &&
      typeof window.__TAURI__.invoke === "function"
    );
  }
}

// Export singleton instance
export const tauriEngine = new TauriEngine();
