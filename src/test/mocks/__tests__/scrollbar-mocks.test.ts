import { describe, it, expect } from 'vitest'
import { 
  createScrollbarTestData, 
  mockContentGenerators, 
  mockEvents,
  mockMeasurements,
  mockScrollPositions
} from '../scrollbar-mocks'

describe('Scrollbar Mocks', () => {
  describe('createScrollbarTestData', () => {
    it('should create default test data', () => {
      const data = createScrollbarTestData()
      
      expect(data).toEqual({
        content: 'Test content',
        width: 400,
        height: 100,
        direction: 'horizontal',
        showArrows: false,
      })
    })

    it('should merge with overrides', () => {
      const overrides = {
        width: 800,
        direction: 'vertical' as const,
        showArrows: true,
      }
      
      const data = createScrollbarTestData(overrides)
      
      expect(data).toEqual({
        content: 'Test content',
        width: 800,
        height: 100,
        direction: 'vertical',
        showArrows: true,
      })
    })
  })

  describe('mockContentGenerators', () => {
    it('should generate short content', () => {
      const content = mockContentGenerators.short()
      expect(content).toBe('Short content')
    })

    it('should generate long content', () => {
      const content = mockContentGenerators.long()
      expect(content).toContain('Item 1')
      expect(content).toContain('Item 20')
    })

    it('should generate very long content', () => {
      const content = mockContentGenerators.veryLong()
      expect(content).toContain('Very long item 1')
      expect(content).toContain('Very long item 100')
    })

    it('should generate content with images', () => {
      const content = mockContentGenerators.withImages()
      expect(content).toContain('<img')
      expect(content).toContain('alt="Test 0"')
    })

    it('should generate mixed content', () => {
      const content = mockContentGenerators.mixed()
      expect(content).toContain('<div')
      expect(content).toContain('Item 1')
      expect(content).toContain('Item 15')
    })
  })

  describe('mockEvents', () => {
    it('should have mouse down event', () => {
      expect(mockEvents.mouseDown).toEqual({
        clientX: 100,
        clientY: 50,
        button: 0,
      })
    })

    it('should have mouse move event', () => {
      expect(mockEvents.mouseMove).toEqual({
        clientX: 150,
        clientY: 50,
        button: 0,
      })
    })

    it('should have wheel event', () => {
      expect(mockEvents.wheel).toEqual({
        deltaX: 0,
        deltaY: 100,
        deltaZ: 0,
      })
    })

    it('should have click event', () => {
      expect(mockEvents.click).toEqual({
        clientX: 200,
        clientY: 50,
        button: 0,
      })
    })
  })

  describe('mockMeasurements', () => {
    it('should have small measurements', () => {
      expect(mockMeasurements.small).toEqual({
        containerWidth: 200,
        containerHeight: 100,
        contentWidth: 400,
        contentHeight: 200,
      })
    })

    it('should have medium measurements', () => {
      expect(mockMeasurements.medium).toEqual({
        containerWidth: 400,
        containerHeight: 100,
        contentWidth: 800,
        contentHeight: 200,
      })
    })

    it('should have large measurements', () => {
      expect(mockMeasurements.large).toEqual({
        containerWidth: 800,
        containerHeight: 200,
        contentWidth: 1600,
        contentHeight: 400,
      })
    })
  })

  describe('mockScrollPositions', () => {
    it('should have start position', () => {
      expect(mockScrollPositions.start).toBe(0)
    })

    it('should have middle position', () => {
      expect(mockScrollPositions.middle).toBe(0.5)
    })

    it('should have end position', () => {
      expect(mockScrollPositions.end).toBe(1)
    })

    it('should generate custom position', () => {
      const custom = mockScrollPositions.custom(0.75)
      expect(custom).toBe(0.75)
    })
  })
})
