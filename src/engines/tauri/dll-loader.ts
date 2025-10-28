// DLL Loader for Physics Engine
// This file will be used in the main Tauri project to load physics-engine.dll

import { invoke } from '@tauri-apps/api/core';

// Physics Engine DLL types
export interface ScrollbarPhysicsConfig {
  damping: number;
  stiffness: number;
  mass: number;
  max_velocity: number;
}

export interface ScrollbarPhysicsState {
  position: number;
  velocity: number;
  acceleration: number;
}

// DLL Loader class
export class PhysicsEngineDLL {
  private isLoaded = false;
  private dllHandle: any = null;

  async loadDLL(): Promise<void> {
    try {
      // Load physics-engine.dll
      // This will be implemented in the main Tauri project
      console.log('Loading physics-engine.dll...');
      this.isLoaded = true;
    } catch (error) {
      console.error('Failed to load physics-engine.dll:', error);
      throw error;
    }
  }

  async init(): Promise<void> {
    if (!this.isLoaded) {
      await this.loadDLL();
    }
    
    try {
      // Call physics_engine_init() from DLL
      await invoke('init_physics_engine');
    } catch (error) {
      console.error('Failed to initialize physics engine:', error);
      throw error;
    }
  }

  async calculateScrollbarPhysics(
    config: ScrollbarPhysicsConfig,
    currentState: ScrollbarPhysicsState,
    targetPosition: number,
    deltaTime: number
  ): Promise<ScrollbarPhysicsState> {
    if (!this.isLoaded) {
      throw new Error('Physics engine DLL not loaded');
    }

    try {
      // Call physics_engine_calculate_scrollbar() from DLL
      const result = await invoke('calculate_scrollbar_physics', {
        config,
        currentState,
        targetPosition,
        deltaTime
      });
      return result;
    } catch (error) {
      console.error('Failed to calculate scrollbar physics:', error);
      throw error;
    }
  }

  async getInfo(): Promise<string> {
    if (!this.isLoaded) {
      throw new Error('Physics engine DLL not loaded');
    }

    try {
      // Call physics_engine_get_info() from DLL
      const info = await invoke('get_physics_engine_info');
      return info;
    } catch (error) {
      console.error('Failed to get physics engine info:', error);
      throw error;
    }
  }

  async unload(): Promise<void> {
    if (this.isLoaded) {
      // Unload DLL
      this.isLoaded = false;
      this.dllHandle = null;
    }
  }
}

// Export singleton instance
export const physicsEngineDLL = new PhysicsEngineDLL();
