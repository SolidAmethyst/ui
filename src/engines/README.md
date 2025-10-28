# 🚀 Engine Architecture

Plugin-based engine system for Solid UI Toolkit components.

## 📁 Structure

```
engines/
├── types/
│   └── engine-interface.ts    # Common engine interface
├── mock/
│   └── mock-engine.ts         # Mock engine (default)
├── tauri/
│   └── tauri-engine.ts        # Tauri engine (optional)
├── engine-manager.ts          # Dynamic loading & fallback
└── index.ts                   # Exports
```

## 🎯 Usage

### Basic Usage (Mock Engine)

```typescript
import { getCurrentEngine } from "@sapphiresolid/ui";

const engine = await getCurrentEngine();
const physicsId = await engine.createPhysicsObject(100, 200);
```

### With Tauri Integration

```typescript
// Install Tauri plugin
npm install @sapphiresolid/ui-tauri

// Import to enable Tauri engine
import '@sapphiresolid/ui-tauri';

// Now getCurrentEngine() will return Tauri engine if available
const engine = await getCurrentEngine();
```

### Custom Engine Configuration

```typescript
import { getEngineManager } from "@sapphiresolid/ui";

const manager = getEngineManager({
  enabled: true,
  autoDetect: true,
  fallbackToJS: true,
  physicsEnabled: true,
  zoomEnabled: true,
});

await manager.initialize();
const engine = await manager.getEngine();
```

## 🔧 Engine Interface

All engines implement the `UIEngine` interface:

```typescript
interface UIEngine {
  // Physics
  createPhysicsObject(x: number, y: number): Promise<number>;
  updatePhysicsObject(id: number, x: number, y: number): Promise<void>;
  destroyPhysicsObject(id: number): Promise<void>;

  // Viewport
  updateZoomLevel(zoom: number): Promise<void>;
  screenToWorld(
    screenX: number,
    screenY: number,
  ): Promise<{ x: number; y: number }>;
  worldToScreen(
    worldX: number,
    worldY: number,
  ): Promise<{ x: number; y: number }>;

  // State
  getEngineState(): Promise<EngineState>;
  isAvailable(): Promise<boolean>;
}
```

## 🎨 Available Engines

### Mock Engine (Default)

- ✅ Always available
- ✅ No external dependencies
- ✅ Perfect for testing
- ❌ No real physics

### Tauri Engine (Plugin)

- ✅ Real physics integration
- ✅ Zoom level support
- ✅ Screen/world coordinate conversion
- ❌ Requires Tauri environment
- ❌ External dependency

## 🔄 Fallback Strategy

1. **Auto-detect** available engines
2. **Load Tauri** if available and enabled
3. **Fallback to Mock** if Tauri fails
4. **Graceful degradation** with console warnings

## 🚀 Creating Custom Engines

```typescript
import { UIEngine } from "@sapphiresolid/ui";

export class CustomEngine implements UIEngine {
  async createPhysicsObject(x: number, y: number): Promise<number> {
    // Your implementation
  }

  // ... implement other methods
}
```
