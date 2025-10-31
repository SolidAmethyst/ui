// Scrollbar engine integration - now uses plugin architecture with DLL support
import { getCurrentEngine } from "../../../../engines/engine-manager";
import type { ScrollbarEngine as ScrollbarEngineType } from "../model/types";

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

interface PhysicsEngineWithScrollbar {
  calculateScrollbarPhysics?(
    config: ScrollbarPhysicsConfig,
    currentState: ScrollbarPhysicsState,
    targetPosition: number,
    deltaTime: number,
  ): Promise<ScrollbarPhysicsState>;
  getPhysicsEngineInfo?(): Promise<string>;
}

export class ScrollbarEngineManager {
  private physicsObjectId: number | null = null;
  private velocity = 0;
  private acceleration = 0;

  async createPhysicsObject(x: number, y: number): Promise<number> {
    try {
      const engine = await getCurrentEngine();
      const id = await engine.createPhysicsObject(x, y);
      this.physicsObjectId = id;
      return id;
    } catch (error) {
      console.warn("Failed to create physics object, using fallback:", error);
      // Fallback to mock implementation
      const id = Math.random() * 1000;
      this.physicsObjectId = id;
      return id;
    }
  }

  async updatePhysicsObject(x: number, y: number): Promise<void> {
    if (!this.physicsObjectId) return;

    try {
      const engine = await getCurrentEngine();
      await engine.updatePhysicsObject(this.physicsObjectId, x, y);
    } catch (error) {
      console.warn("Failed to update physics object:", error);
      // Just update internal state as fallback
    }
  }

  async updateZoomLevel(zoom: number): Promise<void> {
    try {
      const engine = await getCurrentEngine();
      await engine.updateZoomLevel(zoom);
    } catch (error) {
      console.warn("Failed to update zoom level:", error);
      // Fallback - no action needed
    }
  }

  async getEngineState(): Promise<ScrollbarEngineType> {
    try {
      const engine = await getCurrentEngine();
      const state = await engine.getEngineState();
      return {
        physicsObjectId: state.physicsObjectId,
        velocity: state.velocity,
        acceleration: state.acceleration,
      };
    } catch (error) {
      console.warn("Failed to get engine state, using local state:", error);
      return {
        physicsObjectId: this.physicsObjectId || undefined,
        velocity: this.velocity,
        acceleration: this.acceleration,
      };
    }
  }

  setVelocity(velocity: number): void {
    this.velocity = velocity;
  }

  setAcceleration(acceleration: number): void {
    this.acceleration = acceleration;
  }

  // Physics Engine DLL methods
  async calculateScrollbarPhysics(
    config: ScrollbarPhysicsConfig,
    currentState: ScrollbarPhysicsState,
    targetPosition: number,
    deltaTime: number,
  ): Promise<ScrollbarPhysicsState> {
    try {
      const engine = await getCurrentEngine();

      // Check if engine has physics DLL methods
      const physicsEngine = engine as PhysicsEngineWithScrollbar;
      if (physicsEngine.calculateScrollbarPhysics) {
        const result = await physicsEngine.calculateScrollbarPhysics(
          config,
          currentState,
          targetPosition,
          deltaTime,
        );
        return result;
      } else {
        // Fallback to simple physics calculation
        return this.simplePhysicsCalculation(
          config,
          currentState,
          targetPosition,
          deltaTime,
        );
      }
    } catch (error) {
      console.warn(
        "Failed to calculate scrollbar physics, using fallback:",
        error,
      );
      return this.simplePhysicsCalculation(
        config,
        currentState,
        targetPosition,
        deltaTime,
      );
    }
  }

  private simplePhysicsCalculation(
    config: ScrollbarPhysicsConfig,
    currentState: ScrollbarPhysicsState,
    targetPosition: number,
    deltaTime: number,
  ): ScrollbarPhysicsState {
    const newState = { ...currentState };

    // Simple spring-damper system
    const springForce =
      -config.stiffness * (newState.position - targetPosition);
    const dampingForce = -config.damping * newState.velocity;
    const totalForce = springForce + dampingForce;

    newState.acceleration = totalForce / config.mass;
    newState.velocity += newState.acceleration * deltaTime;
    newState.velocity = Math.max(
      -config.max_velocity,
      Math.min(config.max_velocity, newState.velocity),
    );
    newState.position += newState.velocity * deltaTime;

    return newState;
  }

  async getPhysicsEngineInfo(): Promise<string> {
    try {
      const engine = await getCurrentEngine();

      const physicsEngine = engine as PhysicsEngineWithScrollbar;
      if (physicsEngine.getPhysicsEngineInfo) {
        return await physicsEngine.getPhysicsEngineInfo();
      } else {
        return "Mock Physics Engine - No DLL available";
      }
    } catch (error) {
      console.warn("Failed to get physics engine info:", error);
      return "Mock Physics Engine - Error occurred";
    }
  }
}
