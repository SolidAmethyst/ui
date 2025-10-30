// Common interface for all UI engines
export interface UIEngine {
	// Physics object management
	createPhysicsObject(x: number, y: number): Promise<number>
	updatePhysicsObject(id: number, x: number, y: number): Promise<void>
	destroyPhysicsObject(id: number): Promise<void>

	// Zoom and viewport
	updateZoomLevel(zoom: number): Promise<void>
	screenToWorld(
		screenX: number,
		screenY: number
	): Promise<{ x: number; y: number }>
	worldToScreen(
		worldX: number,
		worldY: number
	): Promise<{ x: number; y: number }>

	// Engine state
	getEngineState(): Promise<EngineState>
	isAvailable(): Promise<boolean>
}

export interface EngineState {
	physicsObjectId?: number
	velocity: number
	acceleration: number
	zoomLevel: number
	isInitialized: boolean
}

export interface EngineConfig {
	enabled: boolean
	autoDetect: boolean
	fallbackToJS: boolean
	physicsEnabled: boolean
	zoomEnabled: boolean
}

export interface ScrollbarPhysicsConfig {
	thumbSize: number
	trackSize: number
	contentSize: number
	friction: number
	stiffness: number
}

export interface ScrollbarPhysicsState {
	position: number
	velocity: number
	acceleration: number
}

export interface UIEngineWithDLL extends UIEngine {
	calculateScrollbarPhysics(
		config: ScrollbarPhysicsConfig,
		currentState: ScrollbarPhysicsState,
		targetPosition: number,
		deltaTime: number
	): Promise<ScrollbarPhysicsState>
	getPhysicsEngineInfo(): Promise<string>
}
