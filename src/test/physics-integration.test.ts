// Physics Engine Integration Test
import { beforeEach, describe, expect, it } from 'vitest'
import { ScrollbarEngineManager } from '../components/ui/scrollbar/lib/scrollbar-engine'

describe('Physics Engine Integration', () => {
	let scrollbarEngine: ScrollbarEngineManager

	beforeEach(() => {
		scrollbarEngine = new ScrollbarEngineManager()
	})

	it('should create physics object with fallback', async () => {
		const id = await scrollbarEngine.createPhysicsObject(100, 200)
		expect(typeof id).toBe('number')
		expect(id).toBeGreaterThan(0)
	})

	it('should calculate scrollbar physics with fallback', async () => {
		const config = {
			thumbSize: 50,
			trackSize: 200,
			contentSize: 1000,
			friction: 0.8,
			stiffness: 100.0
		}

		const currentState = {
			position: 0.0,
			velocity: 0.0,
			acceleration: 0.0
		}

		const result = await scrollbarEngine.calculateScrollbarPhysics(
			config,
			currentState,
			100.0,
			0.016
		)

		expect(result).toHaveProperty('position')
		expect(result).toHaveProperty('velocity')
		expect(result).toHaveProperty('acceleration')
		expect(typeof result.position).toBe('number')
		expect(typeof result.velocity).toBe('number')
		expect(typeof result.acceleration).toBe('number')
	})

	it('should get physics engine info', async () => {
		const info = await scrollbarEngine.getPhysicsEngineInfo()
		expect(typeof info).toBe('string')
		expect(info.length).toBeGreaterThan(0)
	})

	it('should handle engine state', async () => {
		const state = await scrollbarEngine.getEngineState()
		expect(state).toHaveProperty('physicsObjectId')
		expect(state).toHaveProperty('velocity')
		expect(state).toHaveProperty('acceleration')
	})
})
