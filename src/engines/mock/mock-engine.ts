// Mock engine implementation for Solid UI Toolkit
import type {
  EngineState,
  UIEngine,
  GlassEffectConfig,
} from "../types/engine-interface";

export class MockEngine implements UIEngine {
  private physicsObjectId: number | null = null;
  private velocity = 0;
  private acceleration = 0;
  private zoomLevel = 1;
  private isInitialized = false;

  async createPhysicsObject(): Promise<number> {
    // Mock implementation - just return random ID
    const id = Math.random() * 1000;
    this.physicsObjectId = id;
    return id;
  }

  async updatePhysicsObject(id: number): Promise<void> {
    // Mock implementation - just update internal state
    if (this.physicsObjectId === id) {
      // Simulate some physics
      this.velocity = Math.random() * 0.1;
    }
  }

  async destroyPhysicsObject(id: number): Promise<void> {
    // Mock implementation
    if (this.physicsObjectId === id) {
      this.physicsObjectId = null;
    }
  }

  async updateZoomLevel(zoom: number): Promise<void> {
    // Mock implementation - just store zoom level
    this.zoomLevel = zoom;
  }

  async screenToWorld(
    screenX: number,
    screenY: number,
  ): Promise<{ x: number; y: number }> {
    // Mock implementation - no transformation
    return { x: screenX, y: screenY };
  }

  async worldToScreen(
    worldX: number,
    worldY: number,
  ): Promise<{ x: number; y: number }> {
    // Mock implementation - no transformation
    return { x: worldX, y: worldY };
  }

  async getEngineState(): Promise<EngineState> {
    return {
      physicsObjectId: this.physicsObjectId || undefined,
      velocity: this.velocity,
      acceleration: this.acceleration,
      zoomLevel: this.zoomLevel,
      isInitialized: this.isInitialized,
    };
  }

  async isAvailable(): Promise<boolean> {
    // Mock engine is always available
    this.isInitialized = true;
    return true;
  }

  // Glass effects (mock - no-op, CSS fallback will be used)
  async applyGlassEffect(config: GlassEffectConfig): Promise<void> {
    // Mock implementation - no-op, component will use CSS fallback
    console.log("[MockEngine] Glass effect requested (using CSS fallback):", config);
  }

  async updateGlassEffect(config: Partial<GlassEffectConfig>): Promise<void> {
    // Mock implementation - no-op, component will use CSS fallback
    console.log("[MockEngine] Glass effect update requested (using CSS fallback):", config);
  }

  async removeGlassEffect(): Promise<void> {
    // Mock implementation - no-op, component will use CSS fallback
    console.log("[MockEngine] Glass effect removal requested (using CSS fallback)");
  }
}

// Export singleton instance
export const mockEngine = new MockEngine();
